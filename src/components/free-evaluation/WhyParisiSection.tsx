import { whyParisi } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export function WhyParisiSection() {
  return (
    <section className="section-pad bg-canvas" aria-labelledby="why-heading">
      <div className="container-page grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative min-h-[320px] overflow-hidden lg:min-h-full">
            <div className="hero-fallback absolute inset-0" />
            <div data-why-media className="absolute inset-0">
              {/* [ASSET] youth-athlete photography for Why Parisi */}
            </div>
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-canvas to-transparent" />
          </div>
        </Reveal>
        <Reveal className="flex flex-col justify-center">
          <p className="label-caps text-accent-bright">{whyParisi.kicker}</p>
          <h2 id="why-heading" className="display-xl mt-4">
            {whyParisi.heading}
          </h2>
          <p className="body measure mt-6">{whyParisi.body}</p>
          <p className="body measure mt-4">{whyParisi.local}</p>
        </Reveal>
      </div>
    </section>
  );
}
