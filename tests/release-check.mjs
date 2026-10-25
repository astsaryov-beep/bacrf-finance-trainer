import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import assert from 'node:assert/strict';
import vm from 'node:vm';

const root=resolve(import.meta.dirname,'..');
const html=readFileSync(resolve(root,'index.html'),'utf8');
const frozen=readFileSync(resolve(root,'v5.0.8/index.html'),'utf8');
const block=html.match(/<script>([\s\S]*?)<\/script>/);
assert.ok(block,'inline JS exists');
new vm.Script(block[1],{filename:'index.html:inline.js'});
assert.match(html,/trainer-version" content="5\.0\.21 beta"/);

function data(src,prefix){
 const i=src.indexOf(prefix);assert.ok(i>=0,'missing '+prefix);
 const end=src.indexOf(';\n',i);assert.ok(end>i,'terminator '+prefix);
 return JSON.parse(src.slice(i+prefix.length,end));
}
assert.doesNotMatch(html,/data-tab="strategies"/,"strategies are part of course, not top-level tab");
assert.match(html,/src="strategies.js"/);
assert.match(html,/href="strategies.css"/);
assert.match(html,/href="course-sidebar.css"/,"compact course sidebar must load its CSS");
const course=data(html,'const STUDY_LESSONS=');
const stableBank=data(frozen,'const BANK=');
const bank=data(html,'const BANK=');
const legacy=data(html,'const STUDY_V5 = ');
const map=data(html,'const FRI_COLLEAGUE_COVERAGE=');
const contrasts=data(html,'const FRI_PEER_CONTRASTS=');
const diagrams=data(html,'const FRI_DIAGRAMS=');
const fallback=data(html,'const FRI_TRAP_FALLBACK=');
const supplements=data(html,'const FRI_TOPIC_SUPPLEMENTS=');
const blocks=course.flatMap(l=>l.blocks.map((b,pos)=>({l,b,pos,id:l.id+'-'+pos})));
// v5.0.21: independent checks of the first five concept-first explanations.
const master=data(html,'const STUDY_MASTER = ');
const editedLessonIds=['S1-01-0','S1-01-1','S1-02-0','S1-02-1','S1-03-0'];
for(const id of editedLessonIds){
 const item=master[id],unit=legacy[id];
 assert.ok(item&&unit,'missing reviewed lesson '+id);
 assert.ok(unit.foundation.length>=160,'weak beginner introduction '+id);
 assert.equal(item.mechanism.length,3,'not three grounded mechanism steps: '+id);
 assert.ok(item.mechanism.every(s=>s.length>=120),'mechanism under-explained '+id);
 assert.ok(item.application[0].length>=170,'weak life example '+id);
 assert.ok(item.exercise[0].length>=145,'missing concept exercise '+id);
 assert.ok(item.advanced[0].length>=170,'advanced risks missing '+id);
 assert.match(item.sources,/Семинар 1/,'source coverage missing '+id);
 assert.equal(unit.formulas.length>=1,true,'formula drill deleted '+id);
}
assert.match(master['S1-01-0'].foundation.join(' '),/прибыл.*ликвидность/i);
assert.match(master['S1-01-1'].mechanism.join(' '),/RUONIA.*RUSFAR/s);
assert.match(master['S1-02-0'].application.join(' '),/не переходит банку автоматически/);
assert.match(master['S1-02-1'].mechanism.join(' '),/не добавляет право на повторную выдачу/);
assert.match(master['S1-03-0'].mechanism.join(' '),/CFADS.*DSCR/s);
assert.equal(course.length,48);
assert.equal(blocks.length,96);
assert.equal(bank.length,275);
assert.deepEqual(bank,stableBank,'Main exam bank must equal frozen stable bank');
const feedback=readFileSync(resolve(root,'exam-feedback.js'),'utf8');
const feedbackCss=readFileSync(resolve(root,'exam-feedback.css'),'utf8');
new vm.Script(feedback,{filename:'exam-feedback.js'});
assert.match(html,/src="exam-feedback.js"/,'post-answer helper loaded');
assert.match(html,/href="exam-feedback.css"/,'mobile feedback CSS loaded');
assert.match(feedback,/V2-069/,'put/futures feedback included');
assert.match(feedback,/вариационная маржа/i);
assert.match(feedback,/V2-070/);
assert.match(feedback,/короткий фьючерс.*убыток/i);
assert.match(feedback,/formulaQuestions:Object.keys\(QUESTION_FORMULA_IDS\).length/);
assert.match(feedbackCss,/qa-scenario-grid/);
assert.match(feedbackCss,/qa-learning-detail/);

const futuresGuide=readFileSync(resolve(root,'futures-short-guide.js'),'utf8');
const futuresCss=readFileSync(resolve(root,'futures-short-guide.css'),'utf8');
new vm.Script(futuresGuide,{filename:'futures-short-guide.js'});
assert.match(html,/src="futures-short-guide.js"/,'guide loaded in app');
assert.match(html,/href="futures-short-guide.css"/,'guide stylesheet linked');
assert.match(html,/futuresShortCourseMarkup\(l\.id,pos,'full'\)/,'foundations include futures short comparison');
assert.match(html,/futuresShortCourseMarkup\(l\.id,pos,'brief'\)/,'exam summary includes short borrowing distinction');
const futuresGuideMarkup=new Function(futuresGuide+'return futuresShortCourseMarkup;')();
const shortVsShares=futuresGuideMarkup('S2-01',0,'full');
const settlement=futuresGuideMarkup('S2-02',0,'full');
assert.match(shortVsShares,/ШОРТ АКЦИИ/);
assert.match(shortVsShares,/SHORT FUTURES/);
assert.match(shortVsShares,/Занимаем акцию у брокера/);
assert.match(shortVsShares,/но не аренда базовой акции/);
assert.match(shortVsShares,/Открытие и исполнение — разные этапы/);
assert.match(shortVsShares,/расчётного/i);
assert.match(settlement,/Гарантийное обеспечение/);
assert.match(settlement,/Вариационная маржа/);
assert.match(settlement,/Фандинг/iu);
assert.match(settlement,/нет обязательной ежедневной платы/);
assert.match(settlement,/срочного фьючерса/);
assert.equal(futuresGuideMarkup('S2-01',0,'brief').includes('заём и продажа'),true);
assert.equal(futuresGuideMarkup('S2-02',0,'brief').includes('ГО'),true);
assert.equal(futuresGuideMarkup('S1-07',0,'full'),'','do not add irrelevant widget to other courses');
const scopedCourseMarkup=new Function('const STUDY_V5 = {"S1-01-0":{formulas:[{title:"Кассовый остаток"}]},"S1-07-0":{formulas:[]}};'+futuresGuide+'return futuresShortCourseMarkup;')();
assert.match(scopedCourseMarkup('E-13',0,'full'),/вопросов из этого раздела на экзамене не будет/,'margin trading has teacher notice');
assert.match(scopedCourseMarkup('E-13',1,'brief'),/не означает исключения всех вопросов о РЕПО/,'repo remains a distinct topic');
assert.match(scopedCourseMarkup('S1-01',0,'full'),/Расчётные задания/,'calculation explainer noted in full lesson');
assert.match(scopedCourseMarkup('S1-01',0,'brief'),/Формулы и числовые примеры/,'exam digest explains why formulas remain');
assert.equal(scopedCourseMarkup('S1-07',0,'full'),'','unaffected conceptual lesson stays clean');
assert.match(futuresCss,/fsc-exam-note/,'exam scope notice styled');

assert.match(futuresCss,/@media\(max-width:700px\)/);
assert.match(futuresCss,/grid-template-columns:1fr/);
assert.match(feedback,/futuresStudyLink\('S2-01'/,'open answer links to introductory theory');
assert.match(feedback,/futuresStudyLink\('S2-02'/,'margin question links to futures settlement lesson');


assert.match(feedback,/EXAM_HEDGE_BRIEFS/,'question answer overrides available');
assert.match(feedback,/Базис B = F − S/,'basis disclosure');
assert.match(feedback,/нет универсальной ежедневной платы/,'short does not imply daily borrowing fee');
assert.match(feedback,/Ставка фандинга|фандинга/,'perpetual funding is conditional');
assert.match(feedback,/принудительно закрыть/,'liquidity risk is explained');
assert.match(feedback,/для K ≤ 100/,'premium and strike trade-off constrained correctly');
assert.match(feedbackCss,/qa-scenario-grid/,'readable scenario layout');
assert.match(feedbackCss,/@media\(max-width:650px\)/,'mobile stacked layout');
// Independently check the numbers in both financial thought experiments.
const putNet=(spot,strike,premium,terminal)=>terminal-spot+Math.max(strike-terminal,0)-premium;
const futureNet=(spot,initialFuture,terminalSpot,terminalFuture)=>
 terminalSpot-spot+initialFuture-terminalFuture;
assert.equal(putNet(100,100,5,70),-5);
assert.equal(putNet(100,100,5,130),25);
assert.equal(putNet(100,90,2,70),-12);
assert.equal(futureNet(100,100,70,70),0);
assert.equal(futureNet(100,100,130,130),0);
assert.equal(futureNet(100,102,90,93),-1,'basis change leaves residual loss');
assert.equal(futureNet(100,102,90,90),2,'full hedge through expiry');
assert.equal((90-100)+(102-122),-30,'forced close loses futures hedge');


assert.equal(bank.filter(x=>x.origin==='original').length,19);
assert.equal(Object.keys(legacy).length,96);
assert.equal(blocks.reduce((n,x)=>n+x.b.glossary.length,0),443);
const formulaCount=Object.values(legacy).reduce((n,x)=>n+(x.formulas?.length||0),0);
assert.equal(formulaCount,84);
for(const [id,unit] of Object.entries(legacy)){
 assert.ok(unit.foundation?.length>=120,'beginner explanation too short '+id);
 assert.ok(unit.mechanism?.length>=120,'mechanism too short '+id);
 assert.ok(unit.application?.length>=90,'worked application too short '+id);
 assert.ok(unit.advanced?.length>=100,'advanced explanation too short '+id);
 for(const f of unit.formulas||[]){
  assert.ok(f.title&&f.expression,'formula name or expression absent '+id);
  assert.ok(f.example?.length>=30,'formula without worked example '+id+' '+f.title);
  assert.ok(f.meaning?.length>=35&&f.conditions?.length>=35,'formula without interpretation or assumptions '+id);
  assert.ok(f.variables?.length>=2,'formula variables missing '+id);
  for(const v of f.variables)assert.ok(v.symbol&&v.description?.length>=10&&v.unit,'formula symbol unexplained '+id);
 }
}

assert.equal(Object.keys(diagrams).length,15);
assert.equal(Object.keys(supplements).length,5);
assert.equal(map.length,17);
assert.equal(contrasts.length,17,'17 peer sections must have authored worked comparisons');
assert.equal(new Set(contrasts.map(x=>x.id)).size,17,'duplicate comparison sections');
assert.equal(contrasts.reduce((n,x)=>n+x.items.length,0),34,'34 worked comparison cases');
const mapIds=new Set(map.map(x=>x[0]));
for(const entry of contrasts){
 assert.ok(mapIds.has(entry.id),'unmapped peer comparison '+entry.id);
 assert.equal(entry.items.length,2,'each peer section needs two distinct comparisons '+entry.id);
 for(const [a,aText,b,bText,scenario,reason] of entry.items){
  assert.notEqual(a,b,'same comparison terms '+entry.id);
  assert.ok(a.trim().length>=2&&b.trim().length>=2,'comparison labels missing');
  assert.ok(aText.length>=55&&bText.length>=55,'comparison has shallow mechanism '+entry.id);
  assert.ok(scenario.length>=55,'comparison without realistic situation '+entry.id);
  assert.ok(reason.length>=65,'comparison without explanatory conclusion '+entry.id);
 }
}
assert.match(html,/friContrastMarkup\(l\.id,pos\)/,'comparison integration must be visible inside study cards');
assert.match(html,/\.fri-comparison-grid\{display:grid/,'comparison grid styling missing');
assert.match(html,/@media\(max-width:620px\)\{\.fri-comparison-grid\{grid-template-columns:1fr/,'mobile comparison layout missing');

const ids=new Set(blocks.map(x=>x.id));
for(const row of map)assert.ok(ids.has(row[2]+'-'+row[3]),'unlinked supplement '+row[0]);
for(const k of Object.keys(diagrams))assert.ok(ids.has(k),'orphan diagram '+k);
const existing=html.slice(html.indexOf('const FRI_TRAP_CASES='),html.indexOf('const FRI_TRAP_FALLBACK='));
const original=[...existing.matchAll(/\s*'([A-Z0-9-]+-\d+)':\[/g)].map(x=>x[1]);
assert.equal(original.length,34);assert.equal(Object.keys(fallback).length,62);
for(const x of blocks)assert.ok(original.includes(x.id)||fallback[x.id],'missing trap '+x.id);
const bindings=html.match(/const FRI_LAB_BINDINGS=\{([^}]+)\};/);
assert.ok(bindings,'labs map');
const labs=[...bindings[1].matchAll(/'([A-Z0-9-]+-\d+)':'([a-z]+)'/g)];
assert.equal(labs.length,10);
for(const l of labs)assert.ok(ids.has(l[1]),'invalid lab '+l[1]);

const start=html.indexOf('const FRI_PRACTICE_BANK='),end=html.indexOf('function friExtraForBlock',start);
const courseMap=new Map(course.map(l=>[l.id,l]));
const practiceBuilder=new Function('STUDY_MAP','FRI_COLLEAGUE_COVERAGE',
  html.slice(start,end)+'return FRI_PRACTICE_BANK;');
const practice=practiceBuilder(courseMap,map);
assert.equal(practice.length,70);
assert.equal(practice.filter(q=>q.type==='multi').length,45);
assert.equal(practice.filter(q=>q.type==='open').length,25);
assert.equal(new Set(practice.map(q=>q.id)).size,70);
for(const q of practice.filter(q=>q.type==='multi'))assert.ok(q.correct>=0&&q.correct<q.options.length);
const editorialMC=data(html,'const FRI_EDITORIAL_MC=');
const editorialOpen=data(html,'const FRI_EDITORIAL_OPEN=');
assert.equal(editorialMC.length,17);assert.equal(editorialOpen.length,25);
const scenarioMC=data(html,'const FRI_EDITORIAL_SCENARIOS=');
assert.equal(scenarioMC.length,28,'28 additional scenarios');
const caseIds=new Set(scenarioMC.map(x=>x[0]));
assert.equal(caseIds.size,28,'unique authored scenarios');
for(const q of practice.filter(q=>q.type==='multi')){
 assert.ok(q.question.length>=45,'too short scenario '+q.id);
 assert.ok(q.options.length===3&&new Set(q.options).size===3,'broken distractors '+q.id);
 assert.ok(q.why.length>=30,'missing financial explanation '+q.id);
 if(caseIds.has(q.id))assert.ok(q.question.includes('?'),'question missing interrogative '+q.id);
}
assert.equal(practice.filter(q=>q.type==='multi'&&q.question.includes('Какое понятие описано так')).length,0,'rote definition quizzes remain');
const schedStart=html.indexOf('const FRI_DAY_MS=');
const schedEnd=html.indexOf('function friSave()',schedStart);
assert.ok(schedStart>0&&schedEnd>schedStart,'review scheduler exists');
const makeScheduler=new Function('friLearning','friSave','friKey',html.slice(schedStart,schedEnd)+'return {friReviewRecord,friReviewStatus};');
const state={review:{}},saved=[];
const scheduler=makeScheduler(state,()=>saved.push('ok'),(id,pos)=>id+'-'+pos);
const day=86400000,stamp=Date.UTC(2026,9,24),topic={id:'R-01',blocks:[{},{}]};
assert.equal(Date.parse(scheduler.friReviewRecord('R-01-0',true,stamp).dueAt),stamp+day,'first interval');
assert.equal(Date.parse(scheduler.friReviewRecord('R-01-0',true,stamp+day).dueAt),stamp+4*day,'second interval 3 days');
assert.equal(scheduler.friReviewStatus(topic,stamp+2*day).due.length,0,'not due early');
assert.equal(scheduler.friReviewStatus(topic,stamp+4*day).due.length,1,'due after 3 days');
assert.equal(Date.parse(scheduler.friReviewRecord('R-01-0',false,stamp+4*day).dueAt),stamp+4*day,'wrong due today');
assert.equal(scheduler.friReviewStatus(topic,stamp+4*day).due.length,1,'wrong reappears');
assert.ok(saved.length>=3,'review saved');
assert.match(html,/review:isPlainRecord\(obj\.friInsights\.review\)/,'review import persists');


// Execute 32 boundary examples of all ten interactive financial models.
const fnStart=html.indexOf('function friUpdateLab(');
const fnEnd=html.indexOf('const FRI_ORIGINAL_QUESTION_MAP',fnStart);
assert.ok(fnStart>=0&&fnEnd>fnStart);
const calc=new Function('container',html.slice(fnStart,fnEnd)+'friUpdateLab(container)');
const boundary={
 waterfall:[0,10,30,50],bond:[2,8,20],duration:[-300,0,300],
 swap:[4,11,20],capm:[0,1.2,2.5],option:[60,100,108,150],
 basis:[900,1000,1150],spread:[10,12,23],liquidity:[40,120,180],franchise:[0,20,120]
};
let n=0;
for(const [kind,values] of Object.entries(boundary))for(const value of values){
 const output={innerHTML:''},current={textContent:''};
 calc({dataset:{friLab:kind},querySelector(s){
  if(s==='[data-fri-range]')return {value};
  if(s==='[data-fri-result]')return output;
  if(s==='[data-fri-current]')return current;
  return null;
 }});
 assert.ok(output.innerHTML.length>10);
 assert.ok(!/(?:NaN|Infinity)/.test(output.innerHTML),'bad result '+kind+' '+value);
 n++;
}
assert.equal(n,32);
assert.match(html,/fri-expand-syllabus/);
assert.match(html,/fri-syllabus-dialog/);
assert.doesNotMatch(html,/FRI_PREP_DAYS|План из 8 дней/,"obsolete multi-day planner removed");
assert.match(html,/friStrategyInlineMarkup\(l\.id,pos\)/,"strategies integrated into theory");
assert.match(html,/friBindStrategyInline\(content\)/,"interactive question handlers connected");
assert.match(html,/friKnowledgeRegistry/);
assert.match(html,/independentPractice:friExtra/);
assert.match(html,/friInsights:friLearning/);
console.log('PASS 5.0.16: 96 complete beginner-to-advanced lessons, 84 explained formulas, 48 themes, 96 blocks, 275 unchanged questions, 19 teacher questions, 84 formulas, 17 mapped sections, 70 practice prompts, 96 trap checks, 15 diagrams, 10 labs, 32 boundary cases.');
