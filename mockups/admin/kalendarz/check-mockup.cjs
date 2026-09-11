// Optional developer check. The HTML itself needs no Node.js or dependencies.
const fs = require('node:fs');
const path = require('node:path');
const {pathToFileURL} = require('node:url');
const assert = require('node:assert/strict');
const modulePaths = [process.env.PLAYWRIGHT_MODULE, 'playwright', path.resolve(path.dirname(process.execPath), '../node_modules/playwright')].filter(Boolean);
let chromium;
for (const name of modulePaths) { try { ({chromium} = require(name)); break; } catch {} }
if (!chromium) throw new Error('Install Playwright or set PLAYWRIGHT_MODULE to its module path.');
(async () => {
 const browser = await chromium.launch({headless: true, channel: process.env.BROWSER_CHANNEL || 'msedge'});
 try {
  const page = await browser.newPage({viewport: {width: 1440, height: 1000}, deviceScaleFactor: 1, locale: 'pl-PL'});
  const errors = []; page.on('pageerror', e => errors.push(e.message));
  await page.goto(pathToFileURL(path.join(__dirname, 'mockup-kalendarz.html')).href);
  await page.evaluate(() => document.fonts.ready);
  assert.equal(await page.locator('.stay.normal').count(), 11);
  assert.equal(await page.locator('.top-axis [data-box]').count(), 10);
  assert.equal(await page.locator('.left-axis .axis-item').count(), 7);
  const dates = await page.locator('.stay.normal').evaluateAll(es => es.map(e => [e.dataset.pet,e.dataset.start,e.dataset.end]));
  await page.screenshot({path: path.join(__dirname, 'kalendarz-html-v4.png'), fullPage: true});
  await page.locator('#location').selectOption('1');
  await page.locator('[data-orientation="v3"]').click();
  assert.equal(await page.locator('.left-axis [data-box]').count(), 5);
  assert.equal(await page.locator('.top-axis .axis-item').count(), 7);
  await page.screenshot({path: path.join(__dirname, 'kalendarz-html-v3.png'), fullPage: true});
  await page.locator('[data-orientation="v4"]').click();
  await page.locator('#location').selectOption('all');
  assert.deepEqual(await page.locator('.stay.normal').evaluateAll(es => es.map(e => [e.dataset.pet,e.dataset.start,e.dataset.end])), dates);
  // Header positions remain pinned while the content scrolls on both axes.
  await page.locator('#viewport').evaluate(e => {e.scrollLeft=350;e.scrollTop=260;});
  const sticky = await page.evaluate(() => ({v:document.querySelector('#viewport').getBoundingClientRect().toJSON(),top:document.querySelector('.top-axis').getBoundingClientRect().toJSON(),left:document.querySelector('.left-axis').getBoundingClientRect().toJSON()}));
  assert.ok(Math.abs(sticky.top.top-sticky.v.top)<3);
  assert.ok(Math.abs(sticky.left.left-sticky.v.left)<3);
  await page.locator('#today').click();
  await page.locator('#location').selectOption('1');
  await page.locator('[data-pet="luna"].normal').click();
  await page.locator('#begin-move').click();
  await page.locator('[name="scope"][value="part"]').check();
  await page.locator('#target-box').selectOption('2');
  const locked = await page.locator('[data-pet="luna"].ghost').evaluate(e=>[e.dataset.start,e.dataset.end]);
  for (const orientation of ['v4','v3']) {
   await page.locator(`[data-orientation="${orientation}"]`).click();
   const rects=await page.evaluate(()=>['ghost','proposal'].map(c=>{const r=document.querySelector('[data-pet="luna"].'+c).getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height};}));
   assert.ok(orientation==='v4'?rects[0].y===rects[1].y&&rects[0].h===rects[1].h:rects[0].x===rects[1].x&&rects[0].w===rects[1].w);
   assert.deepEqual(await page.locator('[data-pet="luna"].proposal').evaluate(e=>[e.dataset.start,e.dataset.end]),locked);
  }
  await page.locator('[data-orientation="v4"]').click();
  await page.locator('#viewport').evaluate(e => e.scrollTop = 380);
  await page.locator('#panel').evaluate(e => e.scrollTop = 260);
  await page.screenshot({path: path.join(__dirname, 'kalendarz-html-przenoszenie.png'), fullPage: true});
  await page.locator('#save-move').click();
  assert.equal(await page.locator('[data-pet="luna"].normal').count(),2);
  assert.equal(await page.locator('.ghost,.proposal').count(),0);
  assert.ok((await page.locator('#toast').textContent()).includes('Box 2'));
  // Cancel does not apply a move. Invalid intervals cannot be saved.
  await page.locator('#reset').click();
  await page.locator('#location').selectOption('1');
  await page.locator('[data-pet="luna"].normal').click();
  await page.locator('#begin-move').click();
  await page.locator('[name="scope"][value="part"]').check();
  await page.locator('#target-box').selectOption('2');
  await page.locator('#move-end').fill('2026-09-12T10:00');
  await page.locator('#move-end').dispatchEvent('change');
  assert.equal(await page.locator('#save-move').isDisabled(),true);
  await page.locator('#cancel-move').click();
  assert.equal(await page.locator('[data-pet="luna"].normal').count(),1);
  await page.locator('#close-panel').click();
  await page.locator('#queue-toggle').click();
  await page.locator('[data-assign="figa,felek"]').click();
  await page.locator('#target-box').selectOption('3');
  await page.locator('#save-move').click();
  assert.equal(await page.locator('[data-pet="figa"].normal').count(),1);
  assert.equal(await page.locator('[data-pet="felek"].normal').count(),1);
  assert.ok((await page.locator('#queue-count').textContent()).includes('2 koty'));
  // Search, period navigation and reset work without a backend.
  await page.locator('#search').fill('nieistniejący kot');
  assert.equal(await page.locator('.stay').count(),0);
  assert.equal(await page.locator('.empty-state').count(),1);
  await page.locator('.empty-state').waitFor({state:'visible'});
  await page.locator('#search').fill('Anna Nowak');
  assert.equal(await page.locator('.stay.normal').count(),2);
  await page.locator('[data-orientation="v3"]').click();
  assert.equal(await page.locator('#search').inputValue(),'Anna Nowak');
  await page.locator('#reset').click();
  await page.locator('#location').selectOption('2');
  await page.locator('#search').fill('Felix');
  assert.equal(await page.locator('.stay').count(),0);
  await page.locator('.empty-state').waitFor({state:'visible'});
  await page.locator('#reset').click();
  await page.locator('[data-days="30"]').click();
  assert.equal(await page.locator('.top-axis .axis-item').count(),30);
  await page.locator('#next').click();
  assert.equal(await page.locator('.stay').count(),0);
  await page.locator('#today').click();
  await page.locator('#fullscreen').click();
  assert.equal(await page.locator('.sidebar').isVisible(),false);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.sidebar').isVisible(),true);
  await page.locator('#reset').click();
  await page.locator('[data-orientation="v4"]').click();
  // A real pointer drag changes only the box and waits for explicit save.
  await page.setViewportSize({width:1920,height:1100});
  await page.locator('#location').selectOption('1');
  const beforeDrag=await page.locator('[data-pet="luna"].normal').evaluate(e=>[e.dataset.start,e.dataset.end]);
  const grip=await page.locator('[data-drag="luna"]').boundingBox();
  await page.mouse.move(grip.x+12,grip.y+12);await page.mouse.down();
  await page.mouse.move(grip.x+22,grip.y+12);
  const target=await page.locator('.box-head[data-box="5"]').boundingBox();
  await page.mouse.move(target.x+target.width/2,target.y+target.height+50,{steps:8});await page.mouse.up();
  assert.equal(await page.locator('#target-box').inputValue(),'5');
  assert.deepEqual(await page.locator('[data-pet="luna"].proposal').evaluate(e=>[e.dataset.start,e.dataset.end]),beforeDrag);
  assert.equal(await page.locator('[data-pet="mela"].normal').count(),1);
  await page.locator('#save-move').click();
  assert.equal(await page.locator('[data-pet="luna"].normal').count(),1);
  assert.ok((await page.locator('#toast').textContent()).includes('Box 5'));
  await page.locator('#reset').click();
  for (const width of [1920,1024,768,390,320]) {
   await page.setViewportSize({width,height:900});
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`Page overflows at ${width}px`);
  }
  await page.setViewportSize({width:390,height:900});
  await page.locator('#toast').evaluate(e=>e.hidden=true);
  await page.screenshot({path:path.join(__dirname,'kalendarz-html-mobile.png'),fullPage:true});
  assert.deepEqual(errors,[]);
  console.log('PASS: orientation, date geometry, sticky axes, draft/save/cancel, validation, group assignment, filters, periods, fullscreen, responsive widths; no JS errors.');
 } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exitCode=1;});
