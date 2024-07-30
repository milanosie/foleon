import { test, expect } from '@playwright/test';

test.describe('Foleon Landing Page', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the page before each test
    await page.goto('http://localhost:4200/projects');
  });

  test('should display the main elements', async ({ page }) => {
    await expect(page.locator('h1.text-primary')).toHaveText('My Foleon Projects');
    await expect(page.locator('input#search')).toBeVisible();
    await expect(page.locator('p-orderList')).toBeVisible();
  });

  test('should display project details in the order list', async ({ page }) => {
    const projectItems = page.locator('p-orderList .flex-1');
    await expect(projectItems).toHaveCount(2);

    const projectName = 'test';
    await expect(projectItems.nth(0).locator('.font-bold')).toHaveText(projectName);
  });

});
