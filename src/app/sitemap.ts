import type { MetadataRoute } from "next";
import { insightArticles, getInsightPath } from "@/content/insights";
import {
  getResearchEditionPath,
  getResearchMethodPath,
  researchEditions
} from "@/content/research";
import { siteUrl } from "@/lib/utils";

// One entry per static route. Bump lastModified whenever a page's copy changes,
// otherwise the sitemap tells Google nothing moved and the re-crawl signal is weaker.
const routes: Array<{
  path: string;
  lastModified: string;
  changeFrequency: "weekly" | "monthly";
  priority: number;
}> = [
  { path: "", lastModified: "2026-07-26", changeFrequency: "weekly", priority: 1 },
  { path: "/services", lastModified: "2026-07-26", changeFrequency: "monthly", priority: 0.85 },
  { path: "/work", lastModified: "2026-07-26", changeFrequency: "monthly", priority: 0.75 },
  { path: "/last30days", lastModified: "2026-07-26", changeFrequency: "monthly", priority: 0.85 },
  { path: "/about", lastModified: "2026-07-26", changeFrequency: "monthly", priority: 0.75 },
  { path: "/insights", lastModified: "2026-05-25", changeFrequency: "monthly", priority: 0.75 },
  { path: "/research", lastModified: "2026-07-30", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", lastModified: "2026-05-25", changeFrequency: "monthly", priority: 0.75 },
  { path: "/privacy", lastModified: "2026-05-25", changeFrequency: "monthly", priority: 0.75 }
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: new Date(route.lastModified),
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }));

  const insightRoutes = insightArticles.map((article) => ({
    url: `${siteUrl}${getInsightPath(article)}`,
    lastModified: new Date(article.updated),
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));

  const researchRoutes = researchEditions.flatMap((edition) => [
    {
      url: `${siteUrl}${getResearchEditionPath(edition)}`,
      lastModified: new Date(edition.preparedForReview),
      changeFrequency: "monthly" as const,
      priority: 0.8
    },
    {
      url: `${siteUrl}${getResearchMethodPath(edition)}`,
      lastModified: new Date(edition.preparedForReview),
      changeFrequency: "monthly" as const,
      priority: 0.65
    }
  ]);

  return [...staticRoutes, ...insightRoutes, ...researchRoutes];
}
