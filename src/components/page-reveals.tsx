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
        const ruleElements = gsap.utils.toArray<HTMLElement>("[data-rule]");
        const homepageSections = gsap.utils.toArray<HTMLElement>(".home-4b > section");

        gsap.set([...revealElements, ...splitElements, ...ctaButtons], { autoAlpha: 1, y: 0, yPercent: 0 });
        gsap.set(ruleElements, { scaleX: 1, transformOrigin: "left center" });

        if (reduce) {
          gsap.set([...revealElements, ...splitElements, ...ctaButtons], { opacity: 1, y: 0, clipPath: "none" });
          gsap.set(ruleElements, { scaleX: 1 });
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

        const openingSection = document.querySelector<HTMLElement>(".opening-argument-section");
        const openingTop = openingSection?.querySelector<HTMLElement>(".opening-argument-top");
        const openingOutcome = openingSection?.querySelector<HTMLElement>(".opening-outcome-block");

        if (openingSection && openingTop && openingOutcome) {
          const openingHeadline = openingSection.querySelector<HTMLElement>(".opening-argument-headline");
          const openingHeadlineTargets = openingHeadline
            ? (splits.find((item) => item.element === openingHeadline)?.inners ?? [openingHeadline])
            : [];
          const openingQualifier = openingSection.querySelector<HTMLElement>(".opening-argument-qualifier");
          const openingSetup = openingSection.querySelector<HTMLElement>(".opening-outcome-setup");
          const openingOutcomeSupport = gsap.utils.toArray<HTMLElement>(
            openingSection.querySelectorAll("[data-outcome-support]")
          );
          const openingOutcomeEmphasis = openingSection.querySelector<HTMLElement>("[data-outcome-emphasis]");
          const pinOpeningSequence = window.matchMedia("(min-width: 768px)").matches;

          if (openingHeadlineTargets.length) {
            gsap.set(openingHeadlineTargets, { yPercent: 108, autoAlpha: 0.001 });
          }
          if (openingQualifier) {
            gsap.set(openingQualifier, { y: 12, autoAlpha: 0.001 });
          }
          if (openingSetup) {
            gsap.set(openingSetup, { y: 22, autoAlpha: 0.001 });
          }
          if (openingOutcomeSupport.length) {
            gsap.set(openingOutcomeSupport, { y: 18, autoAlpha: 0.001 });
          }
          if (openingOutcomeEmphasis) {
            gsap.set(openingOutcomeEmphasis, { y: 16, autoAlpha: 0.001 });
          }

          const openingStoryTimeline = gsap.timeline({ paused: true });
          animations.push(openingStoryTimeline);

          if (openingHeadlineTargets.length) {
            openingStoryTimeline.fromTo(
              openingHeadlineTargets,
              { yPercent: 108, autoAlpha: 0.001 },
              {
                yPercent: 0,
                autoAlpha: 1,
                duration: 0.95,
                stagger: 0.09,
                ease: "expo.out",
                overwrite: "auto"
              },
              0
            );
          }

          if (openingQualifier) {
            openingStoryTimeline.fromTo(
              openingQualifier,
              { y: 12, autoAlpha: 0.001 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.52,
                ease: "power3.out",
                overwrite: "auto"
              },
              openingHeadlineTargets.length ? 0.82 : 0
            );
          }

          if (openingSetup) {
            openingStoryTimeline.to(
              openingTop,
              {
                yPercent: -4,
                autoAlpha: 0.32,
                duration: 0.72,
                ease: "power2.out",
                overwrite: "auto"
              },
              1.42
            );

            openingStoryTimeline.fromTo(
              openingSetup,
              { y: 22, autoAlpha: 0.001 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.78,
                ease: "power3.out",
                overwrite: "auto"
              },
              1.72
            );
          }

          if (openingOutcomeSupport.length) {
            openingStoryTimeline.fromTo(
              openingOutcomeSupport,
              { y: 18, autoAlpha: 0.001 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.78,
                stagger: 0.16,
                ease: "power3.out",
                overwrite: "auto"
              },
              2.22
            );
          }

          if (openingOutcomeEmphasis) {
            openingStoryTimeline.fromTo(
              openingOutcomeEmphasis,
              { y: 16, autoAlpha: 0.001 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.84,
                ease: "power3.out",
                overwrite: "auto"
              },
              openingOutcomeSupport.length ? 3 : 2.38
            );
          }

          openingStoryTimeline.to({}, { duration: 2.1 });

          triggers.push(
            ScrollTrigger.create({
              trigger: openingSection,
              start: pinOpeningSequence ? "top top+=64" : "top 72%",
              end: pinOpeningSequence ? "+=285%" : "bottom 18%",
              animation: openingStoryTimeline,
              scrub: pinOpeningSequence ? 1.05 : 0.9,
              pin: pinOpeningSequence,
              pinSpacing: pinOpeningSequence,
              anticipatePin: pinOpeningSequence ? 1 : 0,
              invalidateOnRefresh: true
            })
          );
        }

        homepageSections.forEach((section) => {
          if (section === openingSection) return;

          const labelTargets = gsap.utils.toArray<HTMLElement>(
            section.querySelectorAll("[data-motion='label'], .eyebrow, .opening-argument-qualifier, .home-cta-brand")
          );
          const sourceTargets = gsap.utils.toArray<HTMLElement>(
            section.querySelectorAll("[data-motion='source']")
          );
          const evidenceTargets = gsap.utils.toArray<HTMLElement>(
            section.querySelectorAll("[data-motion='evidence']")
          );
          const closeTargets = gsap.utils.toArray<HTMLElement>(
            section.querySelectorAll("[data-motion='close']")
          );
          const emphasisTargets = gsap.utils.toArray<HTMLElement>(
            section.querySelectorAll("[data-motion='emphasis']")
          );
          const ruleTargets = gsap.utils.toArray<HTMLElement>(section.querySelectorAll("[data-rule]"));
          const sectionRevealElements = gsap.utils.toArray<HTMLElement>(section.querySelectorAll("[data-reveal]"));
          const reservedTargets = new Set([
            ...labelTargets,
            ...sourceTargets,
            ...evidenceTargets,
            ...closeTargets,
            ...emphasisTargets
          ]);
          const bodyTargets = sectionRevealElements.filter((element) => !reservedTargets.has(element));
          const splitTargets = gsap.utils
            .toArray<HTMLElement>(section.querySelectorAll("[data-split]"))
            .flatMap((element) => {
              const split = splits.find((item) => item.element === element);
              return split?.inners.length ? split.inners : [element];
            });
          const triggerTarget =
            section.querySelector<HTMLElement>("[data-motion='label'], [data-split], [data-reveal]") ?? section;
          if (!labelTargets.length && !splitTargets.length && !bodyTargets.length) return;

          if (labelTargets.length) gsap.set(labelTargets, { y: 16, autoAlpha: 0.001 });
          if (splitTargets.length) gsap.set(splitTargets, { yPercent: 110, autoAlpha: 0.001 });
          if (evidenceTargets.length) gsap.set(evidenceTargets, { y: 18, autoAlpha: 0.001 });
          if (bodyTargets.length) gsap.set(bodyTargets, { y: 22, autoAlpha: 0.001 });
          if (emphasisTargets.length) gsap.set(emphasisTargets, { y: 18, autoAlpha: 0.001 });
          if (sourceTargets.length) gsap.set(sourceTargets, { y: 10, autoAlpha: 0.001 });
          if (ruleTargets.length) gsap.set(ruleTargets, { scaleX: 0 });
          if (closeTargets.length) gsap.set(closeTargets, { y: 16, autoAlpha: 0.001 });

          const timeline = gsap.timeline({ paused: true });
          animations.push(timeline);

          if (labelTargets.length) {
            timeline.fromTo(
              labelTargets,
              { y: 16, autoAlpha: 0.001 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.3,
                stagger: 0.045,
                ease: "power3.out",
                overwrite: "auto"
              },
              0
            );
          }

          if (splitTargets.length) {
            timeline.fromTo(
              splitTargets,
              { yPercent: 110, autoAlpha: 0.001 },
              {
                yPercent: 0,
                autoAlpha: 1,
                duration: 0.86,
                stagger: 0.075,
                ease: "expo.out",
                overwrite: "auto"
              },
              labelTargets.length ? 0.12 : 0
            );
          }

          if (evidenceTargets.length) {
            timeline.fromTo(
              evidenceTargets,
              { y: 18, autoAlpha: 0.001 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.68,
                stagger: 0.075,
                ease: "power3.out",
                overwrite: "auto"
              },
              splitTargets.length ? 0.42 : 0.18
            );
          }

          if (bodyTargets.length) {
            timeline.fromTo(
              bodyTargets,
              { y: 22, autoAlpha: 0.001 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.62,
                stagger: 0.085,
                ease: "power3.out",
                overwrite: "auto"
              },
              evidenceTargets.length ? 0.7 : splitTargets.length ? 0.46 : 0.16
            );
          }

          if (emphasisTargets.length) {
            timeline.fromTo(
              emphasisTargets,
              { y: 18, autoAlpha: 0.001 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.74,
                stagger: 0.12,
                ease: "power3.out",
                overwrite: "auto"
              },
              bodyTargets.length ? 0.96 : splitTargets.length ? 0.72 : 0.28
            );
          }

          if (sourceTargets.length) {
            timeline.fromTo(
              sourceTargets,
              { y: 10, autoAlpha: 0.001 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.34,
                stagger: 0.03,
                ease: "power3.out",
                overwrite: "auto"
              },
              evidenceTargets.length ? 0.86 : 0.48
            );
          }

          if (ruleTargets.length) {
            timeline.fromTo(
              ruleTargets,
              { scaleX: 0 },
              {
                scaleX: 1,
                duration: 0.62,
                ease: "power3.out",
                overwrite: "auto"
              },
              sourceTargets.length ? 1.02 : 0.74
            );
          }

          if (closeTargets.length) {
            timeline.fromTo(
              closeTargets,
              { y: 16, autoAlpha: 0.001 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.76,
                stagger: 0.08,
                ease: "power3.out",
                overwrite: "auto"
              },
              ruleTargets.length ? 1.14 : emphasisTargets.length ? 1.08 : 0.78
            );
          }

          triggers.push(
            ScrollTrigger.create({
              trigger: triggerTarget,
              start: "top 76%",
              end: "top 34%",
              animation: timeline,
              scrub: 0.9,
              invalidateOnRefresh: true
            })
          );
        });

        ctaButtons.forEach((element) => {
          triggers.push(
            ScrollTrigger.create({
              trigger: element,
              start: "top 82%",
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
