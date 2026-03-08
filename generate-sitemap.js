const fs = require("fs");

const locations = [
"paje",
"nungwi",
"kendwa",
"jambiani",
"bwejuu",
"kiwengwa",
"matemwe",
"michamvi",
"fumba",
"kizimkazi"
];

const propertyTypes = [
"property",
"villa",
"hotel",
"resort",
"apartment",
"land"
];

let urls = [];

locations.forEach(location => {

urls.push(`/buy-property-in-${location}-zanzibar`);

propertyTypes.forEach(type => {

urls.push(`/buy-${type}-in-${location}-zanzibar`);

});

});

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

urls.forEach(url => {

sitemap += `
<url>
<loc>https://zanziinvest.com${url}</loc>
</url>`;

});

sitemap += `
</urlset>`;

fs.writeFileSync("./public/sitemap.xml", sitemap);

console.log("Sitemap generated!");
