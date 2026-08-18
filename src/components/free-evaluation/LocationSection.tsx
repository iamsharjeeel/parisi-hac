import { locationCopy, site } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export function LocationSection() {
  return (
    <section className="section-pad bg-canvas-raised" aria-labelledby="location-heading">
      <div className="container-page">
        <Reveal>
          <h2 id="location-heading" className="display-lg">
            {locationCopy.heading}
          </h2>
          <address className="body-lg mt-6 not-italic text-ink">
            {site.addressLine1}
            <br />
            {site.addressLine2}
          </address>
          <p className="body measure mt-4">{locationCopy.parking}</p>
          <a
            href={site.mapsUrl}
            className="mt-6 inline-block text-accent-bright underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {locationCopy.mapsLabel}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
