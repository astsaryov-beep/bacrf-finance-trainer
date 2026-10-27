import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const parse=n=>{const m=new RegExp('const '+n+'\\s*=\\s*').exec(html),i=m.index+m[0].length;return JSON.parse(html.slice(i,html.indexOf(';\n',i)));};
const master=parse('STUDY_MASTER'),v5=parse('STUDY_V5');
for(const id of ['S1-07-0','S1-07-1','S1-08-0','S1-08-1','S1-09-0','S1-09-1']){
 assert.ok(master[id].extraChecks.length);
 assert.deepEqual(v5[id].formulas,master[id].formulas);
 assert.equal(v5[id].mechanism,master[id].mechanism.join(' '));
}
assert.equal(master['S1-09-1'].formulas.length,6);
assert.match(master['S1-08-1'].mechanism.join(' '),/первом блоке S2-05/);
assert.match(master['S2-05-0'].foundation.join(' '),/клиринговым сертификатом/);
// Cash-flow model independent of display text. Finite differences check both derivatives.
const near=(a,b,tol=1e-8)=>assert.ok(Math.abs(a-b)<tol,`${a} != ${b}`);
const flows=[[1,100],[2,100],[3,1100]];
const pv=y=>flows.reduce((s,[t,c])=>s+c/(1+y)**t,0);
const y=.1,price=pv(y),step=1e-4;
const mac=flows.reduce((s,[t,c])=>s+t*c/(1+y)**t,0)/price;
const mod=mac/(1+y),conv=flows.reduce((s,[t,c])=>s+t*(t+1)*c/(1+y)**(t+2),0)/price;
assert.ok(mac<3&&mac>1);
near(-(pv(y+step)-pv(y-step))/(2*step)/price,mod,1e-6);
near((pv(y+step)-2*price+pv(y-step))/(step**2*price),conv,2e-6);
for(const shock of [-.01,.01]){
 const actual=pv(y+shock)/price-1,linear=-mod*shock,quadratic=linear+.5*conv*shock**2;
 assert.ok(Math.abs(actual-quadratic)<Math.abs(actual-linear));
}
let p=0,weighted=0;
for(let t=1;t<=1000;t++){const payment=100/(1.1**t);p+=payment;weighted+=t*payment;}
near(p,1000);near(weighted/p,11);
near(.5*1.932*.05**2*890.88,2.1514752);
assert.ok(Math.abs(.5*1.932*.05**2*890.88-4.17)>2,'source ruble conversion is erroneous');
near(10000*890.88,8908800);assert.notEqual(10000*890.88,10000*1000);
near((2*110+190)/(2*100+200),1.025);
near((980+40)/1000-1,.02);assert.ok(980/1000-1<0);
const forward=1.12**2/1.10-1;near(1.10*(1+forward),1.12**2);
near(110/(1+.08+.02),100);
near(9-9*.9,.9);
near(.35*6+.35*5+.3*4,5.05);near(.28*6+.42*5+.3*4,4.98);
const harmonic=1/(.33/6+.67/3);assert.ok(harmonic<.33*6+.67*3);
const harmonicCurrent=(a,c,r,s)=>1/(.2/a+.55/Math.min(c,r)+.25/s);
assert.ok(harmonicCurrent(6,5,2,6)<harmonicCurrent(6,5,5,6));
near(40/(100-10-(8-3)),40/85);near((20+10)/(25+10),6/7);
const icr=12/3,ecr=12/(3+1);near(icr,4);near(ecr,3);assert.ok(ecr<icr);
assert.notEqual(12/3,9/3,'different profit and cash-flow numerators are not interchangeable');
const ctx={};vm.runInNewContext(readFileSync(new URL('../assets/question-review.js',import.meta.url),'utf8'),ctx);
const r=ctx.FinanceReview,raw=parse('BANK'),q=r.question(raw.find(x=>x.id==='Q07'));
assert.match(q.rubric[2],/Объяснён обратный случай/);assert.match(q.brief,/изымает ликвидность/);assert.equal(q.answer,q.brief,'catalog and practice must expose the same complete short answer');
const answer={text:'Сохранённый ответ',checked:true,revealed:true,score:1,rubric:[0,1,2]};
r.migrateCourseAnswer(q,answer);assert.equal(answer.text,'Сохранённый ответ');assert.equal(answer.score,null);assert.equal(answer.previousReviewResult.score,1);assert.equal(answer.rubric.length,0);
const session={version:2,responses:{Q07:{text:'Исторический ответ',checked:true,rubric:[0,1,2]}},grades:{Q07:{score:1,strict:true}}};
r.migrateSession(session);assert.equal(session.grades.Q07,undefined);assert.equal(session.reviewHistory.Q07.grade.score,1);assert.equal(session.responses.Q07.text,'Исторический ответ');
const saved=JSON.stringify(session);r.migrateSession(session);assert.equal(JSON.stringify(session),saved);
assert.equal(JSON.parse(saved).reviewHistory.Q07.response.rubric.length,3);
// T-19: a follow-up numerical question uses market value, and a conceptual one scales money risk.
near(9000000*4*.005,180000);assert.notEqual(10000000*4*.005,180000);
for(const id of ['V2-021','V2-023','V2-024']){const q=r.question(raw.find(x=>x.id===id));assert.equal(q.correct[0],1);assert.equal(q.options.length,4);assert.ok(q.revision.includes('t19'));}
assert.match(r.question(raw.find(x=>x.id==='V2-021')).options[1],/180/);
console.log('PASS M03: independent duration/convexity/PV, basket/forward/spread, holding metrics and versions, Q07 answer/history preservation.');
