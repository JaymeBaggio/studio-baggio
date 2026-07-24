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
            root.querySelectorAll(
              "[data-sv-hero], [data-sv-reveal], [data-sv-accent], [data-sv-logo], .sv-borderline"
            ),
            { clearProps: "all", autoAlpha: 1 }
          );
          return;
        }

        // Hero: masked headline rise, eyebrow and intro stagger.
        const heroLine = root.querySelector<HTMLElement>("[data-sv-hero-line]");
        const heroBits = root.querySelectorAll<HTMLElement>("[data-sv-hero]");

        if (heroLine) gsap.set(heroLine, { y: 0, yPercent: 110 });
        gsap.set(heroBits, { autoAlpha: 0, y: 22 });

        const hero = gsap.timeline({ defaults: { ease: servicesOut } });
        hero
          .to(heroLine, { yPercent: 0, duration: 0.95 }, 0.1)
          .to(heroBits, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.09 }, 0.32);

        // Scroll reveals: one pattern for every marked block.
        root.querySelectorAll<HTMLElement>("[data-sv-reveal]").forEach((el) => {
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 24 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.75,
              ease: servicesOut,
              scrollTrigger: { trigger: el, start: "top 86%", once: true }
            }
          );
        });

        // Blue accent bars draw their width.
        root.querySelectorAll<HTMLElement>("[data-sv-accent]").forEach((el) => {
          gsap.fromTo(
            el,
            { scaleX: 0, transformOrigin: "left center" },
            {
              scaleX: 1,
              duration: 0.6,
              ease: servicesOut,
              scrollTrigger: { trigger: el, start: "top 88%", once: true }
            }
          );
        });

        // Lists: bullet rows stagger in.
        root.querySelectorAll<HTMLElement>("[data-sv-list]").forEach((list) => {
          gsap.fromTo(
            list.children,
            { autoAlpha: 0, y: 14 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.5,
              ease: servicesOut,
              stagger: 0.04,
              scrollTrigger: { trigger: list, start: "top 88%", once: true }
            }
          );
        });

        // Example blocks: blue border draws down, content follows.
        root.querySelectorAll<HTMLElement>("[data-sv-example]").forEach((block) => {
          const line = block.querySelector<HTMLElement>(".sv-borderline");
          const tl = gsap.timeline({
            scrollTrigger: { trigger: block, start: "top 86%", once: true }
          });
          if (line) {
            tl.fromTo(
              line,
              { scaleY: 0, transformOrigin: "top center" },
              { scaleY: 1, duration: 0.55, ease: servicesOut }
            );
          }
          tl.fromTo(
            block.querySelectorAll(":scope > *:not(.sv-borderline)"),
            { autoAlpha: 0, y: 14 },
            { autoAlpha: 1, y: 0, duration: 0.55, ease: servicesOut, stagger: 0.07 },
            line ? 0.12 : 0
          );
        });

        // Press logos: quiet stagger.
        const logos = root.querySelectorAll<HTMLElement>("[data-sv-logo]");
        if (logos.length) {
          gsap.fromTo(
            logos,
            { autoAlpha: 0, y: 10 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.5,
              ease: servicesOut,
              stagger: 0.09,
              scrollTrigger: { trigger: logos[0], start: "top 92%", once: true }
            }
          );
        }

        // Desktop signature: the four offers stack — each settled card eases
        // back as the next one slides over it.
        if (desktop) {
          const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-sv-card]"));
          cards.forEach((card, index) => {
            const next = cards[index + 1];
            if (!next) return;
            gsap.to(card, {
              scale: 0.965,
              yPercent: -1.5,
              transformOrigin: "center top",
              ease: "none",
              scrollTrigger: {
                trigger: next,
                start: "top bottom",
                end: "top 12%",
                scrub: 0.4
              }
            });
          });
        }
      }
    );

    return () => media.revert();
  });

  return null;
}
