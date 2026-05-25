"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { home } from "@/content/site";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ExpertiseBridge() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || !sectionRef.current) return;

      const cards = gsap.utils.toArray<HTMLElement>(".expertise-progress-card");
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 76%",
          once: true
        }
      });

      timeline.fromTo(
        ".expertise-copy-panel",
        { y: 24, autoAlpha: 0.001 },
        { y: 0, autoAlpha: 1, duration: 0.72, ease: "power3.out" }
      );

      timeline.fromTo(
        cards,
        { y: 22, autoAlpha: 0.001 },
        { y: 0, autoAlpha: 1, duration: 0.68, ease: "power3.out", stagger: 0.1 },
        "-=0.28"
      );

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="expertise-bridge-section">
      <div className="editorial-container expertise-bridge-frame">
        <div className="expertise-bridge-heading">
          <p className="eyebrow" data-reveal>
            {home.expertiseBridge.eyebrow}
          </p>
          <h2 className="expertise-bridge-title" data-split>
            {home.expertiseBridge.title}
          </h2>
        </div>

        <div className="expertise-copy-panel">
          {home.expertiseBridge.body.map((paragraph, index) => (
            <p key={paragraph} className={index === home.expertiseBridge.body.length - 1 ? "is-strong" : ""}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className="expertise-progress-grid" aria-label="Internal expertise to intelligent follow-up">
          {home.expertiseBridge.steps.map((step, index) => {
            const isFinal = index === home.expertiseBridge.steps.length - 1;
            return (
              <motion.div
                key={step}
                className={cn("expertise-progress-card", isFinal && "is-final")}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
