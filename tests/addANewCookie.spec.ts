
import { test, chromium, expect } from '@playwright/test';


test(`We will add a new cookie`, async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('/');

    const cookieToAdd = {
        name: 'rahul_cookie',
        value: '1314133cqsvwe11_133@0', // Replace with the desired value
        domain: 'automationteststore.com',
        path: '/', // Set the path as needed
        expires: Date.now() / 1000 + 3600, // Cookie expires in 1 hour
    };
    await context.addCookies([cookieToAdd]); // Add the cookie to the context

    // Verify the cookie was added (optional)
    const cookies = await page.context().cookies();
    console.log(cookies);

    await browser.close();
});


