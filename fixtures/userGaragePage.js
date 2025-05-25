const { test: baseTest } = require('@playwright/test');
const { GaragePage } = require ('../pom/GaragePage');
exports.test = baseTest.extend({
  userGaragePage: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: 'storage/user.json' });
    const page = await context.newPage();
    const garagePage = new GaragePage(page);
    await garagePage.goto();
    await use(garagePage);
    await page.close();
  }
});