import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8'),html=read('index.html');
const parse=n=>{const m=new RegExp('const '+n+'\\s*=\\s*').exec(html),i=m.index+m[0].length;return JSON.parse(html.slice(i,html.indexOf(';\n',i)));};
const ctx={};vm.runInNewContext(read('question-review.js'),ctx);vm.runInNewContext(read('exam-practice.js'),ctx);
const bank=parse('BANK'),ext=ctx.ExamPractice,all=[...bank,...parse('STUDY_EXTRAS').filter(q=>ext.openQuestionIds.includes(q.id)),...ext.questions].map(q=>ctx.FinanceReview.question(q));
assert.equal(bank.length,275);assert.equal(ext.questions.length,172);assert.equal(new Set(all.map(q=>q.id)).size,469);assert.equal(all.filter(q=>q.type==='multi').length,196);
const lessons=parse('STUDY_LESSONS'),master=parse('STUDY_MASTER'),ordered=lessons.flatMap(l=>l.blocks.map((b,i)=>l.id+'-'+i));
for(const q of ext.questions){
 assert.equal(q.type,'multi');assert.ok(q.correct.length>=2&&q.correct.length<q.options.length);assert.equal(q.optionFeedback.length,q.options.length);
 assert.equal(new Set(q.correct).size,q.correct.length);assert.ok(q.correct.every(i=>Number.isInteger(i)&&i>=0&&i<q.options.length));
 assert.ok(q.optionFeedback.every(x=>x.trim()));assert.ok(q.learningSupport.length);
 for(const ref of q.learningSupport){assert.ok(ordered.indexOf(ref.block)<=ordered.indexOf(q.block));const actual=ref.field==='glossary'?lessons.find(l=>l.id===ref.block.slice(0,-2)).blocks[+ref.block.at(-1)].glossary:master[ref.block][ref.field];assert.equal(JSON.stringify(actual),JSON.stringify(ref.passages),'stale source support '+q.id);}
}
for(let i=0;i<120;i++){
 const shuffle=a=>[...a].sort(()=>Math.random()-.5),s=ext.choose(all,shuffle);assert.ok(!s.error,s.error);assert.equal(s.items.length,50);assert.equal(new Set(s.items.map(q=>q.id)).size,50);assert.equal(s.items.filter(q=>q.type==='open').length,25);assert.equal(s.items.filter(q=>q.type==='multi').length,25);assert.ok(s.items.every(q=>!q.numeric&&q.type!=='single'));
 for(const id of ['BO03','EO01','PO03','V2-032','V2-050','V2-068'])assert.ok(!s.items.some(q=>q.id===id));
 for(const sec of ['reg','debt','equity','deriv'])assert.ok(s.items.filter(q=>q.section===sec).length<=20);
}
assert.ok(ext.choose(all.filter(q=>q.origin==='original'),a=>a).error,'incomplete filter must fail, not fall back to single-choice');
assert.ok(ext.choose(all.filter(q=>q.type!=='multi'),a=>a).error);
assert.ok(all.some(q=>q.type==='single'),'ordinary questions retained');
const a=JSON.parse(read('QUESTION_LEARNING_ALIGNMENT.json'));assert.equal(a.assignments.length,309);assert.equal(a.reviewedHistoricalAssignments,285);assert.equal(a.assignments.filter(x=>x.status==='PENDING').length,24);
for(const row of [...a.assignments.filter(x=>x.support.length),...a.additions])for(const ref of row.support){assert.ok(ordered.indexOf(ref.block)<=ordered.indexOf(row.block),'future theory '+row.questionId);assert.equal(JSON.stringify(master[ref.block]?.[ref.field]||lessons.find(l=>l.id===ref.block.slice(0,-2)).blocks[+ref.block.at(-1)].glossary),JSON.stringify(ref.passages));}
assert.ok(a.assignments.find(x=>x.questionId==='V2-067').support.some(x=>JSON.stringify(x.passages).includes('call даёт держателю право купить')));
for(const id of ext.openQuestionIds){const chosen=ext.choose(all,a=>[...a].sort((x,y)=>(y.id===id)-(x.id===id)));assert.ok(chosen.items.some(q=>q.id===id),'open supplement unreachable '+id);}
console.log('PASS exam practice:172 reviewed new MCs/196 total +22 reviewed open supplements, exact25open+25multi/no calculation/no fallback, historical singles retained, explicit earlier-theory evidence for285/309 assignments and172 additions. Remaining24 pending.');
