"use client";

import { useState } from "react";

const ASSET = "https://wm.cdn.cn86.cn/mulimuwaiz";

/** Hero：全屏自动播放静音循环品牌宣传片，hover 显示原生控件 */
export function Hero() {
  const [showControls, setShowControls] = useState(false);

  return (
    <section
      className="relative h-screen min-h-[560px] w-full overflow-hidden bg-black"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        className="h-full w-full object-cover"
        src={`${ASSET}/2026/08/15e8b53be49ujamn.mp4`}
        poster={`${ASSET}/2026/10/ad02183ef0czlj5g.jpg`}
        autoPlay
        muted
        loop
        playsInline
        controls={showControls}
      />
    </section>
  );
}
