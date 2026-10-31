import {chromium} from 'playwright-core';import {resolve} from 'node:path';import {mkdirSync,writeFileSync} from 'node:fs';import assert from 'node:assert/strict';
const root=resolve(import.meta.dirname,'..'),out=resolve(root,'test-artifacts');mkdirSync(out,{recursive:true});
const browser=await chromium.launch({executablePath:process.env.CHROME_BIN||'/usr/bin/google-chrome',headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
const page=await browser.newPage({viewport:{width:1366,height:900}}),errors=[];page.setDefaultTimeout(15000);page.on('pageerror',e=>errors.push(e.message));
async function fixture(ids){await page.evaluate(ids=>{session={version:2,ids,mode:'practice',pos:0,responses:{},grades:{},orders:Object.fromEntries(ids.filter(id=>BANK_MAP.get(id).options).map(id=>[id,BANK_MAP.get(id).options.map((_,i)=>i)])),done:false,started:Date.now(),deadline:null,recorded:{},reviewFlags:{}};tab='quiz';persist();render()},ids)}
async function topOf(selector){await page.locator(selector).evaluate(el=>window.scrollTo({top:Math.max(0,el.getBoundingClientRect().top+scrollY-90),behavior:'instant'}));await page.evaluate(()=>new Promise(r=>requestAnimationFrame(r)));}
async function openLinks(id){const card=page.locator('[data-theory-for="'+id+'"]');await card.locator('summary').click();return card}
try{
 await page.goto('file://'+resolve(root,'index.html'));
 const coverage=await page.evaluate(()=>EFFECTIVE_BANK.map(q=>({id:q.id,links:FinanceTheoryUI.blocks(q).map(b=>b.key)})));
 assert.equal(coverage.length,608);assert.ok(coverage.every(x=>x.links.length));
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
 // New source-reviewed practice preserves drafts and opens its actual prerequisite.
 await fixture(['EX17-03','RECON-01']);
 assert.equal(await page.locator('.exam-source-tag').innerText(),'Экзаменационное задание · адаптировано');
 for(const i of [0,1,2])await page.locator('input[name="qoption"][value="'+i+'"]').check();
 await page.locator('#check').click();assert.equal(await page.evaluate(()=>session.grades['EX17-03'].strict),true);
 const vmLinks=await openLinks('EX17-03');await vmLinks.locator('[data-question-theory]').click();
 assert.ok(await page.locator('[data-aligned-block="S2-02-0"]').innerText().then(s=>s.includes('РЦ1')&&s.includes('W/R')));
 await page.locator('[data-theory-return]').click();await page.locator('#next').click();
 assert.equal(await page.locator('.reconstructed-source-tag').innerText(),'Восстановленный вопрос');
 await page.locator('#freeText').fill('Право на информацию: существенные риски нужны для осознанного выбора.');
 const rightsLinks=await openLinks('RECON-01');await rightsLinks.locator('[data-question-theory]').click();
 assert.match(await page.locator('[data-aligned-block="R-02-0"]').innerText(),/Право быть выслушанным/);
 await page.reload();await page.locator('[data-theory-return]').click();assert.match(await page.locator('#freeText').inputValue(),/Право на информацию/);
 assert.equal(await page.evaluate(()=>Object.hasOwn(session.grades,'RECON-01')),false);
 await fixture(['TRANSFER-FUNDING-01']);await page.locator('input[name="qoption"][value="0"]').check();await page.locator('#check').click();assert.equal(await page.evaluate(()=>session.grades['TRANSFER-FUNDING-01'].strict),true);
 await fixture(['TRANSFER-WATERFALL-01']);for(const i of [0,1,2])await page.locator('input[name="qoption"][value="'+i+'"]').check();await page.locator('#check').click();assert.equal(await page.evaluate(()=>session.grades['TRANSFER-WATERFALL-01'].strict),false);assert.equal(await page.evaluate(()=>session.grades['TRANSFER-WATERFALL-01'].score),.75);
 await fixture(['EX17-45']);assert.equal(await page.locator('.question').evaluate(el=>getComputedStyle(el).color),'rgb(226, 214, 255)');await page.screenshot({path:resolve(out,'exam-list-purple.png')});
 await fixture(['RECON-01']);assert.equal(await page.locator('.question').evaluate(el=>getComputedStyle(el).color),'rgb(255, 214, 161)');await page.screenshot({path:resolve(out,'exam-reconstruction-orange.png')});
 await page.setViewportSize({width:320,height:900});
 const newIds=await page.evaluate(()=>ExamAlignment.questions.map(q=>q.id));
 for(const id of newIds){await fixture([id]);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'new question320px '+id);assert.ok(await page.locator('.qmeta .tag').last().innerText());}
 await fixture(['EX17-45']);await page.screenshot({path:resolve(out,'exam-list-purple-320.png')});
 await fixture(['RECON-01']);await page.screenshot({path:resolve(out,'exam-reconstruction-orange-320.png')});
 // Composite exercise exposes all exact prerequisites and preserves its unassessed draft.
 await fixture(['EX17-32']);await page.locator('#freeText').fill('ГО покрывает будущий риск, ВМ отражает переоценку. Остальные части ещё не разобраны.');
 const composite=await openLinks('EX17-32');assert.equal(await composite.locator('[data-question-theory]').count(),3);
 await composite.locator('[data-question-theory]').nth(2).click();
 assert.match(await page.locator('[data-aligned-block="S2-05-0"]').innerText(),/номинальной стоимости/);
 assert.ok(await page.locator('[data-aligned-block="S2-05-0"] a[href^="https://"]').count()>=2);
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));
 await page.screenshot({path:resolve(out,'exam-compound-theory-320.png')});
 await page.reload();await page.locator('[data-theory-return]').click();assert.match(await page.locator('#freeText').inputValue(),/Остальные части/);
 assert.equal(await page.evaluate(()=>Object.hasOwn(session.grades,'EX17-32')),false);
 await page.screenshot({path:resolve(out,'exam-compound-question-320.png')});
 // Both source topics in one block remain readable without duplicate anchor selection.
 await fixture(['EX17-06']);const supervision=await openLinks('EX17-06');await supervision.locator('[data-question-theory]').first().click();
 assert.equal(await page.locator('[data-aligned-block="R-02-0"]').count(),1);
 assert.match(await page.locator('[data-aligned-block="R-02-0-part-1"]').innerText(),/камерaльный|камеральный/i);
 await page.locator('[data-aligned-block="R-02-0-part-1"]').scrollIntoViewIfNeeded();await page.screenshot({path:resolve(out,'exam-supervision-theory-320.png')});
 await page.locator('[data-theory-return]').click();
 await fixture(['EX17-12']);const repo=await openLinks('EX17-12');await repo.locator('[data-question-theory]').first().click();
 const repoText=await page.locator('#content').innerText();assert.ok(repoText.includes('Брокерская маржинальная торговля и её расчётные задания'));assert.ok(!repoText.includes('новый экзаменационный профиль исключает эту главу'));
 await page.locator('[data-aligned-block="E-13-0"]').scrollIntoViewIfNeeded();await page.screenshot({path:resolve(out,'exam-repo-scope-320.png')});
 // Exact new prerequisites, not only theme-title matches, at the narrow viewport.
 await fixture(['RECON-13-MC']);for(const i of [0,2,3])await page.locator('input[name="qoption"][value="'+i+'"]').check();
 await page.locator('#check').click();assert.equal(await page.evaluate(()=>session.grades['RECON-13-MC'].strict),true);
 const lc=await openLinks('RECON-13-MC');await lc.locator('[data-question-theory]').first().click();
 assert.match(await page.locator('[data-aligned-block="S1-02-0-part-1"]').innerText(),/безотзывный/);
 assert.match(await page.locator('[data-aligned-block="S1-02-0-part-1"]').innerText(),/Покрытый аккредитив/);
 await topOf('[data-aligned-block="S1-02-0-part-1"]');await page.screenshot({path:resolve(out,'exam-lc-theory-320.png')});
 await page.reload();await page.locator('[data-theory-return]').click();assert.equal(await page.evaluate(()=>session.grades['RECON-13-MC'].strict),true);
 for(const [id,target,term,file] of [
 ['EX17-41','S1-04-1','ОФЗ-ИН','exam-linker-theory-320.png'],
 ['RECON-15','S1-09-1','операционная трансформация','exam-rating-theory-320.png'],
 ['RECON-18','E-01-0-part-1','денежным требованием','exam-minetoken-theory-320.png'],
 ['RECON-02','S2-08-1','Кривая и выпуклость','exam-partial-hedge-theory-320.png'],
 ['RECON-05','R-02-0-part-2','Три причины','exam-megareg-theory-320.png'],
 ['RECON-19','E-02-1','Сургутнефтегаз','exam-negative-ev-theory-320.png']]){
  await fixture([id]);const links=await openLinks(id);await links.locator('[data-question-theory]').first().click();
  assert.ok((await page.locator('[data-aligned-block="'+target+'"]').innerText()).includes(term));
  await topOf('[data-aligned-block="'+target+'"]');assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));
  await page.screenshot({path:resolve(out,file)});await page.locator('[data-theory-return]').click();
 }
 assert.deepEqual(errors,[]);console.log('PASS question theory UI:608 linked questions,pre-answer links/multiple targets,completed theory retained,choices/text/confidence and reload/return,NIM anchor,exact completed-result return,real active-exam guard,320px');
}catch(e){await page.screenshot({path:resolve(out,'theory-links-failure.png')});throw e}
finally{writeFileSync(resolve(out,'question-theory-evidence.json'),JSON.stringify({coverage:608,errors},null,2));await browser.close()}
