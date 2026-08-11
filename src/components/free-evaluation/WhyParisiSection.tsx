import Image from "next/image";
import { whyParisi } from "@/lib/content";
import { SectionReveal } from "./SectionReveal";

export function WhyParisiSection() {
  return (
    <section className="section-pad bg-surface" aria-labelledby="why-heading">
      <div className="container-page grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <SectionReveal>
          <div className="relative aspect-[4/3] overflow-hidden bg-charcoal">
            <Image
              src="/images/coaching.webp"
              alt="Parisi coach working with an athlete during performance training"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              loading="lazy"
            />
            <div className="absolute inset-y-0 left-0 w-[3px] bg-parisi" aria-hidden />
          </div>
        </SectionReveal>

        <SectionReveal delayMs={70}>
          <p className="eyebrow">{whyParisi.eyebrow}</p>
          <h2
            id="why-heading"
            className="mt-3 text-3xl font-bold text-near-black md:text-4xl lg:text-[2.75rem]"
          >
            {whyParisi.headline}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
            {whyParisi.copy}
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            {whyParisi.local}
          </p>
          <p className="mt-6 border-l-[3px] border-parisi pl-4 text-sm font-medium text-ink/80 md:text-base">
            {whyParisi.supporting}
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
