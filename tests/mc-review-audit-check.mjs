import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import vm from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const json=p=>JSON.parse(read('docs/audits/data/'+p));
const matrix=json('T33_MC_REVIEW.json'),baseline=json('T33_BASELINE.json'),changes=json('T33_MC_CHANGES.json');
const ctx={};for(const f of ['question-review','exam-practice','exam-alignment'])vm.runInNewContext(read('assets/'+f+'.js'),ctx);
// Obtain the two public supplementary banks; never infer review from a key match.
// Compare literal source records: alignment adds derived topic/family metadata at runtime.
const rawQuestions=f=>{const s=read('assets/'+f+'.js'),m=/const questions\s*=\s*/.exec(s),start=m.index+m[0].length;return JSON.parse(s.slice(start,s.indexOf(';\n',start)));};
const banks=[...rawQuestions('exam-practice'),...rawQuestions('exam-alignment').filter(q=>q.type==='multi')];
const current=new Map(banks.map(q=>[q.id,q]));
const stable=v=>v===null||typeof v!=='object'?JSON.stringify(v):Array.isArray(v)?'['+v.map(stable).join(',')+']':'{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+stable(v[k])).join(',')+'}';
const sha=s=>createHash('sha256').update(s).digest('hex');
assert.equal(current.size,249);assert.equal(matrix.records.length,249);
assert.equal(new Set(matrix.records.map(r=>r.question_id)).size,249);
const reviewed=matrix.records.filter(r=>r.status==='REVIEWED_KEEP'||r.status==='REVIEWED_EDIT');
assert.equal(matrix.reviewed_questions,reviewed.length);assert.equal(matrix.reviewed_statements,reviewed.length*5);
assert.equal(matrix.pending_questions,249-reviewed.length);
for(const cohort of ['P1-A','P1-C'])assert.equal(matrix.records.filter(r=>r.cohort===cohort).length,cohort==='P1-A'?204:45);
for(const r of matrix.records){
 const q=current.get(r.question_id);assert.ok(q,r.question_id);assert.equal(q.options.length,5);
 assert.equal(r.baseline.commit,baseline.baseline_commit);assert.match(r.baseline.question_sha256,/^[a-f0-9]{64}$/);
 if(r.status==='PENDING'){assert.equal(r.review,null);assert.equal(r.decision,null);assert.equal(sha(stable(q)),r.baseline.question_sha256,'Unreviewed question changed '+q.id);continue;}
 assert.ok(['REVIEWED_KEEP','REVIEWED_EDIT'].includes(r.status));
 assert.equal(r.review.alternatives.length,5);assert.equal(new Set(r.review.alternatives.map(a=>a.index)).size,5);
 assert.ok(r.review.skill&&r.review.independence&&r.review.prerequisite_review&&r.review.duplicate_review);
 for(const a of r.review.alternatives){
  assert.equal(q.options[a.index],a.text);assert.ok(['TRUE','FALSE','CONDITIONAL','AMBIGUOUS'].includes(a.verdict));
  assert.ok(a.rationale.length>=25&&a.conditions.length>=20);assert.ok(a.source_refs.length>0);
  for(const ref of a.source_refs){const s=matrix.source_registry[ref.source_id];assert.ok(s);assert.ok(ref.pdf_pages.length);for(const page of ref.pdf_pages)assert.ok(Number.isInteger(page)&&page>=1&&page<=s.pages);}
 }
 assert.deepEqual(r.review.independent_correct,r.review.alternatives.filter(a=>a.verdict==='TRUE').map(a=>a.index));
 assert.deepEqual(r.review.independent_correct,Array.from(q.correct));
 if(r.decision==='KEEP')assert.equal(sha(stable(q)),r.baseline.question_sha256,'Unrecorded change to reviewed question '+q.id);
 else assert.equal(sha(stable(q)),r.review.after_question_sha256,'Changed question differs from reviewed version '+q.id);
}
if(matrix.status==='COMPLETED')assert.equal(reviewed.length,249,'Cannot accept partial P1');
// Only release labels/cache queries may change in HTML. Open UI, scoring, all rubrics and historical content stay exact.
const html=read('index.html'),version=html.match(/name="trainer-version" content="([^"]+)"/)[1];
const normalized=html.replaceAll(version,'__VERSION__').replace('assets/exam-practice.js?v=__VERSION__','assets/exam-practice.js');
assert.equal(sha(normalized),baseline.index_normalized_sha256,'Changes beyond release labels/cache in index.html');
assert.equal(sha(read('versions/index.html').replaceAll(version,'__VERSION__')),baseline.versions_normalized_sha256,'Unexpected version chooser change');
for(const [p,h]of Object.entries(baseline.sha256))if(!['index.html','assets/exam-practice.js','assets/exam-alignment.js'].includes(p))assert.equal(sha(readFileSync(new URL('../'+p,import.meta.url))),h,'Protected application changed '+p);
// An explicit MC revision must not permit changes to the 50 open records, lessons or module logic.
const alignmentGuard=json('T33_ALIGNMENT_REVISION_GUARD.json');
assert.equal(alignmentGuard.original_file_sha256,baseline.sha256['assets/exam-alignment.js']);
let alignmentText=read('assets/exam-alignment.js').replace("(q.reviewRevision==='2026-11-01-editorial'||q.reviewRevision?.startsWith('2026-11-01-t33-'))&&root.FinanceReview","q.reviewRevision==='2026-11-01-editorial'&&root.FinanceReview");
const alignmentStart=/const questions\s*=\s*/.exec(alignmentText);const literalStart=alignmentStart.index+alignmentStart[0].length,literalEnd=alignmentText.indexOf(';\n',literalStart);
assert.equal(sha(alignmentText.slice(0,literalStart)+'__QUESTIONS__'+alignmentText.slice(literalEnd)),alignmentGuard.outside_questions_sha256,'Alignment lessons/module logic changed');
const openRecords=rawQuestions('exam-alignment').filter(q=>q.type==='open');
assert.equal(openRecords.length,50);assert.equal(Object.keys(alignmentGuard.open_questions_sha256).length,50);
for(const q of openRecords)assert.equal(sha(stable(q)),alignmentGuard.open_questions_sha256[q.id],'Open record changed '+q.id);
assert.equal(changes.reviewed_questions,reviewed.length);
// Native exercises may be assigned later than their original block, after all prerequisites.
vm.runInNewContext(read('assets/learning-path.js'),ctx);
const lessons=JSON.parse(html.match(/const STUDY_LESSONS\s*=\s*([\s\S]*?);\n/)[1]);
const route=[1,2,3,4,5,6,7,8].flatMap(g=>lessons.filter(l=>l.seminar===g));
ctx.CourseLearning.configure(route,ctx.ExamAlignment.questions);
for(const q of ctx.ExamAlignment.questions.filter(q=>q.type==='multi'))assert.equal(matrix.records.find(r=>r.question_id===q.id).review.prerequisite_review.assigned_block,q.courseBlock,'Reviewed prerequisite assignment differs from actual course '+q.id);
ctx.STUDY_QMAP=new Map([...ctx.ExamPractice.questions,...ctx.ExamAlignment.questions].map(q=>[q.id,q]));
vm.runInNewContext(html.split('\n').find(l=>l.startsWith('function getStudyAnswer(')),ctx);
for(const change of changes.changes){
 const q=current.get(change.question_id),patch=ctx.FinanceReview.corrections[q.id],oldSelected=change.before.correct;
 assert.equal(patch.reviewKind,'wording');assert.equal(patch.revision,q.reviewRevision);
 assert.deepEqual(change.before.correct,change.after.correct,'This cohort changes distractors, not keys');
 const open=ctx.ExamAlignment.questions.find(q=>q.type==='open');
 const openPatch=ctx.FinanceReview.corrections[open.id];
 const old={version:2,responses:{[q.id]:{choice:[...oldSelected],confidence:3,checked:true,reviewRevision:change.previous_review_revision},[open.id]:{text:'Сохранённый открытый ответ',rubric:[0],checked:true,reviewRevision:openPatch?.revision}},grades:{[q.id]:{strict:true,score:1},[open.id]:{score:.5,type:'open'}},recorded:{[q.id]:true},optionOrders:{[q.id]:[4,2,0,3,1]}};
 const openBefore=JSON.stringify({response:old.responses[open.id],grade:old.grades[open.id]});
 ctx.FinanceReview.migrateSession(old);
 assert.deepEqual(Array.from(old.responses[q.id].choice),[]);assert.equal(old.responses[q.id].confidence,3);assert.equal(old.responses[q.id].needsReviewRecheck,true);
 assert.equal(old.grades[q.id],undefined);assert.equal(old.recorded[q.id],undefined);
 assert.deepEqual(Array.from(old.reviewHistory[q.id].response.choice),oldSelected);assert.equal(old.reviewHistory[q.id].grade.strict,true);
 assert.deepEqual(old.optionOrders[q.id],[4,2,0,3,1]);
 assert.equal(JSON.stringify({response:old.responses[open.id],grade:old.grades[open.id]}),openBefore,'MC migration changed open response/assessment');
 const once=JSON.stringify(old);ctx.FinanceReview.migrateSession(old);assert.equal(JSON.stringify(old),once,'Migration must be idempotent');
 old.responses[q.id].choice=[...q.correct];old.responses[q.id].checked=true;old.responses[q.id].needsReviewRecheck=false;
 ctx.FinanceReview.migrateSession(old);assert.deepEqual(Array.from(old.responses[q.id].choice),Array.from(q.correct),'Fresh choices lost on reload');
 const course={selected:[...oldSelected],checked:true,score:1,confidence:3,reviewRevision:change.previous_review_revision};ctx.FinanceReview.migrateCourseAnswer(q,course);
 assert.deepEqual(Array.from(course.previousReviewResult.selected),oldSelected);assert.equal(course.previousReviewResult.score,1);
 assert.deepEqual(Array.from(course.selected),[]);assert.equal(course.checked,false);assert.equal(course.score,null);assert.equal(course.needsReviewRecheck,true);assert.equal(course.confidence,3);
 assert.equal(ctx.FinanceReview.currentEvidence(q,{tries:1,reviewRevision:'old'}),false);
 assert.equal(ctx.FinanceReview.currentEvidence(q,{tries:1,reviewRevision:q.reviewRevision}),true);
 // Execute the actual UI getter against an answer saved in the actual assigned block.
 const runtimeQuestion=ctx.STUDY_QMAP.get(q.id),assigned=runtimeQuestion.courseBlock||runtimeQuestion.block;
 const savedBlock={complete:true,answers:{[q.id]:{selected:[...oldSelected],checked:true,score:1,confidence:3,reviewRevision:change.previous_review_revision}}};
 const courseState={blocks:{[ctx.CourseLearning.storageKey(assigned)]:savedBlock}};
 ctx.getStudyBlock=()=>courseState.blocks[ctx.CourseLearning.storageKey(assigned)];
 const throughGetter=ctx.getStudyAnswer(q.id);
 assert.equal(throughGetter.needsReviewRecheck,true,q.id+' actual study getter must migrate assigned answer');
 assert.equal(throughGetter.checked,false);assert.equal(throughGetter.previousReviewResult.score,1);
 assert.deepEqual(Array.from(throughGetter.previousReviewResult.selected),oldSelected);assert.equal(savedBlock.complete,true);
 assert.equal(throughGetter.confidence,3);
}
console.log(`PASS T33 audit evidence: ${reviewed.length}/249 reviewed (${reviewed.length*5}/1245 statements); ${249-reviewed.length} explicitly pending; ${changes.changes.length} revision-safe edits; open UI/scoring/rubrics unchanged.`);
