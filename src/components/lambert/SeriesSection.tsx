import { ArrowUpRight } from "lucide-react";
import { asset } from "@/lib/site";
import { SERIES } from "@/data/products";
import { Reveal } from "./Reveal";

export function SeriesSection() {
  return (
    <section id="series" className="border-t border-line bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <Reveal>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-brass-deep">
            Series
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Three series, one complete hardware package
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Kitchen storage, wardrobe systems and the signature Madrid line —
            every SKU dimensioned, mounted and ready to spec into your
            cabinetry.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {SERIES.map((s, i) => (
            <Reveal key={s.id} delay={i * 100}>
              <a
                href={asset("/products")}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgb(27_23_18/0.25)]"
              >
                <div className="relative overflow-hidden bg-parchment">
                  <img
                    src={asset(s.image)}
                    alt={s.name}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-ink/85 px-3 py-1 font-mono text-[11px] font-semibold tracking-wider text-paper backdrop-blur">
                    {s.count} SKUs
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-xl font-bold tracking-tight text-ink">
                      {s.name}
                    </h3>
                    {"tag" in s && s.tag && (
                      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-brass-deep">
                        {s.tag}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                    {s.blurb}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-ink transition-colors group-hover:text-brass-deep">
                    View series
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
