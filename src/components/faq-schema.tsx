type FaqItem = {
  question: string;
  answer: string;
};

type FaqSchemaProps = {
  items: ReadonlyArray<FaqItem>;
};

// Server component that emits FAQPage JSON-LD built from the existing home FAQ
// content. It never alters the question or answer wording — it reads it as-is.
export function FaqSchema({ items }: FaqSchemaProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}
