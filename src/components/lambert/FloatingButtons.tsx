"use client";

import { useState } from "react";
import { MessageCircle, MessagesSquare, X, Copy, Check } from "lucide-react";
import { CONTACT } from "@/lib/site";

/**
 * Floating contact buttons (bottom-right, every page).
 * WhatsApp opens a wa.me chat; WeChat opens a small card with the
 * WeChat ID and a copy button.
 */
export function FloatingButtons() {
  const [wechatOpen, setWechatOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyWechat = async () => {
    if (!CONTACT.wechat) return;
    try {
      await navigator.clipboard.writeText(CONTACT.wechat);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = CONTACT.wechat;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {wechatOpen && (
        <div className="w-64 rounded-2xl border border-line bg-white p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-mute">
              WeChat
            </p>
            <button
              onClick={() => setWechatOpen(false)}
              aria-label="Close WeChat card"
              className="rounded-full p-1 text-ink-mute transition-colors hover:bg-paper hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          {CONTACT.wechat ? (
            <>
              <p className="mt-3 font-mono text-lg font-semibold text-ink">
                {CONTACT.wechat}
              </p>
              <button
                onClick={copyWechat}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied ? "Copied" : "Copy WeChat ID"}
              </button>
              <p className="mt-3 text-xs leading-relaxed text-ink-mute">
                Add us on WeChat and send your cabinet list for a quote.
              </p>
            </>
          ) : (
            <p className="mt-3 text-sm leading-relaxed text-ink-mute">
              WeChat ID coming soon.
            </p>
          )}
        </div>
      )}

      <div className="flex flex-col gap-3">
        <button
          onClick={() => setWechatOpen((v) => !v)}
          aria-label="Chat on WeChat"
          title="WeChat"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
          <MessagesSquare className="h-5 w-5" />
        </button>
        {CONTACT.whatsapp && (
          <a
            href={`https://wa.me/${CONTACT.whatsapp}`}
            target="_blank"
            rel="noopener"
            aria-label="Chat on WhatsApp"
            title="WhatsApp"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            <MessageCircle className="h-5 w-5" />
          </a>
        )}
      </div>
    </div>
  );
}
