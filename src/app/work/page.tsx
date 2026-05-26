import type { Metadata } from "next";
import { PageReveals } from "@/components/page-reveals";
import { WorkShowcase } from "@/components/work-showcase";
import { ButtonLink } from "@/components/ui/button";
import { metadata as siteMetadata, primaryCta } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ ...siteMetadata.work, path: "/work" });

export default function WorkPage() {
  return (
    <>
      <PageReveals />
      <div className="home-4b studio-page">
        <section className="studio-page-hero">
          <div className="editorial-container studio-page-frame">
            <div>
              <h1 className="studio-page-title" data-split>
                Live products.
              </h1>
            </div>
          </div>
        </section>
        <section>
          <div className="editorial-container studio-page-stack">
            <WorkShowcase />
          </div>
        </section>
        <section className="home-cta-section studio-page-cta" data-header-theme="dark">
          <div className="editorial-container home-cta-frame">
            <h2 className="home-cta-title" data-split>
              Discuss which system would create the most commercial value in your business.
            </h2>
            <div data-cta-button>
              <ButtonLink href={primaryCta.href}>
                {primaryCta.label}
              </ButtonLink>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
