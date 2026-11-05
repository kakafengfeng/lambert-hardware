"""Resume/refresh the lambert-hardware gh-pages deploy efficiently.

Compares locally computed blob SHAs (git hash-object equivalent) against the
blobs already in the repo: uploads only what is missing, then creates the
tree, commit, and moves the gh-pages ref. Safe to run any time — unchanged
files are reused by SHA.
"""
import base64
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


def api(method, path, body=None, tries=6):
    url = "https://api.github.com" + path
    last = None
    for i in range(tries):
        try:
            data = json.dumps(body).encode() if body is not None else None
            req = urllib.request.Request(url, method=method)
            if data:
                req.add_header("Content-Type", "application/json")
            req.add_header("Accept", "application/vnd.github+json")
            add_surrogate_to_request(req, "custom.github", allowed_hosts=["api.github.com"])
            with urllib.request.build_opener(NoRedirect()).open(req, data=data, timeout=120) as r:
                return json.loads(read_response_body(r).decode())
        except Exception as exc:
            last = exc
            time.sleep(2 * (i + 1))
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
        if p.suffix not in (".html", ".js", ".css", ".txt", ".json", ".webp",
                            ".png", ".jpg", ".jpeg", ".svg", ".ico") and p.name != ".nojekyll":
            continue
        files.append((rel, p.read_bytes()))
    return files


def main():
    files = collect_files()
    print(f"files: {len(files)}", flush=True)

    ref = api("GET", f"/repos/{OWNER}/{REPO}/git/ref/heads/gh-pages")
    parent = ref["object"]["sha"]
    tree = api("GET", f"/repos/{OWNER}/{REPO}/git/trees/{parent}?recursive=1")
    have = {t["sha"] for t in tree["tree"] if t["type"] == "blob"}
    print(f"blobs already in repo: {len(have)}", flush=True)

    entries = []
    uploaded = 0
    for rel, raw in files:
        sha = blob_sha(raw)
        if sha not in have:
            for i in range(5):
                try:
                    api("POST", f"/repos/{OWNER}/{REPO}/git/blobs",
                        {"content": base64.b64encode(raw).decode(), "encoding": "base64"})
                    break
                except Exception as exc:
                    print(f"  retry blob {rel}: {str(exc)[:100]}", flush=True)
                    time.sleep(2 * (i + 1))
            else:
                raise RuntimeError(f"blob failed for {rel}")
            uploaded += 1
            print(f"  uploaded {rel} ({len(raw) // 1024}KB)", flush=True)
        entries.append({"path": rel, "mode": "100644", "type": "blob", "sha": sha})
    print(f"uploaded {uploaded} new blobs, reused {len(files) - uploaded}", flush=True)

    new_tree = api("POST", f"/repos/{OWNER}/{REPO}/git/trees", {"tree": entries})
    commit = api("POST", f"/repos/{OWNER}/{REPO}/git/commits",
                 {"message": "Deploy LAMBERT hardware site to GitHub Pages",
                  "tree": new_tree["sha"], "parents": [parent]})
    api("PATCH", f"/repos/{OWNER}/{REPO}/git/refs/heads/gh-pages",
        {"sha": commit["sha"], "force": False})
    print("gh-pages updated to", commit["sha"][:8], flush=True)


main()
