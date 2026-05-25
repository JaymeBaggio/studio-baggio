"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { workItems } from "@/content/work";
import { cn } from "@/lib/utils";

export function ProofTiles() {
  return (
    <div className="proof-tiles-grid">
      {workItems.map((item, index) => {
        const href = item.href ?? item.external ?? "/work";
        return (
          <Link
            key={item.slug}
            href={href}
            className={cn("focus-ring proof-tile group", index < 2 ? "proof-tile-featured" : "")}
          >
            <motion.div
              className="flex h-full flex-col"
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: "spring", stiffness: 360, damping: 28 }}
            >
              <div className="flex items-start justify-between gap-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.08em] text-ink/48">{item.status ?? "Studio Baggio work"}</p>
                  <h3 className="mt-5 text-4xl leading-none md:text-5xl">{item.title}</h3>
                </div>
                <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
              </div>
              <p className="mt-8 text-2xl leading-tight text-ink md:text-3xl">{item.promise ?? item.eyebrow}</p>
              <p className="mt-7 max-w-2xl leading-relaxed text-ink/66">{item.proofCopy ?? item.built}</p>
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink/48">{item.proves}</p>
              <p className="mt-auto pt-10 text-xs uppercase tracking-[0.08em] text-ink/48">View work</p>
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
}
