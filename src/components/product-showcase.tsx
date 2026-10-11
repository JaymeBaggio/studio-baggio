"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { workItems } from "@/content/work";

const productOrder = ["last30days", "calm-authority", "business-tracker", "fire-source"];
const products = productOrder
  .map((slug) => workItems.find((item) => item.slug === slug))
  .filter((item): item is (typeof workItems)[number] => Boolean(item));
const imageSizes = "(min-width: 1100px) 760px, 100vw";

// One product at a time: the image wipes in, the copy follows, and the tabs
// underneath carry a progress line that advances the showcase until the
// visitor takes control.
export function ProductShowcase() {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [autoplay, setAutoplay] = useState(true);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const rootRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const touchStart = useRef<number | null>(null);
  const hasMounted = useRef(false);
  const count = products.length;

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (reduceMotion) setAutoplay(false);
        setInView(entry.isIntersecting);
      },
      { threshold: 0.45 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // The incoming image wipes across the outgoing one, in the direction of travel.
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const slide = slideRefs.current[active];
    if (!slide) return;
    const from = direction === 1 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)";
    slide.animate([{ clipPath: from }, { clipPath: "inset(0 0 0 0)" }], {
      duration: 900,
      easing: "cubic-bezier(0.65, 0, 0.35, 1)"
    });
    slide.querySelector("img")?.animate([{ transform: "scale(1.08)" }, { transform: "scale(1)" }], {
      duration: 1400,
      easing: "cubic-bezier(0.23, 1, 0.32, 1)"
    });
  }, [active, direction]);

  const goTo = (index: number, step: 1 | -1 = 1) => {
    const next = (index + count) % count;
    if (next === active) return;
    setDirection(step);
    setPrevious(active);
    setActive(next);
  };

  const choose = (index: number, step?: 1 | -1) => {
    setAutoplay(false);
    goTo(index, step ?? (index >= active ? 1 : -1));
  };

  const playing = autoplay && inView && !paused;

  return (
    <div
      ref={rootRef}
      className={`product-showcase${playing ? " is-playing" : ""}${autoplay ? "" : " is-manual"}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      data-reveal
    >
      <div className="product-stage">
        <div
          className="product-stage-media"
          onTouchStart={(event) => {
            touchStart.current = event.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            const start = touchStart.current;
            const end = event.changedTouches[0]?.clientX;
            touchStart.current = null;
            if (start === null || end === undefined || Math.abs(end - start) < 40) return;
            if (end < start) choose(active + 1, 1);
            else choose(active - 1, -1);
          }}
        >
          {products.map((item, index) => (
            <div
              key={item.slug}
              ref={(node) => {
                slideRefs.current[index] = node;
              }}
              className={`product-slide${index === active ? " is-active" : ""}${index === previous ? " is-previous" : ""}`}
              aria-hidden={index !== active}
            >
              {item.homepageImage ? (
                <Image
                  src={item.homepageImage}
                  alt=""
                  fill
                  sizes={imageSizes}
                  priority={index === 0}
                  loading={index === 0 ? undefined : "eager"}
                />
              ) : null}
            </div>
          ))}
        </div>

        <div className="product-stage-copy">
          <div className="product-stage-controls">
            <p className="product-stage-count" aria-live="polite">
              <span>{String(active + 1).padStart(2, "0")}</span> / {String(count).padStart(2, "0")}
            </p>
            <div className="product-stage-arrows">
              <button type="button" aria-label="Previous product" onClick={() => choose(active - 1, -1)}>
                <ArrowLeft aria-hidden="true" />
              </button>
              <button type="button" aria-label="Next product" onClick={() => choose(active + 1, 1)}>
                <ArrowRight aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="product-copy-stack">
            {products.map((item, index) => {
              const isActive = index === active;
              const body = item.homeBody ?? [item.proofCopy].filter((paragraph): paragraph is string => Boolean(paragraph));

              return (
                <div
                  key={item.slug}
                  id={`product-panel-${item.slug}`}
                  role="tabpanel"
                  aria-labelledby={`product-tab-${item.slug}`}
                  className={`product-copy${isActive ? " is-active" : ""}`}
                  aria-hidden={!isActive}
                  inert={!isActive}
                >
                  <h3 className="product-copy-title">{item.title}</h3>
                  {item.promise ? <p className="product-copy-promise">{item.promise}</p> : null}
                  <div className="product-copy-body">
                    {body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {item.homepageLinks?.length ? (
                    <div className="product-copy-links">
                      {item.homepageLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          target={link.href.startsWith("http") ? "_blank" : undefined}
                          rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="product-tabs" role="tablist" aria-label="Products">
        {products.map((item, index) => {
          const isActive = index === active;

          return (
            <button
              key={item.slug}
              id={`product-tab-${item.slug}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`product-panel-${item.slug}`}
              className={`product-tab${isActive ? " is-active" : ""}`}
              onClick={() => choose(index)}
            >
              <span className="product-tab-line" aria-hidden="true">
                <span
                  key={isActive ? `${item.slug}-${active}` : item.slug}
                  onAnimationEnd={() => {
                    if (isActive && autoplay) goTo(active + 1, 1);
                  }}
                />
              </span>
              <span className="product-tab-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="product-tab-name">{item.title}</span>
              {item.promise ? <span className="product-tab-promise">{item.promise}</span> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
