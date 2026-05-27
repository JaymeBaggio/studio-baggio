"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { workItems } from "@/content/work";

const homepageProofOrder = ["calm-authority", "business-tracker", "fire-source", "last30days"];
const homepageProofItems = homepageProofOrder
  .map((slug) => workItems.find((item) => item.slug === slug))
  .filter((item): item is (typeof workItems)[number] => Boolean(item));
const accordionEase = [0.23, 1, 0.32, 1] as const;
const proofImageSizes = "(min-width: 1024px) 360px, 100vw";

export function ProofTiles() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [readyImages, setReadyImages] = useState<Record<string, boolean>>({});
  const shouldReduceMotion = useReducedMotion();
  const refreshScrollMeasurements = () => {
    window.requestAnimationFrame(() => ScrollTrigger.refresh());
  };
  const markImageReady = (slug: string) => {
    setReadyImages((current) => (current[slug] ? current : { ...current, [slug]: true }));
  };

  return (
    <div className="proof-row-list">
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          width: 1,
          height: 1,
          overflow: "hidden",
          opacity: 0,
          pointerEvents: "none"
        }}
      >
        {homepageProofItems.map((item) =>
          item.homepageImage ? (
            <Image
              key={`preload-${item.slug}`}
              src={item.homepageImage}
              alt=""
              width={720}
              height={405}
              sizes={proofImageSizes}
              loading="eager"
              onLoad={() => markImageReady(item.slug)}
              onError={() => markImageReady(item.slug)}
            />
          ) : null
        )}
      </div>
      {homepageProofItems.map((item, index) => {
        const isOpen = activeIndex === index;
        const summary = item.promise ?? item.proofCopy ?? item.eyebrow;
        const homepageImage = item.homepageImage;
        const imageIsReady = readyImages[item.slug] ?? false;
        const bodyParagraphs = [item.proofCopy, item.built, item.whyItMatters].filter(
          (paragraph): paragraph is string => Boolean(paragraph)
        );

        return (
          <div key={item.slug} className={`proof-row ${isOpen ? "is-open" : ""}`} data-reveal>
            <button
              type="button"
              className="proof-row-button"
              aria-expanded={isOpen}
              aria-controls={`proof-row-panel-${item.slug}`}
              onClick={() => setActiveIndex(isOpen ? null : index)}
            >
              <span className="proof-row-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="proof-row-title">
                <span>{item.title}</span>
                <span>{summary}</span>
              </span>
              <ChevronDown className="proof-row-chevron" aria-hidden="true" />
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={`proof-row-panel-${item.slug}`}
                  className="proof-row-panel"
                  aria-hidden={false}
                  initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{
                    height: { duration: shouldReduceMotion ? 0 : 0.36, ease: accordionEase },
                    opacity: { duration: shouldReduceMotion ? 0 : 0.2, ease: accordionEase }
                  }}
                  onAnimationComplete={refreshScrollMeasurements}
                >
                  <div className={`proof-row-panel-inner ${homepageImage ? "has-media" : ""}`}>
                    <div className="proof-row-copy">
                      {bodyParagraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                      {item.homepageLinks?.length ? (
                        <div className="proof-row-actions" aria-label={`${item.title} links`}>
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
                    {homepageImage ? (
                      <div className="proof-row-media" aria-hidden="true">
                        <div className={`proof-row-media-frame ${imageIsReady ? "is-ready" : "is-loading"}`}>
                          <div className="proof-row-media-image">
                            <Image
                              src={homepageImage}
                              alt=""
                              fill
                              sizes={proofImageSizes}
                              onLoad={() => markImageReady(item.slug)}
                              onError={() => markImageReady(item.slug)}
                            />
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
