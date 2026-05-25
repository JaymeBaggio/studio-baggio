import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { PageReveals } from "@/components/page-reveals";
import { primaryCta } from "@/content/site";
import { workItems } from "@/content/work";
import { pageMetadata } from "@/lib/metadata";

const last30days = workItems.find((item) => item.slug === "last30days")!;

export const metadata: Metadata = pageMetadata({
  title: "Last30Days | Studio Baggio",
  description:
    "Last30Days is a Studio Baggio market-signal system for recent discussion, sentiment and sourced reports across social platforms and the open web.",
  path: "/last30days"
});

export default function Last30DaysPage() {
  return (
    <>
      <PageReveals />
      <section className="section-pad pt-32">
        <div className="editorial-container">
          <p className="eyebrow">{last30days.status}</p>
          <h1 className="display-xl mt-6 max-w-7xl" data-split>
            {last30days.promise}
          </h1>
          <p className="body-large mt-10 max-w-3xl text-ink/72" data-reveal>
            {last30days.built}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            {last30days.external ? (
              <ButtonLink href={last30days.external} external>
                Open live system
              </ButtonLink>
            ) : null}
            <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
          </div>
        </div>
      </section>

      <section className="section-pad border-y border-ink/12">
        <div className="editorial-container grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <h2 className="display-lg" data-split>
            A placeholder case study for the recent-market-signal system.
          </h2>
          <div className="space-y-7 body-large text-ink/72" data-reveal>
            <p>{last30days.problem}</p>
            <p>{last30days.whyItMatters}</p>
            <p>{last30days.proves}</p>
          </div>
        </div>
      </section>
    </>
  );
}
