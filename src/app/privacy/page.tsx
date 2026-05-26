import type { Metadata } from "next";
import { PageReveals } from "@/components/page-reveals";
import { metadata as siteMetadata, privacyPage } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ ...siteMetadata.privacy, path: "/privacy" });

export default function PrivacyPage() {
  return (
    <>
      <PageReveals />
      <div className="home-4b studio-page">
        <section className="studio-page-hero">
          <div className="editorial-container studio-page-frame">
            <div>
              <p className="eyebrow" data-reveal data-motion="label">{privacyPage.eyebrow}</p>
              <h1 className="studio-page-title" data-split>
                {privacyPage.title}
              </h1>
            </div>
          </div>
        </section>
        <section>
          <div className="editorial-container">
            <div className="studio-page-rows is-full">
              {privacyPage.items.map((item, index) => (
                <article key={item.title} className="studio-page-row" data-reveal>
                  <span className="studio-page-row-number">0{index + 1}</span>
                  <h2 className="studio-page-row-title">{item.title}</h2>
                  <p className="studio-page-row-copy">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
