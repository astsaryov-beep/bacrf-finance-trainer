const QUESTION_FORMULA_GUIDES={"duration":["ΔP/P ≈ −MD × Δy","ΔP/P — относительное изменение цены; MD — модифицированная дюрация в годах; Δy — изменение доходности в долях (0,5 п.п. = 0,005).","Линейная оценка; выпуклость не учтена."],"pe":["P/E = капитализация / чистая прибыль = цена акции / EPS","P/E — число раз; капитализация — рыночная стоимость капитала; чистая прибыль — прибыль за сопоставимый период; EPS — прибыль на акцию.","При отрицательной прибыли интерпретация P/E ограничена."],"div":["DY = дивиденд на акцию / цена акции × 100%","DY — доходность, %; дивиденд — выплата на одну акцию за период; цена — выбранная котировка акции.","Историческая доходность не обещает будущих выплат."],"ev":["EV ≈ капитализация + финансовый долг − деньги","EV — стоимость предприятия; капитализация — стоимость акционерного капитала; долг — процентные обязательства; деньги — доступные денежные средства.","Полный EV может содержать другие корректировки."],"bond":["r = (номинал − цена) / цена × 100% (за один год)","r — простая годовая доходность; номинал — сумма погашения; цена — сегодняшняя цена покупки.","Для бескупонной облигации сроком на один год; комиссии не учтены."],"dirty":["Грязная цена = чистая цена + НКД","НКД — накопленный купонный доход; чистая цена — котировка без НКД; грязная цена — расчётная цена с НКД.","Единицы измерения компонентов должны совпадать."],"option":["Call: max(S − K, 0); Put: max(K − S, 0)","S — цена базового актива; K — страйк (цена исполнения); max(…,0) — положительная часть или ноль.","Чистый результат покупателя дополнительно уменьшается на премию."],"swap":["Результат = (ставка получаемая − ставка уплачиваемая) × номинал × доля года","Ставки — годовые в долях (12% = 0,12); номинал — расчётная сумма; доля года — длительность периода.","Для плавающей ставки важны способ фиксации и график."],"futures":["Long: (Fновая − Fстарая) × Q; Short: (Fстарая − Fновая) × Q","F — расчётная цена фьючерса; Q — число единиц базового актива по позиции.","При росте цены прибыльна длинная позиция, у короткой возникает убыток."],"total":["Доходность = (цена продажи − цена покупки + дивиденды) / цена покупки × 100%","Цены — на одну акцию; дивиденды — полученные выплаты за период.","Упрощённо без комиссий, налогов и реинвестирования."],"eps":["EPS = прибыль обыкновенным акционерам / средневзвешенное число акций","EPS — прибыль на акцию; прибыль — относящаяся к обыкновенным акциям; количество — средневзвешенное число акций.","Разводнённая EPS может дополнительно учитывать потенциальные акции."],"pbv":["P/BV = капитализация / балансовый собственный капитал","P/BV — отношение рыночной к балансовой оценке; капитализация — стоимость акций; BV — собственный капитал по отчётности.","Сравнивать одинаковый периметр и период."],"portfolio":["R = Σ(wᵢ × rᵢ)","R — доходность портфеля; wᵢ — вес i-й позиции, доля от 0 до 1; rᵢ — доходность позиции за одинаковый период; Σ — сумма.","Сумма весов равна 1; нет ребалансировки."],"forward":["F = S₀ × (1 + r × T)","F — цена форварда; S₀ — сегодняшняя цена актива; r — простая годовая ставка в долях; T — доля года.","Для актива без доходов, при простом проценте и без издержек хранения."],"repo":["Зачётная стоимость = стоимость залога × (1 − h)","h — дисконт (haircut), 5% = 0,05; стоимость залога — цена до дисконта.","Дополнительные ограничения и переоценка в реальных сделках."],"gap":["Дефицит = max(платежи − доступные деньги, 0)","Платежи — обязательства к конкретной дате; доступные деньги — ликвидность, которую реально можно использовать.","Не включать будущие поступления после срока платежа."],"factor":["К выдаче = требование × доля финансирования − требование × комиссия","Требование — номинал дебиторской задолженности; доля финансирования — аванс в долях; комиссия — удержание в долях требования.","Условие задачи: комиссия именно от полной суммы требования."],"lease":["Всего = число платежей × сумма одного платежа + выкуп","Число платежей — количество периодов; сумма платежа — регулярный взнос; выкуп — остаточная цена.","Номинальная сумма без дисконтирования."],"nim":["NIM = (процентные доходы − процентные расходы) / средние работающие активы × 100%","NIM — чистая процентная маржа; доходы и расходы — за один период; активы — средняя величина приносящих процентный доход активов.","Использовать сопоставимые периоды и единицы."]};
const QUESTION_FORMULA_IDS={"BM05":"duration","BO03":"duration","V2-021":"duration","V2-032":"duration","EXN-D03":"duration","EM06":"pe","V2-038":"pe","EXN-E02":"pe","EM12":"div","EO01":"div","V2-043":"div","EXN-E01":"div","EM09":"ev","EXN-E04":"ev","BM02":"bond","EXN-D01":"bond","V2-030":"dirty","EXN-D02":"dirty","PM09":"option","PM10":"option","EXN-P02":"option","V2-063":"swap","V2-068":"swap","EXN-P03":"swap","EXN-P04":"futures","V2-050":"total","V2-037":"eps","V2-040":"pbv","EXN-E03":"portfolio","EXN-P01":"forward","EXN-D04":"repo","EXN-R04":"gap","EXN-R02":"factor","EXN-R03":"lease","EXN-R01":"nim"};


(function(){
'use strict';
const originalOpenReview=window.openReview;
const originalOptionsResult=window.optionsResult;
const originalRenderList=window.renderList;
if(typeof originalOpenReview!=='function'||typeof originalOptionsResult!=='function')return;

const EXAM_HEDGE_BRIEFS={
 'V2-069':'Защитный put ограничивает снижение стоимости акций за уплаченную премию и сохраняет выгоду от роста. Короткий фьючерс при росте цены даёт убыток, компенсирующий прирост акций; результат хеджа зависит от базиса, расходов и обеспечения.',
 'V2-070':'Фьючерс ежедневно переоценивается: убыток по короткой позиции может потребовать денег уже сегодня, даже если акции подорожали. Если свободных средств на вариационную маржу не хватает, позицию могут принудительно закрыть до ожидаемого итогового результата.'
};

function guideMarkup(q){
 const info=QUESTION_FORMULA_GUIDES[QUESTION_FORMULA_IDS[q.id]];if(!info)return '';
 return '<details class="qa-variable-guide" open><summary>Расшифровка формулы и обозначений</summary><div class="qa-variable-content"><div class="qa-equation">'+esc(info[0])+'</div><p>'+esc(info[1])+'</p><p class="tiny">'+esc(info[2])+'</p></div></details>';
}
function feedbackShort(message){
 return '<div class="feedback qa-brief"><b>Краткий экзаменационный ответ</b><div>'+esc(message)+'</div></div>';
}
function badge(title){return '<span class="qa-mini-label">'+title+'</span>';}
function scenario(price,delta,put,future,kind){
 return '<article class="qa-scenario qa-scenario-'+kind+'">'+badge(kind==='up'?'РОСТ ЦЕНЫ':'ПАДЕНИЕ ЦЕНЫ')+
 '<h5>'+price+'</h5><div class="qa-scenario-row"><span>Акции + put</span><strong>'+put+'</strong></div>'+
 '<div class="qa-scenario-row"><span>Акции + short futures</span><strong>'+future+'</strong></div>'+
 '<p class="qa-scenario-detail">'+delta+'</p></article>';
}
function lesson069(){
 return '<section class="qa-hedge-lesson" aria-label="Практическое сравнение защитного put и короткого фьючерса">'+
 '<div class="qa-section-head">'+badge('РАЗБОР НА ПРИМЕРЕ')+'<h4>Что произойдёт с акциями?</h4>'+
 '<p>Исходная цена 100 ₽. Put: страйк 100 ₽, премия 5 ₽. Соответствующий фьючерс продан по 100 ₽. Все значения на одну акцию.</p></div>'+
 '<div class="qa-scenario-grid">'+
 scenario('100 → 70 ₽','Фьючерс даёт +30 ₽ и покрывает убыток акций −30 ₽. Выплата put 30 ₽, но премия уже потрачена.','−5 ₽','≈ 0 ₽','down')+
 scenario('100 → 130 ₽','Короткий фьючерс теряет 30 ₽, а акции дорожают на 30 ₽. Put не исполняется; потеряна только премия.','+25 ₽','≈ 0 ₽','up')+
 '</div><p class="qa-example-caption">Условный полный хедж без комиссий, изменения базиса, налогов и расходов на финансирование. Итоги показаны с учётом премии put, но без этих дополнительных затрат.</p>'+
 '<div class="qa-takeaway"><b>Главное различие</b><p>При росте рынка put оставляет владельцу акций прибыль за вычетом премии. Короткий фьючерс эту прибыль компенсирует своим убытком. Для отдельной спекуляции без акций результат короткого фьючерса оценивается самостоятельно.</p></div>'+
 '</section>'+
 '<section class="qa-deeper" aria-label="Дополнительные разборы">'+
 '<h4>Разобраться глубже</h4>'+
 '<details class="qa-learning-detail"><summary><span>1. Как страйк меняет стоимость защиты</span><span class="qa-detail-hint">пример с 90 и 100 ₽</span></summary>'+
 '<div class="qa-learning-body"><p>Покупатель put выбирает цену, ниже которой стоимость акций на дату исполнения защищена. Более высокий страйк обычно требует большей премии при прочих равных. В расчётном результате премия уменьшает нижнюю границу.</p>'+
 '<div class="qa-strike-grid"><div class="qa-strike-card"><strong>Больше защиты</strong><p>Страйк 100 ₽ · премия 5 ₽</p><div>Итоговый минимум <b>95 ₽</b></div><small>Максимальный убыток: 5 ₽</small></div>'+
 '<div class="qa-strike-card"><strong>Дешевле, но риск выше</strong><p>Страйк 90 ₽ · премия 2 ₽</p><div>Итоговый минимум <b>88 ₽</b></div><small>Максимальный убыток: 12 ₽</small></div></div>'+
 '<p class="qa-muted-note">Премии условные. Формула итоговой стоимости на акцию при исполнении: S + max(K − S, 0) − премия. Максимальный убыток относительно первоначальных 100 ₽ равен 100 − K + премия (для K ≤ 100).</p></div></details>'+
 '<details class="qa-learning-detail"><summary><span>2. Почему акция и фьючерс могут разойтись</span><span class="qa-detail-hint">базисный риск</span></summary>'+
 '<div class="qa-learning-body"><p><b>Базис B = F − S</b>: разность фьючерсной и спотовой цены. Он зависит от срока до исполнения, процентных ставок, ожидаемых дивидендов, ликвидности и рыночных условий. Разница не обязательно возникает из-за задержки котировок.</p>'+
 '<div class="qa-math-example"><b>Пример:</b> акции 100 → 90 ₽ (−10 ₽), фьючерс 102 → 93 ₽ (прибыль short +9 ₽). Общий результат <strong>−1 ₽</strong>, потому что базис вырос с 2 до 3 ₽.</div>'+
 '<p class="qa-muted-note">Арбитраж ограничивает расхождения, но не делает каждое изменение цен идентичным. При закрытии хеджа до исполнения остаточный базис может изменить результат.</p></div></details>'+
 '<details class="qa-learning-detail"><summary><span>3. Что стоит денег и где риск ликвидности</span><span class="qa-detail-hint">обычный и вечный фьючерсы</span></summary>'+
 '<div class="qa-learning-body"><ul class="qa-learning-list"><li><b>Обычный срочный фьючерс:</b> нет универсальной ежедневной платы за сам факт короткой позиции, как за заём акций. Возможны комиссии, стоимость обеспечения, влияние ставок и дивидендов на цену, расходы при переносе контракта.</li>'+
 '<li><b>Вечный фьючерс:</b> возможны периодические платежи фандинга. В зависимости от знака ставки короткая позиция может как платить, так и получать деньги.</li>'+
 '<li><b>Вариационная маржа:</b> отрицательные денежные потоки по short возникают при росте расчётной цены. Недостаток свободного обеспечения может привести к принудительному закрытию.</li></ul>'+
 '<p class="qa-muted-note">Принадлежащие инвестору акции не являются автоматически залогом по фьючерсу; правила обеспечения определяются договором с брокером. Подробный пример принудительного закрытия — в вопросе V2-070.</p></div></details>'+
 '<p class="qa-source-note">Дополнительно: <a href="https://www.optionseducation.org/strategies/all-strategies/protective-put-married-put" target="_blank" rel="noopener noreferrer">Options Industry Council о protective put</a> · <a href="https://www.cmegroup.com/education/courses/introduction-to-equity-index-products/what-is-equity-index-basis" target="_blank" rel="noopener noreferrer">CME о базисе</a>.</p>'+
 '</section>';
}
function timelineStep(number,title,summary,detail){
 return '<div class="qa-timeline-step"><span class="qa-timeline-number">'+number+'</span><div><strong>'+title+'</strong><p>'+summary+'</p><small>'+detail+'</small></div></div>';
}
function lesson070(){
 return '<section class="qa-hedge-lesson qa-margin-lesson" aria-label="Маржинальный риск во время фьючерсного хеджа">'+
 '<div class="qa-section-head">'+badge('ДЕНЕЖНЫЕ ПОТОКИ И ХЕДЖ')+'<h4>Почему можно не дождаться хорошего итога</h4>'+
 '<p>Владелец акции по 100 ₽ одновременно продал фьючерс по 102 ₽ на одну акцию. Нужные деньги на счёте и рыночная стоимость акций — разные величины.</p></div>'+
 '<div class="qa-timeline">'+
 timelineStep('01','Открытие','Акция 100 ₽ · short futures 102 ₽','Держим акции, страхуем цену коротким фьючерсом.')+
 timelineStep('02','Временный рост','Акция 120 ₽ · фьючерс 122 ₽','Акция выросла на +20 ₽, но short futures уже создал денежный убыток −20 ₽. Его нужно обеспечить.')+
 timelineStep('03','Нет свободных средств','Брокер закрывает фьючерсную позицию','Точный порядок зависит от брокера и правил торгов. Продажа самих акций не обязательна.')+
 '</div>'+
 '<div class="qa-outcomes"><div><small>Если хедж удалось сохранить до цены 90 ₽</small><b>+2 ₽</b><p>Акции: −10 ₽, short futures: +12 ₽.</p></div><div><small>Если short закрыли при цене 122 ₽</small><b>−30 ₽</b><p>Short: −20 ₽ при закрытии; акции затем −10 ₽.</p></div></div>'+
 '<p class="qa-example-caption">Условный сценарий: в конце цена акции и расчётная цена фьючерса равны 90 ₽. Результаты без комиссий, налогов и финансирования; итог +2 ₽ возникает из изменения базиса. Прибыль по акциям на промежуточном росте не создаёт автоматически свободные деньги для вариационной маржи.</p>'+
 '</section>'+
 '<details class="qa-learning-detail"><summary><span>Что запомнить для экзамена</span><span class="qa-detail-hint">три вида риска</span></summary>'+
 '<div class="qa-learning-body"><ul class="qa-learning-list"><li><b>Рыночный риск:</b> цена фьючерса меняется против позиции.</li><li><b>Риск ликвидности:</b> требуется внести деньги раньше, чем реализован результат по активу.</li><li><b>Базисный риск:</b> акции и фьючерс могут измениться на разные величины.</li></ul>'+
 '<p>Маржин-колл и принудительное закрытие могут прервать хедж и оставить инвестора с непокрытым ценовым риском.</p></div></details>'+
 '<p class="qa-source-note">Дополнительно: <a href="https://www.cmegroup.com/education/courses/introduction-to-futures/mark-to-market" target="_blank" rel="noopener noreferrer">CME о ежедневной переоценке</a> · <a href="https://www.cmegroup.com/education/courses/things-to-know-before-trading-cme-futures/position-and-risk-management" target="_blank" rel="noopener noreferrer">CME о маржин-коллах</a>.</p>';
}
function specialLesson(q){
 if(q.id==='V2-069')return lesson069();
 if(q.id==='V2-070')return lesson070();
 return '';
}
window.openReview=function(q,r,showRubric){
 let result=originalOpenReview(q,r,showRubric);
 const short=q.brief||q.answer||'';
 const expanded=q.explanation||q.answer||'';
 const oldShort='<div class="feedback"><b>Краткий экзаменационный ответ (1–2 предложения)</b><div>'+esc(short)+'</div></div>';
 const oldLong='<div class="feedback"><b>Развёрнутое объяснение</b><div>'+esc(expanded)+'</div></div>';
 if(EXAM_HEDGE_BRIEFS[q.id]){
  result=result.replace(oldShort+oldLong, feedbackShort(EXAM_HEDGE_BRIEFS[q.id])+specialLesson(q));
 }else if(short.trim()===expanded.trim()&&short.trim()){
  result=result.replace(oldShort+oldLong,'<div class="feedback"><b>Образец ответа</b><div>'+esc(short)+'</div></div>');
 }
 const extra=guideMarkup(q);
 return extra?result.replace(sourceText(q),extra+sourceText(q)):result;
};
window.optionsResult=function(q,r){return originalOptionsResult(q,r)+guideMarkup(q)};
if(typeof originalRenderList==='function'){
 window.renderList=function(){
  originalRenderList();
  ['V2-069','V2-070'].forEach(function(id){
   const item=document.getElementById('catalog-'+id);
   const q=BANK_MAP.get(id);
   if(item&&q)item.innerHTML=feedbackShort(EXAM_HEDGE_BRIEFS[id])+specialLesson(q)+sourceText(q);
  });
  Object.keys(QUESTION_FORMULA_IDS).forEach(function(id){
   const target=document.getElementById('catalog-'+id);
   if(target){const q=BANK_MAP.get(id);if(q)target.insertAdjacentHTML('beforeend',guideMarkup(q));}
  });
 };
}
window.questionFormulaMarkup=guideMarkup;
window.peerFeedbackCheck={version:'5.0.18',formulaQuestions:Object.keys(QUESTION_FORMULA_IDS).length,hedgeQuestions:['V2-069','V2-070']};
})();
