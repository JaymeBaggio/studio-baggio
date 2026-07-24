import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { FaqAccordion } from "@/components/faq-accordion";
import { FaqSchema } from "@/components/faq-schema";
import { ServicesMotion } from "@/components/services-motion";
import { ServicesOffersIndex } from "@/components/services-offers-index";
import {
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
  example?: { paras: string[]; highlight?: string };
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
    return <p className="text-sm leading-relaxed text-ink/70 md:text-base">{text}</p>;
  }

  const [before, after] = text.split(highlight);

  return (
    <p className="text-sm leading-relaxed text-ink/70 md:text-base">
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
      <script
        id="services-prestate"
        dangerouslySetInnerHTML={{
          __html:
            '(function(){if(document.getElementById("sv-prestate"))return;var s=document.createElement("style");s.id="sv-prestate";s.textContent="[data-sv-hero],[data-sv-title]{opacity:0}@media (prefers-reduced-motion: reduce){[data-sv-hero],[data-sv-title]{opacity:1}}";document.head.appendChild(s);})();'
        }}
      />
      <ServicesMotion />
      <div className="home-4b" data-services-root>
        <section className="py-16 md:py-24">
          <div className="editorial-container">
            <p className="eyebrow" data-sv-hero>
              {servicesPage.eyebrow}
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl leading-[1.08] md:text-5xl" data-sv-title>
              {servicesPage.title}
            </h1>
            <div className="mt-8 max-w-3xl space-y-4">
              {servicesPage.intro.map((para) => (
                <p
                  key={para}
                  className="text-base leading-relaxed text-ink/70 md:text-lg"
                  data-sv-hero
                >
                  {para}
                </p>
              ))}
            </div>
            <div className="mt-12" data-sv-hero>
              <ServicesOffersIndex items={offers.map(({ id, name }) => ({ id, name }))} />
            </div>
          </div>
        </section>

        <section className="border-t border-ink/10 py-14 md:py-20">
          <div className="editorial-container">
            <p className="eyebrow" data-sv-reveal>
              {servicesPage.offersEyebrow}
            </p>
            <div className="sv-stack mt-10 space-y-16 md:space-y-20">
              {offers.map((offer) => (
                <article
                  key={offer.id}
                  id={offer.id}
                  className="sv-card mx-auto max-w-3xl scroll-mt-28"
                  data-sv-card
                >
                  <h2 className="text-2xl md:text-3xl">{offer.name}</h2>
                  <div
                    className="mt-3 h-0.5 w-9 bg-[color:var(--sb-accent-blue)]"
                    aria-hidden="true"
                    data-sv-accent
                  />
                  <div className="mt-6 space-y-4">
                    {offer.paras.map((para) => (
                      <p key={para} className="text-sm leading-relaxed text-ink/70 md:text-base">
                        {para}
                      </p>
                    ))}
                  </div>
                  <h3 className="eyebrow pt-10">{offer.includesLabel}</h3>
                  <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2" data-sv-list>
                    {offer.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-baseline gap-3 text-sm leading-relaxed text-ink/70 md:text-base"
                      >
                        <span
                          className="h-1 w-1 flex-none translate-y-[-2px] rounded-full bg-[color:var(--sb-accent-blue)]"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {offer.subSection ? (
                    <div className="mt-10" data-sv-reveal>
                      <h3 className="eyebrow">{offer.subSection.label}</h3>
                      <div className="mt-4 space-y-4">
                        {offer.subSection.paras.map((para) => (
                          <p
                            key={para}
                            className="text-sm leading-relaxed text-ink/70 md:text-base"
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
                        <p key={para} className="text-sm leading-relaxed text-ink/70 md:text-base">
                          {para}
                        </p>
                      ))}
                    </div>
                  ) : null}
                  {offer.example ? (
                    <div className="sv-example relative mt-10 pl-5" data-sv-example>
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
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-ink/10 py-14 md:py-20">
          <div className="editorial-container max-w-3xl">
            <p className="eyebrow" data-sv-reveal>
              {servicesPage.howWeWork.eyebrow}
            </p>
            <div className="mt-5 space-y-4" data-sv-reveal>
              {servicesPage.howWeWork.paras.map((para) => (
                <p key={para} className="text-sm leading-relaxed text-ink/70 md:text-base">
                  {para}
                </p>
              ))}
            </div>

            <p className="eyebrow pt-12" data-sv-reveal>
              {servicesPage.ways.eyebrow}
            </p>
            <div className="mt-5 space-y-5" data-sv-list>
              {servicesPage.ways.items.map((item) => (
                <p key={item.lead} className="text-sm leading-relaxed text-ink/70 md:text-base">
                  <strong className="block text-ink">{item.lead}</strong>
                  {item.detail}
                </p>
              ))}
            </div>

          </div>
        </section>

        <section className="border-t border-ink/10 py-14 md:py-20">
          <div className="editorial-container max-w-3xl">
            <p className="eyebrow" data-sv-reveal>
              {servicesPage.download.eyebrow}
            </p>
            <h2 className="mt-4 text-2xl md:text-3xl" data-sv-reveal>
              {servicesPage.download.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink/70 md:text-base" data-sv-reveal>
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
              A 30-minute conversation to identify where AI could create the most measurable value
              in your business and which starting point is right.
            </h2>
            <div className="mt-8" data-sv-reveal>
              <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
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
