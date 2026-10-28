/* T24: a reading detour preserves the quiz and uses explicit theory targets. */
(function(root){'use strict';
 const storageKey='bacrf_question_theory_return_v1';let memory=null;
 const examActive=()=>session?.mode==='exam'&&!session.done;
 function save(value){memory=value;try{if(value)sessionStorage.setItem(storageKey,JSON.stringify(value));else sessionStorage.removeItem(storageKey)}catch(e){}}
 function context(){
  let value=memory;try{if(!value)value=JSON.parse(sessionStorage.getItem(storageKey))}catch(e){}
  if(!value||!session||value.started!==session.started||!session.ids.includes(value.id)||!BANK_MAP.has(value.id)||examActive())return null;
  return value;
 }
 function blocks(q){return TheoryLinks.get(q.id).map((key,i)=>{
  const cut=key.lastIndexOf('-'),id=key.slice(0,cut),index=Number(key.slice(cut+1)),l=STUDY_MAP.get(id);
  return l?.blocks[index]?{id,index,key,title:l.title,blockTitle:l.blocks[index].title,anchor:i===0?TheoryLinks.anchor(q.id):''}:null;
 }).filter(Boolean)}
 function markup(q,force=false){
  if(examActive()||(!force&&tab==='quiz'&&session&&!session.done&&session.mode==='practice'))return '';
  const links=blocks(q);if(!links.length)return '';
  return `<details class="fri-followup question-theory-links" data-theory-for="${esc(q.id)}"><summary>Теория по вопросу <span class="tiny">· блоков: ${links.length}</span></summary><p class="tiny">Откройте нужный разбор. При переходе из тренировки ответ сохранится, к упражнению можно будет вернуться.</p><div class="question-theory-targets">${links.map(l=>`<button type="button" class="btn ghost sm" data-fri-open-lesson="${esc(l.id)}" data-fri-open-block="${l.index}" data-question-theory="${esc(q.id)}" data-theory-anchor="${esc(l.anchor)}"><b>${esc(l.blockTitle)}</b><span class="tiny">${esc(l.title)} · блок ${l.index+1}</span></button>`).join('')}</div></details>`;
 }
 function open(button){
  if(examActive()){notify('Сначала завершите экзаменационную попытку.');return}
  const id=button.dataset.friOpenLesson,index=Number(button.dataset.friOpenBlock),l=STUDY_MAP.get(id);
  if(!l||!Number.isInteger(index)||index<0||!l.blocks[index]){notify('Учебный блок не найден.');return}
  const qid=button.dataset.questionTheory;
  if(tab==='quiz'&&session&&session.ids.includes(qid)){
   if(!session.done)captureCurrent();persist();save({started:session.started,id:qid,active:true});
  }else save(null);
  studyTheoryView='full';studyNav={lessonId:id,block:index,phase:'theory',index:0};persistStudy();tab='learn';render();
  const anchor=button.dataset.theoryAnchor;
  requestAnimationFrame(()=>{
   const el=anchor?document.getElementById(anchor):document.querySelector('.study-paper>h2');
   if(el){el.tabIndex=-1;el.style.scrollMarginTop='100px';el.focus({preventScroll:true});el.scrollIntoView({block:'start',behavior:'instant'})}
  });
 }
 function returnMarkup(){
  const c=context();if(!c)return '';
  const q=BANK_MAP.get(c.id);
  return `<aside class="question-theory-return"><button type="button" class="btn secondary" data-theory-return>← Вернуться к упражнению</button><p class="tiny">${esc(c.id)} · ${esc(q.question)}</p><span class="tiny">Ответ и результаты попытки сохранены.</span></aside>`;
 }
 function returnToQuestion(){
  const c=context();if(!c){save(null);notify('Исходная попытка уже заменена или очищена.');return}
  session.pos=session.ids.indexOf(c.id);session.reviewMode=false;save(null);persist();tab='quiz';render();
  if(session.done)requestAnimationFrame(()=>{
   const card=document.querySelector('[data-result-question="'+CSS.escape(c.id)+'"]');
   if(card){card.open=true;card.style.scrollMarginTop='100px';const title=card.querySelector('summary');title.focus({preventScroll:true});card.scrollIntoView({block:'start',behavior:'instant'})}
  });
 }
 function syncView(){const c=context();if(c&&c.active!==(tab==='learn'))save({...c,active:tab==='learn'})}
 function resume(){const c=context();if(c?.active&&STUDY_MAP.has(studyNav.lessonId)){tab='learn';studyNav.phase='theory';studyTheoryView='full'}}
 function supplement(id,index){
  if(id!=='R-04'||index!==0)return '';
  return `<section id="theory-nim" class="v5-level question-theory-supplement"><div class="v5-smallcap">ПОЯСНЕНИЕ К РАСЧЁТНОЙ ТРЕНИРОВКЕ</div><h3>Чистый процентный доход и процентная маржа</h3><p>Банк получает проценты по кредитам и размещениям и платит проценты по привлечённым средствам. Их разность за выбранный период — чистый процентный доход. Чтобы соотнести его с масштабом процентного бизнеса, используют чистую процентную маржу (NIM).</p><details class="v5-formula" open><summary>Как рассчитать NIM</summary><div class="v5-formula-body"><p class="v5-expression">NIM = (I − E) / Ā × 100%</p><ul><li><b>I</b> — процентные доходы за период, в рублях.</li><li><b>E</b> — процентные расходы за тот же период, в рублях.</li><li><b>Ā</b> — средний объём активов, приносящих процентный доход, за этот период, в рублях; значение должно быть положительным.</li><li><b>NIM</b> — процентный результат относительно базы активов, в процентах за выбранный период.</li></ul><p><b>Пример.</b> За год доходы составили 10,8 млн ₽, расходы — 7,2 млн ₽, средние работающие активы — 90 млн ₽. Чистый процентный доход: 10,8 − 7,2 = 3,6 млн ₽. Маржа: 3,6 / 90 × 100% = 4% за год.</p><p><b>Условия.</b> Доходы, расходы и средние активы относятся к одному периоду; денежные единицы одинаковы. При сравнении квартального и годового показателей нужно учитывать приведение к годовому выражению. В тренировочном расчёте используйте период, явно заданный условием.</p><p><b>Граница вывода.</b> Показатель описывает процентный результат. Для оценки общей прибыли отдельно учитывают комиссии, операционные затраты, резервы и налоги; для устойчивости — капитал и ликвидность.</p></div></details><p class="tiny">Редакционное пояснение для существующей расчётной практики. <a href="https://www.fdic.gov/analysis/quarterly-banking-profile/fdic-quarterly/2021-vol15-2/fdic-v15n2-1q2021.pdf" target="_blank" rel="noopener noreferrer">Определение NIM: FDIC Quarterly, 2021, № 2</a>. Расчётные вопросы остаются вне профиля пробного экзамена.</p></section>`;
 }
 root.FinanceTheoryUI={blocks,markup,open,returnMarkup,returnToQuestion,syncView,resume,supplement};
})(globalThis);
