"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { visitCompany } from "@/lib/spotter";
import { capturePersonalRef } from "@/lib/personal-ref";

/**
 * Sends one pageview per route change to the Studio Baggio Business Tracker
 * (/api/marketing/analytics/track), with the visiting company when Snitcher
 * Spotter can name it. Independent of Vercel Analytics. Silent
 * when NEXT_PUBLIC_TRACKER_URL is unset or storage is unavailable.
 */
const TRACKER_URL = process.env.NEXT_PUBLIC_TRACKER_URL;

function stableId(storage: Storage, key: string) {
  try {
    const existing = storage.getItem(key);
    if (existing) return existing;
    const fresh = crypto.randomUUID();
    storage.setItem(key, fresh);
    return fresh;
  } catch {
    return "anon";
  }
}

export function TrackerBeacon() {
  const pathname = usePathname();

  useEffect(() => {
    if (!TRACKER_URL || !pathname) return;
    if (/bot|crawl|spider|headless/i.test(navigator.userAgent)) return;
    const ref = capturePersonalRef();
    const base = {
      ref,
      path: pathname,
      referrer: document.referrer || null,
      deviceId: stableId(window.localStorage, "sb_device"),
      sessionId: stableId(window.sessionStorage, "sb_session"),
      ts: Date.now()
    };
    const url = `${TRACKER_URL.replace(/\/$/, "")}/api/marketing/analytics/track`;
    // Wait (at most a few seconds, once per session) for Snitcher to name the visiting company.
    void visitCompany().then((company) => {
      const body = JSON.stringify({ ...base, company });
      try {
        // text/plain keeps sendBeacon a "simple" request: a JSON content type would need a
        // CORS preflight, which sendBeacon cannot perform, so the browser drops it silently.
        const blob = new Blob([body], { type: "text/plain" });
        if (!navigator.sendBeacon || !navigator.sendBeacon(url, blob)) {
          void fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body, keepalive: true }).catch(() => {});
        }
      } catch {
        /* never affect the page */
      }
    });
  }, [pathname]);

  return null;
}
