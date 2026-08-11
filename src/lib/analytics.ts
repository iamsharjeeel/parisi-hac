export const BOOKING_EVENT_NAME = "Schedule" as const;
export const BOOKING_CONTENT_NAME = "Parisi Horsham Free Evaluation";
export const CTA_CLICK_EVENT = "EvaluationCTAClick";

const DEDUPE_KEY = "parisi_schedule_event_id";

declare global {
  interface Window {
    fbq?: (
      action: string,
      event: string,
      params?: Record<string, unknown>,
      options?: { eventID?: string },
    ) => void;
    _fbq?: unknown;
  }
}

export function createEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function isProductionTrackingEnabled(): boolean {
  if (typeof window === "undefined") return false;
  if (process.env.NODE_ENV !== "production") return false;
  return Boolean(process.env.NEXT_PUBLIC_META_PIXEL_ID);
}

export function trackEvaluationCTAClick(placement: string): void {
  if (typeof window === "undefined") return;
  if (!isProductionTrackingEnabled()) return;
  if (typeof window.fbq !== "function") return;

  window.fbq("trackCustom", CTA_CLICK_EVENT, {
    content_name: BOOKING_CONTENT_NAME,
    placement,
  });
}

/**
 * Fire Meta Schedule ONLY after a successfully confirmed evaluation booking.
 * Dedupes within the session so Pixel + thank-you route cannot double-fire.
 */
export function trackEvaluationBookingSuccess(options?: {
  eventId?: string;
  source?: string;
}): string | null {
  if (typeof window === "undefined") return null;

  try {
    const existing = sessionStorage.getItem(DEDUPE_KEY);
    if (existing) return existing;
  } catch {
    /* continue */
  }

  const eventId = options?.eventId ?? createEventId();

  try {
    sessionStorage.setItem(DEDUPE_KEY, eventId);
  } catch {
    /* ignore */
  }

  if (!isProductionTrackingEnabled()) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[analytics] Schedule suppressed outside production", {
        eventId,
        source: options?.source,
      });
    }
    return eventId;
  }

  if (typeof window.fbq === "function") {
    window.fbq(
      "track",
      BOOKING_EVENT_NAME,
      { content_name: BOOKING_CONTENT_NAME },
      { eventID: eventId },
    );
  }

  return eventId;
}

export function hasTrackedBookingSuccess(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return Boolean(sessionStorage.getItem(DEDUPE_KEY));
  } catch {
    return false;
  }
}
