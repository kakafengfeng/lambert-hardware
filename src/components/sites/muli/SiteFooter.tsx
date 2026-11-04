"use client";

import { Music2, Play } from "lucide-react";
import { NAV_ITEMS, SOCIALS, CONTACT, SOURCE } from "./data";

const ASSET = "https://wm.cdn.cn86.cn/mulimuwaiz";

/** 页脚：深灰底，社交图标（微信类 hover 弹二维码）+ 链接矩阵 + 联系方式 */
export function SiteFooter() {
  return (
    <footer className="w-full bg-muli-ink text-[15px] text-muli-gray">
      <div className="px-[3%] py-14">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          {/* logo + 社交 */}
          <div>
            <a href={SOURCE} className="block h-12 w-[207px]">
              <img
                src={`${ASSET}/2026/06/6f2abd8aaamehh5f.png`}
                alt="木里木外MULI"
                className="h-full w-full object-contain"
              />
            </a>
            <div className="mt-8 flex items-center gap-5">
              {SOCIALS.map((s) => (
                <div key={s.name} className="group relative">
                  <a
                    href={s.href}
                    aria-label={s.name}
                    className="flex h-8 w-8 items-center justify-center text-muli-gray transition-colors hover:text-muli-sand"
                  >
                    {s.image ? (
                      <img
                        src={s.image}
                        alt={s.name}
                        className="max-h-full max-w-full object-contain opacity-70 transition-opacity group-hover:opacity-100"
                      />
                    ) : s.lucide === "music" ? (
                      <Music2 size={20} strokeWidth={1.5} />
                    ) : (
                      <Play size={20} strokeWidth={1.5} />
                    )}
                  </a>
                  {s.qr && (
                    <div className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100">
                      <img
                        src={s.qr}
                        alt={`${s.name}二维码`}
                        className="h-[120px] w-[120px] bg-white object-contain p-1"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 链接矩阵 + 联系方式 */}
          <div className="grid flex-1 grid-cols-2 gap-10 sm:grid-cols-3 lg:max-w-3xl lg:grid-cols-4">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                <a
                  href={item.href}
                  className="mb-4 block tracking-[0.2em] text-muli-cream/90 transition-colors hover:text-muli-camel"
                >
                  {item.label}
                </a>
                {item.children.length > 0 && (
                  <ul className="space-y-2.5">
                    {item.children.map((sub) => (
                      <li key={sub.label}>
                        <a
                          href={sub.href}
                          className="text-sm text-muli-gray transition-colors hover:text-muli-sand"
                        >
                          {sub.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <div>
              <span className="mb-4 block tracking-[0.2em] text-muli-cream/90">
                联系方式
              </span>
              <ul className="space-y-2.5 text-sm">
                <li>总机&nbsp;&nbsp;{CONTACT.phone}</li>
                <li>
                  <a
                    href={`mailto:${CONTACT.email1}`}
                    className="transition-colors hover:text-muli-sand"
                  >
                    {CONTACT.email1}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${CONTACT.email2}`}
                    className="transition-colors hover:text-muli-sand"
                  >
                    {CONTACT.email2}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="flex flex-col items-center justify-between gap-3 px-[3%] py-5 text-[13px] text-muli-gray/70 md:flex-row">
          <p>© 2026 木里木外家具启东有限公司 版权所有</p>
          <div className="flex items-center gap-5">
            <span>苏ICP备17054849号-2</span>
            <a href={`${SOURCE}/sitemap.xml`} className="transition-colors hover:text-muli-sand">
              网站地图
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
