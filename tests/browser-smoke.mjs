import {chromium} from 'playwright-core';
import {resolve} from 'node:path';
import {mkdirSync,readFileSync} from 'node:fs';
import assert from 'node:assert/strict';

const root=resolve(import.meta.dirname,'..');
mkdirSync(resolve(root,'test-artifacts'),{recursive:true});
const browser=await chromium.launch({
  executablePath:process.env.CHROME_BIN||'/usr/bin/google-chrome',
  headless:true,args:['--no-sandbox','--disable-dev-shm-usage']
});
const page=await browser.newPage({viewport:{width:1366,height:768}});
page.on('pageerror',e=>console.error('PAGE ERROR:',e.message));
try{
 await page.goto('file://'+resolve(root,'index.html'),{waitUntil:'domcontentloaded',timeout:60000});
 await page.waitForSelector('[data-tab="learn"]',{timeout:25000});

 // v5.0.19: the mechanism belongs in the course BEFORE exam questions.
 await page.waitForFunction(()=>typeof window.futuresShortCourseMarkup==='function');
 await page.locator('.top-tabs [data-tab="learn"]').click();
 await page.locator('.study-left [data-studylesson="S2-01"]').click();
 await page.locator('#v5FullBtn').click();
 await page.waitForSelector('.fsc-grid');
 assert.equal(await page.locator('.fsc-panel').count(),2,'stock short vs futures shown as adjacent cards');
 const study01=await page.locator('.fsc-wrap').textContent();
 assert.ok(study01.includes('Занимаем акцию у брокера'),'real stock short borrow explained');
 assert.ok(study01.includes('но не аренда базовой акции'),'futures contract does not borrow underlying');
 assert.ok(study01.includes('Открытие и исполнение — разные этапы'),'delivery caveat explained');
 assert.ok(await page.locator('.fsc-disclosure').isVisible(),'optional delivery details available');
 assert.equal(await page.locator('.fsc-disclosure[open]').count(),0,'advanced explanation is collapsed');
 await page.locator('.fsc-disclosure>summary').first().click();
 assert.ok((await page.locator('.fsc-disclosure').textContent()).toLowerCase().includes('расчётного'),'cash settlement described');
 await page.locator('#v5BriefBtn').click();
 assert.ok((await page.locator('.fsc-brief').textContent()).includes('фьючерса'),'exam summary available');
 await page.locator('#v5FullBtn').click();
 await page.setViewportSize({width:390,height:844});
 assert.equal(await page.locator('.fsc-grid').evaluate(e=>getComputedStyle(e).gridTemplateColumns.split(' ').length),1,'mobile short comparison is stacked');
 assert.ok(await page.locator('.fsc-wrap').evaluate(e=>e.getBoundingClientRect().right<=innerWidth+1),'no overflow at 390px');
 await page.screenshot({path:resolve(root,'test-artifacts','short-futures-basics-390.png'),fullPage:false});
 await page.setViewportSize({width:320,height:640});
 assert.ok(await page.locator('.fsc-wrap').evaluate(e=>e.getBoundingClientRect().right<=innerWidth+1),'no overflow at 320px');
 await page.setViewportSize({width:1366,height:768});
 await page.locator('.study-left [data-studylesson="S2-02"]').click();
 await page.waitForSelector('.fsc-cash-grid');
 assert.equal(await page.locator('.fsc-cash-grid article').count(),3,'GO, VM, and trade costs are distinct');
 assert.ok((await page.locator('.fsc-wrap').textContent()).includes('нет обязательной ежедневной платы'),'no daily borrowing fee misconception');
 await page.locator('.fsc-disclosure>summary').first().click();
 assert.ok((await page.locator('.fsc-disclosure').first().textContent()).includes('получать'),'short can receive funding');
 await page.locator('.fsc-disclosure>summary').nth(1).click();
 assert.ok((await page.locator('.fsc-disclosure').nth(1).textContent()).includes('Поставочный'),'settlement distinction available');
 await page.evaluate(()=>{tab='overview';render()});


 // v5.0.18: practical comparisons remain legible and accessible on phones.
 await page.waitForFunction(()=>window.peerFeedbackCheck?.version==='5.0.19');
 assert.equal(await page.evaluate(()=>window.peerFeedbackCheck.formulaQuestions),35);
 await page.evaluate(()=>{
  session={version:2,ids:['V2-069'],mode:'practice',pos:0,responses:{},grades:{},orders:{},done:false,started:Date.now(),deadline:null,recorded:{}};
  tab='quiz';render();
 });
 await page.locator('#freeText').fill('Пут сохраняет выгоду от роста за премию, short futures компенсирует рост убытком.');
 await page.locator('#check').click();
 assert.equal(await page.locator('.qa-brief').count(),1,'compact exam summary once');
 assert.equal(await page.locator('.qa-hedge-lesson').count(),1,'put vs futures exercise shown once');
 assert.equal(await page.locator('.qa-scenario').count(),2,'two market scenarios');
 const comparison=await page.locator('.qa-scenario-grid').textContent();
 for(const expected of ['100 → 70','100 → 130','−5 ₽','+25 ₽','≈ 0 ₽','фьючерс теряет 30 ₽']){
  assert.ok(comparison.includes(expected),'missing hedge scenario: '+expected);
 }
 assert.equal(await page.locator('.qa-learning-detail').count(),3,'strike, basis, and costs are optional details');
 assert.equal(await page.locator('.qa-learning-detail[open]').count(),0,'advanced sections collapsed by default');
 const wideColumns=await page.locator('.qa-scenario-grid').evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(' ').length);
 assert.equal(wideColumns,2,'desktop scenarios side by side');
 await page.locator('.qa-learning-detail').nth(0).locator('summary').click();
 assert.ok((await page.locator('.qa-learning-detail').nth(0).textContent()).includes('88 ₽'),'strike example renders');
 await page.locator('.qa-learning-detail').nth(1).locator('summary').click();
 assert.ok((await page.locator('.qa-learning-detail').nth(1).textContent()).includes('Базис B = F − S'),'basis formula renders');
 await page.locator('.qa-learning-detail').nth(2).locator('summary').click();
 const costs=await page.locator('.qa-learning-detail').nth(2).textContent();
 assert.ok(costs.includes('нет универсальной ежедневной платы'),'no fictional daily short fee');
 assert.ok(costs.includes('фандинга')&&costs.toLowerCase().includes('вариационная маржа'),'funding and margin clarified');
 await page.setViewportSize({width:390,height:844});
 const mobileLayout=await page.locator('.qa-scenario-grid').evaluate(el=>({
  cols:getComputedStyle(el).gridTemplateColumns.split(' ').length,
  right:el.getBoundingClientRect().right,
  viewport:innerWidth
 }));
 assert.equal(mobileLayout.cols,1,'phone scenarios are stacked');
 assert.ok(mobileLayout.right<=mobileLayout.viewport+1,'no mobile overflow: '+JSON.stringify(mobileLayout));
 const tapHeight=await page.locator('.qa-learning-detail').first().locator('summary').evaluate(el=>el.getBoundingClientRect().height);
 assert.ok(tapHeight>=50,'touch disclosure target tall enough');
 await page.screenshot({path:resolve(root,'test-artifacts','hedge-069-390-mobile.png'),fullPage:false});
 await page.setViewportSize({width:320,height:640});
 const narrow=await page.locator('.qa-scenario-grid').evaluate(el=>el.getBoundingClientRect().right<=innerWidth+1);
 assert.ok(narrow,'no overflow for 320px viewport');

 // The same corrected guidance must appear in the catalog and after completing the attempt.
 await page.evaluate(()=>{tab='catalog';catalogTerm='Почему покупка опциона put';render()});
 await page.locator('[data-open-answer="V2-069"]').click();
 assert.equal(await page.locator('#catalog-V2-069 .fsc-study-link').count(),1,'V2-069 links to basic theory');
 const catalog069=await page.locator('#catalog-V2-069').textContent();
 assert.ok(catalog069.includes('100 → 130')&&catalog069.includes('Базис B = F − S'),'catalog uses enhanced answer');
 await page.evaluate(()=>{
  session={version:2,ids:['V2-069'],mode:'practice',pos:0,
   responses:{'V2-069':{text:'Верно',confidence:2,checked:true,revealed:true}},grades:{'V2-069':{score:1,strict:true,points:3,total:3}},orders:{},
   done:true,started:Date.now(),deadline:null,recorded:{}};
  tab='quiz';render();
 });
 assert.ok(await page.locator('.qa-scenario-grid').isVisible(),'result review uses improved answer');

 // V2-070 must separately teach liquidity and forced close, not duplicate V2-069.
 await page.evaluate(()=>{
  session={version:2,ids:['V2-070'],mode:'practice',pos:0,responses:{},grades:{},orders:{},done:false,started:Date.now(),deadline:null,recorded:{}};
  tab='quiz';render();
 });
 await page.locator('#freeText').fill('Прибыль по акции может быть нереализованной, а маржу нужно оплатить сейчас.');
 await page.locator('#check').click();
 assert.equal(await page.locator('.qa-timeline-step').count(),3,'three-stage forced-close timeline');
 const mar=await page.locator('.qa-margin-lesson').textContent();
 assert.ok(mar.includes('+2 ₽')&&mar.includes('−30 ₽'),'hold vs forced close math');
 assert.ok(mar.includes('Акция выросла на +20 ₽'),'unrealized stock gains not instantly cash');
 assert.ok(mar.includes('Продажа самих акций не обязательна'),'no automatic stock liquidation');
 await page.evaluate(()=>{tab='catalog';catalogTerm='Фьючерсное хеджирование показывает';render()});
 await page.locator('[data-open-answer="V2-070"]').click();
 assert.equal(await page.locator('#catalog-V2-070 .fsc-study-link').count(),1,'V2-070 links to margin theory');
 assert.ok((await page.locator('#catalog-V2-070').textContent()).includes('+2 ₽'),'catalog V2-070 updated');
 await page.locator('#catalog-V2-070 .fsc-study-link').click();
 assert.ok(await page.locator('.fsc-cash-grid').isVisible(),'question link opens matching S2-02 theory');
 await page.setViewportSize({width:1366,height:768});
 await page.evaluate(()=>{session=null;tab='overview';render()});

 // Content-first: the five financial strategy cases belong to four lessons.
 assert.equal(await page.locator('.top-tabs [data-tab="strategies"]').count(),0,'no competing strategy tab');
 await page.locator('.top-tabs [data-tab="learn"]').click();
 await page.waitForSelector('.study-shell',{timeout:25000});
 await page.locator('.study-left [data-studylesson="S1-07"]').click();
 await page.waitForSelector('.fri-strategy-case');
 assert.equal(await page.locator('.fri-strategy-case').count(),2,'steepener and flattener included in duration lesson');
 assert.ok((await page.locator('.fri-strategy-case').first().textContent()).includes('Steepener'));
 const embeddedChart=page.locator('.fri-strategy-case').first().locator('svg[role="img"]');
 assert.ok(await embeddedChart.isVisible(),'corrected diagram within lesson');
 await page.locator('.fri-strategy-miniquestion').first().locator('[data-strategy-option="1"]').click();
 assert.ok((await page.locator('.fri-strategy-feedback').first().textContent()).includes('Пока неверно'),'feedback on conceptual error');
 await page.locator('.fri-strategy-miniquestion').first().locator('[data-strategy-option="0"]').click();
 assert.ok((await page.locator('.fri-strategy-feedback').first().textContent()).includes('Верно'),'feedback on correct answer');
 await page.locator('.fri-strategy-formula').first().locator('summary').click();
 assert.ok(await page.locator('.fri-strategy-formula .strategy-math').first().isVisible(),'stepwise calculation available');
 await page.screenshot({path:resolve(root,'test-artifacts','embedded-strategies-desktop.png'),fullPage:false});
 for(const [id,pos,expected] of [['S1-09',0,'3,45 млн'],['S2-02',1,'0,90%'],['S2-06',0,'16,37%']]){
  await page.locator('.study-left [data-studylesson="'+id+'"]').click();
  if(pos)await page.locator('[data-studyblock="'+pos+'"]').first().click();
  await page.waitForSelector('.fri-strategy-case');
  assert.ok((await page.locator('.fri-strategy-case').first().textContent()).includes(expected),'case in related block '+id);
  assert.ok(await page.locator('.fri-strategy-case').first().locator('svg').isVisible(),'illustration '+id);
 }
 const nav=page.locator('.study-left');
 assert.ok(await nav.isVisible(),'desktop navigator visible');
 const dims=await page.locator('.study-left .study-menu').evaluate(el=>{
  const rect=el.getBoundingClientRect();
  return {client:el.clientHeight,scroll:el.scrollHeight,height:rect.height,overflow:getComputedStyle(el).overflowY};
 });
 assert.ok(dims.client>80,'navigation should have usable height');
 assert.equal(dims.overflow,'auto');
 assert.ok(await page.locator('.study-left .study-head').isVisible(),'header stays visible');
 assert.ok(await page.locator('.study-left .study-source-shortcut').isVisible(),'sources stay visible');
 // 5.0.15: at least four FULL topic rows are visible before scrolling.
 const sidebarFit=async()=>{
  return page.locator('.study-left .study-menu').evaluate(menu=>{
   const bounds=menu.getBoundingClientRect();
   const entries=[...menu.querySelectorAll('.study-item')];
   return {viewport:innerHeight,width:innerWidth,menuHeight:menu.clientHeight,visible:entries.filter(e=>{
    const r=e.getBoundingClientRect();
    return r.top>=bounds.top-1&&r.bottom<=bounds.bottom+1;
   }).length,firstFour:entries.slice(0,4).map(e=>{
    const r=e.getBoundingClientRect();
    return {top:Math.round(r.top),bottom:Math.round(r.bottom),title:e.querySelector('b')?.textContent,subtitle:e.querySelector('small')?.textContent};
   }),details:!!document.querySelector('.study-left .study-head-about'),
   search:!!document.querySelector('.study-left [data-fri-search-input]'),
   sources:!!document.querySelector('.study-left [data-open-course-sources]')};
  });
 };
 for(const [width,height] of [[1366,768],[1366,720],[1024,720],[960,720]]){
  await page.setViewportSize({width,height});
  const check=await sidebarFit();
  assert.ok(check.visible>=4,'Need at least four full topic rows without scrolling: '+JSON.stringify(check));
  assert.ok(check.details&&check.search&&check.sources,'sidebar utilities remain available');
  assert.ok(check.firstFour[0].subtitle.length>30,'subtitle retained as actual content');
  assert.ok((await page.locator('.study-left .study-item').first().getAttribute('title')).includes(check.firstFour[0].subtitle),'full subtitle available on hover');
  await page.screenshot({path:resolve(root,'test-artifacts','topics-'+width+'x'+height+'.png'),fullPage:false});
 }
 await page.setViewportSize({width:1366,height:768});
 await page.locator('.study-left .study-head-about summary').click();
 assert.ok((await page.locator('.study-left .study-head-about p').textContent()).includes('Прогресс сохраняется'),'full explanation retained');
 await page.locator('.study-left .study-head-about summary').click();

 await page.locator('.study-left [data-open-syllabus]').click();
 await page.waitForSelector('dialog.fri-syllabus-dialog[open]');
 await page.locator('dialog [data-fri-syllabus-mode="coverage"]').click();
 assert.ok((await page.locator('dialog [data-fri-syllabus-lesson]').count())>=17);
 await page.locator('dialog [data-fri-syllabus-lesson="R-01"][data-fri-syllabus-block="0"]').first().click();
 await page.waitForSelector('.fri-comparisons .fri-comparison');
 assert.equal(await page.locator('.fri-comparisons .fri-comparison').count(),2,'matrix opens correct explanatory block directly');
 await page.locator('.study-left [data-open-syllabus]').click();

 await page.locator('dialog [data-fri-syllabus-mode="registry"]').click();
 await page.locator('dialog .fri-syllabus-search').fill('дюрация');
 assert.ok((await page.locator('dialog [data-fri-syllabus-lesson]').count())>0);
 await page.locator('dialog [data-fri-close]').click();
 await page.locator('.study-left [data-studylesson="S2-09"]').click();
 await page.waitForSelector('#v5InsightBtn');
 await page.locator('#v5InsightBtn').click();
 await page.waitForSelector('[data-fri-lab="option"]');
 const cardBg=await page.locator('.fri-card').first().evaluate(el=>getComputedStyle(el).backgroundColor);
 assert.notEqual(cardBg,'rgb(255, 255, 255)','dark card expected');
 await page.locator('[data-fri-lab="option"] input[type="range"]').evaluate(el=>{el.value='150';el.dispatchEvent(new Event('input',{bubbles:true}))});
 assert.ok((await page.locator('[data-fri-lab="option"] [data-fri-result]').innerText()).includes('42'));
 // 5.0.12: visible scenario, wrong answer -> due now, corrected answer -> due tomorrow.
 await page.locator('.study-left [data-studylesson="R-01"]').click();
 await page.locator('#v5InsightBtn').click();
 await page.waitForSelector('[data-fri-trap="R-01-0"]');
 assert.ok((await page.locator('.fri-peer-practice').textContent()).includes('20 дней'),'contextual exercise included');
 // Verify new learner-facing comparative cases from all 17 mapped sections.
 const rendered=await page.evaluate(()=>FRI_COLLEAGUE_COVERAGE.map(x=>({
  section:x[0],count:(friContrastMarkup(x[2],x[3]).match(/class="fri-comparison"/g)||[]).length
 })));
 assert.equal(rendered.length,17,'all 17 mapped sections available in browser');
 assert.ok(rendered.every(x=>x.count===2),'broken comparison sections '+JSON.stringify(rendered));
 assert.equal(await page.locator('.fri-comparisons .fri-comparison').count(),2,'visible comparisons in R-01');
 await page.locator('.fri-comparisons .fri-comparison').first().locator('summary').click();
 assert.ok(await page.locator('.fri-comparisons .fri-comparison').first().locator('.fri-comparison-scenario').isVisible(),'scenario expands');
 assert.ok((await page.locator('.fri-comparison-conclusion').first().textContent()).includes('Срок'),'scenario has independent financial reasoning');

 const practiceColors=await page.locator('.fri-card').evaluateAll(els=>els.map(el=>getComputedStyle(el).backgroundColor));
 assert.ok(practiceColors.every(c=>c!=='rgb(255, 255, 255)'),'all learning cards must use dark style');
 
 await page.locator('[data-fri-trap="R-01-0"][data-answer="true"]').click();
 assert.ok((await page.locator('#fri-trap-feedback').innerText()).includes('Ошибка'));
 await page.locator('.study-left [data-open-syllabus]').click();
 await page.locator('dialog [data-fri-syllabus-mode="review"]').click();
 assert.ok((await page.locator('dialog [data-fri-syllabus-lesson="R-01"]').count())>=1,'failed topic should be due');
 await page.locator('dialog [data-fri-close]').click();
 await page.locator('[data-fri-trap="R-01-0"][data-answer="false"]').click();
 assert.ok((await page.locator('#fri-trap-feedback').innerText()).includes('Верно'));
 const interval=await page.evaluate(()=>friLearning.review['R-01-0']);
 assert.equal(interval.streak,1);
 assert.ok(Date.parse(interval.dueAt)>Date.now(),'success schedules next day');
 await page.locator('.study-left [data-open-syllabus]').click();
 await page.locator('dialog [data-fri-syllabus-mode="review"]').click();
 assert.equal(await page.locator('dialog [data-fri-syllabus-lesson="R-01"]').count(),0,'corrected topic not due now');
 await page.locator('dialog [data-fri-close]').click();
 await page.reload({waitUntil:'domcontentloaded'});
 const restored=await page.evaluate(()=>JSON.parse(localStorage.getItem('bacrf_finance_trainer_insights_v1')).review['R-01-0']);
 assert.equal(restored.streak,1,'review schedule survives reload');
 // Export an actual progress file and verify 5.0.12 review data is included.
 const [download]=await Promise.all([page.waitForEvent('download'),page.locator('#export').evaluate(el=>el.click())]);
 const exported=JSON.parse(readFileSync(await download.path(),'utf8'));
 assert.equal(exported.version,3,'backward compatible progress envelope');
 assert.equal(exported.friInsights.review['R-01-0'].streak,1,'scheduled review exported');
 assert.ok(exported.independentPractice?.answers,'independent answers exported');
 // Import round trip after removing the review record.
 await page.evaluate(()=>{delete friLearning.review['R-01-0'];friSave()});
 assert.ok(!(await page.evaluate(()=>friLearning.review['R-01-0'])),'test record removed before import');
 page.once('dialog',d=>d.accept());
 await page.locator('#importFile').setInputFiles({name:'progress.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(exported))});
 await page.waitForFunction(()=>JSON.parse(localStorage.getItem('bacrf_finance_trainer_insights_v1'))?.review?.['R-01-0']?.streak===1);
 assert.equal((await page.evaluate(()=>friLearning.review['R-01-0'])).streak,1,'review schedule restored from import');
 
 await page.evaluate(()=>document.querySelector('[data-tab="learn"]').click());
 await page.waitForSelector('.study-shell');
 await page.screenshot({path:resolve(root,'test-artifacts','desktop.png'),fullPage:false});
 
 await page.setViewportSize({width:390,height:844});
 await page.reload({waitUntil:'domcontentloaded',timeout:60000});
 await page.evaluate(()=>document.querySelector('[data-tab="learn"]').click());
 // Mobile strategy content is reachable within the existing course navigation.
 await page.locator('.study-mobile-nav > summary').click();
 await page.locator('.study-mobile-nav [data-studylesson="S1-07"]').click();
 await page.waitForSelector('.fri-strategy-case svg');
 const chartBounds=await page.locator('.fri-strategy-case svg').first().evaluate(el=>({width:el.getBoundingClientRect().width,viewport:innerWidth,documentWidth:document.documentElement.scrollWidth}));
 assert.ok(chartBounds.width<chartBounds.viewport,'integrated 390px SVG fits mobile screen');
 assert.ok(chartBounds.documentWidth<=chartBounds.viewport+2,'no horizontal overflow '+JSON.stringify(chartBounds));
 await page.locator('.fri-strategy-miniquestion').first().locator('[data-strategy-option="0"]').click();
 assert.ok((await page.locator('.fri-strategy-feedback').first().textContent()).includes('Верно'),'mobile interactive self-check');
 await page.screenshot({path:resolve(root,'test-artifacts','embedded-strategies-mobile.png'),fullPage:false});
 await page.locator('.study-mobile-nav > summary').click();
 assert.ok(await page.locator('.study-mobile-nav .study-head').isVisible());
 await page.locator('.study-mobile-nav [data-open-syllabus]').click();
 await page.waitForSelector('dialog.fri-syllabus-dialog[open]');
 const width=await page.locator('dialog.fri-syllabus-dialog').evaluate(el=>el.getBoundingClientRect().width);
 assert.ok(width>=370&&width<=395,'mobile dialog width '+width);
 
 // 320 px smartphone and 768 px tablet must retain usable, non-clipped syllabus.
 for(const w of [320,768]){
  await page.setViewportSize({width:w,height:780});
  const d=await page.locator('dialog.fri-syllabus-dialog').evaluate(el=>el.getBoundingClientRect());
  assert.ok(d.width<=w+2&&d.width>=Math.min(310,w-10),'dialog responsive width '+w+': '+d.width);
 }

 
 await page.locator('dialog [data-fri-close]').click();
 await page.setViewportSize({width:320,height:780});
 await page.locator('.study-mobile-nav [data-studylesson="R-01"]').click();
 await page.locator('#v5InsightBtn').click();
 await page.locator('.fri-comparisons .fri-comparison').first().locator('summary').click();
 const comparisonWidth=await page.locator('.fri-comparison-grid').first().evaluate(el=>({
  grid:getComputedStyle(el).gridTemplateColumns,
  width:el.getBoundingClientRect().width,
  viewport:window.innerWidth,
  overflow:document.documentElement.scrollWidth>window.innerWidth+2
 }));
 assert.ok(!comparisonWidth.overflow,'comparison must not overflow 320px viewport '+JSON.stringify(comparisonWidth));
 assert.ok(comparisonWidth.grid.split(' ').length===1,'single-column comparison on smartphone');
 await page.screenshot({path:resolve(root,'test-artifacts','comparisons-mobile.png'),fullPage:false});

 await page.screenshot({path:resolve(root,'test-artifacts','mobile.png'),fullPage:false});
 console.log('PASS browser: 17 comparative sections and mobile 320px; desktop sidebar '+JSON.stringify(dims)+', 28 cases, retention, recall intervals, option lab, dark cards, study search, coverage, mobile modal.');
}catch(e){
 await page.screenshot({path:resolve(root,'test-artifacts','failure.png'),fullPage:false}).catch(()=>{});
 throw e;
}finally{await browser.close()}
