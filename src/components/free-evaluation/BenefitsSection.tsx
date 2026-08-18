import { direction } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export function BenefitsSection() {
  return (
    <section className="section-pad bg-canvas" aria-labelledby="direction-heading">
      <div className="container-page">
        <Reveal>
          <p className="label-caps text-accent-bright">{direction.kicker}</p>
          <h2 id="direction-heading" className="display-xl mt-4">
            {direction.heading}
          </h2>
          <p className="body measure mt-6">{direction.body}</p>
        </Reveal>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {direction.items.map((item, index) => (
            <Reveal key={item.title} index={index}>
              <div className="mb-4 h-8 w-[2px] bg-accent" aria-hidden />
              <h3 className="display-md">{item.title}</h3>
              <p className="body mt-3 max-w-[34rem]">{item.copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
