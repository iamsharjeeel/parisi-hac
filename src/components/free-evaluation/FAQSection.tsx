import { faq } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export function FAQSection() {
  return (
    <section
      className="section-pad bg-canvas-raised"
      aria-labelledby="faq-heading"
    >
      <div className="container-page">
        <Reveal>
          <p className="label-caps text-accent-bright">{faq.kicker}</p>
          <h2 id="faq-heading" className="display-xl mt-4">
            {faq.heading}
          </h2>
        </Reveal>
        <div className="faq-list mt-10 max-w-3xl border-t border-hairline">
          {faq.items.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary>{item.question}</summary>
              <p className="body measure mt-4">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
