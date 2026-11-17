
/* ===== Мугалимдин сайты ===== */
let G=3,Q=0;try{G=+localStorage.getItem('g')||3}catch(e){}
const KINDICON={jeopardy:'🏆',board:'🎲',quiz:'❓',escape:'🔐',wheel:'🎡',memory:'🃏',bingo:'🔢',other:'🎮'};
function homeHall(){const T=(PROG.tracks||[]),n=id=>(PROG.lessons||[]).filter(l=>l.track===id).length;buildHall($('#hall'),T.map((t,i)=>({label:t.name.split(' ')[0],sub:esc(t.level)+' · '+n(t.id)+' сабак',icon:['abc','globe','cap'][i]||'star',door:['🧒','🧑‍🎓','🎓'][i]||'⭐',onclick:()=>{PT=t.id;location.hash='program';renderProgram()}})).concat([{label:'Грамматика',sub:(GRAMMAR.topics||[]).length+' тема',icon:'book',door:'📘',onclick:()=>location.hash='grammar'},{label:'Оюндар',sub:'дөңгөлөк, таймер, эсеп',icon:'bell',door:'🎲',onclick:()=>location.hash='games'}]))}
function gradeHall(el,go){buildHall(el,GRADES.map(g=>({label:g+'-класс',sub:MY[g]?'Менин классым':'КТП боюнча',me:MY[g]?'★ '+MY[g]:'',icon:GRADEICON[g],door:g,on:g===G,onclick:()=>{setG(g);if(go)location.hash='classes'}})))}
function stageHTML(s,pp){const p=pp?[0,pp[1]]:null;return `<div class="st" style="--c:${s[4]}"><div><b>${s[0]}</b><small>${s[1]} мүнөт</small></div><div>${s[2]}${p?`<br><a class="pl" href="${p[1]}" target="_blank" rel="noopener">🌐 ${esc(s[3])} ↗</a>`:''}</div></div>`}
function renderClasses(){
 gradeHall($('#hall2'),false);
 $('#qchips').innerHTML=QN.map((q,i)=>`<button class="chip ${i===Q?'on':''}" onclick="setQ(${i})">${q} чейрек <small>${QD[i]}</small></button>`).join('')+`<button class="chip" style="border-color:var(--butter);background:#fff1c9" onclick="quarterCodes()">🔑 Чейректин коддору</button>`;
 $('#gtitle').textContent=G+'-класс'+(MY[G]?' · '+MY[G]:'');
 const gi=GRADES.indexOf(G);let start=QC.slice(0,Q).reduce((a,b)=>a+b,0),out='';
 for(let i=start;i<start+QC[Q]&&i<KTP[gi].length;i++){const L=lessonData(gi,i),gm=gameFor(L),m=ME[MBYTYPE[L.ty]],v=videoFor(L);
  const [p1,p2]=twoPlat(L);
  out+=`<details class="lesson"><summary><span class="num">${L.n}</span><span class="lt">${esc(L.t)}</span><span class="tag">${TYPEKY[L.ty]}</span></summary><div class="lbody">
  ${boardHTML(L)}
  <p class="ready" style="margin-top:6px"><button class="btn" onclick="deckL(${gi},${i})">▶ Тактага чыгаруу (слайддар)</button>${(()=>{const t=tplPick(L);return t&&t.fit?` <a class="btn alt" href="${t.canva||t.page}" target="_blank" rel="noopener" title="${esc(t.title)}">${tLab(t)}: ${esc(t.title.slice(0,28))} ↗</a>`:''})()}${(RES.canva||{})[gi+':'+i]?` <a class="btn sky" href="${RES.canva[gi+':'+i]}" target="_blank" rel="noopener">🎨 Canva слайддар ↗</a>`:''} <button class="btn alt" onclick="playL(${gi},${i},'cards')">🃏 Флешкарталар</button> <button class="btn mint" onclick="playL(${gi},${i},'quiz')">❓ Даяр квиз</button></p>
  ${codeHTML(gi,i)}
  <p style="margin:12px 0 0;color:var(--ink2)">Тема: <b>${esc(L.th)}</b> · Негизги сөздөр: <i class="en">${esc(L.words.slice(0,8).join(', '))}</i></p>
  <div class="stages">${boardGamesRow(k=>`kBG(${gi},${i},'${k}')`)}${stages(L).map((x,j)=>stageHTML([x[0],x[1],x[2],j===3?p1[0]:j===5?p2[0]:'',x[4]],j===3?p1:j===5?p2:null)).join('')}</div>
  <div class="gamebox">
   <div class="card c1"><h4>${GAMES[gm][0]}</h4><p>${GAMES[gm][1]}. Сабактын сөздөрү менен даяр.</p><button class="btn sm" onclick="playL(${gi},${i},'${gm}')">Оюнду ачуу</button> <button class="btn sm ghost" onclick="toolScore()">Эсеп</button></div>
   <div class="card c5"><h4>${m[0]}</h4><p>${m[1].replace('${near/far, this/that}','near/far, this/that')}</p></div>
   ${v?`<div class="card c3"><h4>▶️ Видео</h4>${vidHTML(v)}</div>`:''}
  </div>
  <p style="margin:14px 0 4px;font-weight:800;font-size:14px">Ушул сабактын 2 платформасы:</p>
  <div class="plat2">${[p1,p2].map((x,j)=>`<div class="card ${j?'c4':'c2'}" style="border:0"><h4>${j?'✅ Жыйынтык текшерүү':'🏆 Мелдеш'} · ${esc(x[0])}</h4><p>${esc(x[2])}</p><a class="btn sm ${j?'sky':'alt'}" href="${x[1]}" target="_blank" rel="noopener">Ачуу ↗</a></div>`).join('')}</div>
  <p style="font-size:14px;color:var(--muted);margin:12px 0 0">Башка оюн: ${Object.keys(GAMES).filter(x=>x!==gm).map(x=>`<a href="javascript:playL(${gi},${i},'${x}')">${GAMES[x][0]}</a>`).join(' · ')}</p>
  </div></details>`}
 $('#lessons').innerHTML=out;
}
const READY=[
 ['Wordwall',q=>'https://wordwall.net/en-us/community/'+q.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''),'Даяр интерактивдүү оюндар: жупташтыруу, дөңгөлөк, квиз, анаграмма.'],
 ['Baamboozle',q=>'https://www.baamboozle.com/games?search='+encodeURIComponent(q),'Даяр командалык оюндар: тактада эки команда менен.'],
 ['JeopardyLabs',q=>'https://jeopardylabs.com/browse/?q='+encodeURIComponent(q),'Даяр Jeopardy оюндары: категориялар жана упайлар.'],
 ['Kahoot',q=>'https://create.kahoot.it/search?query='+encodeURIComponent(q),'Даяр Kahoot квиздери: жарыш-текшерүү.'],
 ['Educaplay',q=>'https://www.educaplay.com/learning-resources/?q='+encodeURIComponent(q),'Даяр кроссворд, сөз издөө, memory, табышмактар.'],
 ['Wayground',q=>'https://wayground.com/explore/admin/search/'+encodeURIComponent(q),'Даяр квиздер: ар ким өз темпинде, натыйжалар көрүнөт.'],
 ['LearningApps',q=>'https://learningapps.org/index.php?s='+encodeURIComponent(q),'Даяр көнүгүүлөр: жупташтыруу, категориялар, кроссворд.'],
 ['Quizlet',q=>'https://quizlet.com/search?query='+encodeURIComponent(q)+'&type=sets','Даяр флешкарта топтомдору: Learn, Match режимдери.']];
function twoPlat(L){const R=window.RES,k=topicKeys(L),q=searchQ(L)+(L.g<3?'':' ESL');
 const spec=k.map(x=>(R.jeopardy||{})[x]).find(Boolean);
 const n=READY.length,i1=(L.n*3+L.g*5)%n;let i2=(i1+1+((L.n+L.g)%(n-1)))%n;if(i2===i1)i2=(i1+1)%n;
 const mk=r=>[r[0],r[1](searchQ(L)),r[2]];let a=mk(READY[i1]),b=mk(READY[i2]);
 if(spec&&L.ty==='revision')a=['JeopardyLabs: '+spec.title,spec.url,'Даяр Jeopardy ушул тема боюнча.'];
 return [a,b]}
function tLab(t){return t.canva?'🎨 Canva':t.site==='Slidesgo'?'🟢 Slidesgo → Canva':'🟣 Genially'}
function tplPick(L){const T=(window.RES.ctpl||[]).filter(t=>!/worksheet|planner|certificate|newsletter|resume|calendar|horror|brand|periodic|business|marketing|company|corporate|sales|zombie|crime|murder|employee|onboarding|chemistry|physics|biology/i.test(t.title));if(!T.length)return null;const k=topicKeys(L),gr=L.g<3?'3-5':'6-9';
 const ok=T.filter(t=>t.grades==='all'||t.grades===gr);const top=ok.filter(t=>(t.topics||[]).some(x=>k.includes(x)));
 const idx=(L.g*68+L.n)*7;if(top.length&&(top.length>=8||L.n%2===0))return Object.assign({},top[(idx>>1)%top.length],{fit:true});const pool=ok.length?ok:T;return Object.assign({},pool[idx%pool.length],{fit:false})}
function deckL(gi,i){const L=lessonData(gi,i);const [a,b]=twoPlat(L),t=tplPick(L);openDeck(L,[a,b,t?[tLab(t)+': '+t.title,t.canva||t.page]:null])}
function setG(g){G=g;try{localStorage.setItem('g',g)}catch(e){}renderClasses()}
function setQ(q){Q=q;renderClasses()}
function playL(gi,i,gm){if(gm==='cards'){const L=lessonData(gi,i);return openGame('cards',L.pairs,L.words,L.phrases,`${GRADES[gi]}-класс · ${L.n}-сабак`)}const L=lessonData(gi,i);openGame(gm,L.pairs,L.words,L.phrases,`${GRADES[gi]}-класс · ${L.n}-сабак`)}
function renderStatic(){
 const total=KTP.reduce((a,g)=>a+g.length,0),T=(window.RES.templates||[]);
 $('#stats').innerHTML=`<div><b>3</b>деңгээл</div><div><b>${(PROG.lessons||[]).length}</b>даяр сабак</div><div><b>${(GRAMMAR.topics||[]).length}</b>грамматика</div><div><b>${Object.keys(GAMES).length}</b>ичиндеги оюн</div><div><b>${PL.length}</b>платформа</div>${T.length?`<div><b>${T.length}</b>слайд-оюн</div>`:''}`;
 homeHall();
 const cats=['Баары',...new Set(PL.map(p=>p[2]))];
 $('#pfilter').innerHTML=cats.map((c,i)=>`<button class="chip ${i?'':'on'}" onclick="pf('${c}')">${c}</button>`).join('');pf('Баары');
 $('#mlist').innerHTML=Object.values(ME).map(m=>`<div class="card lift"><h4>${m[0]}</h4><p>${m[1].replace('${near/far, this/that}','<i class="en">near/far, this/that</i>')}</p><p><b>Качан:</b> ${m[2]}</p></div>`).join('');
 $('#ttable').innerHTML='<tr><th>Тапшырма</th><th>Эң ылайыктуу платформа</th><th>Офлайн метод</th></tr>'+TASKS.map(t=>`<tr><td><b>${t[0]}</b></td><td>${t[1]}</td><td>${t[2]}</td></tr>`).join('');
 $('#customBtns').innerHTML=Object.entries(GAMES).map(([k,v])=>`<button class="chip" onclick="playCustom('${k}')">${v[0]}</button>`).join('');
 const site=[...new Set(T.map(t=>t.site))];
 $('#tfilter').innerHTML=['Баары',...site].map((c,i)=>`<button class="chip ${i?'':'on'}" onclick="tf('${c.replace(/'/g,"\\'")}')">${esc(c)}</button>`).join('');tf('Баары');
 const J=window.RES.jeopardy||{},W=window.RES.wordwall||{};
 $('#jlist').innerHTML=Object.entries(J).map(([k,v])=>`<a href="${v.url}" target="_blank" rel="noopener">🏆 ${esc(v.title)}</a>`).join('')+Object.entries(W).map(([k,v])=>`<a href="${v.url}" target="_blank" rel="noopener">🧩 ${esc(v.title)}</a>`).join('');
 renderCourse();
}
function tf(c){document.querySelectorAll('#tfilter .chip').forEach(b=>b.classList.toggle('on',b.textContent===c));
 $('#tlist').innerHTML=(window.RES.templates||[]).filter(t=>c==='Баары'||t.site===c).map(t=>`<div class="card lift"><div class="tpl"><div class="ic">${KINDICON[t.kind]||'🎮'}</div><div><span class="tag b">${esc(t.site)}</span> <span class="tag y">${t.grades==='all'?'бардык класстар':esc(t.grades||'')+'-кл.'}</span><h4 style="margin-top:8px">${esc(t.title)}</h4><p>${esc(t.note_ky||'')}</p><a class="btn sm" href="${t.url}" target="_blank" rel="noopener">Ачуу ↗</a></div></div></div>`).join('')||'<p class="sub">Шаблондор жүктөлгөн жок.</p>'}
function pf(c){document.querySelectorAll('#pfilter .chip').forEach(b=>b.classList.toggle('on',b.textContent===c));
 $('#plist').innerHTML=PL.filter(p=>c==='Баары'||p[2]===c).map(p=>`<div class="card lift"><span class="tag">${p[2]}</span><h4 style="margin-top:8px">${esc(p[0])}</h4><p>${esc(p[3])}</p><p><b>Качан:</b> ${esc(p[4])}</p><a class="btn sm" href="${p[1]}" target="_blank" rel="noopener">Ачуу ↗</a></div>`).join('')}
function playCustom(k){const lines=$('#custom').value.split('\n').map(s=>s.trim()).filter(Boolean);
 const pairs=lines.filter(l=>/ - /.test(l)).map(l=>l.split(' - ').map(s=>s.trim()));
 const ph=lines.filter(l=>!/ - /.test(l)&&l.split(' ').length>=3);
 if(pairs.length<3&&k!=='order'&&k!=='wheel'){alert('Кеминде 3 жуп жазыңыз: english - кыргызча');return}
 openGame(k,pairs,pairs.map(p=>p[0]),ph.length?ph:['I can play this game.'],'Өз сөздөрүм')}

/* ===== Курс ===== */
const CF=[['Жылытуу',5,'Small talk: ушул жуманын жаңылыгы, «Would you rather...?» суроолору.','var(--butter)'],['Сүйлөө клубу',15,'Түгөйлөрдө жана топто сүйлөшүү, ар ким кеминде 2 мүнөт сүйлөйт.','var(--cherry)'],['Жаңы тил',10,'Керектүү сөздөр жана 1 грамматика үлгүсү, реалдуу кырдаалда.','var(--sky)'],['Оюн',15,'Сайттагы оюн + платформа (Baamboozle, Blooket, Kahoot).','var(--mint)'],['Реалдуу тапшырма',10,'Ролдук оюн: кафеде буйрутма, жол сурау, интервью.','var(--plum)'],['Кайтарым байланыш',5,'Ката менен иштөө, үй тапшырмасы: Quizlet, LyricsTraining.','var(--pink)']];
const LV=[['Starter (7–10 жаш)',['Hello! Me and my family','Colours, numbers, toys','My body and clothes','Animals and the zoo','Food I like','My home','Days, weather, seasons','Show & Tell: my favourite things']],
 ['Elementary (10–13 жаш)',['Introducing yourself and friends','Daily routine and time','Hobbies and free time','Shopping and money','Places in town, directions','Holidays and travel','Health and feelings','Mini-project: my dream trip']],
 ['Pre-Intermediate (13+ жаш)',['Small talk and first impressions','Telling stories in the past','Plans and the future','Technology and social media','Kyrgyzstan: culture for visitors','Jobs and interviews','Debates: agree / disagree','Presentation: my project in English']]];
let LVI=0;
const LQ=[["What's your name?","How old are you?","What colour is it?","Do you like it?","What can you see?","Have you got a pet?"],["What do you usually do after school?","What's your favourite food?","Where do you live?","What did you do yesterday?","Can you swim?","What time do you get up?"],["What would you do if you had a million soms?","Have you ever been abroad?","Do you agree? Why or why not?","What are your plans for the summer?","What is the best job in the world?","How has technology changed our lives?"]];
const CPARTS=[['Words & warm-up','vocab','Сөздөр + жылытуу'],['Speaking club','speaking','Сүйлөө клубу'],['Game day','revision','Оюн күнү'],['Real-life task','project','Реалдуу тапшырма']];
function courseL(mi,j){const m=LV[LVI][1][mi],th=themeOf(m),pairs=Object.entries(th[2]),w=pairs.map(p=>p[0]);
 return {g:LVI?5:1,n:mi*4+j+1,t:m+' · '+CPARTS[j][0],v:'',th:th[1],ty:CPARTS[j][1],pairs,words:w,phrases:[`Let's talk about ${m.replace(/^[^:]*:\s*/,'').toLowerCase()}.`,...LQ[LVI].slice(j,j+3)],q:0}}
function cGo(mi,j,k){const L=courseL(mi,j);if(k==='deck')return openDeck(L,[]);if(k==='talk'){openM('🎡 Сүйлөө карточкалары');return gWheel([],[],[],[...LQ[LVI],'Talk about: '+LV[LVI][1][mi]])}openGame(k,L.pairs,L.words,L.phrases,L.t)}
function renderCourse(){
 $('#cformat').innerHTML=CF.map(s=>`<div class="st" style="--c:${s[3]}"><div><b>${s[0]}</b><small>${s[1]} мүнөт</small></div><div>${s[2]}</div></div>`).join('');
 $('#lvchips').innerHTML=LV.map((l,i)=>`<button class="chip ${i===LVI?'on':''}" onclick="LVI=${i};renderCourse()">${l[0]}</button>`).join('');
 $('#clist').innerHTML=LV[LVI][1].map((m,mi)=>{const L0=courseL(mi,0);
  return `<details class="lesson"><summary><span class="num">${mi+1}</span><span class="lt"><i class="en" style="color:var(--ink)">${esc(m)}</i></span><span class="tag y">4 сабак</span></summary><div class="lbody">
  <p style="margin:12px 0 4px;color:var(--ink2)">Сүйлөө максаты: темада 2–3 мүнөт эркин сүйлөй алуу. Сөздөр: <i class="en">${esc(L0.words.slice(0,8).join(', '))}</i></p>
  <div class="stages">${CPARTS.map((c,j)=>{const L=courseL(mi,j),gm=gameFor(L);return `<div class="st" style="--c:${CF[j+1][3]}"><div><b>${j+1}-сабак</b><small>${c[2]}</small></div><div><b>${esc(c[0])}</b><div class="ready" style="margin-top:6px"><button class="btn sm" onclick="cGo(${mi},${j},'deck')">▶ Слайддар</button><button class="btn sm alt" onclick="cGo(${mi},${j},'cards')">🃏 Флешкарта</button><button class="btn sm mint" onclick="cGo(${mi},${j},'quiz')">❓ Квиз</button><button class="btn sm sky" onclick="cGo(${mi},${j},'${gm}')">${GAMES[gm][0]}</button>${j===1?`<button class="btn sm ghost" onclick="cGo(${mi},${j},'talk')">🎡 Сүйлөө карточкалары</button>`:''}</div></div></div>`}).join('')}</div>
  <p style="margin:10px 0 4px;font-weight:800;font-size:14px">Видео жана ырлар:</p><div class="ready">${ytLinks(L0).slice(0,3).map(y=>`<a href="${y[1]}" target="_blank" rel="noopener">${esc(y[0])}</a>`).join('')}</div>
  </div></details>`}).join('');
}

/* ===== Роутинг ===== */
function route(){const h=(location.hash||'#home').slice(1);const ok=document.getElementById(h)&&document.getElementById(h).classList.contains('page')?h:'home';
 document.querySelectorAll('section.page').forEach(s=>s.classList.toggle('on',s.id===ok));
 document.querySelectorAll('.top nav a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+ok));
 $('.hero').style.display=ok==='home'?'':'none';window.scrollTo(0,0)}
window.addEventListener('hashchange',route);
let rz;window.addEventListener('resize',()=>{clearTimeout(rz);rz=setTimeout(()=>{homeHall();if($('#hall2'))gradeHall($('#hall2'),false)},200)});
/* ===== Сабак коддору (PIN менен) ===== */
const WORDS=['APPLE','BALL','CAT','DOG','EGG','FISH','FROG','HAT','KITE','LION','MILK','PEN','ROBOT','SUN','TREE','ZEBRA','TIGER','HORSE','BREAD','RICE','SOUP','CAKE','JAM','TEA','BOOK','DESK','BAG','MAP','BUS','TRAIN','PLANE','BOAT','STAR','MOON','RAIN','SNOW','WIND','CLOUD','RIVER','LAKE','SEA','HILL','ROSE','LEAF','BIRD','BEAR','WOLF','FOX','OWL','DUCK','GOAT','SHEEP','COW','MOUSE','PANDA','KOALA','MANGO','LEMON','PEAR','PLUM','GRAPE','HONEY','PIZZA','PASTA','SALAD','JUICE','WATER','CHAIR','TABLE','DOOR','HOUSE','GARDEN','PARK','ZOO','SHOP','CLOCK','PHONE','PIANO','DRUM','GUITAR','SONG','DANCE','JUMP','SWIM','RUN','READ','WRITE','DRAW','SMILE','HAPPY','BRAVE','MAGIC','PIRATE','QUEEN','KING','DRAGON','ROCKET','PLANET','COMET','SPACE','OCEAN','ISLAND','FOREST','JUNGLE','DESERT','CASTLE','BRIDGE','TOWER','CANDY','COOKIE','BANANA','CHERRY','PEACH','TOMATO','CARROT','ONION','PEPPER','TIGER'];
const PINCHK='w35pxp';
let PIN='';try{PIN=localStorage.getItem('pin')||''}catch(e){}
function fnv(s){let h=0x811c9dc5;for(let k=0;k<s.length;k++){h^=s.charCodeAt(k);h=Math.imul(h,16777619)>>>0}return h}
function codeOf(gi,i){if(!PIN)return null;const h=fnv(PIN+':'+gi+':'+i);return WORDS[h%WORDS.length]+String(1000+((h>>>8)%9000))}
function askPin(){const p=prompt('Мугалимдин PIN-коду:');if(!p)return;if(fnv('chk:'+p.trim()).toString(36)!==PINCHK){alert('PIN туура эмес');return}PIN=p.trim();try{localStorage.setItem('pin',PIN)}catch(e){}renderClasses()}
function codeHTML(gi,i){const c=codeOf(gi,i);return c?`<div class="ready" style="margin-top:4px"><span class="tag y" style="font-size:15px;padding:6px 14px">🔑 Окуучулар үчүн код: <b style="font-family:var(--hf);letter-spacing:1px">${c}</b></span><a href="javascript:navigator.clipboard&&navigator.clipboard.writeText('${c}')">📋 Көчүрүү</a></div>`:`<p><button class="btn sm ghost" onclick="askPin()">🔑 Окуучулардын кодун көрүү (PIN)</button></p>`}
function quarterCodes(){if(!PIN){askPin();if(!PIN)return}const gi=GRADES.indexOf(G);let s=QC.slice(0,Q).reduce((a,b)=>a+b,0),rows='';
 for(let i=s;i<s+QC[Q]&&i<KTP[gi].length;i++)rows+=`<tr><td>${i+1}</td><td>${esc(KTP[gi][i][0])}</td><td><b style="font-family:var(--hf)">${codeOf(gi,i)}</b></td></tr>`;
 openM(`🔑 ${G}-класс · ${QN[Q]} чейрек: коддор`);$('#mb').innerHTML=`<p class="sub">Сабак башталганда окуучуларга ошол сабактын кодун айтыңыз же тактага жазыңыз. Окуучулар сайтка кодду жазганда гана сабак ачылат.</p><div class="tw"><table id="ctab"><tr><th>№</th><th>Тема</th><th>Код</th></tr>${rows}</table></div><p class="center" style="margin-top:14px"><button class="btn" onclick="printCodes()">🖨️ Басып чыгаруу</button> <button class="btn ghost" onclick="PIN='';try{localStorage.removeItem('pin')}catch(e){};closeM();renderClasses()">PIN'ден чыгуу</button></p>`}
function printCodes(){const w=window.open('','_blank');w.document.write(`<meta charset="utf-8"><title>Коддор</title><style>body{font-family:sans-serif}td,th{border:1px solid #999;padding:6px 10px}table{border-collapse:collapse}</style><h3>${G}-класс · ${QN[Q]} чейрек</h3>`+$('#ctab').outerHTML);w.document.close();w.print()}

renderStatic();renderClasses();renderGrammar();route();


/* ===== Программа бөлүмү (мугалим) ===== */
let PT='YL';
function codeOfP(id){if(!PIN)return null;const h=fnv(PIN+':p:'+id);return WORDS[h%WORDS.length]+String(1000+((h>>>8)%9000))}
function pCodeHTML(id){const c=codeOfP(id);return c?`<div class="ready" style="margin-top:4px"><span class="tag y" style="font-size:15px;padding:6px 14px">🔑 Сабактын коду: <b style="font-family:var(--hf);letter-spacing:1px">${c}</b></span></div>`:`<p><button class="btn sm ghost" onclick="askPin();renderProgram()">🔑 Сабактын кодун көрүү (PIN)</button></p>`}
function renderProgram(){const T=(PROG.tracks||[]),tr=T.find(t=>t.id===PT)||T[0];if(!tr){$('#plessons').innerHTML='<p class="sub">Программа жүктөлө элек.</p>';return}PT=tr.id;
 $('#ptracks').innerHTML=T.map(t=>`<button class="chip ${t.id===PT?'on':''}" onclick="PT='${t.id}';renderProgram()">${esc(t.name)} <small>${esc(t.level)}</small></button>`).join('')+(PROG.test?`<button class="chip" style="background:#fff1c9;border-color:var(--butter)" onclick="pTest()">📝 Деңгээл тести</button>`:'');
 $('#punits').innerHTML=(tr.units||[]).map(u=>`<div class="card"><span class="tag y">${esc(u.range||'')}</span><h4 style="margin-top:8px">${esc(u.title)}</h4></div>`).join('');
 const full=(PROG.lessons||[]).filter(l=>l.track===PT),outline=(tr.outline||[]).length?tr.outline:full.map(l=>({n:l.n,title:l.title,speak:l.speak}));
 $('#plessons').innerHTML=outline.map(o=>{const P=full.find(l=>l.n===o.n);const id=P?P.id:'';
  return `<details class="lesson" ${P?`data-id="${id}" ontoggle="if(this.open&&!this.dataset.r){this.dataset.r=1;this.querySelector('.lbody').innerHTML=pLessonHTML(PL_ID['${id}'],pCodeHTML('${id}'))}"`:''}><summary><span class="num">${o.n}</span><span class="lt">${esc(o.title)}</span>${P?'<span class="tag g">толук сабак</span>':'<span class="tag">даярдалууда</span>'} <span class="tag b">${SPK[o.speak]||''}</span></summary><div class="lbody">${P?'':'<p class="sub" style="margin:12px 0">Бул сабак кийинки блокто толукталат.</p>'}</div></details>`}).join('');
}
function openProgLesson(id){const P=PL_ID[id];if(!P)return;PT=P.track;location.hash='program';renderProgram();setTimeout(()=>{const d=document.querySelector(`details[data-id="${id}"]`);if(d){d.open=true;d.scrollIntoView({behavior:'smooth'})}},120)}
function pTest(){const t0=PROG.test;const secs=(t0.sections||[]).map(x=>typeof x==='string'?{name:x,items:(t0.items||[]).filter(i=>i.section===x)}:x);const t=Object.assign({},t0,{sections:secs});openM('📝 '+(t0.title_ky||'Деңгээл тести'));let n=0;
 $('#mb').innerHTML=`<p class="sub">${esc(t0.instructions_ky||'Тестти тактага чыгарып же оозеки өткөрүңүз. Упайларды кошуп, төмөнкү таблицадан деңгээлди аныктаңыз.')}</p>${(t.sections||[]).map(s=>`<h4>${esc(s.name)}</h4>${(s.items||[]).map(i=>`<div style="margin:6px 0">${++n}. ${esc(i.q)} ${i.options?`<small style="color:var(--ink2)">(${i.options.map(esc).join(' / ')})</small>`:''} <span class="tag">${i.points||1} упай</span>${i.oral?` <span class="tag y">оозеки</span> <small>${esc(i.criteria_ky||'')}</small>`:''}</div>`).join('')}`).join('')}
 <details style="margin-top:10px"><summary style="cursor:pointer;font-weight:800">Жооптор</summary>${(t.sections||[]).flatMap(s=>s.items||[]).map((i,j)=>i.answer?`${j+1}) <b>${esc(i.answer)}</b>`:'').filter(Boolean).join(' · ')}</details>
 <div class="tw" style="margin-top:12px"><table><tr><th>Упай</th><th>Трек</th><th>Деңгээл</th><th>Кеңеш</th></tr>${(t.bands||[]).map(b=>`<tr><td>${b.min}–${b.max}</td><td>${esc(b.track)}</td><td>${esc(b.level)}</td><td>${esc(b.advice_ky||'')}</td></tr>`).join('')}</table></div>`}
/* Кодду жазып, сабакты дароо ачуу (мугалимдин сайты) */
function teacherCode(ev){ev.preventDefault();const inp=ev.target.querySelector('input'),fb=ev.target.querySelector('.cfb');const c=inp.value.toUpperCase().replace(/[^A-Z0-9]/g,'');if(!c)return;
 const hit=(window.HASHES||{})[fnv('nur:'+c).toString(36)];if(!hit){fb.textContent='❌ Мындай код жок';return}fb.textContent='✅ Ачылды';inp.value='';const k=hit[0];
 if(k.startsWith('p:'))return openProgLesson(k.slice(2));
 const [gi,i]=k.split(':').map(Number);G=GRADES[gi];Q=qOf(i+1);location.hash='classes';renderClasses();setTimeout(()=>{const ds=document.querySelectorAll('#lessons details'),start=QC.slice(0,Q).reduce((a,b)=>a+b,0),d=ds[i-start];if(d){d.open=true;d.scrollIntoView({behavior:'smooth'})}},120)}
document.querySelectorAll('form.tcode').forEach(f=>f.addEventListener('submit',teacherCode));
renderProgram();
