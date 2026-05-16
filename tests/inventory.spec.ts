import { test, expect } from '../fixtures/auth.fixture';
import { InventoryPage } from '../pages/inventoryPage';
import { SORT_OPTIONS } from '../utils/test-data';

test.describe('Inventory Page', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
  });

  test('displays all six products', async () => {
    await expect(inventoryPage.inventoryItems).toHaveCount(6);
  });

  test('cart badge is not visible when cart is empty', async () => {
    await expect(inventoryPage.cartBadge).not.toBeVisible();
  });

  test('sort by name A-Z returns alphabetical order', async () => {
    await inventoryPage.sortBy(SORT_OPTIONS.nameAZ);
    const names = await inventoryPage.getItemNames();
    expect(names).toEqual([...names].sort());
  });

  test('sort by name Z-A returns reverse alphabetical order', async () => {
    await inventoryPage.sortBy(SORT_OPTIONS.nameZA);
    const names = await inventoryPage.getItemNames();
    expect(names).toEqual([...names].sort().reverse());
  });

  test('sort by price low to high returns ascending prices', async () => {
    await inventoryPage.sortBy(SORT_OPTIONS.priceLowHigh);
    const prices = await inventoryPage.getItemPrices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('sort by price high to low returns descending prices', async () => {
    await inventoryPage.sortBy(SORT_OPTIONS.priceHighLow);
    const prices = await inventoryPage.getItemPrices();
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });
});
