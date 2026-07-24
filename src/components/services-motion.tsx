"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger, CustomEase);

const servicesOut =
  CustomEase.get("servicesEditorialOut") ??
  CustomEase.create("servicesEditorialOut", "M0,0 C0.16,0.82 0.34,1 1,1");

export function ServicesMotion() {
  useGSAP(() => {
    const root = document.querySelector<HTMLElement>("[data-services-root]");
    if (!root) return;

    const media = gsap.matchMedia();

    media.add(
      {
        motionOk: "(prefers-reduced-motion: no-preference)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
        desktop: "(min-width: 1024px)"
      },
      (context) => {
        const { motionOk, desktop } = context.conditions as {
          motionOk: boolean;
          reduceMotion: boolean;
          desktop: boolean;
        };

        if (!motionOk) {
          gsap.set(root.querySelectorAll("[data-sv-reveal]"), {
            clearProps: "all",
            autoAlpha: 1
          });
          return;
        }

        // ── Entrance: pure CSS in page.tsx. The hero must stay OFF the GSAP
        // ticker — lagSmoothing(0) is set globally for Lenis, so load-time
        // frame drops make JS tweens jump forward in visible steps. A CSS
        // animation runs on the compositor thread, which cannot stutter. ──
        const revealTargets = Array.from(root.querySelectorAll<HTMLElement>("[data-sv-reveal]"));
        const listTargets = Array.from(root.querySelectorAll<HTMLElement>("[data-sv-list]"));
        const exampleBlocks = Array.from(root.querySelectorAll<HTMLElement>("[data-sv-example]"));
        const accentBars = Array.from(root.querySelectorAll<HTMLElement>("[data-sv-accent]"));
        const logos = Array.from(root.querySelectorAll<HTMLElement>("[data-sv-logo]"));

        gsap.set(revealTargets, { autoAlpha: 0, y: 24 });
        listTargets.forEach((list) => gsap.set(list.children, { autoAlpha: 0, y: 14 }));
        exampleBlocks.forEach((block) => {
          gsap.set(block.querySelectorAll(":scope > *:not(.sv-borderline)"), {
            autoAlpha: 0,
            y: 14
          });
          const line = block.querySelector<HTMLElement>(".sv-borderline");
          if (line) gsap.set(line, { scaleY: 0, transformOrigin: "top center" });
        });
        gsap.set(accentBars, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(logos, { autoAlpha: 0, y: 10 });

        // ── Scroll layer: created immediately so content is never stranded
        // hidden if the user scrolls at once. ──
        return setupScroll();

        function setupScroll() {
          revealTargets.forEach((el) => {
            gsap.to(el, {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: servicesOut,
              scrollTrigger: { trigger: el, start: "top 86%", once: true }
            });
          });

          accentBars.forEach((el) => {
            gsap.to(el, {
              scaleX: 1,
              duration: 0.6,
              ease: servicesOut,
              scrollTrigger: { trigger: el, start: "top 88%", once: true }
            });
          });

          listTargets.forEach((list) => {
            gsap.to(list.children, {
              autoAlpha: 1,
              y: 0,
              duration: 0.5,
              ease: servicesOut,
              stagger: 0.04,
              scrollTrigger: { trigger: list, start: "top 88%", once: true }
            });
          });

          exampleBlocks.forEach((block) => {
            const line = block.querySelector<HTMLElement>(".sv-borderline");
            const tl = gsap.timeline({
              scrollTrigger: { trigger: block, start: "top 86%", once: true }
            });
            if (line) tl.to(line, { scaleY: 1, duration: 0.55, ease: servicesOut });
            tl.to(
              block.querySelectorAll(":scope > *:not(.sv-borderline)"),
              { autoAlpha: 1, y: 0, duration: 0.55, ease: servicesOut, stagger: 0.07 },
              line ? 0.12 : 0
            );
          });

          if (logos.length) {
            gsap.to(logos, {
              autoAlpha: 1,
              y: 0,
              duration: 0.5,
              ease: servicesOut,
              stagger: 0.09,
              scrollTrigger: { trigger: logos[0], start: "top 92%", once: true }
            });
          }

          let cleanup: (() => void) | undefined;

          if (desktop) {
            const cards = Array.from(root!.querySelectorAll<HTMLElement>("[data-sv-card]"));

            // A sticky card releases when ITS OWN bottom hits the parent's
            // bottom — unequal heights release at different times, so tall
            // early cards get shoved up past the pin line while the short
            // last card is still arriving. Equal heights hold the pin and
            // exit as one stack.
            const equalize = () => {
              cards.forEach((c) => {
                c.style.minHeight = "";
              });
              const max = Math.max(...cards.map((c) => c.offsetHeight));
              cards.forEach((c) => {
                c.style.minHeight = `${max}px`;
              });
            };
            equalize();
            const reEqualize = () => {
              equalize();
              ScrollTrigger.refresh();
            };
            window.addEventListener("resize", reEqualize);
            document.fonts?.ready.then(reEqualize).catch(() => {});
            cleanup = () => {
              window.removeEventListener("resize", reEqualize);
              cards.forEach((c) => {
                c.style.minHeight = "";
              });
            };

            // Flow position via the offsetParent chain: sticky displacement
            // never shows up here, so ranges are correct even when the page
            // loads (or refreshes) mid-scroll with cards already pinned.
            const pageTop = (el: HTMLElement) => {
              let y = 0;
              let node: HTMLElement | null = el;
              while (node) {
                y += node.offsetTop;
                node = node.offsetParent as HTMLElement | null;
              }
              return y;
            };
            cards.forEach((card, index) => {
              const next = cards[index + 1];
              if (!next) return;
              // Settled card keeps easing back for the whole overlap — a
              // frozen held card is what reads as "stuck". scrub: true, never
              // numeric: Lenis already smooths, numeric double-smooths.
              gsap.to(card, {
                scale: 0.94,
                "--sv-veil": 0.55,
                transformOrigin: "center top",
                ease: "none",
                force3D: true,
                scrollTrigger: {
                  start: () => pageTop(next) - window.innerHeight,
                  end: () => pageTop(next) - 88,
                  scrub: true,
                  invalidateOnRefresh: true
                }
              });
            });
          }

          ScrollTrigger.refresh();
          return cleanup;
        }
      }
    );

    return () => media.revert();
  });

  return null;
}
