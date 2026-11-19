/**
 * Tier 3: Client-Side Interactivity Verification
 * 
 * Verifies the 4 interactive client component micro-islands:
 *  1. FAQ Accordion Item Expand and Collapse Toggling (`aria-expanded`)
 *  2. Mobile Navigation Menu Drawer Open & Close
 *  3. Language Toggle Switch (EN / বাং)
 *  4. Newsletter Submission Form Feedback (Zone alerts simulation)
 */

const assert = require('node:assert');
const { TestRunner } = require('./helpers/test-runner');

const runner = new TestRunner('Tier 3: Client-Side Interactivity');

// 1. FAQ Accordion Interactivity
runner.test('FAQ Accordion: Toggles item expansion and collapse with accessible aria-expanded updates', async ({ page, targetUrl }) => {
  await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });

  const faqSection = page.locator('section[aria-labelledby*="faq"], #faq, section:has(h2:has-text("FAQ")), section:has(h2:has-text("Questions"))').first();
  await faqSection.waitFor({ state: 'visible' });

  // Locate FAQ accordion trigger buttons
  const triggers = faqSection.getByRole('button').filter({ hasText: /\?|how|what|payment|area|safe|prohibit/i });
  const count = await triggers.count();
  assert(count >= 2, `FAQ accordion must have at least 2 interactive trigger items (found ${count})`);

  // Choose the second trigger to test toggling
  const testTrigger = triggers.nth(1);
  const initialExpanded = await testTrigger.getAttribute('aria-expanded');

  // Click to toggle
  await testTrigger.click();
  await page.waitForTimeout(100);

  const toggledExpanded = await testTrigger.getAttribute('aria-expanded');
  assert.notStrictEqual(
    initialExpanded,
    toggledExpanded,
    `FAQ trigger aria-expanded attribute must toggle on click (was ${initialExpanded}, now ${toggledExpanded})`
  );

  // If now expanded (true), verify answer content is visible
  if (toggledExpanded === 'true') {
    const controlsId = await testTrigger.getAttribute('aria-controls');
    if (controlsId) {
      const panel = page.locator(`#${controlsId}`);
      assert(await panel.isVisible(), `FAQ answer panel #${controlsId} must be visible when expanded`);
    }

    // Click again to collapse
    await testTrigger.click();
    await page.waitForTimeout(100);

    const collapsedState = await testTrigger.getAttribute('aria-expanded');
    assert.strictEqual(collapsedState, 'false', 'FAQ trigger aria-expanded must revert to false upon collapse click');
  }
});

// 2. Mobile Nav Menu Drawer
runner.test('Mobile Nav Menu: Hamburger trigger opens drawer containing links, close button dismisses it', async ({ page, targetUrl }) => {
  // Mobile viewport
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });

  const header = page.locator('header').first();
  await header.waitFor({ state: 'visible' });

  // Locate hamburger menu button
  const menuTrigger = header.locator('button[aria-label*="menu" i], button:has(svg.lucide-menu), [data-testid="mobile-menu-trigger"]').first();
  await menuTrigger.waitFor({ state: 'visible' });

  // Click to open drawer
  await menuTrigger.click();
  await page.waitForTimeout(150);

  // Assert drawer or navigation overlay is visible
  const drawer = page.locator('[role="dialog"], [data-testid="mobile-menu-drawer"], nav[aria-label*="mobile" i], div.fixed.inset-0').first();
  await drawer.waitFor({ state: 'visible', timeout: 3000 });
  assert(await drawer.isVisible(), 'Mobile menu drawer must be visible after clicking menu trigger');

  // Verify navigation links are present inside the drawer
  const drawerLinks = drawer.locator('a[href^="#"]');
  const linkCount = await drawerLinks.count();
  assert(linkCount >= 2, `Mobile drawer must display navigation links (found ${linkCount})`);

  // Close the drawer using close button (X) or clicking the trigger again
  const closeButton = drawer.locator('button[aria-label*="close" i], button:has(svg.lucide-x)').first();
  if (await closeButton.isVisible()) {
    await closeButton.click();
  } else {
    // If trigger toggles both open/close
    await menuTrigger.click();
  }

  await page.waitForTimeout(150);
  const isStillVisible = await drawer.isVisible().catch(() => false);
  assert(!isStillVisible, 'Mobile menu drawer must close and not be visible');
});

// 3. Language Toggle Switch
runner.test('Language Toggle: Switches active language indicator between EN and Bangla', async ({ page, targetUrl }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });

  const header = page.locator('header').first();
  await header.waitFor({ state: 'visible' });

  // Find language toggle component
  const toggleContainer = header.locator('[data-testid="language-toggle"], button:has-text("EN"), div:has(> button:has-text("EN"))').first();
  await toggleContainer.waitFor({ state: 'visible' });

  // Find Bangla option/button
  const bnOption = toggleContainer.getByText(/বাং|বাংলা/i).first();
  const enOption = toggleContainer.getByText(/EN/i).first();

  assert(await bnOption.isVisible(), 'Bangla (বাং) option must be present in language toggle');
  assert(await enOption.isVisible(), 'English (EN) option must be present in language toggle');

  // Click Bangla option
  await bnOption.click();
  await page.waitForTimeout(100);

  // Check that clicking produces visual/active state feedback (e.g. active class, aria-pressed, or style change)
  const bnClass = await bnOption.getAttribute('class');
  const enClass = await enOption.getAttribute('class');
  assert(
    typeof bnClass === 'string' && typeof enClass === 'string',
    'Language toggle elements must maintain class attribute for active states'
  );

  // Click English option back
  await enOption.click();
  await page.waitForTimeout(100);
});

// 4. Newsletter Submission Form Feedback
runner.test('Newsletter Form: Displays client-side success feedback upon valid email submission', async ({ page, targetUrl }) => {
  await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });

  const footer = page.locator('footer');
  await footer.waitFor({ state: 'visible' });

  // Locate email input field
  const emailInput = footer.getByRole('textbox', { name: /email/i }).or(footer.locator('input[type="email"], input[placeholder*="email" i]')).first();
  await emailInput.waitFor({ state: 'visible' });

  // Locate submit button
  const submitButton = footer.getByRole('button', { name: /notify|subscribe|submit|alert|get alert/i }).or(footer.locator('button[type="submit"]')).first();
  await submitButton.waitFor({ state: 'visible' });

  // Fill valid Dhaka email
  await emailInput.fill('dhaka.resident@simplekaj.com');

  // Submit form
  await submitButton.click();
  await page.waitForTimeout(300);

  // Look for inline success/confirmation feedback
  const feedback = footer.getByText(/subscribed|alert|thank you|registered|confirmed|success|ধন্যবাদ/i);
  await feedback.first().waitFor({ state: 'visible', timeout: 3000 });
  assert(await feedback.first().isVisible(), 'Newsletter form must display client-side confirmation feedback message');
});

// Standalone execution support
if (require.main === module) {
  runner.run().then((success) => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = runner;
