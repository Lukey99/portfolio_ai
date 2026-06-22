import { test, expect } from '@playwright/test';

test.describe('Performance E2E', () => {
  test('page accueil — TTFB < 500ms', async ({ page }) => {
    const start = Date.now();
    await page.goto('/');
    const ttfb = Date.now() - start;
    expect(ttfb).toBeLessThan(500);
  });

  test('page accueil — chargée en < 3s', async ({ page }) => {
    const t0 = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(Date.now() - t0).toBeLessThan(3000);
  });

  test('navigation vers /tech < 2s', async ({ page }) => {
    await page.goto('/');
    const t0 = Date.now();
    await page.goto('/tech');
    await page.waitForLoadState('networkidle');
    expect(Date.now() - t0).toBeLessThan(2000);
  });

  test('API /api/portfolio répond < 200ms', async ({ request }) => {
    const t0 = Date.now();
    const res = await request.get('/api/portfolio');
    const ms = Date.now() - t0;
    expect(res.status()).toBe(200);
    expect(ms).toBeLessThan(200);
  });

  test('API /api/portfolio/experiences répond < 100ms', async ({ request }) => {
    const t0 = Date.now();
    const res = await request.get('/api/portfolio/experiences');
    const ms = Date.now() - t0;
    expect(res.status()).toBe(200);
    expect(ms).toBeLessThan(100);
  });

  test('Web Vitals — LCP < 2.5s', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const lcp = await page.evaluate(() =>
      new Promise<number>((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          resolve(entries[entries.length - 1].startTime);
        }).observe({ type: 'largest-contentful-paint', buffered: true });
        // fallback si aucun LCP
        setTimeout(() => resolve(0), 2000);
      })
    );

    if (lcp > 0) expect(lcp).toBeLessThan(2500);
  });

  test('pas de layout shift majeur (CLS < 0.1)', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const cls = await page.evaluate(() =>
      new Promise<number>((resolve) => {
        let total = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as unknown as { hadRecentInput: boolean }).hadRecentInput) {
              total += (entry as unknown as { value: number }).value;
            }
          }
        }).observe({ type: 'layout-shift', buffered: true });
        setTimeout(() => resolve(total), 1500);
      })
    );

    expect(cls).toBeLessThan(0.1);
  });
});
