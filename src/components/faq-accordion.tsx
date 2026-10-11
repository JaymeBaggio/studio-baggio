"use client";

import { useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, X } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

// Every answer is in the HTML from the first byte, closed or open, so search
// and AI crawlers (which run no JavaScript) read the same answers the FAQ
// schema declares. Questions are real H3 headings. Opening animates the row
// height with CSS rather than mounting the answer.
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const refreshScrollMeasurements = () => {
    window.requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  const half = Math.ceil(items.length / 2);
  const columns = [items.slice(0, half), items.slice(half)];

  return (
    <div className="faq-columns">
      {columns.map((columnItems, columnIndex) => (
        <div className="faq-list" key={columnIndex}>
          {columnItems.map((item, itemIndex) => {
            const index = columnIndex * half + itemIndex;
            const isOpen = activeIndex === index;
            const panelId = `faq-answer-${index}`;
            const buttonId = `faq-question-${index}`;

            return (
              <div key={item.question} className={`faq-row ${isOpen ? "is-open" : ""}`} data-reveal>
                <h3 className="faq-question-heading">
                  <button
                    type="button"
                    id={buttonId}
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
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="faq-answer-wrap"
                  aria-hidden={!isOpen}
                  inert={!isOpen}
                  onTransitionEnd={(event) => {
                    if (event.propertyName === "grid-template-rows") refreshScrollMeasurements();
                  }}
                >
                  <div className="faq-answer-panel">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
