import Image from "next/image";
import Link from "next/link";
import { workItems } from "@/content/work";

const homepageProofOrder = ["calm-authority", "business-tracker", "fire-source", "last30days"];
const homepageProofItems = homepageProofOrder
  .map((slug) => workItems.find((item) => item.slug === slug))
  .filter((item): item is (typeof workItems)[number] => Boolean(item));
const productImageSizes = "(min-width: 1100px) 300px, (min-width: 768px) 46vw, 82vw";

// Four product cards in one row on desktop, two on tablet, a swipe row on phones.
export function ProofTiles() {
  return (
    <ul className="product-card-grid" aria-label="Products">
      {homepageProofItems.map((item) => {
        const promise = item.promise ?? item.proofCopy ?? item.eyebrow;
        const bodyParagraphs = item.homeBody ?? [item.proofCopy].filter((paragraph): paragraph is string => Boolean(paragraph));

        return (
          <li key={item.slug} className="product-card-slot" data-reveal>
            <article className="product-card">
              {item.homepageImage ? (
                <div className="product-card-media">
                  <Image src={item.homepageImage} alt="" fill sizes={productImageSizes} />
                </div>
              ) : null}
              <div className="product-card-body">
                <h3 className="product-card-title">{item.title}</h3>
                {promise ? <p className="product-card-promise">{promise}</p> : null}
                <div className="product-card-copy">
                  {bodyParagraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {item.homepageLinks?.length ? (
                  <div className="product-card-links" aria-label={`${item.title} links`}>
                    {item.homepageLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
