import type { ReactNode } from "react";
import { LandingFooter } from "@/components/free-evaluation/LandingFooter";
import { LandingHeader } from "@/components/free-evaluation/LandingHeader";

export function LegalChrome({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <LandingHeader
        homeHref="/free-evaluation"
        ctaHref="/free-evaluation#book-evaluation"
      />
      <main className="flex-1">{children}</main>
      <LandingFooter />
    </div>
  );
}
