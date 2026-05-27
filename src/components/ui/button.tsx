"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
};

export function ButtonLink({ href, children, className, external }: ButtonLinkProps) {
  const shouldReduceMotion = useReducedMotion();
  const content = (
    <motion.span
      whileTap={{ scale: shouldReduceMotion ? 1 : 0.985 }}
      transition={{ duration: 0.14, ease: [0.23, 1, 0.32, 1] }}
      className={cn(
        "focus-ring inline-flex min-h-11 items-center gap-2 border border-ink px-5 py-3 text-sm uppercase tracking-[0.06em] transition-colors hover:bg-ink hover:text-paper",
        className
      )}
    >
      {children}
      <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
    </motion.span>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="inline-flex">
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className="inline-flex">
      {content}
    </Link>
  );
}

export function SubmitButton({
  children,
  className,
  disabled
}: {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      type="submit"
      disabled={disabled}
      whileTap={{ scale: shouldReduceMotion || disabled ? 1 : 0.985 }}
      transition={{ duration: 0.14, ease: [0.23, 1, 0.32, 1] }}
      className={cn(
        "focus-ring inline-flex min-h-11 w-full items-center justify-center gap-2 border border-ink bg-ink px-5 py-3 text-sm uppercase tracking-[0.06em] text-paper transition-colors hover:bg-transparent hover:text-ink disabled:cursor-not-allowed disabled:opacity-55",
        className
      )}
    >
      {children}
    </motion.button>
  );
}
