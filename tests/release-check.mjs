import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import assert from 'node:assert/strict';
import vm from 'node:vm';

const root=resolve(import.meta.dirname,'..');
const html=readFileSync(resolve(root,'index.html'),'utf8');
const frozen=readFileSync(resolve(root,'v5.0.8/index.html'),'utf8');
const block=html.match(/<script>([\s\S]*?)<\/script>/);
assert.ok(block,'inline JS exists');
new vm.Script(block[1],{filename:'index.html:inline.js'});
assert.match(html,/trainer-version" content="5\.0\.11 beta"/);

function data(src,prefix){
 const i=src.indexOf(prefix);assert.ok(i>=0,'missing '+prefix);
 const end=src.indexOf(';\n',i);assert.ok(end>i,'terminator '+prefix);
 return JSON.parse(src.slice(i+prefix.length,end));
}
const course=data(html,'const STUDY_LESSONS=');
const stableBank=data(frozen,'const BANK=');
const bank=data(html,'const BANK=');
const legacy=data(html,'const STUDY_V5 = ');
const map=data(html,'const FRI_COLLEAGUE_COVERAGE=');
const diagrams=data(html,'const FRI_DIAGRAMS=');
const fallback=data(html,'const FRI_TRAP_FALLBACK=');
const supplements=data(html,'const FRI_TOPIC_SUPPLEMENTS=');
const blocks=course.flatMap(l=>l.blocks.map((b,pos)=>({l,b,pos,id:l.id+'-'+pos})));
assert.equal(course.length,48);
assert.equal(blocks.length,96);
assert.equal(bank.length,275);
assert.deepEqual(bank,stableBank,'Main exam bank must equal frozen stable bank');
assert.equal(bank.filter(x=>x.origin==='original').length,19);
assert.equal(Object.keys(legacy).length,96);
assert.equal(blocks.reduce((n,x)=>n+x.b.glossary.length,0),443);
const formulaCount=Object.values(legacy).reduce((n,x)=>n+(x.formulas?.length||0),0);
assert.equal(formulaCount,84);
assert.equal(Object.keys(diagrams).length,15);
assert.equal(Object.keys(supplements).length,5);
assert.equal(map.length,17);
const ids=new Set(blocks.map(x=>x.id));
for(const row of map)assert.ok(ids.has(row[2]+'-'+row[3]),'unlinked supplement '+row[0]);
for(const k of Object.keys(diagrams))assert.ok(ids.has(k),'orphan diagram '+k);
const existing=html.slice(html.indexOf('const FRI_TRAP_CASES='),html.indexOf('const FRI_TRAP_FALLBACK='));
const original=[...existing.matchAll(/\s*'([A-Z0-9-]+-\d+)':\[/g)].map(x=>x[1]);
assert.equal(original.length,34);assert.equal(Object.keys(fallback).length,62);
for(const x of blocks)assert.ok(original.includes(x.id)||fallback[x.id],'missing trap '+x.id);
const bindings=html.match(/const FRI_LAB_BINDINGS=\{([^}]+)\};/);
assert.ok(bindings,'labs map');
const labs=[...bindings[1].matchAll(/'([A-Z0-9-]+-\d+)':'([a-z]+)'/g)];
assert.equal(labs.length,10);
for(const l of labs)assert.ok(ids.has(l[1]),'invalid lab '+l[1]);

const start=html.indexOf('const FRI_PRACTICE_BANK='),end=html.indexOf('function friExtraForBlock',start);
const courseMap=new Map(course.map(l=>[l.id,l]));
const practiceBuilder=new Function('STUDY_MAP','FRI_COLLEAGUE_COVERAGE',
  html.slice(start,end)+'return FRI_PRACTICE_BANK;');
const practice=practiceBuilder(courseMap,map);
assert.equal(practice.length,70);
assert.equal(practice.filter(q=>q.type==='multi').length,45);
assert.equal(practice.filter(q=>q.type==='open').length,25);
assert.equal(new Set(practice.map(q=>q.id)).size,70);
for(const q of practice.filter(q=>q.type==='multi'))assert.ok(q.correct>=0&&q.correct<q.options.length);
const editorialMC=data(html,'const FRI_EDITORIAL_MC=');
const editorialOpen=data(html,'const FRI_EDITORIAL_OPEN=');
assert.equal(editorialMC.length,17);assert.equal(editorialOpen.length,25);

// Execute 32 boundary examples of all ten interactive financial models.
const fnStart=html.indexOf('function friUpdateLab(');
const fnEnd=html.indexOf('const FRI_ORIGINAL_QUESTION_MAP',fnStart);
assert.ok(fnStart>=0&&fnEnd>fnStart);
const calc=new Function('container',html.slice(fnStart,fnEnd)+'friUpdateLab(container)');
const boundary={
 waterfall:[0,10,30,50],bond:[2,8,20],duration:[-300,0,300],
 swap:[4,11,20],capm:[0,1.2,2.5],option:[60,100,108,150],
 basis:[900,1000,1150],spread:[10,12,23],liquidity:[40,120,180],franchise:[0,20,120]
};
let n=0;
for(const [kind,values] of Object.entries(boundary))for(const value of values){
 const output={innerHTML:''},current={textContent:''};
 calc({dataset:{friLab:kind},querySelector(s){
  if(s==='[data-fri-range]')return {value};
  if(s==='[data-fri-result]')return output;
  if(s==='[data-fri-current]')return current;
  return null;
 }});
 assert.ok(output.innerHTML.length>10);
 assert.ok(!/(?:NaN|Infinity)/.test(output.innerHTML),'bad result '+kind+' '+value);
 n++;
}
assert.equal(n,32);
assert.match(html,/fri-expand-syllabus/);
assert.match(html,/fri-syllabus-dialog/);
assert.match(html,/FRI_PREP_DAYS/);
assert.match(html,/friKnowledgeRegistry/);
assert.match(html,/independentPractice:friExtra/);
assert.match(html,/friInsights:friLearning/);
console.log('PASS 5.0.11: 48 themes, 96 blocks, 275 unchanged questions, 19 teacher questions, 84 formulas, 17 mapped sections, 70 practice prompts, 96 trap checks, 15 diagrams, 10 labs, 32 boundary cases.');
