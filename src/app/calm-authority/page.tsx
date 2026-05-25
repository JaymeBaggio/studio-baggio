import type { Metadata } from "next";
import { CalmAuthorityProductPage } from "@/components/calm-authority-product-page";
import { metadata as siteMetadata } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ ...siteMetadata.calmAuthority, path: "/calm-authority" });

export default function CalmAuthorityPage() {
  return <CalmAuthorityProductPage />;
}
