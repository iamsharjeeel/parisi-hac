import { testimonials } from "@/lib/testimonials";
import { Reveal } from "@/components/Reveal";

export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="section-pad bg-canvas" aria-labelledby="testimonials-heading">
      <div className="container-page">
        <h2 id="testimonials-heading" className="sr-only">
          Parent testimonials
        </h2>
        <ul className="divide-y divide-hairline">
          {testimonials.slice(0, 3).map((item, index) => (
            <li key={`${item.parentName}-${index}`} className="py-8 lg:py-12">
              <Reveal index={index}>
                <blockquote>
                  <p className="display-md max-w-[34rem]">{item.quote}</p>
                  <footer className="label-caps mt-4 text-muted">
                    {item.parentName} · Age {item.athleteAge} · {item.sport}
                  </footer>
                </blockquote>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
