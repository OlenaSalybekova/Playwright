
const { test } = require('@playwright/test');
const { SignupPage } = require('../tests/Signup_page.js');
const { saveCredentials } = require('../saveCredentials.js');

test('Signup with random credential', async ({ page }) => {
  const signupPage = new SignupPage(page);
  const randomID = Math.floor(Math.random() * 10000);
  const email = `user${randomID}@gmail.com`;
  const password = `Pass${randomID}!`;

  await signupPage.goto();
  await signupPage.openSignupForm();
  await signupPage.expectRegisterButtonDisabled();
  await signupPage.fillSignupForm('Brenda', 'Testovna', email, password);
  await signupPage.expectRegisterButtonEnabled();
  await signupPage.submitRegistration();

  saveCredentials(email, password);
});

test('Name - validation errors', async ({ page }) => {
  const signupPage = new SignupPage(page);
  await signupPage.goto();
  await signupPage.openSignupForm();
  await signupPage.expectRegisterButtonDisabled();

  await signupPage.nameInput.fill('');
  await page.click('body');
  await signupPage.expectErrorMessage('Name required');

  await signupPage.nameInput.fill('111');
  await page.click('body');
  await signupPage.expectErrorMessage('Name is invalid');

  await signupPage.nameInput.fill('Tetstjhjygfyfgjfgjegfgjhb');
  await page.click('#signupLastName');
  await signupPage.expectErrorMessage('Name has to be from 2 to 20 characters long');
});

test('Last Name - validation errors', async ({ page }) => {
  const signupPage = new SignupPage(page);
  await signupPage.goto();
  await signupPage.openSignupForm();
  await signupPage.expectRegisterButtonDisabled();

  await signupPage.lastNameInput.fill('');
  await page.click('body');
  await signupPage.expectErrorMessage('Last name required');

  await signupPage.lastNameInput.fill('97');
  await page.click('body');
  await signupPage.expectErrorMessage('Last name is invalid');

  await signupPage.lastNameInput.fill('Tetstjhjygfyfgjfgjegfgjhb');
  await page.click('body');
  await signupPage.expectErrorMessage('Last name has to be from 2 to 20 characters long');
});

test('Email - validation errors', async ({ page }) => {
  const signupPage = new SignupPage(page);
  await signupPage.goto();
  await signupPage.openSignupForm();
  await signupPage.expectRegisterButtonDisabled();

  await signupPage.emailInput.fill('');
  await page.click('#signupLastName');
  await signupPage.expectErrorMessage('Email required');

  await signupPage.emailInput.fill('user123@');
  await page.click('body');
  await signupPage.expectErrorMessage('Email is incorrect');

  await signupPage.emailInput.fill('12@com');
  await page.click('body');
  await signupPage.expectErrorMessage('Email is incorrect');
});

test('Password - validation errors', async ({ page }) => {
  const signupPage = new SignupPage(page);
  await signupPage.goto();
  await signupPage.openSignupForm();
  await signupPage.expectRegisterButtonDisabled();

  await signupPage.passwordInput.fill('');
  await page.click('body');
  await signupPage.expectErrorMessage('Password required');

  await signupPage.passwordInput.fill('user123@');
  await page.click('body');
  await signupPage.expectErrorMessage('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');

  await signupPage.passwordInput.fill('USERTESTER1221123@');
  await page.click('body');
  await signupPage.expectErrorMessage('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
});