import type { Metadata } from "next";
import { PageReveals } from "@/components/page-reveals";
import { ProductDetailPanel, type ProductWorkItem } from "@/components/products-page-showcase";
import { workItems } from "@/content/work";
import { pageMetadata } from "@/lib/metadata";
import { siteUrl } from "@/lib/utils";

const last30Days = workItems.find(
  (item): item is ProductWorkItem => item.slug === "last30days" && Boolean(item.productPage)
);

const title = "Last30Days | AI Market Intelligence by Studio Baggio";
const description =
  "Last30Days is a Studio Baggio product for AI market intelligence across Reddit, X, TikTok, Instagram, YouTube, Polymarket and the open web.";
const pageUrl = `${siteUrl}/last30days`;
const appUrl = "https://last30days.app";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/last30days"
});

const last30DaysSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${appUrl}/#software`,
      name: "Last30Days",
      alternateName: ["last30days", "/Last30Days"],
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: appUrl,
      image: `${siteUrl}/assets/products/last30days-products-og.png`,
      description,
      isAccessibleForFree: true,
      creator: {
        "@type": "Organization",
        name: "Studio Baggio Ltd",
        url: siteUrl
      },
      publisher: {
        "@type": "Organization",
        name: "Studio Baggio Ltd",
        url: siteUrl
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "GBP",
        availability: "https://schema.org/InStock",
        url: appUrl
      },
      featureList: [
        "AI market intelligence across Reddit, X, TikTok, Instagram, YouTube, Polymarket and the open web",
        "Last 30 days source filtering",
        "Structured, sourced research reports in under 60 seconds",
        "Citations for every claim",
        "Competitor, trend, category, launch and market sentiment research"
      ],
      sameAs: [pageUrl]
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
          name: "Products",
          item: `${siteUrl}/work`
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Last30Days",
          item: pageUrl
        }
      ]
    }
  ]
};

export default function Last30DaysPage() {
  if (!last30Days) {
    return null;
  }

  return (
    <>
      <PageReveals />
      <script
        id="last30days-software-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(last30DaysSchema) }}
      />
      <div className="home-4b studio-page products-page products-detail-page">
        <ProductDetailPanel
          item={last30Days}
          panelId="last30days-product"
          currentPath="/last30days"
          headingLevel="h1"
          showMobileBack={false}
          animateOnMount={false}
        />
      </div>
    </>
  );
}
