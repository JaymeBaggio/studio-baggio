"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type SplitTextInstance = {
  lines: Element[];
  words: Element[];
  revert: () => void;
};

type SplitTextConstructor = new (
  target: Element | Element[] | string,
  vars?: Record<string, unknown>
) => SplitTextInstance;

export function PageReveals() {
  useGSAP(
    () => {
      let alive = true;
      const splits: SplitTextInstance[] = [];
      const animations: gsap.core.Animation[] = [];
      const triggers: ScrollTrigger[] = [];
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      async function run() {
        await document.fonts?.ready;
        if (!alive) return;

        ScrollTrigger.clearScrollMemory("manual");

        if (!window.location.hash) {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        }

        let SplitText: SplitTextConstructor | null = null;
        try {
          SplitText = (await import("gsap/SplitText")).SplitText;
          gsap.registerPlugin(SplitText);
        } catch {
          SplitText = null;
        }

        const heroLines = gsap.utils.toArray<HTMLElement>("[data-hero-line]");
        const heroMeta = gsap.utils.toArray<HTMLElement>("[data-hero-meta]");
        const heroPromise = gsap.utils.toArray<HTMLElement>("[data-hero-promise]");
        const revealElements = gsap.utils.toArray<HTMLElement>("[data-reveal]");
        const splitElements = gsap.utils.toArray<HTMLElement>("[data-split]");
        const stickySections = gsap.utils.toArray<HTMLElement>("[data-sticky-section]");

        if (reduce) {
          gsap.set([...revealElements, ...splitElements], { opacity: 1, y: 0 });
          return;
        }

        const heroTimeline = gsap.timeline();
        animations.push(heroTimeline);

        if (heroMeta.length) {
          heroTimeline.from(heroMeta, {
            y: 14,
            opacity: 0,
            duration: 0.72,
            stagger: 0.08,
            ease: "power3.out"
          }, 0.08);
        }

        if (heroLines.length) {
          heroTimeline.from(heroLines, {
            yPercent: 110,
            opacity: 0,
            duration: 0.95,
            stagger: 0.12,
            ease: "expo.out"
          }, 0.22);
        }

        if (heroPromise.length) {
          heroTimeline.from(heroPromise, {
            y: 10,
            opacity: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out"
          }, 0.78);
        }

        if (window.innerWidth >= 900) {
          stickySections.forEach((section) => {
            triggers.push(
              ScrollTrigger.create({
                trigger: section,
                start: "top top",
                end: () => `+=${Math.round(window.innerHeight * 2)}`,
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
                invalidateOnRefresh: true
              })
            );
          });
        }

        revealElements.forEach((element) => {
          const stickyParent = element.closest("[data-sticky-section]") as HTMLElement | null;

          animations.push(
            gsap.from(element, {
              y: 18,
              opacity: 0,
              duration: 0.45,
              ease: "power3.out",
              scrollTrigger: {
                trigger: stickyParent || element,
                start: stickyParent ? "top 78%" : "top 86%",
                fastScrollEnd: true,
                once: true
              }
            })
          );
        });

        splitElements.forEach((element) => {
          const stickyParent = element.closest("[data-sticky-section]") as HTMLElement | null;

          if (SplitText) {
            const split = new SplitText(element, {
              type: "lines",
              mask: "lines",
              autoSplit: true
            });
            splits.push(split);
            animations.push(
              gsap.from(split.lines, {
                yPercent: 70,
                opacity: 0,
                duration: 0.52,
                stagger: 0.045,
                ease: "expo.out",
                scrollTrigger: {
                  trigger: stickyParent || element,
                  start: stickyParent ? "top 78%" : "top 86%",
                  fastScrollEnd: true,
                  once: true
                }
              })
            );
          } else {
            animations.push(
              gsap.from(element, {
                y: 16,
                opacity: 0,
                duration: 0.5,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: stickyParent || element,
                  start: stickyParent ? "top 78%" : "top 86%",
                  fastScrollEnd: true,
                  once: true
                }
              })
            );
          }
        });
      }

      run();

      return () => {
        alive = false;
        animations.forEach((animation) => animation.kill());
        triggers.forEach((trigger) => trigger.kill());
        splits.forEach((split) => split.revert());
      };
    }
  );

  return null;
}
