import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on('pageerror', (err) => errors.push(err.message));
page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
await page.locator('text=Client Voices').scrollIntoViewIfNeeded();
await page.waitForTimeout(700);
await page.screenshot({ path: '/tmp/testimonials-before.png' });

await page.getByRole('button', { name: /View More Reviews/i }).click();
await page.waitForTimeout(700);
await page.screenshot({ path: '/tmp/testimonials-after.png' });

console.log('ERRORS:', JSON.stringify(errors));
await browser.close();
