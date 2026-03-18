import type { VercelRequest, VercelResponse } from "@vercel/node";
import fs from "fs";
import path from "path";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const robotsPath = path.join(process.cwd(), "public", "robots.txt");
    const txt = fs.readFileSync(robotsPath, "utf-8");

    res.status(200);
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.send(txt);
  } catch (e) {
    res.status(500).send("Robots unavailable");
  }
}

