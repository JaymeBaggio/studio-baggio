"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { aiStrategyFeaturedEvents, frontDoorOffer, servicesPage } from "@/content/site";
import { EventLogoChip, type EventLogo } from "@/components/event-logo-chip";

type OfferLogo = { name: string; src: string; width: number };
type HeroOffer = {
  title: string;
  listTitle: string;
  points: readonly string[];
  cta: { label: string; href: string };
  more: { label: string; href: string };
  featured: { label: string; logos?: readonly OfferLogo[]; events?: readonly EventLogo[] };
  // Longer list lines: set slightly tighter so the card keeps the same height.
  compact?: boolean;
};

// The second hero card uses the services page's own wording for this offer:
// its name, its "What's included" list and its featured-at row. No new copy.
const operatingSystemsService = servicesPage.offers.find((offer) => offer.id === "ai-operating-system-audit");
const operatingSystemsOffer: HeroOffer | null =
  operatingSystemsService && "includes" in operatingSystemsService && operatingSystemsService.includes
    ? {
        title: operatingSystemsService.name,
        listTitle: operatingSystemsService.includesLabel ?? "What's included",
        points: operatingSystemsService.includes,
        cta: frontDoorOffer.cta,
        more: { label: frontDoorOffer.more.label, href: `/services#${operatingSystemsService.id}` },
        featured: aiStrategyFeaturedEvents,
        compact: true
      }
    : null;

const heroOffers: HeroOffer[] = operatingSystemsOffer ? [frontDoorOffer, operatingSystemsOffer] : [frontDoorOffer];
const ROTATE_MS = 5000;

const DISMISS_KEY = "sb-front-door";

function OfferBody({
  offer = frontDoorOffer,
  onClose,
  onFollow,
  large,
  switcher
}: {
  offer?: HeroOffer;
  // Shown in place of nothing on the rotating hero card: which offer is up.
  switcher?: React.ReactNode;
  onClose?: () => void;
  // Called when the reader follows the link: the floating card closes so
  // it never sits on top of the section they asked to see. The homepage
  // hero card passes nothing here — it leaves with the hero anyway.
  onFollow?: () => void;
  large?: boolean;
}) {
  return (
    <>
      <div className="h-[3px] w-full bg-[color:var(--sb-accent-blue)]" aria-hidden="true" />
      <div className={large ? "p-7" : "p-6"}>
        <div className="flex items-start justify-between gap-4">
          <h2 className={`text-balance leading-snug ${large ? "text-2xl" : "text-xl"}`}>
            {offer.title}
          </h2>
          {switcher}
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
        <p className="mt-5 text-sm font-semibold text-ink">{offer.listTitle}</p>
        <ul className="mt-1">
          {offer.points.map((point) => (
            <li
              key={point}
              className={`border-b border-ink/10 leading-snug text-ink/70 last:border-0 ${
                offer.compact ? "py-[5px] text-[14px]" : "py-2.5 text-[15px]"
              }`}
            >
              {point}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col gap-3">
          <Link
            href={offer.cta.href}
            className="focus-ring inline-flex min-h-11 items-center justify-center bg-ink px-4 py-3 text-sm uppercase tracking-[0.06em] text-white transition-opacity hover:opacity-90"
          >
            {offer.cta.label}
          </Link>
          <Link
            href={offer.more.href}
            onClick={onFollow}
            className="focus-ring self-start text-sm text-ink/60 underline decoration-ink/30 underline-offset-4 transition-colors hover:text-ink"
          >
            {offer.more.label}
          </Link>
        </div>
        {offer.featured.events ? (
          // Short label, then the event marks across the card.
          <div className="mt-5 border-t border-ink/10 pt-4">
            <p className="text-[11px] uppercase tracking-[0.08em] text-ink/60">{offer.featured.label}</p>
            <div className="mt-2 flex items-center justify-between">
              {offer.featured.events.map((event) => (
                <EventLogoChip key={event.name} logo={event} size={37} />
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-5 border-t border-ink/10 pt-4">
            <p className="text-[11px] uppercase tracking-[0.08em] text-ink/60">{offer.featured.label}</p>
            <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-2 min-[360px]:flex-nowrap">
              {offer.featured.logos?.map((logo: OfferLogo) => (
                <Image
                  key={logo.name}
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={16}
                  className="h-3.5 min-w-0 w-auto object-contain"
                />
              ))}
            </div>
          </div>
        )}
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

// The homepage hero card: the offers take turns every five seconds. Both are
// laid out in the same grid cell, so the card keeps one height and the change
// is a cross-fade with nothing else on the page moving. It holds still while
// the pointer or keyboard focus is on it, and while the tab is in the background.
function RotatingOffers({ onClose, reduceMotion }: { onClose: () => void; reduceMotion: boolean }) {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (held || heroOffers.length < 2) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive((current) => (current + 1) % heroOffers.length);
    }, ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [held, active]);

  const switcher =
    heroOffers.length > 1 ? (
      <div className="mt-2.5 flex flex-none items-center gap-1.5" role="group" aria-label="Offers">
        {heroOffers.map((offer, index) => (
          <button
            key={offer.title}
            type="button"
            onClick={() => setActive(index)}
            aria-label={offer.title}
            aria-pressed={index === active}
            className="focus-ring flex h-6 w-5 items-center"
          >
            <span
              className="block h-0.5 w-full transition-colors duration-300"
              style={{ background: index === active ? "var(--sb-accent-blue)" : "rgba(20,20,20,0.18)" }}
            />
          </button>
        ))}
      </div>
    ) : null;

  return (
    <div
      className="grid"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
    >
      {heroOffers.map((offer, index) => {
        const shown = index === active;
        return (
          <div
            key={offer.title}
            className="hero-offer-face"
            style={{
              gridArea: "1 / 1",
              opacity: shown ? 1 : 0,
              transform: shown || reduceMotion ? "none" : "translateY(10px)",
              pointerEvents: shown ? "auto" : "none",
              transition: reduceMotion
                ? "opacity 200ms ease"
                : shown
                  ? "opacity 520ms cubic-bezier(0.23, 1, 0.32, 1) 140ms, transform 620ms cubic-bezier(0.23, 1, 0.32, 1) 140ms"
                  : "opacity 280ms ease, transform 280ms ease"
            }}
            aria-hidden={!shown}
            inert={!shown}
          >
            <OfferBody offer={offer} large onClose={onClose} switcher={switcher} />
          </div>
        );
      })}
    </div>
  );
}

export function FrontDoorOffer() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [pillDismissed, setPillDismissed] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);
  const [pastOffers, setPastOffers] = useState(false);
  const [atClose, setAtClose] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setDismissed(window.sessionStorage.getItem(DISMISS_KEY) === "closed");
      setPillDismissed(window.sessionStorage.getItem(`${DISMISS_KEY}-pill`) === "closed");
      setMounted(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  // The pill waits until the four ways to hire have scrolled past (homepage)
  // and steps aside over the closing band and the footer.
  useEffect(() => {
    const check = () => {
      const offers = document.querySelector(".commercial-sprint-section");
      setPastOffers(offers ? offers.getBoundingClientRect().bottom < window.innerHeight * 0.35 : true);
      const closers = Array.from(document.querySelectorAll(".home-cta-section, footer"));
      setAtClose(
        closers.some((el) => {
          const r = el.getBoundingClientRect();
          return r.top < window.innerHeight - 24 && r.bottom > 0;
        })
      );
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [pathname]);

  // Where the offer appears (Jayme, 11 Oct 2026): the homepage hero card,
  // which scrolls away with the hero, then the pill once the four ways to
  // hire are behind the visitor; and the floating offer on /research. The studies carry the HNW dataset card instead; every other page
  // has nothing floating, so nothing sits over cards, buttons or sidebars.
  const isHome = pathname === "/";
  const isResearchIndex = pathname === "/research";
  if (!mounted || (!isHome && !isResearchIndex)) return null;

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

  const pillVisible = (isResearchIndex || (isHome && pastOffers)) && !atClose && !cardOpen && !pillDismissed;

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
          aria-label="What you can hire us for"
        >
          <RotatingOffers onClose={dismiss} reduceMotion={Boolean(prefersReducedMotion)} />
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
              className="pointer-events-auto relative max-h-[calc(100dvh-3rem)] w-full overflow-y-auto border border-ink/15 bg-white shadow-[0_2px_6px_rgba(20,20,20,0.06),0_22px_52px_rgba(20,20,20,0.16)] sm:w-[380px]"
              aria-label={frontDoorOffer.title}
            >
              <OfferBody onClose={() => setCardOpen(false)} onFollow={() => setCardOpen(false)} />
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
                <span className="flex max-w-[285px] flex-col gap-1">
                  <span className="text-balance text-[13px] uppercase leading-snug tracking-[0.1em]">
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
                className="focus-ring absolute -right-2.5 -top-2.5 flex h-6 w-6 items-center justify-center rounded-full border border-ink/25 bg-white text-ink/60 shadow-[0_2px_8px_rgba(20,20,20,0.14)] transition-colors hover:text-ink"
              >
                <svg width="10" height="10" viewBox="0 0 12 12" aria-hidden="true">
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
