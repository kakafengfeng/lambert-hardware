"""Push full text source to main branch and delete the binary-push test file."""
import base64
import json
import pathlib
import sys
import urllib.request

sys.path.insert(0, "/opt/muse/skills/custom-connector-setup/bin")
from dynamic_credentials import add_surrogate_to_request, read_response_body

OWNER, REPO = "kakafengfeng", "lambert-hardware"
SRC = pathlib.Path.home() / "workspace/lambert-site"
SKIP_DIRS = {"node_modules", ".next", "out", ".git"}


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
            raw = read_response_body(r)
            return json.loads(raw.decode()) if raw else None
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode()[:500]
        raise RuntimeError(f"{method} {path} -> HTTP {exc.code}: {detail}")


def collect():
    files = []
    for p in sorted(SRC.rglob("*")):
        if not p.is_file():
            continue
        rel = p.relative_to(SRC)
        if any(part in SKIP_DIRS for part in rel.parts):
            continue
        # 跳过 public/sites 下的二进制素材（改走 CDN）
        if len(rel.parts) >= 2 and rel.parts[0] == "public" and rel.parts[1] == "sites":
            continue
        # token 无 workflow 权限，跳过 GitHub Actions 配置（不影响 Pages 部署）
        if len(rel.parts) >= 2 and rel.parts[0] == ".github" and rel.parts[1] == "workflows":
            print("  skip (no workflow scope):", rel, flush=True)
            continue
        try:
            raw = p.read_bytes()
            raw.decode("utf-8")
        except UnicodeDecodeError:
            print("  skip binary:", rel, flush=True)
            continue
        files.append((str(rel), raw))
    return files


def main():
    # 1. 删除测试文件（空仓库时跳过）
    try:
        cur = api("GET", f"/repos/{OWNER}/{REPO}/contents/test-pixel.png?ref=main")
        api("DELETE", f"/repos/{OWNER}/{REPO}/contents/test-pixel.png",
            {"message": "Remove binary push test file", "sha": cur["sha"], "branch": "main"})
        print("deleted test-pixel.png", flush=True)
    except RuntimeError as exc:
        print("delete skipped:", str(exc)[:120], flush=True)

    # 2. 推送源码
    files = collect()
    print(f"source files: {len(files)}", flush=True)
    try:
        ref = api("GET", f"/repos/{OWNER}/{REPO}/git/ref/heads/main")
        parent = ref["object"]["sha"]
        have_parent = True
    except RuntimeError as exc:
        if "404" not in str(exc) and "409" not in str(exc):
            raise
        parent = None
        have_parent = False
        print("empty repo: creating initial commit on main", flush=True)

    tree_entries = []
    for rel, raw in files:
        blob = api("POST", f"/repos/{OWNER}/{REPO}/git/blobs",
                   {"content": base64.b64encode(raw).decode(), "encoding": "base64"})
        tree_entries.append({"path": rel, "mode": "100644", "type": "blob", "sha": blob["sha"]})
    print("blobs done", flush=True)

    tree = api("POST", f"/repos/{OWNER}/{REPO}/git/trees", {"tree": tree_entries})
    commit_body = {"message": "LAMBERT hardware site source (Next.js static export, Phase 1 homepage)",
                   "tree": tree["sha"]}
    if have_parent:
        commit_body["parents"] = [parent]
    commit = api("POST", f"/repos/{OWNER}/{REPO}/git/commits", commit_body)
    if have_parent:
        api("PATCH", f"/repos/{OWNER}/{REPO}/git/refs/heads/main",
            {"sha": commit["sha"], "force": False})
    else:
        api("POST", f"/repos/{OWNER}/{REPO}/git/refs",
            {"ref": "refs/heads/main", "sha": commit["sha"]})
    print("main updated to", commit["sha"][:8], flush=True)


main()
