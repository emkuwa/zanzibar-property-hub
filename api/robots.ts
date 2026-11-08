import { ROBOTS_TXT } from "../server/seo-robots";
export default function handler(
  _req: unknown,
  res: {
    status(code: number): void;
    setHeader(key: string, value: string): void;
    send(value: string): void;
  },
) {
  res.status(200);
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.send(ROBOTS_TXT);
}
