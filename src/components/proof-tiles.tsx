"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { workItems } from "@/content/work";
import { cn } from "@/lib/utils";

export function ProofTiles() {
  const [active, setActive] = useState(0);
  const current = workItems[active];
  const currentHref = current.href ?? current.external ?? "/work";

  return (
    <>
      <div className="proof-panel-system hidden lg:grid">
        <div className="proof-rail">
          {workItems.map((item, index) => (
            <button
              key={item.slug}
              type="button"
              className={cn("focus-ring proof-rail-button", index === active ? "is-active" : "")}
              aria-current={index === active ? "true" : undefined}
              onClick={() => setActive(index)}
            >
              <span>0{index + 1}</span>
              <strong>{item.title}</strong>
              <em>{item.status ?? "Studio Baggio work"}</em>
            </button>
          ))}
        </div>

        <Link href={currentHref} className="focus-ring proof-active-panel group">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <div className="proof-panel-topline">
                <span>{current.status ?? "Studio Baggio work"}</span>
                <ArrowUpRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
              </div>
              <h3>{current.title}</h3>
              <p className="proof-panel-promise">{current.promise ?? current.eyebrow}</p>
              <p className="proof-panel-copy">{current.proofCopy ?? current.built}</p>
              <p className="proof-panel-proves">{current.proves}</p>
              <p className="proof-panel-cta">View work</p>
            </motion.div>
          </AnimatePresence>
        </Link>
      </div>

      <div className="proof-mobile-list lg:hidden">
        {workItems.map((item, index) => {
          const isOpen = active === index;
          const href = item.href ?? item.external ?? "/work";
          const contentId = `proof-item-${index}`;
          return (
            <div key={item.slug} className="proof-mobile-item">
              <button
                type="button"
                className="focus-ring proof-mobile-trigger"
                aria-expanded={isOpen}
                aria-controls={contentId}
                onClick={() => setActive(index)}
              >
                <span>{item.title}</span>
                <em>0{index + 1}</em>
              </button>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    id={contentId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="proof-mobile-content">
                      <p>{item.promise ?? item.eyebrow}</p>
                      <p>{item.proofCopy ?? item.built}</p>
                      <Link href={href} className="focus-ring proof-mobile-link">
                        View work
                      </Link>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </>
  );
}
