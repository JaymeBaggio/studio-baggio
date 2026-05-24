import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { PageReveals } from "@/components/page-reveals";
import { calmAuthority, metadata as siteMetadata, primaryCta } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ ...siteMetadata.calmAuthority, path: "/calm-authority" });

export default function CalmAuthorityPage() {
  return (
    <>
      <PageReveals />
      <section className="calm-authority-hero">
        <div className="editorial-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="eyebrow">Live product / LinkedIn writing system</p>
            <h1 className="display-xl mt-6" data-split>
              {calmAuthority.title}
            </h1>
            <p className="body-large mt-8 text-ink/72" data-reveal>
              {calmAuthority.tagline}
            </p>
            <p className="mt-5 max-w-xl text-base leading-7 text-ink/62" data-reveal>
              {calmAuthority.hero}
            </p>
            <div className="mt-8 flex flex-wrap gap-3" data-reveal>
              <ButtonLink href={calmAuthority.liveHref} external>
                Visit Calm Authority
              </ButtonLink>
              <ButtonLink href={calmAuthority.factSheetHref} external className="border-ink/30 text-ink/70">
                Press Fact Sheet
              </ButtonLink>
            </div>
          </div>
          <a
            href={calmAuthority.liveHref}
            target="_blank"
            rel="noreferrer"
            className="focus-ring block border border-ink/12 transition-opacity hover:opacity-80"
            aria-label="Open Calm Authority website"
          >
            <Image
              src="/assets/products/calm-authority.png"
              alt="Calm Authority product screenshot"
              width={1400}
              height={875}
              className="h-auto w-full"
              priority
            />
          </a>
        </div>
      </section>

      <section className="calm-authority-overview border-y border-ink/12">
        <div className="editorial-container">
          <div className="grid gap-5 md:grid-cols-3">
            {calmAuthority.overview.map((item) => (
              <article key={item.title} className="border border-ink/12 bg-paper/30 p-6 md:min-h-[250px]">
                <h2 className="text-xl leading-7">{item.title}</h2>
                <p className="mt-8 text-base leading-7 text-ink/68">{item.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-12 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <p className="eyebrow">Market context</p>
            <div className="space-y-6 body-large text-ink/72">
              <p data-reveal>{calmAuthority.summary}</p>
              <p data-reveal>{calmAuthority.marketContext}</p>
              <p data-reveal>{calmAuthority.genericAiRisk}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="editorial-container">
          <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr]">
            <div>
              <p className="eyebrow">At a glance</p>
              <p className="mt-6 text-base leading-7 text-ink/62">{calmAuthority.sourceNote}</p>
            </div>
            <div className="border-t border-ink/15">
              {calmAuthority.atAGlance.map(([label, value]) => (
                <div key={label} className="grid gap-3 border-b border-ink/12 py-5 md:grid-cols-[190px_1fr]" data-reveal>
                  <span className="text-xs uppercase tracking-[0.08em] text-ink/45">{label}</span>
                  <p className="text-base leading-7 text-ink/72">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20">
            <p className="eyebrow">How it works</p>
            <div className="mt-10 border-t border-ink/15">
              {calmAuthority.facts.map((fact, index) => (
                <div key={fact} className="grid gap-5 border-b border-ink/12 py-6 md:grid-cols-[80px_1fr]" data-reveal>
                  <span className="text-xs uppercase tracking-[0.08em] text-ink/45">0{index + 1}</span>
                  <p className="body-large text-ink/72">{fact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad border-y border-ink/12">
        <div className="editorial-container grid gap-10 lg:grid-cols-[0.65fr_1.35fr]">
          <div>
            <p className="eyebrow">Proof points</p>
            <h2 className="display-md mt-6" data-split>
              Measured authority, pipeline and revenue signals.
            </h2>
          </div>
          <div className="border-t border-ink/15">
            {calmAuthority.proofPoints.map((point) => (
              <div key={point} className="border-b border-ink/12 py-6" data-reveal>
                <p className="body-large text-ink/72">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-charcoal text-paper">
        <div className="editorial-container grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <h2 className="display-lg" data-split>
            What it proves about Studio Baggio.
          </h2>
          <div className="space-y-7 body-large text-paper/72">
            <p data-reveal>{calmAuthority.studioAngle}</p>
            <p data-reveal>{calmAuthority.proof}</p>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="editorial-container grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="eyebrow">Pricing</p>
            <div className="mt-8 border-t border-ink/15">
              {calmAuthority.pricing.map(([tier, price, scope]) => (
                <div key={tier} className="grid gap-3 border-b border-ink/12 py-5" data-reveal>
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h2 className="text-lg leading-7">{tier}</h2>
                    <span className="text-sm uppercase tracking-[0.06em] text-ink/55">{price}</span>
                  </div>
                  <p className="text-base leading-7 text-ink/62">{scope}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-6 text-ink/50">
              Firm tiers are 90 days upfront, then quarterly in advance. Prices exclude VAT.
            </p>
          </div>

          <div>
            <p className="eyebrow">Recent / compliance</p>
            <div className="mt-8 space-y-6 text-base leading-7 text-ink/68">
              {calmAuthority.recent.map((item) => (
                <p key={item} data-reveal>{item}</p>
              ))}
              <p className="border-l border-ink/30 pl-5 text-ink/78" data-reveal>{calmAuthority.compliance}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="editorial-container grid gap-8 md:grid-cols-[1fr_0.6fr] md:items-end">
          <div>
            <p className="eyebrow">Links</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {calmAuthority.links.map((link) => (
                <ButtonLink key={link.href} href={link.href} external>
                  {link.label}
                </ButtonLink>
              ))}
            </div>
          </div>
          <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
        </div>
      </section>
    </>
  );
}
