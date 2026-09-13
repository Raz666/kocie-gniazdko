// Export the maintained HTML. This script never generates or overwrites source files.
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { launch, pages } = require('./browser.cjs');
async function render(key) {
  if (!pages[key]) throw new Error('Wybierz: home, contact lub booking.');
  const output = path.join(__dirname, 'exports', key);
  fs.mkdirSync(output, { recursive: true });
  const browser = await launch();
  try {
    const page = await browser.newPage({ viewport: { width: 2600, height: 1100 }, deviceScaleFactor: 2 });
    const url = pathToFileURL(path.join(__dirname, pages[key])).href;
    await page.goto(url);
    await page.evaluate(() => document.fonts.ready);
    for (const board of await page.locator('.board').all()) {
      await board.screenshot({ path: path.join(output, `${await board.getAttribute('id')}.png`) });
    }
    const screens = await page.locator('[id^="screen-"]').evaluateAll(els => els.map(el => el.id.slice(7)));
    await page.setViewportSize({ width: 390, height: 844 });
    for (const screen of screens.length ? screens : ['page']) {
      await page.goto(url + (screen === 'page' ? '?view=page' : `?screen=${screen}`));
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: path.join(output, `${screen}-first.png`) });
      await page.evaluate(() => { document.body.dataset.export = 'true'; });
      await page.screenshot({ path: path.join(output, `${screen}-full.png`), fullPage: true });
    }
    console.log(`Eksporty: ${output}`);
  } finally { await browser.close(); }
}
exports.render = render;
if (require.main === module) render(process.argv[2] || 'home').catch(error => { console.error(error); process.exitCode = 1; });
