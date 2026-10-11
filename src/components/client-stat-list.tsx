import { clientStats, type ClientStatId } from "@/content/site";

export function ClientStatList({ ids, columns = 2 }: { ids: ClientStatId[]; columns?: 1 | 2 }) {
  return (
    <ul className={`mt-4 grid gap-x-8 gap-y-4${columns === 2 ? " sm:grid-cols-2" : ""}`}>
      {ids.map((id) => {
        const stat = clientStats[id];
        return (
          <li key={id} className="border-t border-ink/15 pt-3 text-base leading-relaxed text-ink/75">
            <strong className="font-semibold text-ink">{stat.figure}</strong> {stat.text}{" "}
            <a
              className="focus-ring text-xs text-ink/45 underline underline-offset-2 transition-colors hover:text-ink"
              href={stat.href}
              target="_blank"
              rel="noreferrer"
            >
              {stat.source}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
