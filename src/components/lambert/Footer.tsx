import { asset } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-lg font-bold tracking-[0.22em] text-ink">
              LAMBERT
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-mute">
              Functional hardware for cabinet makers. Factory-direct, quoted
              per project.
            </p>
          </div>
          <nav className="flex gap-12 text-sm">
            <div className="flex flex-col gap-2.5">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
                Site
              </p>
              <a href={asset("/products")} className="text-ink-soft hover:text-ink">
                Products
              </a>
              <a href={asset("/#series")} className="text-ink-soft hover:text-ink">
                Series
              </a>
              <a href={asset("/about")} className="text-ink-soft hover:text-ink">
                Why LAMBERT
              </a>
            </div>
            <div className="flex flex-col gap-2.5">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
                Trade
              </p>
              <a href={asset("/contact")} className="text-ink-soft hover:text-ink">
                Request a Quote
              </a>
              <a href={asset("/contact")} className="text-ink-soft hover:text-ink">
                Contact
              </a>
            </div>
          </nav>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-xs text-ink-mute sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 LAMBERT Hardware. All rights reserved.</p>
          <p className="font-mono">Trade only · Prices on request</p>
        </div>
      </div>
    </footer>
  );
}
