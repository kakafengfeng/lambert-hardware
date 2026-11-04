import { PRODUCTS, type Product } from "@/data/products";
import { asset } from "./site";

export { PRODUCTS };
export type { Product };

/** Series in catalog order. */
export const SERIES_LIST: string[] = [
  ...new Set(PRODUCTS.map((p) => p.series)),
];

/** Categories in catalog order. */
export const CATEGORY_LIST: string[] = [
  ...new Set(PRODUCTS.map((p) => p.category)),
];

export function getProduct(model: string): Product | undefined {
  return PRODUCTS.find((p) => p.model === model);
}

export function productImage(p: Product): string {
  return asset(p.image ?? "/images/placeholder.svg");
}

export function relatedProducts(p: Product, count = 4): Product[] {
  return PRODUCTS.filter(
    (x) => x.category === p.category && x.model !== p.model
  ).slice(0, count);
}

export function quoteUrl(model?: string): string {
  return asset(model ? `/contact?product=${encodeURIComponent(model)}` : "/contact");
}
