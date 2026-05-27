export function OpeningOutcomeStack({
  lead,
  final,
  label
}: {
  lead: string[];
  final?: string;
  label: string;
  controlled?: boolean;
}) {
  return (
    <div className="opening-outcome-stack" aria-label={label}>
      <div className="opening-outcome-muted-group">
        {lead.map((line) => (
          <p key={line} data-outcome-support="true">
            {line}
          </p>
        ))}
      </div>
      {final ? (
        <p className="is-strong" data-outcome-emphasis="true">
          {final}
        </p>
      ) : null}
    </div>
  );
}
