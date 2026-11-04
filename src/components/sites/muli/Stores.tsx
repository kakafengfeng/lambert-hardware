import { CITIES, SOURCE } from "./data";
import { Reveal } from "./Reveal";

const ASSET = "https://wm.cdn.cn86.cn/mulimuwaiz";

/** 全国体验店：全屏夜景底图 + 城市名 + 预约按钮 */
export function Stores() {
  return (
    <section className="relative flex min-h-[92vh] w-full items-center justify-center overflow-hidden">
      <img
        src={`${ASSET}/2026/06/f186f0b1b6yh0lez.jpg`}
        alt="全国体验店"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/45" />
      <Reveal className="relative z-10 px-[6%] text-center">
        <h2 className="mb-12 text-3xl font-light tracking-[0.4em] text-white md:text-4xl">
          全国体验店
        </h2>
        <div className="mx-auto mb-14 flex max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {CITIES.map((c) => (
            <span
              key={c}
              className="cursor-default text-lg font-light tracking-[0.25em] text-white/90 transition-colors hover:text-muli-sand"
            >
              {c}
            </span>
          ))}
        </div>
        <a
          href={`${SOURCE}/album/quan-guo-ti-yan-dian`}
          className="inline-block border border-white/70 px-12 py-3.5 text-base tracking-[0.3em] text-white transition-colors hover:bg-white hover:text-muli-brown"
        >
          立即预约&nbsp;&gt;
        </a>
      </Reveal>
    </section>
  );
}
