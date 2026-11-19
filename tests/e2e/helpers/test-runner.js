/**
 * SimpleKaj E2E Test Runner Helper
 * Provides a lightweight, self-contained test runner and helper utilities
 * compatible with Playwright skill execution.
 */

const os = require('node:os');
const path = require('node:path');
const { chromium } = require('playwright');

// Color constants for console output
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const GRAY = '\x1b[90m';

class TestRunner {
  constructor(suiteName) {
    this.suiteName = suiteName;
    this.tests = [];
    this.passed = 0;
    this.failed = 0;
    this.failures = [];
    this.targetUrl = process.env.TARGET_URL || 'http://localhost:3000';
    this.artifactDir = process.env.PW_ARTIFACT_DIR || os.tmpdir();
  }

  test(name, fn) {
    this.tests.push({ name, fn });
  }

  async run() {
    console.log(`\n${BOLD}${CYAN}══════════════════════════════════════════════════════════════${RESET}`);
    console.log(`${BOLD}${CYAN}  E2E TEST SUITE: ${this.suiteName}${RESET}`);
    console.log(`${GRAY}  Target URL: ${this.targetUrl}${RESET}`);
    console.log(`${BOLD}${CYAN}══════════════════════════════════════════════════════════════${RESET}\n`);

    const startTime = Date.now();
    let browser = null;

    try {
      browser = await chromium.launch({
        headless: process.env.HEADLESS !== 'false' && process.env.PW_HEADLESS !== 'false',
      });

      for (let i = 0; i < this.tests.length; i++) {
        const { name, fn } = this.tests[i];
        const testStartTime = Date.now();
        process.stdout.write(`  [${i + 1}/${this.tests.length}] ${name} ... `);

        const context = await browser.newContext({
          viewport: { width: 1440, height: 900 },
          locale: 'en-US',
        });
        const page = await context.newPage();

        try {
          await fn({ page, context, browser, targetUrl: this.targetUrl, runner: this });
          const duration = Date.now() - testStartTime;
          this.passed++;
          console.log(`${GREEN}PASSED${RESET} ${GRAY}(${duration}ms)${RESET}`);
        } catch (error) {
          const duration = Date.now() - testStartTime;
          this.failed++;
          console.log(`${RED}FAILED${RESET} ${GRAY}(${duration}ms)${RESET}`);
          console.log(`     ${RED}Error: ${error.message}${RESET}`);

          // Attempt failure screenshot
          try {
            const sanitizedName = name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
            const screenshotPath = path.join(this.artifactDir, `fail_${sanitizedName}_${Date.now()}.png`);
            await page.screenshot({ path: screenshotPath, fullPage: true });
            console.log(`     ${GRAY}Screenshot saved: ${screenshotPath}${RESET}`);
          } catch (screenshotError) {
            // Ignore screenshot capture error
          }

          this.failures.push({ name, error });
        } finally {
          await context.close().catch(() => {});
        }
      }
    } catch (launchError) {
      console.error(`${RED}Fatal: Failed to launch browser or initialize tests:${RESET}`, launchError);
      process.exitCode = 1;
      return false;
    } finally {
      if (browser) {
        await browser.close().catch(() => {});
      }
    }

    const totalDuration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`\n${BOLD}──────────────────────────────────────────────────────────────${RESET}`);
    console.log(`${BOLD}Test Summary for ${this.suiteName}:${RESET}`);
    console.log(`  Total:  ${this.tests.length}`);
    console.log(`  Passed: ${GREEN}${this.passed}${RESET}`);
    console.log(`  Failed: ${this.failed > 0 ? RED : GREEN}${this.failed}${RESET}`);
    console.log(`  Time:   ${YELLOW}${totalDuration}s${RESET}`);

    if (this.failures.length > 0) {
      console.log(`\n${BOLD}${RED}Failures Summary:${RESET}`);
      this.failures.forEach(({ name, error }, idx) => {
        console.log(`\n  ${idx + 1}) ${BOLD}${name}${RESET}`);
        console.log(`     ${RED}${error.stack || error.message}${RESET}`);
      });
      console.log(`\n${BOLD}${CYAN}══════════════════════════════════════════════════════════════${RESET}\n`);
      process.exitCode = 1;
      return false;
    }

    console.log(`\n${BOLD}${GREEN}✔ All tests in ${this.suiteName} passed!${RESET}`);
    console.log(`${BOLD}${CYAN}══════════════════════════════════════════════════════════════${RESET}\n`);
    return true;
  }
}

/**
 * Asserts that the page does not have horizontal scroll overflow.
 * Checks scrollWidth <= innerWidth across documentElement and body.
 */
async function assertNoHorizontalOverflow(page, contextLabel = '') {
  const overflow = await page.evaluate(() => {
    const docElem = document.documentElement;
    const body = document.body;
    const scrollWidth = Math.max(docElem.scrollWidth, body ? body.scrollWidth : 0);
    const clientWidth = window.innerWidth || docElem.clientWidth;
    return {
      hasOverflow: scrollWidth > clientWidth,
      scrollWidth,
      clientWidth,
      difference: scrollWidth - clientWidth,
    };
  });

  if (overflow.hasOverflow) {
    throw new Error(
      `Horizontal scroll overflow detected ${contextLabel ? `[${contextLabel}]` : ''}: ` +
      `scrollWidth (${overflow.scrollWidth}px) exceeds viewport innerWidth (${overflow.clientWidth}px) ` +
      `by ${overflow.difference}px.`
    );
  }
}

/**
 * Helper to ensure target page is reachable before running tests.
 */
async function checkServerReachable(url, timeoutMs = 4000) {
  const http = require('node:http');
  const urlObj = new URL(url);

  return new Promise((resolve) => {
    const req = http.request(
      {
        hostname: urlObj.hostname,
        port: urlObj.port || 80,
        path: urlObj.pathname,
        method: 'HEAD',
        timeout: timeoutMs,
      },
      (res) => {
        resolve(res.statusCode < 500);
      }
    );

    req.on('error', () => resolve(false));
    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });
    req.end();
  });
}

module.exports = {
  TestRunner,
  assertNoHorizontalOverflow,
  checkServerReachable,
};
