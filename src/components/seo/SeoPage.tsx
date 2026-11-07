import { useEffect } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import {
  CONTENT_PAGES,
  HUBS,
  contentAt,
  hubFor,
  pageMetadata,
  pageSchema,
  type ContentPage,
} from "@/content/seo";
import "@/components/referral/referral.css";
import "./seo.css";

function useMetadata(path: string) {
  useEffect(() => {
    const meta = pageMetadata(path);
    document.title = meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", meta.description);
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute("href", meta.canonical);
    for (const [property, value] of [
      ["og:title", meta.title],
      ["og:description", meta.description],
      ["og:url", meta.canonical],
    ])
      document
        .querySelector(`meta[property="${property}"]`)
        ?.setAttribute("content", value);
    let script = document.getElementById("seo-schema");
    if (!script) {
      script = document.createElement("script");
      script.id = "seo-schema";
      script.setAttribute("type", "application/ld+json");
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(pageSchema(path));
    document
      .querySelector('meta[property="og:type"]')
      ?.setAttribute(
        "content",
        path.startsWith("/blog/") || path.startsWith("/guides/")
          ? "article"
          : "website",
      );
  }, [path]);
}
function ContentCards({ pages }: { pages: ContentPage[] }) {
  return (
    <div className="seo-cards">
      {pages.map((p) => (
        <a href={p.path} className="seo-card" key={p.path}>
          <span className="eyebrow">
            {p.kind === "area"
              ? "Area guide"
              : p.kind === "guide"
                ? "Buying guide"
                : "Insight"}
          </span>
          <h3>{p.title}</h3>
          <p>{p.answer}</p>
          <span className="seo-card-link">
            Read {p.label} guide <ArrowRight size={17} aria-hidden="true" />
          </span>
        </a>
      ))}
    </div>
  );
}
export default function SeoPage({ path }: { path: string }) {
  useMetadata(path);
  const page = contentAt(path);
  const hub = HUBS.find((h) => h.path === path);
  if (!page && !hub)
    return (
      <main>
        <h1>Page not found</h1>
        <a href="/guides">Browse property guides</a>
      </main>
    );
  return (
    <div className="referral-landing seo-site">
      <a href="#content" className="skip-link">
        Skip to content
      </a>
      <header className="referral-header">
        <div className="landing-container seo-header">
          <a href="/" className="wordmark">
            ZanziInvest<small>BY ZANZIBABA</small>
          </a>
          <a className="seo-header-cta" href="/#enquiry">
            Find my options <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
        <nav
          className="landing-container seo-nav"
          aria-label="Property resources"
        >
          <a href="/areas">Area guides</a>
          <a href="/guides">Buying guides</a>
          <a href="/blog">Insights</a>
        </nav>
      </header>
      <main id="content" className="landing-container seo-main">
        <nav aria-label="Breadcrumb" className="seo-breadcrumb">
          <ol>
            <li>
              <a href="/">Home</a>
            </li>
            {page ? (
              <li>
                <a href={hubFor(page.kind).path}>
                  {hubFor(page.kind).kind === "area"
                    ? "Areas"
                    : hubFor(page.kind).kind === "guide"
                      ? "Guides"
                      : "Insights"}
                </a>
              </li>
            ) : null}
            <li aria-current="page">{page?.label || hub?.title}</li>
          </ol>
        </nav>
        {page ? (
          <article>
            <header className="seo-article-header">
              <p className="eyebrow">
                {page.kind === "area"
                  ? "Area guide"
                  : page.kind === "guide"
                    ? "Buying guide"
                    : "Property insight"}
              </p>
              <h1>{page.title}</h1>
              <p className="seo-byline">
                Published by Zanzibaba Company Limited ·{" "}
                Last updated: <time dateTime={page.modified || page.published}>
                  {new Intl.DateTimeFormat("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    timeZone: "UTC",
                  }).format(new Date((page.modified || page.published) + "T00:00:00Z"))}
                </time>
              </p>
              <p className="seo-answer">{page.answer}</p>
            </header>
            <div className="seo-table-wrap">
              <table>
                <caption>{page.table.caption}</caption>
                <thead>
                  <tr>
                    {page.table.headers.map((h) => (
                      <th key={h} scope="col">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {page.table.rows.map(([first, ...rest]) => (
                    <tr key={first}>
                      <th scope="row">{first}</th>
                      {rest.map((cell, i) => (
                        <td key={i}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <aside className="seo-inline-cta">
              <div>
                <strong>Compare offers against your own brief.</strong>
                <p>
                  One enquiry, shared with participating developers after your
                  consent. Several developers may contact you directly.
                </p>
              </div>
              <a href="/#enquiry" className="primary-button">
                Request property offers <ArrowRight aria-hidden="true" />
              </a>
            </aside>
            <div className="seo-prose">
              {page.sections.map((s) => (
                <section key={s.heading}>
                  <h2>{s.heading}</h2>
                  {s.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  {s.bullets ? <ul>{s.bullets.map((item) => <li key={item}>{item}</li>)}</ul> : null}
                </section>
              ))}
            </div>
            <section className="seo-faq" aria-labelledby="content-faq-heading">
              <h2 id="content-faq-heading">Questions before you enquire</h2>
              {page.faqs.map((f) => (
                <details key={f.question}>
                  <summary>
                    {f.question}
                    <ChevronDown size={17} aria-hidden="true" />
                  </summary>
                  <p>{f.answer}</p>
                </details>
              ))}
            </section>
            {page.sources.length ? (
              <section
                className="seo-sources"
                aria-labelledby="sources-heading"
              >
                <h2 id="sources-heading">Sources and further checks</h2>
                <ul>
                  {page.sources.map((s) => (
                    <li key={s.url}>
                      <a href={s.url} rel="noopener noreferrer" target="_blank">
                        {s.label}
                      </a>
                      <p>{s.scope}</p>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
            <p className="seo-editorial-note">
              This is an editorial comparison guide, not a live property
              listing. Prices, availability, transaction requirements and any
              projections need confirmation for the specific property. An
              enquiry does not reserve a unit.
            </p>
            <section className="seo-related" aria-labelledby="related-heading">
              <h2 id="related-heading">Continue your comparison</h2>
              <ContentCards
                pages={page.related
                  .map(contentAt)
                  .filter((p): p is ContentPage => Boolean(p))}
              />
            </section>
          </article>
        ) : (
          <>
            <header className="seo-article-header">
              <p className="eyebrow">ZanziInvest resources</p>
              <h1>{hub!.title}</h1>
              <p className="seo-answer">
                {hub!.description} Every guide leads to the same private
                enquiry; no developer or project directory is published here.
              </p>
            </header>
            <ContentCards
              pages={CONTENT_PAGES.filter((p) => p.kind === hub!.kind)}
            />
          </>
        )}
      </main>
      <footer className="landing-footer">
        <div className="landing-container seo-footer">
          <a href="/" className="wordmark">
            ZanziInvest<small>BY ZANZIBABA</small>
          </a>
          <nav aria-label="Footer resources">
            <a href="/areas">Area guides</a>
            <a href="/guides">Buying guides</a>
            <a href="/blog">Insights</a>
            <a href="/#privacy">Privacy</a>
          </nav>
          <a href="/#enquiry">Send your property enquiry →</a>
          <p>© 2026 Zanzibaba Company Limited · Zanzibar, Tanzania</p>
        </div>
      </footer>
    </div>
  );
}
