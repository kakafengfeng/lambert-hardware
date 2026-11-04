import { NEWS, SOURCE } from "./data";
import { Reveal } from "./Reveal";

/** 新闻资讯：三栏卡片 */
export function News() {
  return (
    <section className="w-full bg-white py-[8%]">
      <div className="px-[3%]">
        <div className="grid gap-8 md:grid-cols-3">
          {NEWS.map((n, i) => (
            <Reveal key={n.title} delay={i * 120}>
              <a href={n.href} className="group block">
                <div className="overflow-hidden">
                  <img
                    src={n.image}
                    alt={n.title}
                    loading="lazy"
                    className="aspect-[656/414] w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                </div>
                <p className="mt-5 text-sm tracking-widest text-muli-camel">
                  {n.date}
                </p>
                <h3 className="mt-2 line-clamp-2 min-h-[3.4em] text-lg font-light leading-relaxed text-muli-ink transition-colors group-hover:text-muli-camel">
                  {n.title}
                </h3>
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 text-center">
          <a
            href={`${SOURCE}/news`}
            className="text-lg tracking-[0.25em] text-muli-brown transition-colors hover:text-muli-camel"
          >
            更多新闻&nbsp;&gt;
          </a>
        </Reveal>
      </div>
    </section>
  );
}
