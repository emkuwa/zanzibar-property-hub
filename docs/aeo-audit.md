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

## Guide-to-enquiry conversion follow-up — 7 November 2026
- Eight specific guides now link to the existing home enquiry with a reviewed `from` route token: apartments/villas preselect their property type; the six area guides preselect the existing grouped area option. The form explains the starting guide and all defaults remain editable. Area defaults retain existing groups (for example Paje / Jambiani), not a claim that a specific unit is available there.
- Comparison, budget and other decision guides keep the neutral enquiry link; no arbitrary budget, timeline or comparison winner is inferred. Consent, name, email, WhatsApp and budget are never supplied by context. No submission occurs through navigation.
- Only hardcoded own-property route keys are accepted. External URLs, inherited object keys and unknown paths are ignored, preventing arbitrary return destinations or analytics labels. No contact data or confidential project details are added to URLs. Query variants canonicalise to the existing homepage and are not new sitemap pages.
- Analytics adds the reviewed `enquiry_guide` route to referral_submit_started and generate_lead. Register this as an event-scoped GA4 dimension to compare guide-assisted starts and saved leads. It is not proof of qualification, delivery or a sale. The referral API and database contract are unchanged.
- Validation: 18 tests pass, including editable defaults, no inferred comparison/budget choice, invalid route rejection and unchecked consent. TypeScript, production build and 1,128 SEO checks pass; lint has zero errors and the existing seven Fast Refresh warnings. The apartments-guide → enquiry journey was verified in-browser without submitting a lead.

## Targeted HubSpot-aligned three-layer refactor — 7 November 2026
Sources checked: HubSpot's AEO guide (https://www.hubspot.com/products/marketing/aeo-guide), recommendations documentation (https://knowledge.hubspot.com/seo/review-and-manage-aeo-recommendations), and decision-stage gap guidance (https://blog.hubspot.com/marketing/aeo-keyword-gap-analysis). They support direct, self-contained answers, structured formats and decision-relevant prioritisation. The strict 50/200-word three-layer acceptance criteria here are the user's implementation requirements, not a claimed verbatim HubSpot standard or a citation guarantee.

Scope: all 19 canonical routes audited; src/content/geo-priorities.json records the full route map. P1 execution covers homepage plus all five buying guides and four comparison articles (10 pages). Six local area guides and three navigational hubs remain P2; their existing page-level direct answer/table/context structure is preserved. No route was labelled low AI visibility without measurement, and no assumed revenue share is asserted.

Implementation: the nine commercial content records now contain 30 explicit per-heading direct answers (each <=50 words), two-row semantic evidence tables before 200 words, followed by existing detailed methodology and edge-case discussion. Contrarian questions explain why the smallest deposit, lowest headline price, private-pool photograph, fully-managed label or larger floor area cannot alone settle a purchase decision. These are buyer verification instructions, not competitor performance claims. Five duplicated generic offer-checklist sections were removed rather than expanding word count uniformly.

Evidence integrity: section tables say “Evidence to request before deciding”; they do not claim ZanziInvest has verified inventory, live quotations, rental records or legal conclusions. Original financial examples remain explicitly hypothetical. The homepage's first-party specifications are traceable to referral-contract.ts and the actual saved/awaiting-partners flow: four property preferences, three contact details, separate affirmative consent, and one saved reference. No stock, fees, response-time metric, guaranteed delivery or case-study outcome has been fabricated.

Validation: commercial-section markup is explicitly audited in raw prerendered HTML for answer length, evidence position and methodology after evidence. Every P1 record must have all three section layers, and the prioritisation file must cover each canonical route exactly once. Existing schema/FAQ/canonical/link/sitemap/404 and guide-to-enquiry checks remain enabled. Brand, hero asset, URLs, API contract, consent and editable guide defaults are preserved; homepage adds visible specifications using the existing palette.

Next measurement: compare enquiry_guide starts → saved leads per priority route; record actual citations by engine and fixed prompt, then promote commercial pages with demonstrated conversion potential and weak measured coverage. GSC Wizard remains subscription-blocked; no new GSC or AI visibility numbers are claimed. Verified dated offer breakdowns and consented outcomes remain first-party data requirements before claiming proprietary market insight.

## Hero mockup correction — 8 November 2026
At the owner's request, restored the short two-line hero subtitle and removed the extra metric/methodology blocks from the photograph. Detailed service specifications and the three-layer treatment remain below the hero and on buying/comparison pages. The hero is intentionally excluded from the section-layer audit to preserve the approved visual composition; public content elsewhere remains crawlable. Reduced the headline from a 70px to 58px desktop ceiling and from a 47px to 40px mobile ceiling. A 375px content-width browser check shows a 36.66px headline and a 455px hero, matching the mockup's compact proportions. Build and TypeScript checks pass. No enquiry, consent or backend changes.

## Three-second clarity follow-up — 8 November 2026
The owner approved the conversion review wording. Hero now reads “Zanzibar property. One enquiry. More options.” with a short budget/area explanation, “Request property offers” CTA, and visible no-reservation/multi-developer expectations. The compact headline sizes and hero photograph are retained. Expectations use a dark backing to remain legible over the beach. “How it works” returns to three short customer actions; system-state details remain in the FAQ, service facts and privacy sections. This presentation section is intentionally excluded from per-section evidence requirements; the commercial buying guides and service fact sheet retain their three layers.

Measurement now separates enquiry_cta_click (hero/FAQ placement), enquiry_form_started (once on first field change per form mount), referral_submit_started (validated submit attempt) and generate_lead (saved enquiry). These events are different stages, not interchangeable conversion counts. Register placement, enquiry_guide and ai_referral_engine as event-scoped GA4 dimensions where useful; analyse click → start → save by landing page/source. No contact values or full form payloads are included in the new events. No database/API/consent changes or developer broadcasts were made.

Mobile review at 375px content width: three-line headline, CTA visible without scrolling, no horizontal page overflow. No claim is made that conversion improved or happens within three seconds; visitor behaviour is still unmeasured. Build/type checks, 19 tests (including one-start-only/no-contact-data analytics), and 1,283 SEO checks pass. Lint retains seven existing warnings and zero errors.
