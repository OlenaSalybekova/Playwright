const { expect } = require('@playwright/test');

exports.SignupPage = class SignupPage {

  constructor(page) {
    this.page = page;
    this.signupButton = page.getByRole('button', { name: 'Sign up' });
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.nameInput = page.locator('#signupName');
    this.lastNameInput = page.locator('#signupLastName');
    this.emailInput = page.locator('#signupEmail');
    this.passwordInput = page.locator('#signupPassword');
    this.repeatPasswordInput = page.locator('#signupRepeatPassword');
  }

  async goto() {
    await this.page.goto('/');
  }

  async openSignupForm() {
    await this.signupButton.click();
  }

  async fillSignupForm(name, lastName, email, password) {
    await this.nameInput.fill(name);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.repeatPasswordInput.fill(password);
  }

  async submitRegistration() {
    await this.registerButton.click();
  }

  async expectRegisterButtonDisabled() {
    await expect(this.registerButton).toBeDisabled();
  }

  async expectRegisterButtonEnabled() {
    await expect(this.registerButton).toBeEnabled();
  }

  async expectErrorMessage(text) {
    await expect(this.page.getByText(text)).toBeVisible();
  }
};