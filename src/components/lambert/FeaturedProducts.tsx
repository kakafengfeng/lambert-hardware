import { ArrowRight } from "lucide-react";
import { asset } from "@/lib/site";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { Reveal } from "./Reveal";

const FEATURED_MODELS = [
  "11.02.0011", // dish drawer
  "11.03.1011", // magic corner
  "05.08.2260", // trouser rack
  "05.08.5212", // shoe carousel
  "11.04.1011", // pull-down basket
  "11.01.0010", // swivel carousel
  "11.02.1321", // seasoning drawer
  "05.08.1261", // slim basket
];

export function FeaturedProducts() {
  const featured = FEATURED_MODELS.map(
    (m) => PRODUCTS.find((p) => p.model === m)!
  ).filter(Boolean);

  return (
    <section id="products" className="border-t border-line bg-parchment/50">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-brass-deep">
                Featured products
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                The SKUs cabinet makers ask for first
              </h2>
            </div>
            <a
              href={asset("/products")}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-brass-deep"
            >
              Browse all 266 products
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.model} delay={(i % 4) * 80}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
