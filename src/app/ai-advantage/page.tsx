import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { PageReveals } from "@/components/page-reveals";
import { businessTracker, metadata as siteMetadata, offerLadder, opportunityPriorities, primaryCta, systemBlocks, valueAreas } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ ...siteMetadata.aiAdvantage, path: "/ai-advantage" });

export default function AIAdvantagePage() {
  return (
    <>
      <PageReveals />
      <div className="home-4b studio-page">
        <section className="studio-page-hero">
          <div className="editorial-container studio-page-frame">
            <div>
              <p className="eyebrow" data-reveal data-motion="label">AI Commercial Advantage / Services</p>
              <h1 className="studio-page-title" data-split>
                Practical AI systems built around how your business wins in market.
              </h1>
              <p className="studio-page-body" data-reveal>
                AI commercial advantage means using AI where it improves how the business is found, how it learns, how it sells, how it serves clients and how quickly it acts.
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="editorial-container studio-page-stack">
            <div>
              <h2 className="studio-page-title" data-split>
                Most businesses waste time on generic AI adoption.
              </h2>
              <div className="studio-page-copy" data-reveal>
                <p>They run workshops, collect tools, automate small tasks and call it transformation.</p>
                <p>The stronger route is to identify the commercial moments where AI changes the position of the business: visibility, intelligence, lead quality, authority, workflow and client experience.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="studio-page-dark" data-header-theme="dark">
          <div className="editorial-container studio-page-stack">
            <p className="eyebrow" data-reveal data-motion="label">Five value areas</p>
            <div className="studio-page-rows is-full">
              {valueAreas.map((area, index) => (
                <article key={area.title} className="studio-page-row" data-reveal>
                  <span className="studio-page-row-number">0{index + 1}</span>
                  <h2 className="studio-page-row-title">{area.title}</h2>
                  <div className="studio-page-row-copy">
                    <p>{area.summary}</p>
                    <p>{area.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="editorial-container studio-page-stack">
            <div>
              <p className="eyebrow" data-reveal data-motion="label">How opportunities are prioritised</p>
              <h2 className="studio-page-title" data-split>
                The strongest AI opportunities are the ones that change the commercial position of the business.
              </h2>
            </div>
            <div className="studio-page-rows is-full">
              {opportunityPriorities.map((priority, index) => (
                <article key={priority.title} className="studio-page-row" data-reveal>
                  <span className="studio-page-row-number">0{index + 1}</span>
                  <h3 className="studio-page-row-title">{priority.title}</h3>
                  <p className="studio-page-row-copy">{priority.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="editorial-container studio-page-stack">
            <div>
              <p className="eyebrow" data-reveal data-motion="label">Offer ladder</p>
              <h2 className="studio-page-title" data-split>
                Start with the opportunity. Build the system. Improve the advantage.
              </h2>
            </div>
            <div className="studio-page-rows is-full">
              {offerLadder.map((offer, index) => (
                <article key={offer.name} className="studio-page-row" data-reveal>
                  <span className="studio-page-row-number">0{index + 1}</span>
                  <h3 className="studio-page-row-title">{offer.name}</h3>
                  <p className="studio-page-row-copy">{offer.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="editorial-container studio-page-stack">
            <p className="eyebrow" data-reveal data-motion="label">Example systems</p>
            <div className="studio-page-rows is-full">
              {systemBlocks.map((block) => (
                <article key={block.title} className="studio-page-row" data-reveal>
                  <span className="studio-page-row-number">SB</span>
                  <h2 className="studio-page-row-title">{block.title}</h2>
                  <div className="studio-page-row-copy">
                    <p>{block.promise}</p>
                    <p>{block.examples}</p>
                  </div>
                </article>
              ))}
              <article className="studio-page-row" data-reveal>
                <span className="studio-page-row-number">SB</span>
                <h2 className="studio-page-row-title">Business Tracker</h2>
                <div className="studio-page-row-copy">
                  <p>{businessTracker.coreLine}</p>
                  <div className="studio-row-actions">
                    <Link href="/business-tracker" className="focus-ring studio-row-link">
                      See the Business Tracker system
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="home-cta-section studio-page-cta" data-header-theme="dark">
          <div className="editorial-container home-cta-frame">
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
