import type { ReactNode } from "react";
import Image from "next/image";
import { site } from "@/lib/content";

export function LegalShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-svh bg-canvas text-body">
      <header className="site-header sticky top-0 z-40">
        <div className="container-page flex h-full items-center">
          <a href="/free-evaluation" aria-label={`${site.name} home`}>
            <Image
              src="/images/parisi-horsham-logo.png"
              alt="Parisi Speed School Horsham"
              width={448}
              height={112}
              className="h-8 w-auto"
            />
          </a>
        </div>
      </header>
      <main className="container-page section-pad">
        <h1 className="display-lg">{title}</h1>
        <div className="measure mt-8 space-y-4">{children}</div>
      </main>
    </div>
  );
}
