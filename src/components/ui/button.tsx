"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
};

export function ButtonLink({ href, children, className, external }: ButtonLinkProps) {
  const content = (
    <motion.span
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
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
  return (
    <button
      type="submit"
      disabled={disabled}
      className={cn(
        "focus-ring inline-flex min-h-11 w-full items-center justify-center gap-2 border border-ink bg-ink px-5 py-3 text-sm uppercase tracking-[0.06em] text-paper transition-colors hover:bg-transparent hover:text-ink disabled:cursor-not-allowed disabled:opacity-55",
        className
      )}
    >
      {children}
    </button>
  );
}
