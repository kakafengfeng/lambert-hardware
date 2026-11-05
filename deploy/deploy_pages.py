"""Deploy the Next.js static export (out/) to the gh-pages branch via Git Data API."""
import base64
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


def collect_files():
    files = []
    for p in sorted(OUT.rglob("*")):
        if not p.is_file():
            continue
        rel = str(p.relative_to(OUT))
        if rel.startswith("sites/"):
            continue
        # Skip Turbopack internal manifests ($ in name) — unneeded for static serving.
        if "$" in rel:
            continue
        if p.suffix not in (".html", ".js", ".css", ".txt", ".json", ".webp", ".png", ".jpg", ".jpeg", ".svg", ".ico") and p.name != ".nojekyll":
            continue
        files.append((rel, p.read_bytes()))
    return files


def main():
    files = collect_files()
    print(f"files: {len(files)}", flush=True)

    # 1. create blobs (retry transient failures, always naming the file)
    tree_entries = []
    for rel, raw in files:
        last_err = None
        for attempt in range(5):
            try:
                blob = api("POST", f"/repos/{OWNER}/{REPO}/git/blobs",
                           {"content": base64.b64encode(raw).decode(), "encoding": "base64"})
                last_err = None
                break
            except Exception as exc:  # transient network/API errors
                last_err = exc
                print(f"  retry {attempt+1}/5 blob {rel}: {type(exc).__name__}: {str(exc)[:120]}", flush=True)
                time.sleep(2 * (attempt + 1))
        if last_err is not None:
            raise RuntimeError(f"blob failed for {rel}: {last_err}")
        tree_entries.append({"path": rel, "mode": "100644", "type": "blob", "sha": blob["sha"]})
        print(f"  blob {rel} ({len(raw)//1024}KB)", flush=True)
        time.sleep(0.2)  # be gentle with the API

    # 2. current gh-pages head (parent); create the ref on first deploy
    try:
        ref = api("GET", f"/repos/{OWNER}/{REPO}/git/ref/heads/gh-pages")
        parent = ref["object"]["sha"]
        have_parent = True
    except RuntimeError as exc:
        if "404" not in str(exc):
            raise
        parent = None
        have_parent = False
        print("no gh-pages ref yet; will create it", flush=True)

    # 3. tree (fresh, exactly these files)
    tree = api("POST", f"/repos/{OWNER}/{REPO}/git/trees",
               {"tree": tree_entries})
    print("tree:", tree["sha"][:8], flush=True)

    # 4. commit
    commit_body = {"message": "Deploy LAMBERT hardware site to GitHub Pages",
                   "tree": tree["sha"]}
    if have_parent:
        commit_body["parents"] = [parent]
        print("parent:", parent[:8], flush=True)
    commit = api("POST", f"/repos/{OWNER}/{REPO}/git/commits", commit_body)
    print("commit:", commit["sha"][:8], flush=True)

    # 5. create or update ref
    if have_parent:
        api("PATCH", f"/repos/{OWNER}/{REPO}/git/refs/heads/gh-pages",
            {"sha": commit["sha"], "force": False})
    else:
        api("POST", f"/repos/{OWNER}/{REPO}/git/refs",
            {"ref": "refs/heads/gh-pages", "sha": commit["sha"]})
    print("gh-pages updated to", commit["sha"][:8], flush=True)


main()
