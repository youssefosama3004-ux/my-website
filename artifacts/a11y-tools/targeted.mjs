import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { writeFile } from 'node:fs/promises';

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const results = [];
const targets = [
  ['/work/koolen', 'desktop'],
  ['/work/koolen', 'mobile'],
  ['/work/horizon-app', 'desktop'],
  ['/', 'desktop'],
];

for (const theme of ['light', 'dark']) {
  for (const [route, device] of targets) {
    const context = await browser.newContext({
      viewport: device === 'mobile' ? { width: 390, height: 844 } : { width: 1440, height: 1000 },
      colorScheme: theme,
    });
    const page = await context.newPage();
    const entry = { route, theme, device };
    try {
      await page.goto(`http://localhost:4321${route}`, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(500);
      const scan = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa', 'best-practice'])
        .analyze();
      entry.violations = scan.violations;
      entry.incomplete = scan.incomplete;
      console.log(theme, device, route, scan.violations.map((v) => `${v.id}:${v.nodes.length}`).join(',') || 'PASS');
    } catch (error) {
      entry.error = String(error);
      console.log(theme, device, route, 'ERROR', String(error));
    }
    results.push(entry);
    await writeFile('artifacts/a11y-tools/targeted.json', JSON.stringify(results, null, 2));
    await context.close();
  }
}

for (const theme of ['light', 'dark']) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, colorScheme: theme });
  const page = await context.newPage();
  const entry = { route: '/', theme, device: 'desktop', state: 'menu-keyboard' };
  try {
    await page.goto('http://localhost:4321/', { waitUntil: 'networkidle', timeout: 30000 });
    const toggle = page.getByRole('button', { name: 'Toggle menu', exact: true });
    await toggle.click();
    await page.waitForTimeout(400);
    entry.focus = [];
    for (let i = 0; i < 16; i += 1) {
      await page.keyboard.press('Tab');
      entry.focus.push(await page.evaluate(() => ({
        tag: document.activeElement?.tagName,
        name: (document.activeElement?.getAttribute('aria-label') || document.activeElement?.textContent || '').trim().slice(0, 60),
        inMenu: Boolean(document.activeElement?.closest('.staggered-menu-panel')),
      })));
    }
    await page.keyboard.press('Escape');
    entry.expandedAfterEscape = await toggle.getAttribute('aria-expanded');
  } catch (error) {
    entry.error = String(error);
  }
  results.push(entry);
  await writeFile('artifacts/a11y-tools/targeted.json', JSON.stringify(results, null, 2));
  await context.close();
}

await browser.close();
