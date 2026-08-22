import type { Metadata } from "next";
import { PageReveals } from "@/components/page-reveals";
import {
  researchDataUsageDate,
  researchDataUsagePath,
  researchDataUsageVersion
} from "@/lib/research-schema";
import { pageMetadata } from "@/lib/metadata";

const title = "Research data usage | Studio Baggio";
const description =
  "Terms for citing and reusing data published in Studio Baggio research reports.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: researchDataUsagePath
});

const usageItems = [
  {
    title: "Citation and attribution",
    body:
      "You may cite individual findings from a published Studio Baggio report. Credit Studio Baggio, name the report edition and link to the report page wherever a link can be included."
  },
  {
    title: "Reuse requiring permission",
    body:
      "The reports and datasets are not released under an open licence. Written permission is required to reproduce or redistribute a dataset or substantial extract, use the data to train or evaluate a model, include it in a commercial product, or sell, sublicense or republish it."
  },
  {
    title: "Requesting permission",
    body:
      "For reuse beyond a short attributed citation, email jayme@studiobaggio.ai with the report name, the material you want to use and where it will appear."
  },
  {
    title: "Dated research",
    body:
      "Each report is a dated snapshot produced under the method stated on its report page. AI answers and market conditions change over time. Cite the edition date and do not present the findings as a live or permanent ranking."
  },
  {
    title: "Rights reserved",
    body:
      "Copyright and database rights are owned by Studio Baggio Ltd unless a report states otherwise. All rights are reserved except for the limited citation permission above."
  }
] as const;

export default function ResearchDataUsagePage() {
  return (
    <>
      <PageReveals />
      <div className="home-4b studio-page">
        <section className="studio-page-hero">
          <div className="editorial-container studio-page-frame">
            <div>
              <p className="eyebrow" data-reveal data-motion="label">Research data</p>
              <h1 className="studio-page-title" data-split>
                Using Studio Baggio research data.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/60">
                These terms explain how Studio Baggio research may be cited and when permission
                is required.
              </p>
              <p
                id={`version-${researchDataUsageDate}`}
                className="mt-3 text-sm uppercase tracking-[0.08em] text-ink/45"
              >
                Version {researchDataUsageVersion} · {researchDataUsageDate}
              </p>
            </div>
          </div>
        </section>
        <section>
          <div className="editorial-container">
            <div className="studio-page-rows is-full">
              {usageItems.map((item, index) => (
                <article key={item.title} className="studio-page-row" data-reveal>
                  <span className="studio-page-row-number">0{index + 1}</span>
                  <h2 className="studio-page-row-title">{item.title}</h2>
                  <p className="studio-page-row-copy">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
