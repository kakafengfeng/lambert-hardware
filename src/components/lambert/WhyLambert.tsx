import { Factory, Layers, Ruler, Clock } from "lucide-react";
import { Reveal } from "./Reveal";

const POINTS = [
  {
    icon: Factory,
    title: "Factory-direct supply",
    body: "Sourced straight from the factory floor — no distributors, no markups stacked in between. You talk to the source.",
  },
  {
    icon: Layers,
    title: "266 SKUs, one supplier",
    body: "Pull-out baskets, dish drawers, corner systems, hanging rails, trouser racks and shoe carousels — the full hardware package from a single catalog.",
  },
  {
    icon: Ruler,
    title: "Custom sizes available",
    body: "Made-to-order models cover non-standard cabinet widths. Send your dimensions and we build to fit.",
  },
  {
    icon: Clock,
    title: "20–30 day lead time",
    body: "Made-to-order production runs on a stated schedule — quoted up front, so you can plan your installs.",
  },
];

export function WhyLambert() {
  return (
    <section id="why" className="border-t border-line bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <Reveal>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-brass">
            Why LAMBERT
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            Built for people who install hardware every day
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {POINTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 80} className="h-full">
              <div className="flex h-full flex-col bg-ink p-7">
                <p.icon className="h-7 w-7 text-brass" strokeWidth={1.75} />
                <h3 className="mt-5 text-lg font-bold tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-paper/70">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
