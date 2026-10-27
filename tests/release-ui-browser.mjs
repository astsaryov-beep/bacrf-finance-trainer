import {chromium} from 'playwright-core';
import {resolve} from 'node:path';
import {mkdirSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';

const root=resolve(import.meta.dirname,'..'),out=resolve(root,'test-artifacts');
mkdirSync(out,{recursive:true});
const browser=await chromium.launch({executablePath:process.env.CHROME_BIN||'/usr/bin/google-chrome',headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
const page=await browser.newPage({viewport:{width:1440,height:900},colorScheme:'light'}),errors=[],evidence=[];
page.on('pageerror',e=>errors.push(e.message));
page.setDefaultTimeout(15000);
async function inspect(label){
 const result=await page.evaluate(()=>{
  const pale=[];
  for(const el of document.querySelectorAll('#content *, .side *,dialog[open] *')){
   if(!(el instanceof HTMLElement))continue;
   const r=el.getBoundingClientRect(),c=getComputedStyle(el),rgb=c.backgroundColor.match(/[\d.]+/g)?.map(Number);
   if(r.width<120||r.height<32||c.visibility==='hidden'||!rgb)continue;
   if((rgb[3]??1)>.8&&rgb.slice(0,3).every(v=>v>210))pale.push({tag:el.tagName,cls:el.className,text:el.textContent.trim().slice(0,65),bg:c.backgroundColor});
  }
  return {pale,overflow:document.documentElement.scrollWidth>innerWidth+2,width:innerWidth};
 });
 evidence.push({label,...result});
 // Collect all visual findings in one pass to avoid one CI round per card.
}
async function screen(name){await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));await page.screenshot({path:resolve(out,'release6-'+name+'.png')});}
try{
 await page.goto('file://'+resolve(root,'index.html'));
 assert.equal(await page.locator('meta[name="trainer-version"]').getAttribute('content'),'6.0');
 const tabs=['overview','learn','quiz','catalog','stats','sources','about'];
 for(const width of [1440,320]){
  await page.setViewportSize({width,height:900});
  for(const name of tabs){
   if(width===320){await page.locator('.mobile-menu summary').click();await page.locator('.mobile-tabs [data-tab="'+name+'"]').click()}
   else await page.locator('.top-tabs [data-tab="'+name+'"]').click();
   await page.evaluate(()=>{document.querySelectorAll('#content details').forEach(el=>el.open=true)});
   await inspect(name+'-'+width);await screen(name+'-'+width);
   if(name==='about')assert.match(await page.locator('#content').innerText(),/513 вопросов/);
  }
 }
 // Inspect every complete lesson, including all nested explanations, at phone width.
 const route=await page.evaluate(()=>STUDY_ROUTE.flatMap(l=>l.blocks.map((b,pos)=>({id:l.id,pos}))));
 for(const {id,pos} of route){
  await page.evaluate(({id,pos})=>{goStudyLesson(id,pos);goStudyStartBlock(pos);document.querySelectorAll('#content details').forEach(el=>el.open=true)},{id,pos});
  await inspect(id+'-'+pos+'-full-320');
 }
 await screen('lesson-320');
 // UI-01: the summary updates immediately and remains correct after reload.
 const fixture=await page.evaluate(()=>{const q=FRI_PRACTICE_BANK.find(q=>q.type==='multi');goStudyLesson(q.lessonId,q.pos);goStudyStartBlock(q.pos);return {id:q.id,correct:q.correct,key:q.lessonId+'-'+q.pos}});
 await page.locator('[data-fri-extra-answer="'+fixture.id+'"]').first().evaluate(el=>el.closest('details').open=true);
 await page.locator('[data-fri-extra-answer="'+fixture.id+'"][data-fri-extra-choice="'+fixture.correct+'"]').click();
 assert.match(await page.locator('[data-fri-extra-progress="'+fixture.key+'"]').innerText(),/Верно выполнено 1 из/);
 await page.reload();
 assert.equal(await page.evaluate(id=>friExtra.answers[id].correct,fixture.id),true);
 // Changing a tab saves the current practice draft without grading it.
 await page.setViewportSize({width:1440,height:900});
 await page.evaluate(()=>{const ids=['RO08'];session={version:2,ids,mode:'practice',pos:0,responses:{},grades:{},orders:{},done:false,started:Date.now(),deadline:null,recorded:{},reviewFlags:{}};tab='quiz';persist();render()});
 await page.locator('#freeText').fill('Черновик для сохранения при смене вкладки.');
 await page.locator('#confidence').selectOption('1');
 await page.locator('.top-tabs [data-tab="about"]').click();
 assert.equal(await page.evaluate(()=>scrollY),0);
 await page.reload();await page.locator('.top-tabs [data-tab="quiz"]').click();
 assert.equal(await page.locator('#freeText').inputValue(),'Черновик для сохранения при смене вкладки.');
 assert.equal(await page.locator('#confidence').inputValue(),'1');
 assert.equal(await page.evaluate(()=>Object.keys(session.grades).length),0);
 // The historical chooser also uses dark surfaces with a light OS preference.
 await page.goto('file://'+resolve(root,'versions/index.html'));
 assert.match(await page.locator('main').innerText(),/6\.0/);
 assert.equal(await page.locator('.card').first().evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(17, 40, 58)');
 await screen('versions');
 assert.deepEqual(evidence.filter(r=>r.pale.length||r.overflow),[],'visual findings across all screens/lessons');
 assert.deepEqual(errors,[]);
 console.log('PASS release6 UI:7 tabs at1440/320,96 expanded lessons,pale surfaces/overflow,live practice counter,draft+confidence across tab/reload,version chooser;no page errors');
}catch(e){await page.screenshot({path:resolve(out,'release6-failure.png')});throw e}
finally{writeFileSync(resolve(out,'release6-ui-evidence.json'),JSON.stringify({evidence,errors},null,2));await browser.close()}
