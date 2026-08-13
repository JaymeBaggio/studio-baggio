import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import localFont from "next/font/local";
import Script from "next/script";
import { Toaster } from "@/components/ui/toaster";
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
        <Analytics />
        <Toaster />
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
