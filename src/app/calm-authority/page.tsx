import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { PageReveals } from "@/components/page-reveals";
import { calmAuthority, metadata as siteMetadata, primaryCta } from "@/content/site";

export const metadata: Metadata = {
  title: siteMetadata.calmAuthority.title,
  description: siteMetadata.calmAuthority.description,
  alternates: { canonical: "/calm-authority" }
};

export default function CalmAuthorityPage() {
  return (
    <>
      <PageReveals />
      <section className="section-pad pt-32">
        <div className="editorial-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="eyebrow">Studio Baggio product / case study</p>
            <h1 className="display-xl mt-6" data-split>
              {calmAuthority.title}
            </h1>
            <p className="body-large mt-8 text-ink/72" data-reveal>
              {calmAuthority.hero}
            </p>
          </div>
          <div className="border border-ink/12">
            <Image
              src="/assets/products/calm-authority.png"
              alt="Calm Authority product screenshot"
              width={1400}
              height={875}
              className="h-auto w-full"
              priority
            />
          </div>
        </div>
      </section>

      <section className="section-pad border-y border-ink/12">
        <div className="editorial-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <h2 className="display-lg" data-split>{calmAuthority.problemTitle}</h2>
          <div className="space-y-6 body-large text-ink/72">
            <p data-reveal>{calmAuthority.summary}</p>
            <p data-reveal>{calmAuthority.problem}</p>
            <p data-reveal>{calmAuthority.system}</p>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="editorial-container">
          <p className="eyebrow">Key facts</p>
          <div className="mt-10 border-t border-ink/15">
            {calmAuthority.facts.map((fact, index) => (
              <div key={fact} className="grid gap-5 border-b border-ink/12 py-6 md:grid-cols-[80px_1fr]" data-reveal>
                <span className="text-xs uppercase tracking-[0.08em] text-ink/45">0{index + 1}</span>
                <p className="body-large text-ink/72">{fact}</p>
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
