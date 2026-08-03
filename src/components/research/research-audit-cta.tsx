import { ArrowUpRight } from "lucide-react";
import { ResearchActionLink } from "./ResearchActionLink.client";

export function ResearchAuditCta({
  href,
  title = "Get a clear view of your firm's AI search visibility and opportunities.",
  body = "The SEO and AI Search Opportunity Audit explains why the result appears and what to do next.",
  linkLabel = "Discuss an audit"
}: {
  href: string;
  title?: string;
  body?: string;
  linkLabel?: string;
}) {
  return (
    <section className="research-audit-cta" aria-labelledby="research-audit-cta-title" data-research-cta>
      <div className="editorial-container research-audit-cta__grid">
        <p className="eyebrow" data-research-cta-item>SEO and AI Search Opportunity Audit</p>
        <div data-research-cta-item>
          <h2 id="research-audit-cta-title">{title}</h2>
          <p>{body}</p>
          <ResearchActionLink
            href={href}
            analyticsEvent="research_audit_cta_clicked"
            analyticsProperties={{ destination: href }}
          >
            {linkLabel}
            <ArrowUpRight aria-hidden="true" />
          </ResearchActionLink>
        </div>
      </div>
    </section>
  );
}
