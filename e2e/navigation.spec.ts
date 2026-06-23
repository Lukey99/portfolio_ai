import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('le header est visible dès le chargement', async ({ page }) => {
    await expect(page.locator('header')).toBeVisible();
  });

  test('le logo est présent et pointe vers /', async ({ page }) => {
    const logo = page.getByRole('link', { name: /KN/i }).first();
    await expect(logo).toHaveAttribute('href', '/');
  });

  test('la section Expériences existe sur la page', async ({ page }) => {
    await expect(page.locator('#experience')).toBeAttached();
  });

  test('scroller vers la section Expériences la met en vue', async ({ page }) => {
    await page.locator('#experience').scrollIntoViewIfNeeded();
    await expect(page.locator('#experience')).toBeInViewport({ ratio: 0.2 });
  });

  test('la page contact a un lien mailto valide', async ({ page }) => {
    await page.goto('/contact/');
    const emailBtn = page.getByRole('link', { name: 'Envoyer un email' });
    await expect(emailBtn).toHaveAttribute('href', /^mailto:/);
  });

  test('le CTA "Me contacter" dans le header pointe vers /contact/', async ({ page }) => {
    const cta = page.getByRole('link', { name: 'Me contacter' }).first();
    await expect(cta).toHaveAttribute('href', '/contact/');
  });
});
