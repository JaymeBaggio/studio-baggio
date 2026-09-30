# SEO and AI search offer rename

Approved instruction: rename the offer everywhere on the website to **AI Search Strategy & Implementation Plan**.

Update the shared homepage/floating card, service name and related descriptions, homepage and service FAQs, About service link, research calls to action and disclosure, GEO article, metadata/schema, and downloadable introduction. Keep scope, delivery timing, fee-credit conditions, evidence and other service offers unchanged. Retain existing service anchors and analytics identifiers for compatibility.

Check the production build, remaining old offer names, desktop/mobile card and service layouts, relevant links, research calls to action, and the rendered PDF before publishing. Verify the custom domain and downloaded PDF after release.

Verified before release on 30 September 2026: lint, TypeScript and the production build pass. All 34 sitemap/supporting routes return successfully without the old SEO audit offer name. The homepage card and services layout were inspected at 1440px and 390px, and the floating pill and expanded card at 1024px; the service link reaches the existing anchor and the layouts have no horizontal overflow. Research calls to action and the six-page PDF were reviewed. The PDF retains the other service pages unchanged and preserves the delivery and fee-credit terms.

The editable PDF source is `docs/studio-baggio-introduction.html`, using the repository's fonts and logos. Print with background graphics and its CSS page size to regenerate `public/downloads/studio-baggio-introduction.pdf`.
