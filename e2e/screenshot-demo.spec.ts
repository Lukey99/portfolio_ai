import { test } from '@playwright/test';

const SCRATCHPAD = 'C:/Users/Lukey/AppData/Local/Temp/claude/d--Kevin-Nguyen-Documents-Dev-Claude/b5e5bfaf-ddda-49f3-a115-41ed7415b7b5/scratchpad';

test('screenshot explode demo mobile', async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto('/tech/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1500);

  const demoY = await page.evaluate(() => {
    const el = document.querySelector('.arch-demo');
    return el ? el.getBoundingClientRect().top + window.scrollY : 0;
  });

  // Scroll to visual panel
  await page.evaluate((y) => window.scrollTo(0, y - 80), demoY);
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${SCRATCHPAD}/demo-visual.png` });

  // Scroll to info+stepper panel
  await page.evaluate((y) => window.scrollTo(0, y + 280), demoY);
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${SCRATCHPAD}/demo-stepper.png` });

  await ctx.close();
});
