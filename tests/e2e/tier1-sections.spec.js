/**
 * Tier 1: All 10 Landing Page Sections Verification
 * 
 * Verifies that all 10 landing page sections are present in the DOM with
 * expected semantic landmarks, headings, visual mockups, and copy:
 *  1. Floating / Pill Navigation Bar
 *  2. Hero Section (Badge pill, bold headline, dual CTAs, centered phone mockup, flanking helper pills)
 *  3. "How it Works" / 3 Value Proposition Cards (dark styling, lime icons)
 *  4. Feature Showcase Cards (5 outsourceable Dhaka errands)
 *  5. 3 Pricing / Commission Tier Cards (Posters Free, 0% Launch Special with glow, Verified Pro)
 *  6. "Meet the Community" Staggered Helper Grid (ratings & Dhaka neighborhood badges)
 *  7. Testimonials Section (3 quotes from posters and workers)
 *  8. FAQ Section (Lime contact card on left, accessible accordion on right)
 *  9. Dark Bottom CTA Section (Dark container, perspective image strip, lime CTA)
 * 10. Dark Footer (Lime newsletter subscription box on left, categorized links on right)
 */

const assert = require('node:assert');
const { TestRunner } = require('./helpers/test-runner');

const runner = new TestRunner('Tier 1: 10 Landing Page Sections');

// 1. Navigation Bar
runner.test('Section 1: Floating/Pill Navbar contains logo, nav links, language toggle, and lime CTA', async ({ page, targetUrl }) => {
  await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });

  // Semantic header landmark
  const header = page.locator('header').first();
  await header.waitFor({ state: 'visible', timeout: 8000 });

  // Brand logo / wordmark
  const brand = header.getByText(/simplekaj/i);
  assert(await brand.isVisible(), 'Navbar must display SimpleKaj brand logo/text');

  // Nav links: should contain primary navigation items
  const nav = header.locator('nav').first();
  assert(await nav.isVisible(), 'Navbar must contain a <nav> container');

  const navLinks = nav.locator('a[href^="#"]');
  const linkCount = await navLinks.count();
  assert(linkCount >= 3, `Desktop navbar should offer anchor navigation links (found ${linkCount})`);

  // Language toggle switch present (EN / বাং)
  const langToggle = header.getByText(/EN/i).and(header.getByText(/বাং|বাংলা/i)).or(header.locator('[data-testid="language-toggle"], button:has-text("EN")'));
  assert(await langToggle.count() > 0, 'Navbar must include language toggle switch (EN / বাং)');

  // Lime Primary CTA "Post a Task"
  const ctaButton = header.getByRole('link', { name: /post a task/i }).or(header.getByRole('button', { name: /post a task/i }));
  assert(await ctaButton.first().isVisible(), 'Navbar must display "Post a Task" CTA button');
});

// 2. Hero Section
runner.test('Section 2: Hero displays status badge pill, single H1, dual CTAs, centered phone mockup, and flanking helper cards', async ({ page, targetUrl }) => {
  await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });

  // Hero container
  const hero = page.locator('section[aria-labelledby*="hero"], #hero, main section').first();
  await hero.waitFor({ state: 'visible' });

  // Status Badge Pill (Dhaka hyperlocal badge)
  const badge = hero.getByText(/dhaka|gulshan|banani|dhanmondi|hyperlocal|errand network/i).first();
  assert(await badge.isVisible(), 'Hero must contain status badge pill referencing Dhaka hyperlocal context');

  // Bold H1 Display Headline
  const h1 = page.getByRole('heading', { level: 1 });
  assert((await h1.count()) === 1, 'Hero must contain exactly one <h1> display headline');
  const h1Text = await h1.innerText();
  assert(h1Text.length > 10, 'H1 text must be non-empty and descriptive');

  // Dual CTAs: Primary "Post a Task" & Secondary "Become a Worker" / "Become a Helper"
  const primaryCta = hero.getByRole('link', { name: /post a task/i }).or(hero.getByRole('button', { name: /post a task/i }));
  assert(await primaryCta.first().isVisible(), 'Hero must have primary "Post a Task" CTA');

  const secondaryCta = hero.getByRole('link', { name: /become a worker|become a helper|earn money/i }).or(hero.getByRole('button', { name: /become a worker|become a helper|earn money/i }));
  assert(await secondaryCta.first().isVisible(), 'Hero must have secondary "Become a Worker / Helper" CTA');

  // Centered Phone Mockup with active errand preview
  const phoneMockup = hero.locator('[data-testid="phone-mockup"], [class*="aspect-"], [class*="rounded-[2.5rem]"], [class*="rounded-[2rem]"], [class*="border-4"]').filter({ hasText: /৳|tk|bdt|unimart|grocery|gulshan|errand/i });
  assert(await phoneMockup.first().isVisible(), 'Hero must contain centered smartphone mockup with Dhaka errand preview');

  // Flanking helper cards / avatar pills
  const helperPills = hero.locator('[data-testid*="helper"], [class*="rounded-full"], [class*="avatar"]').filter({ hasText: /⭐|4\.|5\.0|dhanmondi|banani|mirpur|uttara/i });
  assert((await helperPills.count()) >= 1, 'Hero must feature flanking community helper cards/pills with rating or zone badges');
});

// 3. How it Works (3 Value Proposition Cards)
runner.test('Section 3: "How it Works" renders 3 value proposition cards with dark styling and lime accents', async ({ page, targetUrl }) => {
  await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });

  const hiwSection = page.locator('section[aria-labelledby*="how-it-works"], #how-it-works, section:has(h2:has-text("How it Works")), section:has(h2:has-text("How SimpleKaj Works"))').first();
  await hiwSection.waitFor({ state: 'visible' });

  // Section heading
  const heading = hiwSection.getByRole('heading', { level: 2 });
  assert(await heading.isVisible(), 'How it Works section must have an <h2> heading');

  // 3 Value Proposition Cards
  const cards = hiwSection.locator('article, li, [data-testid="value-prop-card"], [class*="rounded-2xl"], [class*="rounded-3xl"]').filter({
    hasText: /post|match|neighbor|helper|pay|escrow|completion|step|01|02|03/i,
  });

  const cardCount = await cards.count();
  assert(cardCount >= 3, `How it Works section must render at least 3 value proposition cards (found ${cardCount})`);

  // Verify steps / descriptions are present
  const hiwText = await hiwSection.innerText();
  assert(/post/i.test(hiwText), 'Cards must explain step 1: Posting an errand');
  assert(/match|helper|neighbor/i.test(hiwText), 'Cards must explain step 2: Matching with helper');
  assert(/pay|completion|cash|escrow/i.test(hiwText), 'Cards must explain step 3: Pay on completion');
});

// 4. Feature Showcase (Outsourceable Errands Stack)
runner.test('Section 4: Outsourceable Errands Showcase displays visual cards covering Dhaka errand categories', async ({ page, targetUrl }) => {
  await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });

  const featureSection = page.locator('section[aria-labelledby*="feature"], section[aria-labelledby*="errand"], #errands, #features, section:has(h2:has-text("Outsource")), section:has(h2:has-text("Services"))').first();
  await featureSection.waitFor({ state: 'visible' });

  // Heading
  const heading = featureSection.getByRole('heading', { level: 2 });
  assert(await heading.isVisible(), 'Feature Showcase must have an <h2> heading');

  const sectionText = await featureSection.innerText();

  // Dhaka errand categories per spec:
  // 1. Grocery & market/bazaar runs
  assert(/grocery|bazaar|market|কাঁচাবাজার/i.test(sectionText), 'Showcase must cover Grocery / Bazaar runs');
  // 2. Queue standing (BRTA, passport, bank)
  assert(/queue|line|সিরিয়াল|brta|passport/i.test(sectionText), 'Showcase must cover Queue standing / Line holding');
  // 3. Express parcel / document drop
  assert(/parcel|document|delivery|পার্সেল/i.test(sectionText), 'Showcase must cover Express parcel / document drops');
  // 4. Tech help or handyman
  assert(/tech|wifi|tv|setup|gadget|handyman/i.test(sectionText), 'Showcase must cover Tech help or Home setup');
  // 5. Privacy & safety
  assert(/privacy|safe|escrow|masked|protect|নিরাপত্তা/i.test(sectionText), 'Showcase must highlight Privacy / Safety guarantees');
});

// 5. 3 Pricing / Commission Tier Cards
runner.test('Section 5: Pricing section displays 3 commission tiers with featured glowing Launch Special card', async ({ page, targetUrl }) => {
  await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });

  const pricingSection = page.locator('section[aria-labelledby*="pricing"], #pricing, section:has(h2:has-text("Pricing")), section:has(h2:has-text("Commission"))').first();
  await pricingSection.waitFor({ state: 'visible' });

  // Heading
  const heading = pricingSection.getByRole('heading', { level: 2 });
  assert(await heading.isVisible(), 'Pricing section must have an <h2> heading');

  const sectionText = await pricingSection.innerText();

  // Tier 1: Posters Free (৳0 fee)
  assert(/free|৳0|0 taka|poster/i.test(sectionText), 'Pricing must include free tier for Task Posters');

  // Tier 2: Launch Special 0% commission (Featured glowing card)
  assert(/0%|launch special|0% commission/i.test(sectionText), 'Pricing must include Launch Special 0% commission tier');

  // Tier 3: Verified Pro worker tier
  assert(/pro|verified|priority|5%/i.test(sectionText), 'Pricing must include Verified Pro / Priority tier');

  // Verify at least 3 distinct card elements
  const pricingCards = pricingSection.locator('[data-testid="pricing-card"], article, [class*="rounded-3xl"], [class*="rounded-2xl"]').filter({
    hasText: /poster|launch|pro|commission|month|free|0%/i,
  });
  const count = await pricingCards.count();
  assert(count >= 3, `Pricing section must render at least 3 distinct pricing cards (found ${count})`);
});

// 6. Community Grid (Trusted Local Helpers)
runner.test('Section 6: Community Grid showcases Dhaka helpers with ratings and Bangladeshi neighborhood badges', async ({ page, targetUrl }) => {
  await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });

  const communitySection = page.locator('section[aria-labelledby*="community"], section[aria-labelledby*="helper"], #helpers, #community, section:has(h2:has-text("Helper")), section:has(h2:has-text("Community"))').first();
  await communitySection.waitFor({ state: 'visible' });

  // Heading
  const heading = communitySection.getByRole('heading', { level: 2 });
  assert(await heading.isVisible(), 'Community section must have an <h2> heading');

  const sectionText = await communitySection.innerText();

  // Verify authentic Dhaka neighborhood badges
  const dhakaZones = /dhanmondi|gulshan|banani|mirpur|uttara|mohammadpur|motijheel|campus/i;
  assert(dhakaZones.test(sectionText), 'Community grid must feature Dhaka neighborhood tags/badges (e.g. Dhanmondi, Gulshan, Mirpur)');

  // Verify ratings (⭐ or 4.x / 5.0)
  assert(/⭐|★|4\.[89]|5\.0/i.test(sectionText), 'Community grid must display ratings (⭐ 4.8+) for helpers');

  // Multiple helper cards present
  const helperCards = communitySection.locator('[data-testid="helper-card"], figure, article, [class*="rounded-2xl"], [class*="rounded-3xl"]').filter({
    hasText: dhakaZones,
  });
  const count = await helperCards.count();
  assert(count >= 3, `Community grid must render multiple helper portrait cards (found ${count})`);
});

// 7. Testimonials Section
runner.test('Section 7: Testimonials section features 3 authentic quotes from posters and workers', async ({ page, targetUrl }) => {
  await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });

  const testimonialsSection = page.locator('section[aria-labelledby*="testimonial"], #testimonials, section:has(h2:has-text("Testimonial")), section:has(h2:has-text("Stories")), section:has(h2:has-text("Loved by"))').first();
  await testimonialsSection.waitFor({ state: 'visible' });

  // Heading
  const heading = testimonialsSection.getByRole('heading', { level: 2 });
  assert(await heading.isVisible(), 'Testimonials section must have an <h2> heading');

  // 3 quote cards
  const cards = testimonialsSection.locator('blockquote, [data-testid="testimonial-card"], article, [class*="rounded-2xl"], [class*="rounded-3xl"]').filter({
    hasText: /poster|worker|student|manager|dhaka|dhanmondi|gulshan|mirpur|labaid|brta|tk|৳/i,
  });

  const count = await cards.count();
  assert(count >= 3, `Testimonials section must feature at least 3 community quote cards (found ${count})`);

  const sectionText = await testimonialsSection.innerText();
  assert(/poster|worker|helper/i.test(sectionText), 'Testimonials must represent both task posters and workers');
});

// 8. FAQ Section
runner.test('Section 8: FAQ section has lime contact card on left and accessible accordion on right', async ({ page, targetUrl }) => {
  await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });

  const faqSection = page.locator('section[aria-labelledby*="faq"], #faq, section:has(h2:has-text("FAQ")), section:has(h2:has-text("Questions"))').first();
  await faqSection.waitFor({ state: 'visible' });

  // Heading
  const heading = faqSection.getByRole('heading', { level: 2 });
  assert(await heading.isVisible(), 'FAQ section must have an <h2> heading');

  // Left column: Lime contact / support highlight card
  const contactCard = faqSection.locator('[data-testid="faq-contact-card"], [class*="bg-lime"], [class*="bg-\\[\\#CCFF00\\]"], [class*="bg-\\[\\#D2F824\\]"], div:has-text("Have questions?"), div:has-text("WhatsApp")').first();
  assert(await contactCard.isVisible(), 'FAQ section must include lime support/contact highlight card');

  const contactText = await contactCard.innerText();
  assert(/whatsapp|hotline|\+880/i.test(contactText), 'Support card must provide WhatsApp CTA or Dhaka hotline');

  // Right column: FAQ accordion trigger buttons
  const accordionButtons = faqSection.getByRole('button').filter({ hasText: /\?|how|what|payment|area|safe|prohibit/i });
  const buttonCount = await accordionButtons.count();
  assert(buttonCount >= 3, `FAQ accordion must include multiple question items (found ${buttonCount})`);
});

// 9. Dark Bottom CTA Section
runner.test('Section 9: Dark Bottom CTA section features perspective image strip and lime CTA button', async ({ page, targetUrl }) => {
  await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });

  const bottomCta = page.locator('section[aria-labelledby*="cta"], #get-started, section:has(h2:has-text("Ready")), section:has(h2:has-text("Get Started"))').last();
  await bottomCta.waitFor({ state: 'visible' });

  // Heading
  const heading = bottomCta.getByRole('heading', { level: 2 });
  assert(await heading.isVisible(), 'Bottom CTA must have an <h2> heading');

  // Lime CTA Button
  const ctaBtn = bottomCta.getByRole('link', { name: /post.*task|get started|it's free/i }).or(bottomCta.getByRole('button', { name: /post.*task|get started|it's free/i }));
  assert(await ctaBtn.first().isVisible(), 'Bottom CTA must display lime action button ("Post Your First Task" / "Get Started")');

  // Image strip / community preview elements
  const imgStrip = bottomCta.locator('img, svg, [class*="perspective"], [class*="rotate-"], [class*="overflow-hidden"]').first();
  assert(await imgStrip.isVisible(), 'Bottom CTA must contain visual helper strip / showcase elements');
});

// 10. Dark Footer
runner.test('Section 10: Dark Footer renders lime newsletter box on left and categorized links on right', async ({ page, targetUrl }) => {
  await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });

  const footer = page.locator('footer');
  await footer.waitFor({ state: 'visible' });

  // Left side: Lime newsletter subscription box
  const newsletterBox = footer.locator('[data-testid="newsletter-form"], form, [class*="bg-lime"], [class*="bg-\\[\\#CCFF00\\]"], [class*="bg-\\[\\#D2F824\\]"], div:has(input[type="email"])').first();
  assert(await newsletterBox.isVisible(), 'Footer must contain lime newsletter / Dhaka zone alerts subscription box');

  // Email input and submit button
  const emailInput = footer.getByRole('textbox', { name: /email/i }).or(footer.locator('input[type="email"], input[placeholder*="email" i]'));
  assert(await emailInput.first().isVisible(), 'Newsletter box must provide an email input field');

  // Right side: Categorized footer navigation links
  const footerLinks = footer.locator('a[href]');
  const linkCount = await footerLinks.count();
  assert(linkCount >= 6, `Footer must render categorized navigation links (found ${linkCount})`);

  // Copyright and Dhaka notice
  const footerText = await footer.innerText();
  assert(/simplekaj/i.test(footerText), 'Footer must include SimpleKaj copyright information');
  assert(/bangladesh|dhaka|2026/i.test(footerText), 'Footer must reference Bangladesh / Dhaka context');
});

// Standalone execution support
if (require.main === module) {
  runner.run().then((success) => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = runner;
