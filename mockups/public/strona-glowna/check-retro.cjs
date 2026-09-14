// Validate the independent art-direction variant; never rewrite either HTML.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { pathToFileURL, fileURLToPath } = require('node:url');
const { launch } = require('../browser.cjs');

(async () => {
  const botanical = process.argv[2] === 'botanical';
  const modern = process.argv[2] === 'modern' || botanical;
  const variant = botanical ? 'botanical-v4' : modern ? 'modern-v3' : 'retro-v2';
  const version = botanical ? 'v4' : modern ? 'v3' : 'v2';
  const source = path.join(__dirname, `preview-${variant}.html`);
  const original = path.join(__dirname, 'preview-qa.html');
  const output = path.resolve(__dirname, `../exports/${variant}`);
  fs.mkdirSync(output, { recursive: true });
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'kg-retro-'));
  const standalone = path.join(temp, 'renamed.html');
  fs.copyFileSync(source, standalone);
  const browser = await launch();
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route(/^https?:/, route => {
      errors.push(`Unexpected request: ${route.request().url()}`);
      return route.abort();
    });
    const url = pathToFileURL(source).href;
    for (const width of [320, 390, 412, 600, 768, 1440, 1920, 3440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(url);
      await page.evaluate(() => document.fonts.ready);
      const layout = await page.evaluate(() => ({
        width: document.documentElement.scrollWidth,
        badImages: [...document.images].filter(i => i.hasAttribute('src') && !i.naturalWidth).length,
        overflowing: [...document.querySelectorAll('.mobile')].filter(e => e.scrollWidth > e.clientWidth + 1).length,
      }));
      assert.ok(layout.width <= width + 1, `Overflow at ${width}px`);
      assert.equal(layout.badImages, 0);
      assert.equal(layout.overflowing, 0);
    }
    for (const href of await page.locator('a[href]').evaluateAll(els => els.map(a => a.href))) {
      if (href.startsWith('file:')) assert.ok(fs.existsSync(fileURLToPath(href)), href);
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(url);
    await page.locator('.site-menu-toggle').click();
    assert.ok(await page.locator('.site-nav').isVisible());
    await page.keyboard.press('Escape');
    assert.ok(await page.locator('.site-nav').isHidden());
    await page.locator('.site-menu-toggle').click();
    await page.locator('.site-nav a', { hasText: 'Galeria' }).click();
    await page.waitForURL('**#kg-gallery');
    assert.ok(await page.locator('.site-nav').isHidden());
    assert.ok(Math.abs(await page.locator('#kg-gallery').evaluate(e => e.getBoundingClientRect().top)) < 2);
    await page.locator('[data-photo="0"]').click();
    assert.ok(await page.locator('dialog').isVisible());
    await page.keyboard.press('ArrowRight');
    assert.equal(await page.locator('dialog [aria-live]').textContent(), '2 / 4');
    await page.keyboard.press('Escape');
    assert.ok(await page.locator('dialog').isHidden());
    await page.locator('details').nth(1).locator('summary').click();
    assert.notEqual(await page.locator('details').nth(1).getAttribute('open'), null);
    await page.goto(pathToFileURL(standalone).href + '?view=page');
    assert.equal(await page.locator('.site-brand').first().getAttribute('href'), pathToFileURL(standalone).href + '?view=page');
    assert.ok(await page.evaluate(() => [...document.images].filter(i => i.hasAttribute('src')).every(i => i.complete && i.naturalWidth)));
    for (const [file, name] of [[original, 'v1'], [source, version]]) {
      await page.goto(pathToFileURL(file).href + '?view=page');
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: path.join(output, `${name}-mobile.png`) });
      if (name === version) {
        await page.evaluate(() => { document.body.dataset.export = 'true'; });
        await page.screenshot({ path: path.join(output, `${version}-full.png`), fullPage: true });
      }
    }
    await page.setViewportSize({ width: 2200, height: 1600 });
    await page.goto(url);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(output, `${version}-board.png`), fullPage: true });
    await page.locator('[data-view="page"]').click();
    assert.equal(await page.locator('body').getAttribute('data-view'), 'page');
    const popupPromise = page.waitForEvent('popup');
    await page.locator(modern ? '[data-compare="1"]' : '.retro-original').click();
    const popup = await popupPromise;
    await popup.waitForLoadState();
    assert.equal(popup.url(), pathToFileURL(original).href + '?view=page');
    await popup.close();
    if (modern) {
      const retroPopupPromise = page.waitForEvent('popup');
      await page.locator('[data-compare="2"]').click();
      const retroPopup = await retroPopupPromise;
      await retroPopup.waitForLoadState();
      assert.equal(retroPopup.url(), pathToFileURL(path.join(__dirname, 'preview-retro-v2.html')).href + '?view=page');
      await retroPopup.close();
    }
    if (botanical) {
      const modernPopupPromise = page.waitForEvent('popup');
      await page.locator('[data-compare="3"]').click();
      const modernPopup = await modernPopupPromise;
      await modernPopup.waitForLoadState();
      assert.equal(modernPopup.url(), pathToFileURL(path.join(__dirname, 'preview-modern-v3.html')).href + '?view=page');
      await modernPopup.close();
    }
    await page.locator('[data-view="board"]').click();
    assert.equal(await page.locator('body').getAttribute('data-view'), 'board');
    assert.deepEqual(errors, []);
    const before = fs.statSync(original).size;
    const after = fs.statSync(source).size;
    assert.ok(after < before, 'Variant must remain smaller than original');
    console.log(JSON.stringify({ status: 'PASS', widths: '320–3440 px', standalone: true, externalRequests: 0, originalBytes: before, variantBytes: after, reduction: `${((1 - after / before) * 100).toFixed(1)}%`, screenshots: output }, null, 2));
  } finally {
    await browser.close();
    fs.unlinkSync(standalone);
    fs.rmdirSync(temp);
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
