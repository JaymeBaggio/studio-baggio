import type { Metadata } from "next";
import { PageReveals } from "@/components/page-reveals";
import { metadata as siteMetadata, privacyPage } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ ...siteMetadata.privacy, path: "/privacy" });

export default function PrivacyPage() {
  return (
    <>
      <PageReveals />
      <section className="section-pad pt-32">
        <div className="editorial-container">
          <p className="eyebrow">{privacyPage.eyebrow}</p>
          <h1 className="display-xl mt-6 max-w-6xl" data-split>
            {privacyPage.title}
          </h1>
        </div>
      </section>
      <section className="section-pad border-t border-ink/12">
        <div className="editorial-container border-t border-ink/15">
          {privacyPage.items.map((item) => (
            <div key={item.title} className="grid gap-5 border-b border-ink/12 py-7 md:grid-cols-[0.4fr_1fr]" data-reveal>
              <h2 className="text-3xl leading-none">{item.title}</h2>
              <p className="body-large text-ink/72">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
