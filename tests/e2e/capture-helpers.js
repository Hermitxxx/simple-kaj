const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('requestfailed', req => console.log('REQ FAILED:', req.url(), req.failure()?.errorText));

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  const section = page.locator('#helpers');
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(2000);
  
  const box = await section.boundingBox();
  if (box) {
    await page.screenshot({ path: 'tests/e2e/helpers-spotlight.png', clip: box });
    console.log('Saved screenshot to tests/e2e/helpers-spotlight.png');
  }
  await browser.close();
})();
