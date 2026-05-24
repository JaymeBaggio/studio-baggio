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
      <section className="section-pad pt-32">
        <div className="editorial-container">
          <p className="eyebrow">AI Commercial Advantage / Services</p>
          <h1 className="display-xl mt-6 max-w-7xl" data-split>
            Practical AI systems built around how your business wins in market.
          </h1>
          <p className="body-large mt-10 max-w-3xl text-ink/72" data-reveal>
            AI commercial advantage means using AI where it improves how the business is found, how it learns, how it sells, how it serves clients and how quickly it acts.
          </p>
        </div>
      </section>

      <section className="section-pad border-y border-ink/12">
        <div className="editorial-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <h2 className="display-lg" data-split>
            Most businesses waste time on generic AI adoption.
          </h2>
          <div className="space-y-6 body-large text-ink/72" data-reveal>
            <p>They run workshops, collect tools, automate small tasks and call it transformation.</p>
            <p>The stronger route is to identify the commercial moments where AI changes the position of the business: visibility, intelligence, lead quality, authority, workflow and client experience.</p>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="editorial-container">
          <p className="eyebrow">Five value areas</p>
          <div className="mt-10 border-t border-ink/15">
            {valueAreas.map((area, index) => (
              <div key={area.title} className="grid gap-5 border-b border-ink/12 py-8 md:grid-cols-[80px_0.7fr_1fr]" data-reveal>
                <span className="text-xs uppercase tracking-[0.08em] text-ink/45">0{index + 1}</span>
                <h2 className="text-4xl leading-none">{area.title}</h2>
                <div className="space-y-4 leading-relaxed text-ink/72">
                  <p>{area.summary}</p>
                  <p>{area.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-y border-ink/12">
        <div className="editorial-container">
          <p className="eyebrow">How opportunities are prioritised</p>
          <h2 className="display-lg mt-5 max-w-6xl" data-split>
            The strongest AI opportunities are the ones that change the commercial position of the business.
          </h2>
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {opportunityPriorities.map((priority, index) => (
              <div key={priority.title} className="border-t border-ink/15 pt-5" data-reveal>
                <p className="text-xs uppercase tracking-[0.08em] text-ink/45">0{index + 1}</p>
                <h3 className="mt-7 text-3xl leading-none">{priority.title}</h3>
                <p className="mt-6 leading-relaxed text-ink/72">{priority.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-charcoal text-paper">
        <div className="editorial-container">
          <p className="eyebrow text-paper/55">Offer ladder</p>
          <h2 className="display-lg mt-5 max-w-6xl" data-split>
            Start with the opportunity. Build the system. Improve the advantage.
          </h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {offerLadder.map((offer, index) => (
              <div key={offer.name} className="border-t border-paper/20 pt-5" data-reveal>
                <p className="text-xs uppercase tracking-[0.07em] text-paper/55">0{index + 1}</p>
                <h3 className="mt-7 text-3xl leading-none">{offer.name}</h3>
                <p className="mt-6 leading-relaxed text-paper/68">{offer.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="editorial-container">
          <p className="eyebrow">Example systems</p>
          <div className="mt-10 border-t border-ink/15">
            {systemBlocks.map((block) => (
              <div key={block.title} className="grid gap-4 border-b border-ink/12 py-7 md:grid-cols-[0.45fr_1fr]" data-reveal>
                <h2 className="text-3xl leading-none">{block.title}</h2>
                <div className="space-y-4 leading-relaxed text-ink/72">
                  <p>{block.promise}</p>
                  <p>{block.examples}</p>
                </div>
              </div>
            ))}
            <div className="grid gap-4 border-b border-ink/12 py-7 md:grid-cols-[0.45fr_1fr]" data-reveal>
              <h2 className="text-3xl leading-none">Business Tracker</h2>
              <div className="space-y-4 leading-relaxed text-ink/72">
                <p>{businessTracker.coreLine}</p>
                <Link href="/business-tracker" className="focus-ring inline-flex underline-offset-4 hover:underline">
                  See the Business Tracker system
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
