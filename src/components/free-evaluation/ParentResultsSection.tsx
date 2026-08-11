import { parentResults } from "@/lib/content";
import { PrimaryCTA } from "./PrimaryCTA";
import { SectionReveal } from "./SectionReveal";

export function ParentResultsSection() {
  return (
    <section className="section-pad bg-white" aria-labelledby="parent-heading">
      <div className="container-page">
        <SectionReveal className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-6 h-[3px] w-14 bg-parisi" aria-hidden />
          <h2
            id="parent-heading"
            className="text-3xl font-bold text-near-black md:text-4xl lg:text-[2.75rem]"
          >
            {parentResults.headline}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
            {parentResults.copy}
          </p>
          <div className="mt-8 flex justify-center">
            <PrimaryCTA
              placement="parent-results"
              fullWidth
              className="sm:w-auto sm:min-w-[16rem]"
            >
              {parentResults.cta}
            </PrimaryCTA>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
