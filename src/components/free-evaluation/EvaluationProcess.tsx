import { process as processContent } from "@/lib/content";
import { PrimaryCTA } from "./PrimaryCTA";
import { SectionReveal } from "./SectionReveal";

export function EvaluationProcess() {
  return (
    <section
      className="section-pad diagonal-cut bg-near-black text-white"
      aria-labelledby="process-heading"
    >
      <div className="container-page pb-10 md:pb-16">
        <SectionReveal className="max-w-3xl">
          <p className="eyebrow text-parisi">{processContent.eyebrow}</p>
          <h2
            id="process-heading"
            className="mt-3 text-3xl font-bold md:text-4xl lg:text-[2.75rem]"
          >
            {processContent.headline}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/70 md:text-lg">
            {processContent.intro}
          </p>
        </SectionReveal>

        <ol className="mt-10 grid gap-6 md:mt-14 md:grid-cols-3 md:gap-8">
          {processContent.steps.map((step, index) => (
            <SectionReveal key={step.number} delayMs={index * 70}>
              <li className="relative border border-white/10 bg-white/[0.03] p-6">
                <p className="font-heading text-sm font-semibold tracking-[0.18em] text-parisi">
                  STEP {step.number}
                </p>
                <h3 className="mt-3 text-2xl font-bold">{step.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-white/68">{step.copy}</p>
              </li>
            </SectionReveal>
          ))}
        </ol>

        <SectionReveal className="mt-10 flex flex-col gap-3 sm:items-start md:mt-12">
          <PrimaryCTA placement="process" fullWidth className="sm:w-auto sm:min-w-[20rem]">
            {processContent.cta}
          </PrimaryCTA>
          <p className="text-sm text-white/60">{processContent.micro}</p>
        </SectionReveal>
      </div>
    </section>
  );
}
