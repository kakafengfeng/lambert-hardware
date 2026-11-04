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

/** Contact details are not yet provided — placeholders shown on site. */
export const CONTACT = {
  email: null as string | null,
  whatsapp: null as string | null,
  location: "Shanghai, China",
} as const;
