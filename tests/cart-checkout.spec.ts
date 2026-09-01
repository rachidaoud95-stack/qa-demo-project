import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { InventoryPage } from './pages/inventory.page';

/**
 * Parcours critique n°2 : panier → paiement.
 * C'est le parcours qui génère du revenu — une régression ici a un coût
 * mesurable immédiat, contrairement à un bug cosmétique.
 */
test.describe('Panier et paiement', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
  });

  test("ajouter deux articles met à jour le badge du panier", async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addToCartByName('Sauce Labs Backpack');
    await inventory.addToCartByName('Sauce Labs Bike Light');

    await expect(inventory.cartBadge).toHaveText('2');
  });

  test('un parcours complet de commande aboutit à la confirmation', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addToCartByName('Sauce Labs Backpack');
    await inventory.cartLink.click();

    await expect(page).toHaveURL(/cart\.html/);
    await page.locator('[data-test="checkout"]').click();

    await page.locator('#first-name').fill('Daoud');
    await page.locator('#last-name').fill('Rachid');
    await page.locator('#postal-code').fill('75012');
    await page.locator('[data-test="continue"]').click();

    await expect(page.locator('.summary_total_label')).toBeVisible();
    await page.locator('[data-test="finish"]').click();

    await expect(page.locator('.complete-header')).toHaveText(/Thank you for your order/i);
  });

  test('le paiement est bloqué si les informations de livraison sont incomplètes', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addToCartByName('Sauce Labs Backpack');
    await inventory.cartLink.click();
    await page.locator('[data-test="checkout"]').click();

    // On saute volontairement le nom pour vérifier que le formulaire ne laisse pas passer.
    await page.locator('#last-name').fill('Rachid');
    await page.locator('#postal-code').fill('75012');
    await page.locator('[data-test="continue"]').click();

    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });
});

