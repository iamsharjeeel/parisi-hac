export const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
] as const;

export type AttributionKey = (typeof ATTRIBUTION_KEYS)[number];
export type AttributionParams = Partial<Record<AttributionKey, string>>;

const STORAGE_KEY = "parisi_attribution";

export function captureAttributionFromSearch(
  search: string | URLSearchParams,
): AttributionParams {
  const params =
    typeof search === "string" ? new URLSearchParams(search) : search;
  const captured: AttributionParams = {};

  for (const key of ATTRIBUTION_KEYS) {
    const value = params.get(key);
    if (value) captured[key] = value;
  }

  if (Object.keys(captured).length === 0) return getStoredAttribution();

  const merged = { ...getStoredAttribution(), ...captured };
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch {
    /* ignore quota / private mode */
  }
  return merged;
}

export function getStoredAttribution(): AttributionParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as AttributionParams;
  } catch {
    return {};
  }
}

export function appendAttributionToUrl(url: string): string {
  const attribution = getStoredAttribution();
  if (Object.keys(attribution).length === 0) return url;

  try {
    const target = new URL(url, window.location.origin);
    for (const [key, value] of Object.entries(attribution)) {
      if (value && !target.searchParams.has(key)) {
        target.searchParams.set(key, value);
      }
    }
    return target.toString();
  } catch {
    return url;
  }
}
