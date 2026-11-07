/** The public site now has one canonical landing page. */
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
  res.send(
    '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://www.zanziinvest.com/</loc></url></urlset>',
  );
}
