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
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      async function run() {
        await document.fonts?.ready;
        if (!alive) return;

        let SplitText: SplitTextConstructor | null = null;
        try {
          SplitText = (await import("gsap/SplitText")).SplitText;
          gsap.registerPlugin(SplitText);
        } catch {
          SplitText = null;
        }

        const heroLines = gsap.utils.toArray<HTMLElement>("[data-hero-line]");
        const heroMeta = gsap.utils.toArray<HTMLElement>("[data-hero-meta]");
        const heroPin = document.querySelector<HTMLElement>(".hero-pin");
        const revealElements = gsap.utils.toArray<HTMLElement>("[data-reveal]");
        const splitElements = gsap.utils.toArray<HTMLElement>("[data-split]");
        const stickySections = gsap.utils.toArray<HTMLElement>("[data-sticky-section]");

        if (reduce) {
          gsap.set([...revealElements, ...splitElements], { opacity: 1, y: 0 });
          return;
        }

        if (heroLines.length) {
          gsap.from(heroLines, {
            yPercent: 110,
            opacity: 0,
            duration: 0.85,
            stagger: 0.08,
            ease: "expo.out"
          });
        }

        if (heroMeta.length) {
          gsap.from(heroMeta, {
            y: 18,
            opacity: 0,
            duration: 0.7,
            delay: 0.35,
            stagger: 0.08,
            ease: "power3.out"
          });
        }

        if (heroPin && window.innerWidth >= 960) {
          ScrollTrigger.create({
            trigger: heroPin,
            start: "top top",
            end: "+=42%",
            pin: true,
            pinSpacing: true
          });
        }

        if (window.innerWidth >= 900) {
          stickySections.forEach((section) => {
            ScrollTrigger.create({
              trigger: section,
              start: "top top",
              end: () => `+=${Math.round(window.innerHeight * 1.15)}`,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true
            });
          });
        }

        revealElements.forEach((element) => {
          gsap.from(element, {
            y: 18,
            opacity: 0,
            duration: 0.45,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 110%",
              fastScrollEnd: true,
              once: true
            }
          });
        });

        splitElements.forEach((element) => {
          if (SplitText) {
            const split = new SplitText(element, {
              type: "lines",
              mask: "lines",
              autoSplit: true
            });
            splits.push(split);
            gsap.from(split.lines, {
              yPercent: 70,
              opacity: 0,
              duration: 0.52,
              stagger: 0.045,
              ease: "expo.out",
              scrollTrigger: {
                trigger: element,
                start: "top 110%",
                fastScrollEnd: true,
                once: true
              }
            });
          } else {
            gsap.from(element, {
              y: 16,
              opacity: 0,
              duration: 0.5,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 110%",
                fastScrollEnd: true,
                once: true
              }
            });
          }
        });
      }

      run();

      return () => {
        alive = false;
        splits.forEach((split) => split.revert());
      };
    }
  );

  return null;
}
