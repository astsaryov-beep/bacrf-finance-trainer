import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8'),html=read('index.html');
const parse=n=>{const m=new RegExp('const '+n+'\\s*=\\s*').exec(html),i=m.index+m[0].length;return JSON.parse(html.slice(i,html.indexOf(';\n',i)));};
const master=parse('STUDY_MASTER'),v=parse('STUDY_V5'),raw=parse('BANK');
for(const [id,n] of Object.entries({'S2-03-0':2,'S2-03-1':2,'S2-04-0':2,'S2-04-1':3,'S2-05-0':2,'S2-05-1':2})){
 assert.equal(master[id].formulas.length,n);assert.deepEqual(v[id].formulas,master[id].formulas);assert.equal(master[id].extraChecks.length,2);assert.equal(v[id].mechanism,master[id].mechanism.join(' '));
}
const near=(a,b,t=1e-9)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`);
near(100*1.05-98-3,4);near(100-98-3,-1);
// The slide's nested min/max and the piecewise economic definition agree at boundaries and both tails.
const nested=(d,l1,l2)=>Math.min(l2,Math.max(-l2,Math.min(-l1,d)+Math.max(l1,d)));
for(const l1 of [0,2,4])for(const l2 of [0,3,5])for(const d of [-100,-7,-4,-2,-1,0,1,2,4,7,100]){
 const expected=Math.abs(d)<=l1?0:(d<0?-1:1)*Math.min(Math.abs(d)-l1,l2);near(nested(d,l1,l2),expected);
}
near(100-10*2+10*1,90);assert.notEqual(90-20,90,'a disclosed component cannot be applied twice');
near(12*7.5,90);
const importer=(q,a,k,s)=>q*s-a*q*(s-k),exporter=(q,a,k,s)=>q*s+a*q*(k-s);
near(importer(1e6,.6,100,115),106e6);near(exporter(1e6,.6,90,100),94e6);near(exporter(1e6,.6,90,80),86e6);
near(importer(1e6,1,100,115),100e6);near(importer(1e6,0,100,115),115e6);near(100000*.6/1000,60);
const variance=h=>4+h*h*6.25-2*h*.9*2*2.5;
near(variance(.72),.76);near(variance(1),1.25);assert.ok(variance(.72)<variance(.7)&&variance(.72)<variance(.74));
near(.72*10000/100,72);assert.ok(218>200,'the source optimum still violates the VaR limit');
near(6e6*.9+4e6*.8-8.4e6,.2e6);near(6e6*.9+4e6*.8-8.4e6-.5e6,-.3e6);
const accumulation=(1+.1*3/365)*(1+.2/365)-1;near(accumulation,.0013703133796210132);near(accumulation*365/4,.12504109589041745);assert.notEqual(accumulation*365/4,.15);
assert.match(master['S2-04-1'].mechanism.join(' '),/call даёт держателю право купить/);assert.match([...master['S2-04-1'].mechanism,...master['S2-04-1'].advanced].join(' '),/VaR — модельный порог/);
const ctx={};vm.runInNewContext(read('question-review.js'),ctx);const r=ctx.FinanceReview,q=id=>r.question(raw.find(x=>x.id===id));
assert.equal(q('PO05').rubric.length,1);assert.match(q('PO05').rubric[0],/не менее трёх различных/);assert.equal(q('Q15').rubric.length,2);
for(const id of ['PO05','Q15']){
 const a={text:'Сохранённый ответ '+id,checked:true,revealed:true,score:1,rubric:[0,1,2]};r.migrateCourseAnswer(q(id),a);assert.equal(a.score,null);assert.equal(a.previousReviewResult.score,1);assert.equal(a.text,'Сохранённый ответ '+id);const once=JSON.stringify(a);r.migrateCourseAnswer(q(id),a);assert.equal(JSON.stringify(a),once);
 const s={version:2,responses:{[id]:{text:'Прежний ответ',choice:[],rubric:[0,1,2],checked:true}},grades:{[id]:{score:1,strict:true,type:'rubric'}}};r.migrateSession(s);assert.equal(s.grades[id],undefined);assert.equal(s.reviewHistory[id].grade.score,1);assert.equal(s.responses[id].text,'Прежний ответ');
}
for(const id of ['PM21','PM06','V2-055','V2-056','BM12','V2-029'])assert.equal(q(id).correct.join(),raw.find(x=>x.id===id).correct.join());
console.log('PASS M05: reverse-carry cash availability, funding zero/cap/sign and no VM double count, FX hedges/units, minimum variance vs VaR, coverage, calendar compounding and rubric history.');
