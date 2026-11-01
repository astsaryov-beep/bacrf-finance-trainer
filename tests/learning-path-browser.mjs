import {chromium} from 'playwright-core';import {resolve} from 'node:path';import {mkdirSync,writeFileSync,readFileSync} from 'node:fs';import assert from 'node:assert/strict';
const root=resolve(import.meta.dirname,'..'),out=resolve(root,'test-artifacts');mkdirSync(out,{recursive:true});
const browser=await chromium.launch({executablePath:process.env.CHROME_BIN||'/usr/bin/google-chrome',headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
const page=await browser.newPage({viewport:{width:320,height:844}}),errors=[];page.setDefaultTimeout(15000);page.on('pageerror',e=>errors.push(e.message));
async function exercise(id){await page.evaluate(id=>{const q=BANK_MAP.get(id),key=q.courseBlock,cut=key.lastIndexOf('-');goStudyLesson(key.slice(0,cut),Number(key.slice(cut+1)));studyNav.phase='aligned';studyNav.index=CourseLearning.ids(key).indexOf(id);render();},id);}
try{
 await page.goto('file://'+resolve(root,'index.html'),{waitUntil:'domcontentloaded'});
 assert.equal(await page.evaluate(()=>CourseLearning.summary(studyData,progress).assessed),0);
 await page.evaluate(()=>{getStudyBlock('S1-01',0).complete=true;getStudyBlock('S1-01',0).answers.RM19={checked:true,selected:[0],score:1};persistStudy()});
 const baseline=await page.evaluate(()=>JSON.stringify(studyData.blocks['S1-01-0']));
 await exercise('EX17-32');await page.locator('#studyText').fill('ГО резервируют под риск, ВМ отражает текущую переоценку. Остальные части пока не раскрыты.');await page.locator('#studyConfidence').selectOption('1');
 await page.locator('.question-theory-links summary').click();await page.locator('[data-course-support]').first().click();assert.equal(await page.locator('[data-course-return]').count(),1);
 await page.reload();await page.locator('.top-tabs [data-tab="learn"]').click();await page.locator('[data-course-return]').press('Enter');
 assert.match(await page.locator('#studyText').inputValue(),/Остальные части/);assert.equal(await page.locator('#studyConfidence').inputValue(),'1');assert.equal(await page.evaluate(()=>getStudyAnswer('EX17-32').checked),false);
 await page.waitForFunction(()=>document.activeElement===document.querySelector('.study-task h3'));
 await page.locator('#studyReveal').click();await page.locator('[data-studyrubric="0"]').check();await page.locator('#studyGradeOpen').click();
 assert.equal(await page.evaluate(()=>CourseLearning.summary(studyData,progress).selfAssessed),1);assert.equal(await page.evaluate(()=>CourseLearning.summary(studyData,progress).full),0);
 assert.equal(await page.evaluate(()=>JSON.stringify(studyData.blocks['S1-01-0'])),baseline);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));
 await page.screenshot({path:resolve(out,'aligned-partial-open-320.png')});
 await exercise('EX17-03');await page.locator('input[name="studyAnswer"][value="0"]').check();await page.locator('.question-theory-links summary').click();await page.locator('[data-course-support]').first().click();
 await page.reload();await page.locator('.top-tabs [data-tab="learn"]').click();await page.locator('[data-course-return]').click();assert.equal(await page.locator('input[name="studyAnswer"]:checked').count(),1);assert.equal(await page.evaluate(()=>getStudyAnswer('EX17-03').checked),false);
 for(const i of [1,2,3])await page.locator(`input[name="studyAnswer"][value="${i}"]`).check();await page.locator('#studyCheck').click();assert.equal(await page.evaluate(()=>getStudyAnswer('EX17-03').score),1);
 assert.equal(await page.evaluate(()=>CourseLearning.summary(studyData,progress).full),1);await page.screenshot({path:resolve(out,'aligned-four-correct-320.png')});
 await page.locator('[data-course-retry]').click();assert.equal(await page.evaluate(()=>getStudyAnswer('EX17-03').previousReviewResult.selected.length),4);assert.equal(await page.evaluate(()=>getStudyAnswer('EX17-03').checked),false);
 await exercise('RECON-01');await page.locator('#studySkip').click();assert.equal(await page.evaluate(()=>getStudyAnswer('RECON-01').skipped),true);assert.equal(await page.evaluate(()=>CourseLearning.summary(studyData,progress).full),1);await page.screenshot({path:resolve(out,'aligned-reconstruction-320.png')});
 await page.locator('.top-tabs [data-tab="quiz"]').click();await page.locator('#questionSource').selectOption('reconstructed');await page.locator('#learningSkill').selectOption('symbols');await page.locator('#start').click();
 assert.ok(await page.evaluate(()=>session.ids.length>0&&session.ids.every(id=>BANK_MAP.get(id).provenance==='reconstructed'&&BANK_MAP.get(id).learningSkills.includes('symbols'))));
 const [download]=await Promise.all([page.waitForEvent('download'),page.locator('#export').click()]);const saved=JSON.parse(readFileSync(await download.path(),'utf8'));
 const imported=await browser.newPage({viewport:{width:1440,height:900}});imported.on('pageerror',e=>errors.push(e.message));await imported.goto('file://'+resolve(root,'index.html'));await imported.locator('.top-tabs [data-tab="quiz"]').click();imported.once('dialog',d=>d.accept());await imported.locator('#importFile').setInputFiles({name:'aligned-course.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(saved))});
 await imported.waitForFunction(()=>document.getElementById('toast').textContent.includes('импортированы'));
 assert.equal(await imported.evaluate(()=>CourseLearning.summary(studyData,progress).full),1);assert.equal(await imported.evaluate(()=>getStudyBlock('S1-01',0).complete),true);
 assert.equal(await imported.evaluate(()=>studyData.blocks[BANK_MAP.get('EX17-03').courseBlock].answers['EX17-03'].previousReviewResult.selected.length),4);
 await imported.locator('#questionSource').selectOption('reconstructed');await imported.locator('#learningSkill').selectOption('symbols');await imported.locator('#mode').selectOption('exam');imported.once('dialog',d=>d.accept());await imported.locator('#start').click();
 assert.deepEqual(await imported.evaluate(()=>({count:session.ids.length,multi:session.ids.filter(id=>BANK_MAP.get(id).type==='multi').length,calculation:session.ids.some(id=>BANK_MAP.get(id).requiresCalculation),families:new Set(session.ids.map(id=>ExamProfile.metadata(BANK_MAP.get(id)).family)).size})),{count:50,multi:25,calculation:false,families:50});
 await imported.screenshot({path:resolve(out,'aligned-exam-independent-filters-desktop.png')});
 assert.deepEqual(errors,[]);writeFileSync(resolve(out,'aligned-path-evidence.json'),JSON.stringify({drafts:'open and MC survive theory detour/reload',oldBaseProgress:'preserved',assessment:'partial open separate; four-correct MC checked',history:'retry and real export/import preserved',mock:'50 unique assessment targets; calculation excluded; training filters ignored',widths:[320,1440]},null,2));
 console.log('PASS aligned learning:mobile draft/MC/confidence detours,reload/keyboard return,partial self-assessment,4-correct grading,retry history,skip does not certify,old progress,real export/import,targeted skills and independent strict mock');
}catch(e){await page.screenshot({path:resolve(out,'aligned-path-failure.png')}).catch(()=>{});throw e;}finally{await browser.close();}
