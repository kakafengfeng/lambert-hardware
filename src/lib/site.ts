/** Base path for the GitHub Pages project site. Synced from NEXT_BASE_PATH at build time. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a public asset path with the base path exactly once. */
export function asset(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${p}`;
}

export const SITE = {
  brand: "LAMBERT",
  tagline: "Functional Hardware, Engineered for Cabinet Makers",
  liveUrl: "https://kakafengfeng.github.io/lambert-hardware/",
} as const;

/** Contact details — provided by the brand owner (2026-11-05). */
export const CONTACT = {
  email: "kakapa871011@gmail.com",
  /** wa.me international format: country code + number, no plus/spaces. */
  whatsapp: "8617602191587",
  whatsappDisplay: "+86 176 0219 1587",
  /** WeChat ID — provided by the brand owner (2026-11-05). */
  wechat: "zhangyanhui95",
  location: "Shanghai, China",
} as const;
