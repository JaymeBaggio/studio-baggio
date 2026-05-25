import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { PageReveals } from "@/components/page-reveals";
import { primaryCta } from "@/content/site";
import { workItems } from "@/content/work";
import { pageMetadata } from "@/lib/metadata";

const fireSource = workItems.find((item) => item.slug === "fire-source")!;

export const metadata: Metadata = pageMetadata({
  title: "Fire Source | Studio Baggio",
  description:
    "Fire Source is a Studio Baggio commercial intelligence system for cited open-web research, competitor movement, market shifts and prospect intelligence.",
  path: "/fire-source"
});

export default function FireSourcePage() {
  return (
    <>
      <PageReveals />
      <section className="section-pad pt-32">
        <div className="editorial-container">
          <p className="eyebrow">{fireSource.status}</p>
          <h1 className="display-xl mt-6 max-w-7xl" data-split>
            {fireSource.promise}
          </h1>
          <p className="body-large mt-10 max-w-3xl text-ink/72" data-reveal>
            {fireSource.built}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            {fireSource.external ? (
              <ButtonLink href={fireSource.external} external>
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
            A placeholder case study for the open-web intelligence system.
          </h2>
          <div className="space-y-7 body-large text-ink/72" data-reveal>
            <p>{fireSource.problem}</p>
            <p>{fireSource.whyItMatters}</p>
            <p>{fireSource.proves}</p>
          </div>
        </div>
      </section>
    </>
  );
}
