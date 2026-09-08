const {chromium}=require('C:/Users/gabri/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('fs');
const path=require('path');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 const page=await browser.newPage({viewport:{width:430,height:900},deviceScaleFactor:2});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('file:///'+path.resolve('mockup-assets/preview-qa.html').replaceAll('\\','/'));
 const frame=page.frames()[1];
 await frame.locator('#kg-mobile .kg-photo').first().waitFor();
 await frame.evaluate(()=>document.fonts.ready);
 await frame.waitForFunction(()=>Array.from(document.images).filter(i=>i.hasAttribute('src')).every(i=>i.complete));
 console.log('fonts',await frame.evaluate(()=>[...document.fonts].map(f=>({family:f.family,status:f.status}))));
 console.log('images',await frame.locator('#kg-mobile img[src]').evaluateAll(imgs=>imgs.map(i=>({alt:i.alt,ok:i.naturalWidth>0}))));
 const root=frame.locator('#kg-mobile');
 await page.screenshot({path:'mockup-assets/first-screen.png'});
 const height=Math.ceil(await root.evaluate(e=>e.getBoundingClientRect().height));
 await page.locator('iframe').evaluate((e,h)=>e.style.height=h+'px',height);
 await page.setViewportSize({width:430,height:height+32});
 await root.screenshot({path:'mockup-assets/kocie-gniazdko-mobile-full.png'});
 await frame.locator('.kg-menu-toggle').click();
 if(!await frame.locator('#kg-menu').isVisible())throw Error('Menu failed');
 await frame.locator('#kg-menu a[href="#kg-gallery"]').click();
 if(await frame.locator('#kg-menu').isVisible())throw Error('Menu close failed');
 await frame.locator('[data-photo="0"]').click();
 if(!await frame.locator('dialog').isVisible())throw Error('Gallery failed');
 await frame.locator('[data-dir="1"]').click();
 if(await frame.locator('dialog [aria-live]').textContent()!=='2 / 4')throw Error('Gallery next failed');
 await page.keyboard.press('Escape');
 await frame.locator('details').nth(1).locator('summary').click();
 if(await frame.locator('details').nth(1).getAttribute('open')===null)throw Error('FAQ failed');
 for(const width of [320,390]){
  await frame.locator('#kg-mobile').evaluate((e,w)=>e.style.maxWidth=w+'px',width);
  console.log('layout',await root.evaluate(e=>({width:e.clientWidth,scrollWidth:e.scrollWidth,overflow:[...e.querySelectorAll('*')].filter(x=>x.getBoundingClientRect().width&&x.getBoundingClientRect().right>e.getBoundingClientRect().right+1).map(x=>x.className)})));
 }
 console.log('pageErrors',errors);
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
