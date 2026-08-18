import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/content";

export default function ThankYouPage() {
  return (
    <div className="flex min-h-svh flex-col bg-canvas">
      <header className="site-header">
        <div className="container-page flex h-full items-center">
          <Link href="/free-evaluation" aria-label={`${site.name} home`}>
            <Image
              src="/images/parisi-horsham-logo.png"
              alt="Parisi Speed School Horsham"
              width={448}
              height={112}
              className="h-8 w-auto"
              priority
            />
          </Link>
        </div>
      </header>
      <main className="container-page flex flex-1 items-center py-16">
        <div className="max-w-xl">
          <h1 className="display-lg">Got it.</h1>
          <p className="body-lg mt-4">
            A coach from Parisi Horsham will call to confirm your time. If you
            would rather reach us first, call {site.phoneDisplay}.
          </p>
          <Link href="/free-evaluation" className="btn-primary mt-8 inline-flex">
            Back to the evaluation page
          </Link>
        </div>
      </main>
    </div>
  );
}
