import { test, expect } from '../fixtures/auth.fixture';
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/CartPage';
import { URLS } from '../utils/test-data';

test.describe('Shopping Cart', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
  });

  test('cart badge updates when item is added', async () => {
    await inventoryPage.addFirstItemToCart();
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test('cart badge reflects multiple items added', async () => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');
    await expect(inventoryPage.cartBadge).toHaveText('2');
  });

  test('cart badge disappears after removing all items', async () => {
    await inventoryPage.addFirstItemToCart();
    await expect(inventoryPage.cartBadge).toHaveText('1');
    await inventoryPage.removeItemFromCart('Sauce Labs Backpack');
    await expect(inventoryPage.cartBadge).not.toBeVisible();
  });

  test('added item appears in cart', async () => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    expect(await cartPage.getCartItemCount()).toBe(1);
    const names = await cartPage.getItemNames();
    expect(names).toContain('Sauce Labs Backpack');
  });

  test('removing item from cart page empties the cart', async ({ page }) => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    await expect(page).toHaveURL(URLS.cart);
    await cartPage.removeItem('sauce-labs-backpack');
    await expect(cartPage.cartItems).toHaveCount(0);
  });

  test('continue shopping navigates back to inventory', async ({ page }) => {
    await inventoryPage.goToCart();
    await cartPage.continueShopping();
    await expect(page).toHaveURL(URLS.inventory);
  });
});
