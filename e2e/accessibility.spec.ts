import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Helper : active le light mode via la classe CSS, puis restaure
async function withLightMode(page: import('@playwright/test').Page, fn: () => Promise<void>) {
  await page.evaluate(() => document.documentElement.classList.add('light'));
  await fn();
  await page.evaluate(() => document.documentElement.classList.remove('light'));
}

test.describe('Accessibilité E2E — Dark mode', () => {
  test('page accueil — aucune violation critique', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .exclude('[aria-hidden="true"]')
      .analyze();

    expect(results.violations.filter(v => v.impact === 'critical')).toHaveLength(0);
  });

  test('page tech — aucune violation critique', async ({ page }) => {
    await page.goto('/tech');
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .exclude('[aria-hidden="true"]')
      .analyze();

    expect(results.violations.filter(v => v.impact === 'critical')).toHaveLength(0);
  });

  test('page contact — aucune violation critique', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .exclude('[aria-hidden="true"]')
      .analyze();

    expect(results.violations.filter(v => v.impact === 'critical')).toHaveLength(0);
  });


  test('tous les liens ont un texte accessible', async ({ page }) => {
    await page.goto('/');
    const links = page.getByRole('link');
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      expect(text?.trim() || ariaLabel?.trim()).toBeTruthy();
    }
  });

  test('les images ont des alt text', async ({ page }) => {
    await page.goto('/');
    const images = page.locator('img');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).not.toBeNull();
    }
  });
});

test.describe('Accessibilité E2E — Light mode', () => {
  test('page accueil light — aucune violation critique', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await withLightMode(page, async () => {
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .exclude('[aria-hidden="true"]')
        .analyze();
      expect(results.violations.filter(v => v.impact === 'critical')).toHaveLength(0);
    });
  });

  test('page tech light — aucune violation critique', async ({ page }) => {
    await page.goto('/tech');
    await page.waitForLoadState('networkidle');
    await withLightMode(page, async () => {
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .exclude('[aria-hidden="true"]')
        .analyze();
      expect(results.violations.filter(v => v.impact === 'critical')).toHaveLength(0);
    });
  });

  test('page contact light — aucune violation critique', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');
    await withLightMode(page, async () => {
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .exclude('[aria-hidden="true"]')
        .analyze();
      expect(results.violations.filter(v => v.impact === 'critical')).toHaveLength(0);
    });
  });

  test('contraste suffisant en light mode — page accueil', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await withLightMode(page, async () => {
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2aa'])
        .withRules(['color-contrast'])
        .analyze();
      expect(results.violations).toHaveLength(0);
    });
  });

  test('contraste suffisant en light mode — page tech', async ({ page }) => {
    await page.goto('/tech');
    await page.waitForLoadState('networkidle');
    await withLightMode(page, async () => {
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2aa'])
        .withRules(['color-contrast'])
        .analyze();
      expect(results.violations).toHaveLength(0);
    });
  });
});
