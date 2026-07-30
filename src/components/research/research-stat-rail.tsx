import type { ResearchStat } from "./types";

export function ResearchStatRail({ stats }: { stats: ResearchStat[] }) {
  return (
    <section className="research-stat-rail" aria-label="Edition at a glance" data-research-stat-rail>
      <div className="editorial-container">
        <dl>
          {stats.map((stat) => (
            <div key={stat.label} data-research-stat>
              <dt>{stat.label}</dt>
              <dd>
                <strong>{stat.value}</strong>
                {stat.detail ? <span>{stat.detail}</span> : null}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
