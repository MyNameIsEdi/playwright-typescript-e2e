import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryItems: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItems = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('[data-test="product_sort_container"]');
  }

  async addFirstItemToCart() {
    await this.inventoryItems.first().locator('button').click();
  }

  async addItemToCart(itemName: string) {
    const item = this.inventoryItems.filter({ hasText: itemName });
    await item.locator('button').click();
  }

  async removeItemFromCart(itemName: string) {
    const item = this.inventoryItems.filter({ hasText: itemName });
    await item.locator('button').click();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  async getItemNames(): Promise<string[]> {
    return this.page.locator('.inventory_item_name').allTextContents();
  }

  async getItemPrices(): Promise<number[]> {
    const priceTexts = await this.page.locator('.inventory_item_price').allTextContents();
    return priceTexts.map(p => parseFloat(p.replace('$', '')));
  }

  async goToCart() {
    await this.cartLink.click();
  }
}