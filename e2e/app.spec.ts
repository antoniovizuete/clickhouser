import { test, expect } from "@playwright/test";

test("Smoke test", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.click("button.cc-nb-okagree");

  //await expect(page).toHaveScreenshot();

  await expect(page).toHaveTitle(/Clickhouser/);

  await expect(page.locator(".bp4-navbar-heading")).toHaveText("Clickhouser");

  await expect(page.locator("button[aria-label='Run query']")).toBeVisible();

  await expect(page.locator("button[aria-label='Run query']")).toBeEnabled();

  await expect(page.getByPlaceholder("Server address")).toHaveValue(
    "http://localhost:8123/"
  );

  await expect(page.getByPlaceholder("Username")).toHaveValue("default");

  await expect(page.getByPlaceholder("Password")).toHaveValue("");
});
