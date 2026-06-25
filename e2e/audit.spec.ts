/**
 * Full readiness audit — pages, content, console JS errors, navigation, API.
 * "Failed to load resource" 404s are basePath artefacts in dev mode (assets are
 * prefixed /portfolio_ai/ but dev server serves from /) — filtered out below.
 */
import { test, expect, Page } from '@playwright/test';
import { join } from 'path';
import { tmpdir } from 'os';
import { mkdirSync } from 'fs';

const SC = join(tmpdir(), 'portfolio-audit');
mkdirSync(SC, { recursive: true });

const PLACEHOLDERS = [
  'lorem ipsum', 'kevin@example.com', 'github.com/kevin-nguyen',
  '[object Object]', 'NaN', 'FIXME', 'TODO', 'your name', 'votre nom',
];

function collectJsErrors(page: Page): string[] {
  const errs: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error' && !msg.text().includes('Failed to load resource'))
      errs.push(msg.text());
  });
  page.on('pageerror', err => errs.push('JS: ' + err.message));
  return errs;
}

// ── Desktop screenshots + content ─────────────────────────────
test('desktop — home', async ({ page }) => {
  const errs = collectJsErrors(page);
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${SC}/audit-desktop-home.png`, fullPage: true });
  const text = await page.locator('body').innerText();
  const hits = PLACEHOLDERS.filter(p =>
    p === 'NaN' ? text.includes('NaN') : text.toLowerCase().includes(p.toLowerCase())
  );
  expect(hits, `Placeholder text found: ${hits.join(', ')}`).toHaveLength(0);
  expect(errs, `JS errors: ${errs.join(' | ')}`).toHaveLength(0);
});

test('desktop — tech', async ({ page }) => {
  const errs = collectJsErrors(page);
  await page.goto('/tech/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${SC}/audit-desktop-tech.png`, fullPage: true });
  const text = await page.locator('body').innerText();
  const hits = PLACEHOLDERS.filter(p =>
    p === 'NaN' ? text.includes('NaN') : text.toLowerCase().includes(p.toLowerCase())
  );
  expect(hits, `Placeholder text found: ${hits.join(', ')}`).toHaveLength(0);
  expect(errs, `JS errors: ${errs.join(' | ')}`).toHaveLength(0);
});

test('desktop — contact', async ({ page }) => {
  const errs = collectJsErrors(page);
  await page.goto('/contact/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${SC}/audit-desktop-contact.png`, fullPage: true });
  const text = await page.locator('body').innerText();
  const hits = PLACEHOLDERS.filter(p =>
    p === 'NaN' ? text.includes('NaN') : text.toLowerCase().includes(p.toLowerCase())
  );
  expect(hits, `Placeholder text found: ${hits.join(', ')}`).toHaveLength(0);
  expect(errs, `JS errors: ${errs.join(' | ')}`).toHaveLength(0);
});

// ── Mobile screenshots ─────────────────────────────────────────
test('mobile — home', async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  const errs = collectJsErrors(page);
  await page.goto('http://localhost:3000/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${SC}/audit-mobile-home.png`, fullPage: true });
  expect(errs, `JS errors: ${errs.join(' | ')}`).toHaveLength(0);
  await ctx.close();
});

test('mobile — tech', async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  const errs = collectJsErrors(page);
  await page.goto('http://localhost:3000/tech/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${SC}/audit-mobile-tech.png`, fullPage: true });
  expect(errs, `JS errors: ${errs.join(' | ')}`).toHaveLength(0);
  await ctx.close();
});

test('mobile — contact', async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  const errs = collectJsErrors(page);
  await page.goto('http://localhost:3000/contact/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${SC}/audit-mobile-contact.png`, fullPage: true });
  expect(errs, `JS errors: ${errs.join(' | ')}`).toHaveLength(0);
  await ctx.close();
});

// ── Navigation ─────────────────────────────────────────────────
test('navigation — header links work', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  // Next.js App Router navigates client-side (no network requests), so we wait for URL change
  await page.locator('nav a[href*="/tech"]').first().click();
  await page.waitForURL('**/tech/**', { timeout: 8000 });
  expect(page.url()).toContain('tech');

  await page.locator('nav a[href*="/contact"]').first().click();
  await page.waitForURL('**/contact/**', { timeout: 8000 });
  expect(page.url()).toContain('contact');
});

// ── Theme toggle ───────────────────────────────────────────────
test('theme toggle works', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(500);
  const html = page.locator('html');
  const before = await html.getAttribute('class');
  await page.click('[aria-label*="theme"], [aria-label*="thème"], [aria-label*="light"], [aria-label*="dark"], [aria-label*="clair"], [aria-label*="sombre"]');
  await page.waitForTimeout(400);
  const after = await html.getAttribute('class');
  expect(before).not.toBe(after);
});

// ── Lang toggle ────────────────────────────────────────────────
test('EN/FR toggle works', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(500);
  const before = await page.locator('h1, h2').first().innerText();
  await page.click('button:has-text("EN"), button:has-text("FR")');
  await page.waitForTimeout(500);
  const after = await page.locator('h1, h2').first().innerText();
  expect(before).not.toBe(after);
});

// ── API ────────────────────────────────────────────────────────
test('API routes return valid JSON', async ({ request }) => {
  const routes = ['/all', '/experiences', '/skills', '/education', '/projects'];
  for (const r of routes) {
    const res = await request.get(`http://localhost:3000/api/portfolio${r}`, { maxRedirects: 5 });
    expect(res.status(), r).toBe(200);
    const body = await res.json();
    expect(body).toBeTruthy();
  }
});
