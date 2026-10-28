import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';import vm from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8'),html=read('index.html');
const parse=n=>{const m=new RegExp('const '+n+'\\s*=\\s*').exec(html),i=m.index+m[0].length;return JSON.parse(html.slice(i,html.indexOf(';\n',i)))};
const ctx={session:null,tab:'quiz',esc:s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))};
for(const file of ['question-review.js','exam-practice.js','theory-links.js'])vm.runInNewContext(read('assets/'+file),ctx);
const lessons=parse('STUDY_LESSONS'),bank=[...parse('BANK'),...parse('STUDY_EXTRAS').filter(q=>ctx.ExamPractice.openQuestionIds.includes(q.id)),...ctx.ExamPractice.questions].map(q=>ctx.FinanceReview.question(q));
ctx.STUDY_MAP=new Map(lessons.map(l=>[l.id,l]));ctx.BANK_MAP=new Map(bank.map(q=>[q.id,q]));
vm.runInNewContext(read('assets/question-theory-ui.js'),ctx);
const evidence=JSON.parse(read('docs/audits/data/QUESTION_THEORY_LINKS.json')),alignment=JSON.parse(read('docs/audits/data/QUESTION_LEARNING_ALIGNMENT.json'));
assert.equal(bank.length,513);assert.equal(evidence.trainingQuestionCount,513);assert.equal(evidence.manualNavigationCount,40);assert.equal(evidence.rows.length,553);assert.equal(new Set(evidence.rows.map(r=>r.questionId)).size,553);
for(const row of evidence.rows){assert.deepEqual(Array.from(ctx.TheoryLinks.get(row.questionId)),row.blocks);assert.equal(new Set(row.blocks).size,row.blocks.length);for(const k of row.blocks){const cut=k.lastIndexOf('-');assert.ok(ctx.STUDY_MAP.get(k.slice(0,cut))?.blocks[+k.slice(cut+1)],row.questionId+' '+k)}}
for(const q of bank){const links=ctx.FinanceTheoryUI.blocks(q);assert.ok(links.length>=1&&links.every(x=>x.blockTitle&&x.title),q.id);const markup=ctx.FinanceTheoryUI.markup(q,true);assert.ok(markup.includes('data-theory-for="'+q.id+'"'));assert.ok(markup.includes('data-question-theory="'+q.id+'"'))}
for(const r of [...alignment.assignments,...alignment.additions]){const actual=ctx.TheoryLinks.get(r.questionId);assert.ok(actual.includes(r.block));for(const p of r.support||[])assert.ok(actual.includes(p.block))}
for(const [id,blocks] of Object.entries({Q04:['S1-05-0'],Q07:['S1-09-1'],'EXM-D01':['S1-06-1','S1-06-0','S1-07-1'],'EXN-P02':['S2-09-0'],'EXN-R01':['R-04-0','S1-01-0']}))assert.deepEqual(Array.from(ctx.TheoryLinks.get(id)),blocks);
const copy=ctx.TheoryLinks.get('Q04');copy.push('bogus');assert.equal(ctx.TheoryLinks.get('Q04').length,1);assert.equal(ctx.TheoryLinks.get('unknown').length,0);
ctx.session={mode:'exam',done:false};for(const q of bank)assert.equal(ctx.FinanceTheoryUI.markup(q,true),'','active exam cannot expose theory');ctx.session.done=true;assert.ok(ctx.FinanceTheoryUI.markup(bank[0],true));
const nim=ctx.FinanceTheoryUI.supplement('R-04',0);for(const term of ['NIM = (I − E) / Ā × 100%','10,8 − 7,2 = 3,6','3,6 / 90 × 100% = 4%','средний объём','годовому','fdic.gov'])assert.ok(nim.includes(term));assert.equal(ctx.FinanceTheoryUI.supplement('R-04',1),'');assert.ok(Math.abs((10.8-7.2)/90*100-4)<1e-12);assert.equal(ctx.TheoryLinks.anchor('EXN-R01'),'theory-nim');
console.log('PASS theory links:all513 training/40 additional course IDs,553 explicit mappings,all audited supports,40 reviewed standalone mappings,valid targets/no heuristics,no active-exam hints,independent NIM reference');
