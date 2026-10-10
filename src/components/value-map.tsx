import { home, valueAreas } from "@/content/site";

function includesSentence(items: string[]) {
  const keepCase = (item: string) => /^(Google|AI\b|LinkedIn)/.test(item);
  const parts = items.map((item, index) =>
    index === 0 || keepCase(item) ? item : item.charAt(0).toLowerCase() + item.slice(1)
  );
  if (parts.length < 2) return `${parts.join("")}.`;
  return `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}.`;
}

export function ValueMap() {
  return (
    <section
      className="home-section value-map-section"
      data-home-section
      data-motion-section="value"
    >
      <div className="editorial-container value-map-frame">
        {home.value.eyebrow ? (
          <p className="eyebrow value-map-eyebrow" data-reveal>
            {home.value.eyebrow}
          </p>
        ) : null}
        {home.value.title ? <h2 className="value-grid-title">{home.value.title}</h2> : null}

        <div className="value-grid">
          {valueAreas.map((area) => (
            <article key={area.title} className="value-grid-item" data-reveal>
              <h3 className="value-grid-heading">{area.title}</h3>
              <p className="value-grid-summary">{area.summary}</p>
              <p className="value-grid-label">Includes</p>
              <p className="value-grid-includes">{includesSentence(area.includes)}</p>
              <p className="value-grid-goal">{area.goal}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
