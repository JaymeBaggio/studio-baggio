"use client";

import {
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ResearchPressable } from "./ResearchDisclosure.client";

const editorialEase = [0.23, 1, 0.32, 1] as const;
const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])"
].join(",");

export function ResearchDrawer({
  children,
  className,
  eyebrow,
  title,
  trigger,
  triggerClassName
}: {
  children: ReactNode;
  className?: string;
  eyebrow?: string;
  title: string;
  trigger: ReactNode;
  triggerClassName?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [keyboardInteraction, setKeyboardInteraction] = useState(false);
  const titleId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const skipMovement = Boolean(shouldReduceMotion || keyboardInteraction);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const triggerElement = triggerRef.current;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => closeRef.current?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setKeyboardInteraction(true);
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(focusableSelector)
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      window.requestAnimationFrame(() => triggerElement?.focus());
    };
  }, [isOpen]);

  return (
    <>
      <ResearchPressable
        ref={triggerRef}
        className={cn("research-drawer-trigger", triggerClassName)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={(event) => {
          setKeyboardInteraction(event.detail === 0);
          setIsOpen(true);
        }}
      >
        {trigger}
      </ResearchPressable>

      {typeof document !== "undefined"
        ? createPortal(
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  className="research-drawer-layer"
                  initial={keyboardInteraction ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: keyboardInteraction ? 0 : shouldReduceMotion ? 0.1 : 0.16,
                    ease: editorialEase
                  }}
                >
                  <button
                    type="button"
                    className="research-drawer-backdrop"
                    aria-label={`Close ${title}`}
                    onClick={() => {
                      setKeyboardInteraction(false);
                      setIsOpen(false);
                    }}
                  />
                  <motion.div
                    ref={panelRef}
                    className={cn("research-drawer-panel", className)}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={titleId}
                    initial={skipMovement ? false : { transform: "translate3d(100%, 0, 0)" }}
                    animate={{ transform: "translate3d(0, 0, 0)" }}
                    exit={{
                      transform: skipMovement
                        ? "translate3d(0, 0, 0)"
                        : "translate3d(100%, 0, 0)"
                    }}
                    transition={{
                      duration: skipMovement ? 0 : isOpen ? 0.24 : 0.16,
                      ease: editorialEase
                    }}
                  >
                    <header className="research-drawer-header">
                      <div>
                        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
                        <h2 id={titleId}>{title}</h2>
                      </div>
                      <button
                        ref={closeRef}
                        type="button"
                        className="research-drawer-close"
                        aria-label={`Close ${title}`}
                        onClick={(event) => {
                          setKeyboardInteraction(event.detail === 0);
                          setIsOpen(false);
                        }}
                      >
                        <X aria-hidden="true" />
                      </button>
                    </header>
                    <div className="research-drawer-content">{children}</div>
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body
          )
        : null}
    </>
  );
}
