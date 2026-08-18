"use client";

import { useEffect, useState } from "react";
import { LeadForm } from "@/components/LeadForm";

export function HeroFormSlot() {
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const sync = () => setDesktop(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  if (!desktop) return null;
  return <LeadForm compact />;
}
