// Emit the exact Supabase function file bundle from canonical shared source.
// Pipe this JSON into the deployment tool; it contains no service-role secrets.
import { readFileSync } from "node:fs";
const read = path => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
console.log(JSON.stringify({
  name: "zanziinvest-referral", entrypoint_path: "index.ts", verify_jwt: true,
  files: [
    { name: "index.ts", content: read("supabase/functions/zanziinvest-referral/index.ts") },
    { name: "deno.json", content: JSON.stringify({ imports: { zod: "npm:zod@3.25.76" } }) },
    { name: "src/lib/referral-contract.ts", content: read("src/lib/referral-contract.ts") },
    { name: "src/lib/fetch-timeout.ts", content: read("src/lib/fetch-timeout.ts") },
    { name: "server/referral-store.ts", content: read("server/referral-store.ts").replaceAll('.js"', '.ts"') }
  ]
}));
