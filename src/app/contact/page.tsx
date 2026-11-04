"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, MessageCircle, Send } from "lucide-react";
import { Header } from "@/components/lambert/Header";
import { Footer } from "@/components/lambert/Footer";
import { Reveal } from "@/components/lambert/Reveal";
import { CONTACT, asset } from "@/lib/site";
import { getProduct } from "@/lib/catalog";

/**
 * Contact channels are not yet provided by the brand owner.
 * These placeholders are wired into the buttons and clearly marked
 * in the UI — replace CONTACT.email / CONTACT.whatsapp in lib/site.ts.
 */
const PLACEHOLDER_EMAIL = "quotes@lambert.example";
const PLACEHOLDER_WHATSAPP = "000000000000";

const inputCls =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-mute focus:border-brass";

function InquiryForm() {
  const searchParams = useSearchParams();
  const prefill = searchParams.get("product") ?? "";
  const prefillProduct = prefill ? getProduct(prefill) : undefined;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("");
  const [interest, setInterest] = useState(
    prefillProduct
      ? `${prefillProduct.model} — ${prefillProduct.name}`
      : prefill
  );
  const [message, setMessage] = useState("");

  const subject = useMemo(
    () => `LAMBERT Inquiry${interest ? ` — ${interest.split("—")[0].trim()}` : ""}`,
    [interest]
  );
  const body = useMemo(() => {
    const lines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company}`,
      `Country: ${country}`,
      `Product interest: ${interest}`,
      "",
      message,
    ];
    return lines.join("\n");
  }, [name, email, company, country, interest, message]);

  const targetEmail = CONTACT.email ?? PLACEHOLDER_EMAIL;
  const targetWhatsapp = CONTACT.whatsapp ?? PLACEHOLDER_WHATSAPP;

  const sendEmail = () => {
    window.location.href = `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  const sendWhatsapp = () => {
    window.open(
      `https://wa.me/${targetWhatsapp}?text=${encodeURIComponent(`${subject}\n\n${body}`)}`,
      "_blank",
      "noopener"
    );
  };

  return (
    <div className="rounded-2xl border border-line bg-white p-7 sm:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
            Name *
          </span>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={inputCls} />
        </label>
        <label className="block">
          <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
            Email *
          </span>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" type="email" className={inputCls} />
        </label>
        <label className="block">
          <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
            Company
          </span>
          <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company / studio" className={inputCls} />
        </label>
        <label className="block">
          <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
            Country
          </span>
          <input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" className={inputCls} />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
            Product interest
          </span>
          <input value={interest} onChange={(e) => setInterest(e.target.value)} placeholder="Model number, e.g. 11.02.0011" className={inputCls} />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
            Message
          </span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Cabinet dimensions, quantities, target delivery date…"
            rows={5}
            className={inputCls}
          />
        </label>
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={sendEmail}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper transition-all hover:bg-brass-deep active:scale-[0.98]"
        >
          <Mail className="h-4 w-4" />
          Send via Email
        </button>
        <button
          onClick={sendWhatsapp}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-line bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-all hover:border-ink-mute active:scale-[0.98]"
        >
          <MessageCircle className="h-4 w-4" />
          Chat on WhatsApp
        </button>
      </div>
      <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-ink-mute">
        <Send className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        Our email and WhatsApp are being set up — these buttons currently use
        temporary placeholders ({PLACEHOLDER_EMAIL} · +{PLACEHOLDER_WHATSAPP}).
        Trade inquiries only.
      </p>
    </div>
  );
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-paper">
      <Header />
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-28 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Reveal>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-brass-deep">
                Contact
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                Request a quote
              </h1>
              <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">
                Send a model number, a cabinet width, or a full cut list. We
                reply to trade inquiries with project pricing — nothing is
                priced on the site.
              </p>
              <ul className="mt-8 space-y-4">
                <li className="flex items-center gap-3 text-sm">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brass-wash">
                    <Mail className="h-5 w-5 text-brass-deep" />
                  </span>
                  <span className="font-mono text-ink-mute">
                    {CONTACT.email ?? "Email coming soon"}
                  </span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brass-wash">
                    <MessageCircle className="h-5 w-5 text-brass-deep" />
                  </span>
                  <span className="font-mono text-ink-mute">
                    {CONTACT.whatsapp ?? "WhatsApp coming soon"}
                  </span>
                </li>
              </ul>
              <p className="mt-8 text-sm text-ink-soft">
                Browsing the catalog?{" "}
                <a
                  href={asset("/products")}
                  className="font-semibold text-ink underline decoration-brass decoration-2 underline-offset-4 hover:text-brass-deep"
                >
                  See all 266 products
                </a>
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-3">
            <Reveal delay={120}>
              <Suspense
                fallback={
                  <div className="rounded-2xl border border-line bg-white p-10 text-sm text-ink-mute">
                    Loading inquiry form…
                  </div>
                }
              >
                <InquiryForm />
              </Suspense>
            </Reveal>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
