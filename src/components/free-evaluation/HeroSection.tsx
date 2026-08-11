import Image from "next/image";
import { hero } from "@/lib/content";
import { PrimaryCTA } from "./PrimaryCTA";
import { SectionReveal } from "./SectionReveal";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white" aria-labelledby="hero-heading">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#ffffff_0%,#f7f7f7_48%,#ffffff_100%)]" />
      <div className="pointer-events-none absolute -right-24 top-0 h-[28rem] w-[28rem] bg-[radial-gradient(circle,rgba(237,28,36,0.08),transparent_68%)]" />

      <div className="container-page relative grid items-center gap-10 py-10 md:grid-cols-[1.15fr_0.85fr] md:gap-12 md:py-16 lg:gap-16 lg:py-20">
        <SectionReveal>
          <p className="eyebrow mb-4">{hero.eyebrow}</p>
          <h1
            id="hero-heading"
            className="max-w-[16ch] text-[2.4rem] font-bold text-near-black sm:text-[2.75rem] md:text-[3.25rem] lg:text-[3.75rem]"
          >
            <span className="block">{hero.h1Line1}</span>
            <span className="mt-1 block text-parisi">{hero.h1Line2}</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            {hero.support}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:items-start">
            <PrimaryCTA placement="hero" fullWidth className="sm:w-auto sm:min-w-[20rem]">
              {hero.cta}
            </PrimaryCTA>
            <p className="text-sm font-medium text-ink/70">{hero.micro}</p>
          </div>
        </SectionReveal>

        <SectionReveal delayMs={80} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden bg-charcoal md:aspect-[5/6]">
            <Image
              src="/images/hero-training.webp"
              alt="Youth athlete training with a Parisi coach at Horsham"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 42vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 border border-white/25 bg-near-black/80 px-4 py-3 text-white backdrop-blur-[2px]">
              <p className="font-heading text-[0.7rem] font-semibold leading-tight tracking-[0.16em]">
                {hero.badgeLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </div>
            <div className="absolute left-0 top-0 h-full w-[3px] bg-parisi" aria-hidden />
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
