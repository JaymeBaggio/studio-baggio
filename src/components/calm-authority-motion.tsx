"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function CalmAuthorityMotion() {
  useGSAP(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.set("[data-calm-motion]", { autoAlpha: 1 });

    if (reduce) return;

    const heroCopy = gsap.utils.toArray<HTMLElement>("[data-calm-hero-copy]");
    const heroShot = document.querySelector<HTMLElement>("[data-calm-shot]");
    const stats = gsap.utils.toArray<HTMLElement>("[data-calm-stat]");
    const cards = gsap.utils.toArray<HTMLElement>("[data-calm-card]");
    const rows = gsap.utils.toArray<HTMLElement>("[data-calm-row]");
    const proofItems = gsap.utils.toArray<HTMLElement>("[data-calm-proof]");
    const darkItems = gsap.utils.toArray<HTMLElement>("[data-calm-dark]");
    const triggers: ScrollTrigger[] = [];

    const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (heroCopy.length) {
      intro.fromTo(
        heroCopy,
        { y: 26, opacity: 0.001 },
        { y: 0, autoAlpha: 1, duration: 0.85, stagger: 0.09 },
        0.05
      );
    }

    if (heroShot) {
      intro.fromTo(
        heroShot,
        { y: 38, opacity: 0.001, scale: 0.965, rotateX: 7 },
        { y: 0, autoAlpha: 1, scale: 1, rotateX: 0, duration: 1.05, ease: "expo.out" },
        0.28
      );

      gsap.to(heroShot, {
        y: -36,
        scale: 1.018,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-calm-hero]",
          start: "top top",
          end: "bottom top",
          scrub: 1.15,
          invalidateOnRefresh: true
        }
      });
    }

    if (stats.length) {
      intro.fromTo(
        stats,
        { y: 18, opacity: 0.001 },
        { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08 },
        0.7
      );
    }

    function animateOnEnter(
      element: HTMLElement,
      fromVars: gsap.TweenVars,
      toVars: gsap.TweenVars,
      start = "top 88%"
    ) {
      triggers.push(
        ScrollTrigger.create({
          trigger: element,
          start,
          once: true,
          onEnter: () => {
            gsap.fromTo(element, fromVars, {
              ...toVars,
              overwrite: "auto"
            });
          }
        })
      );
    }

    cards.forEach((card, index) => {
      animateOnEnter(
        card,
        { y: 30, opacity: 0.001, scale: 0.985 },
        { y: 0, autoAlpha: 1, scale: 1, duration: 0.9, ease: "power3.out", delay: index * 0.04 }
      );
    });

    rows.forEach((row) => {
      animateOnEnter(
        row,
        { x: -14, opacity: 0.001 },
        { x: 0, autoAlpha: 1, duration: 0.72, ease: "power3.out" }
      );
    });

    proofItems.forEach((item, index) => {
      animateOnEnter(
        item,
        { y: 24, opacity: 0.001 },
        { y: 0, autoAlpha: 1, duration: 0.75, ease: "power3.out", delay: index * 0.035 },
        "top 86%"
      );
    });

    if (darkItems.length) {
      triggers.push(
        ScrollTrigger.create({
          trigger: "[data-calm-dark-section]",
          start: "top 74%",
          once: true,
          onEnter: () => {
            gsap.fromTo(
              darkItems,
              { y: 28, opacity: 0.001 },
              { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.1, ease: "power3.out", overwrite: "auto" }
            );
          }
        })
      );
    }

    const shotWrap = document.querySelector<HTMLElement>("[data-calm-shot-wrap]");
    const rotateX = heroShot ? gsap.quickTo(heroShot, "rotateX", { duration: 0.55, ease: "power3.out" }) : null;
    const rotateY = heroShot ? gsap.quickTo(heroShot, "rotateY", { duration: 0.55, ease: "power3.out" }) : null;

    function handleMove(event: MouseEvent) {
      if (!shotWrap || !rotateX || !rotateY) return;
      const rect = shotWrap.getBoundingClientRect();
      const relX = (event.clientX - rect.left) / rect.width - 0.5;
      const relY = (event.clientY - rect.top) / rect.height - 0.5;
      rotateY(relX * 5);
      rotateX(relY * -4);
    }

    function handleLeave() {
      rotateX?.(0);
      rotateY?.(0);
    }

    shotWrap?.addEventListener("mousemove", handleMove);
    shotWrap?.addEventListener("mouseleave", handleLeave);

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      shotWrap?.removeEventListener("mousemove", handleMove);
      shotWrap?.removeEventListener("mouseleave", handleLeave);
    };
  });

  return null;
}
