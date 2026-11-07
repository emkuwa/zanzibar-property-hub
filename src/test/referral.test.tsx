import { afterEach, describe, expect, it, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { CONSENT_VERSION, referralSchema } from "../lib/referral-contract";
import ReferralForm from "../components/referral/ReferralForm";
import { createReferralHandler, type ApiRequest } from "../../api/referral";
import { dispatchReferrals } from "../../server/referral-dispatch";

const uuid = "11111111-1111-4111-8111-111111111111";
const valid = {
  requestId: uuid,
  fullName: "Test Buyer",
  email: "buyer@example.test",
  whatsapp: "+255 716 000 000",
  budget: "$100,000–$150,000",
  propertyType: "Villa",
  area: "Any area",
  timeline: "3–6 months",
  consent: true,
  consentVersion: CONSENT_VERSION,
  website: "",
};
const env = {
  SUPABASE_URL: "https://example.supabase.co",
  SUPABASE_SERVICE_ROLE_KEY: "test-server-only",
};
function response() {
  const res = {
    code: 0,
    body: null as unknown,
    headers: {} as Record<string, string>,
    status(code: number) {
      this.code = code;
      return this;
    },
    json(body: unknown) {
      this.body = body;
      return this;
    },
    setHeader(k: string, v: string) {
      this.headers[k] = v;
    },
  };
  return res;
}
function request(body: unknown = valid): ApiRequest {
  return {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "https://www.zanziinvest.com",
      "x-forwarded-for": "192.0.2.1",
    },
    body,
  };
}
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("server-side consent and saving", () => {
  it("rejects absent, old and unchecked consent as well as invalid contact data", () => {
    for (const patch of [
      { consent: false },
      { consent: undefined },
      { consentVersion: "old" },
      { email: "bad" },
      { whatsapp: "0716000000" },
      { website: "spam.example" },
    ]) {
      expect(referralSchema.safeParse({ ...valid, ...patch }).success).toBe(
        false,
      );
    }
  });
  it("never dispatches without consent", async () => {
    const fetcher = vi.fn();
    const res = response();
    await createReferralHandler(env, fetcher)(
      request({ ...valid, consent: false }),
      res,
    );
    expect(res.code).toBe(400);
    expect(fetcher).not.toHaveBeenCalled();
  });
  it("does not return success when durable storage fails", async () => {
    const fetcher = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ message: "storage down" }), {
        status: 500,
      }),
    );
    const res = response();
    await createReferralHandler(env, fetcher)(request(), res);
    expect(res.code).toBe(503);
    expect(res.body).toMatchObject({ success: false });
  });
  it("records exact consent and returns a saved reference without exposing recipients", async () => {
    const fetcher = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          reference: "ZI-TEST",
          lead_id: uuid,
          deliveries: 3,
          duplicate: false,
        }),
        { status: 200 },
      ),
    );
    const res = response();
    await createReferralHandler(env, fetcher)(request(), res);
    expect(res.code).toBe(201);
    expect(res.body).toEqual({
      success: true,
      reference: "ZI-TEST",
      distributionStatus: "queued",
    });
    const stored = JSON.parse(fetcher.mock.calls[0][1].body);
    expect(stored.p_payload.consentText).toContain(
      "all participating partner developers",
    );
    expect(stored.p_rate_key).not.toContain("192.0.2.1");
  });
  it("rejects untrusted origins, malformed bodies, and changed idempotency payloads", async () => {
    const fetcher = vi.fn();
    const forbidden = response();
    await createReferralHandler(env, fetcher)(
      {
        ...request(),
        headers: { ...request().headers, origin: "https://attacker.example" },
      },
      forbidden,
    );
    expect(forbidden.code).toBe(403);
    expect(fetcher).not.toHaveBeenCalled();
    const malformed = response();
    await createReferralHandler(env, fetcher)(request("{"), malformed);
    expect(malformed.code).toBe(400);
    fetcher.mockResolvedValue(
      new Response(JSON.stringify({ message: "request_conflict" }), {
        status: 400,
      }),
    );
    const conflict = response();
    await createReferralHandler(env, fetcher)(request(), conflict);
    expect(conflict.code).toBe(409);
  });
});

describe("all-partner delivery", () => {
  const delivery = (id: string, recipient: string) => ({
    id,
    lease_token: uuid,
    reference: "ZI-TEST",
    recipient_email: recipient,
    partner_name: "Approved developer",
    payload: valid,
  });
  it("uses separate messages and stable idempotency keys for every queued developer", async () => {
    const calls: { url: string; init: RequestInit }[] = [];
    const fetcher = vi.fn(async (url: string, init: RequestInit) => {
      calls.push({ url, init });
      if (url.includes("zi_claim_deliveries"))
        return new Response(
          JSON.stringify([
            delivery("d1", "one@example.test"),
            delivery("d2", "two@example.test"),
          ]),
        );
      if (url.includes("resend.com"))
        return new Response(JSON.stringify({ id: "provider-id" }));
      return new Response(null, { status: 204 });
    });
    expect(
      await dispatchReferrals(
        {
          ...env,
          RESEND_API_KEY: "test",
          REFERRAL_FROM_EMAIL: "sender@example.test",
        },
        fetcher as typeof fetch,
      ),
    ).toEqual({ sent: 2, failed: 0, configured: true });
    const sends = calls.filter((c) => c.url.includes("resend.com"));
    expect(sends).toHaveLength(2);
    expect(sends.map((c) => JSON.parse(c.init.body as string).to)).toEqual([
      ["one@example.test"],
      ["two@example.test"],
    ]);
    expect(
      sends.map(
        (c) => (c.init.headers as Record<string, string>)["Idempotency-Key"],
      ),
    ).toEqual(["zi-referral/d1", "zi-referral/d2"]);
    expect(JSON.parse(sends[0].init.body as string)).not.toHaveProperty("cc");
    expect(JSON.parse(sends[0].init.body as string)).not.toHaveProperty("bcc");
  });
  it("leaves unavailable provider credentials untouched and failed sends pending", async () => {
    const missing = vi.fn();
    expect((await dispatchReferrals(env, missing)).configured).toBe(false);
    expect(missing).not.toHaveBeenCalled();
    const calls: RequestInit[] = [];
    const fetcher = vi.fn(async (url: string, init: RequestInit) => {
      if (url.includes("zi_claim_deliveries"))
        return new Response(
          JSON.stringify([delivery("d1", "one@example.test")]),
        );
      if (url.includes("resend.com"))
        return new Response(JSON.stringify({ error: "unavailable" }), {
          status: 503,
        });
      calls.push(init);
      return new Response(null, { status: 204 });
    });
    const result = await dispatchReferrals(
      {
        ...env,
        RESEND_API_KEY: "test",
        REFERRAL_FROM_EMAIL: "sender@example.test",
      },
      fetcher as typeof fetch,
    );
    expect(result.failed).toBe(1);
    expect(JSON.parse(calls[0].body as string)).toMatchObject({
      status: "pending",
      error_code: "provider_503",
    });
  });
});

function fillForm() {
  fireEvent.change(screen.getByLabelText("Property type"), {
    target: { value: "Villa" },
  });
  fireEvent.change(screen.getByLabelText("Budget in USD"), {
    target: { value: valid.budget },
  });
  fireEvent.change(screen.getByLabelText("Purchase timeline"), {
    target: { value: valid.timeline },
  });
  fireEvent.change(screen.getByLabelText("Full name"), {
    target: { value: valid.fullName },
  });
  fireEvent.change(screen.getByLabelText("Email address"), {
    target: { value: valid.email },
  });
  fireEvent.change(screen.getByLabelText("WhatsApp number"), {
    target: { value: valid.whatsapp },
  });
}
describe("customer enquiry form", () => {
  it("requires an explicit unchecked consent and only shows confirmation after saving", async () => {
    vi.stubGlobal("crypto", { randomUUID: () => uuid });
    const fetcher = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: true, reference: "ZI-TEST" }), {
        status: 201,
      }),
    );
    vi.stubGlobal("fetch", fetcher);
    render(<ReferralForm />);
    fillForm();
    const consent = screen.getByRole("checkbox");
    expect(consent).not.toBeChecked();
    fireEvent.submit(screen.getByRole("form", { name: "Property enquiry" }));
    expect(fetcher).not.toHaveBeenCalled();
    fireEvent.click(consent);
    fireEvent.submit(screen.getByRole("form", { name: "Property enquiry" }));
    await waitFor(() =>
      expect(screen.getByText("ZI-TEST")).toBeInTheDocument(),
    );
    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/more than one developer/)).toBeInTheDocument();
  });
  it("keeps a failed enquiry retryable and does not show false success", async () => {
    vi.stubGlobal("crypto", { randomUUID: () => uuid });
    const fetcher = vi.fn().mockRejectedValue(new Error("offline"));
    vi.stubGlobal("fetch", fetcher);
    render(<ReferralForm />);
    fillForm();
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.submit(screen.getByRole("form", { name: "Property enquiry" }));
    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent(/retry/),
    );
    expect(screen.queryByText("Enquiry received")).not.toBeInTheDocument();
    fireEvent.submit(screen.getByRole("form", { name: "Property enquiry" }));
    await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(2));
    expect(JSON.parse(fetcher.mock.calls[0][1].body).requestId).toBe(
      JSON.parse(fetcher.mock.calls[1][1].body).requestId,
    );
  });
});
