import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
function data(name){const re=new RegExp('const '+name+'\\s*=\\s*');const hit=re.exec(html);assert.ok(hit);const start=hit.index+hit[0].length;return JSON.parse(html.slice(start,html.indexOf(';\n',start)));}
const lessons=data('STUDY_LESSONS'),master=data('STUDY_MASTER'),legacy=data('STUDY_V5'),intro=data('STUDY_BEGINNER'),stories=data('STUDY_SIMPLE_CASES');
const map=JSON.parse(readFileSync(new URL('./course-repetition-map.json',import.meta.url),'utf8'));
const blocks=lessons.flatMap(l=>l.blocks.map((b,i)=>({id:l.id+'-'+i,b,lid:l.id,pos:i})));
assert.equal(map.length,96);assert.deepEqual(new Set(map.map(r=>r.id)),new Set(blocks.map(r=>r.id)));
const assignments=[];
for(const row of map){
 const item=blocks.find(b=>b.id===row.id);assert.equal(item.b.learning_role,row.outcome);
 assert.ok(row.reason&&row.outcome&&['EDITED','KEEP'].includes(row.action));
 assignments.push(...item.b.qids);
 if(row.action!=='EDITED')continue;
 const m=master[row.id],v=legacy[row.id];
 assert.deepEqual(item.b.deep.why,m.mechanism,'mechanism differs across layers '+row.id);
 assert.equal(v.mechanism,m.mechanism.join(' '),'legacy mechanism differs '+row.id);
 assert.ok(m.exercise.length&&m.application.length&&m.advanced.length,'learning part removed '+row.id);
 const prose=[...(intro[row.id]||[]),...m.mechanism,...m.application,...m.advanced];
 const story=stories[item.lid]?.[item.pos];if(story)prose.push(story);
 const normalized=prose.filter(t=>t.length>100).map(t=>t.replace(/\s+/g,' ').trim().toLowerCase());
 assert.equal(normalized.length,new Set(normalized).size,'literal paragraph repeated in edited full theory '+row.id);
}
assert.equal(assignments.length,309);assert.equal(new Set(assignments).size,309);
// Preserve complete original formulas, not just their number.
const baseline=JSON.parse(readFileSync(new URL('./content-baseline.json',import.meta.url),'utf8'));
const formulaPayload=Object.fromEntries(Object.entries(legacy).map(([k,v])=>[k,v.formulas.slice(0,baseline.originalFormulaCounts?.[k]??v.formulas.length)]));
const formulaSha=createHash('sha256').update(JSON.stringify(formulaPayload)).digest('hex');
assert.equal(formulaSha,baseline.formulasSha256,'formula definitions changed during editorial work');
const qidsSha=createHash('sha256').update(JSON.stringify(blocks.map(x=>[x.id,x.b.qids,x.b.prep]))).digest('hex');
assert.equal(qidsSha,baseline.practiceSha256,'assigned questions or answers changed during editorial work');
// Independently verify the new two-leg example over its breakpoints.
const result=s=>Math.max(s-100,0)-Math.max(s-110,0)-5;
assert.deepEqual([95,100,105,110,120,130].map(result),[-5,-5,0,5,5,5]);
console.log('PASS content: 96 mapped roles, '+map.filter(r=>r.action==='EDITED').length+' edited blocks, consistent layers, preserved formulas/questions, spread example. Semantic judgment remains editorial.');
