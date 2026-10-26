import {chromium} from 'playwright-core';
import {resolve} from 'node:path';
import {readFileSync,mkdirSync} from 'node:fs';
import assert from 'node:assert/strict';
const root=resolve(import.meta.dirname,'..');mkdirSync(resolve(root,'test-artifacts'),{recursive:true});
const browser=await chromium.launch({executablePath:process.env.CHROME_BIN||'/usr/bin/google-chrome',headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
const page=await browser.newPage({viewport:{width:1366,height:768}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
try{
 await page.goto('file://'+resolve(root,'index.html'),{waitUntil:'domcontentloaded'});
 await page.evaluate(()=>goStudyLesson('S1-01',0));await page.locator('#v5FullBtn').click();
 assert.ok((await page.locator('.study-paper').textContent()).includes('Пассив баланса'));
 assert.equal(await page.locator('.v5-extra-check').count(),2);assert.equal(await page.locator('.v5-extra-check[open]').count(),0);
 await page.locator('.v5-extra-check').first().locator('summary').click();assert.ok((await page.locator('.v5-extra-check').first().textContent()).includes('сами по себе не создают выручку'));
 await page.evaluate(()=>goStudyLesson('S1-09',0));await page.locator('#v5FullBtn').click();
 assert.equal(await page.locator('.v5-formula').count(),3);
 await page.locator('.v5-formula').nth(1).locator('summary').click();assert.ok((await page.locator('.v5-formula').nth(1).textContent()).includes('EBITDA'));
 const study=await page.evaluate(()=>{
  const i=STUDY_MAP.get('S1-09').blocks[0].qids.indexOf('Q13');getStudyBlock().answers.Q13={text:'Старый письменный ответ',rubric:[0,1,2],checked:true,revealed:true,score:1};
  studyNav.phase='practice';studyNav.index=i;render();const a=getStudyAnswer('Q13');return {text:a.text,score:a.score,old:a.previousReviewResult.score,recheck:a.needsReviewRecheck};
 });
 assert.deepEqual(study,{text:'Старый письменный ответ',score:null,old:1,recheck:true});
 assert.equal(await page.locator('#studyText').inputValue(),'Старый письменный ответ');
 await page.locator('#studyReveal').click();assert.equal(await page.locator('[data-studyrubric]').count(),4);
 for(const box of await page.locator('[data-studyrubric]').all())await box.check();
 await page.locator('#studyGradeOpen').click();assert.equal(await page.evaluate(()=>getStudyAnswer('Q13').score),1);assert.equal(await page.evaluate(()=>getStudyAnswer('Q13').previousReviewResult.score),1);
 await page.evaluate(()=>{goStudyLesson('S1-09',0);studyNav.phase='theory';render()});await page.locator('#v5FullBtn').click();
 await page.locator('#study-section-solutions').locator('summary').click();assert.ok((await page.locator('#study-section-solutions').textContent()).includes('Interest Coverage Ratio'));
 await page.evaluate(()=>{
  session={version:2,ids:['Q10'],mode:'practice',pos:0,responses:{Q10:{choice:[],text:'Нет: базис может измениться против позиции и привести к убытку.',rubric:[0,1,2],revealed:true,checked:true}},grades:{Q10:{score:1,strict:true,type:'rubric',points:3,total:3}},orders:{Q10:[]},done:false,started:Date.now(),deadline:null,recorded:{Q10:true}};
  session=FinanceReview.migrateSession(session);tab='quiz';persist();render();
 });
 assert.equal(await page.locator('.criterion').count(),2);
 for(const box of await page.locator('.criterion').all())await box.check();
 await page.locator('[data-save-rubric="Q10"]').click();assert.equal(await page.evaluate(()=>session.grades.Q10.strict),true);assert.equal(await page.evaluate(()=>session.reviewHistory.Q10.grade.total),3);
 const [download]=await Promise.all([page.waitForEvent('download'),page.locator('#export').evaluate(e=>e.click())]);
 const data=JSON.parse(readFileSync(await download.path(),'utf8'));assert.equal(data.session.reviewHistory.Q10.grade.total,3);
 page.once('dialog',d=>d.accept());await page.locator('#importFile').setInputFiles({name:'teacher-review.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(data))});
 await page.waitForFunction(()=>document.querySelector('#toast').textContent.includes('импортированы'));
 assert.equal(await page.evaluate(()=>session.grades.Q10.strict),true);assert.equal(await page.evaluate(()=>session.reviewHistory.Q10.grade.total),3);
 assert.equal(await page.evaluate(()=>getStudyBlock('S1-09',0).answers.Q13.previousReviewResult.score),1);
 assert.deepEqual(errors,[]);console.log('PASS teacher browser: balance and extra checks, new metric formula drills, corrected Q13 solutions, course/session rubric migration and actual export/import retain history.');
}catch(e){await page.screenshot({path:resolve(root,'test-artifacts','teacher-review-failure.png')}).catch(()=>{});throw e}finally{await browser.close()}
