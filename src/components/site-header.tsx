"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { navItems, primaryCta } from "@/content/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-ink/10 bg-paper/88 backdrop-blur-xl">
      <a
        href="#main"
        className="focus-ring sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-paper focus:px-4 focus:py-3"
      >
        Skip to content
      </a>
      <div className="editorial-container flex min-h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="focus-ring text-sm uppercase tracking-[0.08em]"
          onClick={() => setOpen(false)}
        >
          Studio Baggio
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {navItems.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring text-xs uppercase tracking-[0.07em] text-ink/60 transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href={primaryCta.href}
          className="focus-ring hidden min-h-11 items-center border border-ink px-4 text-xs uppercase tracking-[0.07em] transition-colors hover:bg-ink hover:text-paper lg:inline-flex"
        >
          {primaryCta.label}
        </Link>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="focus-ring inline-flex h-11 w-11 items-center justify-center border border-ink/20 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <AnimatePresence>
        {open ? (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className={cn("border-t border-ink/10 bg-paper lg:hidden")}
            aria-label="Mobile navigation"
          >
            <div className="editorial-container py-6">
              <div className="grid gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="focus-ring border-b border-ink/10 py-4 text-3xl leading-none"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <Link
                href={primaryCta.href}
                onClick={() => setOpen(false)}
                className="focus-ring mt-6 inline-flex min-h-11 border border-ink px-4 py-3 text-sm uppercase tracking-[0.06em]"
              >
                {primaryCta.label}
              </Link>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
