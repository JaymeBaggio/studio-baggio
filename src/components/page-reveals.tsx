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

        const heroLines = gsap.utils.toArray<HTMLElement>("[data-hero-line]");
        const heroMeta = gsap.utils.toArray<HTMLElement>("[data-hero-meta]");
        const heroPromise = gsap.utils.toArray<HTMLElement>("[data-hero-promise]");
        const revealElements = gsap.utils.toArray<HTMLElement>("[data-reveal]");
        const splitElements = gsap.utils.toArray<HTMLElement>("[data-split]");
        const scrollRevealElements = [...revealElements, ...splitElements];

        gsap.set(scrollRevealElements, { autoAlpha: 1, y: 0, yPercent: 0 });

        if (reduce) {
          gsap.set(scrollRevealElements, { opacity: 1, y: 0 });
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

        scrollRevealElements.forEach((element) => {
          triggers.push(
            ScrollTrigger.create({
              trigger: element,
              start: "top 98%",
              once: true,
              fastScrollEnd: true,
              onEnter: () => {
                animations.push(
                  gsap.fromTo(
                    element,
                    { y: 18, autoAlpha: 0.001 },
                    {
                      y: 0,
                      autoAlpha: 1,
                      duration: element.hasAttribute("data-split") ? 0.72 : 0.52,
                      ease: "power3.out",
                      overwrite: "auto"
                    }
                  )
                );
              }
            })
          );
        });
      }

      run();

      return () => {
        alive = false;
        triggers.forEach((trigger) => trigger.kill());
        animations.forEach((animation) => animation.kill());
        splits.forEach((split) => split.revert());
      };
    }
  );

  return null;
}
