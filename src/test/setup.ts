import "@testing-library/jest-dom";
import { vi } from "vitest";

// Server imports resolve configuration at module load. Unit tests use mocked
// fetchers and non-routable fixtures, never a live project or real credential.
vi.stubEnv("SUPABASE_EDGE_URL", "https://example.invalid/functions/v1/zanziinvest-referral");
vi.stubEnv("SUPABASE_EDGE_ANON_KEY", "test-only-not-a-credential");

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});
