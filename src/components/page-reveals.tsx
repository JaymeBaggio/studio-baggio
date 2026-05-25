"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type SplitTextInstance = {
  element: HTMLElement;
  originalHTML: string;
  inners: HTMLElement[];
  revert: () => void;
};

function splitElementIntoLines(element: HTMLElement): SplitTextInstance | null {
  const originalHTML = element.innerHTML;
  const text = element.textContent?.replace(/\s+/g, " ").trim();

  if (!text) return null;

  element.setAttribute("aria-label", text);
  element.replaceChildren();

  const words = text.split(" ");
  const measureFragment = document.createDocumentFragment();

  words.forEach((word, index) => {
    const span = document.createElement("span");
    span.className = "split-measure-word";
    span.textContent = index === words.length - 1 ? word : `${word} `;
    measureFragment.appendChild(span);
  });

  element.appendChild(measureFragment);

  const wordNodes = Array.from(element.querySelectorAll<HTMLElement>(".split-measure-word"));
  const groups: string[][] = [];
  let currentTop: number | null = null;
  let currentWords: string[] = [];

  wordNodes.forEach((wordNode) => {
    const top = Math.round(wordNode.getBoundingClientRect().top);
    const word = wordNode.textContent?.trim();
    if (!word) return;

    if (currentTop === null || Math.abs(top - currentTop) <= 2) {
      currentTop = currentTop ?? top;
      currentWords.push(word);
      return;
    }

    groups.push(currentWords);
    currentWords = [word];
    currentTop = top;
  });

  if (currentWords.length) {
    groups.push(currentWords);
  }

  element.replaceChildren();

  const inners: HTMLElement[] = [];
  const finalFragment = document.createDocumentFragment();

  groups.forEach((lineWords) => {
    const line = document.createElement("span");
    const inner = document.createElement("span");

    line.className = "split-line";
    inner.className = "split-line-inner";
    inner.textContent = lineWords.join(" ");

    line.appendChild(inner);
    finalFragment.appendChild(line);
    inners.push(inner);
  });

  element.appendChild(finalFragment);

  return {
    element,
    originalHTML,
    inners,
    revert: () => {
      element.innerHTML = originalHTML;
    }
  };
}

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
        const ctaButtons = gsap.utils.toArray<HTMLElement>("[data-cta-button]");

        gsap.set([...revealElements, ...splitElements, ...ctaButtons], { autoAlpha: 1, y: 0, yPercent: 0 });

        if (reduce) {
          gsap.set([...revealElements, ...splitElements, ...ctaButtons], { opacity: 1, y: 0, clipPath: "none" });
          return;
        }

        splitElements.forEach((element) => {
          const split = splitElementIntoLines(element);
          if (split) splits.push(split);
        });

        ScrollTrigger.refresh();

        const heroTimeline = gsap.timeline();
        animations.push(heroTimeline);

        if (heroMeta.length) {
          heroTimeline.from(heroMeta, {
            y: 14,
            opacity: 0,
            duration: 0.48,
            stagger: 0.055,
            ease: "power3.out"
          }, 0.08);
        }

        if (heroLines.length) {
          heroTimeline.from(heroLines, {
            yPercent: 110,
            opacity: 0,
            duration: 0.72,
            stagger: 0.075,
            ease: "expo.out"
          }, 0.22);
        }

        if (heroPromise.length) {
          heroTimeline.from(heroPromise, {
            y: 10,
            opacity: 0,
            duration: 0.46,
            stagger: 0.055,
            ease: "power2.out"
          }, 0.64);
        }

        revealElements.forEach((element) => {
          triggers.push(
            ScrollTrigger.create({
              trigger: element,
              start: "top 97%",
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
                      duration: 0.4,
                      ease: "power3.out",
                      overwrite: "auto"
                    }
                  )
                );
              }
            })
          );
        });

        splitElements.forEach((element) => {
          const split = splits.find((item) => item.element === element);
          const targets = split?.inners.length ? split.inners : [element];

          triggers.push(
            ScrollTrigger.create({
              trigger: element,
              start: "top 95%",
              once: true,
              fastScrollEnd: true,
              onEnter: () => {
                animations.push(
                  gsap.fromTo(
                    targets,
                    { yPercent: 112, autoAlpha: 0.001 },
                    {
                      yPercent: 0,
                      autoAlpha: 1,
                      duration: 0.58,
                      stagger: 0.04,
                      ease: "expo.out",
                      overwrite: "auto"
                    }
                  )
                );
              }
            })
          );
        });

        ctaButtons.forEach((element) => {
          triggers.push(
            ScrollTrigger.create({
              trigger: element,
              start: "top 96%",
              once: true,
              onEnter: () => {
                const borderTarget = element.querySelector("a > span") ?? element;
                animations.push(
                  gsap.fromTo(
                    borderTarget,
                    { "--cta-scale": 0, autoAlpha: 0.001, y: 12 },
                    {
                      "--cta-scale": 1,
                      autoAlpha: 1,
                      y: 0,
                      duration: 0.46,
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
