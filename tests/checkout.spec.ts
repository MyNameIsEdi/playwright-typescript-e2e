import { test, expect } from '../fixtures/auth.fixture';
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { URLS, SHIPPING } from '../utils/test-data';

test.describe('Checkout Flow', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
  });

  test('complete purchase flow ends on confirmation page', async ({ page }) => {
    await checkoutPage.fillShippingInfo(
      SHIPPING.valid.firstName,
      SHIPPING.valid.lastName,
      SHIPPING.valid.postalCode
    );
    await checkoutPage.continue();
    await expect(page).toHaveURL(URLS.checkoutStep2);

    await checkoutPage.finish();
    await expect(page).toHaveURL(URLS.checkoutComplete);
    await expect(checkoutPage.confirmationHeader).toHaveText('Thank you for your order!');
  });

  test('order overview shows the correct item', async ({ page }) => {
    await checkoutPage.fillShippingInfo(
      SHIPPING.valid.firstName,
      SHIPPING.valid.lastName,
      SHIPPING.valid.postalCode
    );
    await checkoutPage.continue();
    await expect(page).toHaveURL(URLS.checkoutStep2);

    const names = await cartPage.getItemNames();
    expect(names).toContain('Sauce Labs Backpack');
  });

  test('empty shipping form shows validation error', async () => {
    await checkoutPage.continue();
    await expect(checkoutPage.errorMessage).toBeVisible();
    await expect(checkoutPage.errorMessage).toContainText('First Name is required');
  });

  test('cancel checkout returns to cart', async ({ page }) => {
    await checkoutPage.cancel();
    await expect(page).toHaveURL(URLS.cart);
  });
});
