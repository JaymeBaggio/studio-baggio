import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { TrackerBeacon } from "@/components/tracker-beacon";
import { PostHogInit } from "@/components/posthog-init";
import localFont from "next/font/local";
import Script from "next/script";
import { Toaster } from "@/components/ui/toaster";
import { FrontDoorOffer } from "@/components/front-door-offer";
import { ScrollReset } from "@/components/scroll-reset";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { metadata as siteMetadata } from "@/content/site";
import { defaultOpenGraphImage, defaultTwitterImage } from "@/lib/metadata";
import { siteUrl } from "@/lib/utils";
import "./globals.css";

const aileron = localFont({
  src: [
    {
      path: "../../public/fonts/aileron/Aileron-Regular.woff2",
      weight: "400",
      style: "normal"
    },
    {
      path: "../../public/fonts/aileron/Aileron-Bold.woff2",
      weight: "700",
      style: "normal"
    },
    {
      path: "../../public/fonts/aileron/Aileron-Italic.woff2",
      weight: "400",
      style: "italic"
    }
  ],
  variable: "--font-aileron",
  display: "swap",
  preload: true
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteMetadata.home.title,
    template: "%s"
  },
  description: siteMetadata.home.description,
  alternates: {
    canonical: "/"
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION ?? ""
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Studio Baggio",
    title: siteMetadata.home.title,
    description: siteMetadata.home.description,
    images: [defaultOpenGraphImage]
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.home.title,
    description: siteMetadata.home.description,
    images: [defaultTwitterImage]
  }
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Studio Baggio Ltd",
  url: siteUrl,
  email: "jayme@studiobaggio.ai",
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/assets/studio-baggio-logo-square.png`
  },
  founder: {
    "@type": "Person",
    name: "Jayme Baggio",
    url: `${siteUrl}/about`,
    jobTitle: "Founder"
  },
  // sameAs: official/owned profiles. LinkedIn + Substack deliberately omitted for now (Jayme's choice).
  sameAs: [
    "https://find-and-update.company-information.service.gov.uk/company/16805728",
    "https://www.calmauthority.ai/",
    "https://last30days.app",
    "https://fire-source.vercel.app"
  ]
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={aileron.variable}>
      <body suppressHydrationWarning>
        <Script
          id="studio-baggio-organization-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <div className="site-shell">
          <ScrollReset />
          <SmoothScroll />
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </div>
        <FrontDoorOffer />
        <Analytics />
        <TrackerBeacon />
        <PostHogInit />
        <Toaster />
        {/* Snitcher: identifies the companies visiting (workspace PjoB3eqm, shared with calmauthority.ai). */}
        <Script id="snitcher-radar" strategy="afterInteractive">
          {`!function(e){"use strict";var t=e&&e.namespace;if(t&&e.profileId&&e.cdn){var i=window[t];if(i&&Array.isArray(i)||(i=window[t]=[]),!i.initialized&&!i._loaded)if(i._loaded)console&&console.warn("[Radar] Duplicate initialization attempted");else{i._loaded=!0;["track","page","identify","company","group","alias","ready","debug","on","off","once","trackClick","trackSubmit","trackLink","trackForm","pageview","screen","reset","register","setAnonymousId","addSourceMiddleware","addIntegrationMiddleware","addDestinationMiddleware","giveCookieConsent","denyCookieConsent"].forEach((function(e){var a;i[e]=(a=e,function(){var e=window[t];if(e.initialized)return e[a].apply(e,arguments);var i=[].slice.call(arguments);return i.unshift(a),e.push(i),e})})),-1===e.apiEndpoint.indexOf("http")&&(e.apiEndpoint="https://"+e.apiEndpoint),i.bootstrap=function(){var t,i=document.createElement("script");i.async=!0,i.type="text/javascript",i.id="__radar__",i.setAttribute("data-settings",JSON.stringify(e)),i.src=[-1!==(t=e.cdn).indexOf("http")?"":"https://",t,"/releases/latest/radar.min.js"].join("");var a=document.scripts[0];a.parentNode.insertBefore(i,a)},i.bootstrap()}}else"undefined"!=typeof console&&console.error("[Radar] Configuration incomplete")}({"apiEndpoint":"radar.snitcher.com","cdn":"cdn.snitcher.com","namespace":"Snitcher","profileId":"sZAZUjq6QK"});`}
        </Script>
        <Script
          src="https://news.google.com/swg/js/v1/publisher.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-03SJE21NJ6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-03SJE21NJ6');
          `}
        </Script>
      </body>
    </html>
  );
}
