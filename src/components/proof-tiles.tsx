"use client";

import Link from "next/link";
import { workItems } from "@/content/work";

const homepageProofOrder = ["calm-authority", "business-tracker", "fire-source", "last30days"];
const homepageProofItems = homepageProofOrder
  .map((slug) => workItems.find((item) => item.slug === slug))
  .filter((item): item is (typeof workItems)[number] => Boolean(item));

export function ProofTiles() {
  return (
    <div className="proof-row-list">
      {homepageProofItems.map((item) => {
        const href = item.href ?? item.external ?? "/work";
        return (
          <div key={item.slug} className="proof-row" data-reveal>
            <Link href={href} className="focus-ring proof-row-link">
              <div className="proof-row-title">
                <h3>{item.title}</h3>
              </div>
              <div className="proof-row-copy">
                <p>{item.proofCopy ?? item.built}</p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
