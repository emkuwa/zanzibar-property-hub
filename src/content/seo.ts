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
  sections: { heading: string; paragraphs: string[] }[];
  faqs: { question: string; answer: string }[];
  sources: { label: string; url: string; scope: string }[];
  related: string[];
  published: string;
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
          "ZanziInvest by Zanzibaba | One Enquiry, Developer Property Offers",
        description:
          "Submit one Zanzibar property enquiry. Share your budget and preferences with Zanzibaba partner developers and receive property options directly.",
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
  return result;
}
