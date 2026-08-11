import type { HTMLAttributes } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "wl-lead-capture-widget": HTMLAttributes<HTMLElement> & {
        host?: string;
        k_business?: string;
        k_skin?: string;
        k_location?: string;
      };
    }
  }
}

export {};
