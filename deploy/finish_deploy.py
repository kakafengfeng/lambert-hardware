"""Finish a lambert-hardware gh-pages deploy when blobs are already uploaded.

Blobs are content-addressed: recompute their SHAs locally with git
hash-object (identical to what the GitHub blob API returns), then create
the tree, commit, and move the gh-pages ref — with retries on 502s.
"""
import hashlib
import json
import pathlib
import sys
import time
import urllib.request

sys.path.insert(0, "/opt/muse/skills/custom-connector-setup/bin")
from dynamic_credentials import add_surrogate_to_request, read_response_body

OWNER, REPO = "kakafengfeng", "lambert-hardware"
OUT = pathlib.Path.home() / "workspace/lambert-site/out"


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        raise RuntimeError("redirect refused")


def api(method, path, body=None):
    url = "https://api.github.com" + path
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, method=method)
    if data:
        req.add_header("Content-Type", "application/json")
    req.add_header("Accept", "application/vnd.github+json")
    add_surrogate_to_request(req, "custom.github", allowed_hosts=["api.github.com"])
    try:
        with urllib.request.build_opener(NoRedirect()).open(req, data=data, timeout=120) as r:
            return json.loads(read_response_body(r).decode())
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode()[:500]
        raise RuntimeError(f"{method} {path} -> HTTP {exc.code}: {detail}")


def api_retry(method, path, body=None, tries=6):
    last = None
    for i in range(tries):
        try:
            return api(method, path, body)
        except Exception as exc:
            last = exc
            print(f"  retry {i+1}/{tries} {method} {path}: {type(exc).__name__}: {str(exc)[:120]}", flush=True)
            time.sleep(3 * (i + 1))
    raise RuntimeError(f"FAILED {method} {path}: {last}")


def blob_sha(raw: bytes) -> str:
    h = hashlib.sha1()
    h.update(f"blob {len(raw)}\0".encode())
    h.update(raw)
    return h.hexdigest()


def collect_files():
    files = []
    for p in sorted(OUT.rglob("*")):
        if not p.is_file():
            continue
        rel = str(p.relative_to(OUT))
        if rel.startswith("sites/"):
            continue
        if "$" in rel:
            continue
        if p.suffix not in (".html", ".js", ".css", ".txt", ".json", ".webp", ".png", ".jpg", ".jpeg", ".svg", ".ico") and p.name != ".nojekyll":
            continue
        files.append((rel, p.read_bytes()))
    return files


def main():
    files = collect_files()
    print(f"files: {len(files)}", flush=True)

    # sanity-check: confirm a few computed SHAs exist as blobs on GitHub
    for rel, raw in files[:2] + files[-1:]:
        sha = blob_sha(raw)
        try:
            api("GET", f"/repos/{OWNER}/{REPO}/git/blobs/{sha}")
            print(f"  blob exists: {rel} {sha[:8]}", flush=True)
        except RuntimeError as exc:
            raise RuntimeError(f"blob missing for {rel} ({sha[:8]}); re-upload needed: {exc}")

    tree_entries = [
        {"path": rel, "mode": "100644", "type": "blob", "sha": blob_sha(raw)}
        for rel, raw in files
    ]

    try:
        ref = api_retry("GET", f"/repos/{OWNER}/{REPO}/git/ref/heads/gh-pages")
        parent = ref["object"]["sha"]
        have_parent = True
    except RuntimeError as exc:
        if "404" not in str(exc):
            raise
        parent = None
        have_parent = False
        print("no gh-pages ref yet; will create it", flush=True)

    tree = api_retry("POST", f"/repos/{OWNER}/{REPO}/git/trees", {"tree": tree_entries})
    print("tree:", tree["sha"][:8], flush=True)

    commit_body = {"message": "Deploy LAMBERT hardware site to GitHub Pages",
                   "tree": tree["sha"]}
    if have_parent:
        commit_body["parents"] = [parent]
        print("parent:", parent[:8], flush=True)
    commit = api_retry("POST", f"/repos/{OWNER}/{REPO}/git/commits", commit_body)
    print("commit:", commit["sha"][:8], flush=True)

    if have_parent:
        api_retry("PATCH", f"/repos/{OWNER}/{REPO}/git/refs/heads/gh-pages",
                  {"sha": commit["sha"], "force": False})
    else:
        api_retry("POST", f"/repos/{OWNER}/{REPO}/git/refs",
                  {"ref": "refs/heads/gh-pages", "sha": commit["sha"]})
    print("gh-pages updated to", commit["sha"][:8], flush=True)


main()
