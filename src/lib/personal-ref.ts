/**
 * Personal links: Jayme's emails can carry ?ref=<code> (a pipeline contact's
 * code from the Business Tracker). On arrival the code is remembered in this
 * browser and removed from the address bar, so the visitor never sees it and
 * it is not copied onward. The tracker beacon sends it with each pageview.
 */
const KEY = "sb_ref";
const PATTERN = /^[a-z0-9]{5,12}$/;

export function capturePersonalRef(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const url = new URL(window.location.href);
    const incoming = url.searchParams.get("ref");
    if (incoming !== null) {
      if (PATTERN.test(incoming)) localStorage.setItem(KEY, incoming);
      url.searchParams.delete("ref");
      window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
    }
    const stored = localStorage.getItem(KEY);
    return stored && PATTERN.test(stored) ? stored : null;
  } catch {
    return null;
  }
}
