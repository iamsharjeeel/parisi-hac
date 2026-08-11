"use client";

import { trackEvaluationCTAClick } from "@/lib/analytics";

type Props = {
  href?: string;
  children: React.ReactNode;
  placement: string;
  className?: string;
  fullWidth?: boolean;
};

export function PrimaryCTA({
  href = "#book-evaluation",
  children,
  placement,
  className = "",
  fullWidth = false,
}: Props) {
  return (
    <a
      href={href}
      data-cta-placement={placement}
      className={`btn-primary ${fullWidth ? "w-full" : ""} ${className}`.trim()}
      onClick={() => trackEvaluationCTAClick(placement)}
    >
      {children}
    </a>
  );
}
