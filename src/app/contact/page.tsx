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
      <section className="section-pad pt-32">
        <div className="editorial-container grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">{contactPage.eyebrow}</p>
            <h1 className="display-xl mt-6" data-split>
              {contactPage.title}
            </h1>
            <p className="body-large mt-8 text-ink/72" data-reveal>
              {contactPage.body}
            </p>
            <p className="mt-8 text-sm uppercase tracking-[0.07em] text-ink/55">
              {contactPage.email}
            </p>
          </div>
          <div className="border border-ink/12 p-5 md:p-8" data-reveal>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
