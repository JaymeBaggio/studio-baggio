"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function AboutPageMotion() {
  useGSAP(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const page = document.querySelector<HTMLElement>("[data-about-page]");

    if (reduce || !page) return;

    gsap.fromTo(
      "[data-about-hero]",
      { y: 24, opacity: 0.001 },
      {
        y: 0,
        opacity: 1,
        duration: 0.62,
        stagger: 0.08,
        ease: "power2.out",
        clearProps: "transform,opacity"
      }
    );

    const progress = page.querySelector<HTMLElement>("[data-about-progress]");

    if (progress) {
      gsap.to(progress, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: page,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.25
        }
      });
    }

    gsap.utils.toArray<HTMLElement>("[data-about-section]").forEach((section, index) => {
      const content = section.querySelectorAll<HTMLElement>("[data-about-section-heading], [data-about-body]");
      const rule = section.querySelector<HTMLElement>("[data-about-rule]");

      gsap.fromTo(
        content,
        { y: 28, opacity: 0.001 },
        {
          y: 0,
          opacity: 1,
          duration: 0.58,
          stagger: 0.08,
          ease: "power2.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            toggleActions: "play none none reverse",
            refreshPriority: index
          }
        }
      );

      if (rule) {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              end: "bottom 58%",
              scrub: 0.4,
              refreshPriority: index
            }
          }
        );
      }
    });
  }, []);

  return null;
}
