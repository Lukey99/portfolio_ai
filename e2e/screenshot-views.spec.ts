import { test } from '@playwright/test';

test('screenshot why and pipeline views mobile', async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto('/tech/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1500);

  const dashY = await page.evaluate(() => {
    const el = document.getElementById('tests-dashboard');
    return el ? el.getBoundingClientRect().top + window.scrollY : 0;
  });

  // Click "Pourquoi" tab
  await page.evaluate((y) => window.scrollTo(0, y - 80), dashY);
  await page.waitForTimeout(500);
  const whyBtn = page.getByRole('button').filter({ hasText: /Pourq/i }).first();
  await whyBtn.click();
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'C:/Users/Lukey/AppData/Local/Temp/claude/d--Kevin-Nguyen-Documents-Dev-Claude/b5e5bfaf-ddda-49f3-a115-41ed7415b7b5/scratchpad/why-top.png' });
  await page.evaluate((y) => window.scrollTo(0, y + 500), dashY);
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'C:/Users/Lukey/AppData/Local/Temp/claude/d--Kevin-Nguyen-Documents-Dev-Claude/b5e5bfaf-ddda-49f3-a115-41ed7415b7b5/scratchpad/why-angles.png' });

  // Click "Pipeline" tab
  await page.evaluate((y) => window.scrollTo(0, y - 80), dashY);
  await page.waitForTimeout(300);
  const pipeBtn = page.getByRole('button').filter({ hasText: /Pipel/i }).first();
  await pipeBtn.click();
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'C:/Users/Lukey/AppData/Local/Temp/claude/d--Kevin-Nguyen-Documents-Dev-Claude/b5e5bfaf-ddda-49f3-a115-41ed7415b7b5/scratchpad/pipeline-top.png' });
  await page.evaluate((y) => window.scrollTo(0, y + 400), dashY);
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'C:/Users/Lukey/AppData/Local/Temp/claude/d--Kevin-Nguyen-Documents-Dev-Claude/b5e5bfaf-ddda-49f3-a115-41ed7415b7b5/scratchpad/pipeline-stages.png' });

  await ctx.close();
});
