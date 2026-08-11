"use client";

import { useId, useState } from "react";
import { faqs } from "@/lib/content";
import { SectionReveal } from "./SectionReveal";

export function FAQSection() {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-pad bg-surface" aria-labelledby="faq-heading">
      <div className="container-page max-w-3xl">
        <SectionReveal>
          <p className="eyebrow">FAQ</p>
          <h2
            id="faq-heading"
            className="mt-3 text-3xl font-bold text-near-black md:text-4xl"
          >
            Questions Parents Ask First
          </h2>
        </SectionReveal>

        <div className="mt-8 divide-y divide-line border-y border-line bg-white">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `${baseId}-panel-${index}`;
            const buttonId = `${baseId}-button-${index}`;

            return (
              <div key={item.question}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-4 py-5 text-left text-base font-semibold text-near-black transition-colors hover:text-parisi md:px-5 md:text-lg"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span>{item.question}</span>
                    <span
                      className="font-heading text-xl text-parisi"
                      aria-hidden
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="px-4 pb-5 text-base leading-relaxed text-muted md:px-5"
                >
                  {item.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
