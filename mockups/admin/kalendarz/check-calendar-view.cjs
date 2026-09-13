const path=require('node:path'),assert=require('node:assert/strict');
const {chromium}=require(require.resolve('playwright',{paths:[path.resolve(path.dirname(process.execPath),'../node_modules')]}));
(async()=>{const browser=await chromium.launch({channel:'msedge',headless:true});try{
 const page=await browser.newPage({viewport:{width:1024,height:484},locale:'pl-PL'}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(require('node:url').pathToFileURL(path.join(__dirname,'mockup-kalendarz.html')).href);
 await page.locator('#fullscreen').click();
 assert.deepEqual(await page.evaluate(()=>[state.days,state.start]),[14,Date.UTC(2026,8,8)]);
 for(const days of [7,14,30]){
  await page.locator('[data-days="'+days+'"]').click();await page.locator('#today').click();await page.locator('#next').click();
  assert.equal(await page.evaluate(()=>state.start),Date.UTC(2026,8,8+days-2));
  await page.locator('#previous').click();assert.equal(await page.evaluate(()=>state.start),Date.UTC(2026,8,8));
 }
 await page.locator('#reset').click();assert.equal(await page.locator('[data-days="14"]').getAttribute('aria-pressed'),'true');
 assert.equal(await page.locator('.corner small').count(),0);
 assert.equal(await page.locator('.top-axis .location-rule').count(),1);
 assert.ok(await page.locator('.vertical:not(.hide-arrival) .arrival').count()>0);
 assert.ok(await page.locator('.vertical.hide-arrival:not(.hide-departure)').count()>0);
 await page.locator('[data-orientation="v3"]').click();
 assert.equal(await page.locator('.left-axis .axis-group').first().evaluate(e=>e.offsetHeight),22);
 assert.equal(await page.locator('.box-head[data-box="1"]').evaluate(e=>e.offsetHeight),44);
 const row=page.locator('[data-pet="luna"].normal');
 assert.equal(await row.locator('.card-copy').evaluate(e=>getComputedStyle(e).display),'flex');
 assert.equal(await row.locator('.owner').evaluate(e=>getComputedStyle(e).whiteSpace),'nowrap');
 for(const orientation of ['v3','v4']){
  await page.locator('[data-orientation="'+orientation+'"]').click();
  for(const status of await page.locator('[data-status]').all())await status.click();
  const before=await page.locator('#calendar-empty').boundingBox();
  await page.locator('#viewport').evaluate(e=>{e.scrollLeft=350;e.scrollTop=150});
  assert.deepEqual(await page.locator('#calendar-empty').boundingBox(),before);
  await page.locator('#reset').click();
 }
 assert.deepEqual(errors,[]);console.log('PASS: 14-day default, yesterday start, overlapping periods, compact axes, adaptive content, stationary empty state in both orientations.');
 }finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1});
