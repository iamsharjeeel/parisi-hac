import Image from "next/image";
import { site, ctaLabels } from "@/lib/content";
import { PrimaryCTA } from "./PrimaryCTA";

type Props = {
  homeHref?: string;
  ctaHref?: string;
};

export function LandingHeader({
  homeHref = "#top",
  ctaHref,
}: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-white/95 backdrop-blur-sm">
      <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-4">
        <a href={homeHref} className="shrink-0" aria-label={`${site.name} home`}>
          <Image
            src="/images/parisi-horsham-logo.png"
            alt="Parisi Speed School Horsham"
            width={448}
            height={112}
            className="h-9 w-auto md:h-11"
            priority
          />
        </a>

        <div className="flex items-center gap-3 md:gap-5">
          <a
            href={`tel:${site.phoneTel}`}
            className="hidden text-sm font-medium text-ink/80 transition-colors hover:text-parisi sm:inline"
          >
            {site.phoneDisplay}
          </a>
          <PrimaryCTA
            href={ctaHref}
            placement="header"
            className="!min-h-11 px-4 text-sm md:!min-h-[52px] md:px-5 md:text-base"
          >
            <span className="md:hidden">{ctaLabels.short}</span>
            <span className="hidden md:inline">{ctaLabels.primary}</span>
          </PrimaryCTA>
        </div>
      </div>
    </header>
  );
}
