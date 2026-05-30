"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger, CustomEase);

const editorialOut = CustomEase.create("studioEditorialOut", "M0,0 C0.16,0.82 0.34,1 1,1");
const scanOut = CustomEase.create("studioScanOut", "M0,0 C0.18,0.18 0.22,1 1,1");

type SplitRecord = {
  element: HTMLElement;
  originalHTML: string;
  targets: HTMLElement[];
  revert: () => void;
};

function splitIntoLines(element: HTMLElement): SplitRecord | null {
  const originalHTML = element.innerHTML;
  const text = element.textContent?.replace(/\s+/g, " ").trim();

  if (!text) return null;

  element.setAttribute("aria-label", text);
  element.replaceChildren();

  const words = text.split(" ");
  const measure = document.createDocumentFragment();

  words.forEach((word, index) => {
    const span = document.createElement("span");
    span.className = "split-measure-word";
    span.textContent = index === words.length - 1 ? word : `${word} `;
    measure.appendChild(span);
  });

  element.appendChild(measure);

  const wordNodes = Array.from(element.querySelectorAll<HTMLElement>(".split-measure-word"));
  const lines: string[][] = [];
  let currentTop: number | null = null;
  let currentWords: string[] = [];

  wordNodes.forEach((wordNode) => {
    const word = wordNode.textContent?.trim();
    if (!word) return;

    const top = Math.round(wordNode.getBoundingClientRect().top);
    if (currentTop === null || Math.abs(top - currentTop) <= 2) {
      currentTop = currentTop ?? top;
      currentWords.push(word);
      return;
    }

    lines.push(currentWords);
    currentWords = [word];
    currentTop = top;
  });

  if (currentWords.length) lines.push(currentWords);

  element.replaceChildren();

  const targets: HTMLElement[] = [];
  const rendered = document.createDocumentFragment();

  lines.forEach((lineWords) => {
    const line = document.createElement("span");
    const inner = document.createElement("span");
    line.className = "split-line";
    inner.className = "split-line-inner";
    inner.textContent = lineWords.join(" ");
    line.appendChild(inner);
    rendered.appendChild(line);
    targets.push(inner);
  });

  element.appendChild(rendered);

  return {
    element,
    originalHTML,
    targets,
    revert: () => {
      element.innerHTML = originalHTML;
      element.removeAttribute("aria-label");
    }
  };
}

export function PageReveals() {
  useGSAP(() => {
    let active = true;
    let media: ReturnType<typeof gsap.matchMedia> | null = null;
    let refreshFrame = 0;
    const splitRecords: SplitRecord[] = [];
    const playedTimelines: gsap.core.Timeline[] = [];
    const countTweens: gsap.core.Tween[] = [];

    const run = async () => {
      await document.fonts?.ready;
      if (!active) return;

      const homeRoot = document.querySelector<HTMLElement>(".home-4b");
      if (!homeRoot) return;

      const splitElements = Array.from(homeRoot.querySelectorAll<HTMLElement>("[data-split]"));
      splitElements.forEach((element) => {
        const split = splitIntoLines(element);
        if (split) splitRecords.push(split);
      });

      media = gsap.matchMedia();

      media.add(
        {
          isDesktop: "(min-width: 1024px)",
          isMobile: "(max-width: 1023px)",
          reduceMotion: "(prefers-reduced-motion: reduce)"
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions as {
            isDesktop: boolean;
            isMobile: boolean;
            reduceMotion: boolean;
          };

          const revealElements = Array.from(
            homeRoot.querySelectorAll<HTMLElement>("[data-reveal], [data-cta-button]")
          );
          const statValues = Array.from(homeRoot.querySelectorAll<HTMLElement>("[data-gap-stat-value]"));

          const setFinalNumbers = () => {
            countTweens.splice(0).forEach((tween) => tween.kill());
            statValues.forEach((element) => {
              const target = element.dataset.countTarget;
              if (target) element.textContent = `${target}%`;
            });
          };

          if (reduceMotion) {
            gsap.set([...revealElements, ...splitRecords.flatMap((split) => split.targets)], {
              autoAlpha: 1,
              y: 0,
              yPercent: 0,
              clearProps: "transform"
            });
            setFinalNumbers();
            return;
          }

          const targetsFor = (element: HTMLElement | null) => {
            if (!element) return [];
            return splitRecords.find((split) => split.element === element)?.targets ?? [element];
          };

          const prepareRise = (targets: gsap.TweenTarget, y = 14, autoAlpha = 0.001) => {
            gsap.set(targets, { y, autoAlpha });
          };

          const prepareLines = (targets: HTMLElement[]) => {
            if (targets.length) gsap.set(targets, { yPercent: 106, autoAlpha: 0.001 });
          };

          const prepareScan = (
            targets: gsap.TweenTarget,
            {
              x = 18,
              blur = 10,
              scale = 1
            }: { x?: number; blur?: number; scale?: number } = {}
          ) => {
            gsap.set(targets, {
              x,
              scale,
              autoAlpha: 0.001,
              filter: `blur(${blur}px)`,
              clipPath: "inset(0 100% 0 0)",
              transformOrigin: "50% 50%",
              willChange: "transform, opacity, filter, clip-path"
            });
          };

          const revealRise = (
            timeline: gsap.core.Timeline,
            targets: gsap.TweenTarget,
            position: gsap.Position,
            vars: gsap.TweenVars = {}
          ) => {
            timeline.to(
              targets,
              {
                y: 0,
                autoAlpha: 1,
                duration: 1.08,
                ease: editorialOut,
                overwrite: "auto",
                ...vars
	              },
	              position
	            );
	          };

          const revealRiseFromHidden = (
            timeline: gsap.core.Timeline,
            targets: gsap.TweenTarget,
            position: gsap.Position,
            vars: gsap.TweenVars = {}
          ) => {
            timeline.to(
              targets,
              {
                y: 0,
                autoAlpha: 1,
                duration: 1.16,
                ease: editorialOut,
                overwrite: "auto",
                ...vars
              },
              position
            );
          };

          const revealLines = (
            timeline: gsap.core.Timeline,
            targets: HTMLElement[],
            position: gsap.Position,
            stagger = 0.085
          ) => {
            if (!targets.length) return;
            timeline.to(
              targets,
              {
                yPercent: 0,
                autoAlpha: 1,
                duration: 1.18,
                stagger,
                ease: editorialOut,
                overwrite: "auto"
              },
              position
            );
          };

          const revealScan = (
            timeline: gsap.core.Timeline,
            targets: gsap.TweenTarget,
            position: gsap.Position,
            vars: gsap.TweenVars = {}
          ) => {
            timeline.to(
              targets,
              {
                x: 0,
                scale: 1,
                autoAlpha: 1,
                filter: "blur(0px)",
                clipPath: "inset(0 0% 0 0)",
                duration: 1.34,
                ease: scanOut,
                overwrite: "auto",
                ...vars
              },
              position
            );
          };

          const sectionStart = isDesktop ? "top 76%" : "top 84%";
          const stickyStoryStart = isDesktop ? "top 12%" : "top 10%";
          const gapStoryStart = isDesktop ? "top 64%" : "top 70%";

          const playOnApproach = (
            timeline: gsap.core.Timeline,
            section: HTMLElement,
            id: string,
            start = sectionStart
          ) => {
            playedTimelines.push(timeline);
            timeline.pause();
            ScrollTrigger.create({
              id,
              trigger: section,
              start,
              once: true,
              onEnter: () => timeline.play(0),
              invalidateOnRefresh: true
            });
          };

          let gapCounted = false;
          const countGapNumbers = () => {
            if (gapCounted) return;
            gapCounted = true;

            statValues.forEach((element, index) => {
              const target = Number(element.dataset.countTarget ?? 0);
              const state = { value: 0 };
              element.textContent = "0%";

              const tween = gsap.to(state, {
                value: target,
                duration: 1.55,
                delay: index * 0.08,
                ease: "power2.out",
                onUpdate: () => {
                  element.textContent = `${Math.round(state.value)}%`;
                },
                onComplete: () => {
                  element.textContent = `${target}%`;
                }
              });

              countTweens.push(tween);
            });
          };

          const sections = Array.from(homeRoot.querySelectorAll<HTMLElement>("[data-home-section]"));

          sections.forEach((section) => {
            const type = section.dataset.motionSection;

            if (type === "opening") {
              const top = section.querySelector<HTMLElement>(".opening-argument-top");
              const headline = section.querySelector<HTMLElement>(".opening-argument-headline");
              const qualifier = section.querySelector<HTMLElement>(".opening-argument-qualifier");
              const setup = section.querySelector<HTMLElement>(".opening-outcome-setup");
              const support = Array.from(section.querySelectorAll<HTMLElement>("[data-outcome-support]"));
              const emphasis = section.querySelector<HTMLElement>("[data-outcome-emphasis]");
              const headlineTargets = targetsFor(headline);
              const setupTargets = targetsFor(setup);

              prepareScan(headlineTargets, { x: 24, blur: 12 });
              if (qualifier) prepareScan(qualifier, { x: 14, blur: 6 });
              if (setupTargets.length) prepareScan(setupTargets, { x: 18, blur: 8 });
              if (support.length) prepareScan(support, { x: 16, blur: 8, scale: 0.992 });
              if (emphasis) prepareScan(emphasis, { x: 22, blur: 10, scale: 0.985 });

              const opening = gsap.timeline({
                defaults: { ease: editorialOut },
                scrollTrigger: {
                  id: "studio-opening-story",
                  trigger: section,
                  start: stickyStoryStart,
                  end: "bottom bottom",
                  scrub: isDesktop ? 1.85 : 1.45,
                  invalidateOnRefresh: true
                }
              });

              revealScan(opening, headlineTargets, 0, { duration: 2.35, stagger: 0.42 });
              if (qualifier) revealScan(opening, qualifier, 0.92, { duration: 1.64 });
              opening.to({}, { duration: 1.32 }, 1.8);
              if (top) opening.to(top, { autoAlpha: 0.28, duration: 1.95 }, 2.58);
              if (setupTargets.length) {
                revealScan(opening, setupTargets, 3.36, { duration: 2.24, stagger: 0.28 });
              }
              support.forEach((item, index) => {
                revealScan(opening, item, 6.12 + index * 2.82, { duration: 2.18 });
              });
              if (emphasis) {
                revealScan(opening, emphasis, 15.55, { duration: 2.55, scale: isDesktop ? 1.045 : 1.025 });
                opening.to(emphasis, { scale: 1, duration: 1.28, ease: editorialOut }, 17.86);
              }
              opening.to({}, { duration: 3.8 });
              return;
            }

            if (type === "gap") {
              const label = section.querySelector<HTMLElement>("[data-motion='label']");
              const title = section.querySelector<HTMLElement>(".problem-clarifier-title");
              const evidenceGrid = section.querySelector<HTMLElement>("[data-motion='evidence']");
              const stats = Array.from(section.querySelectorAll<HTMLElement>("[data-gap-stat-card]"));
              const close = section.querySelector<HTMLElement>("[data-motion='close']");
              const titleTargets = targetsFor(title);

              if (label) prepareRise(label, 10);
              prepareLines(titleTargets);
              if (evidenceGrid) prepareRise(evidenceGrid, 0);
              if (stats.length) prepareRise(stats, 16);
              if (close) prepareRise(close, 12);

              const evidence = gsap.timeline({
                defaults: { ease: editorialOut },
                scrollTrigger: {
                  id: "studio-gap-story",
                  trigger: section,
                  start: gapStoryStart,
                  end: "bottom bottom",
                  scrub: isDesktop ? 1.02 : 0.82,
                  invalidateOnRefresh: true,
                  onLeave: setFinalNumbers
                }
              });
              if (label) revealRise(evidence, label, 0, { duration: 0.9 });
              revealLines(evidence, titleTargets, label ? 0.2 : 0, 0.07);
              evidence.to({}, { duration: 0.46 }, 0.92);
              if (evidenceGrid) revealRise(evidence, evidenceGrid, 1.2, { duration: 0.52 });
              if (stats.length) revealRise(evidence, stats, 1.38, { duration: 1.05, stagger: 0.12 });
              evidence.call(countGapNumbers, [], 1.62);
              if (close) revealRise(evidence, close, 2.58, { duration: 0.95 });
              evidence.to({}, { duration: 1.0 });
              return;
            }

            if (type === "input-map") {
              const label = section.querySelector<HTMLElement>("[data-motion='label']");
              const bridge = section.querySelector<HTMLElement>(".bt-input-map-bridge");
              const cards = Array.from(section.querySelectorAll<HTMLElement>(".bt-input-map-card"));

              if (label) prepareRise(label, 10);
              if (bridge) prepareRise(bridge, 14);
              if (cards.length) prepareRise(cards, 10);

              const reveal = gsap.timeline({
                defaults: { ease: editorialOut }
              });

              if (label) revealRise(reveal, label, 0, { duration: 0.82 });
              if (bridge) revealRiseFromHidden(reveal, bridge, label ? 0.16 : 0, { duration: 0.96 });
              if (cards.length) {
                revealRiseFromHidden(reveal, cards, bridge ? 0.48 : 0.18, {
                  duration: 0.92,
                  stagger: 0.16
                });
              }

              playOnApproach(reveal, section, "studio-business-tracker-input-map-reveal");
              return;
            }

            const title = section.querySelector<HTMLElement>("[data-split]");
            const titleTargets = targetsFor(title);
            const revealTargets = Array.from(
              section.querySelectorAll<HTMLElement>("[data-reveal], [data-cta-button]")
            );

            prepareLines(titleTargets);
            if (revealTargets.length) prepareRise(revealTargets, type === "value" ? 18 : 22);

            const label = section.querySelector<HTMLElement>("[data-motion='label']");
            const emphasis = Array.from(section.querySelectorAll<HTMLElement>("[data-motion='emphasis']"));
            const bodyTargets = revealTargets.filter((target) => target !== label && !emphasis.includes(target));
            const reveal = gsap.timeline({
              defaults: { ease: editorialOut }
            });

            if (label) revealRise(reveal, label, 0, { duration: 0.86 });
            revealLines(reveal, titleTargets, label ? 0.16 : 0, 0.065);

            if (type === "offer") {
              const rows = Array.from(section.querySelectorAll<HTMLElement>(".commercial-deliverable-row"));
              const intro = bodyTargets.filter((target) => !rows.includes(target));
              if (intro.length) {
                revealRiseFromHidden(reveal, intro, titleTargets.length ? 0.5 : 0.18, {
                  duration: 0.95,
                  stagger: 0.1
                });
              }
              if (rows.length) revealRiseFromHidden(reveal, rows, 0.78, { duration: 0.95, stagger: 0.075 });
            } else if (type === "promise") {
              if (bodyTargets.length) {
                revealRiseFromHidden(reveal, bodyTargets, titleTargets.length ? 0.52 : 0.18, {
                  duration: 0.98,
                  stagger: 0.14
                });
              }
              if (emphasis.length) revealRiseFromHidden(reveal, emphasis, 1.02, { duration: 0.98, stagger: 0.1 });
            } else if (type === "proof") {
              if (bodyTargets.length) {
                revealRiseFromHidden(reveal, bodyTargets, titleTargets.length ? 0.5 : 0.18, {
                  duration: 0.95,
                  stagger: 0.11
                });
              }
            } else if (type === "fit") {
              if (bodyTargets.length) {
                revealRiseFromHidden(reveal, bodyTargets, titleTargets.length ? 0.46 : 0.16, {
                  duration: 0.98,
                  stagger: 0.14
                });
              }
            } else if (type === "faq") {
              if (bodyTargets.length) {
                revealRiseFromHidden(reveal, bodyTargets, label ? 0.28 : 0, {
                  duration: 0.88,
                  stagger: 0.085
                });
              }
            } else if (type === "cta") {
              const ctaButton = section.querySelector<HTMLElement>("[data-cta-button]");
              const brand = section.querySelector<HTMLElement>(".home-cta-brand");
              const intro = bodyTargets.filter((target) => target !== ctaButton && target !== brand);
              if (intro.length) {
                revealRiseFromHidden(reveal, intro, titleTargets.length ? 0.5 : 0.18, {
                  duration: 0.92,
                  stagger: 0.1
                });
              }
              if (ctaButton) revealRiseFromHidden(reveal, ctaButton, 0.7, { duration: 0.9 });
              if (brand) revealRiseFromHidden(reveal, brand, 0.94, { duration: 0.88 });
            } else if (bodyTargets.length) {
              revealRiseFromHidden(reveal, bodyTargets, titleTargets.length ? 0.36 : 0.12, {
                duration: type === "value" ? 0.95 : 1.02,
                stagger: type === "value" ? 0.08 : 0.1
              });
            }

            playOnApproach(reveal, section, `studio-${type ?? "section"}-reveal`);
          });

          refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
        }
      );
    };

    run();

    return () => {
      active = false;
      if (refreshFrame) cancelAnimationFrame(refreshFrame);
      media?.revert();
      countTweens.forEach((tween) => tween.kill());
      playedTimelines.forEach((timeline) => timeline.kill());
      splitRecords.forEach((split) => split.revert());
    };
  });

  return null;
}
