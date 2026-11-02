import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8'),copy=v=>JSON.parse(JSON.stringify(v)),c={};
for(const n of ['question-review','exam-practice','exam-alignment'])vm.runInNewContext(read('assets/'+n+'.js'),c);
const before=copy(c.ExamAlignment.questions),corrections=copy(c.FinanceReview.corrections);
vm.runInNewContext(read('assets/question-labels.js'),c);
const evidence=JSON.parse(read('docs/audits/data/T35_PRESENTATION_REVIEW.json'));
assert.equal(Object.keys(c.QuestionLabels.topics).length,95);assert.equal(evidence.records.length,95);assert.equal(evidence.changed,47);
for(const q of c.ExamAlignment.questions){
 const old=before.find(v=>v.id===q.id),row=evidence.records.find(v=>v.id===q.id);assert.equal(q.topic,row.after);assert.equal(old.topic,row.before);
 assert.deepEqual({...copy(q),topic:old.topic,conceptLabel:old.conceptLabel},old,'Only display fields may change: '+q.id);
 assert.equal(q.conceptLabel,old.conceptLabel===old.topic?q.topic:old.conceptLabel);
 assert.ok(q.topic.length>8&&q.topic!=='Финансовые инструменты и институты');
}
assert.deepEqual(copy(c.FinanceReview.corrections),corrections,'Labels register no correction or progress migration');
const first=JSON.stringify(c.ExamAlignment.questions);c.QuestionLabels.apply(c.ExamAlignment.questions);assert.equal(JSON.stringify(c.ExamAlignment.questions),first,'idempotent metadata');
assert.match(c.QuestionLabels.topics['RECON-31'],/Валютный форвард/);assert.match(c.QuestionLabels.topics['RECON-13'],/Аккредитив/);assert.match(c.QuestionLabels.topics['RECON-05'],/Мегарегулятор/);assert.match(c.QuestionLabels.topics['EX17-29'],/Процентный своп/);
assert.doesNotMatch(c.QuestionLabels.topics['RECON-24'],/распределительн/i,'Do not answer the pension-model naming question in its title');
assert.doesNotMatch(c.QuestionLabels.topics['EX17-33'],/rho|ро\b/i,'Do not disclose the sensitivity name');
assert.doesNotMatch(c.QuestionLabels.topics['EX17-34'],/бета/i,'Do not disclose the CAPM sensitivity requested by the prompt');
assert.doesNotMatch(c.QuestionLabels.topics['EX17-41'],/ОФЗ-ИН/i,'Do not disclose the bond type requested by the prompt');
assert.match(c.QuestionLabels.scopeNote(227),/227 заданий/);assert.match(c.QuestionLabels.scopeNote(226),/226 заданий/);
const html=read('index.html'),version=html.match(/name="trainer-version" content="([^"]+)"/)[1];assert.ok(html.includes('assets/question-labels.js?v='+version));
assert.ok(html.indexOf('assets/exam-alignment.js?v=')<html.indexOf('assets/question-labels.js?v='));assert.equal((html.match(/course-practice-scope-note/g)||[]).length,2);assert.equal((html.match(/Экзаменационный блок курса:/g)||[]).length,3);
assert.ok(html.includes("aligned.examFull+' / '+aligned.examTotal"),'Existing counter arithmetic remains intact');
console.log('PASS question labels:95 reviewed/47 corrected or specified; only topic/inherited conceptLabel differ; raw content/revisions/corrections preserved; idempotent; overview/course scope notes use actual pool size');
