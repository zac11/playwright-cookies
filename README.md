# playwright-cookies
Recently in one of my projects, I had to work with cookies. Since we're using Playwright with Typescript in that project (for UI Automation), it was a chance to work with how Playwright allows us to handle cookies.


## Cookies 

Cookies are small pieces of text sent to your browser by a website you visit. They help that website remember information about your visit, which can both make it easier to visit the site again and make the site more useful to you.

You can read about Cookies in this great link by Google - https://policies.google.com/technologies/cookies?hl=en-US


## Cookies with Playwright
In Playwright documentation, I saw that the methods that have been provided for the browser context and not an individual page. I'm not sure of the reasoning behind this, so whatever methods we've used in this have been at context level.

Playwright basically gives these following methods for working with cookies

1.  `cookies()` : This method will return all cookies for that URL
2. `cookies(url)` : If you want to return cookies for a specific URL, you can give that url as optional parameter.
3.  `clearCookies()` : This method removes all cookies from context. If you want to remove specific cookies, then it accepts optional parameters that you can pass.
4. `addCookies([cookieObj])` : This method is used to add a cookie to a particular context. This will add cookies to all pages within that context. You can pass multiple objects in the method to add multiple cookies.


## Print all cookies
You can use the `cookies()` method to print all cookies. The relevant file in this repo is `printAllCookies.spec.ts`.


Sample code
```
    const cookies = await page.context().cookies();
    console.log(cookies);
```


## Clear All cookies
You can use the `clearCookies()` method to clear all cookies from that context. The code for this can be found in `clearingAllCookies.spec.ts`


Sample code :
```
    await page.context().clearCookies();
    const cookiesafterClearing = await page.context().cookies();
    expect(cookiesafterClearing).toHaveLength(0)   // cookie array to have length 0
```


## Add a new cookie
You can use the `addCookies([cookieObj])` method to provide a cookie object to add a new cookie. The code for this can be found in `addANewCookie.spec.ts`


Sample code
```
 const cookieToAdd = {
        name: 'rahul_cookie',
        value: '1314133cqsvwe11_133@0', // Replace with the desired value
        domain: 'automationteststore.com',
        path: '/', // Set the path as needed
        expires: Date.now() / 1000 + 3600, // Cookie expires in 1 hour
    };
    await context.addCookies([cookieToAdd]); // Add the cookie to the context
```

## Add multiple cookies
You can use the `addCookies([cookieObj, cookieObj2])` method to provide multiple cookie objects to add multiple new cookie. The code for this can be found in `addMultipleCookies.spec.ts`


Sample code :
```
const cookieToAdd = {
        name: "Some_name",
        ..
        ..
    };

const cookieToAdd2 = {
        name: 'Some_name_2',
        ..
        ..
       
    };

await context.addCookies([cookieToAdd,cookieToAdd2]); // Add the cookie to the context
```

## Delete/Clear a single cookie
To delete/clear a single cookie, you can use the `clearCookies()` with optional arguments provided in the method. The code for this can be found in `deleteACookie.spec.ts`


Sample code :
```
await context.clearCookies({
        name: 'rahul_cookie',
        domain: 'automationteststore.com',
        path: '/', // Optional, but ensures you delete the right cookie if multiple exist with the same name
    });

```
The full list of optional parameters can be found in https://playwright.dev/docs/api/class-browsercontext#browser-context-clear-cookies