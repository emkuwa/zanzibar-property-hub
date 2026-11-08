import fs from "node:fs";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
const records = JSON.parse(
  fs.readFileSync("src/content/seo-pages.json", "utf8"),
);
const paths = [
  "/",
  "/areas",
  "/guides",
  "/blog",
  ...records.map((p) => p.path),
];
const priorityMap = JSON.parse(fs.readFileSync("src/content/geo-priorities.json", "utf8"));
assert.deepEqual(priorityMap.routes.map((r) => r.path).sort(), [...paths].sort(), "Priority map must cover all canonical routes exactly once");
for (const record of records) {
  if (priorityMap.routes.find((r) => r.path === record.path)?.priority === "P1") {
    assert.ok(record.sections.every((s) => s.answer && s.evidence && s.paragraphs.length), `All commercial sections need three layers: ${record.path}`);
  }
}
const titles = new Set(),
  descriptions = new Set();
let checks = 0;
const check = (value, message) => {
  assert.ok(value, message);
  checks++;
};
for (const route of paths) {
  const file = route === "/" ? "dist/index.html" : `dist${route}.html`;
  check(fs.existsSync(file), `Missing prerendered file: ${route}`);
  const html = fs.readFileSync(file, "utf8");
  const doc = new JSDOM(html).window.document;
  check(doc.querySelectorAll('link[rel="stylesheet"][href^="https://fonts.googleapis.com/"]').length === 1, `Missing/duplicate font stylesheet: ${route}`);
  check(doc.querySelector('link[rel="preconnect"][href="https://fonts.gstatic.com"][crossorigin]'), `Missing font connection hint: ${route}`);
  const canonical = doc.querySelector("link[rel=canonical]")?.href;
  check(
    canonical === `https://www.zanziinvest.com${route}`,
    `Wrong canonical: ${route}`,
  );
  check(
    doc.querySelectorAll("link[rel=canonical]").length === 1,
    `Duplicate canonical: ${route}`,
  );
  check(doc.querySelectorAll("h1").length === 1, `Expected one h1: ${route}`);
  check(
    doc.querySelector("#root")?.textContent.trim().length > 250,
    `Empty HTML shell: ${route}`,
  );
  const title = doc.title,
    description = doc.querySelector("meta[name=description]")?.content;
  check(title && !titles.has(title), `Missing/repeated title: ${route}`);
  titles.add(title);
  check(
    description && !descriptions.has(description),
    `Missing/repeated description: ${route}`,
  );
  descriptions.add(description);
  check(
    doc.querySelector('meta[property="og:url"]')?.content === canonical,
    `OpenGraph URL mismatch: ${route}`,
  );
  for (const schema of doc.querySelectorAll(
    'script[type="application/ld+json"]',
  )) {
    const data = JSON.parse(schema.textContent);
    const graph = data["@graph"] || [];
    const ids = graph.map((node) => node["@id"]);
    check(new Set(ids).size === ids.length, `Duplicate schema IDs: ${route}`);
    const visit = (value) => {
      if (!value || typeof value !== "object") return;
      if (value["@id"] && Object.keys(value).length === 1)
        check(ids.includes(value["@id"]), `Unresolved schema reference: ${route} ${value["@id"]}`);
      for (const child of Object.values(value))
        if (Array.isArray(child)) child.forEach(visit); else visit(child);
    };
    graph.forEach(visit);
    for (const node of graph) {
      if (node["@type"] === "FAQPage") for (const q of node.mainEntity) {
        check(doc.body.textContent.includes(q.name), `FAQ question absent: ${route}`);
        check(doc.body.textContent.includes(q.acceptedAnswer.text), `FAQ answer absent: ${route}`);
      }
    }
    check(data["@context"] === "https://schema.org" && Array.isArray(data["@graph"]) && data["@graph"].length >= 4, `Missing schema: ${route}`);
  }
  check(
    doc.querySelector('meta[property="og:type"]')?.content ===
      (route.startsWith("/blog/") || route.startsWith("/guides/")
        ? "article"
        : "website"),
    `OpenGraph type mismatch: ${route}`,
  );
  for (const section of doc.querySelectorAll("[data-answer-section]")) {
    const heading = section.querySelector("h1,h2");
    check(Boolean(heading), `Missing commercial heading: ${route}`);
    const answer = section.querySelector(".seo-section-answer,.hero-description,.landing-answer,p");
    check(answer && answer.textContent.trim().split(/\s+/).length <= 50, `Direct answer must fit 50 words: ${route}`);
    const evidence = section.querySelector("table,[data-evidence]");
    check(Boolean(evidence), `Missing section evidence: ${route}`);
    const prefix = doc.createRange(); prefix.setStartAfter(heading); prefix.setEndBefore(evidence);
    check(prefix.toString().trim().split(/\s+/).length <= 200, `Section evidence after 200 words: ${route}`);
    const following = doc.createRange(); following.setStartAfter(evidence); following.setEndAfter(section.lastChild);
    check(following.toString().trim().split(/\s+/).length >= 12, `Missing methodology after evidence: ${route}`);
  }
  const record = records.find((p) => p.path === route);
  if (record) {
    check(title.length <= 70, `Overlong SEO title: ${route}`);
    check(
      doc.querySelector("h1").textContent === record.title,
      `Title content mismatch: ${route}`,
    );
    check(
      record.answer.split(/\s+/).length <= 50,
      `Direct answer exceeds 50 words: ${route}`,
    );
    check(
      doc.querySelector(".seo-answer")?.textContent === record.answer,
      `Answer missing: ${route}`,
    );
    check(
      doc.querySelector("table caption")?.textContent === record.table.caption,
      `Missing semantic caption: ${route}`,
    );
    check(
      doc.querySelector("table").querySelectorAll("thead th[scope=col]").length ===
        record.table.headers.length,
      `Table column semantics: ${route}`,
    );
    check(
      doc.querySelector("table").querySelectorAll("tbody th[scope=row]").length ===
        record.table.rows.length,
      `Table row semantics: ${route}`,
    );
    check(
      record.sections.length >= 2 && record.sections.every((s) => s.paragraphs.length > 0),
      `Missing substantive sections: ${route}`,
    );
    const article = doc.querySelector("article");
    const table = article.querySelector("table");
    const range = doc.createRange();
    range.setStartBefore(article.firstChild);
    range.setEndBefore(table);
    check(
      range.toString().split(/\s+/).length < 200,
      `Evidence table too late: ${route}`,
    );
    for (const related of record.related)
      check(paths.includes(related), `Unknown related link: ${related}`);
    for (const source of record.sources)
      check(
        source.url.startsWith("https://") && source.scope.length > 20,
        `Unclear source scope: ${route}`,
      );
    check(doc.querySelector("time")?.dateTime === (record.modified || record.published), `Visible modified date mismatch: ${route}`);
    const dated = JSON.parse(doc.querySelector("#seo-schema").textContent)["@graph"].filter((n) => n.dateModified);
    check(dated.length > 0 && dated.every((n) => n.dateModified === (record.modified || record.published)), `Schema modified date mismatch: ${route}`);
    const faq = doc.querySelectorAll(".seo-faq details");
    check(faq.length === record.faqs.length, `FAQ mismatch: ${route}`);
    check(
      [...doc.querySelectorAll("a[href]")].some((a) => { const u = new URL(a.href, "https://www.zanziinvest.com"); return u.pathname === "/" && u.hash === "#enquiry"; }),
      `No enquiry CTA: ${route}`,
    );
  }
  for (const link of doc.querySelectorAll("a[href]")) {
    const href = link.getAttribute("href");
    if (href.startsWith("/") && !href.startsWith("//"))
      check(
        paths.includes(new URL(href, "https://www.zanziinvest.com").pathname),
        `Broken published internal link: ${route} -> ${href}`,
      );
    if (href.startsWith("mailto:"))
      check(
        href === "mailto:info@zanzibaba.com",
        `Unexpected public contact: ${route}`,
      );
  }
  for (const image of doc.querySelectorAll('img[src^="/assets/"]'))
    check(
      fs.existsSync(`dist${image.getAttribute("src")}`),
      `Missing built asset: ${image.src}`,
    );
}
const sitemap = new JSDOM(fs.readFileSync("public/sitemap.xml", "utf8"), {
  contentType: "application/xml",
}).window.document;
check(
  sitemap.querySelectorAll("loc").length === paths.length,
  "Sitemap count mismatch",
);
for (const route of paths)
  check(
    [...sitemap.querySelectorAll("loc")].some(
      (n) => n.textContent === `https://www.zanziinvest.com${route}`,
    ),
    `Missing sitemap path: ${route}`,
  );
const errorPage = new JSDOM(fs.readFileSync("dist/404.html", "utf8")).window
  .document;
check(
  errorPage.querySelector("meta[name=robots]")?.content.includes("noindex"),
  "404 must be noindex",
);
check(
  !errorPage.querySelector("link[rel=canonical]"),
  "404 must not canonicalise to homepage",
);
const config = JSON.parse(fs.readFileSync("vercel.json", "utf8"));
check(
  !config.rewrites.some((r) => r.source === "/(.*)"),
  "Catch-all rewrite creates soft 404s",
);
for (const redirect of config.redirects)
  check(
    paths.includes(redirect.destination.split("#")[0] || "/"),
    `Invalid redirect target: ${redirect.destination}`,
  );
console.log(
  `SEO audit passed: ${checks} checks across ${paths.length} canonical pages; ${records.length} articles/area guides.`,
);

const robots = fs.readFileSync("public/robots.txt", "utf8");
for (const bot of ["Googlebot", "bingbot", "OAI-SearchBot", "ChatGPT-User", "Claude-SearchBot", "Claude-User", "ClaudeBot", "Claude-Web", "PerplexityBot", "Google-Extended"]) {
  check(robots.includes(`User-agent: ${bot}\nAllow: /\nDisallow: /dashboard\nDisallow: /api/`), `Crawler policy missing: ${bot}`);
}
