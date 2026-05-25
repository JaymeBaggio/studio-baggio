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

      <section className="border-b border-ink/12 pb-14 pt-24 md:pb-18 md:pt-32">
        <div className="editorial-container">
          <p className="text-xs uppercase tracking-[0.12em] text-ink/50" data-about-hero>
            {about.eyebrow}
          </p>
          <h1 className="mt-8 max-w-[21rem] text-[2.2rem] uppercase leading-[1.02] sm:max-w-[28rem] sm:text-5xl md:max-w-[42rem] md:text-[3.7rem] lg:text-[4.2rem]" data-about-hero>
            {about.title}
          </h1>
          <p className="mt-9 max-w-[31rem] text-2xl leading-[1.36] text-ink/82 sm:max-w-[34rem] md:max-w-[760px] md:text-[1.55rem] md:leading-[1.48]" data-about-hero>
            {about.intro}
          </p>
        </div>
      </section>

      <section>
        <div className="editorial-container">
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
              <div
                className={index === 0
                  ? "mt-8 grid gap-10 lg:grid-cols-[minmax(0,980px)_minmax(18rem,28rem)] lg:items-start lg:gap-16"
                  : "mt-8 max-w-[980px]"}
                data-about-body
              >
                <div className="space-y-6">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-xl leading-9 text-ink/78 md:text-[1.45rem] md:leading-10">
                      {paragraph}
                    </p>
                  ))}
                </div>
                {index === 0 ? (
                  <figure className="border-l border-ink/16 pl-6 text-ink/72 lg:mt-1">
                    <blockquote className="text-lg leading-7 md:text-xl md:leading-8">
                      &ldquo;{about.quote.text}&rdquo;
                    </blockquote>
                    <figcaption className="mt-5 text-xs uppercase tracking-[0.1em] text-ink/45">
                      {about.quote.attribution}
                    </figcaption>
                  </figure>
                ) : null}
              </div>
              <span className="mt-12 block h-px w-full origin-left scale-x-0 bg-ink/20" data-about-rule />
            </article>
          ))}
        </div>
      </section>

      <section className="bg-charcoal py-16 text-paper md:py-24" data-about-section>
        <div className="editorial-container">
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
