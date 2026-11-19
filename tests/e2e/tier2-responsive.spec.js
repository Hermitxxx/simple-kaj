/**
 * Tier 2: Boundary & Responsive Viewports Verification
 * 
 * Verifies responsive layout and boundary behavior across 4 mandatory viewports:
 *  - 1440 x 900 (Desktop)
 *  - 768 x 1024 (Tablet)
 *  - 390 x 844 (Mobile)
 *  - 360 x 740 (Small Mobile per SIMPLEKAJ_PLAN.md line 97)
 * 
 * Asserts:
 *  1. No horizontal scroll overflow (`scrollWidth <= innerWidth`) across the full page height.
 *  2. Navigation adaptation: desktop links on 1440px; hamburger trigger on mobile.
 *  3. Essential landmarks remain fully visible and non-clipped.
 */

const assert = require('node:assert');
const { TestRunner, assertNoHorizontalOverflow } = require('./helpers/test-runner');

const runner = new TestRunner('Tier 2: Responsive Viewports & Boundaries');

const VIEWPORTS = [
  { name: 'Desktop (1440px)', width: 1440, height: 900, isMobile: false },
  { name: 'Tablet (768px)', width: 768, height: 1024, isMobile: false },
  { name: 'Standard Mobile (390px)', width: 390, height: 844, isMobile: true },
  { name: 'Small Mobile (360px)', width: 360, height: 740, isMobile: true },
];

for (const vp of VIEWPORTS) {
  runner.test(`Viewport ${vp.name}: No horizontal scroll overflow across entire document`, async ({ page, targetUrl }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });

    // Initial load overflow check
    await assertNoHorizontalOverflow(page, `${vp.name} - top of page`);

    // Scroll through the page in 5 increments to check lazy/layout overflow
    const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    const steps = 5;
    for (let s = 1; s <= steps; s++) {
      const scrollY = Math.round((pageHeight / steps) * s);
      await page.evaluate((y) => window.scrollTo(0, y), scrollY);
      await page.waitForTimeout(50);
      await assertNoHorizontalOverflow(page, `${vp.name} - scroll ${scrollY}px`);
    }
  });
}

runner.test('Desktop (1440px): Desktop navigation links are visible, mobile hamburger toggle is hidden', async ({ page, targetUrl }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });

  const header = page.locator('header').first();
  await header.waitFor({ state: 'visible' });

  // Desktop navigation links should be visible in navbar
  const desktopLinks = header.locator('nav a[href^="#"]');
  const count = await desktopLinks.count();
  assert(count >= 3, `Desktop view (1440px) must display inline navigation links (found ${count})`);
  assert(await desktopLinks.first().isVisible(), 'Desktop navigation links must be visible at 1440px');

  // Mobile hamburger toggle should not be visible on desktop
  const mobileMenuBtn = header.locator('button[aria-label*="menu" i], button:has(svg.lucide-menu)');
  if (await mobileMenuBtn.count() > 0) {
    const isVisible = await mobileMenuBtn.first().isVisible();
    assert(!isVisible, 'Mobile hamburger button must be hidden at desktop viewport (1440px)');
  }
});

runner.test('Mobile (390px): Mobile hamburger toggle is visible, desktop inline nav links are hidden', async ({ page, targetUrl }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });

  const header = page.locator('header').first();
  await header.waitFor({ state: 'visible' });

  // Mobile hamburger button must be visible
  const mobileMenuBtn = header.locator('button[aria-label*="menu" i], button:has(svg.lucide-menu), [data-testid="mobile-menu-trigger"]');
  assert(await mobileMenuBtn.first().isVisible(), 'Mobile hamburger button must be visible at mobile viewport (390px)');

  // Desktop inline link group should be hidden (or collapsed)
  const desktopNavList = header.locator('nav ul, nav div[class*="hidden md:"], nav div[class*="md:flex"]');
  if (await desktopNavList.count() > 0) {
    const isVisible = await desktopNavList.first().isVisible();
    assert(!isVisible, 'Desktop inline navigation links container must be hidden at mobile viewport (390px)');
  }
});

runner.test('Small Mobile (360px - SIMPLEKAJ_PLAN line 97): Core layout elements remain readable without clipping', async ({ page, targetUrl }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });

  // Verify H1 is fully visible and not overflowed
  const h1 = page.getByRole('heading', { level: 1 });
  assert(await h1.isVisible(), 'H1 must be visible on 360px small mobile');

  const h1Box = await h1.boundingBox();
  assert(h1Box && h1Box.width <= 360, `H1 bounding width (${h1Box?.width}px) must fit within 360px viewport`);

  // Verify primary CTA button is visible and tap-friendly
  const primaryCta = page.getByRole('link', { name: /post a task/i }).or(page.getByRole('button', { name: /post a task/i })).first();
  assert(await primaryCta.isVisible(), 'Primary CTA must be visible on 360px viewport');

  const ctaBox = await primaryCta.boundingBox();
  assert(ctaBox && ctaBox.height >= 36, `Primary CTA touch target height (${ctaBox?.height}px) must be accessible on mobile`);

  // Final check: zero horizontal overflow
  await assertNoHorizontalOverflow(page, 'Small mobile 360px');
});

// Standalone execution support
if (require.main === module) {
  runner.run().then((success) => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = runner;
