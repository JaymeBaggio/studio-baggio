"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { valueAreas } from "@/content/site";
import { cn } from "@/lib/utils";

export function ValueMap() {
  const [active, setActive] = useState(0);
  const current = valueAreas[active];

  return (
    <section className="section-pad bg-charcoal text-paper">
      <div className="editorial-container grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="eyebrow text-paper/55">Where AI creates value</p>
          <h2 className="display-lg mt-5 max-w-5xl" data-split>
            AI should make your business easier to find, faster to act and harder to compete with.
          </h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="border-t border-paper/20">
            {valueAreas.map((area, index) => (
              <button
                key={area.title}
                type="button"
                onClick={() => setActive(index)}
                className={cn(
                  "focus-ring flex min-h-16 w-full items-center justify-between border-b border-paper/15 py-4 text-left text-lg transition-colors",
                  index === active ? "text-paper" : "text-paper/45 hover:text-paper"
                )}
              >
                <span>{area.title}</span>
                <span className="text-xs">0{index + 1}</span>
              </button>
            ))}
          </div>
          <div className="min-h-[320px] border border-paper/18 p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.title}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.28 }}
              >
                <p className="text-sm uppercase tracking-[0.07em] text-acid">0{active + 1}</p>
                <h3 className="mt-8 text-4xl leading-tight md:text-5xl">{current.title}</h3>
                <p className="body-large mt-8 text-paper/78">{current.summary}</p>
                <p className="mt-8 leading-relaxed text-paper/58">{current.detail}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
