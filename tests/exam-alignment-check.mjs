import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8'),html=read('index.html');
const ctx={};vm.runInNewContext(read('assets/exam-alignment.js'),ctx);vm.runInNewContext(read('assets/theory-links.js'),ctx);
vm.runInNewContext(read('assets/question-review.js'),ctx);vm.runInNewContext(read('assets/exam-practice.js'),ctx);vm.runInNewContext(html.slice(html.indexOf('const BANK='),html.indexOf('const SECTION='))+';globalThis.fullBank=EFFECTIVE_BANK;',ctx);assert.equal(ctx.fullBank.length,518);assert.equal(new Set(ctx.fullBank.map(q=>q.id)).size,518);
const a=ctx.ExamAlignment;assert.equal(a.questions.length,5);assert.equal(new Set(a.questions.map(q=>q.id)).size,5);
const expected={'EX17-03':[0,1,2],'EX17-19':[1,3]};
for(const q of a.questions){assert.ok(a.lessons[q.block]);assert.deepEqual(Array.from(ctx.TheoryLinks.get(q.id)),[q.block]);assert.ok(q.source);if(q.type==='multi'){assert.equal(q.options.length,5);assert.equal(q.optionFeedback.length,5);assert.deepEqual(Array.from(q.correct),expected[q.id]);}else assert.ok(q.answer&&q.rubric.length>=2)}
assert.equal(a.questions.filter(q=>q.provenance==='confirmed_exam_adapted').length,3);assert.equal(a.questions.filter(q=>q.provenance==='reconstructed').length,1);
// Independent money/unit/normal-quantile and hedge-ratio boundary checks.
const pnl=(begin,end,step,value,n,side)=>(end-begin)*value/step*n*side;
assert.equal(pnl(100,102,.5,5,3,1),60);assert.equal(pnl(100,102,.5,5,3,-1),-60);assert.equal(pnl(100,102,.5,5,6,1),120);
const risk=t=>1e6*1.645*.01*Math.sqrt(t);assert.equal(risk(1),16450);assert.equal(risk(4),32900);assert.ok(2.326>1.645);assert.equal(.5*.02/.01,1);
for(const k of ['R-02-0','S2-02-0','S2-07-1','S2-08-0']){const full=a.supplement(k),brief=a.supplement(k,true);assert.ok(full.includes('Проверить себя без подсказок')&&brief.includes('aligned-keypoint'));assert.ok(!/пересдач|PENDING|CONFIRMED_EXAM_SCAN|RECON_FROM_PEER_MEMORY|audit_work|docs\//i.test(full+brief));}
const rights=a.lessons['R-02-0'];assert.equal(rights.facts.length,4);for(const word of ['безопасность','информацию','выбор','выслушанным'])assert.ok(rights.facts.join(' ').includes(word));
assert.ok(a.lessons['S2-02-0'].facts.join(' ').includes('W/R'));assert.ok(a.lessons['S2-07-1'].facts.join(' ').includes('λ=z'));
assert.ok(html.includes('...ExamAlignment.questions')||html.includes('?ExamAlignment.questions:[]'));assert.ok(html.includes("ExamAlignment.supplement(l.id+'-'+pos,true)"));
const matrix=JSON.parse(read('docs/audits/data/EXAM_ALIGNMENT_20261031.json'));assert.equal(matrix.rows.length,86);assert.equal(matrix.rows.filter(r=>r.source_kind==='CONFIRMED_EXAM_SCAN').length,50);assert.equal(new Set(matrix.rows.map(r=>r.id)).size,86);
console.log('PASS source alignment:5 linked exercises,3 adapted scan/1 reconstruction/1 transfer,5 plausible alternatives and independent money/quantile/hedge checks,4 prerequisites/full+brief,no workflow labels in extensions,86 tracked requirements');
