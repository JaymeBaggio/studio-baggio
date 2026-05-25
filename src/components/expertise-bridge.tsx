"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { home } from "@/content/site";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const stepNarratives = [
  "Studio Baggio turns the expertise inside your business into visible public proof.",
  "That means showing up consistently where your prospects already are, giving them useful value before they are ready to buy.",
  "Then connect the dots between who is engaging, what they care about and how the business should follow up.",
  "That is how expertise becomes commercial advantage."
];

export function ExpertiseBridge() {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || !sectionRef.current) return;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const progressTween = progressRef.current
          ? gsap.fromTo(
              progressRef.current,
              { scaleX: 0.08 },
              {
                scaleX: 1,
                ease: "none",
                transformOrigin: "left center",
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: "top 72%",
                  end: "bottom 30%",
                  scrub: 0.45
                }
              }
            )
          : null;

        const trigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 72%",
          end: "bottom 30%",
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const next = Math.min(home.expertiseBridge.steps.length - 1, Math.round(self.progress * (home.expertiseBridge.steps.length - 1)));
            if (next !== activeRef.current) {
              activeRef.current = next;
              setActive(next);
            }
          }
        });

        return () => {
          trigger.kill();
          progressTween?.scrollTrigger?.kill();
          progressTween?.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  function chooseStep(index: number) {
    activeRef.current = index;
    setActive(index);
  }

  return (
    <section ref={sectionRef} className="expertise-bridge-section">
      <div className="editorial-container expertise-bridge-grid">
        <div className="expertise-bridge-heading">
          <p className="eyebrow">Expertise to proof</p>
          <h2 className="expertise-bridge-title" data-split>
            {home.expertiseBridge.title}
          </h2>
        </div>

        <div className="expertise-mechanism">
          <div className="expertise-live-panel" data-reveal>
            <div className="expertise-live-meta">
              <span>{String(active + 1).padStart(2, "0")}</span>
              <span>{home.expertiseBridge.steps[active]}</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -14, filter: "blur(5px)" }}
                transition={{ duration: 0.34, ease: "easeOut" }}
              >
                <p className="expertise-live-copy">{stepNarratives[active]}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="expertise-stepper" aria-label="Internal expertise to intelligent follow-up" data-reveal>
            <div className="expertise-progress-track" aria-hidden="true">
              <div ref={progressRef} className="expertise-progress-fill" />
            </div>
            {home.expertiseBridge.steps.map((step, index) => {
              const isActive = index === active;
              const isComplete = index < active;
              return (
                <motion.button
                  key={step}
                  type="button"
                  className={cn("focus-ring expertise-step-button", isActive && "is-active", isComplete && "is-complete")}
                  aria-pressed={isActive}
                  onClick={() => chooseStep(index)}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.985 }}
                  transition={{ type: "spring", stiffness: 420, damping: 30 }}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{step}</strong>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
