import type { ResearchEditionMasthead } from "./types";

export function ResearchMasthead({ edition }: { edition: ResearchEditionMasthead }) {
  return (
    <header className="research-masthead" data-research-masthead>
      <div className="editorial-container research-masthead__shell">
        <p className="eyebrow" data-research-masthead-item>
          {edition.eyebrow ?? "Studio Baggio AI Discovery Study"}
        </p>

        <div className="research-masthead__frame">
          <div className="research-masthead__statement">
            {edition.finding ? (
              <p className="research-masthead__edition-title" data-research-masthead-item>
                {edition.title}
              </p>
            ) : null}
            <h1 data-research-masthead-item>
              {(edition.finding ?? edition.title).replace(/\.$/, "")}
              <span className="research-masthead__blue-dot" aria-hidden="true">.</span>
            </h1>
          </div>

          <div className="research-masthead__copy">
            {edition.description ? (
              <p className="research-masthead__description" data-research-masthead-item>
                {edition.description}
              </p>
            ) : null}
            <p className="research-masthead__summary" data-research-masthead-item>
              {edition.summary}
            </p>
          </div>
        </div>

        {edition.sampleQuestions?.length ? (
          <div className="research-masthead__questions" data-research-masthead-item>
            <p className="eyebrow">Example buyer questions</p>
            <ul>
              {edition.sampleQuestions.map((question) => (
                <li key={question}>
                  <strong>&ldquo;{question}&rdquo;</strong>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </header>
  );
}
