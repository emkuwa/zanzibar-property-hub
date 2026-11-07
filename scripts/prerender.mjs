import fs from "node:fs/promises";
import path from "node:path";
import {
  PUBLIC_PATHS,
  pageMetadata,
  pageSchema,
  renderPath,
} from "../.seo-build/render.js";
const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const base = await fs.readFile("dist/index.html", "utf8");
for (const route of PUBLIC_PATHS) {
  const meta = pageMetadata(route);
  let html = base
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(meta.title)}</title>`)
    .replace(
      /<meta name="description"[\s\S]*?\/>/,
      `<meta name="description" content="${escape(meta.description)}" />`,
    )
    .replace(
      /<link rel="canonical"[^>]*>/,
      `<link rel="canonical" href="${meta.canonical}" />`,
    )
    .replace(
      /<meta property="og:title"[\s\S]*?\/>/,
      `<meta property="og:title" content="${escape(meta.title)}" />`,
    )
    .replace(
      /<meta property="og:description"[\s\S]*?\/>/,
      `<meta property="og:description" content="${escape(meta.description)}" />`,
    )
    .replace(
      /<meta property="og:url"[\s\S]*?\/>/,
      `<meta property="og:url" content="${meta.canonical}" />`,
    )
    .replace(
      /<meta name="twitter:title"[\s\S]*?\/>/,
      `<meta name="twitter:title" content="${escape(meta.title)}" />`,
    )
    .replace(
      /<meta name="twitter:description"[\s\S]*?\/>/,
      `<meta name="twitter:description" content="${escape(meta.description)}" />`,
    )
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, "")
    .replace(/<noscript>[\s\S]*?<\/noscript>/g, "")
    .replace(
      "</head>",
      `<script id="seo-schema" type="application/ld+json">${JSON.stringify(pageSchema(route)).replaceAll("<", "\\u003c")}</script>\n</head>`,
    )
    .replace(
      '<div id="root"></div>',
      () => `<div id="root">${renderPath(route)}</div>`,
    );
  html = html.replace(
    /<meta property="og:type"[^>]*>/,
    `<meta property="og:type" content="${route.startsWith("/blog/") || route.startsWith("/guides/") ? "article" : "website"}" />`,
  );
  const target = route === "/" ? "dist/index.html" : `dist${route}.html`;
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, html);
}
const missing = base
  .replace(
    /<title>[\s\S]*?<\/title>/,
    "<title>Page not found | ZanziInvest</title>",
  )
  .replace(
    /<link rel="canonical"[^>]*>/,
    '<meta name="robots" content="noindex, follow" />',
  )
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "")
  .replace(/<noscript>[\s\S]*?<\/noscript>/g, "")
  .replace(
    '<div id="root"></div>',
    '<main style="max-width:700px;margin:80px auto;padding:25px"><h1>Page not found</h1><p>This resource is unavailable. Browse the published property guides or send your enquiry.</p><p><a href="/guides">Buying guides</a> · <a href="/areas">Area guides</a> · <a href="/#enquiry">Property enquiry</a></p></main>',
  );
await fs.writeFile("dist/404.html", missing);
console.log(
  `Prerendered ${PUBLIC_PATHS.length} canonical HTML pages plus 404.`,
);
