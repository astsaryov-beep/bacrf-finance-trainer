import {chromium} from 'playwright-core';
import {resolve} from 'node:path';
import {mkdirSync} from 'node:fs';
import assert from 'node:assert/strict';

const root=resolve(import.meta.dirname,'..');
mkdirSync(resolve(root,'test-artifacts'),{recursive:true});
const browser=await chromium.launch({
  executablePath:process.env.CHROME_BIN||'/usr/bin/google-chrome',
  headless:true,args:['--no-sandbox','--disable-dev-shm-usage']
});
const page=await browser.newPage({viewport:{width:1366,height:768}});
page.on('pageerror',e=>console.error('PAGE ERROR:',e.message));
try{
 await page.goto('file://'+resolve(root,'index.html'),{waitUntil:'domcontentloaded',timeout:60000});
 await page.waitForSelector('[data-tab="learn"]',{timeout:25000});
 await page.evaluate(()=>document.querySelector('[data-tab="learn"]').click());
 await page.waitForSelector('.study-shell',{timeout:25000});
 const nav=page.locator('.study-left');
 assert.ok(await nav.isVisible(),'desktop navigator visible');
 const dims=await page.locator('.study-left .study-menu').evaluate(el=>{
  const rect=el.getBoundingClientRect();
  return {client:el.clientHeight,scroll:el.scrollHeight,height:rect.height,overflow:getComputedStyle(el).overflowY};
 });
 assert.ok(dims.client>80,'navigation should have usable height');
 assert.equal(dims.overflow,'auto');
 assert.ok(await page.locator('.study-left .study-head').isVisible(),'header stays visible');
 assert.ok(await page.locator('.study-left .study-source-shortcut').isVisible(),'sources stay visible');
 await page.locator('.study-left [data-open-syllabus]').click();
 await page.waitForSelector('dialog.fri-syllabus-dialog[open]');
 await page.locator('dialog [data-fri-syllabus-mode="coverage"]').click();
 assert.ok((await page.locator('dialog [data-fri-syllabus-lesson]').count())>=17);
 await page.locator('dialog [data-fri-syllabus-mode="registry"]').click();
 await page.locator('dialog .fri-syllabus-search').fill('дюрация');
 assert.ok((await page.locator('dialog [data-fri-syllabus-lesson]').count())>0);
 await page.locator('dialog [data-fri-close]').click();
 await page.locator('.study-left [data-studylesson="S2-09"]').click();
 await page.waitForSelector('#v5InsightBtn');
 await page.locator('#v5InsightBtn').click();
 await page.waitForSelector('[data-fri-lab="option"]');
 const cardBg=await page.locator('.fri-card').first().evaluate(el=>getComputedStyle(el).backgroundColor);
 assert.notEqual(cardBg,'rgb(255, 255, 255)','dark card expected');
 await page.locator('[data-fri-lab="option"] input[type="range"]').fill('150');
 assert.ok((await page.locator('[data-fri-lab="option"] [data-fri-result]').innerText()).includes('42'));
 await page.screenshot({path:resolve(root,'test-artifacts','desktop.png'),fullPage:false});
 
 await page.setViewportSize({width:390,height:844});
 await page.reload({waitUntil:'domcontentloaded',timeout:60000});
 await page.evaluate(()=>document.querySelector('[data-tab="learn"]').click());
 await page.locator('.study-mobile-nav > summary').click();
 assert.ok(await page.locator('.study-mobile-nav .study-head').isVisible());
 await page.locator('.study-mobile-nav [data-open-syllabus]').click();
 await page.waitForSelector('dialog.fri-syllabus-dialog[open]');
 const width=await page.locator('dialog.fri-syllabus-dialog').evaluate(el=>el.getBoundingClientRect().width);
 assert.ok(width>=370&&width<=395,'mobile dialog width '+width);
 await page.screenshot({path:resolve(root,'test-artifacts','mobile.png'),fullPage:false});
 console.log('PASS browser: desktop sidebar '+JSON.stringify(dims)+', option lab, dark cards, study search, coverage, mobile modal.');
}catch(e){
 await page.screenshot({path:resolve(root,'test-artifacts','failure.png'),fullPage:false}).catch(()=>{});
 throw e;
}finally{await browser.close()}
