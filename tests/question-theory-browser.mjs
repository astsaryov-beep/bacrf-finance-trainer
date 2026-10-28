import {chromium} from 'playwright-core';import {resolve} from 'node:path';import {mkdirSync,writeFileSync} from 'node:fs';import assert from 'node:assert/strict';
const root=resolve(import.meta.dirname,'..'),out=resolve(root,'test-artifacts');mkdirSync(out,{recursive:true});
const browser=await chromium.launch({executablePath:process.env.CHROME_BIN||'/usr/bin/google-chrome',headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
const page=await browser.newPage({viewport:{width:1366,height:900}}),errors=[];page.setDefaultTimeout(15000);page.on('pageerror',e=>errors.push(e.message));
async function fixture(ids){await page.evaluate(ids=>{session={version:2,ids,mode:'practice',pos:0,responses:{},grades:{},orders:Object.fromEntries(ids.filter(id=>BANK_MAP.get(id).options).map(id=>[id,BANK_MAP.get(id).options.map((_,i)=>i)])),done:false,started:Date.now(),deadline:null,recorded:{},reviewFlags:{}};tab='quiz';persist();render()},ids)}
async function openLinks(id){const card=page.locator('[data-theory-for="'+id+'"]');await card.locator('summary').click();return card}
try{
 await page.goto('file://'+resolve(root,'index.html'));
 const coverage=await page.evaluate(()=>EFFECTIVE_BANK.map(q=>({id:q.id,links:FinanceTheoryUI.blocks(q).map(b=>b.key)})));
 assert.equal(coverage.length,513);assert.ok(coverage.every(x=>x.links.length));
 // A completed course block opens directly as full theory, preserving its results.
 await page.evaluate(()=>{studyData.blocks[studyKey('S1-05',0)]={answers:{Q04:{checked:true,selected:[0],score:0}},complete:true,completedAt:'2026-10-28T00:00:00Z'};persistStudy()});
 const before=await page.evaluate(()=>JSON.stringify(studyData.blocks[studyKey('S1-05',0)]));
 await fixture(['Q04','EXM-D01']);await page.locator('input[name="qoption"]').first().check();await page.locator('#confidence').selectOption('1');
 const card=await openLinks('Q04');assert.equal(await card.locator('[data-question-theory]').count(),1);await card.locator('[data-question-theory]').click();
 assert.deepEqual(await page.evaluate(()=>[tab,studyNav.lessonId,studyNav.block,studyNav.phase,studyTheoryView]),['learn','S1-05',0,'theory','full']);
 assert.equal(await page.locator('#v5-level-1').count(),1);assert.equal(await page.evaluate(()=>JSON.stringify(studyData.blocks[studyKey('S1-05',0)])),before);
 assert.equal(await page.evaluate(()=>Object.keys(session.grades).length),0);await page.screenshot({path:resolve(out,'theory-reading-desktop.png')});
 await page.reload();assert.equal(await page.locator('[data-theory-return]').count(),1);assert.equal(await page.locator('#v5-level-1').count(),1);
 await page.locator('[data-theory-return]').click();assert.equal(await page.locator('input[name="qoption"]:checked').count(),1);assert.equal(await page.locator('#confidence').inputValue(),'1');
 assert.equal(await page.evaluate(()=>activeQ().id),'Q04');assert.equal(await page.evaluate(()=>Object.keys(session.grades).length),0);
 await page.locator('#next').click();const multi=await openLinks('EXM-D01');assert.equal(await multi.locator('[data-question-theory]').count(),3);
 await page.screenshot({path:resolve(out,'theory-links-desktop.png')});await multi.locator('[data-question-theory]').nth(2).click();assert.deepEqual(await page.evaluate(()=>[studyNav.lessonId,studyNav.block]),['S1-07',1]);await page.locator('[data-theory-return]').click();assert.equal(await page.evaluate(()=>activeQ().id),'EXM-D01');
 // Open-answer draft survives a reading detour and reload at phone width.
 await fixture(['RO08','EXN-R01']);await page.setViewportSize({width:320,height:800});await page.locator('#freeText').fill('Собственное объяснение до показа образца и перехода к теории.');await page.locator('#confidence').selectOption('3');
 const open=await openLinks('RO08');await open.locator('[data-question-theory]').first().click();await page.reload();await page.locator('[data-theory-return]').click();assert.equal(await page.locator('#freeText').inputValue(),'Собственное объяснение до показа образца и перехода к теории.');assert.equal(await page.locator('#confidence').inputValue(),'3');
 assert.equal(await page.evaluate(()=>Object.keys(session.grades).length),0);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));
 await page.locator('#next').click();const nim=await openLinks('EXN-R01');await nim.locator('[data-question-theory]').first().click();assert.equal(await page.locator('#theory-nim').count(),1);await page.waitForFunction(()=>{const r=document.getElementById('theory-nim').getBoundingClientRect();return r.top>=60&&r.top<180});
 await page.screenshot({path:resolve(out,'theory-nim-mobile.png')});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));await page.locator('[data-theory-return]').click();
 // New attempts invalidate the previous return context.
 const ctxSaved=await page.evaluate(()=>sessionStorage.getItem('bacrf_question_theory_return_v1'));assert.equal(ctxSaved,null);
 // Completed exam results allow theory and return to the exact reviewed card.
 await page.setViewportSize({width:1366,height:900});await page.evaluate(()=>{session.mode='exam';session.done=true;session.pos=0;tab='quiz';persist();render()});
 const result=page.locator('[data-result-question="EXN-R01"]');await result.locator('summary').first().click();await result.locator('[data-theory-for="EXN-R01"]>summary').click();await result.locator('[data-question-theory]').first().click();await page.locator('[data-theory-return]').click();assert.ok(await page.locator('[data-result-question="EXN-R01"]').evaluate(el=>el.open));assert.equal(await page.evaluate(()=>session.done),true);
 // A real active exam exposes neither links nor answer explanations.
 await page.evaluate(()=>{session=null;persist();tab='quiz';render()});await page.locator('#mode').selectOption('exam');await page.locator('#start').click();assert.equal(await page.evaluate(()=>session.ids.length),50);assert.equal(await page.locator('[data-question-theory]').count(),0);assert.equal(await page.locator('[data-theory-for]').count(),0);
 await page.evaluate(()=>FinanceTheoryUI.open({dataset:{friOpenLesson:'S1-05',friOpenBlock:'0',questionTheory:'Q04'}}));assert.equal(await page.evaluate(()=>tab),'quiz');assert.equal(await page.locator('#v5-level-1').count(),0);assert.equal(await page.evaluate(()=>Object.keys(session.grades).length),0);
 assert.deepEqual(errors,[]);console.log('PASS question theory UI:513 linked questions,pre-answer links/multiple targets,completed theory retained,choices/text/confidence and reload/return,NIM anchor,exact completed-result return,real active-exam guard,320px');
}catch(e){await page.screenshot({path:resolve(out,'theory-links-failure.png')});throw e}
finally{writeFileSync(resolve(out,'question-theory-evidence.json'),JSON.stringify({coverage:513,errors},null,2));await browser.close()}
