import { ArrowRight, ArrowUpRight } from "lucide-react";
import { asset } from "@/lib/site";
import { Reveal } from "./Reveal";

const STATS = [
  { value: "266", label: "SKUs in catalog" },
  { value: "3", label: "Product series" },
  { value: "20–30", label: "Days, made-to-order lead time" },
  { value: "1:1", label: "Factory-direct supply" },
];

function SpecChip({
  model,
  name,
  className = "",
}: {
  model: string;
  name: string;
  className?: string;
}) {
  return (
    <div
      className={`absolute z-10 rounded-md border border-line bg-paper/95 px-3 py-2 shadow-sm backdrop-blur ${className}`}
    >
      <div className="font-mono text-[10px] font-semibold tracking-wider text-brass-deep">
        {model}
      </div>
      <div className="mt-0.5 max-w-[180px] text-xs font-medium leading-tight text-ink-soft">
        {name}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-16">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-12 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-8 lg:pb-24 lg:pt-20">
        {/* Copy */}
        <div>
          <Reveal>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-brass-deep">
              Factory-direct · Functional hardware
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
              Functional Hardware,
              <br />
              Engineered for
              <br />
              Cabinet Makers
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              266 SKUs of kitchen and wardrobe hardware — pull-out baskets,
              dish drawers, corner systems, trouser racks and shoe carousels —
              supplied factory-direct with custom sizes on request.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={asset("/products")}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper transition-all hover:bg-brass-deep active:scale-[0.98]"
              >
                Browse Products
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={asset("/contact")}
                className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-7 py-3.5 text-sm font-semibold text-ink transition-all hover:border-ink hover:bg-ink hover:text-paper active:scale-[0.98]"
              >
                Request a Quote
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col bg-paper px-5 py-4">
                  <dd className="text-2xl font-bold tracking-tight text-ink">
                    {s.value}
                  </dd>
                  <dt className="mt-1 text-xs leading-snug text-ink-mute">
                    {s.label}
                  </dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Visual collage */}
        <Reveal delay={200} className="relative">
          <div className="lambert-grid relative rounded-2xl border border-line bg-parchment/60 p-6 sm:p-10">
            <div className="grid grid-cols-12 gap-4">
              <div className="relative col-span-7 overflow-hidden rounded-xl border border-line bg-white shadow-sm">
                <img
                  src={asset("/images/products/11.02.0011.webp")}
                  alt="600mm LAMBERT tilt-out double-tier dish drawer"
                  className="aspect-[4/5] w-full object-cover"
                  loading="eager"
                />
              </div>
              <div className="col-span-5 flex flex-col gap-4">
                <div className="relative overflow-hidden rounded-xl border border-line bg-white shadow-sm">
                  <img
                    src={asset("/images/products/11.03.1011.webp")}
                    alt="LAMBERT magic corner unit"
                    className="aspect-square w-full object-cover"
                    loading="eager"
                  />
                </div>
                <div className="relative flex-1 overflow-hidden rounded-xl border border-line bg-white shadow-sm">
                  <img
                    src={asset("/images/products/05.08.5212.webp")}
                    alt="LAMBERT rotating shoe rack"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
            <SpecChip
              model="11.02.0011"
              name="Tilt-Out Double-Tier Dish Drawer"
              className="-left-2 top-8 sm:left-4"
            />
            <SpecChip
              model="11.03.1011"
              name="Magic Corner Unit · Left"
              className="-right-2 bottom-10 sm:right-4"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
