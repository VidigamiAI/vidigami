import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Scans every page passed in A11Y_PATHS (comma-separated), or the gallery by default.
// Example: A11Y_PATHS=/p/EXAMPLE-photo-consent-states npx playwright test
const paths = (process.env.A11Y_PATHS || '/,/tokens').split(',');

for (const path of paths) {
  test(`axe WCAG 2.2 AA: ${path}`, async ({ page }, testInfo) => {
    await page.goto(path);
    await page.screenshot({ path: testInfo.outputPath('page.png'), fullPage: true });
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    const summary = results.violations.map(
      (v) => `${v.impact}: ${v.id} — ${v.help} (${v.nodes.length} element(s))`,
    );
    expect(summary, summary.join('\n')).toEqual([]);
  });
}
