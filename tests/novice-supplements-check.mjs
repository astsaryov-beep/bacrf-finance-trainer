import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8'),html=read('index.html');
const parse=n=>{const m=new RegExp('const '+n+'\\s*=\\s*').exec(html),i=m.index+m[0].length;return JSON.parse(html.slice(i,html.indexOf(';\n',i)));};
const lessons=parse('STUDY_LESSONS'),ctx={};vm.runInNewContext(read('question-review.js'),ctx);const review=ctx.FinanceReview;
const start=html.indexOf('const FRI_PRACTICE_BANK='),end=html.indexOf('\nfunction friExtraForBlock',start);
const build=new Function('STUDY_MAP','FRI_COLLEAGUE_COVERAGE','FinanceReview',html.slice(start,end)+';return FRI_PRACTICE_BANK;');
const map=new Map(lessons.map(l=>[l.id,l])),coverage=parse('FRI_COLLEAGUE_COVERAGE');
const raw=build(map,coverage,{independentQuestion:q=>q}),effective=build(map,coverage,review);
assert.equal(effective.length,70);assert.equal(new Set(effective.map(q=>q.id)).size,70);
assert.equal(effective.filter(q=>q.type==='multi').length,45);assert.equal(effective.filter(q=>q.type==='open').length,25);
for(const q of effective){const old=raw.find(x=>x.id===q.id);assert.equal(q.correct,old.correct,q.id+' preserves numeric key');if(q.options){assert.equal(q.options.length,3);assert.equal(new Set(q.options).size,3);assert.equal(q.answer,q.options[q.correct]);}}
for(const [id,lessonId,pos]of [['FRI-M-10-0','S1-02',1],['FRI-O-10-0','S1-02',1],['FRI-M-08-2','E-11',0],['FRI-O-08-1','R-05',1],['FRI-M-13-0','E-01',1],['FRI-O-07-1','R-06',1]]){
 const q=effective.find(x=>x.id===id);assert.equal(q.lessonId,lessonId,id);assert.equal(q.pos,pos,id);if(q.type==='open')assert.equal(q.example,map.get(lessonId).blocks[pos].deep.example);
}
assert.match(effective.find(q=>q.id==='FRI-M-05-2').question,/имеет базовую лицензию/);
assert.match(effective.find(q=>q.id==='FRI-M-15-1').answer,/Аваль/);
assert.match(effective.find(q=>q.id==='FRI-M-06-1').answer,/потерями капитала/);
const old={answers:{'FRI-O-08-1':{correct:true,draft:'Мой прежний осмысленный ответ',tries:4,wrong:1,reviewRevision:'2026-10-26'},'FRI-M-15-1':{correct:true,tries:2,wrong:0},'FRI-M-12-0':{correct:true,tries:1}}};
review.migrateIndependent(old);const answer=old.answers['FRI-O-08-1'];assert.equal(answer.previousReviewResult.draft,'Мой прежний осмысленный ответ');assert.equal(answer.previousReviewResult.correct,true);assert.equal(answer.tries,4);assert.equal(answer.wrong,1);assert.equal(answer.correct,false);assert.equal(answer.needsReviewRecheck,true);assert.equal(old.answers['FRI-M-12-0'].correct,true);
const once=JSON.stringify(old);review.migrateIndependent(old);assert.equal(JSON.stringify(old),once);
const interrupted={answers:{'FRI-O-08-1':{correct:false,draft:'',needsReviewRecheck:true,previousReviewResult:{draft:'Сохранённый ответ до прошлой редакции',correct:true},reviewRevision:'older'}}};review.migrateIndependent(interrupted);assert.equal(interrupted.answers['FRI-O-08-1'].previousReviewResult.draft,'Сохранённый ответ до прошлой редакции');assert.equal(interrupted.answers['FRI-O-08-1'].reviewHistory[0].previousReviewResult.draft,'Сохранённый ответ до прошлой редакции');
const fnLine=name=>html.slice(html.indexOf('function '+name+'('),html.indexOf('\nfunction ',html.indexOf('function '+name+'(')+1));
Object.assign(ctx,{friExtra:old,friExtraFind:id=>effective.find(q=>q.id===id),friExtraSave:()=>{},friReviewRecord:()=>{},friKey:(l,i)=>l+'-'+i});vm.runInNewContext(fnLine('friExtraGrade'),ctx);ctx.friExtraGrade('FRI-O-08-1',true);assert.equal(answer.reviewRevision,review.independentRevision('FRI-O-08-1'));assert.equal(answer.correct,true);assert.equal(answer.needsReviewRecheck,false);review.migrateIndependent(old);assert.equal(answer.correct,true,'new attempt survives reload migration');
const custom=html.slice(html.indexOf('const FRI_TRAP_CASES='),html.indexOf('\n};',html.indexOf('const FRI_TRAP_CASES='))+3);vm.runInNewContext(custom+';globalThis.custom=FRI_TRAP_CASES;',ctx);
const fallback=parse('FRI_TRAP_FALLBACK');const route=lessons.toSorted((a,b)=>a.seminar-b.seminar).flatMap(l=>l.blocks.map((b,i)=>({key:l.id+'-'+i,b})));
const expectedTrue=new Set([3,5,13,14,18,20,22,25,27,30,33,36,39,41,45,50,56,58,61,63,65,67,70,72,74,77,79,81,84,86,88,92,95]);
route.forEach(({key},i)=>{const q=(ctx.custom[key]||fallback[key])[0];assert.equal(q[1],expectedTrue.has(i+1),key+' manually reviewed truth key');assert.ok(q[2].length>20);});
const revisions=parse('FRI_TRAP_REVISIONS');assert.equal(Object.keys(revisions).length,7);
const ts=html.indexOf('function friMigrateTrapReviews('),te=html.indexOf('\nif(friMigrateTrapReviews',ts);
const learning={read:{},traps:{'S1-02-1':{tries:2,correct:1,lastCorrect:true,updatedAt:'old'},untouched:{tries:1,correct:1,lastCorrect:true}}};Object.assign(ctx,{FRI_TRAP_REVISIONS:revisions,friLearning:learning,STUDY_LESSONS:lessons,totalStudyCompleted:()=>0,friSave:()=>{}});vm.runInNewContext(html.slice(ts,te),ctx);assert.equal(ctx.friMigrateTrapReviews(learning),true);assert.equal(learning.traps['S1-02-1'].previousReviewResult.lastCorrect,true);assert.equal(learning.traps['S1-02-1'].tries,2);assert.equal(learning.traps['S1-02-1'].correct,1);assert.equal(learning.traps['S1-02-1'].needsReviewRecheck,true);assert.equal(learning.traps.untouched.lastCorrect,true);
vm.runInNewContext(fnLine('friStats'),ctx);assert.equal(ctx.friStats().ok,1,'stale result excluded, unrelated result retained');const trapOnce=JSON.stringify(learning);assert.equal(ctx.friMigrateTrapReviews(learning),false);assert.equal(JSON.stringify(learning),trapOnce);vm.runInNewContext(fnLine('friRecordTrap'),ctx);ctx.friRecordTrap('S1-02-1',true);assert.equal(learning.traps['S1-02-1'].tries,3);assert.equal(learning.traps['S1-02-1'].correct,2);assert.equal(learning.traps['S1-02-1'].needsReviewRecheck,false);assert.equal(ctx.friStats().ok,2);assert.equal(ctx.friMigrateTrapReviews(learning),false);
// Execute the actual models against independently checked monetary/unit results.
const ls=html.indexOf('function friUpdateLab('),le=html.indexOf('\nconst FRI_ORIGINAL_QUESTION_MAP=',ls);vm.runInNewContext(html.slice(ls,le),ctx);
const runLab=(type,value)=>{const out={innerHTML:''},current={textContent:''};ctx.friUpdateLab({dataset:{friLab:type},querySelector:sel=>sel==='[data-fri-range]'?{value}:sel==='[data-fri-result]'?out:current});return out.innerHTML.replace(/[\s\u00a0\u202f]/g,'');};
assert.ok(runLab('waterfall',50).includes('20из70'));assert.ok(runLab('bond',10).includes('950,26'));assert.ok(runLab('duration',100).includes('-4,2%'));assert.ok(runLab('swap',13).includes('+20000'));assert.ok(runLab('capm',1.2).includes('13,4%'));assert.ok(runLab('option',105).includes('>-3₽'));assert.ok(runLab('basis',1050).includes('>+50₽'));assert.ok(runLab('spread',16).includes('+400б.п.'));assert.ok(runLab('liquidity',180).includes('-60млн'));assert.ok(runLab('franchise',20).includes('100тыс.'));
console.log('PASS novice supplements:70 prompts/45 preserved keys,6 prerequisite moves,31 targeted revisions,7 trap histories/recheck/idempotence,all96 truth keys and10 executed models.');
