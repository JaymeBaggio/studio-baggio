/**
 * Snitcher Spotter: the company behind this visit, read in the browser from the
 * Snitcher script (no API key; Snitcher authorises by the site's domain). Looked
 * up once per browser session and sent with each tracker pageview.
 */
export type VisitCompany = {
  uuid?: string;
  name: string;
  domain?: string;
  industry?: string;
  size?: string;
  location?: string;
  linkedin?: string;
};

type SpotterResult = {
  success?: boolean;
  data?: {
    uuid?: string;
    name?: string;
    website?: string;
    industry?: string;
    size?: string;
    address?: { city?: string; country?: string };
    profiles?: { name?: string; url?: string }[];
  };
};

const CACHE_KEY = "visit_company";
let pending: Promise<VisitCompany | null> | null = null;

function readCache(): VisitCompany | null | undefined {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (raw === null) return undefined;
    return raw === "none" ? null : (JSON.parse(raw) as VisitCompany);
  } catch {
    return undefined;
  }
}

function writeCache(value: VisitCompany | null) {
  try {
    sessionStorage.setItem(CACHE_KEY, value ? JSON.stringify(value) : "none");
  } catch {
    /* storage unavailable */
  }
}

async function waitForSpotter(timeoutMs: number) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    const s = (window as unknown as { Snitcher?: { getSpotterIdentification?: () => Promise<SpotterResult> } }).Snitcher;
    if (s && typeof s.getSpotterIdentification === "function") return s.getSpotterIdentification.bind(s);
    await new Promise((r) => setTimeout(r, 200));
  }
  return null;
}

/** Resolves to the visiting company, or null when unknown. Never throws, never waits more than ~5s. */
export function visitCompany(): Promise<VisitCompany | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  const cached = readCache();
  if (cached !== undefined) return Promise.resolve(cached);
  if (pending) return pending;
  pending = (async () => {
    try {
      const identify = await waitForSpotter(4000);
      if (!identify) return null;
      const res = await Promise.race([identify(), new Promise<null>((r) => setTimeout(() => r(null), 3000))]);
      if (!res || !res.success || !res.data?.name) {
        if (res) writeCache(null);
        return null;
      }
      const d = res.data;
      const name: string = d.name ?? "";
      const company: VisitCompany = {
        uuid: d.uuid,
        name,
        domain: d.website?.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/.*$/, "") || undefined,
        industry: d.industry || undefined,
        size: d.size || undefined,
        location: [d.address?.city, d.address?.country].filter(Boolean).join(", ") || undefined,
        linkedin: d.profiles?.find((p) => /linkedin/i.test(p.name ?? p.url ?? ""))?.url,
      };
      writeCache(company);
      return company;
    } catch {
      return null;
    } finally {
      pending = null;
    }
  })();
  return pending;
}
