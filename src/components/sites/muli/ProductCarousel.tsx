"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { PRODUCTS, SOURCE } from "./data";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

const ASSET = "https://wm.cdn.cn86.cn/mulimuwaiz";

/** 产品轮播：Swiper 式横向卡片，自动播放 + 可拖拽细滚动条 */
export function ProductCarousel() {
  const railRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [paused, setPaused] = useState(false);

  const syncThumb = useCallback(() => {
    const rail = railRef.current;
    const thumb = thumbRef.current;
    if (!rail || !thumb) return;
    const maxScroll = rail.scrollWidth - rail.clientWidth;
    const trackW = thumb.parentElement?.clientWidth ?? 0;
    const thumbW = Math.max(48, (rail.clientWidth / rail.scrollWidth) * trackW);
    thumb.style.width = `${thumbW}px`;
    const x = maxScroll > 0 ? (rail.scrollLeft / maxScroll) * (trackW - thumbW) : 0;
    thumb.style.transform = `translateX(${x}px)`;
  }, []);

  // 自动播放
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      const rail = railRef.current;
      if (!rail) return;
      const card = rail.querySelector<HTMLElement>("[data-card]");
      const step = card ? card.offsetWidth + 24 : 400;
      const maxScroll = rail.scrollWidth - rail.clientWidth;
      const next = rail.scrollLeft + step;
      rail.scrollTo({ left: next >= maxScroll - 8 ? 0 : next, behavior: "smooth" });
    }, 4000);
    return () => clearInterval(id);
  }, [paused]);

  useEffect(() => {
    syncThumb();
    window.addEventListener("resize", syncThumb);
    return () => window.removeEventListener("resize", syncThumb);
  }, [syncThumb]);

  // 拖拽滚动条
  const onThumbDown = (e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = true;
    const startX = e.clientX;
    const rail = railRef.current;
    const thumb = thumbRef.current;
    if (!rail || !thumb) return;
    const startLeft = rail.scrollLeft;
    const trackW = thumb.parentElement?.clientWidth ?? 1;
    const maxScroll = rail.scrollWidth - rail.clientWidth;
    const ratio = maxScroll / Math.max(1, trackW - thumb.offsetWidth);

    const move = (ev: MouseEvent) => {
      if (!dragging.current) return;
      rail.scrollLeft = startLeft + (ev.clientX - startX) * ratio;
    };
    const up = () => {
      dragging.current = false;
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  return (
    <section
      className="w-full bg-white py-[7%]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Reveal className="px-[3%]">
        <div
          ref={railRef}
          onScroll={syncThumb}
          className="muli-rail flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8"
        >
          {PRODUCTS.map((p) => (
            <a
              key={p.title}
              data-card
              href={p.href}
              className="group relative block w-[78vw] shrink-0 snap-start overflow-hidden sm:w-[46vw] lg:w-[31%]"
            >
              <div className="relative aspect-[1000/824] w-full overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/55 to-transparent px-6 pb-5 pt-16">
                  <span className="text-2xl font-light tracking-[0.2em] text-white transition-colors group-hover:text-muli-sand">
                    {p.title}
                  </span>
                  <img
                    src={`${ASSET}/2026/06/44fa280b0djwdwso.png`}
                    alt=""
                    className="h-[21px] w-[21px] transition-transform duration-500 group-hover:rotate-180"
                  />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* 细滚动条 */}
        <div className="relative mx-auto mt-2 h-[3px] w-64 bg-[#eee]">
          <div
            ref={thumbRef}
            onMouseDown={onThumbDown}
            className={cn(
              "absolute left-0 top-1/2 h-[7px] -translate-y-1/2 cursor-grab bg-muli-brown",
              "active:cursor-grabbing"
            )}
            style={{ width: 48 }}
          />
        </div>

        <div className="mt-10 text-center">
          <a
            href={`${SOURCE}/product`}
            className="text-lg tracking-[0.25em] text-muli-brown transition-colors hover:text-muli-camel"
          >
            全系列产品&nbsp;&gt;
          </a>
        </div>
      </Reveal>
    </section>
  );
}
