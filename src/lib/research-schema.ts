import { siteUrl } from "@/lib/utils";

export const researchDataUsagePath = "/research/data-usage";
export const researchDataUsageVersion = "1.0";
export const researchDataUsageDate = "2026-08-22";
export const researchDataUsageUrl =
  `${siteUrl}${researchDataUsagePath}#version-${researchDataUsageDate}`;

export function researchDataLicense() {
  return {
    "@type": "CreativeWork",
    name: `Studio Baggio Research Data Usage Terms v${researchDataUsageVersion}`,
    url: researchDataUsageUrl,
    version: researchDataUsageVersion,
    dateModified: researchDataUsageDate
  };
}
