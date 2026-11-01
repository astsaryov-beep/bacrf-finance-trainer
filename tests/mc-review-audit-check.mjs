import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import vm from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const json=p=>JSON.parse(read('docs/audits/data/'+p));
const matrix=json('T33_MC_REVIEW.json'),baseline=json('T33_BASELINE.json'),changes=json('T33_MC_CHANGES.json');
const ctx={};for(const f of ['exam-practice','exam-alignment'])vm.runInNewContext(read('assets/'+f+'.js'),ctx);
// Obtain the two public supplementary banks; never infer review from a key match.
const banks=[...Array.from(ctx.ExamPractice.questions),...Array.from(ctx.ExamAlignment.questions).filter(q=>q.type==='multi')];
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
 if(r.status==='PENDING'){assert.equal(r.review,null);assert.equal(r.decision,null);continue;}
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
}
if(matrix.status==='COMPLETED')assert.equal(reviewed.length,249,'Cannot accept partial P1');
// This stage edits evidence only. Exact file hashes protect open UI/scoring, all rubrics and historical content.
if(changes.changes.length===0)for(const [p,h]of Object.entries(baseline.sha256))assert.equal(sha(readFileSync(new URL('../'+p,import.meta.url))),h,'Unexpected application change '+p);
assert.equal(changes.reviewed_questions,reviewed.length);
console.log(`PASS T33 audit evidence: ${reviewed.length}/249 reviewed (${reviewed.length*5}/1245 statements); ${249-reviewed.length} explicitly pending; protected application unchanged.`);
