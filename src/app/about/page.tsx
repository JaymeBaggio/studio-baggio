import type { Metadata } from "next";
import { AboutPageMotion } from "@/components/about-page-motion";
import { ButtonLink } from "@/components/ui/button";
import { about, metadata as siteMetadata, primaryCta } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ ...siteMetadata.about, path: "/about" });

export default function AboutPage() {
  return (
    <div className="bg-white text-ink">
      <AboutPageMotion />

      <section className="border-b border-ink/12 pb-14 pt-28 md:pb-20 md:pt-32">
        <div className="editorial-container max-w-6xl">
          <p className="text-xs uppercase tracking-[0.12em] text-ink/50" data-about-hero>
            {about.eyebrow}
          </p>
          <div className="mt-10 grid gap-10 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
            <h1 className="text-4xl leading-[1.02] md:text-6xl" data-about-hero>
              {about.title}
            </h1>
            <p className="max-w-3xl text-xl leading-9 text-ink/78 md:text-2xl md:leading-10" data-about-hero>
              {about.intro}
            </p>
          </div>
        </div>
      </section>

      <section className="py-4">
        <div className="editorial-container max-w-6xl">
          {about.sections.map((section) => (
            <section
              key={section.label}
              className="grid gap-8 border-b border-ink/12 py-12 last:border-b-0 md:py-16 lg:grid-cols-[0.32fr_0.68fr]"
              data-about-section
            >
              <h2 className="text-xs uppercase tracking-[0.12em] text-ink/50">
                {section.label}
              </h2>
              <div className="max-w-3xl space-y-6">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-lg leading-8 text-ink/76 md:text-xl md:leading-9">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="border-y border-ink/12 bg-neutral-100 py-14 md:py-20" data-about-section>
        <div className="editorial-container max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[0.32fr_0.68fr]">
            <p className="text-xs uppercase tracking-[0.12em] text-ink/50">EXTERNAL VIEW</p>
            <figure className="max-w-4xl">
              <blockquote className="text-2xl leading-tight text-ink md:text-4xl">
                &ldquo;{about.quote.text}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-sm uppercase tracking-[0.1em] text-ink/55">
                {about.quote.attribution}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-14 text-paper md:py-20" data-about-section>
        <div className="editorial-container max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[0.32fr_0.68fr] lg:items-end">
            <p className="text-xs uppercase tracking-[0.12em] text-paper/55">START A CONVERSATION</p>
            <div>
              <h2 className="max-w-3xl text-3xl leading-tight md:text-5xl">
                Advisory is selective. The work starts with the commercial problem.
              </h2>
              <ButtonLink href={primaryCta.href} className="mt-8 border-paper text-paper hover:bg-paper hover:text-ink">
                {primaryCta.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
