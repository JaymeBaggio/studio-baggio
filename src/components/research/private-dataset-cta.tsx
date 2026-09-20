"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { privateDataset } from "@/content/private-dataset";
import { isWorkEmail } from "@/lib/dataset-interest-schema";

type Status = { tone: "idle" } | { tone: "sending" } | { tone: "success" } | { tone: "error"; message: string };

type Variant = "section" | "inline";

async function submit(payload: Record<string, string>) {
  const response = await fetch("/api/dataset-interest", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload)
  });
  const data = (await response.json().catch(() => ({}))) as { message?: string };
  if (!response.ok) {
    throw new Error(data.message || privateDataset.failure);
  }
}

function useInterestForm(variant: Variant) {
  const [status, setStatus] = useState<Status>({ tone: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const email = (values.email || "").trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ tone: "error", message: "Please enter a valid email address." });
      return;
    }
    if (!isWorkEmail(email)) {
      setStatus({ tone: "error", message: "Please use your work email." });
      return;
    }

    setStatus({ tone: "sending" });
    try {
      await submit({ ...values, email, variant });
      setStatus({ tone: "success" });
      form.reset();
    } catch (error) {
      setStatus({ tone: "error", message: error instanceof Error ? error.message : privateDataset.failure });
    }
  }

  return { status, onSubmit };
}

function StatusLine({ status, className = "" }: { status: Status; className?: string }) {
  if (status.tone === "success") {
    return (
      <p className={`text-sm text-ink ${className}`} role="status" aria-live="polite">
        {privateDataset.success}
      </p>
    );
  }
  if (status.tone === "error") {
    return (
      <p className={`text-sm text-[#b42318] ${className}`} role="alert" aria-live="assertive">
        {status.message}
      </p>
    );
  }
  return null;
}

/* The card. Same object as the homepage front-door offer: 3px blue rule,
   white, hairline rows, black uppercase button, small print. On desktop it is
   fixed bottom-right and follows the reader (the audit pill is suppressed on this page);
   the reader can close it for the session. On phones it is a static card
   under the masthead, so it never covers the study. */
const DISMISS_KEY = "sb-private-dataset";

function CardBody({ onClose, id }: { onClose?: () => void; id: string }) {
  const { status, onSubmit } = useInterestForm("section");
  const [openRow, setOpenRow] = useState<number | null>(null);
  const [askOpen, setAskOpen] = useState(false);
  const sending = status.tone === "sending";

  return (
    <>
      <div className="h-[3px] w-full bg-[color:var(--sb-accent-blue)]" aria-hidden="true" />
      <div className="relative p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[12px] uppercase tracking-[0.16em] text-ink/50">{privateDataset.kicker}</p>
            <h2 id={`${id}-title`} className="mt-1.5 text-[24px] leading-[1.15] text-ink">
              {privateDataset.title}
            </h2>
          </div>
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="focus-ring -mr-1 mt-1 flex h-7 w-7 flex-none items-center justify-center text-ink/50 transition-colors hover:text-ink"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
          ) : null}
        </div>

        <ul className="mt-4">
          {privateDataset.stats.map((stat) => (
            <li key={stat.value} className="border-t border-ink/10 py-3 text-[17px] leading-snug text-ink">
              <strong className="mr-2 text-[28px] font-medium leading-none text-[color:var(--sb-accent-blue)]">{stat.value}</strong>
              {stat.copy}
              <span className="mt-1.5 block text-[11px] uppercase tracking-[0.08em] text-ink/50">{stat.source}</span>
            </li>
          ))}
        </ul>

        <div className="mt-1 border-t border-ink/10">
          {privateDataset.points.map((point, index) => {
            const isOpen = openRow === index;
            return (
              <div key={point.label} className="border-b border-ink/10 py-2.5">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`${id}-row-${index}`}
                  onClick={() => setOpenRow(isOpen ? null : index)}
                  className="focus-ring flex w-full cursor-pointer items-center justify-between gap-4 text-left text-[16px] text-ink"
                >
                  <span>{point.label}</span>
                  <svg
                    className={`h-3 w-3 flex-none text-ink/50 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    viewBox="0 0 12 12"
                    aria-hidden="true"
                  >
                    <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {isOpen ? (
                  <p id={`${id}-row-${index}`} className="mt-2 text-[16px] leading-snug text-ink/80">
                    {point.copy}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>

        <p className="mt-3 text-[14px] leading-snug text-ink/55">{privateDataset.body}</p>

        <form
          className="mt-4"
          onSubmit={(event) => {
            if (!askOpen) {
              event.preventDefault();
              return;
            }
            void onSubmit(event);
          }}
          noValidate
        >
          <input
            name="companyUrl"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] h-px w-px opacity-0"
          />
          {askOpen ? (
            <div className="flex min-h-12 items-stretch border border-ink">
              <label className="flex min-w-0 flex-1 items-center">
                <span className="sr-only">Work email</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="Work email"
                  required
                  autoFocus
                  className="fa3-dataset-input h-full w-full border-0 bg-transparent px-4 py-2 text-[17px] text-ink placeholder:text-ink/40"
                />
              </label>
              <button
                type="submit"
                disabled={sending}
                aria-label="Send"
                className="focus-ring flex w-14 flex-none items-center justify-center bg-ink text-white transition-colors hover:bg-[color:var(--sb-accent-blue)] disabled:opacity-60"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                  <path d="M2 9h13M10 4l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                setOpenRow(null);
                setAskOpen(true);
              }}
              className="focus-ring inline-flex min-h-12 w-full items-center justify-center bg-ink px-4 py-3 text-[15px] uppercase tracking-[0.06em] text-white transition-colors hover:bg-[color:var(--sb-accent-blue)]"
            >
              {privateDataset.button}
            </button>
          )}
          <StatusLine status={status} className="mt-3" />
        </form>
      </div>
    </>
  );
}

export function PrivateDatasetCard() {
  const id = useId();
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [open, setOpen] = useState(true);
  const [boxInView, setBoxInView] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      let closed = false;
      try {
        closed = window.sessionStorage.getItem(DISMISS_KEY) === "1";
      } catch {
        closed = false;
      }
      setDismissed(closed);
      setMounted(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const box = document.querySelector(".fa3-dataset-box");
    if (!box || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => setBoxInView(entries.some((entry) => entry.isIntersecting)),
      { threshold: 0.15 }
    );
    observer.observe(box);
    return () => observer.disconnect();
  }, []);

  const dismiss = () => {
    setDismissed(true);
    setOpen(false);
    try {
      window.sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* storage unavailable: the pill simply closes for this render */
    }
  };

  const transition = prefersReducedMotion
    ? { duration: 0.15 }
    : { type: "spring" as const, stiffness: 320, damping: 30 };

  return (
    <>
      {/* Desktop follower: a pill that opens into the card. */}
      <div className="pointer-events-none fixed bottom-6 right-6 z-40 hidden justify-end lg:flex">
        <AnimatePresence initial={false} mode="wait">
          {mounted && !dismissed && open && !boxInView ? (
            <motion.aside
              key="card"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18, scale: prefersReducedMotion ? 1 : 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : 12, transition: { duration: 0.18 } }}
              transition={transition}
              className="fa3-dataset-card pointer-events-auto relative w-[420px] border border-ink/15 bg-white shadow-[0_2px_6px_rgba(20,20,20,0.06),0_26px_60px_rgba(20,20,20,0.18)]"
              aria-labelledby={`${id}-title`}
            >
              <CardBody onClose={() => setOpen(false)} id={id} />
            </motion.aside>
          ) : mounted && !dismissed ? (
            <motion.div
              key="pill"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : 8, transition: { duration: 0.15 } }}
              transition={{ ...transition, delay: 0.5 }}
              className="fa3-dataset-pill group pointer-events-auto relative"
            >
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-expanded={false}
                className="focus-ring inline-flex items-center gap-3.5 border border-ink bg-white py-3.5 pl-5 pr-9 text-left text-ink shadow-[0_10px_30px_rgba(20,20,20,0.12)] transition-colors hover:bg-ink hover:text-white"
              >
                <span
                  className="h-1.5 w-1.5 flex-none rounded-full bg-[color:var(--sb-accent-blue)]"
                  aria-hidden="true"
                />
                <span className="flex flex-col gap-1">
                  <span className="text-[13px] uppercase leading-none tracking-[0.1em]">{privateDataset.kicker}</span>
                  <span className="text-[13px] leading-none text-ink/60 transition-colors group-hover:text-white/70">
                    How HNW &amp; UHNW clients choose advisers
                  </span>
                </span>
              </button>
              <button
                type="button"
                onClick={dismiss}
                aria-label="Hide"
                className="focus-ring absolute -right-2.5 -top-2.5 flex h-6 w-6 items-center justify-center rounded-full border border-ink/25 bg-white text-ink/60 shadow-sm transition-colors hover:text-ink"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                  <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Phones and narrow windows: the card sits under the masthead. */}
      <section className="editorial-container pb-4 pt-10 lg:hidden" aria-labelledby={`${id}-static-title`}>
        <div className="relative border border-ink/15 bg-white shadow-[0_2px_6px_rgba(20,20,20,0.06),0_18px_44px_rgba(20,20,20,0.14)]">
          <CardBody id={`${id}-static`} />
        </div>
      </section>
    </>
  );
}

/* The box beside the firm results: the same card, in flow, no close. */
export function PrivateDatasetBox() {
  const id = useId();
  return (
    <aside
      className="fa3-dataset-box border border-ink/15 bg-white shadow-[0_2px_6px_rgba(20,20,20,0.06),0_14px_36px_rgba(20,20,20,0.10)]"
      aria-labelledby={`${id}-title`}
    >
      <CardBody id={id} />
    </aside>
  );
}
