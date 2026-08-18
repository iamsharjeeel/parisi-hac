import { footerCopy, site } from "@/lib/content";

export function LandingFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline bg-canvas">
      <div className="container-page flex flex-col gap-8 py-12 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-[15px] font-semibold text-ink">{site.name}</p>
          <p className="body mt-2">
            {site.addressLine1}
            <br />
            {site.addressLine2}
          </p>
          <a
            href={`tel:${site.phoneTel}`}
            className="mt-3 inline-block text-[15px] text-body"
          >
            {site.phoneDisplay}
          </a>
        </div>
        <nav aria-label="Legal" className="flex flex-wrap gap-5 text-[15px] text-muted">
          <a href="/privacy">{footerCopy.privacy}</a>
          <a href="/terms">{footerCopy.terms}</a>
          <a href="/sms-terms">{footerCopy.sms}</a>
        </nav>
      </div>
      <div className="container-page border-t border-hairline py-6">
        <p className="label-caps text-muted">
          © {year} Parisi Speed School Horsham
        </p>
      </div>
    </footer>
  );
}
