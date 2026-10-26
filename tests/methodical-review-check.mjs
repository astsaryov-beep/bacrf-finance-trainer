import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {resolve} from 'node:path';
const root=resolve(import.meta.dirname,'..');
const read=p=>readFileSync(resolve(root,p),'utf8');
const html=read('index.html');
function data(name){const match=new RegExp('const '+name+'\\s*=\\s*').exec(html);assert.ok(match,name);const i=match.index+match[0].length;return JSON.parse(html.slice(i,html.indexOf(';\n',i)));}
const lessons=data('STUDY_LESSONS'),master=data('STUDY_MASTER'),v5=data('STUDY_V5'),beginner=data('STUDY_BEGINNER'),stories=data('STUDY_SIMPLE_CASES');
const rows=JSON.parse(read('COURSE_METHOD_REVIEW.json'));
assert.equal(rows.length,96);assert.equal(new Set(rows.map(r=>r.id)).size,96);
// Match the existing Unicode, sorted-key Python JSON fingerprints without adding a dependency.
const canonical=x=>Array.isArray(x)?'['+x.map(canonical).join(', ')+']':x&&typeof x==='object'?'{'+Object.keys(x).sort().map(k=>JSON.stringify(k)+': '+canonical(x[k])).join(', ')+'}':JSON.stringify(x);
for(const l of lessons)for(const [i,b] of l.blocks.entries()){
 const id=l.id+'-'+i,m=master[id],r=rows.find(r=>r.id===id);assert.ok(r,id);
 assert.ok(['REVIEWED','INHERITED_REVIEW'].includes(r.status),'unfinished review '+id);
 assert.ok(r.decision.length>40,'missing editorial judgment '+id);
 const core={title:b.title,beginner:beginner[id],story:stories[l.id]?stories[l.id][i]:'',foundation:m.foundation,mechanism:m.mechanism,principles:m.principles,application:m.application,advanced:m.advanced,glossary:b.glossary,formulas:m.formulas||[],selfCheck:m.selfCheck};
 if(m.extraChecks?.length)core.extraChecks=m.extraChecks;
 assert.equal(createHash('sha256').update(canonical(core)).digest('hex'),r.fingerprint,'unreviewed content drift '+id);
 if(r.status==='REVIEWED'){
  for(const f of ['foundation','mechanism','application','advanced'])assert.equal(v5[id][f],m[f].join(' '),'legacy layer '+id+' '+f);
  assert.deepEqual(b.deep.why,m.mechanism,'mechanism '+id);
  assert.deepEqual(b.bullets,m.principles,'digest '+id);
  assert.ok(m.principles.length>=2,'missing independent principles '+id);
 }
}
// Independent arithmetic for scenarios added during review, including their boundary cases.
const near=(x,y)=>assert.ok(Math.abs(x-y)<0.005,`${x} != ${y}`);
near(Math.sqrt(.5**2*.2**2+.5**2*.2**2),.141421);
near(10/1.13+(11+11.33/(.13-.03))/1.13**2,106.1947);
near(10000*((1.05**3-1)/.05),31525);
assert.equal(200000*.9-100000,80000);
assert.equal(1000000-800000-20000,180000);
near(800000*.18*30/365,11835.6164);
assert.equal(300000+36*45000+50000,1970000);
near((10000000-9200000)/9200000,.0869565);
const payout=(loss,franchise,limit)=>Math.min(Math.max(loss-franchise,0),limit);
assert.equal(payout(120000,20000,250000),100000);assert.equal(payout(15000,20000,250000),0);assert.equal(payout(500000,20000,250000),250000);
assert.equal(20-13-3-5,-1);
console.log('PASS methodical review: 96 explicit judgments and fingerprints; reviewed theory/digest layers; independent finance scenarios. Full source audit remains separate.');
