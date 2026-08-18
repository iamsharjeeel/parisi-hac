"use client";

import { useEffect, useState } from "react";
import { ctaLabel } from "@/lib/content";

export function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const form = document.getElementById("request-evaluation");
    if (!form) return;

    const media = window.matchMedia("(max-width: 1023px)");
    let formIn = false;

    const update = () => setVisible(media.matches && !formIn);

    const formObserver = new IntersectionObserver(
      ([entry]) => {
        formIn = entry.isIntersecting;
        update();
      },
      { threshold: 0.12 },
    );

    const onMedia = () => update();
    media.addEventListener("change", onMedia);
    formObserver.observe(form);
    update();

    return () => {
      media.removeEventListener("change", onMedia);
      formObserver.disconnect();
    };
  }, []);

  return (
    <div
      className={`sticky-cta fixed inset-x-0 bottom-0 z-50 px-4 lg:hidden ${
        visible ? "" : "pointer-events-none invisible"
      }`}
      aria-hidden={!visible}
    >
      <div className="flex h-full items-center">
        <a
          href="#request-evaluation"
          className="btn-primary w-full"
          tabIndex={visible ? 0 : -1}
        >
          {ctaLabel}
        </a>
      </div>
    </div>
  );
}
