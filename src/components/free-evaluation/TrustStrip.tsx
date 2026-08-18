import { credentials, credentialsBar } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

const stats = [
  credentials.years,
  credentials.athletes,
  credentials.ages,
  credentials.location,
] as const;

export function TrustStrip() {
  return (
    <section
      className="border-y border-hairline bg-canvas-raised"
      aria-label={credentialsBar.label}
    >
      <div className="container-page py-12 lg:py-16">
        <Reveal>
          <p className="label-caps mb-8 text-muted">{credentialsBar.label}</p>
          <ul className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <li key={stat.label}>
                <p className="stat-numeral">{stat.value}</p>
                <p className="label-caps mt-2 text-muted">{stat.label}</p>
                <p className="label-caps mt-1 text-muted">{stat.note}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
