import { ctaLabel, sixtyMinutes } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export function EvaluationProcess() {
  return (
    <section
      className="section-pad bg-canvas-raised"
      aria-labelledby="process-heading"
    >
      <div className="container-page">
        <Reveal>
          <p className="label-caps text-accent-bright">{sixtyMinutes.kicker}</p>
          <h2 id="process-heading" className="display-xl mt-4">
            {sixtyMinutes.heading}
          </h2>
          <p className="body-lg measure mt-6">{sixtyMinutes.intro}</p>
        </Reveal>
        <ol className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-3">
          {sixtyMinutes.steps.map((step, index) => (
            <li key={step.number}>
              <Reveal index={index}>
                <div className="border border-hairline border-t-2 border-t-accent bg-canvas-card p-6">
                  <p className="label-caps text-muted">{step.number}</p>
                  <h3 className="display-md mt-3">{step.title}</h3>
                  <p className="body mt-3">{step.copy}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
        <Reveal className="mt-10 flex flex-col gap-3 sm:items-start">
          <a href="#request-evaluation" className="btn-primary">
            {ctaLabel}
          </a>
          <p className="body text-muted">{sixtyMinutes.micro}</p>
        </Reveal>
      </div>
    </section>
  );
}
