import type { Metadata } from "next";
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { FaqAccordion } from "@/components/faq-accordion";
import { FaqSchema } from "@/components/faq-schema";
import { ServicesMotion } from "@/components/services-motion";
import { ServicesOffersIndex } from "@/components/services-offers-index";
import {
  about,
  introDownload,
  metadata as siteMetadata,
  primaryCta,
  servicesPage
} from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { siteUrl } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  ...siteMetadata.services,
  path: "/services"
});

const pageUrl = `${siteUrl}/services`;

type ServiceOffer = {
  id: string;
  name: string;
  summary: string;
  paras: string[];
  includesLabel: string;
  includes: string[];
  subSection?: { label: string; paras: string[] };
  outro?: string[];
  outroStrong?: boolean;
  example?: { paras: string[]; highlight?: string };
  quote?: { text: string; result?: string; attr: string };
  featuredIn?: {
    label: string;
    logos: { name: string; src: string; width: number }[];
  };
};

const offers = servicesPage.offers as ServiceOffer[];

const servicesSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${pageUrl}#services`,
      name: "AI strategy, systems and implementation",
      serviceType: "AI strategy, systems and implementation",
      description: servicesPage.intro.join(" "),
      url: pageUrl,
      areaServed: "GB",
      provider: {
        "@type": "Organization",
        name: "Studio Baggio Ltd",
        url: siteUrl
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "What you can hire Studio Baggio for",
        itemListElement: offers.map((offer) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: offer.name,
            description: offer.summary,
            url: `${pageUrl}#${offer.id}`
          }
        }))
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Studio Baggio",
          item: siteUrl
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: pageUrl
        }
      ]
    }
  ]
};

function ExampleParagraph({ text, highlight }: { text: string; highlight?: string }) {
  if (!highlight || !text.includes(highlight)) {
    return <p className="text-base leading-relaxed text-ink/70">{text}</p>;
  }

  const [before, after] = text.split(highlight);

  return (
    <p className="text-base leading-relaxed text-ink/70">
      {before}
      <strong className="font-semibold text-[color:var(--sb-accent-blue)]">{highlight}</strong>
      {after}
    </p>
  );
}

export default function ServicesPage() {
  return (
    <>
      <FaqSchema items={servicesPage.faq.items} />
      <script
        id="services-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      {/* Entrance runs as pure CSS on the compositor thread: it starts at
          first paint (before hydration) and main-thread work cannot make it
          stutter — unlike a GSAP tween under lagSmoothing(0). */}
      <style
        id="services-entrance"
        dangerouslySetInnerHTML={{
          __html: [
            "@keyframes svHeroIn{from{opacity:0;transform:translate3d(0,18px,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
            "[data-sv-title],[data-sv-hero]{animation:svHeroIn 0.85s cubic-bezier(0.16,0.84,0.32,1) both}",
            "[data-sv-title]{animation-delay:0.12s}",
            "[data-sv-hero]{animation-delay:0.28s}",
            '[data-sv-hero="lead"]{animation-delay:0s}',
            '[data-sv-hero="late"]{animation-delay:0.42s}',
            "@media (prefers-reduced-motion: reduce){[data-sv-title],[data-sv-hero]{animation:none}}"
          ].join("")
        }}
      />
      <ServicesMotion />
      <div className="home-4b services-page" data-services-root>
        <section className="sv-hero">
          <div className="editorial-container">
            <p className="eyebrow" data-sv-hero="lead">
              {servicesPage.eyebrow}
            </p>
            <div className="sv-hero-frame">
              <h1 className="sv-hero-title" data-sv-title>
                <span>AI strategy,</span>
                <span>systems and</span>
                <span>
                  implementation
                  <span className="sv-hero-dot" aria-hidden="true" />
                </span>
              </h1>
              <div className="sv-hero-copy" data-sv-hero>
                {servicesPage.intro.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
            </div>
            <div className="sv-hero-index" data-sv-hero="late">
              <ServicesOffersIndex items={offers.map(({ id, name }) => ({ id, name }))} />
            </div>
          </div>
        </section>

        <section className="border-t border-ink/10 pt-10 pb-14 md:pt-12 md:pb-20">
          <div className="editorial-container">
            <p className="eyebrow" data-sv-reveal>
              {servicesPage.howWeWork.eyebrow}
            </p>
            <div className="mt-5 max-w-3xl space-y-4" data-sv-reveal>
              {servicesPage.howWeWork.paras.map((para) => (
                <p key={para} className="text-base leading-relaxed text-ink/70 md:text-lg">
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-0" data-svf>
              {servicesPage.ways.items.map((item, index) => (
                <Fragment key={item.lead}>
                  {index > 0 ? (
                    <div
                      className="relative hidden w-16 flex-none self-center lg:block"
                      aria-hidden="true"
                    >
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
                    <h3 className="mt-4 text-base font-bold leading-snug text-ink md:text-lg">
                      {item.lead}
                    </h3>
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

        <section className="border-t border-ink/10 pt-14 pb-6 md:pt-20 md:pb-8">
          <div className="editorial-container">
            <p className="eyebrow" data-sv-reveal>
              {servicesPage.offersEyebrow}
            </p>
            <div className="sv-stack mt-10 space-y-16 md:space-y-20 lg:space-y-[40vh]">
              {offers.map((offer) => (
                <article
                  key={offer.id}
                  id={offer.id}
                  className="sv-card mx-auto max-w-5xl scroll-mt-28"
                  data-sv-card
                >
                  <div className="flex items-start justify-between gap-6">
                    <h2 className="text-2xl md:text-3xl">{offer.name}</h2>
                    <Link
                      href="/contact"
                      className="focus-ring mt-2 hidden flex-none items-center gap-2 text-sm uppercase tracking-[0.08em] text-ink transition-colors hover:text-[color:var(--sb-accent-blue)] sm:inline-flex"
                    >
                      Enquire now
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                  <div
                    className="mt-3 h-0.5 w-9 bg-[color:var(--sb-accent-blue)]"
                    aria-hidden="true"
                    data-sv-accent
                  />
                  <div className="mt-6 space-y-4">
                    {offer.paras.map((para) => (
                      <p key={para} className="text-base leading-relaxed text-ink/70 md:text-lg">
                        {para}
                      </p>
                    ))}
                  </div>
                  <h3 className="eyebrow pt-8 lg:pt-6">{offer.includesLabel}</h3>
                  <ul
                    className={`mt-4 -mb-2 gap-x-8 sm:columns-2${offer.includes.length > 6 || offer.includes.join(" ").length > 320 ? " lg:columns-3" : ""}`}
                    data-sv-list
                  >
                    {offer.includes.map((item) => (
                      <li
                        key={item}
                        className="mb-2 flex break-inside-avoid items-baseline gap-3 text-base leading-relaxed text-ink/70 md:text-lg"
                      >
                        <span
                          className="h-1 w-1 flex-none translate-y-[-2px] rounded-full bg-[color:var(--sb-accent-blue)]"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <>
                      {offer.subSection ? (
                        <div className="mt-10" data-sv-reveal>
                          <h3 className="eyebrow">{offer.subSection.label}</h3>
                          <div className="mt-4 space-y-4">
                            {offer.subSection.paras.map((para) => (
                              <p
                                key={para}
                                className="text-base leading-relaxed text-ink/70 md:text-lg"
                              >
                                {para}
                              </p>
                            ))}
                          </div>
                        </div>
                      ) : null}
                      {offer.outro ? (
                        <div className="mt-6 space-y-4" data-sv-reveal>
                          {offer.outro.map((para) => (
                            <p
                              key={para}
                              className={
                                offer.outroStrong
                                  ? "text-base font-semibold leading-relaxed text-ink md:text-lg"
                                  : "text-base leading-relaxed text-ink/70 md:text-lg"
                              }
                            >
                              {para}
                            </p>
                          ))}
                        </div>
                      ) : null}
                      {offer.quote ? (
                        <figure className="mt-8" data-sv-reveal>
                          <blockquote className="text-base leading-relaxed text-[color:var(--sb-accent-blue)]">
                            &ldquo;{offer.quote.text}&rdquo;
                          </blockquote>
                          {offer.quote.result ? (
                            <p className="mt-3 text-base leading-relaxed text-ink/70">
                              Result:{" "}
                              <strong className="font-semibold text-[color:var(--sb-accent-blue)]">
                                {offer.quote.result}
                              </strong>
                              .
                            </p>
                          ) : null}
                          <figcaption className="mt-3 text-xs uppercase tracking-[0.08em] text-ink/50">
                            {offer.quote.attr}
                          </figcaption>
                        </figure>
                      ) : null}
                      {offer.example ? (
                        <div className="sv-example relative mt-8 pl-5" data-sv-example>
                          <span className="sv-borderline" aria-hidden="true" />
                          <p className="eyebrow text-[color:var(--sb-accent-blue)]">Example</p>
                          <div className="mt-3 space-y-3">
                            {offer.example.paras.map((para) => (
                              <ExampleParagraph
                                key={para}
                                text={para}
                                highlight={offer.example?.highlight}
                              />
                            ))}
                          </div>
                        </div>
                      ) : null}
                      {offer.featuredIn ? (
                        <div
                          className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-ink/10 pt-5"
                          data-sv-reveal
                        >
                          <span className="text-xs uppercase tracking-[0.08em] text-ink/50">
                            {offer.featuredIn.label}
                          </span>
                          {offer.featuredIn.logos.map((logo) => (
                            <Image
                              key={logo.name}
                              src={logo.src}
                              alt={logo.name}
                              width={logo.width}
                              height={16}
                              className="h-4 w-auto"
                            />
                          ))}
                        </div>
                      ) : null}
                      <Link
                        href="/contact"
                        className="focus-ring mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.08em] text-ink transition-colors hover:text-[color:var(--sb-accent-blue)] sm:hidden"
                      >
                        Enquire now
                        <span aria-hidden="true">&rarr;</span>
                      </Link>
                  </>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-ink/10 py-14 md:py-20">
          <div className="editorial-container">
            <p className="eyebrow" data-sv-reveal>
              What clients say
            </p>
            <div className="mt-8 grid gap-x-12 gap-y-10 lg:grid-cols-2" data-sv-list>
              {about.testimonials.map((testimonial) => (
                <figure key={testimonial.name} className="relative pl-5">
                  <span
                    className="absolute bottom-0 left-0 top-0 w-0.5 bg-[color:var(--sb-accent-blue)]"
                    aria-hidden="true"
                  />
                  <blockquote className="text-base leading-relaxed text-[color:var(--sb-accent-blue)]">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-3 text-xs uppercase tracking-[0.08em] text-ink/50">
                    {testimonial.name} &middot; {testimonial.role}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-ink/10 py-14 md:py-20">
          <div className="editorial-container max-w-3xl">
            <h2 className="text-2xl md:text-3xl" data-sv-reveal>
              {servicesPage.download.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink/70 md:text-lg" data-sv-reveal>
              {servicesPage.download.body}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-6" data-sv-reveal>
              <a
                className="focus-ring inline-flex min-h-11 items-center gap-2 border border-ink px-5 py-3 text-sm uppercase tracking-[0.06em] transition-colors hover:bg-ink hover:text-paper"
                href={introDownload.href}
                download
              >
                {servicesPage.download.label}
              </a>
              <Link
                className="focus-ring text-sm text-ink/60 underline underline-offset-4 hover:text-ink"
                href="/work"
              >
                See live Studio Baggio products
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-ink/10 py-14 md:py-20">
          <div className="editorial-container">
            <p className="eyebrow" data-sv-reveal>
              {servicesPage.faq.eyebrow}
            </p>
            <FaqAccordion items={servicesPage.faq.items} />
          </div>
        </section>

        <section className="border-t border-ink/10 py-16 md:py-24" data-header-theme="dark">
          <div className="editorial-container max-w-3xl">
            <h2 className="text-2xl md:text-3xl" data-sv-reveal>
              Book a 30-minute conversation to identify where Studio Baggio AI could create the
              most value in your business and the right place to start.
            </h2>
            <div className="mt-8 flex flex-wrap items-center gap-6" data-sv-reveal>
              <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
              <a
                className="focus-ring text-sm text-ink/60 underline underline-offset-4 hover:text-ink"
                href="mailto:jayme@studiobaggio.ai?subject=Booking%20a%20conversation%20%E2%80%94%20Studio%20Baggio"
              >
                Email: Jayme@studiobaggio.ai
              </a>
            </div>
          </div>
        </section>

        <section className="border-t border-ink/10 py-10 md:py-12">
          <div className="editorial-container flex flex-wrap items-center gap-x-9 gap-y-4">
            <span className="eyebrow" data-sv-reveal>
              {servicesPage.press.label}
            </span>
            {servicesPage.press.items.map((item) => (
              <a
                key={item.name}
                className="focus-ring inline-flex items-center"
                data-sv-logo
                href={item.href}
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src={item.logo}
                  alt={item.name}
                  width={item.width}
                  height={16}
                  className="h-4 w-auto"
                />
              </a>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
