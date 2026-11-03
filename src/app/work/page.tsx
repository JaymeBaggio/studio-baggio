import type { Metadata } from "next";
import { PageReveals } from "@/components/page-reveals";
import { ProductsPageShowcase } from "@/components/products-page-showcase";
import { metadata as siteMetadata } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

export const metadata: Metadata = pageMetadata({ ...siteMetadata.work, path: "/work" });

export default function WorkPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Products", path: "/work" }]} />
      <PageReveals />
      <ProductsPageShowcase />
    </>
  );
}
