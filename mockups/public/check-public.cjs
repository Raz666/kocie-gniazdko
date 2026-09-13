const assert = require('assert/strict');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { pathToFileURL, fileURLToPath } = require('url');
const { launch, pages } = require('./browser.cjs');
const url = (key, query = '') => pathToFileURL(path.join(__dirname, pages[key])).href + query;
// Intentional duplication inside standalone files must not cause design drift.
const sharedIds = ['shared-fonts', 'shared-styles', 'mockup-assets', 'shared-behavior'];
const sources = Object.values(pages).map(file => fs.readFileSync(path.join(__dirname, file), 'utf8'));
for (const id of sharedIds) {
  const blocks = sources.map(source => {
    const block = source.match(new RegExp(`<(?:style|script) id="${id}"[^>]*>([\\s\\S]*?)</(?:style|script)>`));
    assert.ok(block, `Brak wspólnego bloku ${id}`);
    return block[1].replace(/\r\n/g, '\n');
  });
  assert.ok(blocks.every(block => block === blocks[0]), `Rozbieżność wspólnego bloku ${id}`);
}
(async () => {
  const browser = await launch();
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    // Makiety muszą ładować wszystkie zasoby bez połączenia z internetem.
    await page.route(/^https?:/, route => { errors.push(`Zewnętrzny zasób: ${route.request().url()}`); return route.abort(); });
    for (const key of Object.keys(pages)) {
      for (const width of [320, 390, 412, 600, 768, 1440, 1920, 3440]) {
        await page.setViewportSize({ width, height: 1000 });
        await page.goto(url(key));
        await page.evaluate(() => document.fonts.ready);
        const layout = await page.evaluate(() => ({
          width: innerWidth,
          scroll: document.documentElement.scrollWidth,
          images: [...document.images].filter(i => i.hasAttribute('src') && !i.naturalWidth).map(i => i.src),
          overflowingScreens: [...document.querySelectorAll('.mobile, .state')].filter(e => e.getBoundingClientRect().width && e.scrollWidth > e.clientWidth + 1).map(e => e.id),
        }));
        assert.ok(layout.scroll <= width + 1, `${key} ${width}: poziome przepełnienie`);
        assert.deepEqual(layout.images, []);
        assert.deepEqual(layout.overflowingScreens, [], `${key} ${width}: treść poza ekranem`);
      }
      const links = await page.locator('a[href]').evaluateAll(els => els.map(a => a.href));
      for (const href of links.filter(href => href.startsWith('file:'))) {
        assert.ok(fs.existsSync(fileURLToPath(new URL(href))), `Brak pliku: ${href}`);
      }
      if (key === 'booking') continue;
      await page.setViewportSize({ width: 412, height: 915 });
      await page.goto(url(key));
      await page.locator('.site-menu-toggle').click();
      assert.ok(await page.locator('.site-nav').isVisible());
      await page.keyboard.press('Escape');
      assert.ok(await page.locator('.site-nav').isHidden());
      await page.locator('.site-menu-toggle').click();
      await page.locator('.site-nav a', { hasText: 'Galeria' }).click();
      await page.waitForURL('**#kg-gallery');
      assert.ok(await page.locator('.site-nav').isHidden());
      assert.ok(Math.abs(await page.locator('#kg-gallery').evaluate(e => e.getBoundingClientRect().top)) < 2);
    }
    await page.goto(url('home'));
    await page.locator('[data-photo="0"]').click();
    assert.ok(await page.locator('dialog').isVisible());
    await page.locator('[data-dir="1"]').click();
    assert.equal(await page.locator('dialog [aria-live]').textContent(), '2 / 4');
    await page.keyboard.press('Escape');
    assert.ok(await page.locator('dialog').isHidden());
    await page.locator('details').nth(1).locator('summary').click();
    assert.notEqual(await page.locator('details').nth(1).getAttribute('open'), null);
    await page.locator('.site-menu-toggle').click();
    await page.locator('.site-nav a', { hasText: 'Kontakt' }).click();
    await page.waitForURL('**/mockup-kontakt.html?view=page');
    await page.locator('.site-actions a', { hasText: 'Rezerwuj' }).click();
    await page.waitForURL('**?screen=01');
    for (let step = 2; step <= 6; step++) {
      await page.locator(`.actions a[href="?screen=0${step}"]`).filter({ visible: true }).click();
      await page.waitForURL(`**?screen=0${step}`);
      assert.equal(await page.locator('.mobile:visible').count(), 1);
    }
    await page.locator('#screen-06 a', { hasText: /stronę główną/i }).click();
    await page.waitForURL('**/preview-qa.html');
    await page.goto(url('booking', '?screen=exit'));
    await page.locator('#screen-exit a', { hasText: 'Opuść formularz' }).click();
    await page.waitForURL('**/preview-qa.html');
    // All saved-data and auxiliary states remain directly reviewable and responsive.
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(url('booking'));
    const ids = await page.locator('[id^="screen-"]').evaluateAll(els => els.map(el => el.id.slice(7)));
    for (const id of ids) {
      await page.setViewportSize({ width: 320, height: 900 });
      await page.goto(url('booking', `?screen=${id}`));
      assert.ok(await page.locator(`#screen-${id}`).isVisible());
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), 320, `Stan ${id}`);
    }
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(url('booking', '?screen=02'));
    await page.locator('button[data-view="board"]').click();
    assert.equal(await page.locator('#board-main .mobile:visible').count(), 6);
    await page.locator('button[data-view="page"]').click();
    assert.ok(await page.locator('#screen-02').isVisible());
    await page.setViewportSize({ width: 412, height: 915 });
    assert.equal(await page.locator('#screen-02').evaluate(e => e.getBoundingClientRect().width), 412);
    // Copy only each HTML, with a new filename and without the assets directory.
    const isolated = fs.mkdtempSync(path.join(os.tmpdir(), 'kg-standalone-'));
    const copies = [];
    try {
      for (const [key, file] of Object.entries(pages)) {
        const copy = path.join(isolated, `${key}-pobrana-makieta.html`);
        copies.push(copy);
        fs.copyFileSync(path.join(__dirname, file), copy);
        const requests = [];
        const record = request => { if (!request.url().startsWith('data:')) requests.push(request.url()); };
        page.on('request', record);
        await page.goto(pathToFileURL(copy).href);
        await page.evaluate(() => document.fonts.ready);
        assert.deepEqual(requests, [pathToFileURL(copy).href], `${key}: zasób poza pojedynczym HTML`);
        await page.evaluate(() => Promise.all([...document.fonts].map(font => font.load())));
        assert.deepEqual(requests, [pathToFileURL(copy).href], `${key}: font poza pojedynczym HTML`);
        page.off('request', record);
        const embedded = await page.evaluate(() => ({
          fonts: [...document.fonts].filter(font => font.status === 'loaded').length,
          images: [...document.images].filter(image => image.hasAttribute('src')).every(image => image.src.startsWith('data:') && image.naturalWidth > 0),
          dependencies: document.querySelectorAll('link[rel="stylesheet"], script[src], iframe').length,
        }));
        assert.equal(embedded.fonts, 4, `${key}: osadzone fonty`);
        assert.ok(embedded.images, `${key}: osadzone obrazy`);
        assert.equal(embedded.dependencies, 0);
        if (key === 'home') {
          await page.locator('.site-menu-toggle').click();
          await page.locator('.site-nav a', { hasText: 'Galeria' }).click();
          assert.ok(page.url().startsWith(pathToFileURL(copy).href));
          await page.locator('[data-photo="0"]').click();
          assert.ok(await page.locator('dialog').isVisible());
          await page.keyboard.press('Escape');
        } else if (key === 'contact') {
          await page.locator('.site-menu-toggle').click();
          await page.locator('.site-nav a', { hasText: 'Kontakt' }).click();
          assert.ok(page.url().startsWith(pathToFileURL(copy).href));
        } else {
          await page.locator('.actions a[href="?screen=02"]').filter({ visible: true }).click();
          assert.ok(await page.locator('#screen-02').isVisible());
          assert.ok(page.url().startsWith(pathToFileURL(copy).href));
        }
        await page.setViewportSize({ width: 1920, height: 1080 });
        await page.locator('button[data-view="board"]').click();
        assert.equal(await page.locator('body').getAttribute('data-view'), 'board');
        await page.locator('button[data-view="page"]').click();
        assert.equal(await page.locator('body').getAttribute('data-view'), 'page');
        await page.setViewportSize({ width: 412, height: 915 });
      }
    } finally {
      await page.goto('about:blank');
      for (const copy of copies) fs.unlinkSync(copy);
      fs.rmdirSync(isolated);
    }
    assert.deepEqual(errors, []);
    console.log(`OK: 3 samodzielne HTML-e, identyczne bloki wspólne, kopie bez zasobów, 8 szerokości, ${ids.length} ekranów rezerwacji, linki, menu, galeria, FAQ i przejścia.`);
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
