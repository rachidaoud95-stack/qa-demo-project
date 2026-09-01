import { Page, Locator } from '@playwright/test';

/**
 * Page Object for the SauceDemo login screen.
 * Isolating selectors here means a UI change only breaks one file,
 * not every spec that logs in.
 */
export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly submit: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator('#user-name');
    this.password = page.locator('#password');
    this.submit = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.submit.click();
  }
}
