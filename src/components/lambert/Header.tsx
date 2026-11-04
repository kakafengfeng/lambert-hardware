"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { asset } from "@/lib/site";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Products", href: "/products" },
  { label: "Series", href: "/#series" },
  { label: "Why LAMBERT", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-line bg-paper/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href={asset("/#top")} className="flex items-baseline gap-2">
          <span className="text-lg font-bold tracking-[0.22em] text-ink">
            LAMBERT
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute sm:inline">
            Hardware
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={asset(item.href)}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={asset("/contact")}
            className="hidden items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-all hover:bg-brass-deep active:scale-[0.97] md:inline-flex"
          >
            Request a Quote
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line bg-paper px-5 py-4 md:hidden">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={asset(item.href)}
              onClick={() => setOpen(false)}
              className="block border-b border-line/60 py-3 text-sm font-medium text-ink-soft last:border-0"
            >
              {item.label}
            </a>
          ))}
          <a
            href={asset("/contact")}
            onClick={() => setOpen(false)}
            className="mt-3 flex items-center justify-center gap-1.5 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper"
          >
            Request a Quote
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </nav>
      )}
    </header>
  );
}
