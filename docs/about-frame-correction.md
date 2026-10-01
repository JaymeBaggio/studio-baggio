# About page frame correction

Preserve the approved About copy, metadata, five logos and desktop columns. Restore an inline Featured in label and logo strip, then reclaim vertical space through paragraph leading and spacing. Keep body text at its existing size and leave clear space below the final content. Suppress the duplicate floating offer on About so it cannot cover the page's enquiry action.

Verify the entire first viewport at 1510 × 860 and 1512 × 884 (the supplied screenshots), plus shorter desktop and mobile layouts. The complete strip and enquiry button must be visible with breathing room; a full-page capture or hidden overflow does not establish this. Check the deployed page in Chrome before reporting completion.

## Verification

- The strip ends at 768px in the 1510 × 860 viewport, leaving 92px below it.
- At 1366 × 768, all five logos stay inline, the strip ends at 733px and the enquiry action at 725px. No page overflow.
- The shorter 1512 × 801 browser frame retains the complete strip and enquiry action with at least 38px below the content.
- Mobile at 390 × 844 retains its original typography and stacked layout; all logos remain visible without horizontal overflow.
- Body copy, body font sizes, metadata and links are unchanged.
- Lint, TypeScript and the production build pass.

## Follow-up: remove the redundant About label

Removed the blue About eyebrow and the heading margins that separated it from the title. The 1510 × 860 viewport now has 118px below the complete logo strip, with no overflow. Checked the heading's clearance from the navigation on desktop and at 390 × 844; lint and the production build pass.
