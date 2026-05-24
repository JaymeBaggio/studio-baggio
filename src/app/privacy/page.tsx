import type { Metadata } from "next";
import { PageReveals } from "@/components/page-reveals";
import { metadata as siteMetadata } from "@/content/site";

export const metadata: Metadata = {
  title: siteMetadata.privacy.title,
  description: siteMetadata.privacy.description,
  alternates: { canonical: "/privacy" }
};

export default function PrivacyPage() {
  const items = [
    {
      title: "What the form collects",
      body:
        "The contact form asks for your name, email address, business or firm, website, what you are trying to improve and where you think AI could help."
    },
    {
      title: "Why it is collected",
      body:
        "Studio Baggio uses this information to understand the enquiry and reply with relevant context. It is not used for automated marketing lists from this website."
    },
    {
      title: "Where submissions are sent",
      body:
        "Submissions are sent by email to jayme@studiobaggio.ai through the configured transactional email provider."
    },
    {
      title: "Your data questions",
      body:
        "You can contact jayme@studiobaggio.ai to ask about your submission or request deletion of the information you sent."
    },
    {
      title: "Analytics",
      body:
        "This phase-1 build does not install analytics or tracking scripts. If analytics are added later, this page should be updated before launch."
    }
  ];

  return (
    <>
      <PageReveals />
      <section className="section-pad pt-32">
        <div className="editorial-container">
          <p className="eyebrow">Privacy</p>
          <h1 className="display-xl mt-6 max-w-6xl" data-split>
            Simple privacy notes for Studio Baggio contact enquiries.
          </h1>
        </div>
      </section>
      <section className="section-pad border-t border-ink/12">
        <div className="editorial-container border-t border-ink/15">
          {items.map((item) => (
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
