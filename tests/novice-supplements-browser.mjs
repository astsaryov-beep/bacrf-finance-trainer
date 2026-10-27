// Mechanical UI/history fixtures; this does not measure student understanding.
import {chromium} from 'playwright-core';
import {resolve} from 'node:path';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import assert from 'node:assert/strict';
const root=resolve(import.meta.dirname,'..'),out=resolve(root,'test-artifacts');mkdirSync(out,{recursive:true});
const browser=await chromium.launch({executablePath:process.env.CHROME_BIN||'/usr/bin/google-chrome',headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
const context=await browser.newContext({viewport:{width:1366,height:768}}),page=await context.newPage();page.setDefaultTimeout(15000);const errors=[],steps=[];page.on('pageerror',e=>errors.push(e.message));
const historical={app:'bacrf-finance-trainer',version:3,progress:{},flagged:{},friInsights:{version:1,read:{},traps:{'S1-02-1':{tries:2,correct:1,lastCorrect:true,updatedAt:'old'}}},independentPractice:{version:1,answers:{'FRI-O-08-1':{correct:true,draft:'Осмысленный прежний ответ',tries:2,wrong:0,reviewRevision:'2026-10-26'},'FRI-M-15-1':{correct:true,tries:2,wrong:0}}}};
const importState=async(p,state)=>{await p.locator('.top-tabs [data-tab="quiz"]').click();p.once('dialog',d=>d.accept());await p.locator('#importFile').setInputFiles({name:'supplemental-history.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(state))});await p.waitForFunction(()=>document.querySelector('#toast').textContent.includes('импортированы'));};
const verifyOldHistory=async p=>assert.deepEqual(await p.evaluate(()=>({trap:friLearning.traps['S1-02-1'].previousReviewResult.lastCorrect,trapTries:friLearning.traps['S1-02-1'].previousReviewResult.tries,draft:friExtra.answers['FRI-O-08-1'].previousReviewResult.draft,single:friExtra.answers['FRI-M-15-1'].previousReviewResult.correct})),{trap:true,trapTries:2,draft:'Осмысленный прежний ответ',single:true});
try{
 await page.goto('file://'+resolve(root,'index.html'),{waitUntil:'domcontentloaded'});
 // Import an actual historical export through the visible control, before any reload.
 await importState(page,historical);await verifyOldHistory(page);
 assert.deepEqual(await page.evaluate(()=>[friLearning.traps['S1-02-1'].needsReviewRecheck,friExtra.answers['FRI-O-08-1'].needsReviewRecheck]),[true,true]);
 await page.reload();await verifyOldHistory(page);
 const route=await page.evaluate(()=>STUDY_ROUTE.flatMap(l=>l.blocks.map((b,i)=>({lesson:l.id,pos:i,key:l.id+'-'+i,trap:(FRI_TRAP_CASES[l.id+'-'+i]||FRI_TRAP_FALLBACK[l.id+'-'+i])[0][1],practice:friExtraForBlock(l.id,i)}))));
 let diagrams=0,traps=0,comparisons=0,practice=0,labs=0;
 for(const row of route){
  // Route rendering is programmatic here; novice-path-browser covers native Next navigation.
  await page.evaluate(({lesson,pos})=>{studyTheoryView='full';tab='learn';goStudyLesson(lesson,pos)},row);
  assert.equal(await page.locator('.study-paper > h2').count(),1);
  for(const d of await page.locator('.fri-diagram').all()){await d.locator('summary').click();assert.ok((await d.textContent()).includes('Стрелки задают порядок разбора'));diagrams++;}
  await page.locator('#v5InsightBtn').click();
  if(row.key==='S1-02-1')assert.ok((await page.locator('#fri-trap-feedback').textContent()).includes('Прежний результат сохранён'));
  await page.locator(`[data-fri-trap="${row.key}"][data-answer="${row.trap}"]`).click();assert.ok((await page.locator('#fri-trap-feedback').textContent()).includes('Верно'));assert.ok(await page.locator('#fri-trap-why').isVisible());traps++;
  for(const card of await page.locator('.fri-comparison').all()){await card.locator('summary').click();assert.ok((await card.locator('.fri-comparison-conclusion').textContent()).length>35);comparisons++;}
  for(const q of row.practice){
   const field=q.type==='multi'?`[data-fri-extra-answer="${q.id}"]`:`[data-fri-extra-draft="${q.id}"]`;
   const card=page.locator('.fri-peer-question').filter({has:page.locator(field)});await card.locator('summary').click();
   if(q.type==='multi'){await card.locator(`[data-fri-extra-choice="${q.correct}"]`).click();assert.ok((await card.locator('.fri-peer-feedback').textContent()).includes('Верно'));}
   else{await card.locator('textarea').fill(q.answer);await card.locator('[data-fri-extra-reveal]').click();assert.ok((await card.locator('.fri-peer-feedback').textContent()).includes(q.example));await card.locator('[data-fri-extra-self][data-ok="1"]').click();}
   assert.equal(await page.evaluate(id=>friExtra.answers[id].correct,q.id),true);practice++;
  }
  const lab=page.locator('[data-fri-lab]');if(await lab.count()){const slider=lab.locator('[data-fri-range]'),before=await lab.locator('[data-fri-result]').textContent();await slider.focus();await slider.press('End');const after=await lab.locator('[data-fri-result]').textContent();assert.notEqual(after,before);assert.ok(after.length>10);labs++;}
  if(row.key==='S1-02-1')await page.screenshot({path:resolve(out,'novice-supplements-credit-desktop.png')});
  if(row.key==='E-11-0')await page.screenshot({path:resolve(out,'novice-supplements-model-desktop.png')});
  steps.push({block:row.key,practice:row.practice.length});
 }
 assert.deepEqual({diagrams,traps,comparisons,practice,labs},{diagrams:15,traps:96,comparisons:34,practice:70,labs:10});
 const state=async p=>p.evaluate(()=>({traps:Object.values(friLearning.traps).filter(a=>a.lastCorrect&&!a.needsReviewRecheck).length,practice:Object.values(friExtra.answers).filter(a=>a.correct&&!a.needsReviewRecheck).length,trapTries:friLearning.traps['S1-02-1'].tries,oldDraft:friExtra.answers['FRI-O-08-1'].previousReviewResult.draft}));
 const expected=await state(page);assert.equal(expected.traps,96);assert.equal(expected.practice,70);assert.equal(expected.trapTries,3);await verifyOldHistory(page);await page.reload();assert.deepEqual(await state(page),expected);
 await page.locator('.top-tabs [data-tab="quiz"]').click();const [download]=await Promise.all([page.waitForEvent('download'),page.locator('#export').click()]);const saved=JSON.parse(readFileSync(await download.path(),'utf8'));
 const other=await browser.newContext({viewport:{width:1366,height:768}}),imported=await other.newPage();imported.setDefaultTimeout(15000);imported.on('pageerror',e=>errors.push(e.message));await imported.goto('file://'+resolve(root,'index.html'),{waitUntil:'domcontentloaded'});await importState(imported,saved);assert.deepEqual(await state(imported),expected);await verifyOldHistory(imported);await imported.reload();assert.deepEqual(await state(imported),expected);
 await imported.setViewportSize({width:320,height:780});await imported.evaluate(()=>{studyTheoryView='insights';tab='learn';goStudyLesson('S1-02',1)});const mobile=await imported.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));assert.ok(mobile.scroll<=mobile.width+2,'no horizontal overflow at320px');await imported.screenshot({path:resolve(out,'novice-supplements-credit-mobile.png'),fullPage:true});
 assert.deepEqual(errors,[]);writeFileSync(resolve(out,'novice-supplements-evidence.json'),JSON.stringify({kind:'mechanical supplemental fixtures; not student performance',diagrams,traps,comparisons,practice,labs,reload:true,exportImport:true,historicalResultsRetained:true,steps},null,2));console.log('PASS supplemental UI:96 traps/70 independent prompts/34 comparisons/15 diagrams/10 changed models; historical import/recheck, reload, real export/import and320px. Fixture coverage, not student performance.');
}catch(e){await page.screenshot({path:resolve(out,'novice-supplements-failure.png')}).catch(()=>{});throw e;}finally{await browser.close();}
