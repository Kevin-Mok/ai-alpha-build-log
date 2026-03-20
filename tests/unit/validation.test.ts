import { describe, expect, it } from "vitest";
import { adminLoginSchema, contactSchema, newsletterSchema } from "../../lib/validation";

describe("validation schemas", () => {
  it("normalizes subscriber emails", () => {
    const result = newsletterSchema.parse({
      email: "  PERSON@Example.com  ",
      source: "homepage"
    });

    expect(result.email).toBe("person@example.com");
  });

  it("rejects short contact messages", () => {
    const result = contactSchema.safeParse({
      name: "Mira Patel",
      email: "mira@field-notes.studio",
      message: "Too short"
    });

    expect(result.success).toBe(false);
  });

  it("validates admin login emails", () => {
    const result = adminLoginSchema.safeParse({
      email: "not-an-email"
    });

    expect(result.success).toBe(false);
  });
});
