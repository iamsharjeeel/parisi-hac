import { site } from "@/lib/content";

export function LandingFooter() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="container-page flex flex-col gap-6 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-heading text-lg font-bold text-near-black">{site.name}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {site.addressLine1}
            <br />
            {site.addressLine2}
          </p>
          <a
            href={`tel:${site.phoneTel}`}
            className="mt-3 inline-block text-sm font-semibold text-near-black transition-colors hover:text-parisi"
          >
            {site.phoneDisplay}
          </a>
        </div>

        <nav aria-label="Legal" className="flex gap-5 text-sm text-muted">
          <a
            href={site.privacyUrl}
            className="transition-colors hover:text-parisi"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
          <a
            href={site.termsUrl}
            className="transition-colors hover:text-parisi"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms
          </a>
        </nav>
      </div>
    </footer>
  );
}
