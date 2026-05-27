import Image from "next/image";
import type { BusinessTrackerInputMapCard } from "@/content/site";

type BusinessTrackerInputMapProps = {
  eyebrow: string;
  bridge: string;
  cards: BusinessTrackerInputMapCard[];
};

export function BusinessTrackerInputMap({ eyebrow, bridge, cards }: BusinessTrackerInputMapProps) {
  return (
    <section
      className="bt-input-map-section"
      aria-label="Input Map"
      data-business-tracker-section="input-map"
      data-home-section
      data-motion-section="input-map"
    >
      <div className="editorial-container bt-input-map-frame">
        <header className="bt-input-map-header">
          <p className="eyebrow" data-reveal data-motion="label">
            {eyebrow}
          </p>
          <p className="bt-input-map-bridge" data-reveal data-motion="emphasis">
            {bridge}
          </p>
        </header>

        <div className="bt-input-map-cards" role="list" aria-label="Business Tracker input sources">
          {cards.map((card, index) => (
            <article
              key={card.title}
              className="bt-input-map-card"
              role="listitem"
              data-reveal
              data-input-map-card={index === 0 ? "primary" : undefined}
            >
              <span className="bt-input-map-card-number" data-input-map-step>
                {card.number}
              </span>
              <h2 className="bt-input-map-card-title" data-input-map-step>
                {card.title}
              </h2>
              <div className="bt-input-map-mock" data-input-map-step>
                <Image
                  src={card.image.src}
                  width={card.image.width}
                  height={card.image.height}
                  alt={card.image.alt}
                  loading={index === 0 ? "eager" : "lazy"}
                  unoptimized={index === 0}
                  sizes="(max-width: 767px) calc(100vw - 36px), (max-width: 1023px) calc((100vw - 84px) / 2), 25vw"
                  className={card.image.fit === "cover" ? "is-cover" : "is-contain"}
                />
              </div>
              <ul className="bt-input-map-bullets" role="list" data-input-map-step>
                {card.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <hr className="bt-input-map-rule" data-input-map-step />
              <p className="bt-input-map-failure" data-input-map-step>
                {card.failure}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
