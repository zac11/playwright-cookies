import { test, expect } from '@playwright/test';

test('Print all cookies for this domain', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector(`a.logo`, {
        "state": 'visible'
    });

    const cookies = await page.context().cookies();
    console.log(cookies);

    await page.close();

    // Expect a title "to contain" a substring.

});

