import Link from "next/link";
import { serviceNextSteps, type EnquiryType } from "@/content/site";

export type ServiceStepType = Exclude<EnquiryType, "not-sure">;

// Which way to hire an article leads to, by its category.
const categoryService: Record<string, ServiceStepType> = {
  "AI Adoption": "ai-operating-systems",
  "AI Skills": "ai-operating-systems",
  "AI Search": "seo-ai-search",
  "Owned Media": "seo-ai-search",
  "Commercial Intelligence": "tools-client-resources",
  "AI Products": "tools-client-resources"
};

export function serviceForCategory(category: string): ServiceStepType {
  return categoryService[category] ?? "ai-operating-systems";
}

export function enquiryHref(type: ServiceStepType) {
  return `/contact?type=${type}`;
}

// The related way to hire Studio Baggio, at the end of an article or in its sidebar.
export function ServiceNextStep({ type, compact = false }: { type: ServiceStepType; compact?: boolean }) {
  const service = serviceNextSteps[type];
  const moreLabel = type === "commissioned-research" ? "See the published research" : "See what's included";

  return (
    <aside className={`service-next-step${compact ? " is-compact" : ""}`} aria-label="Work with Studio Baggio">
      <p className="service-next-step-label">Work with Studio Baggio</p>
      <p className="service-next-step-name">{service.name}</p>
      <p className="service-next-step-line">{service.line}</p>
      <div className="service-next-step-actions">
        <Link className="service-next-step-button" href={enquiryHref(type)}>
          Enquire now
        </Link>
        <Link className="service-next-step-link" href={service.href}>
          {moreLabel}
        </Link>
      </div>
    </aside>
  );
}
