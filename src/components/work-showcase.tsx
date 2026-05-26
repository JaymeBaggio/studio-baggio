"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { workItems } from "@/content/work";

export function WorkShowcase() {
  return (
    <div className="studio-page-rows is-full">
      {workItems.map((item, index) => (
        <article key={item.slug} className="studio-page-row" data-reveal>
          <span className="studio-page-row-number">0{index + 1}</span>
          <div>
            {item.status ? <p className="studio-work-status">{item.status}</p> : null}
            <h2 className="studio-page-row-title">{item.title}</h2>
            <p className="studio-work-eyebrow">{item.eyebrow}</p>
          </div>
          <div className="studio-page-row-copy">
            {item.promise ? <p>{item.promise}</p> : null}
            {item.proofCopy ? <p>{item.proofCopy}</p> : null}
            <ProofBlock label="Commercial problem" text={item.problem} />
            <ProofBlock label="System built" text={item.built} />
            <ProofBlock label="Why it matters" text={item.whyItMatters} />
            <ProofBlock label="What it proves" text={item.proves} />
            <div className="studio-row-actions">
              {item.href ? <WorkLink href={item.href}>Read more</WorkLink> : null}
              {item.external ? (
                <WorkLink href={item.external} external>
                  Open live site
                </WorkLink>
              ) : null}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function ProofBlock({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="studio-page-row-kicker">{label}</p>
      <p>{text}</p>
    </div>
  );
}

function WorkLink({
  href,
  children,
  external
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const className =
    "focus-ring studio-row-link";
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}
