
import { test, chromium, expect } from '@playwright/test';


test(`We will add a cookie and delete it`, async () => {
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

    await context.clearCookies({
        name: 'rahul_cookie',
        domain: 'automationteststore.com',
        path: '/', // Optional, but ensures you delete the right cookie if multiple exist with the same name
    });

    // Verify the cookie was deleted (optional)
    const cookiesafterdeletion = await page.context().cookies();
    const testCookie = cookiesafterdeletion.find(cookie => cookie.name === 'rahul_cookie');
    expect(testCookie).toBeUndefined(); // since there is no rahul_cookie

    console.log(cookiesafterdeletion); // Should not include 'rahul_cookie'

    await browser.close();
});

