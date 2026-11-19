/**
 * SimpleKaj E2E Test Suite: Reduced-Motion Accessibility & SSR Hydration Integrity
 * 
 * Executable via:
 *   node .agents/skills/playwright-skill/run.js tests/e2e/reduced-motion.spec.js
 */

const { chromium } = require('playwright');
const assert = require('node:assert');

const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const GRAY = '\x1b[90m';

async function runReducedMotionSuite() {
  const targetUrl = process.env.TARGET_URL || 'http://localhost:3000';
  console.log(`\n${BOLD}${CYAN}======================================================================${RESET}`);
  console.log(`${BOLD}${CYAN}   SimpleKaj Reduced-Motion & SSR Hydration Integrity Test Suite     ${RESET}`);
  console.log(`${BOLD}${CYAN}======================================================================${RESET}`);
  console.log(`${GRAY}Target Base URL: ${targetUrl}${RESET}`);
  console.log(`${GRAY}Emulating media: prefers-reduced-motion: reduce${RESET}\n`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  });

  const page = await context.newPage();

  const consoleErrors = [];
  const consoleWarnings = [];
  page.on('console', (msg) => {
    const text = msg.text();
    if (msg.type() === 'error' || text.toLowerCase().includes('hydration') || text.includes("didn't match")) {
      consoleErrors.push(text);
    } else if (msg.type() === 'warning') {
      consoleWarnings.push(text);
    }
  });

  let passedTests = 0;
  let failedTests = 0;

  async function test(name, fn) {
    process.stdout.write(`  [${passedTests + failedTests + 1}] ${name} ... `);
    const start = Date.now();
    try {
      await fn();
      const elapsed = Date.now() - start;
      console.log(`${GREEN}PASSED${RESET} ${GRAY}(${elapsed}ms)${RESET}`);
      passedTests++;
    } catch (err) {
      const elapsed = Date.now() - start;
      console.log(`${RED}FAILED${RESET} ${GRAY}(${elapsed}ms)${RESET}`);
      console.error(`      ${RED}Error: ${err.message}${RESET}`);
      failedTests++;
    }
  }

  try {
    // Navigate with reducedMotion: reduce
    await page.goto(targetUrl, { waitUntil: 'networkidle' });

    // Test 1: Zero hydration errors in console
    await test('Zero React hydration mismatch errors in browser console', async () => {
      const hydrationErrors = consoleErrors.filter(
        (e) => e.toLowerCase().includes('hydration') || e.includes("didn't match")
      );
      assert.strictEqual(
        hydrationErrors.length,
        0,
        `Expected 0 React hydration mismatch errors, found ${hydrationErrors.length}:\n${hydrationErrors.join('\n')}`
      );
    });

    // Helper to check computed opacity and transform
    const checkElementVisibility = async (locator, name) => {
      const count = await locator.count();
      assert(count > 0, `Locator for ${name} must match at least 1 element (found 0)`);
      for (let i = 0; i < count; i++) {
        const item = locator.nth(i);
        const { opacity, transform, isStuckInvisible } = await item.evaluate((el) => {
          const style = window.getComputedStyle(el);
          let cur = el;
          let isStuck = false;
          while (cur && cur !== document.body) {
            const curStyle = window.getComputedStyle(cur);
            if (curStyle.opacity === '0' || curStyle.visibility === 'hidden') {
              isStuck = true;
              break;
            }
            cur = cur.parentElement;
          }
          return {
            opacity: style.opacity,
            transform: style.transform,
            isStuckInvisible: isStuck,
          };
        });

        assert.strictEqual(
          isStuckInvisible,
          false,
          `${name} [item ${i + 1}/${count}] must not be stuck in an invisible ancestor (opacity: 0)`
        );
        assert(
          parseFloat(opacity) > 0.9,
          `${name} [item ${i + 1}/${count}] computed opacity must be ~1, received: ${opacity}`
        );
        assert(
          transform === 'none' || transform === 'matrix(1, 0, 0, 1, 0, 0)',
          `${name} [item ${i + 1}/${count}] computed transform must be 'none', received: ${transform}`
        );
      }
    };

    // Test 2: Hero headline visibility
    await test('Hero <h1> headline has computed opacity: 1 and transform: none', async () => {
      const heading = page.locator('h1#hero-title');
      await checkElementVisibility(heading, 'Hero <h1> headline');
    });

    // Test 3: How It Works cards visibility
    await test('How It Works: All 3 value proposition cards have computed opacity: 1 and transform: none', async () => {
      const cards = page.locator('#how-it-works [data-testid="value-prop-card"]');
      const count = await cards.count();
      assert.strictEqual(count, 3, `Expected 3 value proposition cards, found ${count}`);
      await checkElementVisibility(cards, 'How It Works card');
    });

    // Test 4: Outsourceable Errands showcase cards visibility
    await test('Feature Showcase: All 5 outsourceable errand cards have computed opacity: 1 and transform: none', async () => {
      const cards = page.locator('#errands article');
      const count = await cards.count();
      assert.strictEqual(count, 5, `Expected 5 errand cards, found ${count}`);
      await checkElementVisibility(cards, 'Outsourceable Errand card');
    });

    // Test 5: Pricing tier cards visibility
    await test('Pricing: All 3 commission tier cards have computed opacity: 1 and transform: none', async () => {
      const cards = page.locator('#pricing [data-testid="pricing-card"]');
      const count = await cards.count();
      assert.strictEqual(count, 3, `Expected 3 pricing cards, found ${count}`);
      await checkElementVisibility(cards, 'Pricing tier card');
    });

    // Test 6: Community helper cards visibility
    await test('Community: All 6 helper portrait cards have computed opacity: 1 and transform: none', async () => {
      const cards = page.locator('#helpers [data-testid="helper-card"]');
      const count = await cards.count();
      assert.strictEqual(count, 6, `Expected 6 helper cards, found ${count}`);
      await checkElementVisibility(cards, 'Community helper card');
    });

    // Test 7: Testimonial cards visibility
    await test('Testimonials: All 3 quote cards have computed opacity: 1 and transform: none', async () => {
      const cards = page.locator('#testimonials [data-testid="testimonial-card"]');
      const count = await cards.count();
      assert.strictEqual(count, 3, `Expected 3 testimonial cards, found ${count}`);
      await checkElementVisibility(cards, 'Testimonial card');
    });

    // Test 8: Global check - zero content elements stuck at opacity: 0 across entire DOM
    await test('No content elements across sections are orphaned with inline opacity: 0', async () => {
      const stuckElements = await page.evaluate(() => {
        const sections = ['#hero', '#how-it-works', '#errands', '#pricing', '#helpers', '#testimonials'];
        const bad = [];
        for (const secId of sections) {
          const sec = document.querySelector(secId) || document.querySelector(`section[aria-labelledby*="${secId.replace('#', '')}"]`);
          if (!sec) continue;
          const allDescendants = sec.querySelectorAll('*');
          for (const el of allDescendants) {
            // Ignore genuinely hidden utility elements
            if (el.classList.contains('sr-only')) continue;
            const cs = window.getComputedStyle(el);
            if (cs.opacity === '0' && cs.display !== 'none' && !el.getAttribute('aria-hidden')) {
              bad.push({
                tag: el.tagName,
                className: el.className,
                text: el.textContent?.slice(0, 30),
              });
            }
          }
        }
        return bad;
      });

      assert.strictEqual(
        stuckElements.length,
        0,
        `Expected 0 stuck invisible elements across main sections, found ${stuckElements.length}: ${JSON.stringify(stuckElements.slice(0, 5))}`
      );
    });

    // Test 9: Client interactivity under reduced motion
    await test('FAQ Accordion toggles smoothly under reduced-motion without errors', async () => {
      const secondItemTrigger = page.locator('button#faq-trigger-faq-payment');
      await secondItemTrigger.scrollIntoViewIfNeeded();
      await secondItemTrigger.click();
      await page.waitForTimeout(100);
      const isExpanded = await secondItemTrigger.getAttribute('aria-expanded');
      assert.strictEqual(isExpanded, 'true', 'Second FAQ item must be expanded after click');
      const answer = page.locator('#faq-content-faq-payment');
      assert(await answer.isVisible(), 'Expanded FAQ answer must be visible');
    });

    // Test 10: Dynamic media toggle (switching emulation on the fly)
    await test('Dynamic media emulation toggle does not crash or leave broken states', async () => {
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await page.waitForTimeout(200);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.waitForTimeout(200);

      const h1Opacity = await page.locator('h1#hero-title').evaluate((el) => window.getComputedStyle(el).opacity);
      assert.strictEqual(h1Opacity, '1', 'Hero h1 must remain visible after media emulation toggle');
    });

  } finally {
    await browser.close();
  }

  console.log(`\n${BOLD}──────────────────────────────────────────────────────────────${RESET}`);
  console.log(`  Reduced-Motion Suite Summary:`);
  console.log(`  Passed: ${GREEN}${passedTests}${RESET}`);
  console.log(`  Failed: ${failedTests > 0 ? RED : GREEN}${failedTests}${RESET}`);
  console.log(`${BOLD}${CYAN}======================================================================${RESET}\n`);

  if (failedTests > 0) {
    process.exit(1);
  }
}

if (require.main === module) {
  runReducedMotionSuite().catch((err) => {
    console.error('Fatal test error:', err);
    process.exit(1);
  });
}

module.exports = { runReducedMotionSuite };
