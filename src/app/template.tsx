"use client";

import { useEffect, type ReactNode } from "react";

// A soft fade between pages. The first page load is left alone so nothing
// delays the opening view; every later navigation fades the new page in.
let hasNavigated = false;

export default function Template({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (!hasNavigated) {
      hasNavigated = true;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.getElementById("main")?.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 420,
      easing: "cubic-bezier(0.23, 1, 0.32, 1)"
    });
  }, []);

  return <>{children}</>;
}
