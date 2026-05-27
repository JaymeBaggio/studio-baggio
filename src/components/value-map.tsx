"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { home, valueAreas } from "@/content/site";

const accordionEase = [0.23, 1, 0.32, 1] as const;

export function ValueMap() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();
  const refreshScrollMeasurements = () => {
    window.requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  return (
    <section
      className="home-section value-map-section"
      data-home-section
      data-motion-section="value"
    >
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
            <div
              key={area.title}
              className={`value-map-row ${activeIndex === index ? "is-open" : ""}`}
            >
              <button
                type="button"
                className="value-map-row-button"
                data-reveal
                aria-expanded={activeIndex === index}
                aria-controls={`value-area-${index}`}
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                <span className="value-map-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="value-map-row-copy">
                  <span className="value-map-heading">{area.title}</span>
                  <span className="value-map-summary">{area.summary}</span>
                </span>
                <ChevronDown className="value-map-chevron" aria-hidden="true" />
              </button>
              <AnimatePresence initial={false}>
                {activeIndex === index ? (
	                  <motion.div
	                    id={`value-area-${index}`}
	                    className="value-map-detail"
	                    aria-hidden={false}
	                    initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
	                    animate={{ height: "auto", opacity: 1 }}
	                    exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
	                    transition={{
	                      height: { duration: shouldReduceMotion ? 0 : 0.34, ease: accordionEase },
	                      opacity: { duration: shouldReduceMotion ? 0 : 0.18, ease: accordionEase }
	                    }}
	                    onAnimationComplete={refreshScrollMeasurements}
	                  >
	                    <div className="value-map-detail-inner">
                        <div className="value-map-detail-copy">
                          <p className="value-map-intro">{area.intro}</p>
                          <p className="value-map-detail-label">This includes</p>
                          <ul className="value-map-includes">
                            {area.includes.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                          <div className="value-map-goal">
                            <p className="value-map-detail-label">Goal</p>
                            <p>{area.goal}</p>
                          </div>
                        </div>
	                    </div>
	                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
