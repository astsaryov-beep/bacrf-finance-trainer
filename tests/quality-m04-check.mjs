import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const parse=n=>{const m=new RegExp('const '+n+'\\s*=\\s*').exec(html),i=m.index+m[0].length;return JSON.parse(html.slice(i,html.indexOf(';\n',i)));};
const m=parse('STUDY_MASTER'),v=parse('STUDY_V5'),lessons=parse('STUDY_LESSONS');
const counts={'S1-10-0':3,'S1-10-1':2,'S2-01-0':1,'S2-01-1':0,'S2-02-0':2,'S2-02-1':4};
for(const [id,n] of Object.entries(counts)){
 assert.equal(m[id].formulas.length,n);assert.deepEqual(v[id].formulas,m[id].formulas);assert.equal(m[id].extraChecks.length,2);
 assert.equal(v[id].mechanism,m[id].mechanism.join(' '));
}
const glossary=lessons.find(x=>x.id==='S1-10').blocks[1].glossary.find(x=>x.term==='Базис').definition;
assert.match(glossary,/b=F−S/);assert.doesNotMatch(glossary,/Разница между наблюдаемой фьючерсной ценой и соответствующей теоретической/);
const near=(a,b,tol=1e-8)=>assert.ok(Math.abs(a-b)<tol,`${a} != ${b}`);
const longValue=100000000,dLong=6,dShort=3,shortValue=longValue*dLong/dShort;
near(longValue*dLong*.0001,shortValue*dShort*.0001);near(shortValue/.9,222222222.22222222,1e-5);
assert.notEqual(longValue*4*.0001,300000000*4*.0001,'equal durations do not imply equal money risk');
// Discount actual asset/liability cash flows, then independently estimate capital sensitivity.
const equity=y=>100/(1+y)**4-90/(1+y)**2,eps=1e-5;
near((equity(eps)-equity(-eps))/(2*eps),-220,1e-6);
near((-100*4+90*2)*.01,-2.2);
// Two zero-coupon legs matched locally still have different convexity.
const y=.1,portfolio=z=>121/(1+z)**2-(20*1.1**10)/(1+z)**10;
near((portfolio(y+eps)-portfolio(y-eps))/(2*eps),0,2e-6);
assert.ok(Math.abs(portfolio(y+.01)-portfolio(y))>.01,'finite parallel shock is not fully neutral');
near((16.36-14.10-16.18+14.62)*100*100000,7000000);
near(100000000*3*(.0105+.001),3450000);
near(100000*.02/20000,.1);
assert.ok(100000/50000<100000/10000,'additional own cash lowers leverage');
const prices=[14000,13800,13900,13500,13200,13300,12800,13000,13200];
const vms=prices.slice(1).map((p,i)=>p-prices[i]);
near(vms.reduce((a,b)=>a+b,0),-800);
const path=vms.reduce((a,x)=>[...a,a.at(-1)+x],[0]);near(Math.min(...path),-1200);
near(5/.5,10);near((105-100)*10*3,150);near((105-100)*10*3*(-1),-150);
const oi=positions=>positions.reduce((s,x)=>s+Math.abs(x),0)/2;
near(oi([1,-1,0]),1);near(oi([0,-1,1]),1);near(oi([0,0,0]),0);
near([10,-7].reduce((a,b)=>a+b,0),3);
const s0=3200,f0=3311.7,s1=2880,f1=2915;
near((s1-s0)+(f0-f1),(f0-s0)-(f1-s1));near((s1-s0)+(f0-f1),76.7);
near(111.7-76.7,35);assert.notEqual((f1-s1)-(f0-s0),76.7,'source sign error must not recur');
const carry=(s,r,u,income,t)=>s*Math.exp((r+u-income)*t);
near(carry(100,.10,.02,.01,.5),105.65406146754943);
assert.ok(carry(100,.11,.02,.01,.5)>carry(100,.10,.02,.01,.5));
assert.ok(carry(100,.10,.02,.02,.5)<carry(100,.10,.02,.01,.5));
near(6200*(1+.145*.25),6424.75);near(6200*(1+.1434*.5),6644.54);
const financed=100*(1+.1*.5);near(108-financed,3);near(financed-102,3);
near(financed-102-2,1);near((101-100)+(104-103),2);
assert.ok(m['S2-01-1'].mechanism.join(' ').includes('разными правовыми вопросами'));
console.log('PASS M04: money-risk matching, cash-flow ALM/convexity, margin path/tick/sign, OI/netting, basis/hedge sign, carry/time base and reverse legs.');
