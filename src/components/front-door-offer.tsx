"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { frontDoorOffer } from "@/content/site";

const DISMISS_KEY = "sb-front-door";

function OfferBody({
  onClose,
  large
}: {
  onClose?: () => void;
  large?: boolean;
}) {
  return (
    <>
      <div className="h-[3px] w-full bg-[color:var(--sb-accent-blue)]" aria-hidden="true" />
      <div className={large ? "p-7" : "p-6"}>
        <div className="flex items-start justify-between gap-4">
          <h2 className={`leading-snug ${large ? "text-2xl" : "text-xl"}`}>
            {frontDoorOffer.title}
          </h2>
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              aria-label="Minimise"
              className="focus-ring -mr-1 mt-1 flex h-7 w-7 flex-none items-center justify-center text-ink/50 transition-colors hover:text-ink"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </button>
          ) : null}
        </div>
        <p className="mt-5 text-sm font-semibold text-ink">{frontDoorOffer.listTitle}</p>
        <ul className="mt-1">
          {frontDoorOffer.points.map((point) => (
            <li
              key={point}
              className="border-b border-ink/10 py-2.5 text-[15px] leading-snug text-ink/70 last:border-0"
            >
              {point}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col gap-3">
          <Link
            href={frontDoorOffer.cta.href}
            className="focus-ring inline-flex min-h-11 items-center justify-center bg-ink px-4 py-3 text-sm uppercase tracking-[0.06em] text-white transition-opacity hover:opacity-90"
          >
            {frontDoorOffer.cta.label}
          </Link>
          <Link
            href={frontDoorOffer.more.href}
            className="focus-ring self-start text-sm text-ink/60 underline decoration-ink/30 underline-offset-4 transition-colors hover:text-ink"
          >
            {frontDoorOffer.more.label}
          </Link>
        </div>
        <div className="mt-5 border-t border-ink/10 pt-4">
          <p className="text-[11px] uppercase tracking-[0.08em] text-ink/50">
            {frontDoorOffer.featured.label}
          </p>
          <div className="mt-2.5 flex flex-wrap items-center gap-x-5 gap-y-2">
            {frontDoorOffer.featured.logos.map((logo) => (
              <Image
                key={logo.name}
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={16}
                className="h-3.5 w-auto"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// Mobile: the offer is a static section on the homepage, right after the hero.
// No floating pill, nothing following the scroll on small screens.
export function FrontDoorOfferInline() {
  return (
    <section className="editorial-container pb-4 pt-10 lg:hidden">
      <aside
        className="relative border border-ink/15 bg-white shadow-[0_2px_6px_rgba(20,20,20,0.06),0_18px_44px_rgba(20,20,20,0.14)]"
        aria-label={frontDoorOffer.title}
      >
        <OfferBody />
      </aside>
    </section>
  );
}

export function FrontDoorOffer() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [pillDismissed, setPillDismissed] = useState(false);
  const [scrolledPast, setScrolledPast] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);

  useEffect(() => {
    setDismissed(window.sessionStorage.getItem(DISMISS_KEY) === "closed");
    setPillDismissed(window.sessionStorage.getItem(`${DISMISS_KEY}-pill`) === "closed");
    setScrolledPast(window.scrollY > 560);
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolledPast(window.scrollY > 560);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted || pathname === "/contact") return null;

  const dismiss = () => {
    setDismissed(true);
    window.sessionStorage.setItem(DISMISS_KEY, "closed");
  };

  const transition = prefersReducedMotion
    ? { duration: 0.15 }
    : { type: "spring" as const, stiffness: 320, damping: 30 };

  // The landing card: top-left in the hero white space, homepage only.
  // Positioned absolute so it leaves with the hero as you scroll.
  const heroCard = pathname === "/" && !dismissed;
  const dismissPill = () => {
    setPillDismissed(true);
    window.sessionStorage.setItem(`${DISMISS_KEY}-pill`, "closed");
  };

  const pillVisible =
    !cardOpen && !pillDismissed && (pathname !== "/" || dismissed || scrolledPast);

  return (
    <>
      {heroCard ? (
        <motion.aside
          initial={{
            opacity: 0,
            y: prefersReducedMotion ? 0 : 26,
            scale: prefersReducedMotion ? 1 : 0.97
          }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...transition, delay: 0.35 }}
          whileHover={prefersReducedMotion ? undefined : { y: -4 }}
          className="absolute top-[208px] z-30 hidden w-[400px] border border-ink/15 bg-white shadow-[0_2px_6px_rgba(20,20,20,0.06),0_26px_60px_rgba(20,20,20,0.18)] lg:block"
          style={{ left: "max(40px, calc((100vw - 1680px) / 2))" }}
          aria-label={frontDoorOffer.title}
        >
          <OfferBody large onClose={dismiss} />
        </motion.aside>
      ) : null}

      <div className="pointer-events-none fixed bottom-6 right-6 z-40 hidden justify-end lg:flex">
        <AnimatePresence mode="wait" initial={false}>
          {cardOpen ? (
            <motion.aside
              key="card"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : 12, scale: 0.98 }}
              transition={transition}
              className="pointer-events-auto relative w-full border border-ink/15 bg-white shadow-[0_2px_6px_rgba(20,20,20,0.06),0_22px_52px_rgba(20,20,20,0.16)] sm:w-[380px]"
              aria-label={frontDoorOffer.title}
            >
              <OfferBody onClose={() => setCardOpen(false)} />
            </motion.aside>
          ) : pillVisible ? (
            <motion.div
              key="pill"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
              transition={transition}
              className="group pointer-events-auto relative"
            >
              <button
                type="button"
                onClick={() => setCardOpen(true)}
                aria-expanded={false}
                className="focus-ring inline-flex items-center gap-3.5 border border-ink bg-white py-3.5 pl-5 pr-9 text-left text-ink shadow-[0_10px_28px_rgba(20,20,20,0.12)] transition-colors group-hover:bg-ink group-hover:text-white"
              >
                <span
                  className="h-1.5 w-1.5 flex-none rounded-full bg-[color:var(--sb-accent-blue)]"
                  aria-hidden="true"
                />
                <span className="flex flex-col gap-1">
                  <span className="text-[13px] uppercase leading-none tracking-[0.1em]">
                    {frontDoorOffer.pill}
                  </span>
                  <span className="text-[13px] leading-none text-ink/60 transition-colors group-hover:text-white/70">
                    {frontDoorOffer.pillHook}
                  </span>
                </span>
              </button>
              <button
                type="button"
                onClick={dismissPill}
                aria-label="Hide"
                className="focus-ring absolute right-1 top-1 flex h-5 w-5 items-center justify-center text-ink/30 transition-colors hover:text-ink group-hover:text-white/50 group-hover:hover:text-white"
              >
                <svg width="9" height="9" viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </>
  );
}
