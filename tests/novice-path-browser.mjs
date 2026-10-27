// Mechanical integration proof with answer fixtures, not a novice-learning experiment.
import {chromium} from 'playwright-core';
import {resolve} from 'node:path';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import assert from 'node:assert/strict';
const root=resolve(import.meta.dirname,'..'),out=resolve(root,'test-artifacts');mkdirSync(out,{recursive:true});
const browser=await chromium.launch({executablePath:process.env.CHROME_BIN||'/usr/bin/google-chrome',headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
const context=await browser.newContext({viewport:{width:1366,height:768}}),page=await context.newPage();page.setDefaultTimeout(15000);const errors=[],steps=[];page.on('pageerror',e=>errors.push(e.message));
try{
 await page.goto('file://'+resolve(root,'index.html'),{waitUntil:'domcontentloaded'});
 assert.equal(await page.evaluate(()=>totalStudyCompleted()),0,'route must start with clean progress');
 await page.locator('.top-tabs [data-tab="learn"]').click();
 const menu=await page.locator('.study-menu').first().locator('[data-studylesson]').evaluateAll(els=>els.map(e=>e.dataset.studylesson));
 const route=await page.evaluate(()=>STUDY_ROUTE.map(l=>({id:l.id,title:l.title,blocks:l.blocks.map(b=>({title:b.title,qids:b.qids}))})));
 assert.deepEqual(route.map(x=>x.id),menu,'visible syllabus is the expected route');
 await page.locator('#studyFirst').click();let completed=0,primary=0,multi=0,reloads=0;
 for(const [li,lesson]of route.entries())for(const [bi,block]of lesson.blocks.entries()){
  assert.deepEqual(await page.evaluate(()=>[studyNav.lessonId,studyNav.block,studyNav.phase]),[lesson.id,bi,'theory'],'native next transition');
  assert.equal(await page.locator('.study-paper > h2').textContent(),block.title);
  assert.ok(await page.locator('#study-section-selfcheck').evaluate(e=>Boolean(document.getElementById('v5-level-4').compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING)),'self-check follows required explanation');
  const cards=await page.locator('[data-mc-question]').count();assert.ok(cards>=2);
  for(let n=0;n<cards;n++){
   const card=page.locator('[data-mc-question]').nth(n),id=await card.getAttribute('data-mc-question');await card.locator('summary').click();
   const choices=await page.evaluate(id=>BANK_MAP.get(id).correct,id);
   for(const i of choices)await card.locator(`[data-mc-option][value="${i}"]`).check();
   await card.locator('[data-mc-check]').click();assert.equal(await page.evaluate(id=>getStudyAnswer(id).score,id),1);multi++;
  }
  await page.locator('#studyToPractice').click();
  for(const id of block.qids){
   const q=await page.evaluate(()=>{const q=getStudyQ();return{id:q.id,type:q.type,correct:q.correct,rubric:q.rubric,answer:q.answer,brief:q.brief};});assert.equal(q.id,id);
   if(q.type==='open'){
    await page.locator('#studyText').fill(q.answer||q.brief||q.rubric.join('; '));await page.locator('#studyReveal').click();const checks=page.locator('[data-studyrubric]');assert.equal(await checks.count(),q.rubric.length);
    for(const box of await checks.all())await box.check();await page.locator('#studyGradeOpen').click();
   }else{
    for(const i of q.correct)await page.locator(`input[name="studyAnswer"][value="${i}"]`).check();await page.locator('#studyCheck').click();
   }
   assert.equal(await page.evaluate(id=>getStudyAnswer(id).score,id),1,'fixture grading '+id);await page.locator('#studyNext').click();primary++;
  }
  assert.equal(await page.locator('.study-completion').count(),1);assert.equal(await page.evaluate(()=>getStudyBlock().complete),true);completed++;
  steps.push({order:completed,block:lesson.id+'-'+bi,primary:block.qids.length,multi:cards});
  if(bi<lesson.blocks.length-1)await page.locator('#studyNextBlock').click();else await page.locator('#studyNextLesson').click();
  if(completed%12===0&&completed<96){await page.reload();assert.equal(await page.evaluate(()=>totalStudyCompleted()),completed);await page.locator('#homeContinue').click();reloads++;}
 }
 assert.equal(completed,96);assert.equal(primary,309);assert.equal(multi,204);assert.equal(await page.evaluate(()=>totalStudyCompleted()),96);assert.equal(await page.evaluate(()=>studyNav.lessonId),null,'last theme returns to course overview');
 // Export the real completed state through the visible quiz panel and import into another clean context.
 await page.locator('.top-tabs [data-tab="quiz"]').click();const [download]=await Promise.all([page.waitForEvent('download'),page.locator('#export').click()]);const saved=JSON.parse(readFileSync(await download.path(),'utf8'));
 const importedContext=await browser.newContext({viewport:{width:1366,height:768}}),imported=await importedContext.newPage();imported.setDefaultTimeout(15000);imported.on('pageerror',e=>errors.push(e.message));await imported.goto('file://'+resolve(root,'index.html'),{waitUntil:'domcontentloaded'});assert.equal(await imported.evaluate(()=>totalStudyCompleted()),0);
 await imported.locator('.top-tabs [data-tab="quiz"]').click();imported.once('dialog',d=>d.accept());await imported.locator('#importFile').setInputFiles({name:'complete-novice-route.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(saved))});await imported.waitForFunction(()=>document.querySelector('#toast').textContent.includes('импортированы'));
 assert.equal(await imported.evaluate(()=>totalStudyCompleted()),96);
 assert.deepEqual(await imported.evaluate(()=>STUDY_ROUTE.flatMap(l=>l.blocks.map((b,i)=>({block:l.id+'-'+i,primary:b.qids.length,multi:ExamPractice.questions.filter(q=>q.block===l.id+'-'+i).length}))).map(x=>({block:x.block,primary:x.primary,multi:x.multi}))),steps.map(({order,...rest})=>rest));
 const retained=await imported.evaluate(()=>{let n=0;for(const block of Object.values(studyData.blocks))for(const a of Object.values(block.answers))if(a.checked&&a.score===1)n++;return n;});assert.equal(retained,513,'all actual course/MC fixture answers survive import');
 await imported.locator('#mode').selectOption('exam');await imported.locator('#start').click();
 assert.deepEqual(await imported.evaluate(()=>{const qs=session.ids.map(id=>BANK_MAP.get(id));return{n:qs.length,open:qs.filter(q=>q.type==='open').length,multi:qs.filter(q=>q.type==='multi').length,single:qs.filter(q=>q.type==='single').length,numeric:qs.filter(q=>q.numeric).length};}),{n:50,open:25,multi:25,single:0,numeric:0});
 await imported.reload();assert.equal(await imported.evaluate(()=>totalStudyCompleted()),96);assert.equal(await imported.evaluate(()=>session.ids.length),50);
 await imported.locator('.top-tabs [data-tab="learn"]').click();await imported.screenshot({path:resolve(out,'novice-complete-route-desktop.png')});
 assert.deepEqual(errors,[]);writeFileSync(resolve(out,'novice-route-evidence.json'),JSON.stringify({kind:'mechanical fixture flow; not student performance',completed,primary,multi,reloads,importedAnswers:retained,exam:{open:25,multi:25},steps},null,2));
 console.log('PASS fresh native route:96 completed blocks/309 primary/204 additionalMC,7 reload-resumes,actual export/import of513 answers,then25open+25multi exam and reload. This is mechanical fixture coverage, not editorial novice acceptance.');
}catch(e){await page.screenshot({path:resolve(out,'novice-route-failure.png')}).catch(()=>{});throw e;}finally{await browser.close();}
