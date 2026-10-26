import {chromium} from 'playwright-core';
import {resolve} from 'node:path';
import {readFileSync,mkdirSync} from 'node:fs';
import assert from 'node:assert/strict';
const root=resolve(import.meta.dirname,'..');mkdirSync(resolve(root,'test-artifacts'),{recursive:true});
const browser=await chromium.launch({executablePath:process.env.CHROME_BIN||'/usr/bin/google-chrome',headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
const page=await browser.newPage({viewport:{width:1366,height:768}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
try{
 await page.goto('file://'+resolve(root,'index.html'),{waitUntil:'domcontentloaded'});
 for(const [lesson,block,n,word] of [['S2-03',0,2,'заблокирована'],['S2-03',1,2,'окончательная'],['S2-04',0,2,'TOD'],['S2-04',1,3,'call даёт'],['S2-05',0,2,'классификац'],['S2-05',1,2,'MIACR']]){
  await page.evaluate(([l,b])=>goStudyLesson(l,b),[lesson,block]);await page.locator('#v5FullBtn').click();assert.equal(await page.locator('.v5-formula').count(),n);assert.equal(await page.locator('.v5-extra-check').count(),2);assert.equal(await page.locator('[data-mc-question]').count(),2);assert.ok((await page.locator('.study-paper').textContent()).includes(word));
 }
 for(const [lesson,block,id,n] of [['S2-03',0,'PO05',1],['S2-05',1,'Q15',2]]){
  await page.evaluate(([l,b,id])=>{goStudyLesson(l,b);getStudyBlock().answers[id]={text:'Исторический текст '+id,rubric:[0,1,2],checked:true,revealed:true,score:1};studyNav.phase='practice';studyNav.index=STUDY_MAP.get(l).blocks[b].qids.indexOf(id);render();},[lesson,block,id]);
  assert.equal(await page.locator('#studyText').inputValue(),'Исторический текст '+id);assert.equal(await page.evaluate(id=>getStudyAnswer(id).previousReviewResult.score,id),1);
  await page.locator('#studyReveal').click();assert.equal(await page.locator('[data-studyrubric]').count(),n);
  for(const box of await page.locator('[data-studyrubric]').all())await box.check();await page.locator('#studyGradeOpen').click();assert.equal(await page.evaluate(id=>getStudyAnswer(id).score,id),1);
 }
 await page.evaluate(()=>{session={version:2,ids:['Q15','PO05'],mode:'practice',pos:0,responses:{Q15:{choice:[],text:'Старая сессия Q15',rubric:[0,1,2],checked:true},PO05:{choice:[],text:'Старая сессия PO05',rubric:[0,1,2],checked:true}},grades:{Q15:{score:1,strict:true,type:'rubric'},PO05:{score:1,strict:true,type:'rubric'}},orders:{},done:false,started:Date.now(),deadline:null,recorded:{}};FinanceReview.migrateSession(session);tab='quiz';persist();render();});
 const [download]=await Promise.all([page.waitForEvent('download'),page.locator('#export').evaluate(e=>e.click())]);const data=JSON.parse(readFileSync(await download.path(),'utf8'));
 for(const id of ['Q15','PO05'])assert.equal(data.session.reviewHistory[id].grade.score,1);
 page.once('dialog',d=>d.accept());await page.locator('#importFile').setInputFiles({name:'m05-history.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(data))});await page.waitForFunction(()=>document.querySelector('#toast').textContent.includes('импортированы'));
 assert.equal(await page.evaluate(()=>session.reviewHistory.PO05.response.text),'Старая сессия PO05');
 await page.evaluate(()=>goStudyLesson('S2-04',1));await page.locator('#v5FullBtn').click();await page.locator('.v5-formula').last().locator('summary').click();await page.screenshot({path:resolve(root,'test-artifacts','m05-hedge-desktop.png')});
 await page.setViewportSize({width:320,height:844});for(const [l,b] of [['S2-03',1],['S2-04',1],['S2-05',1]]){await page.evaluate(([l,b])=>goStudyLesson(l,b),[l,b]);await page.locator('#v5FullBtn').click();await page.locator('.v5-formula').last().locator('summary').click();assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),l+' overflow');}
 await page.screenshot({path:resolve(root,'test-artifacts','m05-rates-mobile.png')});assert.deepEqual(errors,[]);
 console.log('PASS M05 browser:6 complete source-repaired blocks,12 multi checks, Q15/PO05 fresh self-review and actual export/import retaining both histories, desktop and320px.');
}catch(e){await page.screenshot({path:resolve(root,'test-artifacts','m05-failure.png')}).catch(()=>{});throw e}finally{await browser.close()}
