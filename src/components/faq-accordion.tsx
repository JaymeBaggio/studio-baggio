"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, X } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

const faqEase = [0.23, 1, 0.32, 1] as const;

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  const refreshScrollMeasurements = () => {
    window.requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const isOpen = activeIndex === index;
        const panelId = `faq-answer-${index}`;

        return (
          <div key={item.question} className={`faq-row ${isOpen ? "is-open" : ""}`} data-reveal>
            <button
              type="button"
              className="faq-question-button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setActiveIndex(isOpen ? null : index)}
            >
              <span>{item.question}</span>
              <span className="faq-toggle-icon" aria-hidden="true">
                {isOpen ? <X /> : <Plus />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  className="faq-answer-panel"
                  initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{
                    height: { duration: shouldReduceMotion ? 0 : 0.32, ease: faqEase },
                    opacity: { duration: shouldReduceMotion ? 0 : 0.18, ease: faqEase }
                  }}
                  onAnimationComplete={refreshScrollMeasurements}
                >
                  <p>{item.answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
