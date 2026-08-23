import type { Metadata } from "next";
import { siteUrl } from "@/lib/utils";

export const defaultOpenGraphImage = {
  url: "/assets/og/studio-baggio-og-v4.png",
  width: 1200,
  height: 675,
  type: "image/png",
  alt: "Studio Baggio SEO & AI Search Audit - know where you appear, who appears instead and what to implement first."
};

export const defaultTwitterImage = defaultOpenGraphImage.url;

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function pageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${siteUrl}${canonicalPath}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath
    },
    openGraph: {
      type: "website",
      siteName: "Studio Baggio",
      url,
      title,
      description,
      images: [defaultOpenGraphImage]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultTwitterImage]
    }
  };
}
