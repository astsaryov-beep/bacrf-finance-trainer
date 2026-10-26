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
 const counts=await page.evaluate(()=>({n:session.ids.length,open:session.ids.map(id=>BANK_MAP.get(id)).filter(q=>q.type==='open').length,multi:session.ids.map(id=>BANK_MAP.get(id)).filter(q=>q.type==='multi').length,bad:session.ids.map(id=>BANK_MAP.get(id)).filter(q=>q.numeric||q.type==='single'||['BO03','EO01','PO03','V2-032','V2-050','V2-068'].includes(q.id)).length}));assert.deepEqual(counts,{n:50,open:25,multi:25,bad:0});
 await page.evaluate(()=>{session.pos=session.ids.findIndex(id=>BANK_MAP.get(id).type==='multi');render();});assert.ok(await page.locator('input[name="qoption"][type="checkbox"]').count()>1);
 await page.screenshot({path:resolve(root,'test-artifacts','exam-multi-desktop.png')});
 await page.reload();assert.equal(await page.evaluate(()=>session.ids.length),50,'new session survives reload');
 // Old single-choice sessions are still valid and keep the same IDs and responses.
 await page.evaluate(()=>{const q=BANK.find(q=>q.type==='single');session={version:2,ids:[q.id],mode:'practice',pos:0,responses:{[q.id]:{choice:[q.correct[0]]}},grades:{},orders:{[q.id]:q.options.map((_,i)=>i)},done:false,started:Date.now(),deadline:null,recorded:{}};persist();});await page.reload();assert.equal(await page.evaluate(()=>BANK_MAP.get(session.ids[0]).type),'single');
 await page.setViewportSize({width:320,height:844});await page.evaluate(()=>{goStudyLesson('S2-04',1);studyNav.phase='theory';render();});await page.locator('#v5FullBtn').click();await page.locator(`[data-mc-question="${id}"] summary`).click();assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));await page.screenshot({path:resolve(root,'test-artifacts','exam-multi-mobile.png')});assert.deepEqual(errors,[]);
 console.log('PASS exam MC browser:strict partial/exact sets,5 explained variants, independent study progress retained by actual export/import,50=25open+25multi/no calculations, old single session reload,320px.');
}catch(e){await page.screenshot({path:resolve(root,'test-artifacts','exam-multi-failure.png')}).catch(()=>{});throw e}finally{await browser.close()}
