"use client";

type PreferredSourceClient = {
  init: (opts: { theme: string; lang: string }) => void;
  addPreferredSource: () => void;
};

declare global {
  interface Window {
    PREFERRED_SOURCE?: Array<(ps: PreferredSourceClient) => void>;
  }
}

export function PreferredSourceLink({ className }: { className?: string }) {
  const handleClick = () => {
    const w = window as Window & { gtag?: (...args: unknown[]) => void };
    w.gtag?.("event", "preferred_source_click", { location: "footer" });
    (window.PREFERRED_SOURCE = window.PREFERRED_SOURCE || []).push((ps) => {
      try {
        ps.init({ theme: "light", lang: "en" });
      } catch {
        // already initialised by the script's automatic scan
      }
      ps.addPreferredSource();
    });
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      Add us to your preferred sources on Google
    </button>
  );
}
