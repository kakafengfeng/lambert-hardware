import type { NextConfig } from "next";

// Static export for GitHub Pages project site (kakafengfeng.github.io/lambert-hardware).
// NEXT_BASE_PATH can override at build time; NEXT_PUBLIC_BASE_PATH is synced
// so the client-side asset() helper keeps its prefix in the static export.
const basePath = process.env.NEXT_BASE_PATH ?? "/lambert-hardware";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH ?? basePath,
  },
};

export default nextConfig;
