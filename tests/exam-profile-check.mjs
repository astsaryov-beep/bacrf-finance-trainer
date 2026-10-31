import vm from 'node:vm';import {readFileSync} from 'node:fs';import assert from 'node:assert/strict';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8'),ctx={};
vm.runInNewContext(read('assets/exam-alignment.js'),ctx);vm.runInNewContext(read('assets/exam-profile.js'),ctx);
const {ExamProfile:p,ExamAlignment:a}=ctx;const normalize=x=>JSON.parse(JSON.stringify(x)),distribution={};
for(let seed=0;seed<1000;seed++){
 const s=p.choose(a.questions,seed);assert.ok(!s.error,seed+':'+s.error);assert.equal(s.items.length,50);assert.equal(new Set(s.items.map(q=>q.id)).size,50);
 for(const [section,formats]of Object.entries(p.quotas))for(const[type,n]of Object.entries(formats))assert.equal(s.items.filter(q=>q.section===section&&q.type===type).length,n);
 assert.equal(s.items.filter(q=>p.metadata(q).sourceGroup==='lecture').length,8);
 assert.equal(s.items.filter(q=>p.metadata(q).taskKind==='knowledge').length,22);for(const type of ['multi','open'])assert.equal(s.items.filter(q=>q.type===type&&p.metadata(q).taskKind==='knowledge').length,11);assert.ok(s.items.filter(q=>p.metadata(q).complex).length>=3);
 assert.ok(s.items.every(q=>!q.numeric&&['multi','open'].includes(q.type)&&!q.block.startsWith('E-13-1')));
 for(const q of s.items)if(q.type==='multi'){
  assert.equal(q.options.length,5);distribution[q.correct.length]=(distribution[q.correct.length]||0)+1;
  assert.deepEqual(Array.from(s.orders[q.id]).sort((a,b)=>a-b),[0,1,2,3,4]);
 }
 assert.equal(JSON.stringify(s),JSON.stringify(p.choose(a.questions,seed)));
}
assert.deepEqual(Object.keys(distribution),['1','2','3','4']);
assert.ok(p.choose(a.questions.filter(q=>q.type==='multi'),1).error);assert.ok(p.choose(a.questions.filter(q=>q.section!=='reg'),1).error);
const original=a.questions.filter(q=>q.provenance==='confirmed_exam_adapted');const baseline=p.choose(original,42);assert.ok(!baseline.error,'the original composition itself remains feasible');
assert.ok(original.some(q=>q.id==='EX17-12')&&original.some(q=>q.id==='EX17-26'),'REPO remains in the theoretical mock');
const sample=p.choose(a.questions,0),bank=new Map(a.questions.map(q=>[q.id,q]));
const session={ids:Array.from(sample.items,q=>q.id),examProfile:normalize(sample.profile),responses:{},grades:{}};
let score=p.summary(session,bank);assert.equal(score.strict,0);assert.equal(score.unverified,25);assert.equal(score.thresholdMet,false);
for(const q of sample.items.filter(q=>q.type==='multi'))session.responses[q.id]={choice:Array.from(q.correct)};
score=p.summary(session,bank);assert.equal(score.verified,25);assert.equal(score.strict,25);assert.equal(score.selfFull,0);assert.equal(score.unverified,25);assert.equal(score.diagnostic,.5);
const q=sample.items.find(q=>q.type==='open'),criteria=q.rubric.map((_,i)=>i);
// A claimed grade without text or explicit rubric assessment adds nothing.
session.grades[q.id]={type:'rubric',points:q.rubric.length,total:q.rubric.length,strict:true,score:1};
score=p.summary(session,bank);assert.equal(score.strict,25);
session.responses[q.id]={text:'Черновик ответа',rubric:Array.from(criteria),checked:false};assert.equal(p.summary(session,bank).strict,25);
session.responses[q.id].checked=true;score=p.summary(session,bank);assert.equal(score.strict,26);assert.equal(score.selfFull,1);assert.equal(score.statuses[q.id],'self_assessed');assert.equal(score.verified,25);
session.responses[q.id].rubric=[0];session.grades[q.id].points=1;score=p.summary(session,bank);assert.equal(score.strict,25);assert.equal(score.selfAssessed,1);assert.ok(score.diagnostic>.5);
session.responses[q.id].rubric=[0,0];session.grades[q.id].points=2;assert.equal(p.summary(session,bank).selfAssessed,0,'duplicate criteria cannot inflate assessment');
session.responses[q.id]={text:' ',rubric:Array.from(criteria),checked:true};session.grades[q.id].points=q.rubric.length;assert.equal(p.summary(session,bank).strict,25);
session.responses[q.id]={text:'Ответ',rubric:Array.from(criteria),checked:true,needsReviewRecheck:true};assert.equal(p.summary(session,bank).strict,25);
session.responses[q.id].needsReviewRecheck=false;session.examProfile.questionRevisions[q.id]='obsolete';score=p.summary(session,bank);assert.equal(score.strict,25);assert.equal(score.stale,1);
const mc=sample.items.find(q=>q.type==='multi');session.responses[mc.id].choice=[...Array.from(mc.correct),mc.correct[0]];assert.equal(p.summary(session,bank).verified,24,'duplicate choices cannot pass exact grading');
const h=read('index.html');assert.ok(h.includes('ExamProfile.choose(pool,seed)'));assert.ok(h.includes('if(selection.profile)session.examProfile=selection.profile'));
assert.ok(h.includes("assessmentStatus:'self_assessed'"));assert.ok(h.includes('ExamProfile.summary(session,BANK_MAP)'));
// The current importer keeps legacy sessions and requires coherent metadata for new mocks.
const base=JSON.parse(h.match(/const BANK\s*=\s*([\s\S]*?);\n/)[1]);ctx.BANK_MAP=new Map([...base,...a.questions].map(q=>[q.id,q]));ctx.EFFECTIVE_BANK=[...base,...a.questions];
const start=h.indexOf('function validSessionState('),end=h.indexOf('\nif(session&&!validSessionState',start);
vm.runInNewContext("function isPlainRecord(value){return value!==null&&typeof value==='object'&&!Array.isArray(value)}\n"+h.slice(start,end),ctx);
const valid={version:2,mode:'exam',ids:Array.from(sample.items,q=>q.id),pos:0,responses:{},grades:{},orders:normalize(sample.orders),recorded:{},done:false,deadline:null,examProfile:normalize(sample.profile)};
assert.equal(ctx.validSessionState(valid),true);valid.examProfile.setId='FM-00000001';assert.equal(ctx.validSessionState(valid),false);valid.examProfile=normalize(sample.profile);
valid.examProfile.seed=-1;assert.equal(ctx.validSessionState(valid),false);
const single=base.find(q=>q.type==='single');const legacy={version:2,mode:'practice',ids:[single.id],pos:0,responses:{[single.id]:{choice:[single.correct[0]]}},grades:{},orders:{},recorded:{},done:false,deadline:null};assert.equal(ctx.validSessionState(legacy),true);
ctx.session=session;vm.runInNewContext(h.split('\n').find(l=>l.startsWith('function gradeLabel(')),ctx);
assert.equal(ctx.gradeLabel(q),'Требует повторной проверки');
const report=JSON.parse(read('docs/audits/data/EXAM_PROFILE_20261031.json'));assert.equal(report.official_model,false);assert.deepEqual(report.quotas,normalize(p.quotas));
assert.deepEqual(report.questions,normalize(a.questions.map(q=>({id:q.id,section:q.section,type:q.type,...p.metadata(q),revision:q.reviewRevision}))));
console.log('PASS mock model:1000 seeded sets,25MC5/25open,exact section/source/knowledge quotas,>=3 composite tasks,1/2/3/4 correct counts,stable orders,REPO retained;unassessed/empty/stale/duplicate evidence cannot inflate strict credit;self-assessment separate from auto verification');
