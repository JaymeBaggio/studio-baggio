import type { Metadata } from "next";
import { Fragment } from "react";
import { ButtonLink } from "@/components/ui/button";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { FaqAccordion } from "@/components/faq-accordion";
import { FaqSchema } from "@/components/faq-schema";
import { LastWordMark } from "@/components/last-word-mark";
import { ServicesMotion } from "@/components/services-motion";
import { aiTeamSetupPage as page, conversionLinks } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ ...page.metadata, path: "/ai-team-setup" });

// Until a booking page exists, the call button opens the contact form.
const bookingHref = conversionLinks.booking || "/contact?type=ai-operating-systems";
const bookingIsExternal = bookingHref.startsWith("http");

function ExampleParagraph({ text, highlight }: { text: string; highlight: string }) {
  const [before, after] = text.split(highlight);
  return (
    <p className="text-base leading-relaxed text-ink/70">
      {before}
      <strong className="font-semibold text-[color:var(--sb-accent-blue)]">{highlight}</strong>
      {after}
    </p>
  );
}

export default function AiTeamSetupPage() {
  const { offer } = page;

  return (
    <>
      <BreadcrumbSchema items={[{ name: "AI Team Setup", path: "/ai-team-setup" }]} />
      <FaqSchema items={page.faq.items} />
      <style
        id="offer-entrance"
        dangerouslySetInnerHTML={{
          __html: [
            "@keyframes svHeroIn{from{opacity:0;transform:translate3d(0,18px,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
            "[data-sv-title],[data-sv-hero]{animation:svHeroIn 0.6s cubic-bezier(0.16,0.84,0.32,1) both}",
            "[data-sv-title]{animation-delay:0.08s}",
            "[data-sv-hero]{animation-delay:0.18s}",
            '[data-sv-hero="lead"]{animation-delay:0s}',
            "@media (prefers-reduced-motion: reduce){[data-sv-title],[data-sv-hero]{animation:none}}"
          ].join("")
        }}
      />
      <ServicesMotion />
      <div className="home-4b services-page offer-page" data-services-root>
        <section className="sv-hero">
          <div className="editorial-container">
            <p className="eyebrow" data-sv-hero="lead">
              {page.eyebrow}
            </p>
            <div className="sv-hero-frame">
              <h1 className="sv-hero-title" data-sv-title>
                {page.titleLines.map((line, index) => (
                  <Fragment key={line}>
                    {index > 0 ? " " : null}
                    <span>{index === page.titleLines.length - 1 ? <LastWordMark text={line} /> : line}</span>
                  </Fragment>
                ))}
              </h1>
              <div className="sv-hero-copy" data-sv-hero>
                {page.intro.map((para) => (
                  <p key={para}>{para}</p>
                ))}
                <div className="mt-8">
                  <ButtonLink href={bookingHref} external={bookingIsExternal}>
                    {page.cta}
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-ink/10 pt-14 pb-14 md:pt-20 md:pb-20">
          <div className="editorial-container">
            <p className="eyebrow" data-sv-reveal>
              {offer.eyebrow}
            </p>
            <article className="sv-card mx-auto mt-10 max-w-5xl">
              <div className="flex items-start justify-between gap-6">
                <h2 className="text-2xl md:text-3xl">{offer.name}</h2>
                <a
                  href={bookingHref}
                  {...(bookingIsExternal ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="focus-ring mt-2 hidden flex-none items-center gap-2 text-sm uppercase tracking-[0.08em] text-ink transition-colors hover:text-[color:var(--sb-accent-blue)] sm:inline-flex"
                >
                  Book a call
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
              <div className="mt-3 h-0.5 w-9 bg-[color:var(--sb-accent-blue)]" aria-hidden="true" data-sv-accent />
              <div className="sv-card-grid">
                <div className="sv-card-main">
                  <div className="space-y-3">
                    {offer.paras.map((para) => (
                      <p key={para} className="text-ink/70">
                        {para}
                      </p>
                    ))}
                  </div>
                  <h3 className="eyebrow pt-6">{offer.includesLabel}</h3>
                  <ul className="mt-3 -mb-2 gap-x-6 sm:columns-2" data-sv-list>
                    {offer.includes.map((item) => (
                      <li key={item} className="mb-2 flex break-inside-avoid items-baseline gap-3 text-ink/70">
                        <span
                          className="h-1 w-1 flex-none translate-y-[-2px] rounded-full bg-[color:var(--sb-accent-blue)]"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 font-semibold text-ink">{offer.outro}</p>
                </div>
                <div className="sv-card-side">
                  <div className="sv-example relative pl-5" data-sv-example>
                    <span className="sv-borderline" aria-hidden="true" />
                    <p className="eyebrow text-[color:var(--sb-accent-blue)]">Example</p>
                    <div className="mt-3">
                      <ExampleParagraph text={offer.example.text} highlight={offer.example.highlight} />
                    </div>
                  </div>
                  <figure className="sv-card-quote">
                    <blockquote className="text-[color:var(--sb-accent-blue)]">&ldquo;{offer.quote.text}&rdquo;</blockquote>
                    <figcaption className="mt-3 text-xs uppercase tracking-[0.08em] text-ink/60">
                      {offer.quote.attr}
                    </figcaption>
                  </figure>
                </div>
              </div>
              <a
                href={bookingHref}
                {...(bookingIsExternal ? { target: "_blank", rel: "noreferrer" } : {})}
                className="focus-ring mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.08em] text-ink transition-colors hover:text-[color:var(--sb-accent-blue)] sm:hidden"
              >
                Book a call
                <span aria-hidden="true">&rarr;</span>
              </a>
            </article>
          </div>
        </section>

        <section className="border-t border-ink/10 pt-10 pb-14 md:pt-12 md:pb-20">
          <div className="editorial-container">
            <h2 className="eyebrow" data-sv-reveal>
              {page.weeks.eyebrow}
            </h2>
            <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-0" data-svf>
              {page.weeks.items.map((item, index) => (
                <Fragment key={item.lead}>
                  {index > 0 ? (
                    <div className="relative hidden w-16 flex-none self-center lg:block" aria-hidden="true">
                      <span
                        className="block h-px w-full origin-left scale-x-0 bg-[color:var(--sb-accent-blue)]"
                        data-svf-line
                      />
                      <span
                        className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--sb-accent-blue)]"
                        data-svf-dot
                      />
                    </div>
                  ) : null}
                  <div
                    className="group relative flex-1 overflow-hidden border border-ink/15 bg-white px-6 pb-6 pt-5 shadow-[0_1px_2px_rgba(20,20,20,0.03),0_12px_32px_rgba(20,20,20,0.06)] transition-[border-color,transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-ink/40 hover:shadow-[0_2px_4px_rgba(20,20,20,0.04),0_18px_44px_rgba(20,20,20,0.09)]"
                    data-svf-card
                  >
                    <p className="eyebrow">{String(index + 1).padStart(2, "0")}</p>
                    <h3 className="mt-4 text-base font-bold leading-snug text-ink md:text-lg">{item.lead}</h3>
                    <div
                      className="mt-2.5 h-0.5 w-6 bg-[color:var(--sb-accent-blue)]"
                      aria-hidden="true"
                      data-svf-accent
                    />
                    <p className="mt-4 text-base leading-relaxed text-ink/70">{item.detail}</p>
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-[color:var(--sb-accent-blue)] transition-transform duration-300 ease-out group-hover:scale-x-100"
                    />
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-ink/10 py-14 md:py-20">
          <div className="editorial-container">
            <p className="eyebrow" data-sv-reveal>
              {page.guarantee.eyebrow}
            </p>
            <h2 className="sv-guarantee-title mt-6 text-2xl md:text-3xl" data-sv-reveal>
              {page.guarantee.title}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink/70 md:text-lg" data-sv-reveal>
              {page.guarantee.body}
            </p>
          </div>
        </section>

        <section className="border-t border-ink/10 py-14 md:py-20">
          <div className="editorial-container">
            <p className="eyebrow" data-sv-reveal>
              {page.faq.eyebrow}
            </p>
            <FaqAccordion items={page.faq.items} />
          </div>
        </section>

        <section className="border-t border-ink/10 py-16 md:py-24" data-header-theme="dark">
          <div className="editorial-container max-w-3xl">
            <h2 className="text-2xl md:text-3xl" data-sv-reveal>
              {page.close.title}
            </h2>
            <div className="mt-8 flex flex-wrap items-center gap-6" data-sv-reveal>
              <ButtonLink href={bookingHref} external={bookingIsExternal}>
                {page.cta}
              </ButtonLink>
              <a
                className="focus-ring text-sm text-ink/60 underline underline-offset-4 hover:text-ink"
                href="mailto:jayme@studiobaggio.ai?subject=AI%20Team%20Setup"
              >
                {page.close.email}
              </a>
              {conversionLinks.deposit ? (
                <a
                  className="focus-ring text-sm text-ink/60 underline underline-offset-4 hover:text-ink"
                  href={conversionLinks.deposit}
                  target="_blank"
                  rel="noreferrer"
                >
                  {page.close.deposit}
                </a>
              ) : null}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
