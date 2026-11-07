import fs from "node:fs";
const sitemap = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://www.zanziinvest.com/</loc></url></urlset>\n';
fs.writeFileSync("./public/sitemap.xml", sitemap);
console.log("Canonical landing-page sitemap generated.");
