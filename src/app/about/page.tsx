import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { PageReveals } from "@/components/page-reveals";
import { about, metadata as siteMetadata, primaryCta } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ ...siteMetadata.about, path: "/about" });

export default function AboutPage() {
  return (
    <>
      <PageReveals />
      <section className="section-pad pt-32">
        <div className="editorial-container">
          <p className="eyebrow">About</p>
          <h1 className="display-xl mt-6 max-w-7xl" data-split>
            {about.title}
          </h1>
        </div>
      </section>
      <section className="section-pad border-y border-ink/12">
        <div className="editorial-container grid gap-10 lg:grid-cols-[0.42fr_1fr]">
          <p className="eyebrow">Jayme Baggio</p>
          <div className="space-y-7">
            {about.body.map((paragraph) => (
              <p key={paragraph} className="body-large text-ink/72" data-reveal>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad">
        <div className="editorial-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <h2 className="display-lg" data-split>
            The pattern is practical: turn expert judgement into systems people can use.
          </h2>
          <div className="border-t border-ink/15">
            {about.proof.map((item) => (
              <p key={item} className="border-b border-ink/12 py-6 body-large text-ink/72" data-reveal>
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad bg-charcoal text-paper">
        <div className="editorial-container grid gap-8 md:grid-cols-[1fr_0.45fr] md:items-end">
          <h2 className="display-lg" data-split>
            Bring the business problem. Build the system around it.
          </h2>
          <ButtonLink href={primaryCta.href} className="border-paper text-paper hover:bg-paper hover:text-ink">
            {primaryCta.label}
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
