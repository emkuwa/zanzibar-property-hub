import { dispatchOwnerNotifications } from "./server/owner-notifications.ts";
import { referralSchema } from "./src/lib/referral-contract.ts";
import { registerReferral, StoreError } from "./server/referral-store.ts";
Deno.serve(async (req: Request) => {
 const headers = {"Content-Type":"application/json","Cache-Control":"no-store"};
 const reply=(status:number,body:unknown)=>new Response(JSON.stringify(body),{status,headers});
 if(req.method!=="POST")return reply(405,{success:false});
 try{
  const raw=await req.text();if(raw.length>14000)return reply(413,{success:false});
  const body=JSON.parse(raw);const parsed=referralSchema.safeParse(body.input);
  if(!parsed.success)return reply(400,{success:false});
  const env={SUPABASE_URL:Deno.env.get("SUPABASE_URL"),SUPABASE_SERVICE_ROLE_KEY:Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"),RESEND_API_KEY:Deno.env.get("RESEND_API_KEY"),REFERRAL_FROM_EMAIL:Deno.env.get("REFERRAL_FROM_EMAIL")};
  const result=await registerReferral(parsed.data,String(body.ip||"unknown").slice(0,100),env);
  try { const notice = await dispatchOwnerNotifications(env); console.info("zi_owner_notification", notice); } catch { console.warn("zi_owner_notification_pending"); }
  return reply(result.duplicate?200:201,result);
 }catch(e){return reply(e instanceof StoreError?e.status:503,{success:false});}
});
