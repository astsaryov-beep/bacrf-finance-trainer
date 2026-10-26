import {chromium} from 'playwright-core';
import {resolve} from 'node:path';
import {readFileSync,mkdirSync} from 'node:fs';
import assert from 'node:assert/strict';
const root=resolve(import.meta.dirname,'..');mkdirSync(resolve(root,'test-artifacts'),{recursive:true});
const browser=await chromium.launch({executablePath:process.env.CHROME_BIN||'/usr/bin/google-chrome',headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
const page=await browser.newPage({viewport:{width:1366,height:768}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
try{
 await page.goto('file://'+resolve(root,'index.html'),{waitUntil:'domcontentloaded'});
 for(const [lesson,block,count,term] of [['S1-07',0,4,'бессрочн'],['S1-07',1,3,'Выпуклость'],['S1-08',0,4,'Форвардная'],['S1-08',1,1,'РЕПО'],['S1-09',0,4,'Z-spread'],['S1-09',1,6,'CLR']]){
  await page.evaluate(([l,b])=>goStudyLesson(l,b),[lesson,block]);await page.locator('#v5FullBtn').click();
  assert.equal(await page.locator('.v5-formula').count(),count,lesson+' '+block);
  assert.ok((await page.locator('.study-paper').textContent()).toLowerCase().includes(term.toLowerCase()));
 }
 await page.locator('.v5-formula').last().locator('summary').click();
 assert.ok((await page.locator('.v5-formula').last().textContent()).includes('OpEx'));
 await page.locator('#study-section-solutions').locator('summary').click();
 assert.ok((await page.locator('#study-section-solutions').textContent()).includes('изымает ликвидность'));
 await page.screenshot({path:resolve(root,'test-artifacts','m03-desktop.png')});
 await page.evaluate(()=>{
  getStudyBlock('S1-09',1).answers.Q07={text:'Исторический ответ Q07',rubric:[0,1,2],checked:true,revealed:true,score:1};
  studyNav.phase='practice';studyNav.index=STUDY_MAP.get('S1-09').blocks[1].qids.indexOf('Q07');render();
 });
 assert.equal(await page.locator('#studyText').inputValue(),'Исторический ответ Q07');
 assert.equal(await page.evaluate(()=>getStudyAnswer('Q07').score),null);
 assert.equal(await page.evaluate(()=>getStudyAnswer('Q07').previousReviewResult.score),1);
 await page.locator('#studyReveal').click();assert.ok((await page.locator('.study-task .feedback').textContent()).includes('изымает ликвидность'));assert.ok((await page.locator('[data-studyrubric]').last().locator('..').textContent()).includes('Объяснён обратный случай'));
 for(const box of await page.locator('[data-studyrubric]').all())await box.check();
 await page.locator('#studyGradeOpen').click();assert.equal(await page.evaluate(()=>getStudyAnswer('Q07').score),1);
 await page.evaluate(()=>{
  session={version:2,ids:['Q07'],mode:'practice',pos:0,responses:{Q07:{choice:[],text:'Прежний ответ в сессии',rubric:[0,1,2],checked:true,revealed:true}},grades:{Q07:{score:1,strict:true,type:'rubric',points:3,total:3}},orders:{Q07:[]},done:false,started:Date.now(),deadline:null,recorded:{Q07:true}};
  FinanceReview.migrateSession(session);tab='quiz';persist();render();
 });
 assert.equal(await page.evaluate(()=>session.grades.Q07),undefined);
 const [download]=await Promise.all([page.waitForEvent('download'),page.locator('#export').evaluate(e=>e.click())]);
 const data=JSON.parse(readFileSync(await download.path(),'utf8'));assert.equal(data.session.reviewHistory.Q07.grade.score,1);
 page.once('dialog',d=>d.accept());await page.locator('#importFile').setInputFiles({name:'m03-history.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(data))});
 await page.waitForFunction(()=>document.querySelector('#toast').textContent.includes('импортированы'));
 assert.equal(await page.evaluate(()=>session.reviewHistory.Q07.response.text),'Прежний ответ в сессии');
 assert.equal(await page.evaluate(()=>getStudyBlock('S1-09',1).answers.Q07.previousReviewResult.score),1);
 await page.setViewportSize({width:390,height:844});await page.evaluate(()=>goStudyLesson('S1-09',1));await page.locator('#v5FullBtn').click();
 assert.equal(await page.locator('.v5-formula').count(),6);
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 await page.screenshot({path:resolve(root,'test-artifacts','m03-mobile.png')});
 assert.deepEqual(errors,[]);console.log('PASS M03 browser: six lesson formula displays, effective Q07 prep, fresh recheck and actual export/import preserving both histories, mobile width.');
}catch(e){await page.screenshot({path:resolve(root,'test-artifacts','m03-failure.png')}).catch(()=>{});throw e}finally{await browser.close()}
