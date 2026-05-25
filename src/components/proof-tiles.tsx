"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { workItems } from "@/content/work";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ProofTiles() {
  const listRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || !listRef.current) return;

      const rows = gsap.utils.toArray<HTMLElement>(".proof-row");
      const tween = gsap.fromTo(
        rows,
        { y: 20, autoAlpha: 0.001 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.64,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 84%",
            once: true
          }
        }
      );

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: listRef }
  );

  return (
    <div ref={listRef} className="proof-row-list">
      {workItems.map((item) => {
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
                <p>
                  <strong>{item.promise ?? item.eyebrow}</strong> {item.proofCopy ?? item.built}
                </p>
              </div>
              <div className="proof-row-cta">
                <span>View work</span>
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
