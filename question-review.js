/* Editorial corrections and concept evidence. Raw question snapshots stay intact. */
(function(root){
 'use strict';
 const revision='2026-10-26';
 const corrections={
  Q07:{"rubric": ["Указана возможная экстраординарная поддержка сильного холдинга", "Объяснено, почему доступная поддержка способна повысить итоговый рейтинг относительно самостоятельной оценки", "Объяснён обратный случай с примером негативного влияния группы: изъятие ликвидности, слабый собственник или ограничения поддержки"], "brief": "Итоговый рейтинг может быть выше самостоятельной оценки благодаря вероятной и доступной экстраординарной поддержке сильной группы. Обратный случай: собственник изымает ликвидность дочерней компании, снижая её способность платить по долгу; конкретный эффект задаёт методика агентства.", "reviewNote": "Преподавательский вопрос требует обе части: причину повышения и объяснение обратной ситуации. Одной общей оговорки об условности поддержки недостаточно. Обычные поступления, уже учтённые в собственных показателях, повторно как экстраординарную помощь не прибавляют.", "revision": "2026-10-26-teacher-3", "reviewKind": "rubric", "answer": "Итоговый рейтинг может быть выше самостоятельной оценки благодаря вероятной и доступной экстраординарной поддержке сильной группы. Обратный случай: собственник изымает ликвидность дочерней компании, снижая её способность платить по долгу; конкретный эффект задаёт методика агентства."},
  Q14:{"rubric": ["Названа субординация траншей как механизм кредитного усиления", "Объяснено, что младшие транши поглощают потери раньше старшего и тем самым повышают его защищённость"], "reviewNote": "Преподавательский эталон (S3, вопрос16) требует фактор и механизм. Дополнительные виды усиления и ограничения полезны для изучения; отдельное обязательное перечисление всех оговорок условием не установлено.", "revision": "2026-10-26-teacher-2", "reviewKind": "rubric"},
  Q16:{"rubric": ["Объяснено, что при снижении ставок эмитент может использовать право call для более дешёвого рефинансирования", "Указано получение держателем предусмотренной цены выкупа и причитающихся выплат", "Объяснено прекращение будущего высокого купона и риск размещения возвращённых денег под меньшую доходность"], "reviewNote": "Чек-лист охватывает обе части вопроса: что держатель получит и что потеряет. Дата, цена и состав выплаты при call определяются документами; снижение ставки создаёт стимул, но не обязывает эмитента использовать право.", "revision": "2026-10-26-teacher-2", "reviewKind": "rubric"},

  RO08:{brief:"Повышение ставки может удорожить новые и плавающие кредиты и уменьшить спрос компаний; изменение стоимости ресурсов и риска влияет на предложение кредитов банками.",explanation:"Для ответа различают спрос на кредит со стороны компаний и предложение со стороны банков. Рост процентных расходов может уменьшить спрос, а изменение цены фондирования и риска — изменить доступность, лимиты и иные условия предложения. Конкретная реакция зависит от договора и рынка."},
  Q13:{"answer":"Для оценки используют рейтинг эмитента, Net Debt/EBITDA как показатель долговой нагрузки, Interest Coverage Ratio как покрытие процентных платежей прибылью и G-spread как наблюдаемую премию доходности к сопоставимому государственному ориентиру.","brief":"Рейтинг — оценка кредитоспособности; Net Debt/EBITDA — долговая нагрузка; Interest Coverage Ratio — покрытие процентов; G-spread — премия доходности к сопоставимому госориентиру.","explanation":"Это состав ответа из преподавательского разбора теста, вопрос 10 наS3PDF4. Чистый долг обычно получают вычитанием допустимых денежных средств из финансового долга; его деление на сопоставимую EBITDA характеризует нагрузку. ICR сопоставляет выбранный показатель прибыли с процентными расходами; в условиях нужно назвать EBIT или EBITDA. Низкая нагрузка и большое покрытие при прочих равных благоприятны, но коэффициенты не заменяют анализ денежного потока. G-spread содержит также влияние ликвидности и условий бумаги; Z-spread/OAS/ASW полезны в углублении, но не заменяют четыре элемента эталона.","rubric":["Рейтинг назван оценкой кредитоспособности эмитента","Объяснено, что Net Debt/EBITDA характеризует долговую нагрузку","Объяснено, что Interest Coverage Ratio характеризует покрытие процентных платежей прибылью","G-spread связан с сопоставимой государственной доходностью и премией за принимаемые риски"],"reviewNote":"Ответ и редакционный чек-лист согласованы с эталоном преподавателя (S3, вопрос 10). Чек-лист служит самооценке; полный балльный порог этого перечислительного вопроса на слайде не указан.","revision":"2026-10-26-teacher-1","reviewKind":"rubric"},
  Q10:{"rubric":["Объяснено, что конструкция не является безусловно безрисковой","Названа и объяснена хотя бы одна причина возможного убытка: фондирование, базис, маржа/залог, ликвидность, поставка либо кредитный риск"],"reviewNote":"Условие допускает одну или несколько причин. Для полной учебной самооценки достаточно объяснить одну релевантную причину после верного вывода; обязательного одновременного перечисления двух разных рисков нет.","revision":"2026-10-26-teacher-1","reviewKind":"rubric"},
  Q12:{"answer":"Классическая конструкция включает покупку облигации, финансирование через РЕПО, продажу связанного фьючерса, carry как разность дохода облигации и стоимости фондирования и изменение/схождение базиса при условиях модели.","brief":"Покупка облигации, РЕПО-фондирование, короткий фьючерс, carry и схождение базиса. В преподавательском разборе для этого вопроса указано: назвать не менее трёх элементов.","rubric":["Названы не менее трёх разных элементов: облигация, РЕПО, короткий фьючерс, carry, схождение базиса","Элементы относятся к данной конструкции и не содержат утверждения о гарантированном отсутствии риска"],"reviewNote":"Для вопроса 11 в преподавательском разборе указан зачёт за не менее 3 из 5 элементов. Редакционный чек-лист сохраняет этот порог; развёрнутый разбор объясняет всю конструкцию.","revision":"2026-10-26-teacher-1","reviewKind":"rubric"},
  Q18:{"reviewNote":"В преподавательском разборе S3, вопрос 5, отмечен также вариантD. Здесь сохранено различие Банка России: накопленный RUONIA Index и срочная версия RUONIA на 1/3/6 месяцев — разные продукты. Поэтому D не включён в корректный ключ.","sources":["https://www.cbr.ru/hd_base/ruonia/sv_ruonia/"]},

  EM02:{correct:[0],explanation:'IPO — первое публичное предложение акций компании. Оно может включать новые акции и/или акции прежних владельцев. Поэтому исключительное размещение новых акций не является определением IPO. Ключ исправлен 26.10.2026; прежняя оценка этого вопроса могла отличаться.',brief:'Первое публичное предложение акций компании инвесторам.',reviewNote:'Исправлен ошибочный ключ; тексты исходных вариантов сохранены.',revision,sources:['https://ipoguide.moex.com/6/index.html','https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-17']},
  'EXS-E02':{question:'Для расчёта EPS средневзвешенное число акций за период выросло на 20%, а соответствующая прибыль не изменилась. Какой эффект на EPS следует ожидать без других изменений?',reviewNote:'Уточнена база числа акций: средневзвешенная за сопоставимый период.'},
  'EXN-E03':{question:'Начальные доли двух акций в портфеле — 30% и 70%. Их доходности за один период равны 10% и −2%. Какова доходность портфеля в процентах без пополнений, изъятий, ребалансировки и комиссий? Введите число.'},
  'S3-001':{explanation:'Общее руководство в обычной корпоративной конструкции осуществляет совет директоров. Общее собрание и исполнительные органы имеют собственную компетенцию; для конкретного общества учитывают применимые правила.'},
  'S3-002':{explanation:'Free-float в условном примере равен 40/100 = 40%. Количество свободно обращающихся акций сопоставляют с общим количеством соответствующего типа; реальный коэффициент определяется методикой.'},
  'S3-003':{explanation:'Листинг связан с допуском бумаги к торгам по правилам площадки. Он не создаёт гарантии доходности и не является погашением или автоматической выплатой дивиденда.'},
  'S3-004':{explanation:'Если существующие акции продаёт действующий акционер, деньги получает он. Когда размещаются новые акции, средства получает эмитент. Название публичного предложения не заменяет проверки его структуры.'},
  'S3-005':{explanation:'В данных условия 12% > 5%, поэтому выполнено r>g. Это необходимая предпосылка стандартной бесконечной модели Гордона; она сама по себе не доказывает точности прогноза дивидендов.'},
  'S3-006':{explanation:'Терминальная стоимость на конец второго года относится к будущей дате. Для включения в сегодняшнюю оценку её делят на (1+r)², согласовав период ставки.'},
  'S3-007':{explanation:'Веса такого индекса используют капитализацию с поправкой на free-float и предусмотренные ограничения. Одной цены акции или числа её владельцев для определения веса недостаточно.'},
  'S3-009':{explanation:'Корреляция лежит в диапазоне от −1 до +1. Из предложенных значений допустимо −0,5; остальные выходят за пределы диапазона.'},
  'S3-010':{explanation:'При равной ожидаемой доходности и прочих равных меньший риск предпочтительнее по критерию средняя доходность–дисперсия. Это сравнение не учитывает неуказанные ограничения или другие характеристики.'},
  'S3-011':{explanation:'В CAPM при β=0 произведение беты на рыночную премию равно нулю, поэтому модельная требуемая доходность равна безрисковой ставке. Это не утверждение, что все риски актива отсутствуют.'},
  'S3-012':{explanation:'В знаменателе Сортино учитываются неблагоприятные отклонения ниже заданного порога. Шарп использует общую волатильность, поэтому это разные способы нормировки доходности на риск.'},
  'S3-013':{explanation:'В классическом описании восходящий тренд характеризуется последовательностью растущих максимумов и минимумов. Такое описание истории не гарантирует продолжения тенденции.'},
  'S3-014':{explanation:'Подтверждающие индикаторы используются для дополнительной проверки гипотезы о тренде. Их согласие не отменяет риск и не делает прогноз безошибочным.'},
  'S3-015':{explanation:'При позиции вдвое больше собственных средств падение позиции на 10% даёт потерю около 20% собственного капитала, если долг и прочие условия не меняются. Расходы и принудительное закрытие здесь исключены условием.'},
  'S3-016':{explanation:'В оговорённой упрощённой формуле НПР2 = S − Mx = 90 − 50 = 40. Для практического применения нужны все слагаемые и актуальные правила, а не только этот учебный пример.'}
 };
 const idFamilies={
  Q03:'reg-oversight',RM01:'reg-market',RM02:'reg-market',RM04:'reg-market',RM10:'reg-oversight',RM21:'reg-project',RO07:'reg-oversight',BM22:'debt-pricing',BM24:'debt-credit-spread',PM23:'deriv-margin','V2-002':'deriv-structured','V2-010':'reg-capital','V2-011':'reg-capital','V2-012':'FACTOR-01','V2-065':'deriv-swap',
  'EXM-R01':'reg-capital','EXM-R02':'reg-market-infra','EXM-R03':'reg-project','EXM-R04':'FACTOR-01','EXM-D01':'debt-pricing','EXM-D02':'debt-duration','EXM-D03':'debt-repo','EXM-D04':'debt-securitization','EXM-E01':'equity-issuance','EXM-E02':'equity-dividends','EXM-E03':'equity-pe','EXM-E04':'equity-risk','EXM-P01':'deriv-fx-hedge','EXM-P02':'deriv-margin','EXM-P03':'deriv-options','EXM-P04':'deriv-swap',
  'EXS-R01':'FACTOR-01','EXS-R02':'LEASE-01','EXS-D01':'debt-credit-spread','EXS-D02':'debt-duration','EXS-E01':'equity-funds','EXS-E02':'equity-issuance','EXS-P01':'deriv-fx-hedge','EXS-P02':'deriv-margin',
  'EXN-R01':'reg-capital','EXN-R02':'FACTOR-01','EXN-R03':'LEASE-01','EXN-R04':'reg-credit-lines','EXN-D01':'debt-pricing','EXN-D02':'debt-dirty','EXN-D03':'debt-duration','EXN-D04':'debt-repo','EXN-E01':'equity-dividends','EXN-E02':'equity-pe','EXN-E03':'equity-risk','EXN-E04':'equity-pe','EXN-P01':'deriv-carry','EXN-P02':'deriv-options','EXN-P03':'deriv-swap','EXN-P04':'deriv-margin'
 };
 function question(q){const patch=corrections[q.id]||{},family=idFamilies[q.id]||q.conceptFamily;return {...q,...patch,conceptFamily:family||q.lesson||q.lessonId||q.id};}
 function currentEvidence(q,p){return !!p&&p.tries>0&&!p.needsReviewRecheck&&(!corrections[q.id]?.revision||p.reviewRevision===corrections[q.id].revision);}
 function diagnostics(bank,evidence){
  const groups=new Map();
  for(const q of bank){const family=q.conceptFamily;if(!family)continue;let g=groups.get(family);if(!g){g={family,label:q.conceptLabel||q.topic||family,questions:[],seen:[],wrong:[],needsRecheck:[]};groups.set(family,g);}g.questions.push(q);
   const latest=evidence[q.id],p=latest?.answered===false?latest.lastAnsweredEvidence:latest;
   if(!p?.tries)continue;if(!currentEvidence(q,p)){g.needsRecheck.push(q);continue;}g.seen.push({q,p});if(p.last===false||p.lastScore<1)g.wrong.push({q,p});
  }
  return [...groups.values()].map(g=>{
   const lastFailure=Math.max(0,...g.seen.map(x=>Date.parse(x.p.lastWrongAt)||0),...g.wrong.map(x=>Date.parse(x.p.when)||0));
   const verified=g.seen.filter(x=>x.p.last===true&&x.p.lastScore>=1&&(Date.parse(x.p.when)||0)>lastFailure);
   const mastered=verified.length>=2&&g.wrong.length===0&&g.needsRecheck.length===0;
   const status=g.needsRecheck.length?'recheck':g.wrong.length?'weak':mastered?'confirmed':g.seen.length?'learning':'new';
   return {...g,verifiedIds:verified.map(x=>x.q.id),status,mastered,priority:g.needsRecheck.length*5+g.wrong.length*4+(g.seen.length&&!mastered?1:0)};
  }).filter(g=>g.seen.length||g.needsRecheck.length).sort((a,b)=>b.priority-a.priority||a.label.localeCompare(b.label,'ru'));
 }
 function alternative(group,evidence,exclude=[]){
  const rejected=new Set(exclude);const wrong=new Set(group.wrong.map(x=>x.q.id));
  const eligible=group.questions.filter(q=>!rejected.has(q.id));const preferred=eligible.filter(q=>!wrong.has(q.id));
  return (preferred.length?preferred:eligible).sort((a,b)=>{
   const pa=evidence[a.id],pb=evidence[b.id];return Number(!!pa?.tries)-Number(!!pb?.tries)||(pa?.tries||0)-(pb?.tries||0)||(Date.parse(pa?.when)||0)-(Date.parse(pb?.when)||0)||a.id.localeCompare(b.id);
  })[0]||null;
 }
 function migrateSession(value){
  if(!value?.responses)return value;
  if(value.version===3)value.version=2;
  for(const [id,patch] of Object.entries(corrections)){
   const response=value.responses[id],grade=value.grades?.[id];
   if(!patch.revision||!response)continue;
   if(patch.reviewKind==='rubric'){
    if(response.reviewRevision===patch.revision)continue;
    if(grade||response.rubric?.length){
     value.reviewHistory=value.reviewHistory||{};
     value.reviewHistory[id]={grade:grade?{...grade}:null,response:{...response,rubric:[...(response.rubric||[])]},revision:patch.revision};
     if(value.grades)delete value.grades[id];
     response.rubric=[];response.checked=false;response.needsReviewRecheck=true;
    }
    response.reviewRevision=patch.revision;continue;
   }
   if(!grade||!Array.isArray(patch.correct)||!Array.isArray(response.choice))continue;
   if(grade.reviewRevision===patch.revision)continue;
   const selected=response.choice,strict=patch.correct.length===selected.length&&patch.correct.every(i=>selected.includes(i));
   value.grades[id]={...grade,previousReviewGrade:{score:grade.score,strict:grade.strict},score:strict?1:0,strict,reviewRevision:patch.revision};
  }return value;
 }
 function migrateCourseAnswer(q,a){
  const patch=corrections[q?.id];if(!a||patch?.reviewKind!=='rubric'||a.reviewRevision===patch.revision)return a;
  if(a.checked||a.rubric?.length){
   a.previousReviewResult={text:a.text,score:a.score,checked:a.checked,rubric:[...(a.rubric||[])],reviewedAt:a.reviewedAt};
   a.rubric=[];a.checked=false;a.revealed=false;a.score=null;a.needsReviewRecheck=true;
  }
  a.reviewRevision=patch.revision;return a;
 }
 const revisedIndependentIds=Array.from({length:8},(_,i)=>'FRI-O-'+String(i+10).padStart(2,'0')+'-0');
 function migrateIndependent(value){
  for(const id of revisedIndependentIds){
   const a=value?.answers?.[id];if(!a||a.reviewRevision===revision)continue;
   a.previousReviewResult={correct:a.correct,draft:a.draft,updatedAt:a.updatedAt};
   a.correct=false;a.draft='';a.needsReviewRecheck=true;a.reviewRevision=revision;
  }return value;
 }
 root.FinanceReview={revision,corrections,question,diagnostics,alternative,currentEvidence,migrateSession,migrateCourseAnswer,migrateIndependent,revisedIndependentIds};
})(globalThis);
