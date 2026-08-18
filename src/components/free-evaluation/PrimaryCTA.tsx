import type { ReactNode } from "react";
import { ctaLabel } from "@/lib/content";

type Props = {
  href?: string;
  children?: ReactNode;
  className?: string;
};

export function PrimaryCTA({
  href = "#request-evaluation",
  children = ctaLabel,
  className = "",
}: Props) {
  return (
    <a href={href} className={`btn-primary ${className}`.trim()}>
      {children}
    </a>
  );
}
