"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function AboutPageMotion() {
  useGSAP(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) return;

    gsap.fromTo(
      "[data-about-hero]",
      { y: 14, opacity: 0.001 },
      {
        y: 0,
        opacity: 1,
        duration: 0.38,
        stagger: 0.06,
        ease: "power2.out",
        clearProps: "transform,opacity"
      }
    );

    gsap.utils.toArray<HTMLElement>("[data-about-section]").forEach((section) => {
      gsap.fromTo(
        section,
        { y: 20, opacity: 0.001 },
        {
          y: 0,
          opacity: 1,
          duration: 0.42,
          ease: "power2.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: section,
            start: "top 84%",
            once: true
          }
        }
      );
    });
  }, []);

  return null;
}
