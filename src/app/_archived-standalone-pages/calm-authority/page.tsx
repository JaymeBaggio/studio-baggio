import type { Metadata } from "next";
import {
  ProductDetailPanel,
  type ProductWorkItem
} from "@/components/products-page-showcase";
import { metadata as siteMetadata } from "@/content/site";
import { workItems } from "@/content/work";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ ...siteMetadata.calmAuthority, path: "/calm-authority" });

const calmAuthorityItem = workItems.find((item) => item.slug === "calm-authority" && item.productPage) as
  | ProductWorkItem
  | undefined;

export default function CalmAuthorityPage() {
  if (!calmAuthorityItem) {
    return null;
  }

  return (
    <div className="home-4b studio-page products-page products-detail-page">
      <ProductDetailPanel
        item={calmAuthorityItem}
        panelId="calm-authority-product"
        currentPath="/calm-authority"
      />
    </div>
  );
}
