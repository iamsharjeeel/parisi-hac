"use client";

import { useEffect } from "react";
import { captureAttributionFromSearch } from "@/lib/attribution";

export function AttributionCapture() {
  useEffect(() => {
    captureAttributionFromSearch(window.location.search);
  }, []);

  return null;
}
