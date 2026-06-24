import { test } from '@playwright/test';

test('screenshot tech page mobile', async ({ browser }) => {
  const ctx = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  await page.goto('/tech/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1500);

  // Full page screenshot
  await page.screenshot({
    path: 'C:/Users/Lukey/AppData/Local/Temp/claude/d--Kevin-Nguyen-Documents-Dev-Claude/b5e5bfaf-ddda-49f3-a115-41ed7415b7b5/scratchpad/tech-mobile-full.png',
    fullPage: true,
  });

  // Above-the-fold viewport screenshot
  await page.screenshot({
    path: 'C:/Users/Lukey/AppData/Local/Temp/claude/d--Kevin-Nguyen-Documents-Dev-Claude/b5e5bfaf-ddda-49f3-a115-41ed7415b7b5/scratchpad/tech-mobile-atf.png',
    fullPage: false,
  });

  // Scroll and capture a few sections
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(500);
  await page.screenshot({
    path: 'C:/Users/Lukey/AppData/Local/Temp/claude/d--Kevin-Nguyen-Documents-Dev-Claude/b5e5bfaf-ddda-49f3-a115-41ed7415b7b5/scratchpad/tech-mobile-800.png',
  });

  await page.evaluate(() => window.scrollTo(0, 1800));
  await page.waitForTimeout(500);
  await page.screenshot({
    path: 'C:/Users/Lukey/AppData/Local/Temp/claude/d--Kevin-Nguyen-Documents-Dev-Claude/b5e5bfaf-ddda-49f3-a115-41ed7415b7b5/scratchpad/tech-mobile-1800.png',
  });

  await page.evaluate(() => window.scrollTo(0, 3000));
  await page.waitForTimeout(500);
  await page.screenshot({
    path: 'C:/Users/Lukey/AppData/Local/Temp/claude/d--Kevin-Nguyen-Documents-Dev-Claude/b5e5bfaf-ddda-49f3-a115-41ed7415b7b5/scratchpad/tech-mobile-3000.png',
  });

  await ctx.close();
});
