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
          <p className="eyebrow">{about.eyebrow}</p>
          <h1 className="display-xl mt-6 max-w-7xl" data-split>
            {about.title}
          </h1>
          <p className="body-large mt-10 max-w-4xl text-ink/72" data-reveal>
            {about.intro}
          </p>
        </div>
      </section>

      <section className="border-y border-ink/12 py-8">
        <div className="editorial-container grid gap-6 md:grid-cols-4">
          {about.highlights.map(([label, value]) => (
            <div key={label} className="border-t border-ink/15 pt-4 md:border-t-0 md:pt-0" data-reveal>
              <p className="text-xs uppercase tracking-[0.08em] text-ink/45">{label}</p>
              <p className="mt-3 text-sm leading-6 text-ink/72">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad border-y border-ink/12">
        <div className="editorial-container">
          <p className="eyebrow">What Studio Baggio builds around</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {about.capabilities.map((item, index) => (
              <div key={item.title} className="border-t border-ink/15 pt-5" data-reveal>
                <p className="text-xs uppercase tracking-[0.08em] text-ink/45">0{index + 1}</p>
                <h2 className="mt-7 text-3xl leading-none">{item.title}</h2>
                <p className="mt-6 leading-relaxed text-ink/72">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-y border-ink/12">
        <div className="editorial-container grid gap-10 lg:grid-cols-[0.42fr_1fr]">
          <div>
            <p className="eyebrow">{about.story.eyebrow}</p>
            <h2 className="display-md mt-6 max-w-lg" data-split>
              {about.story.title}
            </h2>
          </div>
          <div className="space-y-7">
            {about.story.body.map((paragraph) => (
              <p key={paragraph} className="body-large text-ink/72" data-reveal>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="editorial-container grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="eyebrow">{about.origin.eyebrow}</p>
            <h2 className="display-lg mt-6" data-split>
              {about.origin.title}
            </h2>
          </div>
          <div className="space-y-7">
            {about.origin.body.map((paragraph) => (
              <p key={paragraph} className="body-large text-ink/72" data-reveal>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="editorial-container">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow">{about.collaboration.eyebrow}</p>
              <h2 className="display-lg mt-6" data-split>
                {about.collaboration.title}
              </h2>
            </div>
            <p className="body-large text-ink/72" data-reveal>
              {about.collaboration.body}
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {about.collaboration.steps.map((step, index) => (
              <article key={step.title} className="border-t border-ink/15 pt-5" data-reveal>
                <p className="text-xs uppercase tracking-[0.08em] text-ink/45">0{index + 1}</p>
                <h3 className="mt-7 text-2xl leading-tight">{step.title}</h3>
                <p className="mt-6 leading-relaxed text-ink/72">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-y border-ink/12">
        <div className="editorial-container grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="eyebrow">Work in practice</p>
            <h2 className="display-md mt-6" data-split>
              Live products, advisory systems and proof assets.
            </h2>
          </div>
          <div className="border-t border-ink/15">
            {about.work.map((item) => (
              <p key={item} className="border-b border-ink/12 py-6 body-large text-ink/72" data-reveal>
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="editorial-container grid gap-10 lg:grid-cols-[0.6fr_1fr]">
          <p className="eyebrow">External view</p>
          <figure className="max-w-5xl" data-reveal>
            <blockquote className="display-md text-ink">
              &ldquo;{about.quote.text}&rdquo;
            </blockquote>
            <figcaption className="mt-8 text-sm uppercase tracking-[0.08em] text-ink/55">
              {about.quote.attribution}
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section-pad bg-charcoal text-paper">
        <div className="editorial-container grid gap-8 md:grid-cols-[1fr_0.45fr] md:items-end">
          <h2 className="display-lg" data-split>
            Advisory is selective. The work starts with the commercial problem.
          </h2>
          <ButtonLink href={primaryCta.href} className="border-paper text-paper hover:bg-paper hover:text-ink">
            {primaryCta.label}
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
