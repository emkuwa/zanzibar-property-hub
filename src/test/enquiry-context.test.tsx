import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { enquiryContext, enquiryLinkFor } from "../lib/enquiry-context";
import ReferralForm from "../components/referral/ReferralForm";

afterEach(() => { cleanup(); window.history.replaceState({}, "", "/"); });
describe("guide-to-enquiry context", () => {
  it("counts the first form interaction once without contact values", () => {
    const previous = window.gtag;
    const gtag = vi.fn();
    window.gtag = gtag;
    try {
      render(<ReferralForm />);
      fireEvent.change(screen.getByLabelText("Full name"), { target: { value: "Private Buyer" } });
      fireEvent.change(screen.getByLabelText("Email address"), { target: { value: "private@example.test" } });
      const starts = gtag.mock.calls.filter((args) => args[1] === "enquiry_form_started");
      expect(starts).toHaveLength(1);
      expect(starts[0][2]).toEqual({ form_name: "developer_network" });
      expect(JSON.stringify(gtag.mock.calls)).not.toContain("private@example.test");
    } finally { window.gtag = previous; }
  });
  it("maps specific guides without choosing for a comparison or an ambiguous budget", () => {
    expect(enquiryContext("?from=%2Fguides%2Fzanzibar-apartments")?.propertyType).toBe("Apartment");
    expect(enquiryContext("?from=%2Fareas%2Fpaje")?.area).toBe("Paje / Jambiani");
    expect(enquiryLinkFor("/blog/apartment-vs-villa")).toBe("/#enquiry");
    expect(enquiryLinkFor("/guides/zanzibar-property-under-150000")).toBe("/#enquiry");
  });
  it("ignores arbitrary or inherited keys and external destinations", () => {
    for (const from of ["https://attacker.example", "__proto__", "constructor", "/unknown"]) {
      expect(enquiryContext(`?from=${encodeURIComponent(from)}`)).toBeUndefined();
      expect(enquiryLinkFor(from)).toBe("/#enquiry");
    }
  });
  it("makes defaults editable and never preselects consent, contacts or budget", () => {
    window.history.replaceState({}, "", enquiryLinkFor("/guides/zanzibar-apartments"));
    render(<ReferralForm />);
    expect(screen.getByLabelText("Property type")).toHaveValue("Apartment");
    fireEvent.change(screen.getByLabelText("Property type"), { target: { value: "Villa" } });
    expect(screen.getByLabelText("Property type")).toHaveValue("Villa");
    expect(screen.getByLabelText("Budget in USD")).toHaveValue("");
    expect(screen.getByLabelText("Full name")).toHaveValue("");
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });
  it("uses existing grouped area options and leaves property type undecided", () => {
    window.history.replaceState({}, "", enquiryLinkFor("/areas/fumba"));
    render(<ReferralForm />);
    expect(screen.getByLabelText("Preferred area")).toHaveValue("Fumba / west coast");
    expect(screen.getByLabelText("Property type")).toHaveValue("");
  });
});
