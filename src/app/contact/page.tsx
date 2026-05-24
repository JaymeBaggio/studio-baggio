import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageReveals } from "@/components/page-reveals";
import { metadata as siteMetadata } from "@/content/site";

export const metadata: Metadata = {
  title: siteMetadata.contact.title,
  description: siteMetadata.contact.description,
  alternates: { canonical: "/contact" }
};

export default function ContactPage() {
  return (
    <>
      <PageReveals />
      <section className="section-pad pt-32">
        <div className="editorial-container grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Contact</p>
            <h1 className="display-xl mt-6" data-split>
              Discuss your AI opportunity.
            </h1>
            <p className="body-large mt-8 text-ink/72" data-reveal>
              Bring the business, market or workflow you want to improve. Studio Baggio will help you work out where AI can create real commercial value, what should be built first and how it should connect to visibility, pipeline, workflow or client experience.
            </p>
            <p className="mt-8 text-sm uppercase tracking-[0.07em] text-ink/55">
              jayme@studiobaggio.ai
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
