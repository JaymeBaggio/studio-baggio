# Calm Authority proof review

Approved scope: add compact proof after the SEO service in the existing card stack; preserve existing service copy, testimonials and press. Add a linked case study. Add a compact matching proof box on existing PDF page 2; retain five pages. Use the approved wording verbatim. No deployment.

Base: origin/main 9101cde. Branch: feature/calm-authority-proof.

Ranking: proposed sixth-place wording is not included in the implementation because the historical full-study data does not reconcile with that rank. The case-study draft uses Jayme’s approved sixth-most-cited wording. The historical full-study data available here does not reconcile with that rank, so verify the comparison scope before publication. The 36-answer line remains excluded.

Motion QA: the new compact card was fading as soon as the next card entered the bottom of the viewport, leaving the proof pale while still on screen. Its fade now begins when the next card reaches its lower edge. Checked forward and backward scrolling on the local preview, including direct hash entry. Desktop and 390px screenshots are saved in output/.

Validation: `npm run build`, `npm run lint`, `git diff --check`; local services, case-study route and PDF all returned HTTP 200. Five PDF pages rendered and visually inspected; page 2's proof pair, quote, press logos and footer fit without overlap.
