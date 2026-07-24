"use client";

import { motion, useReducedMotion } from "framer-motion";

type ServicesIndexItem = {
  id: string;
  name: string;
};

export function ServicesOffersIndex({ items }: { items: ServicesIndexItem[] }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <nav aria-label="Services on this page" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, index) => (
        <motion.a
          key={item.id}
          href={`#${item.id}`}
          className="focus-ring group relative flex min-h-[104px] cursor-pointer flex-col justify-between overflow-hidden border border-ink/15 bg-white/60 px-5 pb-5 pt-4 transition-colors duration-300 hover:border-ink/40"
          whileHover={shouldReduceMotion ? undefined : { y: -5 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
          transition={{ type: "spring", stiffness: 420, damping: 30 }}
        >
          <span className="eyebrow">{String(index + 1).padStart(2, "0")}</span>
          <span className="mt-4 pr-4 text-sm font-bold leading-snug text-ink">{item.name}</span>
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-[color:var(--sb-accent-blue)] transition-transform duration-300 ease-out group-hover:scale-x-100"
          />
        </motion.a>
      ))}
    </nav>
  );
}
