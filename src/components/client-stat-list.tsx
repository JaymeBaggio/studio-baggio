import { clientStats, type ClientStatId } from "@/content/site";

export function ClientStatList({ ids, columns = 2 }: { ids: ClientStatId[]; columns?: 1 | 2 }) {
  return (
    <ul className={`mt-4 grid gap-x-8 gap-y-4${columns === 2 ? " sm:grid-cols-2" : ""}`}>
      {ids.map((id) => {
        const stat = clientStats[id];
        return (
          <li key={id} className="border-t border-ink/15 pt-3 text-base leading-relaxed text-ink/75">
            <strong className="font-semibold text-[color:var(--sb-accent-blue)]">{stat.figure}</strong>{" "}
            {stat.text}
            <span className="mt-1 block text-sm text-ink/45">{stat.source}</span>
          </li>
        );
      })}
    </ul>
  );
}
