import { baseline } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export function AssessmentSection() {
  return (
    <section
      id="whats-tested"
      className="section-pad scroll-mt-[72px] bg-canvas"
      aria-labelledby="baseline-heading"
    >
      <div className="container-page">
        <Reveal>
          <p className="label-caps text-accent-bright">{baseline.kicker}</p>
          <h2 id="baseline-heading" className="display-xl mt-4">
            {baseline.heading}
          </h2>
          <div className="measure mt-6 space-y-4">
            {baseline.body.map((paragraph) => (
              <p key={paragraph} className="body">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-hairline">
          {baseline.columns.map((column, index) => (
            <Reveal
              key={column.title}
              index={index}
              className="border-t border-hairline pt-8 lg:border-t-0 lg:px-8 lg:pt-0 lg:first:pl-0 lg:last:pr-0"
            >
              <div className="mb-4 h-10 w-[2px] bg-accent" aria-hidden />
              <h3 className="display-md">{column.title}</h3>
              <p className="body mt-3 max-w-[34rem]">{column.copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
