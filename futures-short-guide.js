
/* v5.0.19: Plain-language comparison. Core question bank is untouched. */
/* v5.0.20: informational notices within the learning course; exam selection unchanged. */
function fscExamScopeNote(lessonId, blockIndex, mode){
 if(mode!=='brief'&&mode!=='full')return '';
 const key=lessonId+'-'+blockIndex;
 // E-13 combines securities REPO and margin trading. Do not mark REPO itself as excluded.
 const marginLesson=lessonId==='E-13';
 const formulaLesson=(typeof STUDY_V5!=='undefined'&&Array.isArray(STUDY_V5[key]?.formulas)&&STUDY_V5[key].formulas.length>0);
 if(!marginLesson&&!formulaLesson)return '';
 const margin=marginLesson
  ? '<p><b>Маржинальная торговля:</b> по информации преподавателя, вопросов из этого раздела на экзамене не будет. Это не означает исключения всех вопросов о РЕПО.</p>' : '';
 const calculations=formulaLesson
  ? '<p><b>Расчётные задания:</b> на экзамене их не будет. Формулы и числовые примеры помогают понять, как работает инструмент.</p>' : '';
 return '<aside class="fsc-exam-note" aria-label="Уточнение преподавателя об экзамене"><strong>К экзамену</strong>'+margin+calculations+'</aside>';
}

function futuresShortCourseMarkup(lessonId, blockIndex, mode='full'){
 const key=lessonId+'-'+blockIndex;
 const notice=fscExamScopeNote(lessonId,blockIndex,mode);
 if(key!=='S2-01-0'&&key!=='S2-02-0')return notice;
 if(mode==='brief'){
  return notice+(key==='S2-01-0'
    ?'<aside class="fsc-brief"><b>Запомнить:</b> шорт акции = заём и продажа акции; шорт фьючерса = продажа контракта без займа акции. Поэтому обычный short futures не требует платы за заём базовой бумаги.</aside>'
    :'<aside class="fsc-brief"><b>Запомнить:</b> ГО — заблокированное обеспечение; вариационная маржа — денежный результат изменения цены; фандинг — отдельный механизм некоторых бессрочных фьючерсов.</aside>');
 }
 if(mode!=='full')return '';
 if(key==='S2-01-0')return notice+[
 '<section class="fsc-wrap" aria-label="Отличие шорта акции от шорта фьючерса">',
 '<header class="fsc-heading"><span class="fsc-kicker">ПОНЯТНО С НУЛЯ</span><h4>Почему шорт фьючерса не требует займа акции?</h4>',
 '<p>Обе позиции позволяют выиграть от падения цены, но продаются совершенно разные вещи.</p></header>',
 '<div class="fsc-grid">',
 '<article class="fsc-panel fsc-stock"><span class="fsc-overline">01 · ШОРТ АКЦИИ</span><h5>Продаём саму акцию</h5><ol>',
 '<li>Занимаем акцию у брокера.</li><li>Продаём её на бирже.</li><li>Затем покупаем обратно и возвращаем взятую бумагу.</li>',
 '</ol><div class="fsc-foot"><b>Расходы</b><p>Обычно плата за заём бумаг и торговые комиссии. Условия определяет брокер.</p></div></article>',
 '<article class="fsc-panel fsc-contract"><span class="fsc-overline">02 · SHORT FUTURES</span><h5>Продаём контракт</h5><ol>',
 '<li>Открываем короткую позицию по фьючерсному контракту.</li>',
 '<li>Предоставляем гарантийное обеспечение; при переоценке возникает вариационная маржа.</li>',
 '<li>Закрываем позицию обратной сделкой либо исполняем контракт по его условиям.</li>',
 '</ol><div class="fsc-foot"><b>Расходы</b><p>Комиссии и возможные дополнительные расходы, <strong>но не аренда базовой акции: её никто не занимал</strong>.</p></div></article>',
 '</div>',
 '<div class="fsc-conclusion"><b>Ключевое различие</b><p>Продать фьючерс ≠ продать взятую взаймы акцию. Фьючерс — производный контракт, а не сама ценная бумага.</p></div>',
 '<details class="fsc-disclosure"><summary>Что изменится при исполнении поставочного фьючерса?</summary><div>',
 '<p><b>Открытие и исполнение — разные этапы.</b> Открывая short futures, акцию не занимаем. При исполнении поставочного контракта продавец должен обеспечить поставку по спецификации. Если бумаги нет, её потребуется получить: например, купить либо при определённых условиях занять у брокера.</p>',
 '<p>У <b>расчётного</b> контракта вместо поставки производится денежный расчёт. Действия брокера и требования до экспирации зависят от условий инструмента.</p>',
 '</div></details>',
 '<p class="fsc-source">Источники: <a target="_blank" rel="noopener noreferrer" href="https://www.moex.com/ru/derivatives">Московская биржа: фьючерс — контракт</a> · <a target="_blank" rel="noopener noreferrer" href="https://www.cmegroup.com/why-trade-futures">CME: для short futures не нужен заём акций</a>.</p>',
 '</section>'
 ].join('');
 return notice+[
 '<section class="fsc-wrap" aria-label="Денежные потоки и исполнение фьючерса">',
 '<header class="fsc-heading"><span class="fsc-kicker">МЕХАНИКА РАСЧЁТОВ</span><h4>Что происходит после открытия шорта?</h4>',
 '<p>Акции занимать не пришлось, но нужно соблюдать требования к обеспечению и расчётам.</p></header>',
 '<div class="fsc-cash-grid">',
 '<article><span class="fsc-num">01</span><h5>Гарантийное обеспечение</h5><p>Средства или допустимые активы резервируются под риск позиции. <b>Это не комиссия.</b></p></article>',
 '<article><span class="fsc-num">02</span><h5>Вариационная маржа</h5><p>При росте цены short futures терпит убыток, при падении получает прибыль. <b>Это не плата за аренду акции.</b></p></article>',
 '<article><span class="fsc-num">03</span><h5>Расходы сделки</h5><p>Комиссии, возможные затраты на финансирование обеспечения, перенос позиции. <b>У стандартного срочного фьючерса нет обязательной ежедневной платы за удержание шорта.</b></p></article>',
 '</div>',
 '<details class="fsc-disclosure"><summary>Только ли у бессрочного фьючерса есть фандинг?</summary><div>',
 '<p><b>Обычный срочный контракт:</b> отдельного периодического фандинга по модели бессрочного фьючерса обычно нет. Финансирование учитывается в экономике цены и базиса.</p>',
 '<p><b>Бессрочный контракт:</b> предусмотренные правилами платежи фандинга могут начисляться или списываться. Short может как платить, так и получать. На Московской бирже фандинг вечных фьючерсов учитывается внутри вариационной маржи.</p>',
 '</div></details>',
 '<details class="fsc-disclosure"><summary>А если держать фьючерс до экспирации?</summary><div>',
 '<p><b>Расчётный:</b> денежный расчёт без передачи акций. <b>Поставочный:</b> продавцу нужно поставить базовые бумаги; если их нет, возможны покупка или заём по правилам брокера. Это не означает, что акции занимались при открытии фьючерса.</p>',
 '<p>Заранее проверьте спецификацию инструмента, условия поставки и регламент брокера.</p>',
 '</div></details>',
 '<div class="fsc-conclusion"><b>Пример</b><p>Продали фьючерс по 100 ₽, его расчётная цена выросла до 110 ₽. У короткой позиции возник убыток 10 ₽ на единицу базового актива. Это <b>переоценка позиции, не арендная плата</b>.</p></div>',
 '<p class="fsc-source">Источники: <a target="_blank" rel="noopener noreferrer" href="https://www.moex.com/ru/derivatives/equity/stocks/">Московская биржа: срочные фьючерсы и расходы</a> · <a target="_blank" rel="noopener noreferrer" href="https://www.moex.com/ru/derivatives/perpetual-futures">Вечные фьючерсы и фандинг</a>.</p>',
 '</section>'
 ].join('');
}
