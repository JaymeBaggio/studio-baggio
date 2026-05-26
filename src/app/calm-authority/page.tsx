import type { Metadata } from "next";
import Image from "next/image";
import { PageReveals } from "@/components/page-reveals";
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
    <>
      <PageReveals />
      <div className="home-4b studio-page">
        <section className="studio-page-hero">
          <div className="editorial-container studio-page-hero-grid">
            <div>
              <p className="eyebrow" data-reveal data-motion="label">{calmAuthority.eyebrow}</p>
              <h1 className="studio-page-title" data-split>
                {calmAuthority.title}
              </h1>
              <p className="studio-page-lead" data-reveal>{calmAuthority.tagline}</p>
              <p className="studio-page-body" data-reveal>{calmAuthority.builtLine}</p>
              <p className="studio-page-body" data-reveal>{calmAuthority.productIntro}</p>
            </div>
            <a
              href={calmAuthority.liveHref}
              target="_blank"
              rel="noreferrer"
              className="focus-ring studio-page-media-link"
              aria-label="Open Calm Authority website"
              data-reveal
              data-motion="evidence"
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
        </section>

        <section>
          <div className="editorial-container studio-page-stack">
            <div className="studio-page-copy" data-reveal>
              {calmAuthority.commercialThesis.map((paragraph, index) => (
                index === 0 ? (
                  <p key={paragraph} className="studio-page-lead">{paragraph}</p>
                ) : (
                  <p key={paragraph}>{paragraph}</p>
                )
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="editorial-container">
            {sections.map((section, index) => (
              <article key={section.label} className="studio-page-editorial-row" data-reveal>
                <div>
                  <span className="studio-page-row-number">{String(index + 1).padStart(2, "0")}</span>
                  <h2 className="studio-page-row-kicker">{section.label}</h2>
                </div>

                <div>
                  {"body" in section ? (
                    <div className="studio-page-copy">
                      {section.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  ) : null}

                  {"list" in section ? (
                    <ul className="studio-page-list">
                      {section.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}

                  {"proof" in section ? (
                    <div className="studio-proof-list">
                      {section.proof.map((point) => (
                        <div key={point.metric} className="studio-proof-row">
                          <h3 className="studio-proof-metric">{point.metric}</h3>
                          {point.body ? <p className="studio-page-row-copy">{point.body}</p> : null}
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {"person" in section ? (
                    <div className="studio-person-block">
                      <div>
                        <h3 className="studio-person-name">{section.person.name}</h3>
                        <p className="studio-person-role">{section.person.role}</p>
                      </div>
                      <div className="studio-page-copy">
                        {section.person.body.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
