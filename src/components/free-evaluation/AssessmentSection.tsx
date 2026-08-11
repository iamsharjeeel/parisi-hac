import { assessment } from "@/lib/content";
import { SectionReveal } from "./SectionReveal";

function AccentMark() {
  return <span className="mb-4 block h-1 w-10 bg-parisi" aria-hidden />;
}

export function AssessmentSection() {
  return (
    <section className="section-pad bg-white" aria-labelledby="assessment-heading">
      <div className="container-page">
        <SectionReveal className="max-w-3xl">
          <p className="eyebrow">{assessment.eyebrow}</p>
          <h2
            id="assessment-heading"
            className="mt-3 text-3xl font-bold text-near-black md:text-4xl lg:text-[2.75rem]"
          >
            {assessment.headline}
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-muted md:text-lg">
            {assessment.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </SectionReveal>

        <div className="mt-10 grid gap-5 md:mt-14 md:grid-cols-3">
          {assessment.cards.map((card, index) => (
            <SectionReveal key={card.title} delayMs={index * 60}>
              <article className="h-full border-t-[3px] border-parisi bg-surface px-5 py-6 md:px-6 md:py-7">
                <AccentMark />
                <h3 className="text-xl font-bold text-near-black">{card.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted">{card.copy}</p>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
