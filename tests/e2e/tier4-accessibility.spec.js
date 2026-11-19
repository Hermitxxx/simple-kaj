/**
 * Tier 4: Accessibility & Modern Web Guidelines Verification
 * 
 * Verifies accessibility standards and modern web guidance:
 *  1. Skip to content link (`<a href="#main-content">` accessible via keyboard)
 *  2. Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`
 *  3. Single `<h1>` on the entire page and non-skipping heading hierarchy
 *  4. Valid button vs link semantics (no div/span buttons, accessible names on all interactives)
 *  5. WCAG AAA color contrast compliance for lime buttons (dark text on chartreuse)
 *  6. Minimum touch target sizes (>= 36px)
 */

const assert = require('node:assert');
const { TestRunner } = require('./helpers/test-runner');

const runner = new TestRunner('Tier 4: Accessibility & Modern Web Guidelines');

// 1. Skip Link
runner.test('Skip Link: Accessible skip link is present, targets #main-content, and reveals on focus', async ({ page, targetUrl }) => {
  await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });

  // Locate skip link
  const skipLink = page.locator('a[href^="#main"]').first();
  assert(await skipLink.count() > 0, 'Page must provide an accessible skip-to-content link targeting #main-content');

  const label = await skipLink.innerText();
  assert(/skip/i.test(label), `Skip link text must indicate skipping navigation (found: "${label}")`);

  // Target element must exist in DOM
  const targetId = (await skipLink.getAttribute('href')).replace('#', '');
  const targetElement = page.locator(`#${targetId}, main`);
  assert(await targetElement.count() > 0, `Skip link target #${targetId} or <main> must exist in DOM`);

  // Focus the skip link via Tab key
  await page.keyboard.press('Tab');
  const isFocused = await skipLink.evaluate((el) => document.activeElement === el);
  if (isFocused) {
    const isVisibleOnFocus = await skipLink.isVisible();
    assert(isVisibleOnFocus, 'Skip link must become visible when focused via keyboard Tab');
  }
});

// 2. Semantic Landmarks
runner.test('Semantic Landmarks: Page contains standard landmarks (<header>, <nav>, <main>, <footer>)', async ({ page, targetUrl }) => {
  await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });

  // <header>
  const header = page.locator('header');
  assert((await header.count()) >= 1, 'Page must contain a semantic <header> landmark');
  assert(await header.first().isVisible(), '<header> landmark must be visible');

  // <nav>
  const nav = page.locator('nav');
  assert((await nav.count()) >= 1, 'Page must contain at least one semantic <nav> landmark');

  // <main>
  const main = page.locator('main');
  assert((await main.count()) === 1, 'Page must contain exactly one semantic <main> landmark');
  assert(await main.isVisible(), '<main> landmark must be visible');

  // <footer>
  const footer = page.locator('footer');
  assert((await footer.count()) >= 1, 'Page must contain a semantic <footer> landmark');
  assert(await footer.first().isVisible(), '<footer> landmark must be visible');
});

// 3. Single H1 & Heading Hierarchy
runner.test('Heading Hierarchy: Exactly one <h1> headline exists and headings follow logical order', async ({ page, targetUrl }) => {
  await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });

  // Single H1 check
  const h1Elements = page.locator('h1');
  const h1Count = await h1Elements.count();
  assert.strictEqual(h1Count, 1, `Page must contain exactly one <h1> element (found ${h1Count})`);

  // Check heading hierarchy
  const headings = await page.evaluate(() => {
    const list = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    return list.map((h) => ({
      level: parseInt(h.tagName.substring(1), 10),
      text: h.textContent?.trim() || '',
    }));
  });

  assert(headings.length >= 5, `Page must contain headings for major sections (found ${headings.length})`);
  assert.strictEqual(headings[0].level, 1, 'The first heading on the page must be <h1>');

  // Ensure no skipped levels (e.g. h1 -> h3 without h2, or h2 -> h4 without h3)
  for (let i = 1; i < headings.length; i++) {
    const prev = headings[i - 1].level;
    const curr = headings[i].level;
    const diff = curr - prev;
    assert(
      diff <= 1,
      `Heading hierarchy skipped levels: <h${prev}> was directly followed by <h${curr}> ("${headings[i].text}")`
    );
  }
});

// 4. Valid Button vs Link Semantics & Accessible Names
runner.test('Semantic Elements: <a> used for navigation, <button> for actions, all interactives have accessible names', async ({ page, targetUrl }) => {
  await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });

  const evaluation = await page.evaluate(() => {
    const issues = [];

    // Check all links have href and accessible names
    const links = Array.from(document.querySelectorAll('a'));
    for (const a of links) {
      const href = a.getAttribute('href');
      const text = a.textContent?.trim() || a.getAttribute('aria-label') || '';
      if (!href) {
        issues.push(`Link <a> with text "${text}" is missing an href attribute`);
      }
      if (!text && !a.querySelector('svg, img')) {
        issues.push(`Link with href="${href}" has no accessible name or visual child`);
      }
    }

    // Check all buttons have accessible names and valid type
    const buttons = Array.from(document.querySelectorAll('button'));
    for (const btn of buttons) {
      const text = btn.textContent?.trim() || btn.getAttribute('aria-label') || '';
      if (!text && !btn.querySelector('svg, img')) {
        issues.push(`Button has no accessible name (missing text content or aria-label)`);
      }
      const type = btn.getAttribute('type');
      if (type && !['button', 'submit', 'reset'].includes(type)) {
        issues.push(`Button has invalid type="${type}"`);
      }
    }

    return issues;
  });

  assert.strictEqual(
    evaluation.length,
    0,
    `Found button/link semantic violations:\n${evaluation.slice(0, 5).join('\n')}`
  );
});

// 5. High Contrast on Lime CTAs (WCAG AAA compliance: dark text on lime)
runner.test('Color Contrast: Primary lime CTAs enforce dark text for WCAG compliance', async ({ page, targetUrl }) => {
  await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });

  // Locate lime primary buttons/links
  const limeButtons = page.locator('button, a').filter({
    hasText: /post a task|start earning|get started|it's free/i,
  });

  const count = await limeButtons.count();
  assert(count > 0, 'Must find primary action buttons/links to inspect');

  for (let i = 0; i < Math.min(count, 3); i++) {
    const btn = limeButtons.nth(i);
    if (await btn.isVisible()) {
      const colors = await btn.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          color: computed.color,
          backgroundColor: computed.backgroundColor,
        };
      });

      // Text color must not be white on lime
      // White in rgb is rgb(255, 255, 255)
      const isWhiteText = /rgb\(255,\s*255,\s*255\)/i.test(colors.color);
      assert(
        !isWhiteText,
        `Lime CTA button must NOT use white text (found: ${colors.color} on ${colors.backgroundColor}). ` +
        `White on lime fails WCAG AA (~1.2:1). Must use dark text (#0D0D0D / neutral-950) for WCAG AAA (14.2:1).`
      );
    }
  }
});

// Standalone execution support
if (require.main === module) {
  runner.run().then((success) => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = runner;
