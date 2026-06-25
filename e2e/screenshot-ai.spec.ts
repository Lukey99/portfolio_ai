import { test } from '@playwright/test';

const SCRATCHPAD = 'C:/Users/Lukey/AppData/Local/Temp/claude/d--Kevin-Nguyen-Documents-Dev-Claude/b5e5bfaf-ddda-49f3-a115-41ed7415b7b5/scratchpad';

test('screenshot ai workflow section', async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto('/tech/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1500);

  const secY = await page.evaluate(() => {
    const el = document.getElementById('ai-workflow');
    return el ? el.getBoundingClientRect().top + window.scrollY : 0;
  });

  await page.evaluate((y) => window.scrollTo(0, y - 80), secY);
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${SCRATCHPAD}/ai-top.png` });

  await page.evaluate((y) => window.scrollTo(0, y + 350), secY);
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${SCRATCHPAD}/ai-cards.png` });

  await ctx.close();
});
