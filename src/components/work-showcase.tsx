"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { workItems } from "@/content/work";
import { cn } from "@/lib/utils";

export function WorkShowcase({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState(0);
  const current = workItems[active];

  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="border-t border-ink/15">
        {workItems.map((item, index) => (
          <button
            key={item.slug}
            type="button"
            onClick={() => setActive(index)}
            className={cn(
              "focus-ring group grid w-full gap-4 border-b border-ink/12 py-6 text-left transition-colors md:grid-cols-[72px_1fr]",
              index === active ? "text-ink" : "text-ink/42 hover:text-ink"
            )}
          >
            <span className="text-xs uppercase tracking-[0.08em]">0{index + 1}</span>
            <span>
              <span className="block text-3xl leading-none md:text-5xl">{item.title}</span>
              <span className="mt-3 block text-sm uppercase tracking-[0.06em] text-current/70">
                {item.eyebrow}
              </span>
            </span>
          </button>
        ))}
      </div>
      <div className="h-fit border border-ink/12 bg-paper p-5 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.slug}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.28 }}
          >
            <div className="aspect-[16/10] overflow-hidden border border-ink/10 bg-ink text-paper">
              {current.image ? (
                <Image
                  src={current.image}
                  alt={`${current.title} product screenshot`}
                  width={1400}
                  height={875}
                  className="h-full w-full object-cover"
                  priority={active === 0}
                  sizes="(min-width: 1024px) 44vw, 100vw"
                />
              ) : (
                <div className="flex h-full flex-col justify-between p-6">
                  <p className="text-xs uppercase tracking-[0.07em] text-paper/50">
                    Studio Baggio system
                  </p>
                  <p className="display-lg max-w-xl text-paper">{current.title}</p>
                </div>
              )}
            </div>
            <div className={cn("mt-8 grid gap-5", compact ? "" : "md:grid-cols-2")}>
              <ProofBlock label="Commercial problem" text={current.problem} />
              <ProofBlock label="System built" text={current.built} />
              <ProofBlock label="Why it matters" text={current.whyItMatters} />
              <ProofBlock label="What it proves" text={current.proves} />
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {current.href ? <WorkLink href={current.href}>Read more</WorkLink> : null}
              {current.external ? (
                <WorkLink href={current.external} external>
                  Open live site
                </WorkLink>
              ) : null}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ProofBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="border-t border-ink/12 pt-4">
      <p className="text-xs uppercase tracking-[0.07em] text-ink/45">{label}</p>
      <p className="mt-3 leading-relaxed text-ink/72">{text}</p>
    </div>
  );
}

function WorkLink({
  href,
  children,
  external
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const className =
    "focus-ring inline-flex min-h-11 items-center gap-2 border border-ink px-4 py-3 text-sm uppercase tracking-[0.06em] transition-colors hover:bg-ink hover:text-paper";
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}
