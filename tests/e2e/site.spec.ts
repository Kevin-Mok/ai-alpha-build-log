import { expect, test } from "@playwright/test";

test("archive hides drafts and article route returns 404 for draft content", async ({ page }) => {
  await page.goto("/blog");

  await expect(page.getByRole("heading", { name: "Long-form technical writing" })).toBeVisible();
  await expect(page.getByText("Draft Notes on Long-Form Reading Layouts")).toHaveCount(0);

  await page.goto("/blog/draft-design-notes", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "That route does not exist." })).toBeVisible();
});

test("newsletter submissions persist in demo mode and duplicates are handled clearly", async ({
  page
}) => {
  await page.goto("/");

  await page.getByLabel("Newsletter email").fill("reader@example.com");
  await page.getByRole("button", { name: "Join" }).click();
  await expect(
    page.getByText(/Subscribed\. New essays and build notes will land in your inbox/)
  ).toBeVisible();

  await page.getByLabel("Newsletter email").fill("reader@example.com");
  await page.getByRole("button", { name: "Join" }).click();
  await expect(page.getByText("That address is already on the list.")).toBeVisible();

  await page.goto("/admin/subscribers");
  await expect(page.getByText("reader@example.com")).toBeVisible();
});

test("contact inquiries write through and appear on the protected admin view in test mode", async ({
  page
}) => {
  await page.goto("/contact");

  await page.getByLabel("Name").fill("Mira Patel");
  await page.getByLabel("Email").fill("mira@field-notes.studio");
  await page.getByLabel("Company").fill("Field Notes Studio");
  await page.getByLabel("Budget range").selectOption("$5k - $10k");
  await page
    .getByLabel("Project brief")
    .fill("Need a calm technical blog with subscriber capture, protected admin views, and an MDX-first workflow.");

  await page.getByRole("button", { name: "Send inquiry" }).click();
  await expect(page.getByText("Inquiry captured. I will follow up with a concrete response.")).toBeVisible();

  await page.goto("/admin/inquiries");
  await expect(page.getByText("Need a calm technical blog with subscriber capture")).toBeVisible();
});
