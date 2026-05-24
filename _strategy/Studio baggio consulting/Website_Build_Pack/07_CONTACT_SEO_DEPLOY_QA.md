# 07 Contact, SEO, Deploy And QA

## Tech Direction

Use the strongest practical stack for this site.

Preferred:

- Next.js / React
- TypeScript
- Tailwind
- GSAP + ScrollTrigger + SplitText
- Framer Motion
- shadcn/ui
- React Hook Form + Zod
- Vercel deployment

If the existing repo is static HTML, it is acceptable to convert it into a modern React/Next site in the same repo, preserving useful assets and Git history.

Do not keep the old static site if it blocks quality.

## Contact Page And Form

Use `jayme@studiobaggio.ai` as the main contact email.

Build a real contact form.

Fields:

- Name
- Email
- Business / firm
- Website
- What are you trying to improve?
- Where do you think AI could help?

Technical requirements:

- React Hook Form + Zod validation.
- shadcn/ui form primitives where appropriate.
- Clear field labels and field-level errors.
- Loading, success and error states.
- Submit should send email to `jayme@studiobaggio.ai`.
- Prefer Resend or another Vercel-friendly transactional email provider.
- Use environment variables such as `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
- If no API key exists locally, implement the endpoint and document exactly which Vercel env vars are required.
- Do not pretend the form works if env vars are missing.
- Add spam protection appropriate for v1, such as honeypot field and basic rate limiting if practical.

## Privacy Page

Because the site collects contact-form submissions, include a simple Privacy page.

The Privacy page should cover:

- what information the form collects
- why it is collected
- where submissions are sent
- that users can contact `jayme@studiobaggio.ai` about their data
- that the site may use basic analytics only if analytics is actually installed

Do not add cookie-banner or analytics language unless analytics/tracking is actually implemented.

Footer should include:

- Studio Baggio Ltd
- `jayme@studiobaggio.ai`
- Privacy link
- current year

If adding company registration details, verify them first from a reliable source or leave them out.

## SEO And Metadata

Add strong metadata for:

- Home
- AI Commercial Advantage
- Work
- Business Tracker
- Calm Authority
- About
- Contact
- Privacy
- Fire Source if it becomes a standalone work detail page rather than only a work-section feature

Use terms:

- AI commercial advantage
- practical AI systems
- commercial AI implementation
- AI strategy for expert-led businesses
- AI search
- AI SEO
- market intelligence
- lead intelligence
- authority systems
- workflow acceleration

Add where practical:

- Open Graph metadata
- clean social previews
- `sitemap.xml`
- `robots.txt`
- canonical URLs
- Organization schema / JSON-LD for Studio Baggio Ltd
- clean page titles and descriptions that do not keyword-stuff

SEO should support the positioning, not flatten the copy into generic AI-consultant language.

Suggested title direction:

- Home: `Studio Baggio | AI Commercial Advantage Systems`
- AI Advantage: `AI Commercial Advantage for Expert-Led Businesses`
- Work: `Studio Baggio Work | AI Systems, Products and Growth Intelligence`
- Calm Authority: `Calm Authority | AI LinkedIn System for Financial Advisers`

Adjust titles naturally if the final content structure needs it.

## Deployment

After build and QA:

- Commit changes to Git.
- Push to GitHub remote.
- Deploy to Vercel.
- Connect/verify production domain:
  - `studiobaggio.ai`
  - `www.studiobaggio.ai`

If the Vercel project already exists, use the existing project if sensible.

If it is cleaner to create a new Vercel project from the same GitHub repo, do that, but document the decision.

Deploy preview first if needed for QA, then promote production once checks pass. The goal is to replace the outdated live site.

## QA Requirements

Before final:

- Run lint/typecheck/build.
- Start local dev server and inspect full site.
- Use the in-app browser or approved browser workflow for screenshots.
- Verify desktop and mobile.
- Verify keyboard navigation, focus states and form accessibility.
- Verify all nav links.
- Verify contact form validation and submit behaviour.
- Verify reduced-motion mode does not break the page.
- Verify no text overlaps or gets clipped.
- Verify the GSAP hero and scroll sections are actually visible and smooth.
- Verify images/assets load.
- Verify SEO metadata.
- Verify sitemap, robots and canonical URLs if implemented.
- Verify Vercel deployment URL.
- Verify production domain after deployment.

## Status Updates

Update:

- `/Users/jaymebaggio/Desktop/Studio Baggio/Website/STATUS.md`
- moved/copied strategy folder STATUS if relevant
- any root project notes needed for future sessions

Include:

- what was built
- what was deferred
- deployment URL
- production domain status
- contact form environment variable status
- known follow-up tasks

## Success Criteria

The build is successful when:

- The new site clearly communicates Studio Baggio's offer within 5 seconds.
- The homepage leads with `Turn AI into a commercial advantage.`
- The design feels premium, editorial and motion-led.
- The GSAP hero and scroll animation feel smooth and deliberate.
- The site includes Home, AI Commercial Advantage, Work, Business Tracker, Calm Authority, About, Contact and Privacy.
- The site includes a dedicated Business Tracker page using `06_BUSINESS_TRACKER_COPY.md`.
- Calm Authority has a proper page and external links.
- Work includes Calm Authority, Hanbury / Growth Intelligence, Business Tracker, Last30Days and Fire Source.
- Core site copy and Work copy live in an editable content layer, not only inside JSX components.
- Contact form is real or fully implemented pending documented env vars.
- The site is committed, pushed, deployed and connected to `studiobaggio.ai`.
