# Private dataset CTA on the financial-advice research page

*Spec, 20 September 2026. Decided by Jayme in conversation the same day. Built from origin/main in a scratch worktree; pushed to main only on her word.*

## What it is

Two placements on `/research/uk-financial-advice-2026` that turn the page's existing traffic (people looking their firm up) into a qualified email, without a new product and without replacing the method drawer.

1. **Section under the masthead.** Headline, one paragraph, two sourced statistics in the page's own stat style, and a three-field form (work email, firm, role). Same blue-tinted surface as the existing inline CTA and "Why this matters now" block.
2. **Inline line beside the firm results.** Directly after the Selection breadth explorer: one sentence, an email field and a button.

Both post to a new route `/api/dataset-interest`, which emails Jayme and records a lead in the Business Tracker with source `private-dataset`, reusing the contact route's Resend and ingest pattern. Free-mail domains are rejected so the box only takes work addresses.

## Copy (Jayme's decisions)

- Headline: **How high-net-worth clients choose advisers in AI search.**
- Paragraph: Studio Baggio holds an unpublished dataset on how AI recommends advisers to high-net-worth clients, starting with business owners before and after a company sale. It is not published and is used only inside client engagements.
- Stat 1: **82%** of high-net-worth investors (US$2m+) use AI for finance and investment. 73% of all affluent investors do. *HSBC Global Affluent Report, 2026* (Ipsos, ~10,000 investors, 10 markets; verified on hsbc.com).
- Stat 2: **1 in 2** investors with $5m+ found their adviser without any referral. *Ficomm Partners, 2026* (1,000 US investors; verified on the PR Newswire release, 3 June 2026).
- Form lead: If winning these clients is a current priority for your firm, leave your work email and I'll show you how the dataset applies to you.
- Inline sentence: Your firm's result above is the public study. The private dataset shows the journey behind it.
- Success: Thanks, I have it. I'll come back to you personally.
- Errors name the problem: work email required; firm required on the full form.

"Used only inside client engagements" is deliberate: true, and promises nobody exclusivity.

## What happens after a submission

Enrich in the tracker, qualify against the five-point gate, one email offering the £15k audit. No deck, no free strategy.

## Out of scope

The Snapshot (`feat/ai-search-snapshot`, unmerged) stays as it is; this CTA is its front door until it ships. No change to the method drawer, the results explorer or the existing audit CTAs.

## Verification

Typecheck, lint, production build. Local render checked at 1512x801 and 390px. After push, live check through Jayme's Chrome via Playwriter, and a test submission confirmed in her inbox and the tracker.
