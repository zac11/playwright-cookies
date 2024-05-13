
import { test, chromium, expect } from '@playwright/test';


test(`We will clear all cookies`, async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('/');
    const cookies = await page.context().cookies();
    console.log(cookies); // print all cookies before deleting

    await page.context().clearCookies();
    const cookiesafterClearing = await page.context().cookies();
    expect(cookiesafterClearing).toHaveLength(0)   // cookie array to have length 0

    console.log(cookiesafterClearing); // print all cookies after clearing

    await browser.close();


});

