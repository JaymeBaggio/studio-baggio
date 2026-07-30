"use client";

import {
  forwardRef,
  type ReactNode,
  useId,
  useState
} from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type HTMLMotionProps
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

const editorialEase = [0.23, 1, 0.32, 1] as const;

type ResearchDisclosureProps = {
  children: ReactNode;
  className?: string;
  defaultOpen?: boolean;
  label: ReactNode;
};

/** A compact, accessible detail disclosure for methodology and evidence notes. */
export function ResearchDisclosure({
  children,
  className,
  defaultOpen = false,
  label
}: ResearchDisclosureProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [keyboardToggle, setKeyboardToggle] = useState(false);
  const panelId = useId();
  const shouldReduceMotion = useReducedMotion();
  const instant = Boolean(shouldReduceMotion || keyboardToggle);

  const refreshScrollMeasurements = () => {
    window.requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  return (
    <div className={cn("research-disclosure", className)} data-research-disclosure>
      <ResearchPressable
        className="research-disclosure-trigger"
        aria-controls={panelId}
        aria-expanded={isOpen}
        onClick={(event) => {
          // Native keyboard activation has detail === 0. Emil's interaction
          // rule is to answer keyboard actions immediately, without theatre.
          setKeyboardToggle(event.detail === 0);
          setIsOpen((current) => !current);
        }}
      >
        <span>{label}</span>
        <motion.span
          aria-hidden="true"
          className="research-disclosure-icon"
          animate={{ transform: instant || !isOpen ? "rotate(0deg)" : "rotate(180deg)" }}
          transition={{ duration: instant ? 0 : 0.2, ease: editorialEase }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </ResearchPressable>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            key={panelId}
            id={panelId}
            className="research-disclosure-panel"
            initial={instant ? false : { opacity: 0, transform: "translate3d(0, -6px, 0)" }}
            animate={{ opacity: 1, transform: "translate3d(0, 0, 0)" }}
            exit={
              instant
                ? { opacity: 0 }
                : { opacity: 0, transform: "translate3d(0, -4px, 0)" }
            }
            transition={{ duration: instant ? 0 : isOpen ? 0.22 : 0.14, ease: editorialEase }}
            onAnimationComplete={refreshScrollMeasurements}
          >
            <div className="research-disclosure-content">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

type ResearchPressableProps = Omit<HTMLMotionProps<"button">, "animate" | "transition"> & {
  children: ReactNode;
};

/** Pointer-only press feedback; keyboard activation remains immediate. */
export const ResearchPressable = forwardRef<HTMLButtonElement, ResearchPressableProps>(function ResearchPressable({
  children,
  className,
  disabled,
  onBlur,
  onLostPointerCapture,
  onPointerCancel,
  onPointerDown,
  onPointerUp,
  ...props
}, ref) {
  const [isPointerPressed, setIsPointerPressed] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      ref={ref}
      type="button"
      {...props}
      disabled={disabled}
      className={cn("research-pressable", className)}
      animate={{
        transform:
          shouldReduceMotion || disabled || !isPointerPressed ? "scale(1)" : "scale(0.98)"
      }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.14, ease: editorialEase }}
      onPointerDown={(event) => {
        if (!disabled && event.isPrimary) {
          event.currentTarget.setPointerCapture(event.pointerId);
          setIsPointerPressed(true);
        }
        onPointerDown?.(event);
      }}
      onPointerUp={(event) => {
        setIsPointerPressed(false);
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
        onPointerUp?.(event);
      }}
      onPointerCancel={(event) => {
        setIsPointerPressed(false);
        onPointerCancel?.(event);
      }}
      onLostPointerCapture={(event) => {
        setIsPointerPressed(false);
        onLostPointerCapture?.(event);
      }}
      onBlur={(event) => {
        setIsPointerPressed(false);
        onBlur?.(event);
      }}
    >
      {children}
    </motion.button>
  );
});
