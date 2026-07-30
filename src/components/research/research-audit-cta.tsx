import { ArrowUpRight } from "lucide-react";
import { ResearchActionLink } from "./ResearchActionLink.client";

export function ResearchAuditCta({
  href,
  title = "Understand why your firm appears—or does not—and what to do next.",
  body = "The SEO and AI Search Opportunity Audit turns public evidence into a firm-specific diagnosis and practical implementation plan."
}: {
  href: string;
  title?: string;
  body?: string;
}) {
  return (
    <section className="research-audit-cta" aria-labelledby="research-audit-cta-title">
      <div className="editorial-container research-audit-cta__grid">
        <p className="eyebrow">SEO and AI Search Opportunity Audit</p>
        <div>
          <h2 id="research-audit-cta-title">{title}</h2>
          <p>{body}</p>
          <ResearchActionLink
            href={href}
            analyticsEvent="research_audit_cta_clicked"
            analyticsProperties={{ destination: href }}
          >
            Discuss an audit
            <ArrowUpRight aria-hidden="true" />
          </ResearchActionLink>
        </div>
      </div>
    </section>
  );
}
