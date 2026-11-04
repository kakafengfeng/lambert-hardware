import { ArrowUpRight } from "lucide-react";
import { asset } from "@/lib/site";
import { PRODUCTS, type Product } from "@/data/products";
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

function ProductCard({ product }: { product: Product }) {
  const img = product.image ? asset(product.image) : asset("/images/placeholder.svg");
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgb(27_23_18/0.25)]">
      <div className="relative overflow-hidden bg-parchment">
        <img
          src={img}
          alt={product.name}
          className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
        {product.madeToOrder && (
          <span className="absolute right-4 top-4 rounded-full bg-brass-wash px-3 py-1 font-mono text-[11px] font-semibold tracking-wider text-brass-deep">
            MADE TO ORDER
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[11px] font-semibold tracking-[0.14em] text-ink-mute">
          {product.model}
        </p>
        <h3 className="mt-1.5 text-[15px] font-bold leading-snug tracking-tight text-ink">
          {product.name}
        </h3>
        {product.spec && (
          <p className="mt-1.5 font-mono text-xs text-ink-soft">{product.spec}</p>
        )}
        <div className="mt-auto pt-4">
          <a
            href={asset("/#contact")}
            className="inline-flex items-center gap-1 text-sm font-semibold text-ink transition-colors hover:text-brass-deep"
          >
            Request Quote
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

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
            <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
              A selection from the 266-SKU catalog. Full product listings with
              filters arrive in the next release — every item is quotable
              today.
            </p>
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
