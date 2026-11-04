import { Reveal } from "./Reveal";
import { SOURCE } from "./data";

const ASSET = "https://wm.cdn.cn86.cn/mulimuwaiz";

/** 品牌宣言：深棕底居中区块 */
export function Manifesto() {
  return (
    <section className="w-full bg-muli-brown py-[9%]">
      <Reveal className="mx-auto max-w-4xl px-[6%] text-center">
        <img
          src={`${ASSET}/2026/06/00ef51e542jkfe58.png`}
          alt=""
          className="mx-auto mb-10 h-[67px] w-[80px] object-contain"
        />
        <h2 className="mb-10 text-[28px] font-light tracking-[0.35em] text-muli-sand md:text-[2.5vw]">
          因木而生&nbsp;&nbsp;以木为名
        </h2>
        <div className="space-y-6 text-[17px] font-light leading-[2.1] text-muli-cream/90">
          <p>
            木，温润而坚韧，承载着东方人对家的全部想象。木里木外以木为媒，
            将自然的纹理与当代设计语言相融，为每一个家注入恒久的温度。
          </p>
          <p>
            从收纳、木门、护墙到整体空间，我们以高定标准打磨每一处细节，
            让居住回归本真，让生活自有回响。
          </p>
        </div>
        <div className="mt-12 flex items-center justify-center gap-12">
          <a
            href={`${SOURCE}/about`}
            className="text-lg tracking-[0.25em] text-muli-cream transition-colors hover:text-muli-camel"
          >
            品牌理念&nbsp;&gt;
          </a>
          <a
            href={`${SOURCE}/about`}
            className="text-lg tracking-[0.25em] text-muli-cream transition-colors hover:text-muli-camel"
          >
            品牌文化&nbsp;&gt;
          </a>
        </div>
      </Reveal>
    </section>
  );
}
