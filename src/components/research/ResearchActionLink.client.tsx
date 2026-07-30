"use client";

import Link from "next/link";
import {
  type AnchorHTMLAttributes,
  type ReactNode,
  useState
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { track } from "@vercel/analytics";
import { cn } from "@/lib/utils";

const editorialEase = [0.23, 1, 0.32, 1] as const;

type ResearchActionLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "children" | "href"
> & {
  children: ReactNode;
  analyticsEvent?: string;
  analyticsProperties?: Record<string, string | number | boolean>;
  external?: boolean;
  href: string;
};

/**
 * Link semantics with pointer-only Motion feedback. Focus, hover and colour
 * remain CSS concerns; keyboard activation never waits for an animation.
 */
export function ResearchActionLink({
  analyticsEvent,
  analyticsProperties,
  children,
  className,
  external = false,
  href,
  onClick,
  onBlur,
  onPointerCancel,
  onPointerDown,
  onPointerUp,
  rel,
  target,
  ...props
}: ResearchActionLinkProps) {
  const [isPointerPressed, setIsPointerPressed] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const content = (
    <motion.span
      className="research-action-link-surface inline-flex"
      animate={{
        transform:
          shouldReduceMotion || !isPointerPressed ? "scale(1)" : "scale(0.98)"
      }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.14, ease: editorialEase }}
    >
      {children}
    </motion.span>
  );

  const interactionProps = {
    onBlur: (event: React.FocusEvent<HTMLAnchorElement>) => {
      setIsPointerPressed(false);
      onBlur?.(event);
    },
    onPointerCancel: (event: React.PointerEvent<HTMLAnchorElement>) => {
      setIsPointerPressed(false);
      onPointerCancel?.(event);
    },
    onPointerDown: (event: React.PointerEvent<HTMLAnchorElement>) => {
      if (event.isPrimary) {
        event.currentTarget.setPointerCapture(event.pointerId);
        setIsPointerPressed(true);
      }
      onPointerDown?.(event);
    },
    onPointerUp: (event: React.PointerEvent<HTMLAnchorElement>) => {
      setIsPointerPressed(false);
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      onPointerUp?.(event);
    },
    onClick: (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (analyticsEvent) {
        track(analyticsEvent, analyticsProperties);
      }
      onClick?.(event);
    }
  };

  const sharedProps = {
    ...props,
    ...interactionProps,
    className: cn("research-action-link", className)
  };

  if (external) {
    return (
      <a
        href={href}
        target={target ?? "_blank"}
        rel={rel ?? "noreferrer"}
        {...sharedProps}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} target={target} rel={rel} {...sharedProps}>
      {content}
    </Link>
  );
}
