import { ctaLabel, hero } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { HeroFormSlot } from "./HeroFormSlot";

export function HeroSection() {
  return (
    <section className="relative min-h-svh" aria-labelledby="hero-heading">
      <div className="hero-fallback absolute inset-0" />
      <div data-hero-media className="absolute inset-0">
        {/* [ASSET] youth-athlete photography for the hero */}
      </div>
      <div className="hero-overlay absolute inset-0" />
      <div className="container-page relative z-10 flex min-h-svh items-center py-16 lg:items-end lg:pb-16 lg:pt-32">
        <div className="grid w-full items-end gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7">
            <p className="label-caps mb-4 text-accent-bright">{hero.eyebrow}</p>
            <h1 id="hero-heading" className="display-hero">
              {hero.h1Lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="body-lg measure mt-6">{hero.sub}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="#request-evaluation" className="btn-primary">
                {ctaLabel}
              </a>
              <a href="#whats-tested" className="btn-ghost">
                {hero.ghost}
              </a>
            </div>
            <p className="body mt-4 text-muted">{hero.micro}</p>
          </Reveal>
          <div className="hidden lg:col-span-5 lg:block">
            <HeroFormSlot />
          </div>
        </div>
      </div>
    </section>
  );
}
