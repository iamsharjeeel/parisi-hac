"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/content";
import { trackEvaluationBookingSuccess } from "@/lib/analytics";
import { wellnessLiving } from "@/lib/booking";
import { WL_FORM_THEME_CSS } from "./bookingFormTheme";

type Status = "loading" | "ready" | "error";

function injectThemeIntoRoots(root: ParentNode) {
  const hosts = root.querySelectorAll("wl-lead-capture-widget");
  hosts.forEach((host) => {
    const shadow = (host as HTMLElement & { shadowRoot?: ShadowRoot | null })
      .shadowRoot;
    if (!shadow) return;
    if (shadow.getElementById("parisi-wl-theme")) return;
    const style = document.createElement("style");
    style.id = "parisi-wl-theme";
    style.textContent = WL_FORM_THEME_CSS;
    shadow.appendChild(style);
  });
}

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
      script.onload = markReady;
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

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    injectThemeIntoRoots(root);
    const observer = new MutationObserver(() => injectThemeIntoRoots(root));
    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative">
      <ConfirmationWatcher rootRef={containerRef} />

      {status === "loading" ? (
        <div
          className="absolute inset-x-0 top-0 z-10 flex min-h-[360px] flex-col items-center justify-center gap-3 bg-[#111111] text-sm text-white/55"
          aria-live="polite"
        >
          <span className="booking-loader" aria-hidden />
          Loading evaluation form…
        </div>
      ) : null}

      {status === "error" ? (
        <div
          className="min-h-[240px] border border-white/10 bg-white/[0.03] px-5 py-8 text-center"
          role="alert"
        >
          <p className="font-heading text-lg font-semibold text-white">
            Having trouble loading the form?
          </p>
          <p className="mt-3 text-base text-white/60">
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
