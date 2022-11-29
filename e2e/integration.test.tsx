import { test, expect } from '@playwright/test';

test('should show the first 5 items correctly', async ({ page }) => {
    await page.goto('/');

    const items = await page.$$('[data-testid^="product-"]');
    expect(items.length).toBe(5);
});

test('should show the first 5 items more after scrolling', async ({ page }) => {
    await page.goto('/');

    await page.waitForSelector('[data-testid^="product-"]');

    const firstItems = await page.$$('[data-testid^="product-"]');
    expect(firstItems.length).toBe(5);

    await page.click('[data-testid="products-list"]');
    await page.keyboard.press('PageDown');

    await page.waitForSelector('[data-testid="product-6"]', {
        state: 'attached',
    });

    const items = await page.$$('[data-testid^="product-"]');

    expect(items.length >= 10).toBeTruthy();
});
