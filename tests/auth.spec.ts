import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';

/**
 * Parcours critique n°1 : l'authentification.
 * C'est le premier point de friction pour 100% des utilisateurs —
 * une régression ici bloque tout le monde, pas un sous-ensemble de clients.
 */
test.describe('Authentification', () => {
  test('un utilisateur valide accède au catalogue', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('un mot de passe incorrect est rejeté avec un message clair', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'mot_de_passe_invalide');

    await expect(login.errorMessage).toBeVisible();
    await expect(login.errorMessage).toContainText('do not match');
    await expect(page).toHaveURL(/127\.0\.0\.1:4321\/?$/);
  });

  test('un compte bloqué ne peut pas se connecter', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('locked_out_user', 'secret_sauce');

    await expect(login.errorMessage).toBeVisible();
    await expect(login.errorMessage).toContainText('locked out');
  });
});
