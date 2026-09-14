import assert from 'node:assert/strict';
import { gunzipSync } from 'node:zlib';
import { chromium } from '@playwright/test';

// Run against a dev server started with VITE_POSTHOG_ENABLED=true.
// Ingestion is intercepted by default. ANALYTICS_LIVE=true verifies delivery
// to the configured project, labeled development and excluded from reports.
const live = process.env.ANALYTICS_LIVE === 'true';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
const events = [];
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));

function collect(request) {
  if (request.method() !== 'POST' || !request.url().includes('posthog.com')) return;
  const body = request.postDataBuffer();
  if (!body) return;
  let payload;
  try {
    const bytes = body[0] === 0x1f && body[1] === 0x8b ? gunzipSync(body) : body;
    const text = bytes.toString();
    payload = JSON.parse(text);
  } catch {
    return;
  }
  events.push(...(Array.isArray(payload) ? payload : payload.batch || [payload]));
}

page.on('request', collect);
if (!live) {
  await page.route('https://us.i.posthog.com/**', async (route) => {
    if (route.request().method() === 'POST' && !route.request().url().includes('/flags')) {
      await route.fulfill({ status: 200, contentType: 'application/json', body: '{"status":1}' });
    } else await route.continue();
  });
}

try {
  await page.goto(process.env.ANALYTICS_TEST_URL || 'http://127.0.0.1:5174/?utm_source=analytics_qa&private=do-not-collect#private');
  await page.locator('[data-cta-id="home_hero_contact"]').click();
  await page.waitForURL('**/contact');
  // Prevent external phone/email applications after React handles the click.
  await page.evaluate(() => document.addEventListener('click', (event) => {
    if (event.target.closest('a[href^="tel:"], a[href^="mailto:"]')) event.preventDefault();
  }));
  await page.locator('[data-cta-id="contact_phone"]').click();
  await page.locator('[data-cta-id="contact_email"]').click();
  await page.getByRole('link', { name: '(858) 603-6709', exact: true }).click();
  await page.locator('[data-cta-id="contact_explore_corporate"]').click();
  await page.waitForURL('**/corporate');
  await page.locator('[data-cta-id="corporate_hero_contact"]').click();
  await page.waitForURL('**/contact');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Open navigation menu' }).click();
  await page.locator('[data-cta-id="nav_drawer_contact"]').click();
  await assert.doesNotReject(() => page.getByRole('button', { name: 'Open navigation menu' }).waitFor());
  await page.waitForTimeout(12000);

  const pageviews = events.filter((event) => event.event === '$pageview');
  assert.deepEqual(pageviews.map((event) => event.properties.page_path), ['/', '/contact', '/corporate', '/contact']);
  const contacts = events.filter((event) => event.event === 'contact_attempted');
  assert.deepEqual(contacts.map((event) => [event.properties.cta_id, event.properties.contact_method]), [
    ['contact_phone', 'phone'], ['contact_email', 'email'], ['footer_phone', 'phone'],
  ]);
  assert.equal(events.filter((event) => event.event === 'contact_page_viewed').length, 2);
  assert.equal(events.filter((event) => event.event === 'cta_clicked' && event.properties.cta_id === 'nav_drawer_contact').length, 1);
  for (const event of events.filter((event) => ['$pageview', 'cta_clicked', 'contact_attempted'].includes(event.event))) {
    assert.equal(event.properties.environment, 'development');
    assert.ok(!event.properties.$current_url?.includes('private='));
    assert.ok(!event.properties.$current_url?.includes('#'));
  }
  assert.deepEqual(errors, []);
  console.log(JSON.stringify({ live, pageviews: pageviews.length, contactAttempts: contacts.length, ctaClicks: events.filter((e) => e.event === 'cta_clicked').length, replayPackets: events.filter((e) => e.event === '$snapshot').length, errors }, null, 2));
} finally {
  await browser.close();
}
