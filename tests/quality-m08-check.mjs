import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8'),html=read('index.html');
const parse=n=>{const m=new RegExp('const '+n+'\\s*=\\s*').exec(html),i=m.index+m[0].length;return JSON.parse(html.slice(i,html.indexOf(';\n',i)));};
const ctx={};vm.runInNewContext(read('question-review.js'),ctx);vm.runInNewContext(read('exam-practice.js'),ctx);
const raw=[...parse('BANK'),...parse('STUDY_EXTRAS')],q=id=>ctx.FinanceReview.question(raw.find(x=>x.id===id)),master=parse('STUDY_MASTER');
const changed='RM01 RM02 RM10 RM24 RM05 RM07 V2-002 RM06 RM08 RM12 V2-006 RM14 V2-005 RM11 RM17 V2-007 V2-008 RM19 V2-028 RM18 RM13 RM22 RM23 LQ01 LQ12'.split(' ');
for(const id of changed){assert.equal(JSON.stringify(q(id).correct),JSON.stringify(raw.find(x=>x.id===id).correct),id);assert.equal(q(id).optionFeedback.length,4);assert.ok(q(id).options.every((x,i)=>x!==q(id).options.find((_,j)=>j!==i&&_===x)));}
for(const id of ['Q01','Q02','Q03']){for(const field of ['options','correct'])assert.equal(JSON.stringify(q(id)[field]),JSON.stringify(raw.find(x=>x.id===id)[field]),id+' protected teacher '+field);}
// Every revised mandatory rubric maps to a requested part, with old grades retained exactly once.
for(const id of ['RO08','RO06','RO05']){
 assert.equal(q(id).rubric.length,2);const old={text:'Старый полный ответ '+id,checked:true,revealed:true,score:1,rubric:[0,1,2]};ctx.FinanceReview.migrateCourseAnswer(q(id),old);
 assert.equal(old.text,'Старый полный ответ '+id);assert.equal(old.previousReviewResult.score,1);assert.equal(old.score,null);const once=JSON.stringify(old);ctx.FinanceReview.migrateCourseAnswer(q(id),old);assert.equal(JSON.stringify(old),once);
 const session={ids:[id],responses:{[id]:{text:'История экзамена '+id,rubric:[0,1,2],checked:true}},grades:{[id]:{score:1,strict:true,type:'rubric'}},orders:{}};ctx.FinanceReview.migrateSession(session);assert.equal(session.reviewHistory[id].grade.score,1);assert.equal(session.reviewHistory[id].response.text,'История экзамена '+id);
}
const a=JSON.parse(read('QUESTION_LEARNING_ALIGNMENT.json'));for(const prefix of ['R-01','R-02','R-03','S1-01','S1-02','S1-03'])assert.ok(a.assignments.filter(x=>x.block.startsWith(prefix)).every(x=>x.status!=='PENDING'));
assert.equal(a.assignments.filter(x=>['R-01','R-02','R-03'].includes(x.block.slice(0,-2))).length,28);assert.equal(a.assignments.filter(x=>['S1-01','S1-02','S1-03'].includes(x.block.slice(0,-2))).length,13);assert.equal(a.reviewedHistoricalAssignments,126);
for(const l of ['R-01','R-02','R-03','S1-01','S1-02','S1-03'])for(const b of [0,1]){const qs=ctx.ExamPractice.questions.filter(x=>x.block===l+'-'+b&&x.source.includes('QUALITY_M08_REVIEW'));assert.equal(qs.length,2);assert.equal(qs.filter(x=>x.taskKind==='case').length,1);assert.equal(qs.filter(x=>x.taskKind==='knowledge').length,1);if(l.startsWith('R-')){assert.equal(master[l+'-'+b].formulas.length,0);assert.equal(master[l+'-'+b].extraChecks.length,2);}}
// These early passages must remain before the unchanged historical questions that require them.
assert.match(master['R-02-0'].mechanism.join(' '),/ФССП/);assert.match(master['R-02-0'].mechanism.join(' '),/Росреестр/);assert.match(master['R-03-0'].mechanism.join(' '),/Лизинг/);assert.match(master['R-03-0'].mechanism.join(' '),/доверительное управление/);assert.match(master['R-02-1'].mechanism.join(' '),/25\.02\.1999/);assert.match(master['R-02-1'].mechanism.join(' '),/рыночная дисциплина/i);assert.match(master['S1-01-1'].advanced.join(' '),/прошедший период/);assert.match(master['S1-02-0'].mechanism.join(' '),/иная кредитная организация/);
console.log('PASS M08:28+13 prerequisites reviewed,24 factual/case multi,25 historical single indices and3 protected teacher keys,3 two-part rubric migrations retaining original results, no extra arithmetic scope.');
