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

        // How-Studio-Baggio-works flow diagram: built left to right —
        // card, accent, connector draws, dot lands, next card.
        const flow = root.querySelector<HTMLElement>("[data-svf]");
        const flowCards = flow ? Array.from(flow.querySelectorAll<HTMLElement>("[data-svf-card]")) : [];
        const flowLines = flow ? Array.from(flow.querySelectorAll<HTMLElement>("[data-svf-line]")) : [];
        const flowDots = flow ? Array.from(flow.querySelectorAll<HTMLElement>("[data-svf-dot]")) : [];
        const flowAccents = flow ? Array.from(flow.querySelectorAll<HTMLElement>("[data-svf-accent]")) : [];
        gsap.set(flowCards, { autoAlpha: 0, y: 14 });
        gsap.set(flowLines, { scaleX: 0 });
        // Dots pop from a visible size, never from nothing.
        gsap.set(flowDots, { autoAlpha: 0, scale: 0.5 });
        gsap.set(flowAccents, { scaleX: 0, transformOrigin: "left center" });

        // ── Scroll layer: created immediately so content is never stranded
        // hidden if the user scrolls at once. ──
        return setupScroll();

        function setupScroll() {
          const cards = Array.from(root!.querySelectorAll<HTMLElement>("[data-sv-card]"));
          const outsideCard = (el: HTMLElement) => !el.closest("[data-sv-card]");

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

          revealTargets.filter(outsideCard).forEach((el) => {
            gsap.to(el, {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: servicesOut,
              scrollTrigger: { trigger: el, start: "top 86%", once: true }
            });
          });

          accentBars.filter(outsideCard).forEach((el) => {
            gsap.to(el, {
              scaleX: 1,
              duration: 0.6,
              ease: servicesOut,
              scrollTrigger: { trigger: el, start: "top 88%", once: true }
            });
          });

          listTargets.filter(outsideCard).forEach((list) => {
            gsap.to(list.children, {
              autoAlpha: 1,
              y: 0,
              duration: 0.5,
              ease: servicesOut,
              stagger: 0.04,
              scrollTrigger: { trigger: list, start: "top 88%", once: true }
            });
          });

          exampleBlocks.filter(outsideCard).forEach((block) => {
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

          // Inside a pinned sticky card a child's own top never crosses the
          // viewport threshold — the card is stuck and the next one covers
          // it — so element-triggered reveals never fire and card-bottom
          // content (the examples) stays hidden forever. Card internals
          // therefore reveal as ONE sequence when the CARD arrives.
          cards.forEach((card) => {
            const tl = gsap.timeline({
              scrollTrigger: { trigger: card, start: "top 85%", once: true }
            });
            const accent = card.querySelector<HTMLElement>("[data-sv-accent]");
            if (accent) tl.to(accent, { scaleX: 1, duration: 0.6, ease: servicesOut }, 0);
            card.querySelectorAll<HTMLElement>("[data-sv-list]").forEach((list) => {
              tl.to(
                list.children,
                { autoAlpha: 1, y: 0, duration: 0.5, ease: servicesOut, stagger: 0.04 },
                0.1
              );
            });
            card.querySelectorAll<HTMLElement>("[data-sv-reveal]").forEach((el, i) => {
              tl.to(el, { autoAlpha: 1, y: 0, duration: 0.6, ease: servicesOut }, 0.18 + i * 0.08);
            });
            card.querySelectorAll<HTMLElement>("[data-sv-example]").forEach((block) => {
              const line = block.querySelector<HTMLElement>(".sv-borderline");
              if (line) tl.to(line, { scaleY: 1, duration: 0.55, ease: servicesOut }, 0.25);
              tl.to(
                block.querySelectorAll(":scope > *:not(.sv-borderline)"),
                { autoAlpha: 1, y: 0, duration: 0.55, ease: servicesOut, stagger: 0.07 },
                0.32
              );
            });
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

          if (flow && flowCards.length) {
            const tl = gsap.timeline({
              scrollTrigger: {
                // Absolute position via pageTop: rect-based "top 82%" is
                // corrupted when a refresh happens with cards pinned above,
                // which made the build fire below the fold and finish
                // before the reader arrived.
                start: () => pageTop(flow) - window.innerHeight * 0.82,
                once: true,
                invalidateOnRefresh: true
              }
            });
            flowCards.forEach((card, i) => {
              const at = i * 0.28;
              tl.to(
                card,
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.55,
                  ease: servicesOut,
                  // Release the inline transform so the CSS hover lift can
                  // take over once the entrance has finished.
                  onComplete: () => gsap.set(card, { clearProps: "transform" })
                },
                at
              );
              if (flowAccents[i]) {
                tl.to(flowAccents[i], { scaleX: 1, duration: 0.4, ease: servicesOut }, at + 0.18);
              }
              // Connector i sits BEFORE card i+1: the blue thread stitches
              // the cards together as the next one arrives, then dissolves —
              // the dots stay as the resting punctuation.
              if (flowLines[i]) {
                tl.to(flowLines[i], { scaleX: 1, duration: 0.3, ease: "none" }, at + 0.16);
                tl.to(flowLines[i], { autoAlpha: 0, duration: 0.4, ease: "none" }, at + 0.95);
              }
              if (flowDots[i]) {
                tl.to(
                  flowDots[i],
                  { autoAlpha: 1, scale: 1, duration: 0.25, ease: servicesOut },
                  at + 0.34
                );
              }
            });
          }

          let cleanup: (() => void) | undefined;

          if (desktop) {
            // Every card pins at 88px — top always visible, uniform stack.
            // (Jayme, 29 July 2026: no per-card special-casing.)
            // Every card pins at 88px — top always visible, uniform stack.
            // Card content is sized so a full card fits below the stopper.
            cards.forEach((card) => {
              card.style.top = "88px";
            });
            const onResize = () => {
              ScrollTrigger.refresh();
            };
            window.addEventListener("resize", onResize);
            document.fonts?.ready.then(onResize).catch(() => {});
            cleanup = () => {
              window.removeEventListener("resize", onResize);
              cards.forEach((card) => {
                card.style.top = "";
              });
            };

            cards.forEach((card, index) => {
              const next = cards[index + 1];
              if (!next) return;
              // The covered card recedes and dissolves FULLY by the time the
              // next card pins. Partially-faded pinned cards layer up and
              // show through each other; an invisible card can't ghost, peek
              // below a shorter front card, or pop out under the header —
              // so release order stops mattering and no height filler is
              // needed after the short last card. scrub: true, never numeric:
              // Lenis already smooths, numeric double-smooths.
              gsap.to(card, {
                scale: 0.94,
                autoAlpha: 0,
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

          // Hash landings (e.g. /services#seo-...): native anchor scroll can't
          // place a card inside the pinned stack, so position it ourselves —
          // the card's flow position minus the 88px stopper.
          const hash = window.location.hash.slice(1);
          const hashCard = hash ? cards.find((card) => card.id === hash) : undefined;
          if (hashCard) {
            window.requestAnimationFrame(() => {
              window.scrollTo({ top: pageTop(hashCard) - 88, left: 0, behavior: "instant" });
              ScrollTrigger.refresh();
            });
          }

          return cleanup;
        }
      }
    );

    return () => media.revert();
  });

  return null;
}
