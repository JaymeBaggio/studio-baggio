"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { home, valueAreas } from "@/content/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ValueMap() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || !sectionRef.current) return;

      const rows = gsap.utils.toArray<HTMLElement>(".value-map-row");
      const tween = gsap.fromTo(
        rows,
        { y: 24, autoAlpha: 0.001 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.72,
          ease: "power3.out",
          stagger: 0.09,
          scrollTrigger: {
            trigger: ".value-map-rows",
            start: "top 82%",
            once: true
          }
        }
      );

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="value-map-section">
      <div className="editorial-container value-map-frame">
        <p className="eyebrow value-map-eyebrow" data-reveal>
          {home.value.eyebrow}
        </p>
        <h2 className="value-map-title" data-split>
          {home.value.title}
        </h2>

        <div className="value-map-rows">
          {valueAreas.map((area, index) => (
            <motion.div
              key={area.title}
              className="value-map-row"
              whileHover={{ x: 6 }}
              transition={{ type: "spring", stiffness: 420, damping: 34 }}
            >
              <h3>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {area.title}
              </h3>
              <p>
                <span>{area.summary}</span> <span>{area.detail}</span>
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
