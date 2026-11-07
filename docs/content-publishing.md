# Property content publishing

## Published structure

- `/areas`: six reviewed area records (Paje, Jambiani, Nungwi, Kendwa, Fumba, Matemwe).
- `/guides`: five decision guides (apartments, villas, payment plans, budgets below $150,000, acquisition costs).
- `/blog`: four evergreen comparisons (Paje/Fumba, apartment/villa, off-plan/completed, gross/net yield).
- Homepage remains the private referral landing page, with resource links below its conversion content.

## Automatic generation, reviewed inputs

`src/content/seo-pages.json` is the source of reviewed content. The shared React page template and build pipeline create a separate HTML response for every published record and hub. This is programmatic page generation at build time, not unattended AI writing or a scheduled article publisher.

For another page, add a complete record with a unique canonical path, a direct answer of at most 50 words, a meaningful comparison table, distinct analysis, questions, related links, source scope and an accurate publication date. Area-specific guidance must add information beyond swapping the place name. Avoid unverified prices, returns, inventory or claims that documents have been checked. Keep developer/project identities, brochures and private contact details out of public content. Never add a budget page that implies actual stock without evidence.

Run `npm run typecheck`, `npm test -- --pool=threads --maxWorkers=1`, and `npm run build`. The build automatically:

1. Generates the sitemap, its server response constant and reviewed legacy redirects.
2. Builds the browser assets and an isolated SSR render entry.
3. Renders all public routes into individual HTML files with unique title, description, canonical, OpenGraph metadata, JSON-LD and visible content.
4. Creates a non-indexable custom 404; there is no all-path SPA rewrite.
5. Audits every generated page, semantic table, direct answer, source scope, internal link, sitemap entry and redirect target.

The generated `.seo-build` directory is ignored; it must not be committed. The JSON content, generator scripts, `public/sitemap.xml`, `server/seo-sitemap.ts` and `vercel.json` are tracked. Commit changes only after reviewing generated routes and passing checks. New content is published through the existing tested deployment workflow.

## Sources and commercial safety

Official procedure sources are context only, not confirmation of a particular transaction. Location map links identify the general area, not a property. Financial numbers appear only as explicitly hypothetical arithmetic examples. Independent legal review is requested without asserting universal tenure terms, tax rates or eligibility rules.

All commercial CTAs use `/#enquiry`. They preserve the existing consented lead capture; content pages do not expose a developer directory or automatically select a developer. Existing developer email distribution remains subject to the previously documented partner/sender setup.

## Measuring outcomes

Publishing makes these pages crawlable; it does not establish indexing, rankings or traffic growth. Use the site's Search Console and GA4 data to track impressions, clicks, indexed pages and completed enquiries by landing page after publication. No traffic increase has been verified in this change.
