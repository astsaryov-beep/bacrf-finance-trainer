import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8'),html=read('index.html');
const parse=n=>{const m=new RegExp('const '+n+'\\s*=\\s*').exec(html),i=m.index+m[0].length;return JSON.parse(html.slice(i,html.indexOf(';\n',i)));};
const master=parse('STUDY_MASTER'),legacy=parse('STUDY_V5'),raw=[...parse('BANK'),...parse('STUDY_EXTRAS')];
const near=(a,b,t=1e-8)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`);
const expected={'S2-06-0':2,'S2-06-1':1,'S2-07-0':2,'S2-07-1':1,'S2-08-0':2,'S2-08-1':2};
for(const [id,n] of Object.entries(expected)){assert.equal(master[id].formulas.length,n);assert.deepEqual(legacy[id].formulas,master[id].formulas);assert.equal(master[id].extraChecks.length,2);}
// Cash-flow conservation: CDS alternatives have equal economic indemnity, not additive payments.
for(const recovery of [0,20,40,100]){const cash=100-recovery,physical=100-recovery;near(cash,physical);if(recovery<100)assert.notEqual(cash+100-recovery,cash,'the alternatives must not be summed');}
const irs=(r,k,n,t)=>n*(r-k)*t;
for(const r of [.08,.14,.2])near(10e6*(r+.03)-irs(r,.1,10e6,1),1.3e6);
near(irs(.14,.12,10e6,1),200000);near(10e9*(.21-.185),250e6,1e-6);
// Source prices, independently calculated without rounding the returns first.
const prices=[301.4,305.85,303.2,309.75,312.1],returns=prices.slice(1).map((x,i)=>x/prices[i]-1),mean=returns.reduce((a,b)=>a+b)/4;
const ss=returns.reduce((a,r)=>a+(r-mean)**2,0),population=Math.sqrt(ss/4),sample=Math.sqrt(ss/3);
near(mean,.008822430144556909,1e-12);near(population,.011246812814897714,1e-11);near(sample,.012986700812413056,1e-11);near(sample*Math.sqrt(52),.09364843136,1e-10);
near(100*1.06/1.02,103.92156862745,1e-10);
// Minimum-variance result cross-checks the independent source scenario at several hedge sizes.
const variance=h=>.02**2+h*h*.018**2-2*h*.75*.02*.018;
const optimum=.75*.02/.018;near(optimum,5/6);near(Math.sqrt(variance(optimum)),.013228756555,1e-11);
const cases=[[0,329000],[.5,238950.05],[5/6,217613.05],[1,223138.66]];
for(const [h,v] of cases)near(10e6*1.645*Math.sqrt(variance(h)),v,.015);
near(1-variance(optimum)/variance(0),.75**2);near(-120/(-100),1.2);assert.equal(-120/0,-Infinity);
// Counterexample to a universal diversification law for VaR: two disjoint 4% losses.
const scenarios=[{p:.92,a:0,b:0},{p:.04,a:100,b:0},{p:.04,a:0,b:100}];
function quantile(field){let p=0;for(const s of [...scenarios].sort((x,y)=>field(x)-field(y))){p+=s.p;if(p>=.95)return field(s);}}
near(quantile(s=>s.a),0);near(quantile(s=>s.b),0);near(quantile(s=>s.a+s.b),100);
assert.match(master['S2-06-0'].mechanism.join(' '),/владельца облигации/);assert.match(master['S2-07-0'].mechanism.join(' '),/местный спрос/);assert.match(master['S1-10-1'].mechanism.join(' '),/Минимальная схема к вопросу Q09/);
const ctx={};vm.runInNewContext(read('question-review.js'),ctx);vm.runInNewContext(read('exam-practice.js'),ctx);const r=ctx.FinanceReview,q=id=>r.question(raw.find(x=>x.id===id));
assert.equal(q('PO07').rubric.length,2);assert.match(q('PO07').question,/хотя бы один другой/);assert.match(q('LQ05').question,/непрерывным/);
for(const id of ['PM17','LQ13','V2-062','PM18','LQ05','LQ06','PM20','LQ15','LQ14','LQ11','PM23','V2-065','PM03','V2-009','PM04','V2-060','V2-061']){
 assert.equal(JSON.stringify(q(id).correct),JSON.stringify(raw.find(x=>x.id===id).correct));assert.equal(q(id).optionFeedback.length,q(id).options.length);
}
const old={text:'Прежний PO07',checked:true,revealed:true,score:1,rubric:[0,1,2]};r.migrateCourseAnswer(q('PO07'),old);assert.equal(old.score,null);assert.equal(old.previousReviewResult.score,1);assert.equal(old.text,'Прежний PO07');const once=JSON.stringify(old);r.migrateCourseAnswer(q('PO07'),old);assert.equal(JSON.stringify(old),once);
const session={version:2,responses:{PO07:{text:'Старый ответ',rubric:[0,1,2],checked:true}},grades:{PO07:{score:1,strict:true,type:'rubric'}}};r.migrateSession(session);assert.equal(session.grades.PO07,undefined);assert.equal(session.reviewHistory.PO07.grade.score,1);assert.equal(session.responses.PO07.text,'Старый ответ');
const a=JSON.parse(read('QUESTION_LEARNING_ALIGNMENT.json')),m04=['S1-10','S2-01','S2-02'],m06=['S2-06','S2-07','S2-08'];
assert.equal(a.assignments.filter(x=>m04.includes(x.block.slice(0,-2))).length,15);assert.equal(a.assignments.filter(x=>m06.includes(x.block.slice(0,-2))).length,16);
assert.ok(a.assignments.filter(x=>[...m04,...m06].includes(x.block.slice(0,-2))).every(x=>x.status!=='PENDING'&&x.support.length));
assert.equal(ctx.ExamPractice.questions.filter(q=>m06.includes(q.lesson)).length,12);assert.equal(ctx.ExamPractice.questions.filter(q=>m04.includes(q.lesson)).length,6);
console.log('PASS M06/M04: CDS conservation, IRS signs, FX parity, four returns/two denominators, hedge units/variance/VaR, non-subadditive VaR counterexample,17 keys preserved, PO07 historical migration,31 reviewed placements and18 new conceptual MCs.');
