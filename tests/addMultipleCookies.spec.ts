import { test, chromium, expect } from '@playwright/test';

test(`We will add a multiple cookies`, async () => {
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

    const cookieToAdd2 = {
        name: 'rahul_cookie2',
        value: '4112221wwrwdda_212@1', // Replace with the desired value
        domain: 'automationteststore.com',
        path: '/', // Set the path as needed
        expires: Date.now() / 1000 + 3600, // Cookie expires in 1 hour
    };
    await context.addCookies([cookieToAdd, cookieToAdd2]); // Add the cookies to the context

    // Print the cookies (optional)
    const cookies = await page.context().cookies();
    console.log(cookies);

    // Validate cookies is now present in the list of cookies

    /**
     * Approach One - Use find() method to get the cookie with desired name
     */

    const cookieA = cookies.find(cookie => cookie.name === 'rahul_cookie');
    expect(cookieA).toBeDefined();
    const cookieB = cookies.find(cookie => cookie.name === 'rahul_cookie2');
    expect(cookieB).toBeDefined();

    /**
     * Approach Two - Get all the cookie names and assert that the value is contained in that array
     */


    const cookieNames = await cookies.map((cookie) => cookie.name);
    console.log(`All cookie names are ===> ${cookieNames}`)
    expect(cookieNames).toContain(cookieToAdd.name)

    await browser.close();
});
