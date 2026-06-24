import { test } from '@playwright/test';

test('screenshot tests-dashboard section mobile', async ({ browser }) => {
  const ctx = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  await page.goto('/tech/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1500);

  // Find the dashboard section and scroll to it
  const dashY = await page.evaluate(() => {
    const el = document.getElementById('tests-dashboard');
    return el ? el.getBoundingClientRect().top + window.scrollY : -1;
  });

  // Capture tab bar + global view
  await page.evaluate((y) => window.scrollTo(0, y - 80), dashY);
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'C:/Users/Lukey/AppData/Local/Temp/claude/d--Kevin-Nguyen-Documents-Dev-Claude/b5e5bfaf-ddda-49f3-a115-41ed7415b7b5/scratchpad/dash-top.png' });

  await page.evaluate((y) => window.scrollTo(0, y + 400), dashY);
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'C:/Users/Lukey/AppData/Local/Temp/claude/d--Kevin-Nguyen-Documents-Dev-Claude/b5e5bfaf-ddda-49f3-a115-41ed7415b7b5/scratchpad/dash-mid.png' });

  await page.evaluate((y) => window.scrollTo(0, y + 900), dashY);
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'C:/Users/Lukey/AppData/Local/Temp/claude/d--Kevin-Nguyen-Documents-Dev-Claude/b5e5bfaf-ddda-49f3-a115-41ed7415b7b5/scratchpad/dash-bottom.png' });

  // Click Score tab and capture
  await page.evaluate((y) => window.scrollTo(0, y - 80), dashY);
  await page.waitForTimeout(500);
  await page.getByRole('button', { name: /Score/i }).first().click();
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'C:/Users/Lukey/AppData/Local/Temp/claude/d--Kevin-Nguyen-Documents-Dev-Claude/b5e5bfaf-ddda-49f3-a115-41ed7415b7b5/scratchpad/dash-score-top.png' });

  await page.evaluate((y) => window.scrollTo(0, y + 500), dashY);
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'C:/Users/Lukey/AppData/Local/Temp/claude/d--Kevin-Nguyen-Documents-Dev-Claude/b5e5bfaf-ddda-49f3-a115-41ed7415b7b5/scratchpad/dash-score-mid.png' });

  await ctx.close();
});
