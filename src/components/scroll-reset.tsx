"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Hash present (deep link or in-page anchor): leave the position alone.
    // Same-page hash clicks fire pathname effects in some routers; never reset.
    if (window.location.hash) {
      return;
    }

    const reset = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };

    reset();
    const frame = window.requestAnimationFrame(reset);
    const timeout = window.setTimeout(reset, 90);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [pathname]);

  return null;
}
