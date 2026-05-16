import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async getCartItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  async getItemNames(): Promise<string[]> {
    return this.page.locator('.cart_item .inventory_item_name').allTextContents();
  }

  async removeItem(dataTestId: string) {
    await this.page.locator(`[data-test="remove-${dataTestId}"]`).click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}
