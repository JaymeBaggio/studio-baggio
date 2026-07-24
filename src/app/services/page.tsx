import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { FaqAccordion } from "@/components/faq-accordion";
import { FaqSchema } from "@/components/faq-schema";
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
      <div className="home-4b">
        <section className="py-16 md:py-24">
          <div className="editorial-container">
            <p className="eyebrow">{servicesPage.eyebrow}</p>
            <h1 className="mt-4 max-w-3xl text-4xl leading-[1.08] md:text-5xl">
              {servicesPage.title}
            </h1>
            <div className="mt-8 max-w-3xl space-y-4">
              {servicesPage.intro.map((para) => (
                <p key={para} className="text-base leading-relaxed text-ink/70 md:text-lg">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-ink/10 py-14 md:py-20">
          <div className="editorial-container">
            <p className="eyebrow">{servicesPage.offersEyebrow}</p>
            <div className="mt-10 space-y-16 md:space-y-20">
              {offers.map((offer) => (
                <article key={offer.id} id={offer.id} className="max-w-3xl scroll-mt-28">
                  <h2 className="text-2xl md:text-3xl">{offer.name}</h2>
                  <div
                    className="mt-3 h-0.5 w-9 bg-[color:var(--sb-accent-blue)]"
                    aria-hidden="true"
                  />
                  <div className="mt-6 space-y-4">
                    {offer.paras.map((para) => (
                      <p key={para} className="text-sm leading-relaxed text-ink/70 md:text-base">
                        {para}
                      </p>
                    ))}
                  </div>
                  <h3 className="eyebrow mt-8">{offer.includesLabel}</h3>
                  <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
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
                    <div className="mt-8">
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
                    <div className="mt-6 space-y-4">
                      {offer.outro.map((para) => (
                        <p key={para} className="text-sm leading-relaxed text-ink/70 md:text-base">
                          {para}
                        </p>
                      ))}
                    </div>
                  ) : null}
                  {offer.example ? (
                    <div className="mt-8 border-l-2 border-[color:var(--sb-accent-blue)] pl-5">
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
            <p className="eyebrow">{servicesPage.howWeWork.eyebrow}</p>
            <p className="mt-5 text-lg font-semibold tracking-[0.02em] md:text-xl">
              {servicesPage.howWeWork.triad}
            </p>
            <div className="mt-5 space-y-4">
              {servicesPage.howWeWork.paras.map((para) => (
                <p key={para} className="text-sm leading-relaxed text-ink/70 md:text-base">
                  {para}
                </p>
              ))}
            </div>

            <p className="eyebrow mt-12">{servicesPage.ways.eyebrow}</p>
            <div className="mt-5 space-y-5">
              {servicesPage.ways.items.map((item) => (
                <p key={item.lead} className="text-sm leading-relaxed text-ink/70 md:text-base">
                  <strong className="block text-ink">{item.lead}</strong>
                  {item.detail}
                </p>
              ))}
            </div>

            <p className="eyebrow mt-12">{servicesPage.ongoing.eyebrow}</p>
            <p className="mt-4 text-sm leading-relaxed text-ink/70 md:text-base">
              {servicesPage.ongoing.para}
            </p>
          </div>
        </section>

        <section className="border-t border-ink/10 py-14 md:py-20">
          <div className="editorial-container max-w-3xl">
            <p className="eyebrow">{servicesPage.proof.eyebrow}</p>
            <p className="mt-4 text-sm leading-relaxed text-ink/70 md:text-base">
              {servicesPage.proof.para.split("Last30Days")[0]}
              <Link
                className="focus-ring underline underline-offset-4 hover:text-ink"
                href="/last30days"
              >
                Last30Days
              </Link>
              {servicesPage.proof.para.split(/Last30Days(.*)/s)[1]}
            </p>
          </div>
        </section>

        <section className="border-t border-ink/10 py-14 md:py-20">
          <div className="editorial-container max-w-3xl">
            <p className="eyebrow">{servicesPage.download.eyebrow}</p>
            <h2 className="mt-4 text-2xl md:text-3xl">{servicesPage.download.title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink/70 md:text-base">
              {servicesPage.download.body}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-6">
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
            <p className="eyebrow">{servicesPage.faq.eyebrow}</p>
            <FaqAccordion items={servicesPage.faq.items} />
          </div>
        </section>

        <section className="border-t border-ink/10 py-16 md:py-24" data-header-theme="dark">
          <div className="editorial-container max-w-3xl">
            <h2 className="text-2xl md:text-3xl">
              A 30-minute conversation to identify where AI could create the most measurable value
              in your business and which starting point is right.
            </h2>
            <div className="mt-8">
              <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
