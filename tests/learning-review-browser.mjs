import {chromium} from 'playwright-core';
import {resolve} from 'node:path';
import {mkdirSync,readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const root=resolve(import.meta.dirname,'..');
mkdirSync(resolve(root,'test-artifacts'),{recursive:true});
const browser=await chromium.launch({executablePath:process.env.CHROME_BIN||'/usr/bin/google-chrome',headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
const page=await browser.newPage({viewport:{width:1366,height:768}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
try{
 await page.goto('file://'+resolve(root,'index.html'),{waitUntil:'domcontentloaded'});
 const rows=JSON.parse(readFileSync(resolve(root,'docs/audits/data/COURSE_EDITORIAL_REVIEW.json'),'utf8'));
 for(const row of rows){
  await page.evaluate(id=>goStudyLesson(id.slice(0,-2),Number(id.at(-1))),row.id);
  await page.locator('#v5FullBtn').click();
  const expected=await page.evaluate(id=>({mechanism:STUDY_MASTER[id].mechanism[0],application:STUDY_MASTER[id].application[0],facts:STUDY_MASTER[id].summary.facts}),row.id);
  const plain=s=>s.replace(/\*\*/g,'').replace(/\s+/g,' ').trim();
  for(const [field,selector] of [['mechanism','#v5-level-2'],['application','#v5-level-3']]){
   assert.ok(plain(await page.locator(selector).textContent()).includes(plain(expected[field])),'canonical '+field+' unavailable '+row.id);
  }
  const cue=page.locator('.v5-practice-cue');
  assert.ok((await cue.textContent()).includes(row.question),'question inaccessible '+row.id);
  assert.equal(await cue.locator('details[open]').count(),0,'answer must start closed '+row.id);
  await cue.locator('summary').click();
  assert.ok((await cue.locator('details').textContent()).includes(row.answer),'answer differs '+row.id);
  await page.locator('#v5BriefBtn').click();
  const brief=plain(await page.locator('.v5-digest').textContent());
  for(const fact of expected.facts)assert.ok(brief.includes(plain(fact)),'digest fact unavailable '+row.id);
 }
 // The effective editorial key is used in both the catalogue and actual grading.
 await page.evaluate(()=>{tab='catalog';catalogTerm='Что означает IPO для компании?';render()});
 await page.locator('[data-open-answer="EM02"]').click();
 assert.ok((await page.locator('#catalog-EM02').textContent()).includes('A.'));
 await page.evaluate(()=>{session={version:2,ids:['EM02'],mode:'practice',pos:0,responses:{},grades:{},orders:{EM02:[0,1,2,3]},done:false,started:Date.now(),deadline:null,recorded:{}};tab='quiz';render()});
 await page.locator('input[name="qoption"][value="0"]').check();
 await page.locator('#check').click();
 assert.equal(await page.evaluate(()=>session.grades.EM02.strict),true);
 // Saving and restoring a legacy version-3 concept attempt retains it and regrades the old IPO key.
 await page.evaluate(()=>{session.version=3;session.grades.EM02={score:0,strict:false};persist()});
 await page.reload({waitUntil:'domcontentloaded'});
 assert.deepEqual(await page.evaluate(()=>({version:session.version,strict:session.grades.EM02.strict,previous:session.grades.EM02.previousReviewGrade.strict})),{version:2,strict:true,previous:false});
 // Old course answers are regraded for display, but cannot prove fresh understanding.
 const courseMigration=await page.evaluate(()=>{
  const l=STUDY_LESSONS.find(l=>l.blocks.some(b=>b.qids.includes('EM02'))),i=l.blocks.findIndex(b=>b.qids.includes('EM02'));
  goStudyLesson(l.id,i);getStudyBlock().answers.EM02={selected:[0],checked:true,score:0};
  const a=getStudyAnswer('EM02');return {score:a.score,previous:a.previousReviewScore,recheck:a.needsReviewRecheck};
 });
 assert.deepEqual(courseMigration,{score:1,previous:0,recheck:true});
 await page.evaluate(()=>{studyNav.phase='practice';studyNav.index=STUDY_MAP.get(studyNav.lessonId).blocks[studyNav.block].qids.indexOf('EM02');render()});
 await page.locator('#studyRecheck').click();
 await page.locator('input[name="studyAnswer"][value="0"]').check();
 await page.locator('#studyCheck').click();
 assert.deepEqual(await page.evaluate(()=>({score:getStudyAnswer('EM02').score,recheck:getStudyAnswer('EM02').needsReviewRecheck})),{score:1,recheck:false});
 // Actual diagnostics button starts with another question and survives reload.
 const family=await page.evaluate(()=>{
  progress={};studyData.blocks={};const q=EFFECTIVE_BANK.find(q=>q.type==='single'&&FAMILIES.get(q.conceptFamily)?.length>=3);
  progress[q.id]={tries:1,last:false,lastScore:0,when:'2026-10-20T10:00:00Z',lastWrongAt:'2026-10-20T10:00:00Z',lastChoices:[q.options.findIndex((_,i)=>!q.correct.includes(i))]};
  tab='stats';render();return {id:q.id,family:q.conceptFamily};
 });
 await page.locator('[data-review-concept="'+family.family+'"]').click();
 const first=await page.evaluate(()=>session.ids[0]);assert.notEqual(first,family.id);
 await page.reload({waitUntil:'domcontentloaded'});
 assert.equal(await page.evaluate(()=>session.ids[0]),first);
 // Historical failures from the two learning modes are combined instead of lost.
 const merged=await page.evaluate(()=>{
  const q=EFFECTIVE_BANK.find(q=>q.id!=='EM02');progress={[q.id]:{tries:1,last:false,lastScore:0,when:'2026-10-24T10:00:00Z'}};
  studyData.blocks.test={answers:{[q.id]:{checked:true,score:1,reviewedAt:'2026-10-25T10:00:00Z'}}};
  return reviewEvidence()[q.id];
 });
 assert.equal(merged.last,true);assert.equal(merged.lastWrongAt,'2026-10-24T10:00:00Z');
 // The existing download/import path carries the concept evidence and session.
 const [download]=await Promise.all([page.waitForEvent('download'),page.locator('#export').evaluate(e=>e.click())]);
 const exported=JSON.parse(readFileSync(await download.path(),'utf8'));
 page.once('dialog',d=>d.accept());
 await page.locator('#importFile').setInputFiles({name:'review.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(exported))});
 await page.waitForFunction(()=>document.querySelector('#toast').textContent.includes('импортированы'));
 assert.equal(await page.evaluate(()=>session.ids[0]),first);
 assert.deepEqual(errors,[],'uncaught runtime errors');
 console.log('PASS learning browser: 96 canonical mechanisms/examples/digests and disclosed answers, IPO catalogue/grading, legacy session and course migration, alternate question, cross-mode failure history, real export/import.');
}catch(e){await page.screenshot({path:resolve(root,'test-artifacts','learning-review-failure.png'),fullPage:false}).catch(()=>{});throw e}
finally{await browser.close()}
