const path = require('node:path');
const assert = require('node:assert/strict');
const {chromium} = require(require.resolve('playwright', {paths: [path.resolve(path.dirname(process.execPath), '../node_modules')]}));

(async () => {
 const browser = await chromium.launch({channel: 'msedge', headless: true});
 try {
  const page = await browser.newPage({viewport: {width: 1024, height: 484}});
  page.setDefaultTimeout(5000);
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(require('node:url').pathToFileURL(path.join(__dirname, 'mockup-kalendarz.html')).href);
  await page.locator('#fullscreen').click();
  assert.equal(await page.locator('#fullscreen .button-label').textContent(), 'Widok zwykły');
  assert.equal(await page.locator('#status,#move-banner').count(), 0);
  const header = await page.locator('.heading h1,.heading .search,.heading #location,.heading .legend,#fullscreen').evaluateAll(es => es.map(e => e.getBoundingClientRect().top));
  assert.ok(Math.max(...header)-Math.min(...header)<10);
  for (const status of ['W hotelu','Aktywna','Nowa']) await page.locator(`[data-status="${status}"]`).click();
  assert.equal(await page.locator('.stay.normal').count(), 0);
  assert.equal(await page.locator('[data-status]').first().evaluate(e=>getComputedStyle(e).opacity), '0.7');
  await page.locator('[data-status="W hotelu"]').click();
  assert.equal(await page.locator('.stay.normal').count(), 5);
  await page.locator('#search').fill('Luna');
  assert.equal(await page.locator('.search-hit').count(), 1);
  assert.equal(await page.locator('.search-muted').first().evaluate(e=>getComputedStyle(e).opacity), '0.5');
  await page.locator('#reset').click();
  assert.equal(await page.locator('.stay.normal').count(), 11);
  await page.locator('#location').selectOption(['1','2']);
  assert.equal(await page.locator('.box-head').count(), 10);
  await page.locator('#location').selectOption('1');
  assert.equal(await page.locator('.box-head').count(), 5);
  await page.locator('#reset').click();

  for (const orientation of ['v4','v3']) {
   await page.locator('[data-orientation="'+orientation+'"]').click();
   await page.locator('#queue-toggle').click();
   const card = await page.locator('[data-home-drag="figa,felek"]').boundingBox();
   await page.mouse.move(card.x+30,card.y+15);
   await page.mouse.down();
   await page.mouse.move(card.x+38,card.y+15);
   const target = await page.locator('.box-head[data-box="2"]').boundingBox();
   await page.mouse.move(target.x+target.width/2,target.y+target.height/2,{steps:8});
   await page.mouse.up();
   assert.equal(await page.locator('#target-box').inputValue(),'2');
   assert.equal(await page.locator('.proposal').count(),2);
   assert.equal(await page.locator('[data-pet="figa"].normal').count(),0);
   const dates = await page.locator('.proposal').evaluateAll(es=>es.map(e=>[e.dataset.pet,e.dataset.start,e.dataset.end]));
   await page.locator('#save-move').click();
   for (const [pet,start,end] of dates) {
    assert.deepEqual(await page.locator(`[data-pet="${pet}"].normal`).evaluate(e=>[e.dataset.start,e.dataset.end]),[start,end]);
   }
   await page.locator('#reset').click();
  }
  await page.locator('[data-orientation="v4"]').click();
  await page.locator('[data-pet="luna"].normal').click();
  await page.locator('#begin-move').click();
  await page.locator('.box-head[data-box="2"]').focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('#target-box').inputValue(),'2');
  await page.locator('#cancel-move').click();
  assert.equal(await page.locator('.proposal').count(),0);
  await page.locator('#close-panel').click();
  await page.locator('#queue-toggle').click();
  const card = await page.locator('[data-home-drag="leo"]').boundingBox();
  await page.mouse.move(card.x+30,card.y+15); await page.mouse.down();
  await page.mouse.move(card.x+40,card.y+15);
  await page.keyboard.press('Escape'); await page.mouse.up();
  assert.equal(await page.locator('#queue-toggle').getAttribute('aria-expanded'),'true');
  assert.equal(await page.locator('.proposal').count(),0);
  assert.deepEqual(errors,[]);
  console.log('PASS: toolbar, status toggles, search opacity, reset, locations, household pointer drag in both orientations, unchanged dates, header keyboard move, cancellation.');
 } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exitCode=1;});
