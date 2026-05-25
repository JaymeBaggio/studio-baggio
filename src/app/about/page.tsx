import type { Metadata } from "next";
import { AboutPageMotion } from "@/components/about-page-motion";
import { ButtonLink } from "@/components/ui/button";
import { about, metadata as siteMetadata, primaryCta } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ ...siteMetadata.about, path: "/about" });

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden bg-white text-ink" data-about-page>
      <AboutPageMotion />

      <div
        className="pointer-events-none fixed left-6 top-28 z-20 hidden h-[calc(100vh-8rem)] w-px bg-ink/10 lg:block"
        aria-hidden="true"
      >
        <span className="block h-full w-px origin-top scale-y-0 bg-ink" data-about-progress />
      </div>

      <section className="border-b border-ink/12 pb-16 pt-28 md:pb-24 md:pt-36">
        <div className="editorial-container max-w-[980px]">
          <p className="text-xs uppercase tracking-[0.12em] text-ink/50" data-about-hero>
            {about.eyebrow}
          </p>
          <h1 className="mt-8 max-w-[21rem] text-[2.2rem] uppercase leading-[1.02] sm:max-w-[28rem] sm:text-5xl md:max-w-none md:text-6xl lg:text-[5rem]" data-about-hero>
            {about.title}
          </h1>
          <p className="mt-10 max-w-[31rem] text-2xl leading-[1.36] text-ink/82 sm:max-w-[34rem] md:max-w-[850px] md:text-[2rem]" data-about-hero>
            {about.intro}
          </p>
        </div>
      </section>

      <section>
        <div className="editorial-container max-w-[980px]">
          {about.sections.map((section, index) => (
            <article
              key={section.label}
              className="border-b border-ink/12 py-14 md:py-16"
              data-about-section
            >
              <div className="flex items-baseline gap-4" data-about-section-heading>
                <span className="w-10 shrink-0 text-sm tabular-nums text-ink/40">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="text-sm uppercase tracking-[0.12em] text-ink/58">
                  {section.label}
                </h2>
              </div>
              <div className="mt-8 max-w-[820px] space-y-6 md:ml-14" data-about-body>
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-xl leading-9 text-ink/78 md:text-[1.45rem] md:leading-10">
                    {paragraph}
                  </p>
                ))}
              </div>
              <span className="mt-12 block h-px w-full origin-left scale-x-0 bg-ink/20" data-about-rule />
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-ink/12 bg-neutral-100 py-16 md:py-24" data-about-section>
        <div className="editorial-container max-w-[980px]">
          <p className="text-sm uppercase tracking-[0.12em] text-ink/50" data-about-section-heading>
            EXTERNAL VIEW
          </p>
          <figure className="mt-8 max-w-[900px]" data-about-body>
            <blockquote className="text-3xl leading-[1.08] text-ink md:text-[3.4rem]">
              &ldquo;{about.quote.text}&rdquo;
            </blockquote>
            <figcaption className="mt-8 text-sm uppercase tracking-[0.1em] text-ink/55">
              {about.quote.attribution}
            </figcaption>
          </figure>
          <span className="mt-12 block h-px w-full origin-left scale-x-0 bg-ink/20" data-about-rule />
        </div>
      </section>

      <section className="bg-charcoal py-16 text-paper md:py-24" data-about-section>
        <div className="editorial-container max-w-[980px]">
          <p className="text-sm uppercase tracking-[0.12em] text-paper/55" data-about-section-heading>
            START A CONVERSATION
          </p>
          <div className="mt-8" data-about-body>
            <h2 className="max-w-[850px] text-4xl leading-[1.05] md:text-[4.35rem]">
              Advisory is selective. The work starts with the commercial problem.
            </h2>
            <ButtonLink href={primaryCta.href} className="mt-10 border-paper text-paper hover:bg-paper hover:text-ink">
              {primaryCta.label}
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
