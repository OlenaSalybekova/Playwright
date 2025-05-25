const { chromium } = require('@playwright/test');
const fs = require('fs');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://guest:welcome2qauto@qauto.forstudy.space');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.fill('#signinEmail', 'user1905@gmail.com');    
  await page.fill('#signinPassword', 'Pass1905!');       
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL('**/garage');
  await page.context().storageState({ path: 'storage/user.json' });
  await browser.close();
})();