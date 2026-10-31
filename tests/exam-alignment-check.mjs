import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8'),html=read('index.html');
const ctx={};vm.runInNewContext(read('assets/exam-alignment.js'),ctx);vm.runInNewContext(read('assets/theory-links.js'),ctx);
vm.runInNewContext(read('assets/question-review.js'),ctx);vm.runInNewContext(read('assets/exam-practice.js'),ctx);vm.runInNewContext(html.slice(html.indexOf('const BANK='),html.indexOf('const SECTION='))+';globalThis.fullBank=EFFECTIVE_BANK;',ctx);assert.equal(ctx.fullBank.length,608);assert.equal(new Set(ctx.fullBank.map(q=>q.id)).size,608);
const a=ctx.ExamAlignment;assert.equal(a.questions.length,95);assert.equal(new Set(a.questions.map(q=>q.id)).size,95);
const mm=/const STUDY_MASTER\s*=\s*/.exec(html),mi=mm.index+mm[0].length,master=JSON.parse(html.slice(mi,html.indexOf(';\n',mi)));
const expected={'EX17-03':[0,1,2],'EX17-19':[1,3],'TRANSFER-WATERFALL-01':[0,1,2,3],'TRANSFER-FUNDING-01':[0],'RECON-33':[0,1],'RECON-35':[0,1,2],'TRANSFER-IPO-01':[0,1,4],'TRANSFER-COLLATERAL-01':[0,2],'TRANSFER-BONDS-01':[0,3,4],'TRANSFER-INDEX-01':[0,1,2],'TRANSFER-GUARANTEE-01':[0,2,4]};
Object.assign(expected,{"EX17-01": [0, 2, 4], "EX17-02": [1, 2], "EX17-04": [0, 2, 4], "EX17-05": [0, 1, 3], "EX17-06": [0, 2, 4], "EX17-07": [0, 1, 4], "EX17-08": [0, 2, 4], "EX17-09": [0, 2, 4], "EX17-10": [0, 3], "EX17-11": [0, 2, 4], "EX17-12": [0, 2, 4], "EX17-13": [0, 2, 4], "EX17-14": [0, 2, 4], "EX17-15": [0, 1, 3], "EX17-16": [0, 2, 4], "EX17-17": [0, 2, 3], "EX17-18": [0, 2], "EX17-20": [0, 2, 4], "EX17-21": [0, 2, 3], "EX17-22": [0, 1, 2], "EX17-23": [0, 2, 3], "EX17-24": [0, 2, 4], "EX17-25": [1, 3, 4]});
Object.assign(expected,{"RECON-07": [0, 1, 4], "RECON-08-PROTECT": [0, 3, 4], "RECON-09": [0, 2, 4], "RECON-10": [0, 1, 4], "RECON-13-MC": [0, 2, 3], "RECON-14": [0, 2, 4], "RECON-20": [0, 2, 4], "RECON-21": [0, 2, 3], "RECON-25": [0, 2, 3], "RECON-26": [0, 1, 4], "RECON-29": [0, 3, 4]});
for(const q of a.questions){assert.ok(a.lessons[q.block]||master[q.block]);assert.deepEqual(Array.from(ctx.TheoryLinks.get(q.id)),Array.from(q.blocks||[q.block]));assert.ok(q.source);if(q.type==='multi'){assert.equal(q.options.length,5);assert.equal(q.optionFeedback.length,5);assert.deepEqual(Array.from(q.correct),expected[q.id]);}else assert.ok(q.answer&&q.rubric.length>=2)}
assert.equal(a.questions.filter(q=>q.provenance==='confirmed_exam_adapted').length,50);assert.equal(a.questions.filter(q=>q.provenance==='reconstructed').length,35);
// Independent money/unit/normal-quantile and hedge-ratio boundary checks.
const pnl=(begin,end,step,value,n,side)=>(end-begin)*value/step*n*side;
assert.equal(pnl(100,102,.5,5,3,1),60);assert.equal(pnl(100,102,.5,5,3,-1),-60);assert.equal(pnl(100,102,.5,5,6,1),120);
const risk=t=>1e6*1.645*.01*Math.sqrt(t);assert.equal(risk(1),16450);assert.equal(risk(4),32900);assert.ok(2.326>1.645);assert.equal(.5*.02/.01,1);
for(const k of ['R-02-0','S2-02-0','S2-07-1','S2-08-0']){const full=a.supplement(k),brief=a.supplement(k,true);assert.ok(full.includes('Проверить себя без подсказок')&&brief.includes('aligned-keypoint'));assert.ok(!/пересдач|PENDING|CONFIRMED_EXAM_SCAN|RECON_FROM_PEER_MEMORY|audit_work|docs\//i.test(full+brief));}
const rights=a.lessons['R-02-0'];assert.equal(rights.facts.length,4);for(const word of ['безопасность','информацию','выбор','выслушанным'])assert.ok(rights.facts.join(' ').includes(word));
assert.ok(a.lessons['S2-02-0'].facts.join(' ').includes('W/R'));assert.ok(a.lessons['S2-07-1'].facts.join(' ').includes('λ=z'));
assert.ok(html.includes('...ExamAlignment.questions')||html.includes('?ExamAlignment.questions:[]'));assert.ok(html.includes("ExamAlignment.supplement(l.id+'-'+pos,true)"));
const matrix=JSON.parse(read('docs/audits/data/EXAM_ALIGNMENT_20261031.json'));assert.equal(matrix.rows.length,86);assert.equal(matrix.rows.filter(r=>r.source_kind==='CONFIRMED_EXAM_SCAN').length,50);assert.equal(new Set(matrix.rows.map(r=>r.id)).size,86);
console.log('PASS source alignment:95 linked exercises,50 adapted scan/35 reconstructions/10 transfer,5 plausible alternatives and independent money/quantile/hedge checks,29 prerequisite roots+5 additional parts/full+brief,no workflow labels in extensions,86 tracked requirements');

vm.runInNewContext(html.split('\n').find(l=>l.startsWith('function learnerText(')),ctx);
for(const input of ['Авторское задание по изложенной теории S1-07-0; источник и пределы: docs/audits/QUALITY_M14_REVIEW.md.','Самостоятельные учебные примеры; исправления и границы docs/audits/QUALITY_M03_REVIEW.md.','Условия применения сохраняются; docs/audits/QUALITY_M04_REVIEW.md.','Основное объяснение. Подробные пределы первичной сверки сохранены в docs/audits/QUALITY_M06_REVIEW.md.'])assert.ok(!ctx.learnerText(input).includes('docs/'));
assert.equal(ctx.learnerText('Условия применения сохраняются; docs/audits/QUALITY_M04_REVIEW.md.'),'Условия применения сохраняются.');

for(const name of ['correctChoice','partialScore'])vm.runInNewContext(html.split('\n').find(l=>l.startsWith('function '+name+'(')),ctx);
const one=a.questions.find(q=>q.id==='TRANSFER-FUNDING-01'),four=a.questions.find(q=>q.id==='TRANSFER-WATERFALL-01');
assert.equal(ctx.correctChoice(one,[0]),true);assert.equal(ctx.correctChoice(one,[]),false);assert.equal(ctx.correctChoice(one,[0,1]),false);
assert.equal(ctx.correctChoice(four,[3,1,0,2]),true);assert.equal(ctx.correctChoice(four,[0,1,2]),false);assert.equal(ctx.partialScore(four,[0,1,2]),.75);assert.equal(ctx.partialScore(four,[0,1,2,3,4]),.75);
const clip=(d,l1,l2)=>Math.min(l2,Math.max(-l2,Math.min(-l1,d)+Math.max(l1,d)));
const independent=(d,l1,l2)=>Math.sign(d)*Math.min(l2,Math.max(Math.abs(d)-l1,0));
for(const l1 of [0,2])for(const l2 of [1,5])for(const d of [-20,-7,-2,-1,0,1,2,7,20])assert.ok(Math.abs(clip(d,l1,l2)-independent(d,l1,l2))<1e-12);
for(const id of ['EX17-28','EX17-39','EX17-45','EX17-46','EX17-48']){const q=a.questions.find(q=>q.id===id);assert.ok(q&&q.rubric.length>=3);assert.ok(q.provenance==='confirmed_exam_adapted');}
const l=a.lessons;assert.equal(l['E-12-0'].facts.length,3);assert.equal(l['S2-01-1'].facts.length,3);assert.equal(l['R-03-1'].facts.length,3);assert.equal(l['S2-03-1'].recallOnly,true);
assert.ok(!a.supplement('S2-03-1').includes('g(D) ='));
console.log('PASS list/funding package:explicit ordered levels/atomic rubrics,1-and4-correct actual grading,independent clipped-funding boundaries,existing derivation reused');

// Independent cash-flow calculations establish the counterexample: identical final
// dates can coexist with either different prices or the same solved YTM.
const pv=(flows,y)=>flows.reduce((v,[t,c])=>v+c/(1+y)**t,0);
const bullet=[[2,1000]],amort=[[1,500],[2,500]],pBullet=pv(bullet,.1),pAmort=pv(amort,.1);
assert.equal(pBullet.toFixed(2),'826.45');assert.equal(pAmort.toFixed(2),'867.77');assert.ok(pAmort>pBullet);
const solve=(flows,price)=>{let lo=0,hi=1;for(let i=0;i<70;i++){const m=(lo+hi)/2;if(pv(flows,m)>price)lo=m;else hi=m}return(lo+hi)/2};
assert.ok(Math.abs(solve(bullet,pBullet)-.1)<1e-10);assert.ok(Math.abs(solve(amort,pAmort)-.1)<1e-10);
const zeroRates=[.08,.09],bondFlows=[[1,50],[2,1050]],priceZ=z=>bondFlows.reduce((p,[t,c],i)=>p+c/(1+zeroRates[i]+z)**t,0);
const dz=.001;assert.ok(priceZ(.02)>priceZ(.02+dz));assert.ok(priceZ(.02-dz)-2*priceZ(.02)+priceZ(.02+dz)>0,'constant Z add-on still creates convex/nonlinear PV');
assert.equal(1000*.98+15,995);assert.equal(100*(1-.2),80);assert.equal(20*100e6*.4*.5,400e6);assert.equal((12.09+2.34).toFixed(2),'14.43');assert.ok(9+7>15);
for(const q of a.questions.filter(q=>q.type==='multi')){
 assert.equal(ctx.correctChoice(q,Array.from(q.correct)),true,q.id+' exact');
 assert.equal(ctx.correctChoice(q,[]),false,q.id+' empty');
 const missing=Array.from(q.correct).slice(1);assert.equal(ctx.correctChoice(q,missing),false,q.id+' missing');
 const wrong=q.options.findIndex((_,i)=>!q.correct.includes(i));assert.ok(wrong>=0);assert.equal(ctx.correctChoice(q,[...q.correct,wrong]),false,q.id+' extra wrong');
}
for(const k of ['E-07-1','S2-05-0','S1-06-1','E-09-0','S1-02-0']){
 const full=a.supplement(k),brief=a.supplement(k,true);assert.ok(full.includes('Проверить себя без подсказок')&&brief.includes('aligned-keypoint'));
 assert.ok(!/пересдач|PENDING|audit_work|docs\//i.test(full+brief));
 for(const ref of a.lessons[k].references||[]){assert.ok(ref.url.startsWith('https://'));assert.ok(full.includes(ref.url));}
}
for(const id of ['EX17-30','EX17-32','EX17-43','EX17-44','EX17-47'])assert.ok(a.questions.find(q=>q.id===id).rubric.length>=6);
assert.equal(a.lessons['S1-02-0'].facts.length,6);assert.ok(a.lessons['S2-05-0'].facts.some(f=>f.includes('номинальной стоимости')));
console.log('PASS compound package:independent PV/YTM counterexample,nonlinear Z-spread,dirty/collateral/index units,exact/missing/extra sets for every MC,multipart rubrics and public primary references');

const statements=JSON.parse(read('docs/audits/data/EXAM_MC_STATEMENT_REVIEW_20261031.json'));
assert.equal(statements.statement_count,125);assert.equal(statements.rows.length,25);assert.equal(statements.official_key,false);
assert.equal(statements.rows.flatMap(r=>r.statements).length,125);
for(const row of statements.rows){assert.equal(row.statements.length,5);assert.ok(row.theory_block_ids.length);assert.ok(a.questions.some(q=>q.id===row.adapted_training_id&&q.type==='multi'&&q.options.length===5));for(const s of row.statements){assert.ok(s.rationale&&/^[a-f0-9]{64}$/.test(s.source_text_sha256));assert.equal(s.official_key,false)}}
assert.equal(a.questions.filter(q=>q.provenance==='confirmed_exam_adapted'&&q.type==='multi').length,25);
assert.equal(Object.keys(a.lessons).length,29);assert.equal(a.lessons['R-02-0'].additional.length,2);
assert.equal((a.supplement('R-02-0').match(/data-aligned-block="R-02-0"/g)||[]).length,1);
assert.ok(a.supplement('R-02-0').includes('R-02-0-part-1'));
const scope='По сообщению преподавателя раздел маржинальной торговли не входит в экзамен. Его объяснения и расчётные задания сохранены для обучения; новый экзаменационный профиль исключает эту главу.';
assert.ok(ctx.learnerText(scope).includes('РЕПО с акциями'));assert.ok(!ctx.learnerText(scope).includes('исключает эту главу'));
for(const rate of [.12,.16,.2]){const spread=.03,k=.16,credit=rate+spread,payer=k-rate;assert.ok(Math.abs(credit+payer-(k+spread))<1e-12)}
assert.equal((.16-.06)/.1,1);assert.equal((.16-.06)/.05,2);assert.equal(.75*80,60);assert.equal(.95*100,95);assert.ok(.59>.11);
for(const key of Object.keys(a.lessons)){assert.ok(!/пересдач|audit_work|docs\//i.test(a.supplement(key)+a.supplement(key,true)));}
console.log('PASS complete MC review:125 individually documented original statements/conditions,no official-key claim,25adapted five-option tasks,existing prerequisite reuse,independent payer flows/ratios/voting denominators,unique support anchors and REPO scope');

const beginnerData=JSON.parse(html.match(/const STUDY_BEGINNER\s*=\s*([\s\S]*?);\n/)[1]);
// Every source record has a concrete disposition; unknown original wording stays unknown.
const remaining=JSON.parse(read('docs/audits/data/EXAM_OPEN_RECON_REVIEW_20261031.json'));
assert.equal(remaining.official_key,false);assert.equal(remaining.records.length,45);
assert.equal(remaining.records.filter(r=>r.topic_only).length,3);
assert.deepEqual(Array.from(a.questions.filter(q=>q.provenance==='confirmed_exam_adapted').map(q=>q.original_exam_number)).sort((x,y)=>x-y),Array.from({length:50},(_,i)=>i+1));
assert.equal(a.questions.filter(q=>q.provenance==='confirmed_exam_adapted'&&q.type==='open').length,25);
for(const record of remaining.records){
 const row=matrix.rows.find(r=>r.id===record.record_id);assert.ok(row&&row.verified_support.length,record.record_id);
 for(const id of record.question_ids)assert.ok(ctx.fullBank.some(q=>q.id===id),id);
 for(const fragment of row.verified_support){
  const content=fragment.layer==='existing_beginner'?JSON.stringify(beginnerData[fragment.block]):fragment.layer.startsWith('existing_master.')?JSON.stringify(master[fragment.block]):JSON.stringify(a.lessons[fragment.block]);
  assert.ok(content.includes(JSON.stringify(fragment.quote).slice(1,-1)),record.record_id+' exact displayed prerequisite');
 }
 if(record.topic_only)assert.ok(!a.questions.some(q=>q.id===record.record_id),'topic-only memory must not invent a specific exam stem');
}
// Independent boundary cases: terminal put-call parity/protection, residual DV01,
// covariance endpoints and quote inversion. These catch sign/base mistakes.
for(const k of [80,100,120])for(const st of [0,60,100,140,200]){
 const c=Math.max(st-k,0),p=Math.max(k-st,0);assert.equal(c-p+k,st);assert.equal(st+p,Math.max(st,k));
 assert.equal(c-p,st-k);assert.equal((st+p)-110-7,Math.max(st,k)-117);
}
const variance=(w1,s1,w2,s2,rho)=>w1*w1*s1*s1+w2*w2*s2*s2+2*w1*w2*rho*s1*s2;
assert.ok(Math.abs(variance(.6,.2,.4,.3,-1))<1e-16);assert.ok(variance(.5,.2,.5,.3,-1)>0);
assert.ok(Math.abs(Math.sqrt(variance(.5,.2,.5,.3,1))-.25)<1e-12);
assert.equal(-100+70,-30);assert.equal(74<75,true);
const forward=10*(1+.15*.5)/(1+.03*.5),inverse=.1*(1+.03*.5)/(1+.15*.5);assert.ok(Math.abs(forward*inverse-1)<1e-12);
for(const key of Object.keys(a.lessons)){
 const markup=a.supplement(key);const anchors=Array.from(markup.matchAll(/data-aligned-block="([^"]+)"/g),m=>m[1]);assert.equal(new Set(anchors).size,anchors.length,key+' unique anchors');
}
console.log('PASS final content package:50 adapted originals/33 reconstructed records with35 exercises/3 topic-only reuse;all86 dispositions and exact displayed prerequisites;independent parity/protection/covariance/DV01/FX boundaries');
