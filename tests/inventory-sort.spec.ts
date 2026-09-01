import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { InventoryPage } from './pages/inventory.page';

/**
 * Parcours critique n°3 : le tri du catalogue.
 * Un bug de tri silencieux (ex: prix mal ordonnés) ne casse rien
 * visuellement — c'est exactement le genre de régression qu'un humain
 * ne remarque plus après la 50e vérification manuelle, et qu'un test
 * automatisé attrape systématiquement.
 */
test.describe('Tri du catalogue', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
  });

  test('le tri prix croissant ordonne réellement les prix', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.sortBy('lohi');

    const prices = await inventory.getPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('le tri prix décroissant ordonne réellement les prix', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.sortBy('hilo');

    const prices = await inventory.getPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });
});
