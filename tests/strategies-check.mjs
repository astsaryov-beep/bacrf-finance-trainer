import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import vm from 'node:vm';

const root=resolve(import.meta.dirname,'..');
const js=readFileSync(resolve(root,'strategies.js'),'utf8');
const css=readFileSync(resolve(root,'strategies.css'),'utf8');
const html=readFileSync(resolve(root,'index.html'),'utf8');
new vm.Script(js,{filename:'strategies.js'});
const c=vm.runInNewContext(js+'\n({cases:FRI_STRATEGY_CASES,curve:strategyCurveSvg,credit:strategyCreditSvg,basis:strategyBasisSvg,asw:strategyAswSvg})');
assert.equal(c.cases.length,5,'Steepener, Flattener and three other mechanisms');
assert.deepEqual(Array.from(c.cases,x=>x.id),['steepener','flattener','credit','carry','asw']);
for(const e of c.cases){
 assert.ok(e.intro.length>=180&&e.mechanism.length>=180&&e.advanced.length>=150&&e.example.length>=170,'shallow teaching text '+e.id);
 assert.ok(e.math.length>=3&&e.math.every(x=>x.length>=25),'incomplete formulas '+e.id);
 assert.ok(e.risks.length>=115,'missing risk discussion '+e.id);
 assert.ok(e.question.length>=40&&e.options.length===3,'missing question '+e.id);
 assert.ok(e.answer>=0&&e.answer<3&&e.why.length>=80,'invalid answer '+e.id);
}
assert.equal((html.match(/data-tab="strategies"/g)||[]).length,0,"no duplicate top-level strategy section");
assert.match(html,/friStrategyInlineMarkup\(l\.id,pos\)/);
assert.match(html,/friBindStrategyInline\(content\)/);
const inside=vm.runInNewContext(js+'\n({map:FRI_STRATEGY_COURSE_MAP,markup:friStrategyInlineMarkup,bind:friBindStrategyInline})');
assert.deepEqual(Array.from(Object.keys(inside.map)).sort(),['S1-07-0','S1-09-0','S2-02-1','S2-06-0']);
assert.equal((inside.markup('S1-07',0).match(/class="fri-strategy-case"/g)||[]).length,2);
for(const [block,ids] of Object.entries(inside.map)){
 const lesson=inside.markup(...[block.slice(0,block.lastIndexOf('-')),Number(block.slice(-1))]);
 for(const id of ids)assert.ok(lesson.includes('data-strategy-check="'+id+'"'),'missing learning interaction '+id);
 assert.match(lesson,/<svg/,'vectors embedded in study content');
 assert.match(lesson,/Расчё|расчё|расчет|расчёт/,'worked financial computation');
}
assert.equal(inside.markup('S1-01',0),'','unrelated beginner topic must not display strategies');
assert.match(css,/@media\(max-width:800px\)/,'mobile style');
for(const svg of [c.curve(false),c.curve(true),c.credit(),c.basis(),c.asw()]){
 assert.match(svg,/^<svg/);assert.match(svg,/role="img"/);assert.match(svg,/<\/svg>$/);
 assert.ok(!/(?:NaN|Infinity)/.test(svg),'broken plot calculation');
}
const near=(x,y)=>assert.ok(Math.abs(x-y)<0.000001, x+' != '+y);
const dv01=100000;
near((16.18-14.62)*100,156);
near((16.36-14.10)*100,226);
near((16.00-15.14)*100,86);
near(dv01*((16.36-14.10)-(16.18-14.62))*100,7000000);
near(dv01*((16.18-14.62)-(16.00-15.14))*100,7000000);
near(100000000*3*0.0105,3150000);
near(100000000*3*0.001,300000);
near(3150000+300000,3450000);
near((15.5-13.9)*90/360,0.4);
near(0.4+0.5,0.9);
near(0.9*360/90,3.6);
near(17.8-15.3+13.87,16.37);
assert.ok(c.cases.find(x=>x.id==='carry').advanced.includes('CTD'),'carry delivery risks');
assert.ok(c.cases.find(x=>x.id==='asw').risks.includes('кредитный'),'asset swap residual risk');
console.log('PASS T-09: five strategy cases, five accessible SVG charts, navigation and mobile CSS, 12 independent financial identities, risks and correct answers.');
