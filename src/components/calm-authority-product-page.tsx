"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ButtonLink } from "@/components/ui/button";
import { calmAuthority } from "@/content/site";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const judgementSignals = ["Buyers", "AI search systems", "competitors", "partners"];

const workSteps = [
  {
    title: "Maps each adviser's actual writing voice from real samples"
  },
  {
    title: "Runs weekly research to surface relevant angles"
  },
  {
    title: "Generates draft posts from a URL, an article, or an idea"
  },
  {
    title: "Advisers edit, approve, and post manually"
  }
];

const audienceCards = [
  {
    label: "Individual financial advisers",
    body: calmAuthority.whoItsFor[0]
  },
  {
    label: "Advisory firms and PE-backed consolidators",
    body: calmAuthority.whoItsFor[1]
  }
];

const complianceControls = [
  "Calm Authority is a writing assistant.",
  "Every post is reviewed and published manually by the adviser.",
  "Standard FCA promotional rules apply.",
  "Calm Authority operates inside firm policies, not around them."
];

export function CalmAuthorityProductPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeProof, setActiveProof] = useState(0);
  const activeStepRef = useRef(0);
  const mechanismRef = useRef<HTMLElement | null>(null);
  const mechanismShellRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const heroItems = gsap.utils.toArray<HTMLElement>("[data-calm-hero-copy]");
    const heroShot = document.querySelector<HTMLElement>("[data-calm-shot]");
    const revealItems = gsap.utils.toArray<HTMLElement>("[data-calm-reveal]");
    const triggers: ScrollTrigger[] = [];
    const batches: ScrollTrigger[] = [];

    gsap.set("[data-calm-motion], [data-calm-reveal]", { autoAlpha: 1 });

    if (reduce) return;

    if (heroItems.length) {
      gsap.fromTo(
        heroItems,
        { y: 28, opacity: 0.001 },
        { y: 0, autoAlpha: 1, duration: 0.85, stagger: 0.08, ease: "power3.out" }
      );
    }

    if (heroShot) {
      gsap.fromTo(
        heroShot,
        { y: 34, opacity: 0.001 },
        { y: 0, autoAlpha: 1, duration: 0.95, delay: 0.22, ease: "expo.out" }
      );

      gsap.to(heroShot, {
        y: -18,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-calm-hero]",
          start: "top top",
          end: "bottom top",
          scrub: 1.1,
          invalidateOnRefresh: true
        }
      });
    }

    if (revealItems.length) {
      batches.push(
        ...ScrollTrigger.batch(revealItems, {
          start: "top 86%",
          once: true,
          onEnter: (elements) => {
            gsap.fromTo(
              elements,
              { y: 28, opacity: 0.001 },
              { y: 0, autoAlpha: 1, duration: 0.72, stagger: 0.045, ease: "power3.out", overwrite: "auto" }
            );
          }
        })
      );
    }

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      if (!mechanismRef.current || !mechanismShellRef.current || !progressRef.current) return;

      const endDistance = () => `+=${Math.max(1400, window.innerHeight * 1.9)}`;

      const pinTrigger = ScrollTrigger.create({
        trigger: mechanismRef.current,
        start: "top top",
        end: endDistance,
        pin: mechanismShellRef.current,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const next = Math.min(workSteps.length - 1, Math.floor(self.progress * workSteps.length));
          if (next !== activeStepRef.current) {
            activeStepRef.current = next;
            setActiveStep(next);
          }
        }
      });

      const progressTween = gsap.fromTo(
        progressRef.current,
        { scaleX: 0.08 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          ease: "none",
          scrollTrigger: {
            trigger: mechanismRef.current,
            start: "top top",
            end: endDistance,
            scrub: 0.4,
            invalidateOnRefresh: true
          }
        }
      );

      return () => {
        pinTrigger.kill();
        progressTween.scrollTrigger?.kill();
        progressTween.kill();
      };
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      batches.forEach((trigger) => trigger.kill());
      mm.revert();
    };
  });

  function chooseStep(index: number) {
    activeStepRef.current = index;
    setActiveStep(index);
  }

  const currentStep = workSteps[activeStep];
  const currentProof = calmAuthority.proofPoints[activeProof];

  return (
    <>
      <section className="calm-authority-hero" data-calm-hero>
        <div className="editorial-container calm-authority-hero-frame">
          <div className="calm-authority-hero-copy">
            <p className="eyebrow" data-calm-motion data-calm-hero-copy>
              {calmAuthority.eyebrow}
            </p>
            <h1 className="calm-authority-hero-title" data-calm-motion data-calm-hero-copy>
              {calmAuthority.title}
              <span>— {calmAuthority.tagline}</span>
            </h1>
            <p className="calm-authority-built-line" data-calm-motion data-calm-hero-copy>
              {calmAuthority.builtLine}
            </p>
            <div className="calm-authority-featured" data-calm-motion data-calm-hero-copy>
              <span>Featured in</span>
              <div className="calm-authority-logo-row" aria-label={`Featured in ${calmAuthority.featuredIn.join(", ")}`}>
                {calmAuthority.featuredIn.map((publication) => (
                  <span key={publication} className="calm-authority-wordmark">
                    {publication}
                  </span>
                ))}
              </div>
            </div>
            <div className="calm-authority-hero-actions" data-calm-motion data-calm-hero-copy>
              <ButtonLink href={calmAuthority.liveHref} external>
                Visit Calm Authority
              </ButtonLink>
            </div>
          </div>

          <motion.a
            href={calmAuthority.liveHref}
            target="_blank"
            rel="noreferrer"
            className="calm-authority-shot-wrap focus-ring"
            aria-label="Open Calm Authority website"
            data-calm-motion
            data-calm-shot
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.992 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
          >
            <div className="calm-authority-shot">
              <Image
                src="/assets/products/calm-authority-og-rectangle.png"
                alt="Calm Authority brand graphic: Your own expertise. At scale."
                width={1659}
                height={948}
                className="calm-authority-og-image"
                priority
                unoptimized
              />
              <div className="calm-authority-shot-caption">
                <span>Live site</span>
                <span>calmauthority.ai</span>
              </div>
            </div>
          </motion.a>
        </div>
      </section>

      <section className="calm-authority-thesis">
        <div className="editorial-container">
          <div className="calm-authority-product-intro" data-calm-reveal>
            <p>{calmAuthority.productIntro}</p>
          </div>
          <div className="calm-authority-thesis-grid">
            {calmAuthority.commercialThesis.map((paragraph) => (
              <p key={paragraph} data-calm-reveal>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="calm-authority-problem">
        <div className="editorial-container calm-authority-problem-grid">
          <div className="calm-authority-problem-stat" data-calm-reveal>
            <p className="eyebrow">The problem</p>
            <div>
              <span>37,136</span>
              <em>authorised financial advisers in the UK</em>
            </div>
            <div>
              <span>&lt;300</span>
              <em>post consistently on LinkedIn</em>
            </div>
          </div>
          <div className="calm-authority-problem-copy">
            {calmAuthority.problem.map((paragraph) => (
              <p key={paragraph} data-calm-reveal>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="calm-authority-why-now">
        <div className="editorial-container calm-authority-why-grid">
          <div data-calm-reveal>
            <p className="eyebrow">Why now</p>
            <p className="calm-authority-large-copy">{calmAuthority.whyNow}</p>
          </div>
          <div className="calm-authority-signal-grid" aria-label="Public information is now judged by buyers, AI search systems, partners and competitors">
            {judgementSignals.map((signal, index) => (
              <motion.article
                key={signal}
                className="calm-authority-signal-card"
                data-calm-reveal
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{signal}</h3>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section ref={mechanismRef} className="calm-authority-mechanism-section">
        <div ref={mechanismShellRef} className="calm-authority-mechanism-shell">
          <div className="editorial-container calm-authority-mechanism-grid">
            <div className="calm-authority-mechanism-copy" data-calm-reveal>
              <p className="eyebrow">How it works</p>
              {calmAuthority.howItWorks.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="calm-authority-mechanism-panel" data-calm-reveal>
              <div className="calm-authority-process-display">
                <div className="calm-authority-process-meta">
                  <span>{String(activeStep + 1).padStart(2, "0")}</span>
                  <span>{currentStep.title}</span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep.title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.24, ease: "easeOut" }}
                  >
                    <p>{currentStep.title}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="calm-authority-process-track" aria-hidden="true">
                <div ref={progressRef} className="calm-authority-process-fill" />
              </div>

              <div className="calm-authority-process-steps" aria-label="Calm Authority workflow">
                {workSteps.map((step, index) => {
                  const isActive = index === activeStep;
                  const isComplete = index < activeStep;
                  return (
                    <motion.button
                      key={step.title}
                      type="button"
                      className={cn("focus-ring calm-authority-process-step", isActive && "is-active", isComplete && "is-complete")}
                      aria-pressed={isActive}
                      onClick={() => chooseStep(index)}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.985 }}
                      transition={{ type: "spring", stiffness: 420, damping: 31 }}
                    >
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <strong>{step.title}</strong>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="calm-authority-audience-section">
          <div className="editorial-container calm-authority-section-heading">
            <p className="eyebrow">Who it&apos;s for</p>
          <h2 data-calm-reveal>Who it&apos;s for</h2>
        </div>
        <div className="editorial-container calm-authority-audience-grid">
          {audienceCards.map((card, index) => (
            <motion.article
              key={card.label}
              className="calm-authority-audience-card"
              data-calm-reveal
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{card.label}</h3>
              <p>{card.body}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="calm-authority-proof-section bg-charcoal text-paper">
        <div className="editorial-container calm-authority-proof-layout">
          <div className="calm-authority-proof-heading" data-calm-reveal>
            <p className="eyebrow text-paper/58">Proof</p>
            <h2>Proof</h2>
          </div>

          <div className="calm-authority-proof-interaction">
            <div className="calm-authority-proof-rail" aria-label="Calm Authority proof points">
              {calmAuthority.proofPoints.map((point, index) => (
                <button
                  key={point.metric}
                  type="button"
                  className={cn("focus-ring calm-authority-proof-trigger", index === activeProof && "is-active")}
                  aria-current={index === activeProof ? "true" : undefined}
                  onClick={() => setActiveProof(index)}
                  data-calm-reveal
                >
                  <span>{point.metric}</span>
                  <em>0{index + 1}</em>
                </button>
              ))}
            </div>

            <div className="calm-authority-proof-panel" data-calm-reveal>
              <AnimatePresence mode="wait">
                <motion.article
                  key={currentProof.metric}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.34, ease: "easeOut" }}
                >
                  <p className="calm-authority-proof-kicker">Proof 0{activeProof + 1}</p>
                  <h3>{currentProof.metric}</h3>
                  {currentProof.body ? <p className="calm-authority-proof-body">{currentProof.body}</p> : null}
                </motion.article>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <section className="calm-authority-compliance-section">
        <div className="editorial-container calm-authority-compliance-grid">
          <div data-calm-reveal>
            <p className="eyebrow">Compliance and editorial control</p>
            <p className="calm-authority-large-copy">{calmAuthority.compliance}</p>
          </div>
          <div className="calm-authority-control-list" data-calm-reveal>
            {complianceControls.map((control, index) => (
              <div key={control}>
                <span>0{index + 1}</span>
                <strong>{control}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="calm-authority-featured-section">
        <div className="editorial-container calm-authority-featured-band" data-calm-reveal>
          <p className="eyebrow">Featured in</p>
          <div className="calm-authority-logo-row calm-authority-logo-row-large">
            {calmAuthority.featuredIn.map((publication) => (
              <span key={publication} className="calm-authority-wordmark">
                {publication}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="calm-authority-people-section">
        <div className="editorial-container calm-authority-people-grid">
          <article className="calm-authority-person-panel" data-calm-reveal>
            <p className="eyebrow">Founding adviser</p>
            <h2>{calmAuthority.foundingAdviser.name}</h2>
            <p className="calm-authority-profile-role">{calmAuthority.foundingAdviser.role}</p>
            <p>{calmAuthority.foundingAdviser.body}</p>
          </article>

          <article className="calm-authority-person-panel" data-calm-reveal>
            <p className="eyebrow">Built by</p>
            <h2>{calmAuthority.builtBy.name}</h2>
            <p className="calm-authority-profile-role">{calmAuthority.builtBy.role}</p>
            {calmAuthority.builtBy.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        </div>
      </section>

      <section className="calm-authority-final-cta bg-charcoal text-paper">
        <div className="editorial-container calm-authority-final-grid" data-calm-reveal>
          <div>
            <p className="eyebrow text-paper/58">Calm Authority</p>
            <h2>Your Own Expertise. At Scale</h2>
          </div>
          <div className="calm-authority-final-actions">
            <ButtonLink href={calmAuthority.liveHref} external className="border-paper bg-paper text-ink hover:bg-transparent hover:text-paper">
              Visit Calm Authority
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
