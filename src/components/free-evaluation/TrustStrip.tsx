import { trustStats } from "@/lib/content";
import { SectionReveal } from "./SectionReveal";

export function TrustStrip() {
  return (
    <section
      className="border-y border-line bg-surface"
      aria-label="Parisi credibility"
    >
      <div className="container-page py-8 md:py-10">
        <SectionReveal>
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.12em] text-muted">
            Parisi system credentials · local Horsham coaching
          </p>
          <ul className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {trustStats.map((stat) => (
              <li key={stat.value} className="min-w-0">
                <p className="font-heading text-xl font-bold text-near-black md:text-2xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm leading-snug text-muted">{stat.label}</p>
                {stat.note === "Parisi system" ? (
                  <p className="mt-1 text-[11px] uppercase tracking-[0.08em] text-ink/45">
                    Across the Parisi system
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </SectionReveal>
      </div>
    </section>
  );
}
