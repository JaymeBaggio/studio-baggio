import { siteUrl } from "@/lib/utils";

type Crumb = { name: string; path: string };

// BreadcrumbList JSON-LD in the server HTML. Names match the visible
// navigation, footer or on-page breadcrumb for each page.
export function BreadcrumbSchema({ items }: { items: Crumb[] }) {
  const trail = [{ name: "Studio Baggio", path: "/" }, ...items];
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.path === "/" ? siteUrl : `${siteUrl}${crumb.path}`
    }))
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
