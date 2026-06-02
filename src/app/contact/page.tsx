import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageReveals } from "@/components/page-reveals";
import { contactPage, metadata as siteMetadata } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ ...siteMetadata.contact, path: "/contact" });

export default function ContactPage() {
  return (
    <>
      <PageReveals />
      <div className="home-4b studio-page contact-page">
        <section className="studio-contact-section">
          <div className="editorial-container studio-contact-frame">
            <div className="studio-contact-intro">
              <p className="eyebrow" data-reveal data-motion="label">{contactPage.eyebrow}</p>
              <h1 className="studio-page-title studio-contact-title" data-reveal>
                <span>{contactPage.title.replace(/\.$/, "")}</span>
                <span className="studio-contact-title-dot" aria-hidden="true">.</span>
              </h1>
              <p className="studio-page-body" data-reveal>
                {contactPage.body}
              </p>
              <p className="studio-contact-email" data-reveal>
                {contactPage.email}
              </p>
            </div>
            <div className="studio-contact-panel" data-reveal data-motion="evidence">
              <ContactForm />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
