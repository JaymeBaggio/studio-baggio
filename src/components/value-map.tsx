"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { valueAreas } from "@/content/site";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ValueMap() {
  const [active, setActive] = useState(0);
  const [openMobile, setOpenMobile] = useState(0);
  const activeRef = useRef(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const current = valueAreas[active];

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || !sectionRef.current) return;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const trigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * 0.56 * (valueAreas.length - 1))}`,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const next = Math.min(valueAreas.length - 1, Math.round(self.progress * (valueAreas.length - 1)));
            if (next !== activeRef.current) {
              activeRef.current = next;
              setActive(next);
            }
          }
        });

        return () => trigger.kill();
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  function chooseArea(index: number) {
    activeRef.current = index;
    setActive(index);
    setOpenMobile(index);
  }

  return (
    <section ref={sectionRef} className="value-map-section bg-charcoal text-paper">
      <div className="editorial-container value-map-grid">
        <div>
          <p className="eyebrow text-paper/55">Where AI creates value</p>
          <h2 className="value-map-title mt-5 max-w-5xl" data-split>
            Most businesses know AI matters. Few know where to put it. Fewer still have embedded it into the work that creates revenue, visibility, insight or competitive advantage. Studio Baggio helps close that gap.
          </h2>
        </div>

        <div className="hidden gap-8 lg:grid lg:grid-cols-[0.82fr_1.18fr]">
          <div className="value-map-rail">
            {valueAreas.map((area, index) => (
              <button
                key={area.title}
                type="button"
                onClick={() => chooseArea(index)}
                className={cn(
                  "focus-ring value-map-trigger",
                  index === active ? "text-paper" : "text-paper/42 hover:text-paper"
                )}
                aria-current={index === active ? "true" : undefined}
              >
                <span>{area.title}</span>
                <span className="text-xs">0{index + 1}</span>
              </button>
            ))}
          </div>
          <div className="value-map-panel">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.title}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.32, ease: "easeOut" }}
              >
                <p className="text-sm uppercase tracking-[0.07em] text-paper/55">0{active + 1}</p>
                <h3 className="mt-10 text-5xl leading-none xl:text-7xl">{current.title}</h3>
                <p className="mt-10 text-2xl leading-tight text-paper/86 xl:text-4xl">{current.summary}</p>
                <p className="mt-10 max-w-2xl text-lg leading-relaxed text-paper/62">{current.detail}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="value-map-mobile lg:hidden">
          {valueAreas.map((area, index) => {
            const isOpen = openMobile === index;
            const contentId = `value-area-${index}`;
            return (
              <div key={area.title} className="border-b border-paper/16">
                <button
                  type="button"
                  className="focus-ring flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left"
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => chooseArea(index)}
                >
                  <span className={cn("text-2xl leading-tight", isOpen ? "text-paper" : "text-paper/58")}>
                    {area.title}
                  </span>
                  <span className="text-xs uppercase tracking-[0.08em] text-paper/48">0{index + 1}</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={contentId}
                      key={contentId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-7">
                        <p className="text-xl leading-snug text-paper/84">{area.summary}</p>
                        <p className="mt-5 leading-relaxed text-paper/62">{area.detail}</p>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
