import {chromium} from 'playwright-core';
import {resolve} from 'node:path';
import {readFileSync,mkdirSync} from 'node:fs';
import assert from 'node:assert/strict';
const root=resolve(import.meta.dirname,'..');mkdirSync(resolve(root,'test-artifacts'),{recursive:true});
const browser=await chromium.launch({executablePath:process.env.CHROME_BIN||'/usr/bin/google-chrome',headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
const page=await browser.newPage({viewport:{width:1366,height:768}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
try{
 await page.goto('file://'+resolve(root,'index.html'),{waitUntil:'domcontentloaded'});
 await page.evaluate(()=>{goStudyLesson('S2-04',1);getStudyBlock().complete=true;getStudyBlock().answers.PO01={text:'Прежний ответ',checked:true,score:1};studyNav.phase='theory';render();});
 const id='MC-S2-04-1-2',card=page.locator(`[data-mc-question="${id}"]`);await card.locator('summary').click();assert.equal(await card.locator('.feedback').count(),0);
 const correct=await page.evaluate(id=>BANK_MAP.get(id).correct,id);await card.locator(`[data-mc-option][value="${correct[0]}"]`).check();await card.locator('[data-mc-check]').click();assert.equal(await page.evaluate(id=>getStudyAnswer(id).score,id),0,'a partial set must fail strict multiple choice');assert.equal(await card.locator('.feedback li').count(),5);
 await card.locator('[data-mc-retry]').click();for(const i of correct)await card.locator(`[data-mc-option][value="${i}"]`).check();await card.locator('[data-mc-check]').click();assert.equal(await page.evaluate(id=>getStudyAnswer(id).score,id),1);assert.equal(await page.evaluate(()=>getStudyBlock().answers.PO01.text),'Прежний ответ');assert.equal(await page.evaluate(()=>getStudyBlock().complete),true,'supplement does not reset old completion');
 const [download]=await Promise.all([page.waitForEvent('download'),page.locator('#export').evaluate(e=>e.click())]);const data=JSON.parse(readFileSync(await download.path(),'utf8'));page.once('dialog',d=>d.accept());await page.locator('#importFile').setInputFiles({name:'mc-progress.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(data))});await page.waitForFunction(()=>document.querySelector('#toast').textContent.includes('импортированы'));
 assert.equal(await page.evaluate(id=>studyData.blocks['S2-04_1'].answers[id].score,id),1);
 await page.evaluate(()=>{tab='quiz';render();});
 await page.locator('#mode').selectOption('exam');await page.locator('#start').click();
 // Reproducible expanded-pool ticket through the actual runtime bank; the
 // following UI/self-assessment/export/reload tests exercise reused open tasks.
 await page.evaluate(()=>{const selected=ExamProfile.choose(EFFECTIVE_BANK,0);if(selected.error)throw new Error(selected.error);session.ids=selected.items.map(q=>q.id);session.orders=selected.orders;session.examProfile=selected.profile;persist();render();});
 const counts=await page.evaluate(()=>({n:session.ids.length,open:session.ids.map(id=>BANK_MAP.get(id)).filter(q=>q.type==='open').length,multi:session.ids.map(id=>BANK_MAP.get(id)).filter(q=>q.type==='multi').length,bad:session.ids.map(id=>BANK_MAP.get(id)).filter(q=>q.numeric||q.type==='single'||['BO03','EO01','PO03','V2-032','V2-050','V2-068'].includes(q.id)).length}));assert.deepEqual(counts,{n:50,open:25,multi:25,bad:0});
 await page.evaluate(()=>{session.pos=session.ids.findIndex(id=>BANK_MAP.get(id).type==='multi');render();});assert.ok(await page.locator('input[name="qoption"][type="checkbox"]').count()>1);
 await page.screenshot({path:resolve(root,'test-artifacts','exam-multi-desktop.png')});
 await page.reload();assert.equal(await page.evaluate(()=>session.ids.length),50,'new session survives reload');
 // New profile metadata, strict result and explicit self-assessment through the real UI.
 const profileBefore=await page.evaluate(()=>JSON.stringify({profile:session.examProfile,ids:session.ids,orders:session.orders}));
 assert.ok(await page.evaluate(()=>session.examProfile.id===ExamProfile.id));
 await page.evaluate(()=>{tab='quiz';render();});
 assert.equal(await page.locator('[data-question-theory]').count(),0,'unfinished mock does not reveal theory links');
 const writtenId=await page.evaluate(()=>{
  for(const id of session.ids){const q=BANK_MAP.get(id);if(q.type==='multi')session.responses[id]={choice:q.correct.slice(),confidence:2};}
  const id=session.ids.find(id=>BANK_MAP.get(id).type==='open'&&ExamAdmission.entries[id]?.examEligible);if(!id)throw new Error('Expanded mock must exercise a reused open answer');session.responses[id]={text:'Исходный ответ до показа образца.',confidence:1};session.pos=session.ids.indexOf(id);persist();render();return id;
 });
 await page.locator('#endEarly').click();page.once('dialog',d=>d.accept());await page.locator('#submitExam').click();
 assert.equal(await page.evaluate(()=>ExamProfile.summary(session,BANK_MAP).verified),25);
 assert.equal(await page.evaluate(()=>ExamProfile.summary(session,BANK_MAP).strict),25);
 assert.equal(await page.evaluate(()=>ExamProfile.summary(session,BANK_MAP).unverified),25);
 assert.match(await page.locator('.exam-model-summary').innerText(),/Автопроверка/);
 const result=page.locator('[data-result-question="'+writtenId+'"]');if((await result.getAttribute('open'))===null)await result.locator('summary').first().click();
 await result.locator('.criterion').first().check();await result.locator('[data-save-rubric]').click();
 assert.equal(await page.evaluate(()=>ExamProfile.summary(session,BANK_MAP).strict),25,'partial open cannot add strict credit');
 const resultAgain=page.locator('[data-result-question="'+writtenId+'"]');if((await resultAgain.getAttribute('open'))===null)await resultAgain.locator('summary').first().click();
 for(const criterion of await resultAgain.locator('.criterion').all())await criterion.check();await resultAgain.locator('[data-save-rubric]').click();
 assert.equal(await page.evaluate(()=>ExamProfile.summary(session,BANK_MAP).strict),26);
 assert.equal(await page.evaluate(()=>ExamProfile.summary(session,BANK_MAP).selfFull),1);
 assert.match(await page.locator('[data-result-question="'+writtenId+'"] summary .tag').innerText(),/Самооценка/);
 const [profileDownload]=await Promise.all([page.waitForEvent('download'),page.locator('#export').evaluate(e=>e.click())]);
 const profileData=JSON.parse(readFileSync(await profileDownload.path(),'utf8'));page.once('dialog',d=>d.accept());
 await page.locator('#importFile').setInputFiles({name:'exam-profile.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(profileData))});
 await page.waitForFunction(()=>document.querySelector('#toast').textContent.includes('импортированы'));
 assert.equal(await page.evaluate(()=>JSON.stringify({profile:session.examProfile,ids:session.ids,orders:session.orders})),profileBefore);
 assert.equal(await page.evaluate(()=>ExamProfile.summary(session,BANK_MAP).strict),26);
 await page.reload();await page.evaluate(()=>{tab='quiz';render();});assert.equal(await page.evaluate(()=>ExamProfile.summary(session,BANK_MAP).strict),26);
 await page.setViewportSize({width:320,height:844});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));
 await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.screenshot({path:resolve(root,'test-artifacts','exam-model-result-320.png')});
 const staleId=await page.evaluate(()=>{const id=session.ids.find(id=>BANK_MAP.get(id).type==='multi');session.examProfile.questionRevisions[id]='previous-revision';render();return id;});
 assert.equal(await page.locator('.exam-model-summary .scoreN').innerText(),'25/50');
 assert.match(await page.locator('[data-result-question="'+staleId+'"] summary .tag').innerText(),/Требует повторной проверки/);
 assert.match(await page.locator('.exam-model-summary').innerText(),/Версии некоторых заданий изменились/);
 await page.setViewportSize({width:1366,height:768});
 // Old single-choice sessions are still valid and keep the same IDs and responses.
 await page.evaluate(()=>{const q=BANK.find(q=>q.type==='single');session={version:2,ids:[q.id],mode:'practice',pos:0,responses:{[q.id]:{choice:[q.correct[0]]}},grades:{},orders:{[q.id]:q.options.map((_,i)=>i)},done:false,started:Date.now(),deadline:null,recorded:{}};persist();});await page.reload();assert.equal(await page.evaluate(()=>BANK_MAP.get(session.ids[0]).type),'single');
 await page.setViewportSize({width:320,height:844});await page.evaluate(()=>{goStudyLesson('S2-04',1);studyNav.phase='theory';render();});await page.locator('#v5FullBtn').click();await page.locator(`[data-mc-question="${id}"] summary`).click();assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));await page.screenshot({path:resolve(root,'test-artifacts','exam-multi-mobile.png')});assert.deepEqual(errors,[]);
 // T33: changed cards in either supplementary bank must migrate actual previous revisions.
 const reviewedChanges=JSON.parse(readFileSync(resolve(root,'docs/audits/data/T33_MC_CHANGES.json'),'utf8')).changes;
 async function showRevisedSupplement(id){await page.evaluate(id=>{const q=BANK_MAP.get(id),key=q.courseBlock||q.block,cut=key.lastIndexOf('-');goStudyLesson(key.slice(0,cut),Number(key.slice(cut+1)));const native=ExamAlignment.questions.some(q=>q.id===id);studyNav.phase=native?'aligned':'theory';if(native){studyNav.index=CourseLearning.ids(key).indexOf(id);if(studyNav.index<0)throw Error('Missing native assignment '+id);}render();},id);}
 for(const change of reviewedChanges){
  const changedId=change.question_id,oldSelected=change.before.correct;
  await page.evaluate(({id,oldSelected,previousRevision})=>{const q=BANK_MAP.get(id),key=q.courseBlock||q.block,cut=key.lastIndexOf('-');goStudyLesson(key.slice(0,cut),Number(key.slice(cut+1)));const b=getStudyBlock();b.complete=true;b.answers[id]={selected:oldSelected,checked:true,score:1,confidence:3,reviewRevision:previousRevision};persistStudy();},{id:changedId,oldSelected,previousRevision:change.previous_review_revision});
  await page.reload();await showRevisedSupplement(changedId);
  const native=await page.evaluate(id=>ExamAlignment.questions.some(q=>q.id===id),changedId);
  const revised=page.locator(`[data-mc-question="${changedId}"]`);
  if(!native){
   if(!await revised.isVisible())await page.locator('#v5FullBtn').click();
   if(await revised.getAttribute('open')===null)await revised.locator('summary').click();
  }
  const option=native?page.locator('input[name="studyAnswer"]'):revised.locator('[data-mc-option]');
  const migrated=await page.evaluate(id=>getStudyAnswer(id),changedId);
  assert.equal(migrated.checked,false);assert.equal(migrated.needsReviewRecheck,true,changedId+' saved answer must migrate in its assigned course block');assert.equal(migrated.previousReviewResult.score,1);assert.deepEqual(migrated.previousReviewResult.selected,oldSelected);assert.equal(migrated.confidence,3);
  assert.equal(await option.evaluateAll(inputs=>inputs.filter(x=>x.checked).length),0);assert.equal(await page.evaluate(()=>getStudyBlock().complete),true);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));
  const correct=await page.evaluate(id=>BANK_MAP.get(id).correct,changedId);
  for(const i of correct)await (native?page.locator(`input[name="studyAnswer"][value="${i}"]`):revised.locator(`[data-mc-option][value="${i}"]`)).check();
  await (native?page.locator('#studyCheck'):revised.locator('[data-mc-check]')).click();assert.equal(await page.evaluate(id=>getStudyAnswer(id).score,changedId),1);assert.equal(await page.evaluate(id=>getStudyAnswer(id).needsReviewRecheck,changedId),false);
  await page.screenshot({path:resolve(root,'test-artifacts',changedId+'-revised-320.png')});
  await page.reload();await showRevisedSupplement(changedId);
  assert.equal(await page.evaluate(id=>getStudyAnswer(id).score,changedId),1,'fresh response must survive reload');
 }
 assert.deepEqual(errors,[]);
 console.log('PASS exam MC browser:strict partial/exact sets,5 explained variants, independent study progress retained by actual export/import,50=25open+25multi/no calculations, seed/revisions/orders and strict26=self1+auto25 retained through actual export/import/reload,old single session reload,320px; T33 all42 revisions in both supplemental/native course surfaces:history/recheck/new answer/reload.');
}catch(e){await page.screenshot({path:resolve(root,'test-artifacts','exam-multi-failure.png')}).catch(()=>{});throw e}finally{await browser.close()}
