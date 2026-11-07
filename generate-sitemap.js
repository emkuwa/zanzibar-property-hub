import fs from "node:fs";
const pages = JSON.parse(
  fs.readFileSync(
    new URL("./src/content/seo-pages.json", import.meta.url),
    "utf8",
  ),
);
export const paths = [
  "/",
  "/areas",
  "/guides",
  "/blog",
  ...pages.map((p) => p.path),
];
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((path) => `<url><loc>https://www.zanziinvest.com${path}</loc><lastmod>2026-11-07</lastmod></url>`).join("\n")}\n</urlset>\n`;
fs.writeFileSync(new URL("./public/sitemap.xml", import.meta.url), xml);
fs.writeFileSync(
  new URL("./server/seo-sitemap.ts", import.meta.url),
  `/** Generated from reviewed content by generate-sitemap.js. */\nexport const SITEMAP_XML = ${JSON.stringify(xml)};\n`,
);
const old = [
  ["/invest-in-zanzibar", "/guides"],
  ["/buy-property-in-zanzibar", "/guides"],
  ["/paje-villas-for-sale", "/areas/paje"],
  ["/nungwi-beachfront-property", "/areas/nungwi"],
  ["/jambiani-villas-for-sale", "/areas/jambiani"],
  ["/developers", "/#enquiry"],
  ["/partners", "/#enquiry"],
];
for (const page of pages.filter((p) => p.kind === "area")) {
  const area = page.path.split("/").pop();
  for (const type of [
    "property",
    "villa",
    "hotel",
    "resort",
    "apartment",
    "land",
    "beachfront-villa",
    "boutique-hotel",
    "holiday-rental",
    "tourism-property",
    "investment-property",
    "beachfront-property",
    "tourism-land",
  ])
    old.push([`/buy-${type}-in-${area}-zanzibar`, page.path]);
}
const config = {
  cleanUrls: true,
  trailingSlash: false,
  redirects: old.map(([source, destination]) => ({
    source,
    destination,
    permanent: true,
  })),
  headers: [
    {
      source: "/dashboard",
      headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
    },
  ],
  rewrites: [
    { source: "/api/:path*", destination: "/api/:path*" },
    { source: "/sitemap.xml", destination: "/api/sitemap" },
    { source: "/robots.txt", destination: "/api/robots" },
    { source: "/dashboard", destination: "/index.html" },
  ],
};
fs.writeFileSync(
  new URL("./vercel.json", import.meta.url),
  JSON.stringify(config, null, 2) + "\n",
);
console.log(
  `Generated ${paths.length} sitemap URLs and ${old.length} legacy redirects.`,
);
