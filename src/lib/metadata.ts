import type { Metadata } from "next";
import { siteUrl } from "@/lib/utils";

const shareImageAlt = "Studio Baggio. AI-enabled growth systems for trust-based businesses.";

// The wordmark sits inside the centre square of every shape, because Google's
// result cards crop a square from the middle of whichever image they pick.
export const defaultOpenGraphImage = {
  url: "/assets/og/studio-baggio-og-v7.png",
  width: 1200,
  height: 675,
  type: "image/png",
  alt: shareImageAlt
};

export const shareImages = [
  defaultOpenGraphImage,
  { url: "/assets/og/studio-baggio-og-v7-4x3.png", width: 1200, height: 900, type: "image/png", alt: shareImageAlt },
  { url: "/assets/og/studio-baggio-og-v7-1x1.png", width: 1200, height: 1200, type: "image/png", alt: shareImageAlt }
];

// Absolute URLs for structured data, in Google's recommended 16:9, 4:3, 1:1 set.
export const shareImageUrls = shareImages.map((image) => `${siteUrl}${image.url}`);

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
      images: shareImages
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultTwitterImage]
    }
  };
}
