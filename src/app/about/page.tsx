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

      <section className="section-pad border-y border-ink/12">
        <div className="editorial-container">
          <p className="eyebrow">What the page covers</p>
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
          <p className="eyebrow">Founder / operator</p>
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
            The page is separate because the work is not only a service line. It is a founder/operator practice.
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
