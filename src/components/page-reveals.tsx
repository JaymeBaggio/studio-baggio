"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type SplitTextInstance = {
  words: Element[];
  revert: () => void;
};

type SplitTextConstructor = new (
  target: Element | Element[] | string,
  vars?: Record<string, unknown>
) => SplitTextInstance;

export function PageReveals() {
  const scope = useRef<HTMLDivElement>(null);

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

        if (reduce) {
          gsap.set("[data-reveal], [data-split]", { opacity: 1, y: 0 });
          return;
        }

        gsap.from("[data-hero-line]", {
          yPercent: 110,
          opacity: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: "expo.out"
        });

        gsap.from("[data-hero-meta]", {
          y: 18,
          opacity: 0,
          duration: 0.7,
          delay: 0.35,
          stagger: 0.08,
          ease: "power3.out"
        });

        if (window.innerWidth >= 960) {
          ScrollTrigger.create({
            trigger: ".hero-pin",
            start: "top top",
            end: "+=42%",
            pin: true,
            pinSpacing: true
          });
        }

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.from(element, {
            y: 34,
            opacity: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
              once: true
            }
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((element) => {
          if (SplitText) {
            const split = new SplitText(element, {
              type: "lines, words",
              mask: "lines",
              autoSplit: true
            });
            splits.push(split);
            gsap.from(split.words, {
              yPercent: 105,
              opacity: 0,
              duration: 0.85,
              stagger: 0.025,
              ease: "expo.out",
              scrollTrigger: {
                trigger: element,
                start: "top 82%",
                once: true
              }
            });
          } else {
            gsap.from(element, {
              y: 24,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 82%",
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
    },
    { scope }
  );

  return <div ref={scope} aria-hidden="true" />;
}
