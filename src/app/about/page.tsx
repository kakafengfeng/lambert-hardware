import { ArrowUpRight, Factory, Layers, Ruler, Timer } from "lucide-react";
import { Header } from "@/components/lambert/Header";
import { Footer } from "@/components/lambert/Footer";
import { Reveal } from "@/components/lambert/Reveal";
import { asset } from "@/lib/site";
import { PRODUCTS, SERIES_LIST } from "@/lib/catalog";

const PILLARS = [
  {
    icon: Factory,
    title: "Factory-direct supply",
    body: "Every SKU ships from the factory floor — no trading layers, no rebranding. What you spec is what gets built.",
  },
  {
    icon: Layers,
    title: "One supplier, 266 SKUs",
    body: "Kitchen pull-outs, wardrobe storage, and corner systems from a single catalog — one order, one shipment, one contact.",
  },
  {
    icon: Ruler,
    title: "Custom sizes available",
    body: "Cabinet widths rarely match the catalog. Made-to-order sizes are part of the program, not an exception.",
  },
  {
    icon: Timer,
    title: "20–30 day lead time",
    body: "Made-to-order items ship in 20–30 days. Standard-program items move faster — ask for current stock.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-paper">
      <Header />
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-28 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-brass-deep">
            About LAMBERT
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Functional hardware, built for the people who install it.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
            LAMBERT is a functional-hardware brand for cabinet makers,
            kitchen studios, and wardrobe installers. We focus on the parts
            that move — pull-out baskets, dish drawers, corner systems,
            trouser racks, and rotating shoe carousels — engineered to fit
            standard cabinet dimensions and built to survive daily use.
          </p>
        </Reveal>

        {/* Pillars */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={(i % 4) * 80}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brass-wash">
                  <p.icon className="h-5 w-5 text-brass-deep" />
                </span>
                <h2 className="mt-5 text-lg font-bold tracking-tight text-ink">
                  {p.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Catalog strip */}
        <Reveal>
          <div className="mt-16 rounded-2xl bg-ink p-8 text-paper sm:p-12">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-brass">
                  The catalog
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                  Three series. {PRODUCTS.length} SKUs. Zero guesswork.
                </h2>
                <p className="mt-4 max-w-md leading-relaxed text-paper/70">
                  Every product carries a fixed model number and published
                  dimensions. Spec it once — reorder it forever.
                </p>
                <a
                  href={asset("/products")}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-paper px-7 py-3.5 text-sm font-semibold text-ink transition-all hover:bg-brass-wash active:scale-[0.98]"
                >
                  Browse the Catalog
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
              <ul className="space-y-4">
                {SERIES_LIST.map((s) => {
                  const count = PRODUCTS.filter((p) => p.series === s).length;
                  return (
                    <li
                      key={s}
                      className="flex items-baseline justify-between border-b border-paper/15 pb-4"
                    >
                      <span className="text-lg font-semibold">{s}</span>
                      <span className="font-mono text-sm text-paper/60">
                        {count} SKUs
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Company profile placeholder */}
        <Reveal>
          <div className="mt-16 rounded-2xl border border-dashed border-line bg-parchment/60 p-8 sm:p-10">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-brass-deep">
              Company profile
            </p>
            <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
              Factory introduction, production capacity, and quality process
              are being prepared — this section will be completed with the
              brand owner&rsquo;s materials.
            </p>
          </div>
        </Reveal>
      </div>
      <Footer />
    </main>
  );
}
