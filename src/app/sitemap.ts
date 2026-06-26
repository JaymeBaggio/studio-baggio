import type { MetadataRoute } from "next";
import { insightArticles, getInsightPath } from "@/content/insights";
import { siteUrl } from "@/lib/utils";

const routes = [
  "",
  "/work",
  "/last30days",
  "/insights",
  "/about",
  "/contact",
  "/privacy"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(route === "/last30days" ? "2026-06-26" : "2026-05-25"),
    changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
    priority: route === "" ? 1 : route === "/last30days" ? 0.85 : 0.75
  }));

  const insightRoutes = insightArticles.map((article) => ({
    url: `${siteUrl}${getInsightPath(article)}`,
    lastModified: new Date(article.updated),
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));

  return [...staticRoutes, ...insightRoutes];
}
