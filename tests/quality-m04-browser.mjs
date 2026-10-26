import {chromium} from 'playwright-core';
import {resolve} from 'node:path';
import {mkdirSync} from 'node:fs';
import assert from 'node:assert/strict';
const root=resolve(import.meta.dirname,'..');mkdirSync(resolve(root,'test-artifacts'),{recursive:true});
const browser=await chromium.launch({executablePath:process.env.CHROME_BIN||'/usr/bin/google-chrome',headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
const page=await browser.newPage({viewport:{width:1366,height:768}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
try{
 await page.goto('file://'+resolve(root,'index.html'),{waitUntil:'domcontentloaded'});
 for(const [lesson,block,n,term] of [['S1-10',0,3,'ALM'],['S1-10',1,2,'Арбитражное отклонение'],['S2-01',0,1,'Свопцион'],['S2-01',1,0,'Репозитарий'],['S2-02',0,2,'Открытый интерес'],['S2-02',1,4,'Convenience yield']]){
  await page.evaluate(([l,b])=>goStudyLesson(l,b),[lesson,block]);await page.locator('#v5FullBtn').click();
  assert.equal(await page.locator('.v5-formula').count(),n);assert.equal(await page.locator('.v5-extra-check').count(),2);
  assert.ok((await page.locator('.study-paper').textContent()).includes(term));
 }
 assert.equal(await page.locator('.v5-formula[open]').count(),0);
 await page.locator('.v5-formula').last().locator('summary').click();
 assert.ok((await page.locator('.v5-formula').last().textContent()).includes('105,65'));
 await page.screenshot({path:resolve(root,'test-artifacts','m04-carry-desktop.png')});
 await page.evaluate(()=>goStudyLesson('S2-01',0));await page.locator('#v5FullBtn').click();
 assert.ok((await page.locator('.fsc-exam-note').textContent()).includes('Расчётные задания'));
 assert.ok((await page.locator('.fsc-wrap').textContent()).includes('Фьючерс — производный контракт'));
 await page.evaluate(()=>goStudyLesson('S1-10',1));await page.locator('#v5FullBtn').click();
 await page.locator('#study-section-solutions').locator('summary').click();
 assert.ok((await page.locator('#study-section-solutions').textContent()).includes('RUONIA'));
 assert.ok((await page.locator('#study-section-solutions').textContent()).includes('одну или несколько'));
 await page.setViewportSize({width:320,height:844});
 for(const [lesson,block] of [['S1-10',0],['S2-01',1],['S2-02',1]]){
  await page.evaluate(([l,b])=>goStudyLesson(l,b),[lesson,block]);await page.locator('#v5FullBtn').click();
  if(await page.locator('.v5-formula').count())await page.locator('.v5-formula').last().locator('summary').click();
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),lesson+' mobile overflow');
 }
 await page.screenshot({path:resolve(root,'test-artifacts','m04-carry-mobile.png')});
 assert.deepEqual(errors,[]);console.log('PASS M04 browser: six complete teaching blocks, closed checks/formulas, preserved futures basics/exam notes/Q09-Q10 solutions and 320px width.');
}catch(e){await page.screenshot({path:resolve(root,'test-artifacts','m04-failure.png')}).catch(()=>{});throw e}finally{await browser.close()}
