import type { VercelRequest, VercelResponse } from "@vercel/node";
import fs from "fs";
import path from "path";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
    const xml = fs.readFileSync(sitemapPath, "utf-8");

    res.status(200);
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.send(xml);
  } catch (e) {
    res.status(500).send("Sitemap unavailable");
  }
}

