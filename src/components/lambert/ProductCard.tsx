import { ArrowUpRight } from "lucide-react";
import { asset } from "@/lib/site";
import { productImage, quoteUrl, type Product } from "@/lib/catalog";

/** Shared product card — same approved styling as the homepage featured cards. */
export function ProductCard({ product }: { product: Product }) {
  const detailUrl = asset(`/products/${product.model}`);
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgb(27_23_18/0.25)]">
      <a href={detailUrl} className="relative block overflow-hidden bg-parchment">
        <img
          src={productImage(product)}
          alt={product.name}
          className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
        {product.madeToOrder && (
          <span className="absolute right-4 top-4 rounded-full bg-brass-wash px-3 py-1 font-mono text-[11px] font-semibold tracking-wider text-brass-deep">
            MADE TO ORDER
          </span>
        )}
      </a>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[11px] font-semibold tracking-[0.14em] text-ink-mute">
          {product.model}
        </p>
        <h3 className="mt-1.5 text-[15px] font-bold leading-snug tracking-tight text-ink">
          <a href={detailUrl} className="transition-colors hover:text-brass-deep">
            {product.name}
          </a>
        </h3>
        {product.spec && (
          <p className="mt-1.5 font-mono text-xs text-ink-soft">{product.spec}</p>
        )}
        <div className="mt-auto pt-4">
          <a
            href={quoteUrl(product.model)}
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
