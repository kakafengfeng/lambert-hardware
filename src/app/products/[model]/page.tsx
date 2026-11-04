import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Header } from "@/components/lambert/Header";
import { Footer } from "@/components/lambert/Footer";
import { ProductCard } from "@/components/lambert/ProductCard";
import { asset } from "@/lib/site";
import { PRODUCTS, getProduct, productImage, quoteUrl, relatedProducts } from "@/lib/catalog";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ model: p.model }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ model: string }>;
}) {
  const { model } = await params;
  const p = getProduct(model);
  return {
    title: p ? `${p.name} — ${p.model} | LAMBERT Hardware` : "Product | LAMBERT Hardware",
    description: p
      ? `${p.name} (${p.model}). ${p.spec}. Factory-direct functional hardware — request a quote.`
      : "LAMBERT functional hardware product.",
  };
}

function SpecRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-line/70 py-3.5 last:border-0">
      <dt className="shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
        {label}
      </dt>
      <dd
        className={
          mono
            ? "text-right font-mono text-sm font-semibold text-ink"
            : "text-right text-sm font-medium text-ink"
        }
      >
        {value}
      </dd>
    </div>
  );
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ model: string }>;
}) {
  const { model } = await params;
  const product = getProduct(model);
  if (!product) notFound();
  const related = relatedProducts(product);

  return (
    <main className="min-h-screen bg-paper">
      <Header />
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-28 sm:px-8">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 font-mono text-xs text-ink-mute">
          <a href={asset("/")} className="transition-colors hover:text-ink">
            Home
          </a>
          <span>/</span>
          <a href={asset("/products")} className="transition-colors hover:text-ink">
            Products
          </a>
          <span>/</span>
          <span className="text-ink-soft">{product.category}</span>
          <span>/</span>
          <span className="font-semibold text-ink">{product.model}</span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <div className="overflow-hidden rounded-2xl border border-line bg-parchment">
            <img
              src={productImage(product)}
              alt={product.name}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>

          {/* Info */}
          <div>
            {product.madeToOrder && (
              <span className="inline-block rounded-full bg-brass-wash px-3 py-1 font-mono text-[11px] font-semibold tracking-wider text-brass-deep">
                MADE TO ORDER
              </span>
            )}
            <p className="mt-4 font-mono text-sm font-semibold tracking-[0.14em] text-ink-mute">
              {product.model}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {product.name}
            </h1>

            <dl className="mt-8 rounded-2xl border border-line bg-white px-6 py-2">
              <SpecRow label="Series" value={product.series} />
              <SpecRow label="Category" value={product.category} />
              {product.spec && (
                <SpecRow label="Dimensions" value={product.spec} mono />
              )}
              <SpecRow label="Unit" value={product.unit} />
              <SpecRow
                label="Availability"
                value={
                  product.madeToOrder
                    ? "Made to order · MOQ 1 · 20–30 days"
                    : "Standard program"
                }
              />
            </dl>

            {product.note && (
              <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-ink-soft">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brass-deep" />
                {product.note}
              </p>
            )}

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={quoteUrl(product.model)}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper transition-all hover:bg-brass-deep active:scale-[0.98]"
              >
                Request Quote for {product.model}
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={asset("/products")}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-all hover:border-ink-mute"
              >
                <ArrowLeft className="h-4 w-4" />
                All Products
              </a>
            </div>

            <p className="mt-6 text-xs leading-relaxed text-ink-mute">
              Trade only · Pricing is quoted per project, never listed. Send
              the model number for an exact specification sheet.
            </p>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-24">
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Related in {product.category}
              </h2>
              <a
                href={asset("/products")}
                className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-ink transition-colors hover:text-brass-deep"
              >
                View all
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.model} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </main>
  );
}
