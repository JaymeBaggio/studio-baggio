"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { workItems, type WorkItem } from "@/content/work";

type ProductPageData = NonNullable<WorkItem["productPage"]>;
export type ProductWorkItem = WorkItem & { productPage: ProductPageData };

const productItems = workItems.filter((item): item is ProductWorkItem => Boolean(item.productPage));
const productsIntroEase = [0.16, 0.82, 0.34, 1] as const;
const productsPanelEase = [0.23, 1, 0.32, 1] as const;

export function ProductsPageShowcase() {
  const [activeSlug, setActiveSlug] = useState(productItems[0]?.slug ?? "");
  const activeItem = productItems.find((item) => item.slug === activeSlug) ?? productItems[0];
  const shouldReduceMotion = useReducedMotion();

  if (!activeItem) {
    return null;
  }

  function handleTabClick(slug: string) {
    setActiveSlug(slug);

    window.setTimeout(() => {
      const panel = document.getElementById("products-panel");
      if (!panel) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      panel.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
      });
    }, 40);
  }

  return (
    <div className="home-4b studio-page products-page">
      <section className="products-hero" data-header-theme="light">
        <div className="editorial-container products-hero-shell">
          <div className="products-hero-main">
            <motion.div
              className="products-hero-copy"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.62, ease: productsIntroEase, delay: 0.08 }}
            >
              <p className="eyebrow">Live Work</p>
              <p>A selection of our live products. Available alongside our bespoke offering.</p>
              <span aria-hidden="true" />
              <p>Each can also be embedded into client work as part of broader commercial implementation.</p>
            </motion.div>
            <motion.h1
              className="products-hero-title"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.72, ease: productsIntroEase, delay: 0.18 }}
            >
              <span>Products</span>
              <span>
                in market<span className="products-blue-dot">.</span>
              </span>
            </motion.h1>
          </div>

          <motion.div
            className="products-tabs"
            role="tablist"
            aria-label="Products"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.52, ease: productsIntroEase, delay: 0.3 }}
          >
            {productItems.map((item) => (
              <motion.button
                key={item.slug}
                type="button"
                id={`product-tab-${item.slug}`}
                className="products-tab"
                role="tab"
                aria-selected={activeItem.slug === item.slug}
                aria-controls="products-panel"
                onClick={() => handleTabClick(item.slug)}
                animate={
                  shouldReduceMotion
                    ? { opacity: activeItem.slug === item.slug ? 1 : 0.56 }
                    : { opacity: activeItem.slug === item.slug ? 1 : 0.56, y: activeItem.slug === item.slug ? -1 : 0 }
                }
                whileHover={shouldReduceMotion ? undefined : { opacity: 1, y: -1 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.24, ease: productsPanelEase }}
              >
                {item.productPage.tabLabel}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      <AnimatePresence mode="wait" initial={false}>
        <ProductDetailPanel
          key={activeItem.slug}
          item={activeItem}
          labelledBy={`product-tab-${activeItem.slug}`}
        />
      </AnimatePresence>
    </div>
  );
}

export function ProductDetailPanel({
  item,
  panelId = "products-panel",
  labelledBy,
  currentPath
}: {
  item: ProductWorkItem;
  panelId?: string;
  labelledBy?: string;
  currentPath?: string;
}) {
  const { productPage } = item;
  const isCalmAuthority = item.slug === "calm-authority";
  const isBusinessTracker = item.slug === "business-tracker";
  const hasSecondaryImages = Boolean(productPage.secondaryImages?.length);
  const titleId = `products-panel-title-${item.slug}`;
  const actions = productPage.ctas?.filter((cta) => cta.href !== currentPath);
  const panelGridClassName = [
    "products-panel-grid",
    isCalmAuthority ? "is-calm-authority" : "",
    isBusinessTracker ? "is-business-tracker" : ""
  ]
    .filter(Boolean)
    .join(" ");
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id={panelId}
      className="products-panel-shell"
      role={labelledBy ? "tabpanel" : undefined}
      aria-labelledby={labelledBy ?? titleId}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.34, ease: productsPanelEase }}
    >
      <header className="editorial-container products-panel-header">
        <p className="products-panel-category">{productPage.category}</p>
        <h2 id={titleId} className="products-panel-title">
          {item.title}
        </h2>
      </header>

      <div className="products-panel-rule" />

      <div className="editorial-container products-panel-main">
        <div className={panelGridClassName}>
          <div className="products-panel-copy">
            {productPage.sections.map((section) => (
              <ProductSection key={section.label} section={section} />
            ))}
          </div>

          <aside className="products-panel-aside">
            <figure className={hasSecondaryImages ? "products-panel-media has-secondary-media" : "products-panel-media"}>
              <Image
                src={productPage.image.src}
                alt={productPage.image.alt}
                width={productPage.image.width}
                height={productPage.image.height}
                sizes="(max-width: 900px) calc(100vw - 48px), 720px"
                priority={isCalmAuthority}
                unoptimized={isCalmAuthority}
              />
            </figure>

            {productPage.secondaryImages?.map((image) => (
              <figure key={image.src} className="products-panel-media products-panel-media-secondary">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(max-width: 900px) calc(100vw - 48px), 720px"
                />
              </figure>
            ))}

            {productPage.sideQuote ? (
              <figure className="products-side-quote">
                <blockquote>{productPage.sideQuote}</blockquote>
              </figure>
            ) : null}

            {productPage.sideSections?.map((section) => (
              <ProductSideSection key={section.label} section={section} />
            ))}

            {productPage.testimonials ? (
              <div className="products-testimonials">
                <p className="products-section-label">03 — Testimonials</p>
                {productPage.testimonials.map((testimonial) => (
                  <figure key={testimonial.quote} className="products-testimonial">
                    <blockquote>{testimonial.quote}</blockquote>
                    <figcaption>{testimonial.attribution}</figcaption>
                  </figure>
                ))}
              </div>
            ) : null}

            {actions?.length ? (
              <div className="products-panel-actions">
                {actions.map((cta) => (
                  <ProductLink key={cta.href} href={cta.href} external={cta.external}>
                    {cta.label}
                  </ProductLink>
                ))}
              </div>
            ) : null}
          </aside>
        </div>
      </div>

      {productPage.featuredIn ? (
        <div className="products-featured-bar">
          <div className="editorial-container products-featured-inner">
            <p>Featured in</p>
            <div>
              {productPage.featuredIn.map((publication) => (
                <a
                  key={publication.label}
                  href={publication.href}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring"
                >
                  {publication.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </motion.section>
  );
}

function ProductSection({ section }: { section: ProductPageData["sections"][number] }) {
  return (
    <section className="products-copy-section">
      <p className="products-section-label">{section.label}</p>

      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      {section.stats?.map((stat) => (
        <p key={`${stat.accent ?? ""}${stat.text}`} className="products-stat-line">
          {stat.accent ? <strong>{stat.accent}</strong> : null}
          {stat.accent ? " " : null}
          {stat.text}
        </p>
      ))}

      {section.features?.map((feature) => (
        <p key={feature.title} className="products-feature-line">
          <strong>{feature.title}</strong> {feature.text}
        </p>
      ))}

      {section.closing?.map((paragraph) => (
        <p key={paragraph} className="products-closing-line">
          {paragraph}
        </p>
      ))}
    </section>
  );
}

function ProductSideSection({
  section
}: {
  section: NonNullable<ProductPageData["sideSections"]>[number];
}) {
  return (
    <section className="products-side-section">
      <p className="products-section-label">{section.label}</p>
      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.closing?.map((paragraph) => (
        <p key={paragraph} className="products-closing-line">
          {paragraph}
        </p>
      ))}
    </section>
  );
}

function ProductLink({
  href,
  external,
  children
}: {
  href: string;
  external?: boolean;
  children: ReactNode;
}) {
  const className = "focus-ring products-panel-link";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
        <ArrowUpRight aria-hidden="true" />
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
      <ArrowUpRight aria-hidden="true" />
    </Link>
  );
}
