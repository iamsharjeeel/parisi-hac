"use client";

import { useEffect, useState } from "react";
import { ctaLabels } from "@/lib/content";
import { trackEvaluationCTAClick } from "@/lib/analytics";

export function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroCta = document.querySelector<HTMLElement>(
      'a.btn-primary[data-cta-placement="hero"]',
    );
    const booking = document.getElementById("book-evaluation");
    if (!heroCta || !booking) return;

    let heroOut = false;
    let bookingIn = false;

    const update = () => setVisible(heroOut && !bookingIn);

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        heroOut = !entry.isIntersecting;
        update();
      },
      { threshold: 0 },
    );

    const bookingObserver = new IntersectionObserver(
      ([entry]) => {
        bookingIn = entry.isIntersecting;
        update();
      },
      { threshold: 0.12 },
    );

    heroObserver.observe(heroCta);
    bookingObserver.observe(booking);

    return () => {
      heroObserver.disconnect();
      bookingObserver.disconnect();
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/95 px-4 pt-3 backdrop-blur-sm transition-transform duration-200 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      aria-hidden={!visible}
    >
      <a
        href="#book-evaluation"
        className="btn-primary w-full"
        tabIndex={visible ? 0 : -1}
        onClick={() => trackEvaluationCTAClick("mobile-sticky")}
      >
        {ctaLabels.short}
      </a>
    </div>
  );
}
