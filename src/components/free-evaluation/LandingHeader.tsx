import Image from "next/image";
import { ctaLabel, site } from "@/lib/content";

function PhoneMark() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7.2 3h2.1c.5 0 .9.3 1 .8l.6 2.3c.1.4 0 .9-.3 1.2L9.3 9.4a12 12 0 0 0 5.3 5.3l2.1-1.3c.3-.2.8-.3 1.2-.2l2.3.6c.5.1.8.5.8 1v2.1c0 .6-.5 1-1.1 1C11.2 17.9 6.1 12.8 6.1 4.1 6.1 3.5 6.6 3 7.2 3z"
      />
    </svg>
  );
}

export function LandingHeader() {
  return (
    <header className="site-header sticky top-0 z-40">
      <div className="container-page flex h-full items-center justify-between gap-4">
        <a href="#top" className="shrink-0" aria-label={`${site.name} home`}>
          <Image
            src="/images/parisi-horsham-logo.png"
            alt="Parisi Speed School Horsham"
            width={448}
            height={112}
            className="h-8 w-auto"
            priority
          />
        </a>
        <div className="flex items-center gap-4">
          <a
            href={`tel:${site.phoneTel}`}
            className="hidden text-[15px] text-body lg:inline"
          >
            {site.phoneDisplay}
          </a>
          <a
            href={`tel:${site.phoneTel}`}
            className="inline-flex h-10 w-10 items-center justify-center text-ink lg:hidden"
            aria-label={`Call ${site.phoneDisplay}`}
          >
            <PhoneMark />
          </a>
          <a href="#request-evaluation" className="btn-primary hidden lg:inline-flex">
            {ctaLabel}
          </a>
        </div>
      </div>
    </header>
  );
}
