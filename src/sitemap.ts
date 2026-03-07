export const locations = [
"paje",
"nungwi",
"kendwa",
"jambiani",
"bwejuu",
"kiwengwa",
"matemwe",
"michamvi",
"fumba",
"stone-town"
];

export const propertyTypes = [
"villa",
"hotel",
"resort",
"apartment",
"land",
"beachfront-property",
"holiday-rental",
"boutique-hotel",
"tourism-land"
];

export function generateSitemap() {

const baseUrl = "https://zanziinvest.com";

let urls = [];

locations.forEach(location => {

urls.push(`${baseUrl}/buy-property-in-${location}-zanzibar`);

propertyTypes.forEach(type => {

urls.push(`${baseUrl}/buy-${type}-in-${location}-zanzibar`);

});

});

return urls;

}
