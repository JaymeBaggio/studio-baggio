import type { Metadata } from "next";
import { PageReveals } from "@/components/page-reveals";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { aiTeamSetupPage as page, conversionLinks } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ ...page.metadata, path: "/ai-team-setup" });

const bookingHref = conversionLinks.booking || "/contact?type=ai-operating-systems";
const bookingIsExternal = bookingHref.startsWith("http");

function BookButton() {
  return (
    <a
      className="service-next-step-button focus-ring"
      href={bookingHref}
      {...(bookingIsExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {page.bookLabel}
    </a>
  );
}

export default function AiTeamSetupPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "AI Team Setup", path: "/ai-team-setup" }]} />
      <PageReveals />
      <div className="home-4b studio-page offer-page">
        <section className="studio-page-hero">
          <div className="editorial-container studio-page-frame">
            <div>
              <p className="eyebrow" data-reveal data-motion="label">
                {page.eyebrow}
              </p>
              <h1 className="studio-page-title" data-split>
                {page.title}
              </h1>
              <p className="studio-page-lead offer-page-lead" data-reveal>
                {page.lead}
              </p>
              <div className="service-next-step-actions" data-reveal>
                <BookButton />
                <a className="service-next-step-link" href={conversionLinks.caseStudy}>
                  {page.caseStudyLabel}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="editorial-container studio-page-stack">
            <p className="eyebrow" data-reveal data-motion="label">
              {page.forWho.eyebrow}
            </p>
            <div className="studio-page-copy" data-reveal>
              {page.forWho.body.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="editorial-container studio-page-stack">
            <p className="eyebrow" data-reveal data-motion="label">
              {page.weeks.eyebrow}
            </p>
            <div className="studio-page-rows is-full">
              {page.weeks.items.map((item, index) => (
                <article key={item.title} className="studio-page-row" data-reveal>
                  <span className="studio-page-row-number">0{index + 1}</span>
                  <h2 className="studio-page-row-title">{item.title}</h2>
                  <p className="studio-page-row-copy">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="editorial-container studio-page-stack">
            <p className="eyebrow" data-reveal data-motion="label">
              {page.proof.eyebrow}
            </p>
            <div className="studio-page-copy" data-reveal>
              <p>{page.proof.body}</p>
              <blockquote className="offer-page-quote">
                <p>&ldquo;{page.proof.quote}&rdquo;</p>
                <footer>{page.proof.attr}</footer>
              </blockquote>
              <p>
                <a className="service-next-step-link" href={conversionLinks.caseStudy}>
                  {page.caseStudyLabel}
                </a>
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="editorial-container studio-page-stack">
            <p className="eyebrow" data-reveal data-motion="label">
              {page.terms.eyebrow}
            </p>
            <div className="studio-page-rows is-full">
              {page.terms.items.map((item, index) => (
                <article key={item.title} className="studio-page-row" data-reveal>
                  <span className="studio-page-row-number">0{index + 1}</span>
                  <h2 className="studio-page-row-title">{item.title}</h2>
                  <p className="studio-page-row-copy">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="editorial-container studio-page-stack">
            <p className="eyebrow" data-reveal data-motion="label">
              {page.start.eyebrow}
            </p>
            <ol className="studio-page-list offer-page-steps" data-reveal>
              {page.start.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <div className="service-next-step-actions" data-reveal>
              <BookButton />
              {conversionLinks.deposit ? (
                <a
                  className="service-next-step-link"
                  href={conversionLinks.deposit}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {page.start.depositLabel}
                </a>
              ) : null}
              <a className="service-next-step-link" href="mailto:jayme@studiobaggio.ai">
                {page.start.emailLine}
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
