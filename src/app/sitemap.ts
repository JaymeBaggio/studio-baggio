import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/utils";

const routes = [
  "",
  "/ai-advantage",
  "/work",
  "/business-tracker",
  "/calm-authority",
  "/about",
  "/contact",
  "/privacy"
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date("2026-05-24"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.75
  }));
}
