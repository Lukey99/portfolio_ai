import { test, expect } from '@playwright/test';

test.describe('Thème dark/light', () => {
  test.beforeEach(async ({ page }) => {
    // Partir en mode sombre propre
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.removeItem('theme');
      document.documentElement.classList.remove('light');
    });
  });

  test('la page charge en mode sombre par défaut', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).not.toHaveClass(/light/);
  });

  test('le toggle passe en mode clair', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /passer en mode clair/i }).click();
    await expect(page.locator('html')).toHaveClass(/light/);
  });

  test('le toggle repasse en mode sombre', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /passer en mode clair/i }).click();
    await page.getByRole('button', { name: /passer en mode sombre/i }).click();
    await expect(page.locator('html')).not.toHaveClass(/light/);
  });

  test('le thème persiste après rechargement de page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /passer en mode clair/i }).click();
    await expect(page.locator('html')).toHaveClass(/light/);

    await page.reload();
    // L'anti-flash script doit restaurer le mode clair avant hydratation
    await expect(page.locator('html')).toHaveClass(/light/);
  });

  test('localStorage contient le bon thème après toggle', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /passer en mode clair/i }).click();

    const stored = await page.evaluate(() => localStorage.getItem('theme'));
    expect(stored).toBe('light');
  });
});
