import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { about, metadata as siteMetadata, primaryCta } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ ...siteMetadata.about, path: "/about" });

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-ink/12 pb-12 pt-28 md:pb-16">
        <div className="editorial-container max-w-5xl">
          <p className="eyebrow">{about.eyebrow}</p>
          <h1 className="mt-6 text-4xl leading-tight md:text-6xl">
            {about.title}
          </h1>
          <p className="mt-6 max-w-4xl text-xl leading-8 text-ink/74 md:text-2xl md:leading-9">
            {about.intro}
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="editorial-container max-w-5xl">
          <p className="eyebrow">{about.story.eyebrow}</p>
          <h2 className="mt-5 text-3xl leading-tight md:text-5xl">
            {about.story.title}
          </h2>
          <div className="mt-10 space-y-6">
            {about.story.body.map((paragraph) => (
              <p key={paragraph} className="text-xl leading-9 text-ink/74">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-y border-ink/12 bg-white">
        <div className="editorial-container max-w-5xl">
          <p className="eyebrow">{about.origin.eyebrow}</p>
          <h2 className="mt-5 text-3xl leading-tight md:text-5xl">
            {about.origin.title}
          </h2>
          <div className="mt-10 space-y-6">
            {about.origin.body.map((paragraph) => (
              <p key={paragraph} className="text-xl leading-9 text-ink/74">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="editorial-container max-w-5xl">
          <p className="eyebrow">{about.collaboration.eyebrow}</p>
          <h2 className="mt-5 text-3xl leading-tight md:text-5xl">
            {about.collaboration.title}
          </h2>
          <p className="mt-10 text-xl leading-9 text-ink/74">
            {about.collaboration.body}
          </p>
          <div className="mt-10 border-t border-ink/15">
            {about.collaboration.steps.map((step) => (
              <div key={step.title} className="border-b border-ink/12 py-6">
                <h3 className="text-2xl leading-tight">{step.title}</h3>
                <p className="mt-3 text-base leading-7 text-ink/70">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-y border-ink/12 bg-white">
        <div className="editorial-container max-w-5xl">
          <p className="eyebrow">What Studio Baggio builds</p>
          <h2 className="mt-5 text-3xl leading-tight md:text-5xl">
            Products, advisory systems and proof assets.
          </h2>
          <div className="mt-10 space-y-5">
            {about.work.map((item) => (
              <p key={item} className="border-l border-ink/20 pl-5 text-lg leading-8 text-ink/74">
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="editorial-container max-w-5xl">
          <p className="eyebrow">External view</p>
          <blockquote className="mt-6 text-3xl leading-tight text-ink md:text-5xl">
            &ldquo;{about.quote.text}&rdquo;
          </blockquote>
          <p className="mt-6 text-sm uppercase tracking-[0.08em] text-ink/55">
            {about.quote.attribution}
          </p>
        </div>
      </section>

      <section className="section-pad bg-charcoal text-paper">
        <div className="editorial-container max-w-5xl">
          <h2 className="text-3xl leading-tight md:text-5xl">
            Advisory is selective. The work starts with the commercial problem.
          </h2>
          <ButtonLink href={primaryCta.href} className="mt-8 border-paper text-paper hover:bg-paper hover:text-ink">
            {primaryCta.label}
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
