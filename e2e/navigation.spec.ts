import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('le header est visible dès le chargement', async ({ page }) => {
    await expect(page.locator('header')).toBeVisible();
  });

  test('le logo est présent et pointe vers #home', async ({ page }) => {
    const logo = page.getByRole('link', { name: /KN/i }).first();
    await expect(logo).toHaveAttribute('href', '#home');
  });

  test('le lien Expériences pointe vers #experience', async ({ page }) => {
    const link = page.getByRole('link', { name: 'Expériences' }).first();
    await expect(link).toHaveAttribute('href', '#experience');
  });

  test('cliquer sur Expériences scroll vers la section', async ({ page }) => {
    await page.getByRole('link', { name: 'Expériences' }).first().click();
    await expect(page.locator('#experience')).toBeInViewport({ ratio: 0.2 });
  });

  test('la section Contact a un lien mailto valide', async ({ page }) => {
    await page.evaluate(() => document.getElementById('contact')?.scrollIntoView());
    const emailBtn = page.getByRole('link', { name: 'Envoyer un email' });
    await expect(emailBtn).toHaveAttribute('href', /^mailto:/);
  });

  test('le CTA "Me contacter" dans le header pointe vers #contact', async ({ page }) => {
    const cta = page.getByRole('link', { name: 'Me contacter' }).first();
    await expect(cta).toHaveAttribute('href', '#contact');
  });
});
