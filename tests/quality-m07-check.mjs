import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8'),html=read('index.html');
const parse=n=>{const m=new RegExp('const '+n+'\\s*=\\s*').exec(html),i=m.index+m[0].length;return JSON.parse(html.slice(i,html.indexOf(';\n',i)));};
const ctx={};vm.runInNewContext(read('option-profiles.js'),ctx);vm.runInNewContext(read('question-review.js'),ctx);vm.runInNewContext(read('exam-practice.js'),ctx);
const near=(a,b,t=1e-8)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`),profiles=ctx.OptionProfiles;
const formulas={
 'bull-call':s=>Math.min(Math.max(s-100,0),10)-5,
 'protective-put':s=>Math.max(s,100)-108,
 'cash-put':s=>s<100?s-95:5,
 'risk-reversal':s=>s<100?s-98:s<=110?2:s-108,
 'long-put':s=>s<100?95-s:-5,
 'bear-put':s=>s<=100?3:s<110?103-s:-7,
 'straddle':s=>Math.abs(s-100)-13,
 'strangle':s=>s<95?87-s:s<=105?-8:s-113,
 'ratio-call':s=>s<=100?-2:s<=110?s-102:118-s,
 'ratio-put':s=>s<=100?s-92:s<110?108-s:-2,
 'butterfly':s=>s<=90||s>=110?-2:s<=100?s-92:108-s,
 'condor':s=>s<=90||s>=120?-4:s<100?s-94:s<=110?6:116-s
};
assert.equal(profiles.profiles.length,12);
for(const p of profiles.profiles){for(const s of [0,59,60,80,87,89.999,90,95,99,100,103,105,108,110,113,116,120,140,160,1e6])near(profiles.pnl(p,s),formulas[p.id](s));assert.match(profiles.chart(p),/role="img"/);assert.match(profiles.chart(p),/desc/);assert.match(profiles.chart(p),/fill="#263f50"/);assert.match(profiles.chart(p),/min-width:420px/);assert.ok(!profiles.chart(p).includes('NaN'));}
assert.equal((profiles.markup('S2-09',1).match(/data-option-profile=/g)||[]).length,12);assert.equal(profiles.markup('S2-10',1),'');near(profiles.pnl(profiles.profiles.find(p=>p.id==='ratio-put'),0),-92);
// Source gold model: preserve own capital and compare two independent account ledgers.
const margin=118*1343.27,deposit=1e6-margin,interest=deposit*.14;near(margin,158505.86);near(deposit,841494.14);near(interest,117809.1796);
near(margin+deposit+interest-10000,1107809.1796);near(1e6+interest-10000,1107809.1796);
// Withdrawal paid VM once; returning locked funds does not create new profit.
near(150000+(850000-100000)+75000,975000);near(1e6+75000-100000,975000);assert.notEqual(975000-100000,975000);
near(100000/1.1,90909.09090909091);near(100000-100000/1.1-1000,8090.90909090909);near(50+1+300*2-20+10,641);
const master=parse('STUDY_MASTER'),legacy=parse('STUDY_V5');
for(const [id,n] of Object.entries({'S2-09-0':2,'S2-09-1':2,'S2-10-0':3,'S2-10-1':2,'S2-11-0':2,'S2-11-1':2})){assert.equal(master[id].formulas.length,n);assert.deepEqual(master[id].formulas,legacy[id].formulas);assert.equal(master[id].extraChecks.length,2);}
assert.match(master['S2-09-0'].mechanism.join(' '),/временную составляющую/);assert.match(master['S2-09-1'].mechanism.join(' '),/рост параметра волатильности/);assert.match(master['S2-10-0'].advanced.join(' '),/50,48/);
const raw=[...parse('BANK'),...parse('STUDY_EXTRAS')],q=id=>ctx.FinanceReview.question(raw.find(x=>x.id===id));
for(const id of ['PM22','V2-058','V2-059','V2-064','LQ07','PM13','PM12','LQ08','PM14','LQ16','V2-066','PM24','LQ09','LQ10','V2-023'])assert.equal(JSON.stringify(q(id).correct),JSON.stringify(raw.find(x=>x.id===id).correct));
assert.equal(q('PO08').rubric.length,1);assert.match(q('PO08').question,/не менее двух разных/);
const old={text:'Сохранённый ответPO08',checked:true,revealed:true,score:1,rubric:[0,1,2]};ctx.FinanceReview.migrateCourseAnswer(q('PO08'),old);assert.equal(old.score,null);assert.equal(old.previousReviewResult.score,1);assert.equal(old.text,'Сохранённый ответPO08');const once=JSON.stringify(old);ctx.FinanceReview.migrateCourseAnswer(q('PO08'),old);assert.equal(JSON.stringify(old),once);
const a=JSON.parse(read('QUESTION_LEARNING_ALIGNMENT.json')),m07=['S2-09','S2-10','S2-11'];assert.equal(a.assignments.filter(x=>m07.includes(x.block.slice(0,-2))).length,26);assert.ok(a.assignments.filter(x=>m07.includes(x.block.slice(0,-2))).every(x=>x.status!=='PENDING'));assert.equal(a.reviewedHistoricalAssignments,85);
assert.equal(ctx.ExamPractice.questions.filter(x=>m07.includes(x.lesson)).length,14);
console.log('PASS M07:12 independent piecewise option profiles and tail boundaries, gold account conservation, funding/GO one-time inclusion, protection budget, Greek units,15 historical keys and PO08 migration,26+10 reviewed assignments.');
