type ResearchContextSectionProps = {
  heading: string;
  titleId: string;
};

export function ResearchContextSection({ heading, titleId }: ResearchContextSectionProps) {
  return (
    <section className="fa3-section fa3-context fa3-context--compact" aria-labelledby={titleId}>
      <div className="editorial-container">
        <header className="fa3-section-heading">
          <div>
            <p className="fa3-kicker">Why this matters now</p>
            <h2 id={titleId}>{heading}</h2>
          </div>
          <p>
            Buyers are increasingly using AI to research options, compare firms and decide who to
            choose. The route to the shortlist is shifting, and being part of the consideration set
            is becoming increasingly commercially valuable.
          </p>
        </header>
        <div className="fa3-context__stats">
          <article>
            <strong>92%</strong>
            <p>
              of B2B buyers using AI say it has shaped their vendor shortlist, while{" "}
              <span className="fa3-context__inline-stat">83%</span> say it has influenced their
              final vendor decision.
            </p>
            <cite>Semrush, 2026</cite>
          </article>
          <article>
            <strong>58%</strong>
            <p>
              of consumers have replaced traditional search engines with generative AI tools as
              their go-to for product and service recommendations, up from{" "}
              <span className="fa3-context__inline-stat">25% in 2023</span>.
            </p>
            <cite>Capgemini Research Institute, 2025</cite>
          </article>
          <article>
            <strong>75%+</strong>
            <p>of Google searches are expected to include AI-generated summaries by 2028.</p>
            <cite>McKinsey, 2025</cite>
          </article>
          <article>
            <strong>
              60% <span>higher</span>
            </strong>
            <p>AI-referred visitors converted better than non-AI traffic in July 2026.</p>
            <cite>Adobe Digital Insights, U.S. retail data</cite>
          </article>
        </div>
      </div>
    </section>
  );
}
