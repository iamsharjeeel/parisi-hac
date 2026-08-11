import { benefits } from "@/lib/content";
import { SectionReveal } from "./SectionReveal";

export function BenefitsSection() {
  return (
    <section className="section-pad bg-white" aria-labelledby="benefits-heading">
      <div className="container-page">
        <SectionReveal className="max-w-3xl">
          <p className="eyebrow">{benefits.eyebrow}</p>
          <h2
            id="benefits-heading"
            className="mt-3 text-3xl font-bold text-near-black md:text-4xl lg:text-[2.75rem]"
          >
            {benefits.headline}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
            {benefits.support}
          </p>
        </SectionReveal>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-10">
          {benefits.items.map((item, index) => (
            <SectionReveal key={item.title} delayMs={index * 50}>
              <div>
                <div className="mb-3 h-[2px] w-8 bg-parisi" aria-hidden />
                <h3 className="text-xl font-bold text-near-black">{item.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted">{item.copy}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
