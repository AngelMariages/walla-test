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

test('when marking a favorite it should show in the favorites modal', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('favbutton').click();

    const favModalText = await page
        .getByTestId('favorites-modal-list')
        .allTextContents();

    expect(favModalText).toEqual(['No items found']);

    await page.getByTestId('close-fav-button').click();

    await page.getByTestId('product-0').getByTestId('favicon').click();
    await page.getByTestId('product-2').getByTestId('favicon').click();

    await page.getByTestId('favbutton').click();

    const product0 = page.getByTestId('favorites-modal-list').getByTestId('product-0');
    const product2 = page.getByTestId('favorites-modal-list').getByTestId('product-2');

    expect(product0).toBeTruthy();
    expect(product2).toBeTruthy();
});
