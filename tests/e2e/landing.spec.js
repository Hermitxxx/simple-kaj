/**
 * SimpleKaj Comprehensive E2E Test Suite (Master Runner)
 * 
 * Executable via:
 *   node .agents/skills/playwright-skill/run.js tests/e2e/landing.spec.js
 * 
 * Supports options:
 *   --tier=1  (Tier 1: 10 Sections presence & visual elements)
 *   --tier=2  (Tier 2: Responsive viewports 1440px, 768px, 390px, 360px)
 *   --tier=3  (Tier 3: Client interactivity: FAQ, Mobile Menu, Lang Toggle, Newsletter)
 *   --tier=4  (Tier 4: Accessibility & Modern Web Guidelines)
 *   (default: executes all 4 tiers in order)
 */

const { checkServerReachable } = require('./helpers/test-runner');

const tier1Runner = require('./tier1-sections.spec');
const tier2Runner = require('./tier2-responsive.spec');
const tier3Runner = require('./tier3-interactions.spec');
const tier4Runner = require('./tier4-accessibility.spec');

// Color constants
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const GRAY = '\x1b[90m';

(async () => {
  const targetUrl = process.env.TARGET_URL || 'http://localhost:3000';
  const args = process.argv.slice(2);
  const tierArg = args.find((a) => a.startsWith('--tier='));
  const selectedTier = tierArg ? parseInt(tierArg.split('=')[1], 10) : null;

  console.log(`\n${BOLD}${CYAN}======================================================================${RESET}`);
  console.log(`${BOLD}${CYAN}   SimpleKaj Frontend Landing Page — Playwright E2E Test Suite       ${RESET}`);
  console.log(`${BOLD}${CYAN}======================================================================${RESET}`);
  console.log(`${GRAY}Target Base URL: ${targetUrl}${RESET}`);
  if (selectedTier) {
    console.log(`${YELLOW}Filtering execution for Tier ${selectedTier} only.${RESET}`);
  } else {
    console.log(`${GRAY}Executing all 4 test tiers (Sections, Responsive, Interactions, A11y).${RESET}`);
  }
  console.log(`${BOLD}${CYAN}======================================================================${RESET}\n`);

  // Pre-flight check: is server reachable?
  const isReachable = await checkServerReachable(targetUrl, 3000);
  if (!isReachable) {
    console.warn(`${YELLOW}⚠️  Warning: Target server at ${targetUrl} did not respond to pre-flight check.${RESET}`);
    console.warn(`${GRAY}If your dev server is not running, start it using:${RESET}`);
    console.warn(`  ${BOLD}cmd /c npm run dev${RESET}  or  ${BOLD}cmd /c npm start${RESET}\n`);
  }

  const runnersToExecute = [];
  if (!selectedTier || selectedTier === 1) runnersToExecute.push({ tier: 1, runner: tier1Runner });
  if (!selectedTier || selectedTier === 2) runnersToExecute.push({ tier: 2, runner: tier2Runner });
  if (!selectedTier || selectedTier === 3) runnersToExecute.push({ tier: 3, runner: tier3Runner });
  if (!selectedTier || selectedTier === 4) runnersToExecute.push({ tier: 4, runner: tier4Runner });

  let totalTests = 0;
  let totalPassed = 0;
  let totalFailed = 0;
  const suiteResults = [];

  for (const { tier, runner } of runnersToExecute) {
    const success = await runner.run();
    totalTests += runner.tests.length;
    totalPassed += runner.passed;
    totalFailed += runner.failed;
    suiteResults.push({
      tier,
      name: runner.suiteName,
      passed: runner.passed,
      failed: runner.failed,
      total: runner.tests.length,
      success,
    });
  }

  console.log(`\n${BOLD}${CYAN}══════════════════════════════════════════════════════════════${RESET}`);
  console.log(`${BOLD}${CYAN}   FINAL SUITE EXECUTION SUMMARY                               ${RESET}`);
  console.log(`${BOLD}${CYAN}══════════════════════════════════════════════════════════════${RESET}`);

  for (const res of suiteResults) {
    const status = res.success ? `${GREEN}✔ PASS${RESET}` : `${RED}✘ FAIL${RESET}`;
    console.log(`  ${status}  Tier ${res.tier}: ${res.name.padEnd(42)} [${res.passed}/${res.total}]`);
  }

  console.log(`${BOLD}──────────────────────────────────────────────────────────────${RESET}`);
  console.log(`  Grand Total Tests: ${totalTests}`);
  console.log(`  Passed:            ${GREEN}${totalPassed}${RESET}`);
  console.log(`  Failed:            ${totalFailed > 0 ? RED : GREEN}${totalFailed}${RESET}`);
  console.log(`${BOLD}${CYAN}══════════════════════════════════════════════════════════════${RESET}\n`);

  if (totalFailed > 0) {
    console.error(`${RED}E2E Test Suite completed with ${totalFailed} failure(s).${RESET}`);
    process.exit(1);
  } else {
    console.log(`${GREEN}✔ All E2E Test Tiers completed successfully with 100% pass rate!${RESET}`);
    process.exit(0);
  }
})();
