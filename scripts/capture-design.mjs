import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';

const [label = 'before', origin = 'http://127.0.0.1:5179', routing = 'hash'] = process.argv.slice(2);
const browser = await chromium.launch({ headless: true });
await fs.mkdir(`artifacts/${label}`, { recursive: true });
for (const width of [1440, 390]) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
  await context.addInitScript(() => {
    sessionStorage.setItem('farmtable:location', JSON.stringify({ street: 'Testgatan 12', city: 'Uppsala', postcode: '753 20' }));
    localStorage.setItem('farmtable:cart', JSON.stringify([{ slug: 'low-pasteurized-whole-milk-1l', pack: 'single', quantity: 1 }]));
  });
  const page = await context.newPage();
  for (const [name, route] of [['home', '/'], ['farms', '/farms'], ['farm', '/farm/solmarka'], ['product', '/product/low-pasteurized-whole-milk-1l'], ['cart', '/cart'], ['checkout', '/checkout'], ['login', '/auth/login?next=/checkout']]) {
    await page.goto(`${origin}${routing === 'hash' ? '/#' : ''}${route}`);
    await page.locator('.store-header').waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(900);
    await page.evaluate(() => {
      document.querySelectorAll('.scroll-reveal,.image-reveal').forEach(el => el.classList.add('is-visible'));
      document.querySelectorAll('video').forEach(el => { el.pause(); el.currentTime = 2; });
    });
    await page.waitForTimeout(300);
    await page.screenshot({ path: `artifacts/${label}/${name}-${width}.png`, fullPage: true });
    const metrics = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth,
      elements: [...document.querySelectorAll('h1,h2,.store-header,.brand-logo-image,.market-product-card,.market-cart-line')].filter(el => el.getBoundingClientRect().width).map(el => {
        const r = el.getBoundingClientRect(), s = getComputedStyle(el);
        return { text: el.textContent, x: r.x, y: r.y + scrollY, width: r.width, height: r.height, fontSize: s.fontSize, fontFamily: s.fontFamily };
      })
    }));
    await fs.writeFile(`artifacts/${label}/${name}-${width}.json`, JSON.stringify(metrics, null, 2));
    console.log(`${label}: ${name} ${width}`);
  }
  await context.close();
}
await browser.close();
