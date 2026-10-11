"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export type LatestInsight = {
  href: string;
  title: string;
  category: string;
  dateLabel: string;
  readTime: string;
};

// The latest insights in one compact card. Every five seconds the next one
// fades in; arrows, swipes and sideways trackpad scrolling move through them.
export function LatestInsights({ items, allHref }: { items: LatestInsight[]; allHref: string }) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [autoplay, setAutoplay] = useState(true);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number | null>(null);
  const lastWheel = useRef(0);
  const count = items.length;

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (reduceMotion) setAutoplay(false);
        setInView(entry.isIntersecting);
      },
      { threshold: 0.6 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const go = (step: 1 | -1) => {
    setDirection(step);
    setActive((current) => (current + step + count) % count);
  };

  const goByHand = (step: 1 | -1) => {
    setAutoplay(false);
    go(step);
  };

  const playing = autoplay && inView && !paused;

  return (
    <div
      ref={rootRef}
      className={`latest-insights${playing ? " is-playing" : ""}${autoplay ? "" : " is-manual"}${direction === -1 ? " is-reverse" : ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onWheel={(event) => {
        if (Math.abs(event.deltaX) < 24 || Math.abs(event.deltaX) < Math.abs(event.deltaY)) return;
        const now = Date.now();
        if (now - lastWheel.current < 600) return;
        lastWheel.current = now;
        goByHand(event.deltaX > 0 ? 1 : -1);
      }}
      onTouchStart={(event) => {
        touchStart.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const start = touchStart.current;
        const end = event.changedTouches[0]?.clientX;
        touchStart.current = null;
        if (start === null || end === undefined || Math.abs(end - start) < 40) return;
        goByHand(end < start ? 1 : -1);
      }}
      aria-roledescription="carousel"
      aria-label="Latest insights"
    >
      <div className="latest-insights-head">
        <Link href={allHref} className="latest-insights-label">
          Latest insights
        </Link>
        <div className="latest-insights-controls">
          <span className="latest-insights-count" aria-live="polite">
            <span>{String(active + 1).padStart(2, "0")}</span> / {String(count).padStart(2, "0")}
          </span>
          <button type="button" aria-label="Previous insight" onClick={() => goByHand(-1)}>
            <ArrowLeft aria-hidden="true" />
          </button>
          <button type="button" aria-label="Next insight" onClick={() => goByHand(1)}>
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="latest-insights-stack">
        {items.map((item, index) => {
          const isActive = index === active;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`latest-insights-item${isActive ? " is-active" : ""}`}
              aria-hidden={!isActive}
              tabIndex={isActive ? undefined : -1}
            >
              <span className="latest-insights-meta">
                {item.category} · {item.dateLabel} · {item.readTime}
              </span>
              <span className="latest-insights-title">{item.title}</span>
              <span className="latest-insights-read">Read the article →</span>
            </Link>
          );
        })}
      </div>

      <span className="latest-insights-progress" aria-hidden="true">
        <span key={active} onAnimationEnd={() => (autoplay ? go(1) : undefined)} />
      </span>
    </div>
  );
}
