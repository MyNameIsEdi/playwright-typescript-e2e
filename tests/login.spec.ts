import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { USERS, URLS } from '../utils/test-data';

test.describe('Authentication', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('valid credentials redirect to inventory page', async ({ page }) => {
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await expect(page).toHaveURL(URLS.inventory);
  });

  test('locked out user sees account locked error', async () => {
    await loginPage.login(USERS.locked.username, USERS.locked.password);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('locked out');
  });

  test('invalid credentials show mismatch error', async () => {
    await loginPage.login('invalid_user', 'wrong_password');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Username and password do not match');
  });

  test('login form elements are visible on page load', async () => {
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });
});
