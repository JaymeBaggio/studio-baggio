"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function OpeningOutcomeStack({
  lead,
  final,
  label,
  controlled = false
}: {
  lead: string[];
  final?: string;
  label: string;
  controlled?: boolean;
}) {
  const stackRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (controlled || reduce || !stackRef.current) return;

      const supporting = Array.from(stackRef.current.querySelectorAll<HTMLElement>("[data-outcome-support]"));
      const emphasis = stackRef.current.querySelector<HTMLElement>("[data-outcome-emphasis]");

      gsap.set(supporting, { y: 18, autoAlpha: 0.001 });
      if (emphasis) gsap.set(emphasis, { y: 16, autoAlpha: 0.001 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: stackRef.current,
          start: "top 38%",
          end: "top 14%",
          scrub: 0.75,
          invalidateOnRefresh: true
        }
      });

      timeline.to(supporting, {
        y: 0,
        autoAlpha: 1,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.18
      });

      if (emphasis) {
        timeline.to(
          emphasis,
          {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            ease: "power3.out"
          },
          ">-0.08"
        );
      }

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    },
    { scope: stackRef, dependencies: [controlled] }
  );

  const initialSupportingStyle =
    reduceMotion || controlled ? undefined : { opacity: 0, transform: "translateY(18px)" };
  const initialEmphasisStyle =
    reduceMotion || controlled ? undefined : { opacity: 0, transform: "translateY(16px)" };

  return (
    <div ref={stackRef} className="opening-outcome-stack" aria-label={label}>
      <div className="opening-outcome-muted-group">
        {lead.map((line) => (
          <motion.p
            key={line}
            data-outcome-support="true"
            style={initialSupportingStyle}
            whileHover={{ color: "#111111" }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            {line}
          </motion.p>
        ))}
      </div>
      {final ? (
        <motion.p
          className="is-strong"
          data-outcome-emphasis="true"
          style={initialEmphasisStyle}
          whileHover={{ x: 2 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          {final}
        </motion.p>
      ) : null}
    </div>
  );
}
