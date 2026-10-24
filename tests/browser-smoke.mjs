import {chromium} from 'playwright-core';
import {resolve} from 'node:path';
import {mkdirSync,readFileSync} from 'node:fs';
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
 await page.locator('[data-fri-lab="option"] input[type="range"]').evaluate(el=>{el.value='150';el.dispatchEvent(new Event('input',{bubbles:true}))});
 assert.ok((await page.locator('[data-fri-lab="option"] [data-fri-result]').innerText()).includes('42'));
 // 5.0.12: visible scenario, wrong answer -> due now, corrected answer -> due tomorrow.
 await page.locator('.study-left [data-studylesson="R-01"]').click();
 await page.locator('#v5InsightBtn').click();
 await page.waitForSelector('[data-fri-trap="R-01-0"]');
 assert.ok((await page.locator('.fri-peer-practice').textContent()).includes('20 дней'),'contextual exercise included');
 const practiceColors=await page.locator('.fri-card').evaluateAll(els=>els.map(el=>getComputedStyle(el).backgroundColor));
 assert.ok(practiceColors.every(c=>c!=='rgb(255, 255, 255)'),'all learning cards must use dark style');
 
 await page.locator('[data-fri-trap="R-01-0"][data-answer="true"]').click();
 assert.ok((await page.locator('#fri-trap-feedback').innerText()).includes('Ошибка'));
 await page.locator('.study-left [data-open-syllabus]').click();
 await page.locator('dialog [data-fri-syllabus-mode="review"]').click();
 assert.ok((await page.locator('dialog [data-fri-syllabus-lesson="R-01"]').count())>=1,'failed topic should be due');
 await page.locator('dialog [data-fri-close]').click();
 await page.locator('[data-fri-trap="R-01-0"][data-answer="false"]').click();
 assert.ok((await page.locator('#fri-trap-feedback').innerText()).includes('Верно'));
 const interval=await page.evaluate(()=>friLearning.review['R-01-0']);
 assert.equal(interval.streak,1);
 assert.ok(Date.parse(interval.dueAt)>Date.now(),'success schedules next day');
 await page.locator('.study-left [data-open-syllabus]').click();
 await page.locator('dialog [data-fri-syllabus-mode="review"]').click();
 assert.equal(await page.locator('dialog [data-fri-syllabus-lesson="R-01"]').count(),0,'corrected topic not due now');
 await page.locator('dialog [data-fri-close]').click();
 await page.reload({waitUntil:'domcontentloaded'});
 const restored=await page.evaluate(()=>JSON.parse(localStorage.getItem('bacrf_finance_trainer_insights_v1')).review['R-01-0']);
 assert.equal(restored.streak,1,'review schedule survives reload');
 // Export an actual progress file and verify 5.0.12 review data is included.
 const [download]=await Promise.all([page.waitForEvent('download'),page.locator('#export').evaluate(el=>el.click())]);
 const exported=JSON.parse(readFileSync(await download.path(),'utf8'));
 assert.equal(exported.version,3,'backward compatible progress envelope');
 assert.equal(exported.friInsights.review['R-01-0'].streak,1,'scheduled review exported');
 assert.ok(exported.independentPractice?.answers,'independent answers exported');
 // Import round trip after removing the review record.
 await page.evaluate(()=>{delete friLearning.review['R-01-0'];friSave()});
 assert.ok(!(await page.evaluate(()=>friLearning.review['R-01-0'])),'test record removed before import');
 page.once('dialog',d=>d.accept());
 await page.locator('#importFile').setInputFiles({name:'progress.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(exported))});
 await page.waitForFunction(()=>JSON.parse(localStorage.getItem('bacrf_finance_trainer_insights_v1'))?.review?.['R-01-0']?.streak===1);
 assert.equal((await page.evaluate(()=>friLearning.review['R-01-0'])).streak,1,'review schedule restored from import');
 
 await page.evaluate(()=>document.querySelector('[data-tab="learn"]').click());
 await page.waitForSelector('.study-shell');
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
 
 // 320 px smartphone and 768 px tablet must retain usable, non-clipped syllabus.
 for(const w of [320,768]){
  await page.setViewportSize({width:w,height:780});
  const d=await page.locator('dialog.fri-syllabus-dialog').evaluate(el=>el.getBoundingClientRect());
  assert.ok(d.width<=w+2&&d.width>=Math.min(310,w-10),'dialog responsive width '+w+': '+d.width);
 }

 await page.screenshot({path:resolve(root,'test-artifacts','mobile.png'),fullPage:false});
 console.log('PASS browser: desktop sidebar '+JSON.stringify(dims)+', 28 cases, retention, recall intervals, option lab, dark cards, study search, coverage, mobile modal.');
}catch(e){
 await page.screenshot({path:resolve(root,'test-artifacts','failure.png'),fullPage:false}).catch(()=>{});
 throw e;
}finally{await browser.close()}
