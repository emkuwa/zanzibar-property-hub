import { BUSINESS, HOME_QUESTIONS, REVIEWED } from "./business";
import records from "./seo-pages.json";

export type ContentKind = "area" | "guide" | "article";
export type ContentPage = {
  path: string;
  kind: ContentKind;
  label: string;
  title: string;
  seoTitle: string;
  description: string;
  answer: string;
  table: { caption: string; headers: string[]; rows: string[][] };
  sections: { heading: string; answer?: string; evidence?: ContentPage["table"]; paragraphs: string[]; bullets?: string[] }[];
  faqs: { question: string; answer: string }[];
  sources: { label: string; url: string; scope: string }[];
  related: string[];
  published: string;
  modified?: string;
};
export const CONTENT_PAGES = records as ContentPage[];
export const SITE_URL = "https://www.zanziinvest.com";
export const HUBS = [
  {
    path: "/areas",
    kind: "area" as ContentKind,
    title: "Zanzibar property area guides",
    description:
      "Compare six Zanzibar property areas using site access, surroundings, services, delivery and costs before requesting developer offers.",
  },
  {
    path: "/guides",
    kind: "guide" as ContentKind,
    title: "Zanzibar property buying guides",
    description:
      "Prepare your Zanzibar property enquiry with apartment, villa, budget, payment-plan and acquisition-cost checklists.",
  },
  {
    path: "/blog",
    kind: "article" as ContentKind,
    title: "Zanzibar property insights and comparisons",
    description:
      "Read practical Zanzibar property comparisons: Paje vs Fumba, apartment vs villa, off-plan vs completed and gross vs net rental yield.",
  },
];
export const PUBLIC_PATHS = [
  "/",
  ...HUBS.map((h) => h.path),
  ...CONTENT_PAGES.map((p) => p.path),
];
export function contentAt(path: string) {
  return CONTENT_PAGES.find((page) => page.path === path);
}
export function hubFor(kind: ContentKind) {
  return HUBS.find((h) => h.kind === kind)!;
}
export function pageMetadata(path: string) {
  const record = contentAt(path) || HUBS.find((h) => h.path === path);
  return record
    ? {
        title: `${contentAt(path)?.seoTitle || record.title} | ZanziInvest`,
        description: record.description,
        canonical: SITE_URL + path,
      }
    : {
        title:
          "Zanzibar Apartments & Villas | ZanziInvest by Zanzibaba",
        description:
          "Explore Zanzibar apartments and villas for investment, holiday homes or everyday living. Share your property preferences with ZanziInvest.",
        canonical: SITE_URL + "/",
      };
}
export function pageSchema(path: string) {
  const org = {
    "@type": "Organization",
    "@id": SITE_URL + "/#organization",
    name: "Zanzibaba Company Limited",
    url: SITE_URL + "/",
  };
  const page = contentAt(path);
  const hub = HUBS.find((h) => h.path === path);
  const result: Record<string, unknown>[] = [
    { "@context": "https://schema.org", ...org },
  ];
  if (page) {
    result.push({
      "@context": "https://schema.org",
      "@type":
        page.kind === "article"
          ? "BlogPosting"
          : page.kind === "guide"
            ? "Article"
            : "WebPage",
      "@id": SITE_URL + path + "#page",
      headline: page.title,
      name: page.title,
      description: page.description,
      url: SITE_URL + path,
      datePublished: page.published,
      dateModified: page.published,
      author: { "@type": "Organization", name: "Zanzibaba Company Limited" },
      publisher: { "@id": org["@id"] },
      mainEntityOfPage: SITE_URL + path,
    });
    result.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
  }
  if (hub)
    result.push({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: hub.title,
      url: SITE_URL + path,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: CONTENT_PAGES.filter((p) => p.kind === hub.kind).map(
          (p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: p.title,
            url: SITE_URL + p.path,
          }),
        ),
      },
    });
  if (page || hub) {
    const links = [
      { name: "Home", url: SITE_URL + "/" },
      ...(page
        ? [
            {
              name: hubFor(page.kind).title,
              url: SITE_URL + hubFor(page.kind).path,
            },
          ]
        : []),
      { name: (page || hub)!.title, url: SITE_URL + path },
    ];
    result.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: links.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.name,
        item: p.url,
      })),
    });
  }
  const orgId = org["@id"];
  const websiteId = SITE_URL + "/#website";
  const serviceId = SITE_URL + "/#service";
  const pageId = SITE_URL + path + "#webpage";
  const graph: Record<string, unknown>[] = [
    { ...org, legalName: BUSINESS.name, email: BUSINESS.email,
      alternateName: BUSINESS.brand, knowsAbout: ["Zanzibar property enquiries", "Property developer introductions"] },
    { "@type": "WebSite", "@id": websiteId, url: SITE_URL + "/", name: BUSINESS.brand,
      publisher: { "@id": orgId }, inLanguage: "en" },
    { "@type": "Service", "@id": serviceId, name: "Zanzibar property enquiry and developer introduction service",
      provider: { "@id": orgId }, areaServed: { "@type": "Place", name: BUSINESS.area },
      description: "Submit property preferences and consent for introductions to participating developers. An enquiry does not reserve a property." },
    { "@type": hub ? "CollectionPage" : "WebPage", "@id": pageId,
      url: SITE_URL + path, name: pageMetadata(path).title, description: pageMetadata(path).description,
      isPartOf: { "@id": websiteId }, about: { "@id": serviceId }, inLanguage: "en",
      ...(page ? { dateModified: page.modified || page.published } : path === "/" ? { dateModified: REVIEWED } : {}) },
  ];
  for (const node of result.slice(1)) {
    delete node["@context"];
    if (node["@type"] === "Article" || node["@type"] === "BlogPosting") {
      node["@id"] = SITE_URL + path + "#article";
      node.author = { "@id": orgId };
      node.mainEntityOfPage = { "@id": pageId };
      node.dateModified = page!.modified || page!.published;
      node.inLanguage = "en";
    } else if (node["@type"] === "WebPage" || node["@type"] === "CollectionPage") {
      Object.assign(graph[3], node, { "@id": pageId });
      continue;
    } else {
      node["@id"] = SITE_URL + path + (node["@type"] === "FAQPage" ? "#faq" : "#breadcrumbs");
      if (node["@type"] === "FAQPage") node.isPartOf = { "@id": pageId };
    }
    graph.push(node);
  }
  if (path === "/") graph.push({ "@type": "FAQPage", "@id": SITE_URL + "/#faq",
    isPartOf: { "@id": pageId }, mainEntity: HOME_QUESTIONS.map(([question, answer]) => ({
      "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer }
    })) });
  return { "@context": "https://schema.org", "@graph": graph };
}
