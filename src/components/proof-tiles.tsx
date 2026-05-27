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
        const body = (
          <>
            <div className="proof-row-title">
              <h3>{item.title}</h3>
            </div>
            <div className="proof-row-copy">
              <p>{item.proofCopy ?? item.built}</p>
              {item.homepageLinks?.length ? (
                <p>
                  {item.homepageLinks.map((link, index) => (
                    <span key={link.href}>
                      {index > 0 ? " · " : ""}
                      <Link
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                      >
                        {link.label}
                      </Link>
                    </span>
                  ))}
                </p>
              ) : null}
            </div>
          </>
        );

        return (
          <div key={item.slug} className="proof-row" data-reveal>
            {item.homepageLinks?.length ? (
              <div className="proof-row-link">{body}</div>
            ) : (
              <Link href={href} className="focus-ring proof-row-link">
                {body}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
