/**
 * Studio Baggio end mark, bound to the last word of a title.
 * The last word and the square share a no-wrap span, so the square can never
 * sit on a line of its own, and `.sb-mark` is immune to page-level span rules.
 */
export function LastWordMark({ text }: { text: string }) {
  const clean = text.trim().replace(/\.$/, "");
  const cut = clean.lastIndexOf(" ");
  const head = cut === -1 ? "" : clean.slice(0, cut + 1);
  const last = cut === -1 ? clean : clean.slice(cut + 1);

  return (
    <>
      {head}
      <span className="sb-nowrap">
        {last}
        <span className="sb-mark" aria-hidden="true" />
      </span>
    </>
  );
}
