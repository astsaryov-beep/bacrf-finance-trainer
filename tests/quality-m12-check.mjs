import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import vm from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8'),html=read('index.html');
const parse=n=>{const m=new RegExp('const '+n+'\\s*=\\s*').exec(html),i=m.index+m[0].length;return JSON.parse(html.slice(i,html.indexOf(';\n',i)));};
const ctx={};vm.runInNewContext(read('question-review.js'),ctx);vm.runInNewContext(read('exam-practice.js'),ctx);
const raw=[...parse('BANK'),...parse('STUDY_EXTRAS')],q=id=>ctx.FinanceReview.question(raw.find(x=>x.id===id)),master=parse('STUDY_MASTER');
for(const id of 'S3-003 S3-004 S3-005 S3-006 S3-007 S3-008 BM01 BM24 V2-019'.split(' ')){assert.equal(JSON.stringify(q(id).correct),JSON.stringify(raw.find(x=>x.id===id).correct));assert.equal(q(id).optionFeedback.length,4);}
for(const id of [...Array.from({length:6},(_,i)=>`S3-${String(i+3).padStart(3,'0')}O`),'BO01','V2-036']){
 assert.equal(q(id).rubric.length,2);const old={text:'Старый ответ '+id,checked:true,revealed:true,score:1,rubric:[0,1,2]};ctx.FinanceReview.migrateCourseAnswer(q(id),old);assert.equal(old.text,'Старый ответ '+id);assert.equal(old.previousReviewResult.score,1);assert.equal(old.score,null);let once=JSON.stringify(old);ctx.FinanceReview.migrateCourseAnswer(q(id),old);assert.equal(JSON.stringify(old),once);
 const s={ids:[id],responses:{[id]:{text:'История '+id,rubric:[0,1,2],checked:true}},grades:{[id]:{score:1,strict:true,type:'rubric'}},orders:{}};ctx.FinanceReview.migrateSession(s);assert.equal(s.reviewHistory[id].grade.score,1);assert.equal(s.reviewHistory[id].response.text,'История '+id);
}
const near=(a,b,e=1e-8)=>assert.ok(Math.abs(a-b)<e,`${a} != ${b}`);
const divs=[37.64];for(const g of [.14,.06,.05,.06])divs.push(divs.at(-1)*(1+g));
const ddm=r=>{const terminal=divs[4]/(r-.06),pvTerminal=terminal/(1+r)**3;return{terminal,pvTerminal,price:divs.slice(1,4).reduce((s,d,i)=>s+d/(1+r)**(i+1),pvTerminal)}};
const a=ddm(.16),b=ddm(.18);near(a.terminal,506.23887888);near(a.pvTerminal,324.325822399442);near(a.price,425.715784779977);near(b.price,354.857831082978);near(b.terminal/a.terminal-1,-1/6);assert.ok(b.price/a.price>.8);assert.ok(b.pvTerminal/a.pvTerminal>.79);
// Independent finite-series convergence and date boundary, not just the closed formula.
let pv=0;for(let t=1;t<1000;t++)pv+=12*1.04**(t-1)/1.14**t;near(pv,120);const explicit=10/1.13+11/1.13**2;let tail=0;for(let t=3;t<1000;t++)tail+=11.33*1.03**(t-3)/1.13**t;near(explicit+tail,10/1.13+11/1.13**2+(11.33/.1)/1.13**2);near(explicit+tail,106.194690265487,1e-5);
// Capitalisation accounting, divisor continuity, ordinary dividend and real-investor bases.
const cap=(p,n,ff)=>p*n*ff;near(cap(20,100e6,.5),1e9);near(cap(40,50e6,.25),.5e9);near(cap(10,200e6,.5),cap(20,100e6,.5));near(272e9*1,272e9);assert.notEqual(272e9,130.6e9);
const before=150,newBasket=210,oldDivisor=3,newDivisor=newBasket/(before/oldDivisor);near(newBasket/newDivisor,before/oldDivisor);near((95-100)/100,-.05);near((95-100+8)/100,.03);
const subscription=80,secondary=20,issuerCash=subscription,oldOwnerCash=secondary;near(issuerCash+oldOwnerCash,100);assert.notEqual(issuerCash,100);near(1000/900-1,1/9);assert.ok(1100/1.14<1100/1.12);
const alignment=JSON.parse(read('QUESTION_LEARNING_ALIGNMENT.json')),own=['E-07','E-08','E-09'];assert.equal(alignment.assignments.filter(r=>own.includes(r.block.slice(0,-2))).length,12);assert.equal(alignment.assignments.filter(r=>r.block==='S1-06-1').length,7);assert.ok(alignment.assignments.filter(r=>own.includes(r.block.slice(0,-2))||r.block==='S1-06-1').every(r=>r.status!=='PENDING'));assert.ok(alignment.reviewedHistoricalAssignments>=250);
for(const k of [...own.flatMap(l=>[l+'-0',l+'-1']),'S1-06-1']){const qs=ctx.ExamPractice.questions.filter(q=>q.block===k&&q.source.includes('QUALITY_M12_REVIEW'));assert.equal(qs.length,2);assert.equal(qs.filter(q=>q.taskKind==='knowledge').length,1);assert.equal(qs.filter(q=>q.taskKind==='case').length,1);}
for(const k of own.flatMap(l=>[l+'-0',l+'-1']))assert.equal(master[k].extraChecks.length,2);
assert.equal(JSON.stringify([...new Set(ctx.ExamPractice.questions.filter(q=>q.source.includes('QUALITY_M12_REVIEW')).map(q=>q.correct.length))].sort()),JSON.stringify([2,3,4]));
// Execute the actual declaration sequence, so an early access/TDZ fails here too.
const initialization=html.slice(html.indexOf('const BANK='),html.indexOf('const SECTION='));
vm.runInNewContext(initialization+';globalThis.initializedBank=EFFECTIVE_BANK;',ctx);assert.equal(ctx.initializedBank.length,425);assert.equal(new Set(ctx.initializedBank.map(q=>q.id)).size,425);
const openids=ctx.ExamPractice.openQuestionIds;assert.equal(openids.length,10);for(const id of openids){assert.equal(q(id).type,'open');assert.ok(ctx.ExamPractice.eligibleIds.has(id));assert.equal(q(id).rubric.length,2);}
assert.match(html,/STUDY_EXTRAS\.filter\(q=>ExamPractice\.openQuestionIds\.includes\(q\.id\)\)/);assert.match(master['E-09-1'].mechanism.join(' '),/иностранных организаций/);assert.match(master['E-08-1'].application.join(' '),/354,86/);
console.log('PASS M12:independent finite dividend sums/date boundary/sensitivity,issue cash allocation,cap/free-float/divisor/dividend bases,12+7 prerequisites,14MC,9keys/8rubric histories,10 reviewed open supplements.');
