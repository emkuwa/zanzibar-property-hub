# ZanziInvest organic content publishing

## Purpose and audience

Reach overseas buyers researching Zanzibar off-plan apartments and villas, holiday homes and rental investments. Keep the homepage a short lead magnet. Guides answer specific buying questions and lead to **Get Prices & Payment Plans**. Do not turn the site into a public property or developer directory. Do not add a starting price until current authorised inventory supports it. Preserve the existing form, explicit sharing consent and backend distribution behaviour.

## Recurring editorial operation

A ChatGPT scheduled task runs twice weekly, on Monday and Thursday mornings in Africa/Dar_es_Salaam. It researches, writes, validates and publishes at most one substantive English guide or material update per run. The task is separate from the website runtime; a page visit or build does not invoke an AI writer. The schedule is managed in ChatGPT Automations, not a GitHub cron. Consult the task status for actual execution results; this document is not proof of a successful run.

Read this policy and all existing article paths before choosing a topic. Prefer a useful update over a near-duplicate article. Use country/search-query evidence if connected and available; otherwise explicitly treat topic selection as editorial judgement, never fabricated search volume. Do not manufacture a fresh date without a substantive change. If credible new information or a distinct useful topic is unavailable, skip publication and report why.

## Topic backlog

Choose only a topic not already answered adequately by the current records:

1. Off-plan handover checklist for buyers living overseas.
2. Construction-linked vs calendar-based instalments: questions to compare.
3. Furnished vs unfurnished off-plan apartments: planning the complete budget.
4. Reading a floor plan remotely: gross, internal and outdoor area.
5. Preparing a video viewing brief before visiting Zanzibar.
6. Service charges and maintenance reserves in an overseas holiday-home budget.
7. Questions to ask about owner-use dates in managed rental agreements.
8. From reservation to handover: organising the buyer's document folder.
9. Comparing apartment layouts for longer personal stays.
10. Planning a first property research visit around unresolved questions.

Do not create thin country-keyword copies or location-name variants. An article must have its own practical decision, worked checklist or comparison. These are topic ideas, not claims about current offers.

## Writing and evidence

Use the ContentPage record contract in src/content/seo.ts. Each record needs a unique canonical path, label, title, SEO title, description, direct answer of at most 50 words, useful top comparison table, at least two substantive sections, FAQs and at least three relevant internal links. Commercial sections need a short direct answer, a scoped evidence/comparison table and explanatory paragraphs after it. Aim for useful depth, normally 500–900 words, without padding. Write plain English suitable for an international buyer.

Distinguish our editorial planning checklists from external factual evidence. Cite verified primary sources with URL and precise scope whenever an article depends on legal, regulatory, financial, project or market facts. Research time-sensitive facts again before publication. A source link is not proof that a specific unit, document or contract has been checked. If a source cannot be verified, omit the dependent claim. Do not promise residency, title rights or returns.

Never invent prices, inventory, payment percentages, fees, deadlines, testimonials, personal experience, transaction history, search traffic or guarantees. No private brochures, partner contacts, client details or lead data in articles, logs or commit messages. Do not expose commercial commissions or referral mechanics in marketing copy. Preserve truthful existing privacy/consent disclosures and do not change lead-sharing or backend logic in a content run.

## Source, validation and publication

Repository: emkuwa/zanzibar-property-hub. Current working branch: feature/zanziinvest-developer-referrals. Production: https://www.zanziinvest.com, Vercel project prj_1neK4UeMoYq4zIimHqLo1gN4vaTe, team team_200Zecyx6W4z3ARTIo6E4qW1.

Before changing anything, verify the latest production SHA and current branch head. If production has moved to another branch, use the current production source rather than this historical branch name. Preserve unrelated changes. Use isolated local source from the verified revision; never assume a transient checkout is current. Read applicable AGENTS.md if present. Commit through supported authenticated Git tools, atomically with an expected-head guard; do not force-push over concurrent work.

Update src/content/seo-pages.json, related links and src/content/geo-priorities.json. Add guide attribution in src/lib/enquiry-context.ts with no automatic budget, contact or consent choices. New routes are automatically registered from the records. Do not manually duplicate route components.

Run npm run typecheck, npm test -- --pool=threads --maxWorkers=1, and npm run build. The build generates the sitemap, API sitemap constant, explicit legacy redirects, unique HTML for every route, canonical and OpenGraph metadata, visible article/FAQ content, JSON-LD and a noindex 404. The SEO audit must pass across all routes. Inspect generated HTML for the new or changed article, source scope, form links, title/description and related links. Do not publish on a failed check or if validation cannot be completed.

Commit only intended source and generated tracked sitemap/config files; never commit node_modules, dist, .seo-build, credentials or runtime data. Deploy the exact tested SHA to the verified production project. Wait for READY and correct aliases; otherwise report failure without claiming publication. Return the published article URL and a short Swahili update. Do not send messages to partners or clients.

## Measuring outcomes

Publication and crawlability do not establish indexing, ranking or overseas leads. Use Search Console country/query/page data and GA4 guide-to-form conversions when available. Do not claim measured improvement without the corresponding data.
