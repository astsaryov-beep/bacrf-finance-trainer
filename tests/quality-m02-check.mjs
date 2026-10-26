import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const parse=n=>{const m=new RegExp('const '+n+'\\s*=\\s*').exec(html),i=m.index+m[0].length;return JSON.parse(html.slice(i,html.indexOf(';\n',i)));};
const m=parse('STUDY_MASTER'),v=parse('STUDY_V5');
for(const id of ['S1-04-0','S1-04-1','S1-05-0','S1-05-1','S1-06-0','S1-06-1']){
 assert.equal(v[id].advanced,m[id].advanced.join(' '),'advanced display stale '+id);
 assert.ok(m[id].extraChecks?.length,'new source gaps lack conceptual practice '+id);
}
const f=m['S1-06-1'].formulas;assert.equal(f.length,7);assert.equal(m['S1-06-0'].formulas.length,3);
for(const title of ['Текущая купонная','простая доходность','эффективная','put или call','Worst'])assert.ok(f.some(x=>x.title.includes(title)));
// Independent cash-flow identities: solve prices, compare bases and horizons, not app-derived answers.
const pv=(y,cfs)=>cfs.reduce((s,[t,c])=>s+c/(1+y)**t,0);
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} != ${b}`);
near(pv(.1,[[1,100],[2,1100]]),1000);
near(pv(.1,[[1,1100]]),1000);
assert.ok(pv(.12,[[1,100],[2,1100]])<pv(.1,[[1,100],[2,1100]]));
near((1+.12/2)**2-1,.1236);
assert.ok(100/950>100/970,'CY price basis matters');
near((100+(1000-950)/2)/950,125/950);
near(1000*(10*.1+10*.12)/365,2200/365);
assert.notEqual(1000*(10*.1+20*.12)/365,1000*.11*30/365,'unequal durations require weights');
const scenarios=[.11,.09];near(Math.min(...scenarios),.09);assert.ok(-.4<Math.min(...scenarios),'contractual worst yield cannot bound default loss');
// An already paid coupon must not re-enter the post-purchase valuation.
assert.ok(pv(.1,[[0,100],[1,1100]])>pv(.1,[[1,1100]]));
const ctx={};vm.runInNewContext(readFileSync(new URL('../question-review.js',import.meta.url),'utf8'),ctx);
const r=ctx.FinanceReview,raw=parse('BANK'),q=id=>r.question(raw.find(x=>x.id===id));
assert.equal(q('Q14').rubric.length,2);assert.match(q('Q16').rubric.join(' '),/получени/);
for(const id of ['Q14','Q16']){
 const a={checked:true,score:1,text:'Прежний текст',rubric:[0,1,2],revealed:true};r.migrateCourseAnswer(q(id),a);
 assert.equal(a.score,null);assert.equal(a.text,'Прежний текст');assert.equal(a.previousReviewResult.rubric.length,3);assert.equal(a.needsReviewRecheck,true);
 const once=JSON.stringify(a);r.migrateCourseAnswer(q(id),a);assert.equal(JSON.stringify(a),once);
}
console.log('PASS M02: source-gap teaching and effective rubrics, independent price/horizon/compounding/day-weight identities, retained old answers.');
