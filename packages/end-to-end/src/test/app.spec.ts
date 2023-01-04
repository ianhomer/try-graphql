import { expect, test } from "@playwright/test";

test("should start up OK", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("header.app")).toContainText("Try GraphQL");
  await expect(page.locator(".song#song-1")).toContainText("Song 1");
});
