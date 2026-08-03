"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

gsap.registerPlugin(useGSAP, ScrollTrigger, CustomEase);

const researchEditorialEase =
  CustomEase.get("studioEditorialOut") ??
  CustomEase.create("studioEditorialOut", "M0,0 C0.16,0.82 0.34,1 1,1");

const selectAll = (root: ParentNode, selector: string) =>
  Array.from(root.querySelectorAll<HTMLElement>(selector));

/**
 * A DOM-driven motion layer for the benchmark page. Keeping the selectors on
 * data attributes lets the research route remain server-rendered and keeps the
 * evidence UI usable when JavaScript is unavailable.
 */
export function ResearchPageMotion() {
  const pathname = usePathname();

  useGSAP(() => {
    const root = document.querySelector<HTMLElement>("[data-research-page]");
    if (!root) return;

    const masthead = root.querySelector<HTMLElement>("[data-research-masthead]");
    const statRail = root.querySelector<HTMLElement>("[data-research-stat-rail]");
    const matrix = root.querySelector<HTMLElement>(
      "[data-research-query-matrix], [data-research-matrix]"
    );
    const matrixScan = matrix?.querySelector<HTMLElement>("[data-research-matrix-scan]");
    const matrixScanFrame = matrixScan?.parentElement ?? matrix;
    const engineComparison = root.querySelector<HTMLElement>(
      "[data-research-engine-comparison]"
    );
    const standings = root.querySelector<HTMLElement>("[data-research-standings]");
    const findings = root.querySelector<HTMLElement>("[data-research-findings]");
    const cta = root.querySelector<HTMLElement>("[data-research-cta]");
    const methodStrip = root.querySelector<HTMLElement>("[data-research-method-strip]");

    const mastheadItems = selectAll(root, "[data-research-masthead-item]");
    const stats = selectAll(root, "[data-research-stat]");
    const engineBars = selectAll(root, "[data-research-engine-bar]");
    const findingItems = selectAll(root, "[data-research-finding-item]");
    const ctaItems = selectAll(root, "[data-research-cta-item]");
    const methodItems = selectAll(root, "[data-research-method-item]");
    const revealTargets = [
      ...mastheadItems,
      ...stats,
      ...(standings ? [standings] : []),
      ...findingItems,
      ...ctaItems,
      ...methodItems
    ];

    const media = gsap.matchMedia();
    let refreshFrame = 0;
    let isActive = true;

    const showFinalState = () => {
      gsap.set(revealTargets, { autoAlpha: 1, y: 0, clearProps: "willChange" });
      if (engineBars.length) {
        gsap.set(engineBars, {
          scaleX: 1,
          transformOrigin: "left center",
          clearProps: "willChange"
        });
      }

      if (matrix) gsap.set(matrix, { autoAlpha: 1, y: 0, clearProps: "willChange" });
      if (matrixScan) {
        gsap.set(matrixScan, {
          autoAlpha: 0,
          x: 0,
          clearProps: "transform,willChange"
        });
      }
    };

    media.add(
      {
        motionOk: "(prefers-reduced-motion: no-preference)",
        reduceMotion: "(prefers-reduced-motion: reduce)"
      },
      (context) => {
        const { motionOk } = context.conditions as {
          motionOk: boolean;
          reduceMotion: boolean;
        };

        if (!motionOk) {
          showFinalState();
          return;
        }

        // A composed first-load reveal. Four or five grouped targets feel
        // editorial; individual letters and animated counters do not.
        if (masthead && mastheadItems.length) {
          gsap.from(mastheadItems, {
            autoAlpha: 0,
            y: 18,
            force3D: true,
            duration: 0.62,
            stagger: 0.06,
            ease: researchEditorialEase,
            clearProps: "opacity,visibility,transform"
          });
        }

        // The small rail reads as one typographic sequence, never a counter.
        if (statRail && stats.length) {
          gsap.from(stats, {
            autoAlpha: 0,
            y: 14,
            duration: 0.54,
            stagger: 0.06,
            immediateRender: false,
            ease: researchEditorialEase,
            scrollTrigger: {
              trigger: statRail,
              start: "clamp(top 84%)",
              once: true,
              id: "research-stat-rail"
            },
            clearProps: "opacity,visibility,transform"
          });
        }

        // Standings arrive as one composed evidence surface. Filtering remains
        // immediate because no row receives animation state.
        if (standings) {
          gsap.from(standings, {
            autoAlpha: 0,
            y: 16,
            duration: 0.62,
            immediateRender: false,
            ease: researchEditorialEase,
            scrollTrigger: {
              trigger: standings,
              start: "clamp(top 84%)",
              once: true,
              id: "research-standings"
            },
            clearProps: "opacity,visibility,transform"
          });
        }

        if (findings && findingItems.length) {
          gsap.from(findingItems, {
            autoAlpha: 0,
            y: 14,
            duration: 0.56,
            stagger: 0.06,
            immediateRender: false,
            ease: researchEditorialEase,
            scrollTrigger: {
              trigger: findings,
              start: "clamp(top 84%)",
              once: true,
              id: "research-findings"
            },
            clearProps: "opacity,visibility,transform"
          });
        }

        if (cta && ctaItems.length) {
          gsap.from(ctaItems, {
            autoAlpha: 0,
            y: 12,
            duration: 0.54,
            stagger: 0.05,
            immediateRender: false,
            ease: researchEditorialEase,
            scrollTrigger: {
              trigger: cta,
              start: "clamp(top 88%)",
              once: true,
              id: "research-cta"
            },
            clearProps: "opacity,visibility,transform"
          });
        }

        // One explanatory pass across the complete 25 x 3 matrix. Cells are
        // deliberately not cascaded: the data remains available immediately.
        if (matrix) {
          if (matrixScan) {
            gsap.set(matrixScan, {
              autoAlpha: 0,
              x: () => -Math.max(matrixScan.offsetWidth, 32),
              force3D: true,
              willChange: "transform, opacity"
            });
          }

          const matrixTimeline = gsap.timeline({
            defaults: { ease: researchEditorialEase },
            scrollTrigger: {
              trigger: matrix,
              start: "clamp(top 82%)",
              once: true,
              id: "research-query-matrix"
            }
          });

          matrixTimeline.from(matrix, {
            autoAlpha: 0,
            y: 16,
            duration: 0.62,
            immediateRender: false,
            clearProps: "opacity,visibility,transform"
          });

          if (matrixScan) {
            matrixTimeline
              .to(matrixScan, { autoAlpha: 0.7, duration: 0.12 }, 0.42)
              .to(
                matrixScan,
                {
                  x: () => (matrixScanFrame?.clientWidth ?? matrix.clientWidth) + matrixScan.offsetWidth,
                  duration: 0.76,
                  ease: researchEditorialEase
                },
                0.42
              )
              .to(matrixScan, {
                autoAlpha: 0,
                duration: 0.12,
                onComplete: () =>
                  gsap.set(matrixScan, {
                    clearProps: "transform,willChange"
                  })
              });
          }
        }

        // Bars resolve to their CSS-defined measured widths. Animating scale
        // avoids layout work and never fabricates an intermediate number.
        if (engineComparison && engineBars.length) {
          gsap.from(engineBars, {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.72,
            stagger: 0.08,
            immediateRender: false,
            ease: researchEditorialEase,
            scrollTrigger: {
              trigger: engineComparison,
              start: "clamp(top 82%)",
              once: true,
              id: "research-engine-comparison"
            },
            clearProps: "transform"
          });
        }

        if (methodStrip && methodItems.length) {
          gsap.from(methodItems, {
            autoAlpha: 0,
            y: 12,
            duration: 0.48,
            stagger: 0.05,
            immediateRender: false,
            ease: researchEditorialEase,
            scrollTrigger: {
              trigger: methodStrip,
              start: "clamp(top 88%)",
              once: true,
              id: "research-method-strip"
            },
            clearProps: "opacity,visibility,transform"
          });
        }

        refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
        document.fonts?.ready
          .then(() => {
            if (isActive) ScrollTrigger.refresh();
          })
          .catch(() => {});
      }
    );

    return () => {
      isActive = false;
      window.cancelAnimationFrame(refreshFrame);
      media.revert();
    };
  }, { dependencies: [pathname], revertOnUpdate: true });

  return null;
}
