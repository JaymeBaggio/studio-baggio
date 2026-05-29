import type { Metadata } from "next";
import { PageReveals } from "@/components/page-reveals";
import { ProductsPageShowcase } from "@/components/products-page-showcase";
import { metadata as siteMetadata } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ ...siteMetadata.work, path: "/work" });

export default function WorkPage() {
  return (
    <>
      <PageReveals />
      <ProductsPageShowcase />
    </>
  );
}
