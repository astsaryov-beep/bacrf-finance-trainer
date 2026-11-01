/* Reproducible theoretical mock model; no claim of official grading or future-paper prediction. */
(function(root){'use strict';
 const id='theory-exam-50-v1',revision='2026-11-01';
 const quotas={reg:{multi:4,open:3},debt:{multi:5,open:5},equity:{multi:8,open:8},deriv:{multi:8,open:9}};
 const originalKnowledge=new Set([2,3,6,7,10,13,17,19,20,22,25,27,28,31,33,38,39,41,42,45,46,48]);
 const reconstructedKnowledge=new Set(['RECON-03','RECON-05','RECON-07','RECON-08','RECON-08-PROTECT','RECON-10','RECON-11','RECON-13','RECON-15','RECON-21','RECON-24','RECON-25','RECON-27','RECON-31']);
 const transferKnowledge=new Set(['TRANSFER-WATERFALL-01','TRANSFER-FUNDING-01','TRANSFER-IPO-01','TRANSFER-GUARANTEE-01']);
 const practiceOnly=new Set(['RECON-28','TRANSFER-INDEX-01','TRANSFER-COLLATERAL-01']);
 const complexIds=new Set(['EX17-30','EX17-32','EX17-43','EX17-44','EX17-47']);
 function metadata(q){return {sourceGroup:/^(Лекции|Кредитная система)/.test(q.source||'')?'lecture':'seminar',taskKind:q.provenance==='confirmed_exam_adapted'?(originalKnowledge.has(q.original_exam_number)?'knowledge':'case'):(reconstructedKnowledge.has(q.id)||transferKnowledge.has(q.id)?'knowledge':'case'),examEligible:q.requiresCalculation===false&&!practiceOnly.has(q.id),complex:complexIds.has(q.id),family:q.assessmentFamily||q.conceptFamily||q.id};}
 function random(seed){let n=seed>>>0;return ()=>{n+=0x6D2B79F5;let t=Math.imul(n^(n>>>15),1|n);t^=t+Math.imul(t^(t>>>7),61|t);return ((t^(t>>>14))>>>0)/4294967296};}
 function shuffle(items,rng){const a=items.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
 function choose(pool,seed){
  const allowed=new Set((root.ExamAlignment?.questions||[]).map(q=>q.id));
  const candidates=pool.filter(q=>allowed.has(q.id)&&metadata(q).examEligible&&!q.numeric&&(q.type==='open'&&q.rubric?.length>0||q.type==='multi'&&q.options?.length===5&&q.correct?.length>=1&&q.correct.length<=4));
  const rng=random(seed),cells=[];
  for(const [section,formats]of Object.entries(quotas))for(const [type,count]of Object.entries(formats)){
   const lecture=section==='reg'?count:section==='debt'&&type==='open'?1:0;
   for(const [sourceGroup,n]of [['lecture',lecture],['seminar',count-lecture]])if(n){
    const items=candidates.filter(q=>q.section===section&&q.type===type&&metadata(q).sourceGroup===sourceGroup);
    if(items.length<n)return {error:'Для этого профиля не хватает подходящих вопросов. Выберите все источники и разрешите дополнительные задания; требуется 25 вопросов с пятью вариантами и 25 открытых с сохранением состава разделов.'};
    cells.push({section,type,sourceGroup,n,items});
   }
  }
  // Joint constraints avoid replacing missing formats with easier single-choice or numeric tasks.
  for(let attempt=0;attempt<1000;attempt++){
   const selected=shuffle(candidates.filter(q=>metadata(q).complex),rng).slice(0,3),families=new Set(selected.map(q=>metadata(q).family));
   if(selected.length<3)break;
   for(const cell of cells){
    const occupied=selected.filter(q=>q.section===cell.section&&q.type===cell.type&&metadata(q).sourceGroup===cell.sourceGroup).length,needed=cell.n-occupied;
    if(needed<0)break;if(!needed)continue;
    const ranked=shuffle(cell.items.filter(q=>!selected.some(v=>v.id===q.id)),rng);
    const preferred=[...ranked.filter(q=>!families.has(metadata(q).family)),...ranked.filter(q=>families.has(metadata(q).family))];
    if(preferred.length<needed)break;
    let filled=0;for(const q of preferred){if(families.has(metadata(q).family))continue;selected.push(q);families.add(metadata(q).family);if(++filled===needed)break;}if(filled<needed)break;
   }
   if(selected.length!==50||selected.filter(q=>metadata(q).complex).length<3||selected.filter(q=>q.type==='multi'&&metadata(q).taskKind==='knowledge').length!==11||selected.filter(q=>q.type==='open'&&metadata(q).taskKind==='knowledge').length!==11)continue;
   const items=shuffle(selected,rng),orders=Object.fromEntries(items.filter(q=>q.type==='multi').map(q=>[q.id,shuffle(q.options.map((_,i)=>i),rng)]));
   return {items,orders,profile:{id,revision,seed:seed>>>0,setId:'FM-'+(seed>>>0).toString(16).padStart(8,'0'),questionRevisions:Object.fromEntries(items.map(q=>[q.id,q.reviewRevision||revision]))}};
  }
  return {error:'Выбранный набор не позволяет собрать сбалансированный экзамен. Снимите ограничения по источникам и попробуйте снова.'};
 }
 function summary(session,bank){
  const map=typeof bank.get==='function'?bank:new Map(bank.map(q=>[q.id,q]));let verified=0,selfFull=0,selfAssessed=0,unverified=0,stale=0,diagnostic=0;
  const statuses={};
  for(const qid of session.ids){
   const q=map.get(qid),r=session.responses?.[qid]||{},g=session.grades?.[qid];if(!q)continue;
   if(session.examProfile?.questionRevisions?.[qid]!==q.reviewRevision){stale++;if(q.type==='open')unverified++;statuses[qid]='unverified';continue;}
   if(q.type==='multi'){
    const choice=Array.isArray(r.choice)?r.choice:[],valid=choice.every(v=>Number.isInteger(v)&&v>=0&&v<q.options.length)&&new Set(choice).size===choice.length;
    const full=valid&&choice.length===q.correct.length&&q.correct.every(v=>choice.includes(v));
    // Recompute closed answers from saved choices, rather than trusting imported grades.
    if(full)verified++;
    const tp=valid?choice.filter(v=>q.correct.includes(v)).length:0,fp=valid?choice.length-tp:0;
    diagnostic+=Math.max(0,(tp-fp)/q.correct.length);statuses[qid]='verified';
   }else{
    const selected=Array.isArray(r.rubric)?r.rubric:[],valid=selected.every(v=>Number.isInteger(v)&&v>=0&&v<q.rubric.length)&&new Set(selected).size===selected.length;
    const assessed=!!r.text?.trim()&&r.checked===true&&g?.type==='rubric'&&valid&&g.points===selected.length&&g.total===q.rubric.length&&!r.needsReviewRecheck;
    if(assessed){selfAssessed++;diagnostic+=selected.length/q.rubric.length;if(selected.length===q.rubric.length)selfFull++;statuses[qid]='self_assessed';}
    else{unverified++;statuses[qid]='unverified';}
   }
  }
  return {verified,selfFull,selfAssessed,unverified,stale,strict:verified+selfFull,total:session.ids.length,threshold:25,thresholdMet:verified+selfFull>=25,diagnostic:session.ids.length?diagnostic/session.ids.length:0,statuses};
 }
 root.ExamProfile={id,revision,quotas,metadata,choose,summary};
})(globalThis);
