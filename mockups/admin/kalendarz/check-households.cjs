const path=require('node:path'),assert=require('node:assert/strict');
const {chromium}=require(require.resolve('playwright',{paths:[path.resolve(path.dirname(process.execPath),'../node_modules')]}));
(async()=>{const browser=await chromium.launch({channel:'msedge',headless:true});try{
 const page=await browser.newPage({viewport:{width:1024,height:484}});page.setDefaultTimeout(5000);const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(require('node:url').pathToFileURL(path.join(__dirname,'mockup-kalendarz.html')).href);await page.locator('#fullscreen').click();
 assert.ok(await page.locator('.household svg').count()>0);
 assert.ok((await page.locator('.box-head[data-box="7"]').textContent()).includes('z różnych domów'));
 // Split, move back, and merge all three adjacent pieces without changing dates.
 await page.locator('[data-pet="kicia"].normal').click();await page.locator('#begin-move').click();await page.locator('[data-scope="part"]').click();
 await page.locator('#move-end').fill('2026-09-14');await page.locator('#target-box').selectOption('1',{force:true});await page.locator('#save-move').click();
 assert.equal(await page.locator('[data-pet="kicia"].normal').count(),3);
 const moved=await page.evaluate(()=>stays.find(s=>s.pet==='kicia'&&s.box===1).id);
 await page.locator('[data-stay="'+moved+'"].normal').click();await page.locator('#begin-move').click();await page.locator('#target-box').selectOption('3',{force:true});await page.locator('#save-move').click();
 assert.equal(await page.locator('[data-pet="kicia"].normal').count(),1);assert.deepEqual(await page.evaluate(()=>{const s=stays.find(s=>s.pet==='kicia');return [s.start,s.end,s.box]}),[Date.UTC(2026,8,10,14),Date.UTC(2026,8,15,10),3]);
 await page.locator('#reset').click();await page.locator('[data-pet="luna"].normal').click();await page.locator('[data-companion="mela"]').click();await page.locator('#begin-move').click();
 assert.ok((await page.locator('.pet-heading h3').textContent()).includes('Mela'));
 await page.locator('#target-box').selectOption('3',{force:true});assert.equal(await page.locator('.proposal').count(),2);
 assert.equal(await page.locator('.box-head[data-box="3"].mixed-box').count(),1);assert.equal(await page.locator('.mixed-peers .warning-icon').count(),1);
 // A second pointer drag moves the entire proposed household, in either orientation.
 for(const orientation of ['v4','v3']){
  await page.locator('[data-orientation="'+orientation+'"]').click();
  const proposal=page.locator('[data-pet="luna"].proposal');await proposal.scrollIntoViewIfNeeded();const r=await proposal.boundingBox();
  await page.mouse.move(r.x+15,r.y+15);await page.mouse.down();await page.mouse.move(r.x+24,r.y+15);
  const head=page.locator('.box-head[data-box="5"]');await head.scrollIntoViewIfNeeded();const h=await head.boundingBox();
  await page.mouse.move(h.x+h.width/2,h.y+h.height/2,{steps:6});await page.mouse.up();assert.equal(await page.locator('#target-box').inputValue(),'5');assert.equal(await page.locator('.proposal').count(),2);
 }
 assert.ok((await page.locator('.box-head[data-box="5"]').textContent()).includes('z jednego domu'));
 assert.equal(await page.locator('.box-head[data-box="5"].mixed-box').count(),0);
 await page.locator('#save-move').click();assert.deepEqual(await page.evaluate(()=>stays.filter(s=>['luna','mela'].includes(s.pet)).map(s=>s.box)),[5,5]);
 // Popup is out of flow, opens upward, and does not grow the scrolling body.
 await page.locator('[data-orientation="v4"]').click();await page.locator('[data-pet="luna"].normal').click();await page.locator('#begin-move').click();await page.locator('[data-scope="part"]').click();
 await page.locator('#target-toggle').scrollIntoViewIfNeeded();const height=await page.locator('.panel-scroll').evaluate(e=>e.scrollHeight);await page.locator('#target-toggle').click();
 assert.equal(await page.locator('#target-options').evaluate(e=>getComputedStyle(e).position),'fixed');assert.equal(await page.locator('#target-options').getAttribute('data-direction'),'up');assert.equal(await page.locator('.panel-scroll').evaluate(e=>e.scrollHeight),height);
 const list=await page.locator('#target-options').boundingBox(),toggle=await page.locator('#target-toggle').boundingBox();assert.ok(list.y+list.height<=toggle.y);
 if(process.env.HOUSEHOLD_SCREENSHOT)await page.screenshot({path:process.env.HOUSEHOLD_SCREENSHOT});
 assert.deepEqual(errors,[]);console.log('PASS: adjacent merge, household selection, shared/mixed warnings, repeated proposal drag both axes, upward out-of-flow picker.');
 }finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1});
