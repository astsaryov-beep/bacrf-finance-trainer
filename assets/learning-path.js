/* Course checks follow every prerequisite; base completion and current answer evidence stay distinct. */
(function(root){'use strict';
 const labels={all:'Все навыки',multi:'Пять утверждений',open:'Открытый ответ',list:'Точные перечни',symbols:'Формулы и обозначения',terms:'Термины и роли',composite:'Составные открытые',transfer:'Перенос в новый контекст',connections:'Связи между темами'};
 let bank=[],byId=new Map(),assignments=new Map();
 function configure(route,questions){
  const keys=route.flatMap(l=>l.blocks.map((_,i)=>l.id+'-'+i)),order=new Map(keys.map((key,i)=>[key,i]));
  bank=questions.slice();byId=new Map(bank.map(q=>[q.id,q]));assignments=new Map(keys.map(key=>[key,[]]));
  for(const q of bank){
   if(!q.prerequisiteBlocks?.length||!assignments.has(q.courseBlock)||q.prerequisiteBlocks.some(key=>!order.has(key)||order.get(key)>order.get(q.courseBlock)))throw Error('Invalid learning prerequisite: '+q.id);
   assignments.get(q.courseBlock).push(q.id);
  }
 }
 const ids=key=>(assignments.get(key)||[]).slice();
 function sourceMatches(q,source){return source==='all'||source==='examTopics'&&!!q.provenance||source==='original'&&q.origin==='original'||source==='author'&&q.origin!=='original'||source==='adapted'&&q.provenance==='confirmed_exam_adapted'||source==='reconstructed'&&q.provenance==='reconstructed'||source==='transfer'&&q.provenance==='transfer';}
 const skillMatches=(q,skill)=>skill==='all'||q.learningSkills?.includes(skill);
 function current(q,a){
  if(!a||a.skipped||a.needsReviewRecheck||a.questionRevision!==q.reviewRevision)return false;
  if('tries' in a)return a.tries>0&&a.answered!==false;
  if(!a.checked)return false;
  if(q.type==='open')return !!a.text?.trim()&&Array.isArray(a.rubric)&&new Set(a.rubric).size===a.rubric.length&&a.rubric.every(i=>Number.isInteger(i)&&i>=0&&i<q.rubric.length);
  return Array.isArray(a.selected)&&a.selected.length>0&&new Set(a.selected).size===a.selected.length&&a.selected.every(i=>Number.isInteger(i)&&i>=0&&i<q.options.length);
 }
 function summary(study,progress={},key){
  const questions=key?ids(key).map(id=>byId.get(id)):bank;let assessed=0,full=0,selfAssessed=0,stale=0;
  for(const q of questions){
   const course=study?.blocks?.[q.courseBlock]?.answers?.[q.id],quiz=progress[q.id];
   const evidence=[course,quiz].filter(a=>current(q,a)).sort((a,b)=>(Date.parse(b.reviewedAt||b.when)||0)-(Date.parse(a.reviewedAt||a.when)||0))[0];
   if(!evidence){if(course?.checked||quiz?.tries)stale++;continue;}
   assessed++;if(q.type==='open')selfAssessed++;
   if('tries' in evidence){if(evidence.last===true&&evidence.lastScore===1)full++;}
   else if(q.type==='open'){if(evidence.rubric.length===q.rubric.length)full++;}
   else if(evidence.selected.length===q.correct.length&&q.correct.every(i=>evidence.selected.includes(i)))full++;
  }
  return {total:questions.length,assessed,full,selfAssessed,stale};
 }
 root.CourseLearning={labels,configure,ids,sourceMatches,skillMatches,current,summary};

 function focusStudyQuestion(){requestAnimationFrame(()=>{const el=document.querySelector('.study-task h3')||document.querySelector('.study-paper>h2');if(el){el.tabIndex=-1;el.style.scrollMarginTop='100px';el.focus({preventScroll:true});el.scrollIntoView({block:'start',behavior:'instant'})}});}
 function goAlignedPractice(){
  const list=ids(studyKey(studyNav.lessonId,studyNav.block));if(!list.length)return;
  const first=list.findIndex(id=>{const a=getStudyAnswer(id),q=byId.get(id);return !current(q,a)||a.score!==1});
  studyNav.phase='aligned';studyNav.index=Math.max(0,first);persistStudy();render();focusStudyQuestion();
 }
 function recordAlignedAnswer(q,a){
  if(studyNav.phase!=='aligned')return;
  record(q,a.score,a.confidence??2,false,a);a.due=progress[q.id]?.due;setStudyAnswer(q.id,a);
 }
 function alignedProgressMarkup(key){
  const result=summary(studyData,progress,key);if(!result.total)return '';
  return `<section class="notice aligned-course-progress"><h3>Экзаменационная проверка блока</h3><p>Проверено ${result.assessed} из ${result.total}; полный ответ ${result.full} из ${result.total}. Открытые ответы проверяются самостоятельно по критериям.</p><p>Задания объединяют материал этого и уже доступных предыдущих блоков. Результат этой проверки учитывается отдельно от базового прохождения курса.</p><button class="btn good" type="button" data-course-start>${result.assessed<result.total?'Продолжить экзаменационную проверку':'Повторить экзаменационные задания'}</button></section>`;
 }
 function alignedQuestionTools(q,a){
  const supports=q.prerequisiteBlocks.map(key=>{const cut=key.lastIndexOf('-'),lesson=STUDY_MAP.get(key.slice(0,cut)),index=Number(key.slice(cut+1));return `<button class="btn ghost sm" type="button" data-course-support="${esc(key)}">${esc(lesson.blocks[index].title)}</button>`}).join('');
  return `<div class="confidence"><label for="studyConfidence">Насколько вы уверены?</label><select id="studyConfidence" ${a.checked?'disabled':''}>${[[1,'Сомневаюсь'],[2,'Средне'],[3,'Уверен(а)']].map(([value,label])=>`<option value="${value}" ${(a.confidence??2)===value?'selected':''}>${label}</option>`).join('')}</select></div><details class="question-theory-links"><summary>Повторить нужную теорию</summary><p class="tiny">Черновик сохраняется. Из теории можно вернуться к этой проверке.</p><div class="question-theory-targets">${supports}</div></details>${a.checked?'<button class="btn secondary" type="button" data-course-retry>Ответить заново</button>':''}`;
 }
 function returnContext(){
  const c=studyData.alignedReturn;if(!c||typeof c.lessonId!=='string'||!Number.isInteger(c.block))return null;
  const list=ids(studyKey(c.lessonId,c.block));return list.includes(c.questionId)?c:null;
 }
 function alignedReturnMarkup(){return returnContext()?'<aside class="question-theory-return"><button class="btn secondary" type="button" data-course-return>← Вернуться к проверке курса</button><p class="tiny">Ваш ответ сохранён.</p></aside>':'';}
 function bindAlignedCourse(content){
  content.querySelectorAll('[data-course-start]').forEach(button=>button.onclick=goAlignedPractice);
  content.querySelectorAll('[data-course-support]').forEach(button=>button.onclick=()=>{
   const key=button.dataset.courseSupport,cut=key.lastIndexOf('-'),lessonId=key.slice(0,cut),block=Number(key.slice(cut+1));
   const q=getStudyQ();if(studyNav.phase!=='aligned'||!q?.prerequisiteBlocks.includes(key))return;
   studyData.alignedReturn={lessonId:studyNav.lessonId,block:studyNav.block,questionId:q.id};persistStudy();studyTheoryView='full';goStudyLesson(lessonId,block);
  });
  content.querySelectorAll('[data-course-return]').forEach(button=>button.onclick=()=>{const c=returnContext();if(!c)return;studyNav={lessonId:c.lessonId,block:c.block,phase:'aligned',index:ids(studyKey(c.lessonId,c.block)).indexOf(c.questionId)};delete studyData.alignedReturn;persistStudy();render();focusStudyQuestion();});
  if(studyNav.phase!=='aligned'&&studyNav.phase!=='practice')return;
  content.querySelectorAll('input[name="studyAnswer"]').forEach(input=>input.onchange=()=>{const q=getStudyQ(),a=getStudyAnswer(q.id);if(a.checked)return;a.selected=[...content.querySelectorAll('input[name="studyAnswer"]:checked')].map(x=>Number(x.value));setStudyAnswer(q.id,a)});
  const confidence=document.getElementById('studyConfidence');if(confidence)confidence.onchange=()=>{const q=getStudyQ(),a=getStudyAnswer(q.id);a.confidence=Number(confidence.value);setStudyAnswer(q.id,a)};
  content.querySelector('[data-course-retry]')?.addEventListener('click',()=>{
   const q=getStudyQ(),a=getStudyAnswer(q.id),snapshot={selected:[...(a.selected||[])],text:a.text,rubric:[...(a.rubric||[])],score:a.score,checked:a.checked,skipped:a.skipped,questionRevision:a.questionRevision,reviewedAt:a.reviewedAt};
   setStudyAnswer(q.id,{selected:[],text:'',rubric:[],checked:false,revealed:false,score:null,confidence:a.confidence??2,previousReviewResult:snapshot,reviewHistory:[...(a.reviewHistory||[]),snapshot]});render();focusStudyQuestion();
  });
 }
 Object.assign(root,{goAlignedPractice,recordAlignedAnswer,alignedProgressMarkup,alignedQuestionTools,alignedReturnMarkup,bindAlignedCourse,focusStudyQuestion});
})(globalThis);
