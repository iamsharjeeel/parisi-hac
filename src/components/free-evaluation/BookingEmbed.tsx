"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/content";
import { trackEvaluationBookingSuccess } from "@/lib/analytics";
import { wellnessLiving } from "@/lib/booking";

type Status = "loading" | "ready" | "error";

function ConfirmationWatcher({
  rootRef,
}: {
  rootRef: React.RefObject<HTMLDivElement | null>;
}) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const maybeTrack = () => {
      if (
        root.querySelector(
          ".app-confirmation-page, .app-confirmation-page__title, [class*='confirmation-page']",
        )
      ) {
        trackEvaluationBookingSuccess({ source: "wellnessliving-confirmation" });
      }
    };

    maybeTrack();

    const observer = new MutationObserver(() => maybeTrack());
    observer.observe(root, { childList: true, subtree: true });

    const onMessage = (event: MessageEvent) => {
      if (typeof event.origin !== "string") return;
      if (!event.origin.includes("wellnessliving.com")) return;

      const data = event.data;
      const payload =
        typeof data === "string"
          ? data
          : data && typeof data === "object"
            ? JSON.stringify(data)
            : "";

      if (/confirm|success|thank|complete|lead.?capture.?success/i.test(payload)) {
        trackEvaluationBookingSuccess({ source: "wellnessliving-postmessage" });
      }
    };

    window.addEventListener("message", onMessage);
    return () => {
      observer.disconnect();
      window.removeEventListener("message", onMessage);
    };
  }, [rootRef]);

  return null;
}

export function BookingEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    let cancelled = false;
    let timeoutId = 0;

    const markReady = () => {
      if (!cancelled) setStatus("ready");
    };

    const markError = () => {
      if (!cancelled) setStatus("error");
    };

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${wellnessLiving.scriptUrl}"]`,
    );

    if (!existing) {
      const script = document.createElement("script");
      script.src = wellnessLiving.scriptUrl;
      script.type = "module";
      script.async = true;
      script.onload = () => {
        markReady();
      };
      script.onerror = markError;
      document.body.appendChild(script);
    } else if (existing.dataset.loaded === "true") {
      markReady();
    } else {
      existing.addEventListener("load", markReady, { once: true });
      existing.addEventListener("error", markError, { once: true });
    }

    timeoutId = window.setTimeout(() => {
      if (cancelled) return;
      const hasWidget = Boolean(
        containerRef.current?.querySelector("wl-lead-capture-widget"),
      );
      if (!hasWidget) markError();
      else markReady();
    }, 10000);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${wellnessLiving.scriptUrl}"]`,
    );
    if (!existing) return;
    const onLoad = () => {
      existing.dataset.loaded = "true";
    };
    existing.addEventListener("load", onLoad);
    return () => existing.removeEventListener("load", onLoad);
  }, []);

  return (
    <div className="relative">
      <ConfirmationWatcher rootRef={containerRef} />

      {status === "loading" ? (
        <div
          className="absolute inset-x-0 top-0 z-10 flex min-h-[420px] items-center justify-center bg-white/90 text-sm text-muted"
          aria-live="polite"
        >
          Loading scheduling form…
        </div>
      ) : null}

      {status === "error" ? (
        <div
          className="min-h-[280px] border border-line bg-surface px-5 py-8 text-center"
          role="alert"
        >
          <p className="font-heading text-lg font-semibold text-near-black">
            Having trouble loading the calendar?
          </p>
          <p className="mt-3 text-base text-muted">
            Call Parisi Horsham at{" "}
            <a
              href={`tel:${site.phoneTel}`}
              className="font-semibold text-parisi underline-offset-2 hover:underline"
            >
              {site.phoneDisplay}
            </a>{" "}
            to schedule your evaluation.
          </p>
        </div>
      ) : null}

      <div
        ref={containerRef}
        className={`wl-lead-capture relative ${status === "error" ? "hidden" : ""}`}
      >
        {/*
          WellnessLiving lead-capture widget — IDs verified from
          parisispeedschoolhorsham.com/evaluation
          TODO: If WellnessLiving skin/business IDs change, update
          NEXT_PUBLIC_WL_* environment variables.
        */}
        <wl-lead-capture-widget
          host={wellnessLiving.host}
          k_business={wellnessLiving.businessId}
          k_skin={wellnessLiving.skinId}
          k_location={wellnessLiving.locationId}
        />
      </div>
    </div>
  );
}
