# Test Infrastructure: SimpleKaj E2E Playwright Suite

## 1. Overview
The SimpleKaj testing infrastructure is an opaque-box End-to-End (E2E) testing framework designed to validate the frontend landing page against specifications in `ORIGINAL_REQUEST.md`, `PROJECT.md`, and `SIMPLEKAJ_PLAN.md`.

It uses **Playwright** via the project's native skill wrapper (`.agents/skills/playwright-skill/run.js`) and tests against any running server instance (e.g. `http://localhost:3000`).

---

## 2. Test Architecture & Directory Layout

```
c:\websites\simple-kaj\
├── .agents/skills/playwright-skill/
│   ├── run.js                          # Playwright executor script setting up NODE_PATH
│   └── node_modules/playwright/        # Playwright runtime
├── tests/
│   └── e2e/
│       ├── helpers/
│       │   └── test-runner.js          # Shared test harness, browser management & assertions
│       ├── landing.spec.js             # Master test suite executing all 4 tiers
│       ├── tier1-sections.spec.js      # Tier 1: 10 Landing Page Sections presence & copy
│       ├── tier2-responsive.spec.js    # Tier 2: Responsive viewports & overflow checks
│       ├── tier3-interactions.spec.js  # Tier 3: Client interactivity (FAQ, menu, lang, form)
│       └── tier4-accessibility.spec.js # Tier 4: A11y, semantic landmarks, single H1, contrast
├── TEST_INFRA.md                       # Test infrastructure documentation (this file)
└── TEST_READY.md                       # Test readiness report and execution matrix
```

---

## 3. Test Tiers Specification

### Tier 1: All 10 Landing Sections Present in DOM
- **Section 1: Navbar**: Floating pill navbar, logo, anchor links, language toggle, lime CTA button.
- **Section 2: Hero Section**: Hyperlocal status badge, single `<h1>`, dual CTAs, centered phone mockup with errand preview in BDT (`৳`), flanking community helper pills.
- **Section 3: How it Works**: 3 value proposition cards, dark `#0D0D0D` styling, glowing lime accents, step descriptions.
- **Section 4: Feature Showcase**: 5 visual cards covering Dhaka errands (Grocery/Bazaar, Queue standing, Express parcel, Tech help, Privacy/Safety).
- **Section 5: Pricing**: 3 commission tiers (Posters Free ৳0, Launch Special 0% glowing featured card, Verified Pro).
- **Section 6: Community Grid**: Staggered helper portrait grid with Dhaka neighborhood badges (Dhanmondi, Gulshan, Banani, Mirpur, Uttara) and ratings (⭐ 4.8+).
- **Section 7: Testimonials**: 3 authentic quotes from posters and workers.
- **Section 8: FAQ**: Lime support highlight card on left with WhatsApp/hotline, accessible accordion on right.
- **Section 9: Bottom CTA**: Dark container (`#0D0D0D`), perspective image strip, lime CTA button.
- **Section 10: Footer**: Dark footer, lime newsletter box with input and submit button, categorized links, copyright notice.

### Tier 2: Boundary & Responsive Viewports
- **Viewports tested**:
  - `1440 x 900` (Desktop)
  - `768 x 1024` (Tablet)
  - `390 x 844` (Standard Mobile)
  - `360 x 740` (Small Mobile per `SIMPLEKAJ_PLAN.md` line 97)
- **Assertions**:
  - `Math.max(documentElement.scrollWidth, body.scrollWidth) <= innerWidth` across the full scrollable page.
  - Desktop viewports show inline navbar links and hide hamburger trigger.
  - Mobile viewports display hamburger trigger and hide inline links.
  - Touch target height >= 36px on buttons and links.

### Tier 3: Client-Side Interactivity
- **FAQ Accordion**: Trigger buttons toggle `aria-expanded` between `"false"` and `"true"`, opening and collapsing answer panels.
- **Mobile Menu Drawer**: Clicking mobile hamburger trigger opens drawer modal/dialog with links; clicking close button dismisses it.
- **Language Toggle Switch**: Clicking between `EN` and `বাং` updates the active language indicator.
- **Newsletter Submission Form**: Submitting a valid email address displays an inline client-side confirmation feedback message without page reload.

### Tier 4: Accessibility & Modern Web Guidelines
- **Skip Link**: `<a href="#main-content">` present in DOM, visually reveals on keyboard `:focus`.
- **Semantic Landmarks**: `<header>`, `<nav>`, `<main>`, `<footer>` present and distinct.
- **Single `<h1>`**: Exactly one `<h1>` headline on the page, with valid non-skipping heading hierarchy.
- **Button vs Link Semantics**: `<a>` strictly used for navigation (`href`); `<button>` used for action toggles.
- **Color Contrast**: Dark text (`#0D0D0D` / `neutral-950`) on lime elements for WCAG AAA compliance (14.2:1 ratio).

---

## 4. Execution Commands

### Prerequisites Setup (Run Once)
```powershell
cd .agents\skills\playwright-skill
cmd /c npm install
cmd /c npx playwright install chromium
cd ..\..\..
```

### Run Master Test Suite (All 4 Tiers)
```powershell
node .agents/skills/playwright-skill/run.js tests/e2e/landing.spec.js
```

### Run Individual Tiers
```powershell
# Tier 1: 10 Landing Sections
node .agents/skills/playwright-skill/run.js tests/e2e/tier1-sections.spec.js
# Or via parameter:
node .agents/skills/playwright-skill/run.js tests/e2e/landing.spec.js --tier=1

# Tier 2: Responsive Viewports (1440, 768, 390, 360)
node .agents/skills/playwright-skill/run.js tests/e2e/tier2-responsive.spec.js
# Or via parameter:
node .agents/skills/playwright-skill/run.js tests/e2e/landing.spec.js --tier=2

# Tier 3: Client Interactivity
node .agents/skills/playwright-skill/run.js tests/e2e/tier3-interactions.spec.js
# Or via parameter:
node .agents/skills/playwright-skill/run.js tests/e2e/landing.spec.js --tier=3

# Tier 4: Accessibility & Guidelines
node .agents/skills/playwright-skill/run.js tests/e2e/tier4-accessibility.spec.js
# Or via parameter:
node .agents/skills/playwright-skill/run.js tests/e2e/landing.spec.js --tier=4
```

### Running Against Custom URL or Visible Browser
```powershell
# Custom target URL:
$env:TARGET_URL="http://localhost:3000"; node .agents/skills/playwright-skill/run.js tests/e2e/landing.spec.js

# Visible (non-headless) browser mode:
$env:PW_HEADLESS="false"; node .agents/skills/playwright-skill/run.js tests/e2e/landing.spec.js
```

---

## 5. Artifacts and Debugging
- On test failure, full-page screenshots are automatically captured and saved to `%TEMP%` (or `$env:PW_ARTIFACT_DIR`) with the format: `fail_<test_name>_<timestamp>.png`.
- The test harness outputs detailed ANSI-colored summaries including duration, individual step results, and exact failure stacks.
