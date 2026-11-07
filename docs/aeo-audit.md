# ZanziInvest AEO / SEO engineering audit — 7 November 2026

## Scope and evidence
Repository routes, content registry, rendered HTML and the existing live deployment were reviewed. This is an engineering readiness audit, not a measured AI visibility or revenue report. No Search Console/GA4 account data, sales transcripts, verified property inventory or independent reviews were supplied. Priorities below are inferred from enquiry fields and transactional intent, not measured revenue. Keep the existing design and all 19 canonical URLs.

## Site and entity map
Zanzibaba Company Limited operates ZanziInvest by Zanzibaba → Zanzibar property enquiry service → consenting prospective buyers/investors → participating developer introductions. Types in the enquiry include apartment, villa, land and hotel/resort. Public area coverage: Paje, Jambiani, Nungwi, Kendwa, Fumba, Matemwe. Actual property availability is developer-specific.

Homepage → /guides (5 buying guides), /areas (6 area guides), /blog (4 decision comparisons). These hubs and 15 records are statically rendered at build time. /dashboard is excluded/noindex; API and invalid paths are not sitemap entries. There are 85 legacy permanent redirects and an actual noindex 404. Metadata, canonical, source links, tables and explicit FAQs already existed. Primary gaps were disconnected schema, implicit bot policy, missing home FAQ schema, limited service facts and indistinguishable AI referrals.

## Priority route plan
P1: /, /guides/zanzibar-apartments, /guides/zanzibar-villas, /guides/zanzibar-property-payment-plans, /guides/zanzibar-property-under-150000, /guides/zanzibar-property-costs, /blog/paje-vs-fumba, /blog/apartment-vs-villa, /blog/off-plan-vs-completed-property, /blog/gross-vs-net-rental-yield.
P2: the six distinct area checklists and supporting hubs. No additional low-value location permutations, competitor claims or unavailable pricing pages were created.

## Prompt map (inferred, not search-volume evidence)
Decision prompts: Which Zanzibar apartment/villa fits my budget and use? What is excluded from a quoted price? How do milestone payments and delay/cancellation terms compare? Is an off-plan offer comparable to a completed unit? How do Paje and Fumba differ for my brief? Can one enquiry reach several developers? Does submission reserve a unit?
Learning prompts: What distinguishes gross and net rental yield? What evidence establishes beach access? What documents and site checks should I request?
Query fan-out used: (1) exact property/unit, (2) provider identity, (3) location and access, (4) availability date, (5) intended use, (6) enquiry process, (7) total acquisition cost, (8) payment timing, (9) apartment/villa and off-plan/completed comparisons, (10) recurring costs and constraints, (11) documents/cancellation requirements. Existing early tables answer the specific page decision; new buying-guide checklists connect those answers to a written offer.

## Implemented safeguards
- Explicit search/retrieval agents and separately labelled training/product tokens. Training remains allowed, matching prior policy. Every group repeats /api/ and /dashboard exclusions; robots is not authentication.
- public/robots.txt is the source; build generates server/seo-robots.ts for the API. WAF configuration is external: verify Cloudflare AI/bot settings and firewall events using genuine vendor IPs. Do not grant security bypasses solely on a spoofable User-Agent. HTTP success from a simulated agent does not prove vendor access.
- Connected Organization, WebSite, Service, WebPage/CollectionPage, editorial Article/BlogPosting, FAQPage and BreadcrumbList graph. FAQ text comes from visible content, including home. Schema eligibility does not guarantee rich results or citations.
- Brand facts state operator, service area, actual seven enquiry fields, consent, saved-versus-sent distinction, commissions and public contact. The enquiry collects no payment and makes no reservation.
- Explicit content modified dates drive visible Last updated and schema; sitemap uses record dates. Hub/home review date is editorially fixed, never bumped automatically per request/build.
- Known AI referrer category is retained in sessionStorage across internal pages and attached to page_view and generate_lead without sending the referrer query, contact details or lead reference. Unknown sources remain unknown. This is referral evidence, not proof of a citation or a qualified sale. Origin-only Bing/Google are not labelled AI. No analytics identifiers or backend contracts changed.
- Hero keeps WebP and eager loading with explicit source dimensions. Mobile table overflow is contained. No performance score or sub-2.5-second LCP is claimed without measurement.

## Missing first-party data / TODO
P0 operational: activate approved developer agreements/contact recipients and sender/scheduler integration before promising delivery. Leads can be saved while no developer is available. Preserve separate partner messages, commission attribution and explicit multi-developer consent.
P1: verify public service fees (if any), legal ownership/founder details, physical address, hours, geographic coordinates, approved logo/social profiles and formal service terms. Do not add Person/LocalBusiness/Offer/AggregateRating without this evidence. MOQ/retail returns do not apply to an enquiry; property contract cancellation terms belong to the actual offer. Have an appropriate adviser review privacy/retention/partner-sharing terms.
P2: publish consented, anonymised referral outcomes, documented response times and verified dated offer breakdowns when available. Current editorial checklists are not proprietary research or investment guarantees. Commission rates, case studies, reviews and current inventory remain unpublished.
P3: controlled title/CTA experiments once event volume supports comparison.

## Measurement and external validation
1. Search Console: submit /sitemap.xml; inspect homepage and priority guides, compare live HTML with indexed output. Review Search results clicks/impressions/CTR and the Generative AI performance report (Search), if available for the property. Check Settings → Search generative AI controls. Reports have different scopes; do not sum overlapping totals.
2. Bing Webmaster Tools: inspect sitemap/indexing and AI Performance cited pages/grounding queries. Citation totals are not rankings or attributable revenue.
3. GA4: register event-scoped ai_referral_engine custom dimension; compare page_view → referral_submit_started → generate_lead by landing page/source. Track qualified enquiries, developer acknowledgement and closed commissions separately in controlled first-party records. generate_lead means saved, not delivered or sold. Missing referrer/path, app traffic and privacy controls undercount AI.
4. Measure CrUX/PageSpeed mobile LCP, INP and CLS and compare before/after. Target LCP <2.5 s at field p75; local prerender tests cannot establish that. Check third-party scripts/fonts and hero priority if measurement fails target.
5. Maintain a dated fixed prompt panel across engines/locations; record actual citations/URLs and variation. Do not assume a universal platform source preference, citation-percentage or causal freshness boost. Training access and search eligibility are different controls.

Primary reference checks:
- https://developers.openai.com/api/docs/bots (OAI-SearchBot versus GPTBot; user-triggered retrieval differs)
- https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler (ClaudeBot training, Claude-SearchBot, Claude-User)
- https://docs.perplexity.ai/guides/bots
- https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers (Google-Extended is a product token)
- https://support.google.com/webmasters/answer/16984139?hl=en
- https://support.google.com/webmasters/answer/16908024?hl=en
- https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c

## Readiness score interpretation
Scores in the implementation report are subjective code/content readiness, not Google scores, predicted rank or tested AI citation rates. LCP, review sentiment and actual citation visibility remain unmeasured. Re-audit monthly and after changing service facts, partner activation or templates.

## Follow-up performance and validation — 7 November 2026
- Moved the unchanged Google Fonts families/weights and display=swap from CSS @import into an early HTML stylesheet link, with preconnect hints for fonts.googleapis.com and fonts.gstatic.com. This removes a stylesheet-discovery dependency; it does not prove a field LCP improvement.
- Dashboard code now loads on demand behind a Suspense status message. Public content remains synchronously prerendered; no public page is moved into an SSR Suspense fallback.
- Compared the previous production module (449,814 bytes; locally recompressed gzip 135,089 bytes) with the new build (445,464 bytes; locally recompressed gzip 134,202 bytes): 4,350 bytes less module code, or 887 bytes less in this gzip comparison. Gzip figures are a controlled local comparison, not measured Vercel transfer sizes.
- Permanent SEO assertions now check unique connected entity IDs, resolvable graph references, font discovery hints and visible/schema date agreement. Audit passes 1,128 checks across the same 19 canonical pages; 14 unit/integration tests pass, TypeScript passes, lint has zero errors and seven pre-existing Fast Refresh warnings.
- GSC Wizard list_sites returned payment_required/subscription_required. Its account has no active plan or trial, so Search Console/indexing/CrUX/GA4 reads could not run. Reconnect the Google account if required and enable an active GSC Wizard subscription/trial in app settings before retrying. No search or real-user performance figures were inferred from this failure. Direct Google Search Console verification remains possible outside this integration.
- Relevant primary implementation references: https://web.dev/articles/font-best-practices and https://react.dev/reference/react/lazy .
