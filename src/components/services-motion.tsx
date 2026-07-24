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
          gsap.set(
            root.querySelectorAll("[data-sv-hero], [data-sv-title], [data-sv-reveal]"),
            { clearProps: "all", autoAlpha: 1 }
          );
          return;
        }

        // ── Entrance: plain staggered fade-up. No masks, no splitting —
        // nothing that can clip or fight hydration. ──
        const title = root.querySelector<HTMLElement>("[data-sv-title]");
        const heroBits = root.querySelectorAll<HTMLElement>("[data-sv-hero]");

        if (title) gsap.set(title, { autoAlpha: 0, y: 24, force3D: true });
        gsap.set(heroBits, { autoAlpha: 0, y: 20, force3D: true });

        // Pre-hide every scroll target with cheap writes now; their
        // triggers are created only after the entrance has finished, so
        // the hero animates on a quiet main thread.
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

        const hero = gsap.timeline({
          paused: true,
          defaults: { ease: servicesOut, force3D: true }
        });

        if (title) hero.to(title, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.05);
        hero.to(heroBits, { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.08 }, 0.25);

        // Let hydration finish its frames before the entrance plays.
        requestAnimationFrame(() => requestAnimationFrame(() => hero.play()));

        // ── Scroll layer: created immediately (the homepage pattern) so
        // content is never stranded hidden if the user scrolls at once. ──
        setupScroll();

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

          if (desktop) {
            const cards = Array.from(root!.querySelectorAll<HTMLElement>("[data-sv-card]"));
            cards.forEach((card, index) => {
              const next = cards[index + 1];
              if (!next) return;
              // Keep the settled card moving for the entire overlap —
              // a static held card is what reads as "sticky".
              gsap.to(card, {
                scale: 0.94,
                autoAlpha: 0.72,
                transformOrigin: "center top",
                ease: "none",
                force3D: true,
                scrollTrigger: {
                  trigger: next,
                  start: "top bottom",
                  end: "top top",
                  scrub: true
                }
              });
            });
          }

          ScrollTrigger.refresh();
        }
      }
    );

    return () => media.revert();
  });

  return null;
}
