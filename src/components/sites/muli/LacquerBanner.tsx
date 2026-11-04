"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";

const ASSET = "https://wm.cdn.cn86.cn/mulimuwaiz";

/** 大漆艺术系列横幅：封面海报 + 中央播放按钮，点击后播放视频 */
export function LacquerBanner() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="relative w-full overflow-hidden bg-black">
      <Reveal>
        <div className="relative aspect-video max-h-[88vh] w-full">
          {!playing ? (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group relative block h-full w-full"
              aria-label="播放大漆艺术系列宣传片"
            >
              <img
                src={`${ASSET}/2026/06/ad963bc9edcv2wsr.jpg`}
                alt="MULI新品 大漆艺术系列"
                className="h-full w-full object-cover"
              />
              <span className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-black/25">
                <span className="px-6 text-center text-2xl font-light tracking-[0.35em] text-white md:text-4xl">
                  MULI新品&nbsp;&nbsp;大漆艺术系列
                </span>
                <img
                  src={`${ASSET}/2026/06/18e7143c189ow01r.png`}
                  alt=""
                  className="h-12 w-12 transition-transform duration-300 group-hover:scale-110"
                />
              </span>
            </button>
          ) : (
            <video
              className="h-full w-full object-cover"
              src={`${ASSET}/2026/07/724f1a0d9aptrf9b.mp4`}
              poster={`${ASSET}/2026/06/ad963bc9edcv2wsr.jpg`}
              autoPlay
              controls
              playsInline
            />
          )}
        </div>
      </Reveal>
    </section>
  );
}
