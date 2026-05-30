import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import Script from "next/script";
import { Toaster } from "@/components/ui/toaster";
import { ScrollReset } from "@/components/scroll-reset";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { metadata as siteMetadata } from "@/content/site";
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
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Studio Baggio",
    title: siteMetadata.home.title,
    description: siteMetadata.home.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.home.title,
    description: siteMetadata.home.description,
    images: ["/opengraph-image"]
  }
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Studio Baggio Ltd",
  url: siteUrl,
  email: "jayme@studiobaggio.ai",
  founder: {
    "@type": "Person",
    name: "Jayme Baggio"
  },
  sameAs: ["https://www.calmauthority.ai/", "https://last30days.app", "https://fire-source.vercel.app"]
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
        <Toaster />
      </body>
    </html>
  );
}
