"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Header } from "@/components/lambert/Header";
import { Footer } from "@/components/lambert/Footer";
import { ProductCard } from "@/components/lambert/ProductCard";
import { Reveal } from "@/components/lambert/Reveal";
import { PRODUCTS } from "@/data/products";
import { CATEGORY_LIST, SERIES_LIST } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const ALL = "All";

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [series, setSeries] = useState<string>(ALL);
  const [category, setCategory] = useState<string>(ALL);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      if (series !== ALL && p.series !== series) return false;
      if (category !== ALL && p.category !== category) return false;
      if (q) {
        const hay = `${p.model} ${p.name} ${p.spec}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [query, series, category]);

  const hasFilter = query.trim() !== "" || series !== ALL || category !== ALL;

  return (
    <main className="min-h-screen bg-paper">
      <Header />
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-28 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-brass-deep">
            Product catalog
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            266 SKUs, one hardware supplier
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
            Kitchen and wardrobe functional hardware, factory-direct. Filter by
            series or category, or search by model number — every item is
            quoted per project.
          </p>
        </Reveal>

        {/* Filter bar */}
        <div className="sticky top-16 z-30 -mx-5 mt-10 border-y border-line bg-paper/95 px-5 py-4 backdrop-blur-md sm:-mx-8 sm:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center">
            <label className="relative block w-full lg:max-w-xs">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-mute" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search model or name…"
                className="w-full rounded-full border border-line bg-white py-2.5 pl-11 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-ink-mute focus:border-brass"
              />
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {[ALL, ...SERIES_LIST].map((s) => (
                <button
                  key={s}
                  onClick={() => setSeries(s)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                    series === s
                      ? "border-ink bg-ink text-paper"
                      : "border-line bg-white text-ink-soft hover:border-ink-mute"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 lg:ml-auto">
              <SlidersHorizontal className="h-4 w-4 shrink-0 text-ink-mute" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink outline-none transition-colors focus:border-brass lg:w-auto"
                aria-label="Filter by category"
              >
                <option value={ALL}>All categories</option>
                {CATEGORY_LIST.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {hasFilter && (
                <button
                  onClick={() => {
                    setQuery("");
                    setSeries(ALL);
                    setCategory(ALL);
                  }}
                  className="inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-ink-mute transition-colors hover:text-ink"
                >
                  <X className="h-4 w-4" />
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results */}
        <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-ink-mute">
          {filtered.length} of {PRODUCTS.length} products
        </p>
        {filtered.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.model} product={p} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-line bg-white p-16 text-center">
            <p className="text-lg font-bold text-ink">No products match</p>
            <p className="mt-2 text-sm text-ink-soft">
              Try a different model number, name, or clear the filters.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
