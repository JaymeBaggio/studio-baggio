import type { Metadata } from "next";
import {
  ProductDetailPanel,
  type ProductWorkItem
} from "@/components/products-page-showcase";
import { metadata as siteMetadata } from "@/content/site";
import { workItems } from "@/content/work";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ ...siteMetadata.last30days, path: "/last30days" });

const last30daysItem = workItems.find((item) => item.slug === "last30days" && item.productPage) as
  | ProductWorkItem
  | undefined;

export default function Last30DaysPage() {
  if (!last30daysItem) {
    return null;
  }

  return (
    <div className="home-4b studio-page products-page products-detail-page">
      <ProductDetailPanel
        item={last30daysItem}
        panelId="last30days-product"
        currentPath="/last30days"
      />
    </div>
  );
}
