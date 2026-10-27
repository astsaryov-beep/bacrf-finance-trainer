/* T-09 · standalone additive study module, no changes to exam/progress storage. */
const FRI_STRATEGY_CASES=[
{id:'steepener',name:'Steepener',title:'Увеличение наклона кривой (Steepener)',source:'Семинар 1, слайды 154–158',kind:'curve',
intro:'Представьте две облигации: одна погашается через два года, другая через десять. Вы ожидаете, что разница их доходностей увеличится. Для этого покупают короткую облигацию и продают длинную, подобрав объёмы так, чтобы их чувствительности DV01 были равны.',
mechanism:'Цена облигации обычно растёт при снижении её доходности. Здесь доходность 2Y падает на 52 б.п.: длинная позиция выигрывает. Доходность 10Y растёт на 18 б.п.: короткая позиция тоже выигрывает. Положительный результат обеспечивает увеличение разницы y(10Y) − y(2Y).',
advanced:'Равный по модулю DV01 приблизительно компенсирует небольшой параллельный сдвиг доходностей. Это локальная чувствительность первого порядка, которая не устраняет риск изменения кривизны, выпуклости, ликвидности, базиса и финансирования.',
example:'2Y: 14,62% → 14,10%; 10Y: 16,18% → 16,36%. Спред увеличился со 156 до 226 б.п. При DV01 100 000 ₽/б.п. на каждую ногу Long 2Y даёт +5,2 млн ₽, Short 10Y даёт +1,8 млн ₽. Всего ≈ +7,0 млн ₽ до издержек.',
math:['Спред 2s10s = y(10Y) − y(2Y).','P&L(Long) ≈ −DV01 × Δy; P&L(Short) ≈ +DV01 × Δy.','ΔСпред = (16,36 − 14,10) − (16,18 − 14,62) = +0,70 п.п. = +70 б.п.','P&L ≈ 100 000 ₽/б.п. × 70 б.п. = +7 000 000 ₽.'],
risks:'Не является гарантированным арбитражем. При падении спреда стратегия несёт убыток; DV01 меняется со временем. Заимствование облигации для short, спреды заявок и РЕПО могут стоить денег.',
question:'Как построить DV01-нейтральную позицию на увеличение спреда 2s10s?',options:['Long 2Y + Short 10Y','Short 2Y + Long 10Y','Long обеих облигаций'],answer:0,why:'При расширении y10 − y2 выгодно покупать короткий конец и продавать длинный при равном DV01.',
ref:'S1-07'},
{id:'flattener',name:'Flattener',title:'Уплощение кривой (Flattener)',source:'Семинар 1, слайды 154–158; уточнённый зеркальный кейс',kind:'curve',
intro:'После повышения краткосрочных ставок рынок может ожидать, что разница между длинной и короткой доходностями сократится. В таком сценарии продают короткую облигацию и покупают длинную.',
mechanism:'Доходность 2Y выросла, её цена снизилась, поэтому Short 2Y приносит прибыль. Доходность 10Y снизилась, цена выросла, поэтому Long 10Y тоже приносит прибыль. Такая позиция выигрывает при сокращении спреда y(10Y) − y(2Y).',
advanced:'В базовом примере сглаживание происходит за счёт повышения короткой и снижения длинной доходности. Сужение спреда может иметь и другую комбинацию движений: важна относительная разница при подобранном DV01. Нельзя трактовать любую плоскую кривую как безусловную прибыль.',
example:'2Y: 14,62% → 15,14%; 10Y: 16,18% → 16,00%. Спред уменьшается со 156 до 86 б.п. При DV01 100 000 ₽/б.п. Short 2Y ≈ +5,2 млн ₽, Long 10Y ≈ +1,8 млн ₽. Итого ≈ +7,0 млн ₽ до издержек.',
math:['ΔСпред = (16,00 − 15,14) − (16,18 − 14,62) = −0,70 п.п. = −70 б.п.','Short 2Y ≈ +100 000 × 52 = +5,2 млн ₽; Long 10Y ≈ −100 000 × (−18) = +1,8 млн ₽.','P&L ≈ −DV01 × ΔСпред = −100 000 × (−70) = +7 000 000 ₽.'],
risks:'Если спред увеличится, позиция проиграет. Short потребует возможности заимствования бумаги, а DV01-нейтральность является приближением.',
question:'Какая позиция выигрывает при сужении спреда 2s10s?',options:['Long 2Y + Short 10Y','Short 2Y + Long 10Y','Short обеих облигаций'],answer:1,why:'Flattener продаёт короткий конец и покупает длинный, выравнивая абсолютные DV01.',
ref:'S1-07'},
{id:'credit',name:'Кредитный спред',title:'Credit Spread Arbitrage',source:'Семинар 1, слайды 159–162',kind:'credit',
intro:'Две облигации похожих компаний дают разную премию к государственным бумагам. У выпуска Б премия необычно широкая: рынок оценивает его дешевле. Инвестор покупает Б и продаёт сопоставимый выпуск А, рассчитывая на сближение спредов.',
mechanism:'Кредитный спред отражает дополнительную доходность к ориентиру. Когда спред Б сокращается со 340 до 235 б.п., цена купленного выпуска растёт. Если спред А расширяется с 220 до 230 б.п., цена А падает, поэтому короткая позиция в нём также приносит прибыль.',
advanced:'Одинаковый рейтинг сам по себе не означает одинаковый риск. Нужно анализировать старшинство требований, выпуск, ковенанты, ликвидность, дюрацию и отраслевые факторы. Выравнивание DV01 уменьшает чувствительность к общему движению ставок, но сохраняет разницу кредитных рисков.',
example:'Long Б: 100 млн ₽, Dmod ≈ 3, Δспред = −105 б.п. Даёт ≈ +3,15 млн ₽. Short А: 100 млн ₽, Dmod ≈ 3, Δспред = +10 б.п. Даёт ≈ +0,30 млн ₽. Общий P&L ≈ +3,45 млн ₽, если базовая кривая не изменилась и прочие эффекты несущественны.',
math:['ΔP/P ≈ −Dmod × Δy, где Δy берётся в долях единицы.','Long Б: −3 × (−0,0105) × 100 млн = +3,15 млн ₽.','Short А: +3 × (+0,0010) × 100 млн = +0,30 млн ₽.','Итог: +3,15 + 0,30 = +3,45 млн ₽ до издержек.'],
risks:'Дефолт, разница в кредитном качестве, кратковременный дефицит ликвидности и стоимость short могут привести к значительным убыткам. Это стратегия относительной стоимости, а не безрисковый арбитраж.',
question:'Спред облигации А вырос с 220 до 230 б.п. Что происходит с короткой позицией по А, если базовая ставка неизменна?',options:['Прибыль, поскольку цена А снижается','Убыток, поскольку цена А снижается','Результат всегда равен нулю'],answer:0,why:'Рост требуемой доходности уменьшает цену облигации; Short выигрывает от её удешевления.',
ref:'S1-09'},
{id:'carry',name:'Cash-and-Carry',title:'Облигация + короткий фьючерс',source:'Семинар 1, слайды 163–166 (исправлены единицы доходности и базис)',kind:'basis',
intro:'Представьте возможность купить облигацию сегодня и одновременно зафиксировать её будущую продажу через фьючерс. Инвестор сравнивает фьючерсную цену с текущей стоимостью облигации плюс все расходы на удержание позиции.',
mechanism:'Позиция Long облигация + Short поставочный фьючерс может выиграть от относительной переоценённости фьючерса. Облигация приносит денежные потоки, но её покупку нужно финансировать. К сроку поставки теоретический базис меняется, при этом условия поставки и выбор CTD существенно влияют на результат.',
advanced:'Выбран знак учебного базиса B = F × CF − Pspot. Для реальной поставочной облигации дополнительно нужны accrued interest, conversion factor, купоны до поставки, определение CTD, delivery options, repo specialness и календарь. Схождение упрощённого B к нулю здесь задано как модельное допущение, не универсальный закон.',
example:'Условный 90-дневный период и база 360 дней: 15,50% годовых денежного дохода − 13,90% годовых фондирования = 1,60% годовых, или 0,40% за 90 дней. Если закрытие положительного базиса принесло ещё 0,50% за период, суммарно ≈ 0,90% за 90 дней, то есть 3,60% годовых в простой годовой экстраполяции до издержек. Это модельный, не гарантированный доход.',
math:['B = F × CF − Pspot (в принятом учебном соглашении о знаке).','Carry за 90 дней = (15,50% − 13,90%) × 90/360 = 0,40%.','Премия базиса за 90 дней = +0,50% (только при заданном сценарии исполнения).','Итог за 90 дней ≈ 0,40% + 0,50% = 0,90%; простая годовая экстраполяция = 0,90% × 360/90 = 3,60%.'],
risks:'Купонная ставка не равна полной доходности к погашению. РЕПО может подорожать, размер залога изменится, потребуется вариационная маржа, а поставочный фьючерс может иметь альтернативные облигации CTD. Числовой пример не является воспроизводимой гарантированной сделкой.',
question:'Что неверно в сложении годового carry 1,60% и дохода 0,50% за 90 дней как двух годовых ставок?',options:['Ничего: 2,10% годовых рассчитаны точно','Периоды различаются: сначала привести оба результата к одной базе','Любой базис автоматически исчезает без затрат'],answer:1,why:'1,60% — годовая ставка, 0,50% — накопленный результат за 90 дней. В данном сценарии за 90 дней carry составляет 0,40%.',
ref:'S2-02'},
{id:'asw',name:'Asset Swap',title:'Синтетический плавающий купон',source:'Семинар 1, слайды 167–170',kind:'asw',
intro:'Компания выпустила облигацию с фиксированным купоном, но инвестору удобнее получать выплаты, зависящие от денежного рынка. Он покупает облигацию и заключает процентный своп: платит фиксированную ставку и получает плавающую.',
mechanism:'Облигация даёт 17,80% годовых купонных выплат в принятом упрощении, по свопу инвестор платит 15,30% фиксированных и получает RUONIA. Остаточный денежный поток соответствует RUONIA + 2,50 процентного пункта при совпадении номиналов и дат.',
advanced:'Разница купона и фиксированной ставки здесь иллюстрирует денежные потоки и не обязательно равна рыночному ASW-спреду: при цене облигации, отличной от номинала, требуются расчёт PV, условия свопа, day count и кредитные/ликвидностные поправки.',
example:'На одинаковый условный номинал +17,80% (купон) −15,30% (фиксированный платёж IRS) +13,87% (RUONIA) = +16,37% годового эквивалента при заданных допущениях. Для реального выпуска необходимо учесть цену покупки, даты начисления купонов, дисконтирование свопа и затраты на исполнение.',
math:['Итоговый условный поток = купон − fixed IRS + floating IRS.','17,80% − 15,30% = 2,50 п.п. (250 б.п.).','13,87% + 2,50% = 16,37% годового эквивалента.'],
risks:'Хеджирование уменьшает риск движения базовой ставки при хорошо подобранном свопе, но не убирает кредитный риск эмитента, риск контрагента, расхождение RUONIA и денежных потоков, ликвидность и изменение рыночной цены пакета.',
question:'Какой риск НЕ исчезает после преобразования фиксированного купона в плавающий с помощью IRS?',options:['Кредитный риск облигации','Все риски исчезают','Номинальная сумма автоматически удваивается'],answer:0,why:'Своп в первую очередь меняет процентные денежные потоки; обязательство эмитента по облигации сохраняется.',
ref:'S2-06'}];

function strategyEsc(x){return String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function strategyCurveSvg(flat=false){
 const plot={x:66,y:36,w:510,h:260},xs=[1,2,3,5,7,10,15];
 const base=[14.3,14.62,14.95,15.53,15.88,16.18,16.38];
 const newer=flat?[14.55,15.14,15.3,15.62,15.81,16.00,16.17]:[13.96,14.10,14.55,15.42,15.98,16.36,16.63];
 const X=x=>plot.x+(x-1)/14*plot.w,Y=y=>plot.y+(17-y)/3.5*plot.h;
 const path=a=>xs.map((x,i)=>(i?'L':'M')+X(x).toFixed(1)+','+Y(a[i]).toFixed(1)).join(' ');
 const guides=[14,15,16,17].map(y=>'<line x1="'+plot.x+'" y1="'+Y(y)+'" x2="'+(plot.x+plot.w)+'" y2="'+Y(y)+'" stroke="#d9e5f0" stroke-dasharray="3 4"/><text x="48" y="'+(Y(y)+4)+'" text-anchor="end" fill="#465d77" font-size="13">'+y+'</text>').join('');
 const ticks=[2,5,10,15].map(x=>'<line x1="'+X(x)+'" y1="'+plot.y+'" x2="'+X(x)+'" y2="'+(plot.y+plot.h)+'" stroke="#edf2f7"/><text x="'+X(x)+'" y="316" text-anchor="middle" fill="#465d77" font-size="13">'+x+'</text>').join('');
 const marks=(a,color)=>[1,5].map(i=>'<circle cx="'+X(xs[i])+'" cy="'+Y(a[i])+'" r="5" fill="'+color+'"/>').join('');
 const tip=(x,y,text,color,dx=0,dy=-15)=>'<text x="'+(X(x)+dx)+'" y="'+(Y(y)+dy)+'" text-anchor="middle" font-size="13" font-weight="700" fill="'+color+'">'+text+'</text>';
 return '<svg viewBox="0 0 615 375" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'+(flat?'Flattener: спред уменьшается со 156 до 86 базисных пунктов':'Steepener: спред увеличивается со 156 до 226 базисных пунктов')+'"><rect x="0" y="0" width="615" height="375" fill="#fff"/><text x="308" y="19" text-anchor="middle" font-size="17" font-weight="700" fill="#0c3363">'+(flat?'Flattener: уплощение КБД':'Steepener: увеличение наклона КБД')+'</text>'+guides+ticks+'<path d="'+path(base)+'" stroke="#1262b6" stroke-width="3.5" fill="none"/><path d="'+path(newer)+'" stroke="#d62226" stroke-width="3.5" stroke-dasharray="9 6" fill="none"/>'+marks(base,'#1262b6')+marks(newer,'#d62226')+tip(2,base[1],'2Y 14,62%','#1262b6',25,-19)+tip(10,base[5],'10Y 16,18%','#1262b6',20,23)+tip(2,newer[1],flat?'2Y 15,14%':'2Y 14,10%','#d62226',30,flat?-15:21)+tip(10,newer[5],flat?'10Y 16,00%':'10Y 16,36%','#d62226',30,flat?22:-18)+'<text x="308" y="344" text-anchor="middle" font-size="14" fill="#244767">Срок до погашения (годы)</text><text x="16" y="165" transform="rotate(-90 16 165)" text-anchor="middle" font-size="13" fill="#244767">Доходность, % годовых</text><line x1="115" y1="360" x2="150" y2="360" stroke="#1262b6" stroke-width="3"/><text x="158" y="364" font-size="12" fill="#29476a">Начальная T0</text><line x1="307" y1="360" x2="342" y2="360" stroke="#d62226" stroke-dasharray="7 4" stroke-width="3"/><text x="350" y="364" font-size="12" fill="#29476a">После изменения T1</text></svg>';
}
function strategyCreditSvg(){
 const h=265,yy=v=>310-(v/400)*h;let a='';
 const sets=[{name:'Вход T0',x:158,b:340,c:220},{name:'Выход T1',x:395,b:235,c:230}];
 for(const e of sets){for(const v of [{num:e.b,x:e.x,color:'#cb3133',key:'Б'},{num:e.c,x:e.x+65,color:'#1568bc',key:'А'}]){a+='<rect x="'+v.x+'" y="'+yy(v.num)+'" width="51" height="'+(310-yy(v.num))+'" fill="'+v.color+'"/><text x="'+(v.x+25)+'" y="'+(yy(v.num)-9)+'" text-anchor="middle" font-weight="700" fill="'+v.color+'" font-size="15">'+v.num+' б.п.</text>';}a+='<text x="'+(e.x+57)+'" y="336" fill="#25466c" text-anchor="middle" font-size="14">'+e.name+'</text>';}
 return '<svg viewBox="0 0 615 390" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="График спредов: Б 340 до 235, А 220 до 230 базисных пунктов"><rect width="615" height="390" fill="#fff"/><text x="310" y="24" text-anchor="middle" font-size="18" font-weight="700" fill="#0c3363">Схождение кредитных спредов</text>'+[0,100,200,300,400].map(y=>'<line x1="100" y1="'+yy(y)+'" x2="575" y2="'+yy(y)+'" stroke="#dae6f1"/><text x="85" y="'+(yy(y)+4)+'" text-anchor="end" font-size="13" fill="#465d77">'+y+'</text>').join('')+a+'<rect x="112" y="355" width="13" height="13" fill="#cb3133"/><text x="131" y="367" font-size="12" fill="#25466c">Б, Long</text><rect x="260" y="355" width="13" height="13" fill="#1568bc"/><text x="280" y="367" font-size="12" fill="#25466c">А, Short</text><text x="418" y="367" font-size="13" font-weight="700" fill="#16518d">P&amp;L ≈ +3,45 млн ₽</text><text x="19" y="190" transform="rotate(-90 19 190)" text-anchor="middle" font-size="13" fill="#244767">G-спред (б.п.)</text></svg>';
}
function strategyBasisSvg(){
 const pts=[[95,70],[304,253],[520,275]];let g=pts.map((p,i)=>'<circle cx="'+p[0]+'" cy="'+p[1]+'" r="6" fill="#dc2729"/><text x="'+p[0]+'" y="'+(p[1]-17)+'" text-anchor="middle" fill="#ba2426" font-weight="700" font-size="16">'+['+0,50%','+0,05%','0,00%'][i]+'</text><text x="'+p[0]+'" y="324" text-anchor="middle" fill="#315172" font-size="13">'+['90 дней','30 дней','0 дней'][i]+'</text>').join('');
 return '<svg viewBox="0 0 615 390" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Положительный условный базис падает от 0,50 процента до нуля за 90 дней"><rect width="615" height="390" fill="#fff"/><text x="307" y="26" text-anchor="middle" font-size="18" font-weight="700" fill="#0c3363">Схождение условного базиса</text>'+[0,0.25,0.5].map(y=>{const Y=275-y/0.5*205;return '<line x1="63" y1="'+Y+'" x2="570" y2="'+Y+'" stroke="#dce5ef"/><text x="53" y="'+(Y+5)+'" text-anchor="end" font-size="13" fill="#315172">'+y.toFixed(2)+'%</text>';}).join('')+'<polyline points="'+pts.map(p=>p.join(',')).join(' ')+'" stroke="#dc2729" stroke-width="3.4" stroke-dasharray="10 6" fill="none"/>'+g+'<text x="307" y="349" text-anchor="middle" font-size="14" fill="#244767">Время до экспирации</text><text x="307" y="374" text-anchor="middle" font-size="12" fill="#6b8098">Учебная модель: B = F × CF − Pspot, без поставочных поправок</text></svg>';
}
function strategyAswSvg(){
 const box=(y,bg,border,title,number)=>'<rect x="105" y="'+y+'" width="395" height="67" rx="12" fill="'+bg+'" stroke="'+border+'" stroke-width="2"/><text x="303" y="'+(y+25)+'" text-anchor="middle" font-size="17" font-weight="700" fill="#244266">'+title+'</text><text x="303" y="'+(y+51)+'" text-anchor="middle" font-size="21" font-weight="800" fill="'+border+'">'+number+'</text>';
 return '<svg viewBox="0 0 615 390" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Облигация плюс фиксированная выплата IRS и плавающий доход RUONIA дают RUONIA плюс 2,50 процента"><rect width="615" height="390" fill="#fff"/><text x="306" y="24" text-anchor="middle" font-size="18" font-weight="700" fill="#0c3363">Синтетический плавающий поток</text>'+box(37,'#e9f4fe','#1462b4','Облигация: купон','+17,80%')+box(126,'#fcebec','#b6282c','IRS: платим fixed','−15,30%')+box(215,'#e6f6ec','#1a8955','IRS: получаем RUONIA','+13,87%')+'<path d="M303 104 V123 M303 193 V212 M303 282 V300" stroke="#1768bf" stroke-width="2.8"/><rect x="94" y="303" width="420" height="70" rx="12" fill="#dceafe" stroke="#155ab7" stroke-width="2"/><text x="304" y="332" text-anchor="middle" font-size="18" font-weight="700" fill="#184e8d">Итого: RUONIA + 2,50%</text><text x="304" y="359" text-anchor="middle" font-size="24" font-weight="800" fill="#bf252b">= 16,37% годовых</text></svg>';
}
function strategyChart(caseData){return caseData.kind==='curve'?strategyCurveSvg(caseData.id==='flattener'):caseData.kind==='credit'?strategyCreditSvg():caseData.kind==='basis'?strategyBasisSvg():strategyAswSvg();}
let friStrategySelected='steepener';
function renderStrategies(){
 const c=FRI_STRATEGY_CASES.find(x=>x.id===friStrategySelected)||FRI_STRATEGY_CASES[0];
 const content=document.getElementById('content');if(!content)return;
 const math=c.math.map((line,i)=>'<p class="strategy-math">'+(i+1)+'. '+strategyEsc(line)+'</p>').join('');
 content.innerHTML='<div class="strategy-page"><h1>Торговые стратегии на рынке облигаций</h1><p class="strategy-lead">Семинар 1, слайды 154–170. Учебный разбор четырёх подходов: от простой идеи сделки до расчётов, ограничений и проверки понимания. Исходные схемы преподавателя уточнены по знакам и экономическому смыслу. Схемы построены заново; палитра адаптирована к тёмной теме с сохранением цветовых ролей.</p><div class="strategy-picker" role="group" aria-label="Выбрать стратегию">'+FRI_STRATEGY_CASES.map(x=>'<button type="button" data-strategy="'+x.id+'" aria-pressed="'+(x.id===c.id)+'">'+strategyEsc(x.name)+'</button>').join('')+'</div><article class="strategy-panel"><div class="strategy-tag">'+strategyEsc(c.source)+'</div><h2>'+strategyEsc(c.title)+'</h2><div class="strategy-body"><div class="strategy-pane"><h3>1. Объяснение с нуля</h3><p>'+strategyEsc(c.intro)+'</p><h3>2. Как работает стратегия</h3><p>'+strategyEsc(c.mechanism)+'</p><div class="strategy-info"><strong>Числовой пример</strong><p>'+strategyEsc(c.example)+'</p></div><h3>3. Важные ограничения</h3><p>'+strategyEsc(c.advanced)+'</p></div><div class="strategy-pane"><figure class="strategy-chart">'+strategyChart(c)+'<figcaption>Авторская учебная схема на основе материала семинара. Сохранены учебная композиция, синяя исходная и красная изменённая серии; числовые подписи и направления проверяются отдельно.</figcaption></figure><div class="strategy-warning"><strong>Что может пойти не так:</strong> '+strategyEsc(c.risks)+'</div><details><summary>Формулы: расшифровка и пошаговый расчёт</summary><p>DV01 — изменение стоимости облигационной позиции приблизительно на 1 базисный пункт (0,01 процентного пункта) доходности. Long означает покупку, Short — продажу или короткую позицию. Уточнения и единицы приведены по каждой формуле.</p>'+math+'<p>Оценки первого порядка игнорируют выпуклость; расчёты приведены до комиссий, маржи и расходов на исполнение. Годовые и периодные проценты не складываются без приведения к одной временной базе.</p></details></div></div><section class="strategy-qa" aria-live="polite"><h3>4. Проверьте понимание</h3><p>'+strategyEsc(c.question)+'</p><div class="strategy-options">'+c.options.map((v,i)=>'<button type="button" data-strategy-answer="'+i+'">'+strategyEsc(v)+'</button>').join('')+'</div><div id="strategyFeedback" class="strategy-answer" hidden></div></section><div class="strategy-meta">Источник: презентация «Финансовые рынки и институты», семинар 1, слайды 154–170. Числовые сценарии учебные и не являются инвестиционными рекомендациями.</div><p class="strategy-links"><button type="button" class="btn sm ghost strategy-root-back" id="strategyToCourse">Перейти к смежной теме учебного курса</button></p></article></div>';
 content.querySelectorAll('[data-strategy]').forEach(b=>b.onclick=()=>{friStrategySelected=b.dataset.strategy;renderStrategies();});
 content.querySelectorAll('[data-strategy-answer]').forEach(b=>b.onclick=()=>{
  const right=Number(b.dataset.strategyAnswer)===c.answer;
  const result=document.getElementById('strategyFeedback');result.hidden=false;result.classList.toggle('bad',!right);
  result.textContent=(right?'Верно. ':'Проверьте ещё раз. ')+c.why;
 });
 const go=document.getElementById('strategyToCourse');if(go)go.onclick=()=>{if(typeof goStudyLesson==='function')goStudyLesson(c.ref,0)};
}


/* 5.0.16 · Strategies are taught inside the relevant course blocks.
   The original five cases and exact SVG graphs remain the canonical content. */
const FRI_STRATEGY_COURSE_MAP={
 'S1-07-0':['steepener','flattener'],
 'S1-09-0':['credit'],
 'S2-02-1':['carry'],
 'S2-06-0':['asw']
};
function friStrategyInlineMarkup(lessonId,pos){
 const ids=FRI_STRATEGY_COURSE_MAP[lessonId+'-'+pos]||[];
 if(!ids.length)return '';
 const bondPair=ids.some(id=>['steepener','flattener','credit'].includes(id));
 const curvePair=ids.some(id=>['steepener','flattener'].includes(id));
 const positionPrimer=bondPair?'<p>Обозначения позиций: Long — покупка и владение облигацией. Для Short облигацию обычно берут взаймы, продают, а затем возвращают; снижение её цены может дать прибыль до расходов, рост — убыток. Прибыль и убыток обозначают P&amp;L. Короткий или длинный срок облигации — отдельный признак.</p>'+(curvePair?'<p>2Y и 10Y обозначают сроки два и десять лет. Спред 2s10s здесь равен доходности десятилетней бумаги минус доходность двухлетней. Одинаковое изменение обеих доходностей называют параллельным сдвигом; изменение их разницы — изменением формы кривой.</p>':''):'';
 return '<section class="fri-strategy-in-course aria-label="Торговые стратегии в контексте темы"><div class="fri-strategy-top"><span>ПРИМЕНЯЕМ ТЕОРИЮ</span><h3>Торговые стратегии: разбор по шагам</h3><p>Сначала объясните себе, какую позицию открывает инвестор и почему. Затем изучите схему, раскройте расчёт и проверьте свой ответ.</p>'+positionPrimer+'</div>'+
 ids.map((id,i)=>{
  const c=FRI_STRATEGY_CASES.find(x=>x.id===id);
  if(!c)return '';
  return '<details class="fri-strategy-case" '+(i===0?'open':'')+' data-strategy-case="'+strategyEsc(c.id)+'"><summary><span class="fri-strategy-case-index">'+(i+1)+'</span>'+strategyEsc(c.title)+'</summary><div class="fri-strategy-case-content"><div class="fri-strategy-learning-columns"><div><h4>С чего начинается решение</h4><p>'+strategyEsc(c.intro)+'</p><h4>Что происходит с ценами и позициями</h4><p>'+strategyEsc(c.mechanism)+'</p><div class="fri-strategy-worked"><strong>Пример с числами</strong><p>'+strategyEsc(c.example)+'</p></div></div><div><figure class="strategy-chart">'+strategyChart(c)+'<figcaption>Исправленная учебная схема, построенная по числовому сценарию. Композиция и цветовые роли сохранены; яркость адаптирована к тёмной теме.</figcaption></figure></div></div>'+
  '<details class="fri-strategy-formula"><summary>Развернуть формулы и все шаги расчёта</summary>'+c.math.map((line,k)=>'<p class="strategy-math">'+(k+1)+'. '+strategyEsc(line)+'</p>').join('')+'<p>DV01: изменение стоимости позиции приблизительно на один базисный пункт доходности. 1 б.п. = 0,01 процентного пункта. Оценка по дюрации — приближение первого порядка.</p></details>'+
  '<details class="fri-strategy-limits"><summary>Когда вывод перестаёт работать</summary><p>'+strategyEsc(c.advanced)+'</p><p>'+strategyEsc(c.risks)+'</p></details>'+
  '<div class="fri-strategy-miniquestion" data-strategy-check="'+strategyEsc(c.id)+'"><h4>Проверьте понимание до раскрытия ответа</h4><p>'+strategyEsc(c.question)+'</p><div class="fri-strategy-answers">'+c.options.map((x,k)=>'<button type="button" data-strategy-option="'+k+'" aria-label="Вариант '+(k+1)+': '+strategyEsc(x)+'">'+strategyEsc(x)+'</button>').join('')+'</div><div class="fri-strategy-feedback" role="status" aria-live="polite" hidden></div></div>'+
  '<p class="fri-strategy-source">'+strategyEsc(c.source)+' · учебный сценарий до комиссий и расходов, без гарантии финансового результата</p></div></details>';
 }).join('')+'</section>';
}
function friBindStrategyInline(root){
 root.querySelectorAll('.fri-strategy-miniquestion').forEach(section=>{
  section.querySelectorAll('[data-strategy-option]').forEach(button=>button.addEventListener('click',()=>{
   const c=FRI_STRATEGY_CASES.find(x=>x.id===section.dataset.strategyCheck);
   if(!c)return;
   const chosen=Number(button.dataset.strategyOption);
   const correct=chosen===c.answer;
   const feedback=section.querySelector('.fri-strategy-feedback');
   feedback.hidden=false;
   feedback.classList.toggle('fri-strategy-feedback-wrong',!correct);
   feedback.textContent=(correct?'Верно. ':'Пока неверно. ')+c.why;
   section.querySelectorAll('[data-strategy-option]').forEach(x=>{
    x.setAttribute('aria-pressed',String(x===button));
    x.classList.toggle('fri-strategy-answer-correct',Number(x.dataset.strategyOption)===c.answer);
   });
  }));
 });
}
