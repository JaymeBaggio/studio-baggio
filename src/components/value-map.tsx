"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { home, valueAreas } from "@/content/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ValueMap() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || !sectionRef.current) return;

      const rows = gsap.utils.toArray<HTMLElement>(".value-map-row");
      gsap.set(rows, { "--row-progress": 0, y: 22, autoAlpha: 0.001 });

      const reveal = gsap.timeline({
        scrollTrigger: {
          trigger: ".value-map-rows",
          start: "top 80%",
          end: "top 36%",
          scrub: 0.85,
          invalidateOnRefresh: true
        }
      }).to(rows, {
        y: 0,
        autoAlpha: 1,
        "--row-progress": 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1
      });

      const activeTriggers = rows.map((row) =>
        ScrollTrigger.create({
          trigger: row,
          start: "top 62%",
          end: "bottom 42%",
          toggleClass: { targets: row, className: "is-active" }
        })
      );

      return () => {
        reveal.scrollTrigger?.kill();
        reveal.kill();
        activeTriggers.forEach((trigger) => trigger.kill());
      };
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="value-map-section" data-header-theme="dark">
      <div className="editorial-container value-map-frame">
        <p className="eyebrow value-map-eyebrow" data-reveal>
          {home.value.eyebrow}
        </p>
        {home.value.title ? (
          <h2 className="value-map-title" data-split>
            {home.value.title}
          </h2>
        ) : null}

        <div className="value-map-rows">
          {valueAreas.map((area, index) => (
            <motion.div
              key={area.title}
              className={`value-map-row ${activeIndex === index ? "is-open" : ""}`}
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.035)" }}
              transition={{ type: "spring", stiffness: 420, damping: 34 }}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <button
                type="button"
                className="value-map-row-button"
                aria-expanded={activeIndex === index}
                aria-controls={`value-area-${index}`}
                onClick={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
              >
                <span className="value-map-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="value-map-heading">{area.title}</span>
                <span className="value-map-summary">{area.summary}</span>
                <span className="value-map-indicator" aria-hidden="true">
                  {activeIndex === index ? "-" : "+"}
                </span>
              </button>
              <motion.div
                id={`value-area-${index}`}
                className="value-map-detail"
                initial={false}
                animate={{
                  height: activeIndex === index ? "auto" : 0,
                  opacity: activeIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                aria-hidden={activeIndex !== index}
              >
                <div className="value-map-detail-inner">
                  <p>{area.detail}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
