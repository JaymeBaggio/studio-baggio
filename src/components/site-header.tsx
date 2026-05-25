"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { navItems, primaryCta } from "@/content/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [overDarkSection, setOverDarkSection] = React.useState(false);
  const pathname = usePathname();
  const darkHeader = pathname === "/" && overDarkSection && !open;
  const homeTop = pathname === "/" && !scrolled && !open && !darkHeader;

  React.useEffect(() => {
    let frame = 0;

    const updateHeaderState = () => {
      setScrolled(window.scrollY > 16);

      if (pathname !== "/") {
        setOverDarkSection(false);
        return;
      }

      const sampleY = 66;
      const darkSections = Array.from(document.querySelectorAll<HTMLElement>("[data-header-theme='dark']"));
      setOverDarkSection(
        darkSections.some((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= sampleY && rect.bottom > sampleY;
        })
      );
    };

    const requestUpdate = () => {
      cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateHeaderState);
    };

    updateHeaderState();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("hashchange", requestUpdate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("hashchange", requestUpdate);
    };
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 border-b transition-colors duration-300",
        darkHeader
          ? "border-paper/15 bg-ink/[0.92] text-paper backdrop-blur-xl"
          : homeTop
            ? "border-transparent bg-transparent"
            : "border-ink/10 bg-paper/[0.92] text-ink backdrop-blur-xl"
      )}
    >
      <a
        href="#main"
        className="focus-ring sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-paper focus:px-4 focus:py-3"
      >
        Skip to content
      </a>
      <div className="editorial-container flex min-h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className={cn(
            "focus-ring text-sm uppercase tracking-[0.08em] transition-colors duration-300",
            darkHeader ? "text-paper/[0.88] hover:text-paper" : homeTop ? "text-ink/70 hover:text-ink" : "text-ink"
          )}
          onClick={() => setOpen(false)}
        >
          Studio Baggio
        </Link>
        <nav
          className={cn(
            "hidden items-center gap-7 transition-colors duration-300 lg:flex",
            darkHeader ? "text-paper/[0.64]" : homeTop ? "text-ink/[0.58]" : "text-ink/60"
          )}
          aria-label="Primary navigation"
        >
          {navItems.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "focus-ring text-xs uppercase tracking-[0.07em] text-current transition-colors",
                darkHeader ? "hover:text-paper" : "hover:text-ink"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href={primaryCta.href}
          className={cn(
            "focus-ring hidden min-h-11 items-center border px-4 text-xs uppercase tracking-[0.07em] transition-colors lg:inline-flex",
            darkHeader
              ? "border-paper/75 text-paper hover:bg-paper hover:text-ink"
              : homeTop
                ? "border-ink bg-white/[0.45] text-ink/[0.72] hover:bg-ink hover:text-paper"
                : "border-ink text-ink hover:bg-ink hover:text-paper"
          )}
        >
          {primaryCta.label}
        </Link>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className={cn(
            "focus-ring inline-flex h-11 w-11 items-center justify-center border transition-colors duration-300 lg:hidden",
            darkHeader
              ? "border-paper/25 text-paper"
              : homeTop
                ? "border-ink/20 bg-white/[0.45] text-ink/[0.72]"
                : "border-ink/20 text-ink"
          )}
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
