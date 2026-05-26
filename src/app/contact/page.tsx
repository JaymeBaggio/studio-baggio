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
      <div className="home-4b studio-page">
        <section className="studio-page-hero">
          <div className="editorial-container studio-page-frame">
            <div>
              <p className="eyebrow" data-reveal data-motion="label">{contactPage.eyebrow}</p>
              <h1 className="studio-page-title" data-split>
                {contactPage.title}
              </h1>
              <p className="studio-page-body" data-reveal>
                {contactPage.body}
              </p>
              <p className="studio-contact-email" data-reveal>
                {contactPage.email}
              </p>
            </div>
          </div>
        </section>
        <section>
          <div className="editorial-container">
            <div className="studio-contact-panel" data-reveal data-motion="evidence">
              <ContactForm />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
