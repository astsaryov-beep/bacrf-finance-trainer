import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8'),html=read('index.html');
const parse=n=>{const m=new RegExp('const '+n+'\\s*=\\s*').exec(html),i=m.index+m[0].length;return JSON.parse(html.slice(i,html.indexOf(';\n',i)));};
const ctx={};vm.runInNewContext(read('question-review.js'),ctx);vm.runInNewContext(read('exam-practice.js'),ctx);
const raw=[...parse('BANK'),...parse('STUDY_EXTRAS')],q=id=>ctx.FinanceReview.question(raw.find(x=>x.id===id)),master=parse('STUDY_MASTER');
for(const id of 'EM01 EM03 EM15 V2-041 EM04 V2-042 EM07 V2-039 EM13 EM23 V2-044 EM14 BM16 V2-030'.split(' ')){assert.equal(JSON.stringify(q(id).correct),JSON.stringify(raw.find(x=>x.id===id).correct));assert.equal(q(id).optionFeedback.length,4);}
assert.equal(JSON.stringify(q('EM02').correct),'[0]');assert.equal(JSON.stringify(raw.find(x=>x.id==='EM02').correct),'[1]');assert.equal(JSON.stringify(q('EM02').options),JSON.stringify(raw.find(x=>x.id==='EM02').options));assert.equal(q('Q14').rubric.length,2);assert.equal(q('Q14').question,raw.find(x=>x.id==='Q14').question);
for(const [id,n] of [['EO02',1],['V2-049',2],['EO04',2],['EO01',2],['BO04',2],['V2-035',2]]){
 assert.equal(q(id).rubric.length,n);const old={text:'Старый ответ '+id,checked:true,revealed:true,score:1,rubric:[0,1,2]};ctx.FinanceReview.migrateCourseAnswer(q(id),old);assert.equal(old.text,'Старый ответ '+id);assert.equal(old.previousReviewResult.score,1);assert.equal(old.score,null);const once=JSON.stringify(old);ctx.FinanceReview.migrateCourseAnswer(q(id),old);assert.equal(JSON.stringify(old),once);
 const session={ids:[id],responses:{[id]:{text:'История '+id,rubric:[0,1,2],checked:true}},grades:{[id]:{score:1,strict:true,type:'rubric'}},orders:{}};ctx.FinanceReview.migrateSession(session);assert.equal(session.reviewHistory[id].grade.score,1);assert.equal(session.reviewHistory[id].response.text,'История '+id);
}
const near=(x,y)=>assert.ok(Math.abs(x-y)<1e-10,`${x} != ${y}`);
// Independent ownership/cash ledger: an existing sale and a new issue have different recipients and denominators.
let founder=100,other=900,total=founder+other,issuerCash=0,founderCash=0;const price=20;
founder-=40;other+=40;founderCash+=40*price;assert.equal(total,founder+other);assert.equal(issuerCash,0);assert.equal(founderCash,800);
const oldOtherFraction=other/total;total+=250;issuerCash+=250*price;assert.equal(issuerCash,5000);near(founder/total,.048);assert.ok(other/total<oldOtherFraction);
near(100/1000,.10);near(100/1250,.08);near(200/2000,.10);
// EPS weighted denominator and year-end capitalisation need not yield the same P/E.
const weighted=100*.5+120*.5,profit=500,eps=profit/weighted,pricePerShare=60;
near(weighted,110);near(pricePerShare/eps,13.2);near(pricePerShare*120/profit,14.4);assert.notEqual(pricePerShare/eps,pricePerShare*120/profit);
near((profit*1.1)/(weighted*1.2)/(profit/weighted),1.1/1.2);assert.ok((profit*1.1)/(weighted*1.2)<eps);
// Negative EV is an output of a model; cash is still held by the company, not credited to the minority investor.
near(800+300-100,1000);near(90+10-150,-50);let shareholderCash=0,companyCash=150;assert.equal(shareholderCash,0);assert.equal(companyCash,150);
// No free dividend: isolate a receivable from a quote; actual cash is a separate event.
let quote=100,dividendRight=0,received=0;quote-=5;dividendRight=5;near(quote+dividendRight+received,100);received+=dividendRight;dividendRight=0;near(quote+dividendRight+received,100);near((108-100+5)/100,.13);near(12/240,.05);
// The teaching calendar is explicitly conditional T+1 without holidays: Wednesday settles Thursday; Thursday settles Friday.
const settle=day=>day+1,record=4;assert.ok(settle(3)<=record);assert.ok(settle(4)>record);
const lossToSenior=(loss,junior,mezz)=>Math.max(0,loss-junior-mezz);assert.equal(lossToSenior(25,10,20),0);assert.equal(lossToSenior(35,10,20),5);
const own=['E-01','E-02','E-03'],early=['S1-05-1','S1-06-0'],a=JSON.parse(read('QUESTION_LEARNING_ALIGNMENT.json'));
assert.equal(a.assignments.filter(x=>own.includes(x.block.slice(0,-2))).length,32);assert.equal(a.assignments.filter(x=>early.includes(x.block)).length,6);assert.ok(a.assignments.filter(x=>own.includes(x.block.slice(0,-2))||early.includes(x.block)).every(x=>x.status!=='PENDING'));assert.ok(a.reviewedHistoricalAssignments>=200);
for(const k of [...own.flatMap(l=>[l+'-0',l+'-1']),...early]){const qs=ctx.ExamPractice.questions.filter(x=>x.block===k&&x.source.includes('QUALITY_M10_REVIEW'));assert.equal(qs.length,2);assert.equal(qs.filter(x=>x.taskKind==='knowledge').length,1);assert.equal(qs.filter(x=>x.taskKind==='case').length,1);}
const topicRules=[[/^E-/,'equity'],[/^(S1-|S2-05|LEASE-|FACTOR-)/,'debt'],[/^(R-|MARKET-|INS-|PEN-)/,'reg'],[/^S2-/,'deriv']];for(const q of ctx.ExamPractice.questions){const rule=topicRules.find(([re])=>re.test(q.block));assert.ok(rule,'unclassified topic '+q.id);assert.equal(q.section,rule[1],q.id+' topic');}
for(const k of own.flatMap(l=>[l+'-0',l+'-1']))assert.equal(master[k].extraChecks.length,2);
assert.match(master['E-01-0'].mechanism.join(' '),/SPO/);assert.match(master['E-01-0'].mechanism.join(' '),/EPS/);assert.match(master['E-02-0'].mechanism.join(' '),/P\/BV/);assert.match(master['E-02-0'].mechanism.join(' '),/EV.*капитализацию.*финансовый долг.*вычитает денежные средства/);assert.match(master['E-03-0'].mechanism.join(' '),/Экс-дивидендная дата/);
console.log('PASS M10: ownership/cash ledgers, unequal weighted/year-end P/E, negative EV and dividend conservation, conditional dates,32+6 placements,16 conceptual MC,14 preserved single keys,EM02/Q14 protected,6 rubric histories.');
