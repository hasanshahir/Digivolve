"use client";

import { useEffect } from "react";

export interface BaatcheetWidgetProps {
  businessId?: string;
  host?: string;
  theme?: string;
  position?: "bottom-right" | "bottom-left";
  offsetBottom?: string;
  defaultOpen?: boolean;
}

/**
 * Drop-in React Component for Baatcheet AI Support Chat Widget (بات چیت)
 * Optimized for HKH Agency website.
 */
export default function BaatcheetWidget({
  businessId = "b769eaa1-fd59-4412-b2d0-4cf52da31f66",
  host = "https://alibaba-gray.vercel.app",
  theme = "#000000",
  position = "bottom-right",
  offsetBottom = "96px",
  defaultOpen = false,
}: BaatcheetWidgetProps) {
  useEffect(() => {
    if (typeof window === "undefined" || !businessId) return;

    const getSdk = () => (window as any).Baatcheet || (window as any).Guftagu;

    const setupWidget = () => {
      const sdk = getSdk();
      if (sdk) {
        sdk.init({
          businessId,
          host,
          theme,
          position,
          offsetBottom,
          defaultOpen,
        });
      }
    };

    if (getSdk()) {
      setupWidget();
      return;
    }

    let script = document.querySelector<HTMLScriptElement>(
      `script[src*="widget.js"]`
    );

    if (!script) {
      script = document.createElement("script");
      script.src = `${host.replace(/\/+$/, "")}/widget.js`;
      script.async = true;
      script.setAttribute("data-business", businessId);
      script.setAttribute("data-theme", theme);
      script.setAttribute("data-position", position);
      script.setAttribute("data-offset-bottom", offsetBottom);
      if (defaultOpen) script.setAttribute("data-default-open", "true");

      script.onload = () => setupWidget();
      document.body.appendChild(script);
    } else {
      script.addEventListener("load", setupWidget);
      setupWidget();
    }
  }, [businessId, host, theme, position, offsetBottom, defaultOpen]);

  return null;
}
