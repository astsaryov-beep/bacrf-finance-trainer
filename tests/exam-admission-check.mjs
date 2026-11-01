import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';import {createHash}from'node:crypto';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8'),json=p=>JSON.parse(read(p)),ctx={};
for(const n of ['question-review','exam-practice','exam-alignment','exam-admission','exam-profile'])vm.runInNewContext(read('assets/'+n+'.js'),ctx);
const h=read('index.html'),literal=n=>JSON.parse(h.match(new RegExp('const '+n+'\\s*=\\s*([\\s\\S]*?);\\n'))[1]);
const raw=[...literal('BANK'),...literal('STUDY_EXTRAS').filter(q=>ctx.ExamPractice.openQuestionIds.includes(q.id)),...ctx.ExamPractice.questions,...ctx.ExamAlignment.questions];
const stable=v=>v===null||typeof v!=='object'?JSON.stringify(v):Array.isArray(v)?'['+v.map(stable).join(',')+']':'{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+stable(v[k])).join(',')+'}';
const sha=s=>createHash('sha256').update(s).digest('hex'),clone=x=>JSON.parse(JSON.stringify(x));
const before=raw.map(q=>ctx.FinanceReview.question(q)),pool=before.map(q=>ctx.ExamAdmission.prepare(q)),bank=new Map(pool.map(q=>[q.id,q]));
const report=json('docs/audits/data/T33_P2_ADMISSION.json'),baseline=json('docs/audits/data/T33_P2_BASELINE.json'),p=ctx.ExamProfile,a=ctx.ExamAdmission;
assert.equal(sha(p.summary.toString()),baseline.summary_function_sha256,'unchanged assessment function');
assert.equal(Object.keys(a.entries).length,report.total);assert.equal(report.total,227);assert.equal(report.added_mc,100);assert.equal(report.added_open,35);
for(let i=0;i<pool.length;i++){
 const q=pool[i],old=before[i];assert.equal(raw[i].id,q.id);const stripped={...q};if(!old.reviewRevision)delete stripped.reviewRevision;
 assert.equal(stable(stripped),stable(old),'adapter changes only the missing revision '+q.id);
 if(a.entries[q.id]){
  const evidence=report.records.find(r=>r.id===q.id);assert.ok(evidence);assert.equal(sha(stable(old)),evidence.runtime_before_sha256,q.id);
  assert.ok(a.entries[q.id].goals.length);assert.equal(new Set(a.entries[q.id].goals).size,a.entries[q.id].goals.length);assert.ok(q.reviewRevision);
  assert.ok(!q.numeric&&['open','multi'].includes(q.type));assert.equal(evidence.requires_calculation,false);
  if(q.type==='open'){assert.ok(q.rubric.length>=2);assert.deepEqual(clone(q.rubric),clone(old.rubric));}
  else{assert.equal(q.options.length,5);assert.ok(q.correct.length>=1&&q.correct.length<=4);}
  // Admission adds no correction and invalidates no existing evidence/draft.
  const revision=ctx.FinanceReview.corrections[q.id]?.revision;
  const prior={text:'Сохранённый ответ',selected:q.correct?Array.from(q.correct):[],choice:q.correct?Array.from(q.correct):[],rubric:q.rubric?[0]:[],checked:true,score:1,confidence:3,reviewRevision:revision};
  assert.equal(stable(ctx.FinanceReview.migrateCourseAnswer(q,clone(prior))),stable(ctx.FinanceReview.migrateCourseAnswer(old,clone(prior))));
  const evidenceBefore={tries:2,last:true,lastScore:1,reviewRevision:revision};assert.equal(ctx.FinanceReview.currentEvidence(q,evidenceBefore),ctx.FinanceReview.currentEvidence(old,evidenceBefore));
 }
}
for(const ids of Object.values(report.excluded))for(const id of ids)assert.ok(!a.entries[id],'explicit exclusion '+id);
const pair=(x,y)=>a.compatible(bank.get(x),bank.get(y));
assert.equal(pair('EX17-10','EX17-04'),true,'listing requirements and cash flows are distinct goals');
assert.equal(pair('EX17-13','EX17-33'),true,'option value and Rho are distinct goals');
assert.equal(pair('EX17-12','EX17-26'),true,'REPO economic risk and exercise of voting rights differ');
assert.equal(pair('EX17-33','MC-S2-09-0-1'),true,'Rho and exercise rights are not a blanket option ban');
assert.equal(pair('Q09','Q11'),false,'ASW case supplies structure to the definition question');
assert.equal(pair('PO07','Q11'),false,'directional stem hint across different assessment goals');
assert.ok(!a.targets(bank.get('PO07')).goals.some(g=>a.targets(bank.get('Q11')).goals.includes(g)));
assert.equal(pair('EX17-32','RECON-34'),false,'compound task shares the KSU/haircut target');
assert.equal(pair('EX17-24','EX17-29'),false,'case and role question duplicate the same fixed-payer result');
const seeds=[],frequency={},cardinality={},goalSets=[],minAdded={multi:Infinity,open:Infinity};
for(let seed=0;seed<1000;seed++){
 const s=p.choose(pool,seed);assert.ok(!s.error,seed+':'+s.error);assert.equal(s.items.length,50);assert.equal(new Set(s.items.map(q=>q.id)).size,50);
 for(const [section,formats]of Object.entries(p.quotas))for(const [type,n]of Object.entries(formats))assert.equal(s.items.filter(q=>q.section===section&&q.type===type).length,n);
 assert.equal(s.items.filter(q=>p.metadata(q).sourceGroup==='lecture').length,8);assert.ok(s.items.filter(q=>p.metadata(q).complex).length>=3);
 for(const type of ['multi','open']){assert.equal(s.items.filter(q=>q.type===type&&p.metadata(q).taskKind==='knowledge').length,11);minAdded[type]=Math.min(minAdded[type],s.items.filter(q=>q.type===type&&a.entries[q.id].examEligible).length);}
 for(let i=0;i<s.items.length;i++){
  const q=s.items[i];assert.ok(a.entries[q.id]);assert.equal(p.metadata(q).examEligible,true);assert.equal(s.profile.questionRevisions[q.id],q.reviewRevision);
  for(const prior of s.items.slice(0,i))assert.ok(a.compatible(q,prior),'duplicate target/hint: '+seed+' '+q.id+'/'+prior.id);
  frequency[q.id]=(frequency[q.id]||0)+1;
  if(q.type==='multi'){cardinality[q.correct.length]=(cardinality[q.correct.length]||0)+1;assert.deepEqual(Array.from(s.orders[q.id]).sort((a,b)=>a-b),[0,1,2,3,4]);}
 }
 if(seed<20)assert.equal(JSON.stringify(s),JSON.stringify(p.choose(pool,seed)),'deterministic metadata and order');
 const ids=s.items.map(q=>q.id);seeds.push(ids);goalSets.push(new Set(s.items.flatMap(q=>Array.from(a.targets(q).goals))));
 // Current answers grade fully; no arbitrary revision causes all reused tasks to be stale.
 const session={ids,examProfile:s.profile,responses:{},grades:{}};
 for(const q of s.items)if(q.type==='multi')session.responses[q.id]={choice:Array.from(q.correct)};
 else{session.responses[q.id]={text:'Ответ',rubric:q.rubric.map((_,i)=>i),checked:true};session.grades[q.id]={type:'rubric',points:q.rubric.length,total:q.rubric.length};}
 assert.equal(p.summary(session,bank).strict,50);assert.equal(p.summary(session,bank).stale,0);
 if(seed===0){const open=s.items.find(q=>q.type==='open'&&a.entries[q.id].examEligible);assert.ok(open);session.responses[open.id].checked=false;assert.equal(p.summary(session,bank).strict,49);session.responses[open.id].checked=true;session.examProfile.questionRevisions[open.id]='obsolete';assert.equal(p.summary(session,bank).strict,49);assert.equal(p.summary(session,bank).stale,1);}
}
assert.equal(Object.keys(frequency).length,report.total,'every admitted ID must actually be sampled');
assert.ok(p.choose(pool.filter(q=>q.type==='multi'),0).error);assert.ok(p.choose(pool.filter(q=>q.section!=='reg'),0).error);
assert.ok(p.choose(pool.filter(q=>!p.metadata(q).complex),0).error);assert.ok(p.choose(pool.filter(q=>p.metadata(q).taskKind!=='case'),0).error);
const catalogue=Object.keys(a.entries),index=new Map(catalogue.map((id,i)=>[id,i]));
function overlapStats(sets){const bits=sets.map(ids=>{const b=new Uint32Array(Math.ceil(catalogue.length/32));for(const id of ids){const i=index.get(id);b[i>>>5]|=1<<(i&31);}return b;});const counts=new Uint32Array(51);let sum=0,pairs=0;
 for(let i=0;i<bits.length;i++)for(let j=0;j<i;j++){let n=0;for(let k=0;k<bits[i].length;k++){let v=bits[i][k]&bits[j][k];v-=v>>>1&0x55555555;v=(v&0x33333333)+(v>>>2&0x33333333);n+=((v+(v>>>4)&0x0f0f0f0f)*0x01010101)>>>24;}counts[n]++;sum+=n;pairs++;}
 const quantile=x=>{let n=0;for(let i=0;i<counts.length;i++){n+=counts[i];if(n>=pairs*x)return i;}};
 return {pairs,min:counts.findIndex(n=>n>0),mean:sum/pairs,p50:quantile(.5),p95:quantile(.95),max:counts.findLastIndex(n=>n>0)};}
const overlaps=overlapStats(seeds);assert.ok(overlaps.mean<baseline.all_pair_overlap.mean,'observed repeat reduction');
const newGoalCounts=goalSets.map(s=>s.size),oldSets=baseline.seed_selections.map(row=>row.selection.map(i=>baseline.catalogue[i].id)),oldGoals=oldSets.map(ids=>new Set(ids.flatMap(id=>Array.from(a.targets(bank.get(id)).goals))).size);
const oldCollisions=oldSets.map(ids=>ids.reduce((n,id,i)=>n+ids.slice(0,i).filter(other=>!a.compatible(bank.get(id),bank.get(other))).length,0));
const poolCardinality={};for(const id of catalogue){const q=bank.get(id);if(q.type==='multi')poolCardinality[q.correct.length]=(poolCardinality[q.correct.length]||0)+1;}
const result={task:'T-33',status:'LOCAL_PASS_BROWSER_AND_RELEASE_PENDING',seed_range:[0,999],admitted_total:catalogue.length,multi:catalogue.filter(id=>bank.get(id).type==='multi').length,open:catalogue.filter(id=>bank.get(id).type==='open').length,actually_sampled:Object.keys(frequency).length,min_added_per_ticket:minAdded,all_pair_overlap_before:baseline.all_pair_overlap,all_pair_overlap_after:overlaps,mean_overlap_by_format:Object.fromEntries(['multi','open'].map(type=>[type,Object.entries(frequency).filter(([id])=>bank.get(id).type===type).reduce((sum,[,n])=>sum+n*(n-1)/2,0)/499500])),atomic_goal_count:{unique_pool_before:new Set(oldSets.flatMap(ids=>ids.flatMap(id=>Array.from(a.targets(bank.get(id)).goals)))).size,unique_pool_after:new Set(catalogue.flatMap(id=>Array.from(a.targets(bank.get(id)).goals))).size,mean_per_ticket_before:oldGoals.reduce((a,b)=>a+b,0)/1000,mean_per_ticket_after:newGoalCounts.reduce((a,b)=>a+b,0)/1000},audited_goal_or_hint_collisions:{tickets_before:oldCollisions.filter(n=>n>0).length,mean_pairs_before:oldCollisions.reduce((a,b)=>a+b,0)/1000,max_pairs_before:Math.max(...oldCollisions),tickets_after:0,pairs_after:0},pool_cardinality:poolCardinality,sampled_cardinality:cardinality,frequency,seed_selections:seeds.map(ids=>ids.map(id=>index.get(id))),catalogue};
result.status='GENERATION_PASS';result.input_assets_sha256=Object.fromEntries(['assets/exam-profile.js','assets/exam-admission.js'].map(file=>[file,sha(read(file))]));
if(process.argv.includes('--write-report'))fs.writeFileSync(new URL('../docs/audits/data/T33_P2_GENERATION.json',import.meta.url),JSON.stringify(result,null,2).replace(/\[\n(?:\s+\d+,?\n)+\s*\]/g,s=>JSON.stringify(JSON.parse(s)))+'\n');
else assert.deepEqual(result,json('docs/audits/data/T33_P2_GENERATION.json'),'stored evidence must reproduce from the current generator/admission');
console.log('PASS T33 P2:',JSON.stringify({...result,frequency:undefined,seed_selections:undefined,catalogue:undefined}));
