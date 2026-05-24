import type { Metadata } from "next";
import { PageReveals } from "@/components/page-reveals";
import { WorkShowcase } from "@/components/work-showcase";
import { ButtonLink } from "@/components/ui/button";
import { metadata as siteMetadata, primaryCta } from "@/content/site";

export const metadata: Metadata = {
  title: siteMetadata.work.title,
  description: siteMetadata.work.description,
  alternates: { canonical: "/work" }
};

export default function WorkPage() {
  return (
    <>
      <PageReveals />
      <section className="section-pad pt-32">
        <div className="editorial-container">
          <p className="eyebrow">Selected work</p>
          <h1 className="display-xl mt-6 max-w-7xl" data-split>
            Live proof across AI systems, products and commercial intelligence.
          </h1>
          <p className="body-large mt-10 max-w-3xl text-ink/72" data-reveal>
            Studio Baggio work is not a generic portfolio grid. Each project is proof of a repeatable pattern: find the market gap, build the system, make expertise visible and connect it to commercial growth.
          </p>
        </div>
      </section>
      <section className="section-pad border-t border-ink/12">
        <div className="editorial-container">
          <WorkShowcase />
        </div>
      </section>
      <section className="section-pad bg-charcoal text-paper">
        <div className="editorial-container grid gap-8 md:grid-cols-[1fr_0.45fr] md:items-end">
          <h2 className="display-lg" data-split>
            Discuss which system would create the most commercial value in your business.
          </h2>
          <ButtonLink href={primaryCta.href} className="border-paper text-paper hover:bg-paper hover:text-ink">
            {primaryCta.label}
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
