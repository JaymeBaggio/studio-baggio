import posthog from "posthog-js";

/**
 * PostHog visitor analytics (EU cloud). Clicks, scroll depth, page leaves and
 * session replay with every form input masked. Anonymous visitors get no
 * person profile; a profile is created only when someone submits a form and
 * is identified by their email. Silent when NEXT_PUBLIC_POSTHOG_KEY is unset.
 */
const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com";

let started = false;

export function startPostHog() {
  if (started || !POSTHOG_KEY || typeof window === "undefined") return;
  if (/bot|crawl|spider|headless|prerender/i.test(navigator.userAgent)) return;
  started = true;
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    defaults: "2025-05-24",
    person_profiles: "identified_only",
    persistence: "localStorage",
    capture_pageview: "history_change",
    capture_pageleave: true,
    session_recording: { maskAllInputs: true }
  });
}

/** Ties this visitor's earlier anonymous browsing to the person who just submitted a form. */
export function identifyVisitor(email: string, properties: Record<string, string | undefined> = {}) {
  if (!started) return;
  try {
    const clean = Object.fromEntries(Object.entries(properties).filter(([, value]) => value));
    posthog.identify(email.trim().toLowerCase(), { email: email.trim().toLowerCase(), ...clean });
    const snitcher = (window as unknown as { Snitcher?: { identify?: (email: string, traits?: object) => void } }).Snitcher;
    snitcher?.identify?.(email.trim().toLowerCase(), clean);
  } catch {
    /* never affect the form */
  }
}

/** The PostHog ID for this browser, sent with enquiries so the tracker lead links to the PostHog person. */
export function postHogDistinctId(): string | undefined {
  if (!started) return undefined;
  try {
    return posthog.get_distinct_id();
  } catch {
    return undefined;
  }
}
