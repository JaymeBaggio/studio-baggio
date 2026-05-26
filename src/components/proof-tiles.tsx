"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { workItems } from "@/content/work";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const homepageProofOrder = ["calm-authority", "business-tracker", "fire-source", "last30days"];
const homepageProofItems = homepageProofOrder
  .map((slug) => workItems.find((item) => item.slug === slug))
  .filter((item): item is (typeof workItems)[number] => Boolean(item));

export function ProofTiles() {
  const listRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || !listRef.current) return;

      const rows = gsap.utils.toArray<HTMLElement>(".proof-row");
      gsap.set(rows, { y: 20, autoAlpha: 0.001 });

      const tween = gsap.timeline({
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 80%",
          end: "center 48%",
          scrub: 0.8,
          invalidateOnRefresh: true
        }
      }).to(rows, {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: listRef }
  );

  return (
    <div ref={listRef} className="proof-row-list">
      {homepageProofItems.map((item) => {
        const href = item.href ?? item.external ?? "/work";
        return (
          <motion.div
            key={item.slug}
            className="proof-row"
            whileHover={{ x: 6 }}
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
          >
            <Link href={href} className="focus-ring proof-row-link">
              <div className="proof-row-title">
                <h3>{item.title}</h3>
              </div>
              <div className="proof-row-copy">
                <p>{item.proofCopy ?? item.built}</p>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
