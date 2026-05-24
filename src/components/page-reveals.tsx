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

        if (heroLines.length) {
          animations.push(
            gsap.to(heroLines, {
              yPercent: -8,
              opacity: 0.72,
              ease: "none",
              scrollTrigger: {
                trigger: ".home-reference-hero",
                start: "top top",
                end: "bottom top",
                scrub: 0.8,
                invalidateOnRefresh: true
              }
            })
          );
        }

        const textScrollTrigger = (element: HTMLElement) => ({
          trigger: element,
          start: "top 92%",
          end: "top 58%",
          scrub: 0.45,
          fastScrollEnd: true,
          invalidateOnRefresh: true
        });

        revealElements.forEach((element) => {
          animations.push(
            gsap.fromTo(
              element,
              { y: 28, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                ease: "power3.out",
                scrollTrigger: textScrollTrigger(element)
              }
            )
          );
        });

        splitElements.forEach((element) => {
          if (SplitText) {
            const split = new SplitText(element, {
              type: "lines",
              autoSplit: true
            });
            splits.push(split);
            animations.push(
              gsap.fromTo(
                split.lines,
                { yPercent: 82, autoAlpha: 0 },
                {
                  yPercent: 0,
                  autoAlpha: 1,
                  stagger: 0.08,
                  ease: "expo.out",
                  scrollTrigger: textScrollTrigger(element)
                }
              )
            );
          } else {
            animations.push(
              gsap.fromTo(
                element,
                { y: 24, autoAlpha: 0 },
                {
                  y: 0,
                  autoAlpha: 1,
                  ease: "power3.out",
                  scrollTrigger: textScrollTrigger(element)
                }
              )
            );
          }
        });
      }

      run();

      return () => {
        alive = false;
        animations.forEach((animation) => animation.kill());
        splits.forEach((split) => split.revert());
      };
    }
  );

  return null;
}
