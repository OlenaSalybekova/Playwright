const { test } = require('../fixtures/userGaragePage.js');
test('User is logged in and sees garage page', async ({ userGaragePage }) => {
  await userGaragePage.expectHeaderVisible();
});