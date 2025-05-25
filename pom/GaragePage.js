const { expect } = require('@playwright/test');
exports.GaragePage = class GaragePage {
  constructor(page) {
    this.page = page;
    this.header = page.locator('.header');
  }
  async goto() {
    await this.page.goto('https://guest:welcome2qauto@qauto.forstudy.space/garage');
  }
  async expectHeaderVisible() {
    await expect(this.header).toBeVisible();
  }
};