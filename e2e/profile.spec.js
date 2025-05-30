const { test, expect } = require('@playwright/test');
test('change response and verify UI update', async ({ page }) => {
  await page.route('**/api/users/profile', async route => {
    const fakeResponse = {
      data: {
        name: 'Test for course',
        avatar: '',
      }
    };
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(fakeResponse),
    });
  });
  await page.goto('https://qauto.forstudy.space/profile');
  await page.waitForResponse(response =>
    response.url().includes('/api/users/profile') && response.status() === 200
  );
  await expect(page.getByText('Test for course')).toBeVisible({ timeout: 10000 });
});