import { describe, expect, it } from "vitest";
import { aiReferralEngine, currentAiReferral } from "../lib/gtag";
describe("AI referral attribution", () => {
  it("keeps a validated AI category across internal navigation", () => {
    sessionStorage.setItem("zi-ai-referral-v1", "perplexity");
    expect(currentAiReferral()).toBe("perplexity");
    sessionStorage.setItem("zi-ai-referral-v1", "invalid-value");
    expect(currentAiReferral()).toBeUndefined();
    sessionStorage.removeItem("zi-ai-referral-v1");
  });
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
