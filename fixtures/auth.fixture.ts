import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { USERS } from '../utils/test-data';

export const test = base.extend({
  page: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await use(page);
  },
});

export { expect } from '@playwright/test';
