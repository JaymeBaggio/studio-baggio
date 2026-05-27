import { home } from "@/content/site";
import { cn } from "@/lib/utils";

export function ExpertiseBridge() {
  return (
    <section className="expertise-bridge-section">
      <div className="editorial-container expertise-bridge-frame">
        <div className="expertise-bridge-heading">
          <p className="eyebrow" data-reveal>
            {home.expertiseBridge.eyebrow}
          </p>
          <h2 className="expertise-bridge-title" data-split>
            {home.expertiseBridge.title}
          </h2>
        </div>

        <div className="expertise-copy-panel">
          {home.expertiseBridge.body.map((paragraph, index) => (
            <p key={paragraph} className={index === home.expertiseBridge.body.length - 1 ? "is-strong" : ""}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className="expertise-progress-grid" aria-label="Internal expertise to intelligent follow-up">
          {home.expertiseBridge.steps.map((step, index) => {
            const isFinal = index === home.expertiseBridge.steps.length - 1;
            return (
              <div
                key={step}
                className={cn("expertise-progress-card", isFinal && "is-final")}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
