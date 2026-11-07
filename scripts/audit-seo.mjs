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
    check(Array.isArray(data) && data.length > 0, `Missing schema: ${route}`);
  }
  check(
    doc.querySelector('meta[property="og:type"]')?.content ===
      (route.startsWith("/blog/") || route.startsWith("/guides/")
        ? "article"
        : "website"),
    `OpenGraph type mismatch: ${route}`,
  );
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
      doc.querySelectorAll("thead th[scope=col]").length ===
        record.table.headers.length,
      `Table column semantics: ${route}`,
    );
    check(
      doc.querySelectorAll("tbody th[scope=row]").length ===
        record.table.rows.length,
      `Table row semantics: ${route}`,
    );
    check(
      doc.querySelector("article").textContent.split(/\s+/).length >= 250,
      `Insufficient article content: ${route}`,
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
    const faq = doc.querySelectorAll(".seo-faq details");
    check(faq.length === record.faqs.length, `FAQ mismatch: ${route}`);
    check(
      Boolean(doc.querySelector('a[href="/#enquiry"]')),
      `No enquiry CTA: ${route}`,
    );
  }
  for (const link of doc.querySelectorAll("a[href]")) {
    const href = link.getAttribute("href");
    if (href.startsWith("/") && !href.startsWith("//"))
      check(
        paths.includes(href.split("#")[0] || "/"),
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
