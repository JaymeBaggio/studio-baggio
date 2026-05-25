import type { Metadata } from "next";
import Image from "next/image";
import { AboutPageMotion } from "@/components/about-page-motion";
import { calmAuthority, metadata as siteMetadata } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ ...siteMetadata.calmAuthority, path: "/calm-authority" });

const sections = [
  {
    label: "The problem",
    body: calmAuthority.problem
  },
  {
    label: "Why now",
    body: [calmAuthority.whyNow]
  },
  {
    label: "How it works",
    body: calmAuthority.howItWorks
  },
  {
    label: "Who it's for",
    list: calmAuthority.whoItsFor
  },
  {
    label: "Proof",
    proof: calmAuthority.proofPoints
  },
  {
    label: "Compliance and editorial control",
    body: [calmAuthority.compliance]
  },
  {
    label: "Founding adviser",
    person: {
      name: calmAuthority.foundingAdviser.name,
      role: calmAuthority.foundingAdviser.role,
      body: [calmAuthority.foundingAdviser.body]
    }
  },
  {
    label: "Built by",
    person: {
      name: calmAuthority.builtBy.name,
      role: calmAuthority.builtBy.role,
      body: calmAuthority.builtBy.body
    }
  }
] as const;

export default function CalmAuthorityPage() {
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
            {calmAuthority.eyebrow}
          </p>
          <h1
            className="mt-8 max-w-[21rem] text-[2.2rem] uppercase leading-[1.02] sm:max-w-[28rem] sm:text-5xl md:max-w-[42rem] md:text-[3.7rem] lg:text-[4.2rem]"
            data-about-hero
          >
            {calmAuthority.title}
          </h1>
          <p
            className="mt-7 max-w-[31rem] text-2xl leading-[1.18] text-ink/58 sm:max-w-[34rem] md:max-w-[760px] md:text-[2.05rem] md:leading-[1.16]"
            data-about-hero
          >
            {calmAuthority.tagline}
          </p>
          <p className="mt-6 max-w-[31rem] text-base leading-7 text-ink/58 md:max-w-[760px]" data-about-hero>
            {calmAuthority.builtLine}
          </p>
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(24rem,36rem)] lg:items-start lg:gap-16" data-about-hero>
            <p className="text-xl leading-9 text-ink/78 md:text-[1.45rem] md:leading-10">
              {calmAuthority.productIntro}
            </p>
            <a
              href={calmAuthority.liveHref}
              target="_blank"
              rel="noreferrer"
              className="focus-ring block border border-ink/14 bg-[#020914]"
              aria-label="Open Calm Authority website"
            >
              <Image
                src="/assets/products/calm-authority-og-featured-16x9.png"
                alt="Calm Authority brand graphic with Financial Times, Professional Adviser and Money Marketing logos."
                width={2400}
                height={1350}
                className="h-auto w-full"
                priority
                unoptimized
              />
            </a>
          </div>
        </div>
      </section>

      <section>
        <div className="editorial-container">
          <article className="border-b border-ink/12 py-14 md:py-16" data-about-section>
            <div className="max-w-[980px] space-y-6" data-about-body>
              {calmAuthority.commercialThesis.map((paragraph) => (
                <p key={paragraph} className="text-xl leading-9 text-ink/78 md:text-[1.45rem] md:leading-10">
                  {paragraph}
                </p>
              ))}
            </div>
            <span className="mt-12 block h-px w-full origin-left scale-x-0 bg-ink/20" data-about-rule />
          </article>

          {sections.map((section, index) => (
            <article key={section.label} className="border-b border-ink/12 py-14 md:py-16" data-about-section>
              <div className="flex items-baseline gap-4" data-about-section-heading>
                <span className="w-10 shrink-0 text-sm tabular-nums text-ink/40">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="text-sm uppercase tracking-[0.12em] text-ink/58">{section.label}</h2>
              </div>

              <div className="mt-8 max-w-[980px]" data-about-body>
                {"body" in section ? (
                  <div className="space-y-6">
                    {section.body.map((paragraph) => (
                      <p key={paragraph} className="text-xl leading-9 text-ink/78 md:text-[1.45rem] md:leading-10">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : null}

                {"list" in section ? (
                  <ul className="divide-y divide-ink/12 border-y border-ink/12">
                    {section.list.map((item) => (
                      <li key={item} className="py-5 text-xl leading-8 text-ink/78 md:text-[1.45rem] md:leading-10">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {"proof" in section ? (
                  <div className="divide-y divide-ink/12 border-y border-ink/12">
                    {section.proof.map((point) => (
                      <div key={point.metric} className="grid gap-4 py-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                        <h3 className="text-xl leading-8 text-ink md:text-[1.45rem] md:leading-9">{point.metric}</h3>
                        {point.body ? <p className="text-base leading-7 text-ink/68 md:text-lg md:leading-8">{point.body}</p> : null}
                      </div>
                    ))}
                  </div>
                ) : null}

                {"person" in section ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl leading-none md:text-[3.2rem]">{section.person.name}</h3>
                      <p className="mt-3 text-xs uppercase tracking-[0.1em] text-ink/45">{section.person.role}</p>
                    </div>
                    {section.person.body.map((paragraph) => (
                      <p key={paragraph} className="text-xl leading-9 text-ink/78 md:text-[1.45rem] md:leading-10">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : null}
              </div>

              <span className="mt-12 block h-px w-full origin-left scale-x-0 bg-ink/20" data-about-rule />
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
