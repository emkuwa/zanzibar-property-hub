import fs from "fs";

const BASE = "https://www.zanziinvest.com";

const staticPages = [
  "/",
  "/partners",
  "/invest-in-zanzibar",
  "/buy-property-in-zanzibar",
  "/paje-villas-for-sale",
  "/nungwi-beachfront-property",
  "/jambiani-villas-for-sale",
  "/developers",
];

const locations = [
  "paje", "nungwi", "kendwa", "jambiani", "bwejuu", "kiwengwa",
  "matemwe", "michamvi", "fumba", "kizimkazi",
];

const propertyTypes = [
  "property", "villa", "hotel", "resort", "apartment", "land",
];

let urls = [...staticPages];

locations.forEach((location) => {
  propertyTypes.forEach((type) => {
    urls.push(`/buy-${type}-in-${location}-zanzibar`);
  });
});
urls = [...new Set(urls)];

const entries = [];
urls.forEach((path) => {
  const loc = (path === "/" ? BASE + "/" : BASE + path).trim();
  if (!loc) return;
  entries.push(`<url><loc>${loc}</loc></url>`);
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>`;

fs.writeFileSync("./public/sitemap_static.xml", sitemap);
console.log("Sitemap generated!");
