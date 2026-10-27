import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8'),html=read('index.html');
const parse=n=>{const m=new RegExp('const '+n+'\\s*=\\s*').exec(html),i=m.index+m[0].length;return JSON.parse(html.slice(i,html.indexOf(';\n',i)));};
const ctx={};vm.runInNewContext(read('question-review.js'),ctx);vm.runInNewContext(read('exam-practice.js'),ctx);
const raw=[...parse('BANK'),...parse('STUDY_EXTRAS')],q=id=>ctx.FinanceReview.question(raw.find(x=>x.id===id)),master=parse('STUDY_MASTER'),v5=parse('STUDY_V5');
for(const id of 'EM16 EM18 EM20 V2-046 EM17 EM19 EM24 V2-045 V2-047 EM21 V2-048 EM22 S3-001 BM08 BM07 LQ03 V2-024'.split(' ')){assert.equal(JSON.stringify(q(id).correct),JSON.stringify(raw.find(x=>x.id===id).correct));assert.equal(q(id).optionFeedback.length,4);}
for(const id of ['Q06','Q05'])assert.equal(q(id).question,raw.find(x=>x.id===id).question);
for(const id of ['EO07','V2-053','V2-051','EO06','EO08','V2-054','S3-001O','S3-002O','BO06']){
 assert.equal(q(id).rubric.length,2);const old={text:'Старый ответ '+id,checked:true,revealed:true,score:1,rubric:[0,1,2]};ctx.FinanceReview.migrateCourseAnswer(q(id),old);assert.equal(old.text,'Старый ответ '+id);assert.equal(old.previousReviewResult.score,1);assert.equal(old.score,null);const once=JSON.stringify(old);ctx.FinanceReview.migrateCourseAnswer(q(id),old);assert.equal(JSON.stringify(old),once);
 const session={ids:[id],responses:{[id]:{text:'История '+id,rubric:[0,1,2],checked:true}},grades:{[id]:{score:1,strict:true,type:'rubric'}},orders:{}};ctx.FinanceReview.migrateSession(session);assert.equal(session.reviewHistory[id].grade.score,1);assert.equal(session.reviewHistory[id].response.text,'История '+id);
}
const near=(x,y)=>assert.ok(Math.abs(x-y)<1e-10,`${x} != ${y}`),mean=x=>x.reduce((a,b)=>a+b,0)/x.length,cov=(x,y)=>mean(x.map((v,i)=>(v-mean(x))*(y[i]-mean(y)))),variance=x=>cov(x,x);
// Covariance is linear, so fixed portfolio weights aggregate betas; residual variation remains.
const market=[-.02,-.01,.01,.02],residual=[.01,-.01,-.01,.01],a=market.map((r,i)=>1.3*r+residual[i]),b=market.map(r=>.8*r),portfolio=a.map((r,i)=>.4*r+.6*b[i]);
near(cov(market,residual),0);near(cov(a,market)/variance(market),1.3);near(cov(b,market)/variance(market),.8);near(cov(portfolio,market)/variance(market),1);assert.ok(variance(portfolio)>variance(market));
const x=[-1,0,1],y=x.map(v=>v*v);near(cov(x,y),0);assert.ok(variance(y)>0);assert.equal(y[0],y[2]);
// A stable tracking gap has zero spread, not zero gap; net NAV already includes the fee.
const differences=[-.001,-.001,-.001,-.001];near(variance(differences),0);near(mean(differences),-.001);const initial=100,grossAssets=110,accruedCosts=2,netAssets=grossAssets-accruedCosts,published=netAssets/initial-1;near(published,.08);assert.notEqual(published-accruedCosts/initial,published);
near(.2*.1,.02);near(.01*.1,.001);assert.ok(.01*.1>0);near(80*100e6*.35,2.8e9);near(35e6/100e6,.35);
// Conditional voting example: blocking this three-quarter resolution is not passing every resolution.
const participants=100,against=30;assert.ok((participants-against)/participants<.75);assert.ok(against/participants<.5);
// Convex fixed cash flows lie above the tangent in both directions near the original yield.
const price=y=>10/(1+y)+110/(1+y)**2,y0=.1,p0=price(y0),slope=-10/(1+y0)**2-220/(1+y0)**3;
for(const dy of [-.03,.03])assert.ok(price(y0+dy)>p0+slope*dy);near(-6*(-.01),.06);near(1000*(1-5*.002),990);
const own=['E-04','E-05','E-06'],early=['S1-07-1','S1-08-0'],alignment=JSON.parse(read('QUESTION_LEARNING_ALIGNMENT.json'));
assert.equal(alignment.assignments.filter(x=>own.includes(x.block.slice(0,-2))).length,22);assert.equal(alignment.assignments.filter(x=>early.includes(x.block)&&x.questionId!=='Q05').length,9);assert.ok(alignment.assignments.filter(x=>own.includes(x.block.slice(0,-2))||early.includes(x.block)).every(x=>x.status!=='PENDING'));assert.ok(alignment.reviewedHistoricalAssignments>=231);
assert.ok(alignment.assignments.find(x=>x.questionId==='EM22').support.some(x=>x.block==='E-05-0'));
for(const k of [...own.flatMap(l=>[l+'-0',l+'-1']),...early]){const qs=ctx.ExamPractice.questions.filter(x=>x.block===k&&x.source.includes('QUALITY_M11_REVIEW'));assert.equal(qs.length,2);assert.equal(qs.filter(x=>x.taskKind==='knowledge').length,1);assert.equal(qs.filter(x=>x.taskKind==='case').length,1);}
assert.equal(master['E-05-0'].formulas.length,3);assert.equal(JSON.stringify(master['E-05-0'].formulas),JSON.stringify(v5['E-05-0'].formulas));assert.match(master['E-05-0'].formulas.at(-1).conditions,/фиксированные веса/i);
for(const k of own.flatMap(l=>[l+'-0',l+'-1']))assert.equal(master[k].extraChecks.length,2);
assert.match(master['E-04-1'].mechanism.join(' '),/Малый положительный вес/);assert.match(master['E-06-0'].mechanism.join(' '),/KPI/);assert.match(master['E-06-1'].mechanism.join(' '),/Номинальный держатель/);
console.log('PASS M11: covariance-linear beta with residual risk, zero correlation/nonlinear dependence, TE versus gap, fee counted once, index weights/voting/free-float/convex prices,22+9 placements,16 MC,17 single keys,9 history migrations.');
