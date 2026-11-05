import { ArrowRight, Mail, MessageCircle, MapPin } from "lucide-react";
import { asset, CONTACT } from "@/lib/site";
import { Reveal } from "./Reveal";

export function CtaBand() {
  return (
    <section id="contact" className="border-t border-line bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-brass-deep">
              Contact
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Tell us your cabinet specs — we&rsquo;ll spec the hardware.
            </h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink-soft">
              Send a model number, a cabinet width, or a full cut list. Trade
              inquiries only — pricing is quoted per project, never listed.
            </p>
            <a
              href={asset("/contact")}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper transition-all hover:bg-brass-deep active:scale-[0.98]"
            >
              Start an Inquiry
              <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-2xl border border-line bg-white p-7 sm:p-9">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-ink-mute">
                Reach us
              </h3>
              <ul className="mt-6 space-y-5">
                <li className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brass-wash">
                    <Mail className="h-5 w-5 text-brass-deep" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">Email</p>
                    <p className="mt-0.5 font-mono text-sm text-ink-mute">
                      {CONTACT.email ?? "coming soon"}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brass-wash">
                    <MessageCircle className="h-5 w-5 text-brass-deep" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">WhatsApp</p>
                    <p className="mt-0.5 font-mono text-sm text-ink-mute">
                      {CONTACT.whatsappDisplay ?? "coming soon"}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brass-wash">
                    <MapPin className="h-5 w-5 text-brass-deep" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">Based in</p>
                    <p className="mt-0.5 font-mono text-sm text-ink-mute">
                      {CONTACT.location}
                    </p>
                  </div>
                </li>
              </ul>
              <p className="mt-7 border-t border-line pt-5 text-xs leading-relaxed text-ink-mute">
                Prefer LinkedIn? Search LAMBERT hardware — our outreach team
                accepts trade connections.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
