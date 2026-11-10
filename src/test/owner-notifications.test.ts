import { describe, expect, it, vi } from "vitest";
import { dispatchOwnerNotifications } from "../../server/owner-notifications";

const env = { SUPABASE_URL: "https://example.invalid", SUPABASE_SERVICE_ROLE_KEY: "test", RESEND_API_KEY: "test", REFERRAL_FROM_EMAIL: "sender@example.test" };
const notice = { id: "notice-1", lease_token: "lease-1", reference: "ZI-TEST", created_at: "2026-11-10T00:00:00Z", payload: { fullName: "Test Buyer", email: "buyer@example.test", whatsapp: "+255 716 000 000", budget: "Not decided", propertyType: "Villa", area: "Any area", timeline: "Exploring options" } };

describe("independent owner notification", () => {
  it("does not claim mail without a configured sender", async () => {
    const fetcher = vi.fn();
    expect((await dispatchOwnerNotifications({}, fetcher)).configured).toBe(false);
    expect(fetcher).not.toHaveBeenCalled();
  });
  it("sends only to the owner with a WhatsApp link and stable retry key", async () => {
    const calls: {url: string; init: RequestInit}[] = [];
    const fetcher = vi.fn(async (url: string, init: RequestInit) => {
      calls.push({url, init});
      if(url.includes("zi_claim_owner_notifications")) return new Response(JSON.stringify([notice]));
      if(url.includes("resend.com")) return new Response(JSON.stringify({id:"mail-1"}));
      return new Response(null,{status:204});
    });
    expect((await dispatchOwnerNotifications(env,fetcher as typeof fetch)).sent).toBe(1);
    const message=JSON.parse(calls[1].init.body as string);
    expect(message.to).toEqual(["info@zanzibaba.com"]);
    expect(message.reply_to).toBe("buyer@example.test");
    expect(message.text).toContain("https://wa.me/255716000000");
    expect(calls[1].init.headers).toMatchObject({"Idempotency-Key":"zi-owner/notice-1"});
    expect(calls[2].url).toContain("lease_token=eq.lease-1");
    expect(JSON.parse(calls[2].init.body as string)).toMatchObject({status:"sent",provider_id:"mail-1"});
  });
  it("leaves failed mail pending and records no false delivery", async () => {
    const calls: RequestInit[]=[];
    const fetcher=vi.fn(async(url:string,init:RequestInit)=>{
      if(url.includes("zi_claim_owner_notifications")) return new Response(JSON.stringify([notice]));
      if(url.includes("resend.com")) return new Response("{}",{status:503});
      calls.push(init);return new Response(null,{status:204});
    });
    expect((await dispatchOwnerNotifications(env,fetcher as typeof fetch)).failed).toBe(1);
    expect(JSON.parse(calls[0].body as string)).toMatchObject({status:"pending",sent_at:null,error_code:"provider_503"});
  });
});
