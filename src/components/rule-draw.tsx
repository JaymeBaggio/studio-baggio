"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// The site's motion signature: each section title's short blue rule draws in
// from the left as the section arrives. Without JavaScript, or with reduced
// motion, the rules simply show as they always have.
const RULE_TITLES =
  ".problem-clarifier-title, .faq-section-title, .commercial-sprint-title, .proof-section-title, .fit-section-title, .working-promise-title, .value-grid-title";

export function RuleDraw() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("sb-rules-armed");
    const titles = Array.from(document.querySelectorAll<HTMLElement>(RULE_TITLES));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-rule-drawn");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    titles.forEach((title) => observer.observe(title));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
