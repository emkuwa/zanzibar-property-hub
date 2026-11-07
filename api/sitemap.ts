import { SITEMAP_XML } from "../server/seo-sitemap.js";
export default function handler(
  _req: unknown,
  res: {
    status(code: number): void;
    setHeader(key: string, value: string): void;
    send(value: string): void;
  },
) {
  res.status(200);
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.send(SITEMAP_XML);
}
