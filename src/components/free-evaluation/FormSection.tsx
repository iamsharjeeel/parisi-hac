import { formCopy } from "@/lib/content";
import { LeadForm } from "@/components/LeadForm";
import { Reveal } from "@/components/Reveal";

export function FormSection() {
  return (
    <section
      id="request-evaluation"
      className="scroll-mt-[72px] bg-canvas"
      aria-labelledby="form-heading"
    >
      <div className="bg-accent">
        <div className="container-page py-8 lg:py-12">
          <h2 id="form-heading" className="display-xl text-ink">
            {formCopy.heading}
          </h2>
        </div>
      </div>
      <div className="container-page py-12 lg:py-16">
        <Reveal>
          <p className="body-lg measure mb-8">{formCopy.sub}</p>
          <div className="max-w-xl">
            <LeadForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
