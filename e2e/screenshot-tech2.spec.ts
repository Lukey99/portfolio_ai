import { test } from '@playwright/test';

test('screenshot tech page mobile deeper', async ({ browser }) => {
  const ctx = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  await page.goto('/tech/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1500);

  const scrollPoints = [4500, 6000, 7500, 9000, 11000, 13000];
  for (const y of scrollPoints) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(600);
    await page.screenshot({
      path: `C:/Users/Lukey/AppData/Local/Temp/claude/d--Kevin-Nguyen-Documents-Dev-Claude/b5e5bfaf-ddda-49f3-a115-41ed7415b7b5/scratchpad/tech-mobile-${y}.png`,
    });
  }

  await ctx.close();
});
