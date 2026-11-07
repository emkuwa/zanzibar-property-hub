import { describe, expect, it } from "vitest";
import { aiReferralEngine } from "../lib/gtag";
describe("AI referral attribution", () => {
  it("accepts known origins, never similarly named domains", () => {
    expect(aiReferralEngine("https://chatgpt.com/")).toBe("chatgpt");
    expect(aiReferralEngine("https://chatgpt.com.attacker.example/")).toBeUndefined();
    expect(aiReferralEngine("https://perplexity.ai/search?q=private")).toBe("perplexity");
  });
  it("does not label ordinary Bing or Google traffic as AI", () => {
    expect(aiReferralEngine("https://www.bing.com/search?q=property")).toBeUndefined();
    expect(aiReferralEngine("https://google.com/")).toBeUndefined();
    expect(aiReferralEngine("https://bing.com/copilot")).toBe("copilot");
    expect(aiReferralEngine("")).toBeUndefined();
  });
});
