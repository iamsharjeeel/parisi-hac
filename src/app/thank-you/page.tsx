"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { trackEvaluationBookingSuccess } from "@/lib/analytics";
import { site } from "@/lib/content";

export default function ThankYouPage() {
  useEffect(() => {
    trackEvaluationBookingSuccess({ source: "thank-you-route" });
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="border-b border-line">
        <div className="container-page flex h-[var(--header-h)] items-center">
          <Link href="/free-evaluation" aria-label={`${site.name} home`}>
            <Image
              src="/images/parisi-horsham-logo.png"
              alt="Parisi Speed School Horsham"
              width={448}
              height={112}
              className="h-9 w-auto"
              priority
            />
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="max-w-xl text-center">
          <div className="mx-auto mb-6 h-[3px] w-12 bg-parisi" aria-hidden />
          <h1 className="text-3xl font-bold text-near-black md:text-4xl">
            Your Evaluation Request Is In
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            Thanks for booking a free athletic performance evaluation with Parisi
            Speed School Horsham. Our team will follow up with next steps.
          </p>
          <p className="mt-6 text-sm text-muted">
            Questions? Call{" "}
            <a
              href={`tel:${site.phoneTel}`}
              className="font-semibold text-parisi underline-offset-2 hover:underline"
            >
              {site.phoneDisplay}
            </a>
          </p>
          <Link
            href="/free-evaluation"
            className="btn-primary mt-8 inline-flex"
          >
            Back to Evaluation Page
          </Link>
        </div>
      </main>
    </div>
  );
}
