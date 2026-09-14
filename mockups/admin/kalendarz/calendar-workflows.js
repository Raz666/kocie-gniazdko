/* Source embedded by build-mockup.cjs. The delivered HTML remains standalone. */
(() => {
  const base = {render, renderPanel, renderQueue, showPanel, startMove, resetAll, targetPicker, validateDraft, saveMove};
  const initialPets = structuredClone(pets);
  const money = value => new Intl.NumberFormat('pl-PL',{style:'currency',currency:'PLN'}).format(value/100);
  const reservationPets = id => pets.filter(p=>p.reservation===id);
  const distinctPets = ids => [...new Set(ids.map(id=>stays.find(s=>s.id===id)?.pet).filter(Boolean))];
  let reservations = {}, audit = [], busy = false, saveError = '', pendingRecovery = null, dialogReturn = null;
  let selectedSegments = [], reservationDraft = null, activeReservation = null, returnFocus = null, pendingLeave = null, approvedNavigation = false;
  const initReservations = () => {
    reservations = {};
    pets.forEach((p,i)=>{
      if(reservations[p.reservation])return;
      const days=Math.round((Date.parse(localInput(p.end).slice(0,10))-Date.parse(localInput(p.start).slice(0,10)))/DAY);
      reservations[p.reservation]={id:p.reservation,code:'KG-'+String(i+101),rate:5000,calculated:days*5000,final:days*5000,manual:false,paid:p.status==='W hotelu'?10000:0,version:1,notes:'',phone:'500 000 000',email:'klient@example.com'};
    });
  };
  initReservations();
  const css=document.createElement('style');
  css.textContent=[
    '.date-jump{display:flex;align-items:center;gap:6px;font-size:12px}.date-jump input{width:132px;min-height:34px;padding:4px 6px}',
    '.search-summary{font-size:12px;color:var(--green);align-self:center;max-width:230px}.search-summary.no-hits{color:#895615}',
    '.queue-pet.search-hit,.home-card.search-hit{outline:2px solid #6b872f;outline-offset:-2px}.home-card.search-muted{opacity:.5}',
    '.segment-choice{width:100%;text-align:left;border:1px solid var(--line);cursor:pointer}.segment-choice[aria-pressed=true]{border-color:#648a32;background:#eef4e3}.segment-choice .tick{float:right;color:#45681f}',
    '.panel-actions{flex-wrap:wrap}',
    '.operation-status{font-size:13px;padding:10px 12px;border-radius:8px;background:#fff3cf;margin:8px 0}.operation-status button{margin-top:8px}.operation-status:empty{display:none}',
    'dialog{font-family:inherit;color:var(--ink);border:1px solid var(--line);border-radius:14px;padding:24px;max-width:min(560px,calc(100vw - 32px));box-shadow:0 12px 70px #30261735}dialog::backdrop{background:#2b251d66}dialog h2{font-size:23px;margin:0 0 12px}dialog p{font-size:15px}dialog .dialog-actions{display:flex;gap:10px;margin-top:22px}',
    '#reservation-dialog{position:fixed;inset:0;width:100vw;height:100dvh;max-width:none;max-height:none;margin:0;border:0;border-radius:0;padding:0;background:var(--cream);overflow:hidden}',
    '.reservation-shell{height:100%;display:flex;flex-direction:column}.reservation-header{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:18px 28px;background:white;border-bottom:1px solid var(--line)}.reservation-header h2{margin:0;font-size:24px}.reservation-header p{margin:4px 0 0;font-size:14px;color:var(--muted)}',
    '.reservation-scroll{overflow:auto;flex:1;padding:24px 28px}.reservation-grid{display:grid;grid-template-columns:minmax(300px,1.2fr) minmax(300px,1fr);gap:20px;max-width:1400px;margin:auto}.reservation-card{border:1px solid var(--line);border-radius:12px;background:white;padding:20px}.reservation-card h3{font-size:18px;margin:0 0 16px}.reservation-card p{margin:8px 0}.reservation-card label{display:block;font-size:14px}.reservation-card input,.reservation-card select{width:100%;margin-top:5px}.reservation-card .date-columns{gap:16px}.reservation-card textarea{width:100%;min-height:85px;padding:10px;border:1px solid var(--line);border-radius:8px;font:inherit}.reservation-card dl{display:grid;grid-template-columns:1fr auto;gap:10px;font-size:14px}.reservation-card dt,.reservation-card dd{margin:0}.reservation-card dd{text-align:right}.reservation-card .total{font-size:24px;font-weight:700;color:var(--green)}',
    '.reservation-footer{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:12px 28px;background:white;border-top:1px solid var(--line)}.reservation-footer>div:last-child{display:flex;gap:8px;margin-left:auto}.reservation-footer .operation-status{margin:0;max-width:750px}.reservation-pet{padding:10px 0;border-top:1px solid var(--line);font-size:14px}.reservation-pet strong{font-size:16px}.reservation-pet small{display:block;color:var(--muted);margin-top:4px}',
    '.demo-tools{position:fixed;bottom:12px;left:16px;z-index:85;background:white;border:1px solid var(--line);border-radius:9px;font-size:12px;padding:6px 10px;max-width:300px}.demo-tools summary{cursor:pointer}.demo-tools[open]{box-shadow:0 6px 30px #30261725}.demo-tools select{width:100%;font-size:12px;margin:8px 0}.demo-tools button{font-size:12px;margin:4px 2px;padding:5px 8px;min-height:30px}.demo-tools p{margin:7px 0;color:var(--muted)}',
    '.page-status{position:fixed;z-index:65;top:12px;left:50%;transform:translateX(-50%);max-width:650px;background:#fff3cf;border:1px solid #d6bd6a;border-radius:10px;padding:12px 18px;font-size:14px}.page-status button{margin-left:8px}.is-stale .matrix{opacity:.55}',
    '@media(max-width:760px){.reservation-grid{grid-template-columns:1fr}.reservation-scroll{padding:12px}.reservation-header,.reservation-footer{padding:12px}.date-jump span{display:none}.demo-tools{bottom:4px;right:4px}}'
  ].join('\n');
  document.head.append(css);
  css.textContent += '.date-jump{position:relative}.date-jump input{position:absolute;bottom:0;left:0;width:1px;height:1px;min-height:0;padding:0;border:0;opacity:0;pointer-events:none}.date-nav .btn.square{width:28px;min-width:28px;padding:4px;flex:none}.date-nav strong{white-space:nowrap}.date-jump .btn{padding:5px 9px}.panel .reservation-link{width:100%;margin-top:12px;text-decoration:none;font-size:13px}.stay.search-hit{outline:2px solid #97b774;outline-offset:1px;box-shadow:none;filter:none}.stay.search-hit.selected{outline:2px solid var(--green);outline-offset:2px;box-shadow:0 0 0 2px #97b774}.stay.proposal{background:var(--blue-bg)}.stay.green.proposal{background:var(--green-bg)}.stay.yellow.proposal{background:#fff8df}.stay.ghost{background:repeating-linear-gradient(135deg,var(--blue-bg),var(--blue-bg) 4px,#bcd7e6 4px,#bcd7e6 5px)}.stay.green.ghost{background:repeating-linear-gradient(135deg,var(--green-bg),var(--green-bg) 4px,#c7d8b1 4px,#c7d8b1 5px)}.stay.yellow.ghost{background:repeating-linear-gradient(135deg,#fff8df,#fff8df 4px,#e9d68d 4px,#e9d68d 5px)}.stay.proposal .status-badge{background:#3f5f16;color:#fff}';
  $('.date-nav').insertAdjacentHTML('beforeend','<label class="date-jump"><span>Przejdź do</span><input id="jump-date" type="date" aria-label="Przejdź do daty"></label>');
  $('.heading .tools').insertAdjacentHTML('beforeend','<span id="search-summary" class="search-summary" role="status" aria-live="polite"></span>');
  $('.heading .search').after($('#search-summary'));
  $('.date-jump span').remove();
  $('.date-jump').insertAdjacentHTML('afterbegin','<button type="button" class="btn" id="open-jump-date" aria-label="Od — wybierz datę">Od<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 11h18"/></svg></button>');
  $('#jump-date').tabIndex=-1;
  $('#open-jump-date').addEventListener('click',e=>{e.preventDefault();$('#jump-date').showPicker();});
  document.body.insertAdjacentHTML('beforeend',
    '<dialog id="reservation-dialog" aria-labelledby="reservation-title"></dialog>'+
    '<dialog id="leave-dialog" aria-labelledby="leave-title"><h2 id="leave-title">Niezapisane zmiany</h2><p>Masz niezapisane zmiany. Możesz wrócić do edycji albo je odrzucić.</p><div class="dialog-actions"><button class="btn primary" id="keep-editing">Wróć do edycji</button><button class="btn" id="discard-editing">Odrzuć zmiany</button></div></dialog>'+
    '<div id="page-status" class="page-status" role="status" hidden></div>'+
    '<details class="demo-tools"><summary>Scenariusze makiety</summary><p>Symulacja — dane przykładowe, bez backendu.</p><label>Najbliższy zapis<select id="save-scenario"><option value="success">Sukces</option><option value="error">Błąd połączenia</option><option value="conflict">Zmiana innego administratora</option><option value="uncertain">Niepewny wynik zapisu</option><option value="session">Wygasła sesja</option></select></label><button class="btn" data-demo="loading">Ładowanie</button><button class="btn" data-demo="stale">Błąd odświeżenia</button><button class="btn" data-demo="short">Pobyt 2 dni</button><button class="btn" data-demo="split">Podzielony pobyt</button></details>');

  const queryHits = p => !state.query.trim() || (p.name+' '+p.owner).toLocaleLowerCase('pl').includes(state.query.trim().toLocaleLowerCase('pl'));
  function searchFeedback() {
    const q=state.query.trim(), eligible=stays.filter(s=>inWindow(s)&&matches(petById(s.pet))&&(s.box===null||locationMatches(boxes.find(b=>b.id===s.box).loc)));
    const hits=new Set(eligible.filter(s=>queryHits(petById(s.pet))).map(s=>s.pet));
    const hidden=new Set(stays.filter(s=>inWindow(s)&&queryHits(petById(s.pet))&&!eligible.some(e=>e.pet===s.pet)).map(s=>s.pet));
    const queueHits=new Set(eligible.filter(s=>s.box===null&&queryHits(petById(s.pet))).map(s=>s.pet)).size;
    const text=!q?'':(hits.size?'Pasujące koty: '+hits.size+(queueHits?' · bez boksu: '+queueHits:''):'Brak dopasowań')+(hidden.size?' · ukryte filtrami: '+hidden.size:'');
    $('#search-summary').textContent=text;
    $('#search-summary').classList.toggle('no-hits',!!q&&!hits.size);
  }
  renderQueue = function() {
    const pending=stays.filter(s=>s.box===null&&inWindow(s)&&matches(petById(s.pet)));
    const homes=[...new Set(pending.map(s=>petById(s.pet).reservation))];
    const count=new Set(pending.map(s=>s.pet)).size;
    const plural=(n,one,few,many)=>n===1?one:n%10>=2&&n%10<=4&&(n%100<12||n%100>14)?few:many;
    $('#queue-count').textContent=' · '+count+' '+plural(count,'kot','koty','kotów')+' · '+homes.length+' '+plural(homes.length,'dom','domy','domów');
    $('#queue-toggle').setAttribute('aria-expanded',state.queue);$('#queue-body').hidden=!state.queue;
    $('#queue-action-label').textContent=state.queue?'Zwiń':'Pokaż koty';
    $('#queue-body').innerHTML='<div class="households">'+homes.map(id=>{
      const list=pending.filter(s=>petById(s.pet).reservation===id),p=petById(list[0].pet);
      const hit=state.query.trim()&&list.some(s=>queryHits(petById(s.pet)));
      return '<div class="home-card '+(state.query.trim()?(hit?'search-hit':'search-muted'):'')+'" data-home-drag="'+list.map(s=>s.id).join(',')+'"><span class="grip" aria-hidden="true">'+icon('grip')+'</span><h3>'+esc(p.owner)+'</h3><p class="small muted">'+fmt(p.start)+' – '+fmt(p.end)+'</p><div class="home-cats">'+list.map(s=>'<button class="queue-pet '+(state.query.trim()?(petById(s.pet).name.toLocaleLowerCase('pl').includes(state.query.trim().toLocaleLowerCase('pl'))?'search-hit':''):'')+'" data-assign="'+s.id+'">'+esc(petById(s.pet).name)+'</button>').join('')+(list.length>1?'<button class="btn" data-assign="'+list.map(s=>s.id).join(',')+'">Przypisz razem</button>':'')+'</div></div>';
    }).join('')+'</div>';
    searchFeedback();
  };
  const selectedIds = () => state.draft?.ids || [state.selected,...selectedSegments,...(state.companions||[])].filter((id,i,a)=>id&&a.indexOf(id)===i);
  function segmentChoices(s) {
    const list=stays.filter(r=>r.pet===s.pet&&r.box!==null).sort((a,b)=>a.start-b.start);
    const ids=selectedIds();
    return list.map(r=>'<button class="other-pet segment-choice" data-segment="'+r.id+'" aria-pressed="'+ids.includes(r.id)+'"><strong>'+('Gniazdko '+boxes.find(b=>b.id===r.box).loc+' · Box '+r.box)+'<span class="tick">'+(ids.includes(r.id)?'✓':'+')+'</span></strong><small>'+exact(r.start)+' – '+exact(r.end)+'</small></button>').join('');
  }
  function balanceText(r) {return r.paid>r.final?'Nadpłata':r.paid===r.final?'Rozliczona':'Pozostało do zapłaty';}
  const balanceAmount = r => money(Math.abs(r.final-r.paid));
  renderPanel = function() {
    base.renderPanel();
    const s=stays.find(s=>s.id===state.selected);if(!s)return;
    const p=petById(s.pet),r=reservations[p.reservation],d=state.draft;
    if(!d) {
      const sections=$('#panel').querySelectorAll('.panel-section');
      if(sections[1])sections[1].innerHTML='<h4>Lokalizacje pobytu</h4><p class="small muted">Wybierz odcinki do wspólnego przeniesienia.</p>'+segmentChoices(s);
      sections[0].insertAdjacentHTML('beforeend','<div class="detail-line" title="Saldo całej rezerwacji"><span>'+(r.paid>r.final?'Nadpłata':r.paid===r.final?'Opłacona':'Do zapłaty')+'</span><strong>'+balanceAmount(r)+'</strong></div>');
      sections[0].insertAdjacentHTML('beforebegin','<a class="btn secondary reservation-link" href="#rezerwacja/'+p.reservation+'" data-open-reservation="'+p.reservation+'">Pełna karta rezerwacji '+icon('expand')+'</a>');
    } else {
      const unique=distinctPets(d.ids);
      $('#panel .pet-heading h3').innerHTML=unique.map(id=>esc(petById(id).name)).join(' + ')+household(p);
      if(d.ids.filter(id=>stays.find(s=>s.id===id)?.pet===p.id).length>1){
        const section=$('#panel .scope-buttons')?.parentElement;
        if(section)section.innerHTML='<h4>Wybrane odcinki</h4><p class="small muted">Wspólne przeniesienie zachowuje ich terminy.</p>'+segmentChoices(s);
      }
      const controls=$('#panel .panel-actions');
      controls.insertAdjacentHTML('beforebegin','<div class="operation-status" id="move-save-status" role="status">'+(busy?'Zapisywanie zmian…':saveError)+'</div>');
      if(busy||pendingRecovery)controls.querySelectorAll('button').forEach(b=>b.disabled=true);
      if(pendingRecovery)$('#move-save-status').insertAdjacentHTML('beforeend','<button class="btn" data-recover>Sprawdź aktualny stan</button>');
      $('#panel').setAttribute('aria-busy',String(busy));
      $('#panel .panel-scroll').inert=busy||!!pendingRecovery;
    }
  };
  render = function(){base.render();$('#jump-date').value=localInput(state.start).slice(0,10);searchFeedback();document.querySelectorAll('.stay.normal').forEach(el=>el.classList.toggle('selected',selectedIds().includes(el.dataset.stay)));};
  showPanel = function(id){selectedSegments=[];saveError='';base.showPanel(id);};
  startMove = function(ids){
    const all=String(ids).split(',');
    if(all[0]===state.selected)all.push(...selectedSegments,...(state.companions||[]));
    base.startMove([...new Set(all)].join(','));
    state.draft.ids=[...new Set(state.draft.ids)];
    state.draft.version=reservations[petById(stays.find(s=>s.id===state.draft.id).pet).reservation].version;
    saveError='';render();
  };
  // Existing records may retain minute precision; only user-entered UI values use whole hours.
  validateDraft = function(){
    const d=state.draft;if(!d)return '';
    if(d.invalidDate)return 'Wprowadź obie daty.';
    if(!Number.isFinite(d.start)||!Number.isFinite(d.end)||d.start>=d.end)return 'Koniec musi wypadać po początku.';
    if(d.ids.some(id=>{const s=stays.find(s=>s.id===id);if(!s)return true;const r=draftRange(s,d);return r.start<s.start||r.end>s.end||r.start>=r.end;}))return 'Zakres musi mieścić się w wybranych odcinkach.';
    if(!d.target)return 'Wybierz boks docelowy.';
    if(d.ids.every(id=>stays.find(s=>s.id===id).box===d.target))return 'Wybrane odcinki są już w tym boksie.';
    return '';
  };
  targetPicker = function(d,s){
    let html=base.targetPicker(d,s);
    if(d.ids.some(id=>stays.find(r=>r.id===id)?.box!==s.box))html=html.replaceAll(' disabled','').replaceAll('aria-disabled="true"','');
    return html;
  };
  function leave(action) {
    if(busy||pendingRecovery){notify('Najpierw poczekaj na wynik lub sprawdź aktualny stan zapisu.');return;}
    if(!state.draft&&!reservationDraft?.dirty){action();return;}
    pendingLeave=action;dialogReturn=document.activeElement;$('#leave-dialog').showModal();$('#keep-editing').focus();
  }
  function discard(){state.draft=null;selectedSegments=[];saveError='';if(reservationDraft)reservationDraft.dirty=false;}
  function snapshot(){return {pets:structuredClone(pets),stays:structuredClone(stays),reservations:structuredClone(reservations),audit:structuredClone(audit)};}
  function restore(data){pets.splice(0,pets.length,...data.pets);stays=data.stays;reservations=data.reservations;audit=data.audit;}
  function renderCurrent(){render();if(activeReservation)renderReservation();}
  async function persist(id,change,after){
    if(busy||pendingRecovery)return;
    const scenario=$('#save-scenario').value;$('#save-scenario').value='success';
    busy=true;saveError='';renderCurrent();
    await new Promise(resolve=>setTimeout(resolve,650));
    busy=false;
    if(scenario==='error'){saveError='Nie zapisano zmian. Brak połączenia. Twoje wartości zostały zachowane — spróbuj ponownie.';renderCurrent();return;}
    if(scenario==='session'){saveError='Sesja wygasła. Zmiany zachowano. Wznów sesję, aby ponowić zapis.';pendingRecovery=()=>{saveError='Sesja wznowiona w makiecie. Możesz zapisać zachowane zmiany.';renderCurrent();};renderCurrent();return;}
    if(scenario==='conflict'){
      reservations[id].version++;reservations[id].notes='Termin sprawdzony przez administratora Piotra.';
      saveError='Piotr zmienił tę rezerwację. Zapis zablokowany — wczytaj aktualny stan przed ponowną edycją.';
      pendingRecovery=()=>{discard();if(activeReservation)reservationDraft=null;saveError='Wczytano aktualną wersję: '+reservations[id].notes;renderCurrent();notify(saveError);};
      renderCurrent();return;
    }
    const before=snapshot();
    try {change();reservations[id].version++;audit.push({reservation:id,author:'Anna Kowalska',at:exact(TODAY),text:'Zapisano zmianę rezerwacji lub rozmieszczenia.'});}
    catch(error){restore(before);saveError=error.message;renderCurrent();return;}
    if(scenario==='uncertain'){
      const committed=snapshot();restore(before);
      saveError='Brak potwierdzenia zapisu. Nie ponawiaj operacji; sprawdź jej aktualny stan.';
      pendingRecovery=()=>{restore(committed);saveError='';after();notify('Potwierdzono zapis zmian.');};
      renderCurrent();return;
    }
    after();
  }
  saveMove = function(){
    if(validateDraft())return;
    const d=structuredClone(state.draft),id=petById(stays.find(s=>s.id===d.id).pet).reservation;
    if(d.version!==reservations[id].version){saveError='Rezerwacja została zmieniona. Wczytaj aktualny stan.';pendingRecovery=()=>{discard();render();};render();return;}
    persist(id,()=>{
      const next=stays.filter(s=>!d.ids.includes(s.id));
      d.ids.forEach(id=>{const s=stays.find(s=>s.id===id),r=draftRange(s,d);
        if(s.start<r.start)next.push({...s,id:s.pet+'-'+(++serial),end:r.start});
        next.push({...s,id:s.pet+'-'+(++serial),start:r.start,end:r.end,box:d.target});
        if(r.end<s.end)next.push({...s,id:s.pet+'-'+(++serial),start:r.end});
      });
      stays=next;mergeStays();
    },()=>{state.draft=null;state.selected=null;state.companions=[];selectedSegments=[];render();notify('Zapisano rozmieszczenie. Sąsiadujące odcinki zostały połączone.');$('#viewport').focus();});
  };
  function completePlan(id){
    return reservationPets(id).every(p=>{
      const list=stays.filter(s=>s.pet===p.id).sort((a,b)=>a.start-b.start);
      return list.length&&list[0].start===p.start&&list.at(-1).end===p.end&&list.every((s,i)=>s.box!==null&&s.start<s.end&&(!i||list[i-1].end===s.start));
    });
  }
  function reservationFields(prefix,value,label){
    return '<div class="date-column"><label for="'+prefix+'">'+label+'</label><input id="'+prefix+'" type="date" required value="'+localInput(value).slice(0,10)+'"><select id="'+prefix+'-hour" aria-label="'+label+' — godzina">'+Array.from({length:24},(_,h)=>'<option value="'+h+'" '+(h===new Date(value).getUTCHours()?'selected':'')+'>'+String(h).padStart(2,'0')+':00</option>').join('')+'</select></div>';
  }
  function renderReservation(){
    const r=reservations[activeReservation];if(!r)return;
    const list=reservationPets(r.id),p=list[0];
    if(!reservationDraft)reservationDraft={start:p.start,end:p.end,notes:r.notes,version:r.version,dirty:false};
    const d=reservationDraft,canActivate=completePlan(r.id);
    const action=p.status==='Nowa'?'<button class="btn" data-status-change="Aktywna" '+(!canActivate?'disabled':'')+'>Aktywuj rezerwację</button>':p.status==='Aktywna'?'<button class="btn" data-status-change="W hotelu">Przyjmij do hotelu</button>':p.status==='W hotelu'?'<button class="btn" data-status-change="Zakończona">Zakończ pobyt</button>':'';
    const history=audit.filter(a=>a.reservation===r.id);
    const scroll=$('#reservation-dialog .reservation-scroll')?.scrollTop||0;
    $('#reservation-dialog').innerHTML='<div class="reservation-shell"><header class="reservation-header"><div><h2 id="reservation-title">'+esc(list.map(p=>p.name).join(' i '))+' <span class="panel-status '+color(p)+'">'+p.status+'</span></h2><p>'+esc(p.owner)+' · szczegóły rezerwacji <span class="muted">'+r.code+'</span></p></div><button class="btn" id="close-reservation">'+icon('close')+' Zamknij</button></header>'+
      '<div class="reservation-scroll"><div class="reservation-grid"><section class="reservation-card"><h3>Termin pobytu</h3><div class="date-columns">'+reservationFields('reservation-start',d.start,'Przyjazd')+reservationFields('reservation-end',d.end,'Odbiór')+'</div><p class="small muted">Minimum 2 dni. Zmiana terminu obejmie wszystkie koty i ich rozmieszczenie.</p><div id="reservation-overlaps" class="operation-status"></div><h3 style="margin-top:24px">Koty i rozmieszczenie</h3>'+list.map(p=>'<div class="reservation-pet"><strong>'+esc(p.name)+'</strong>'+stays.filter(s=>s.pet===p.id).sort((a,b)=>a.start-b.start).map(s=>'<small>'+(s.box?'Box '+s.box:'Bez przypisanego boksu')+' · '+exact(s.start)+' – '+exact(s.end)+'</small>').join('')+'<small>Żywienie: własna karma · Leki i zdrowie: nie podano · Zachowanie: nie podano</small></div>').join('')+'</section>'+
      '<section class="reservation-card"><h3>Rozliczenie</h3><p class="total">'+balanceAmount(r)+'</p><p>'+balanceText(r)+'</p><dl><dt>Stawka za dzień</dt><dd>'+money(r.rate)+'</dd><dt>Cena wyliczona</dt><dd>'+money(r.calculated)+'</dd><dt>Cena końcowa'+(r.manual?' · korekta ręczna':'')+'</dt><dd>'+money(r.final)+'</dd><dt>Suma wpłat</dt><dd>'+money(r.paid)+'</dd></dl><p class="small muted">Wpłaty otrzymane poza systemem'+(r.paid?' · gotówka, '+money(r.paid):' · brak wpłat')+'</p><h3 style="margin-top:28px">Kontakt</h3><p>'+esc(p.owner)+'</p><p><a href="tel:'+r.phone.replaceAll(' ','')+'">'+r.phone+'</a> · <a href="mailto:'+r.email+'">'+r.email+'</a></p><p class="small muted">Przykładowe dane kontaktowe makiety.</p><label for="reservation-notes">Uwagi administratora</label><textarea id="reservation-notes">'+esc(d.notes)+'</textarea></section>'+
      '<section class="reservation-card"><h3>Obsługa rezerwacji</h3>'+action+(p.status==='Nowa'&&!canActivate?'<p class="operation-status">Przed aktywacją przypisz pełny pobyt każdego kota. Wróć do kalendarza, aby uzupełnić rozmieszczenie.</p>':'')+'<p class="small muted">Dane klienta: zachowane na potrzeby tej rezerwacji. Uwagi klienta: nie podano.</p><h3 style="margin-top:22px">Historia kontaktów i wiadomości</h3><p>Brak notatek kontaktowych.</p><p>Brak wysłanych wiadomości w makiecie.</p></section>'+
      '<section class="reservation-card"><h3>Historia zmian</h3>'+(history.length?history.map(a=>'<p>'+esc(a.text)+'<br><small>'+a.at+' · '+a.author+'</small></p>').join(''):'<p class="muted">Brak zmian w tej sesji makiety.</p>')+'</section></div></div>'+
      '<footer class="reservation-footer"><div id="reservation-save-status" class="operation-status" role="status">'+(busy?'Zapisywanie zmian…':saveError||(!d.dirty?'': 'Niezapisane zmiany'))+(pendingRecovery?'<button class="btn" data-recover>Sprawdź aktualny stan</button>':'')+'</div><div><button class="btn" id="cancel-reservation">Anuluj</button><button class="btn primary" id="save-reservation" '+(busy||pendingRecovery||!d.dirty?'disabled':'')+'>Zapisz zmiany</button></div></footer></div>';
    $('#reservation-dialog .reservation-scroll').scrollTop=scroll;
    $('#reservation-dialog').setAttribute('aria-busy',String(busy));
    $('#reservation-dialog').querySelectorAll('input,select,textarea,[data-status-change]').forEach(el=>{if(busy||pendingRecovery)el.disabled=true;});
    showDateConflicts();
  }
  function resizePlan(p,start,end){
    const rows=stays.filter(s=>s.pet===p.id).sort((a,b)=>a.start-b.start);
    if(rows.length===1&&rows[0].box===null)return [{...rows[0],start,end}];
    const cut=rows.filter(s=>s.start<end&&s.end>start).map(s=>({...s,start:Math.max(s.start,start),end:Math.min(s.end,end)}));
    if(!cut.length){const edge=end<=p.start?rows[0]:rows.at(-1);return [{...edge,start,end}];}
    cut[0].start=start;cut.at(-1).end=end;return cut;
  }
  function showDateConflicts(){
    if(!activeReservation||!reservationDraft)return;
    const {start,end}=reservationDraft;
    if(!Number.isFinite(start)||!Number.isFinite(end)||start>=end)return;
    const changed=reservationPets(activeReservation).flatMap(p=>resizePlan(p,start,end));
    const others=stays.filter(s=>petById(s.pet).reservation!==activeReservation&&s.box!==null&&['Nowa','Aktywna','W hotelu'].includes(petById(s.pet).status));
    const overlaps=others.filter(s=>changed.some(c=>c.box===s.box&&c.start<s.end&&s.start<c.end));
    $('#reservation-overlaps').textContent=overlaps.length?'Nakładające się pobyty: '+[...new Set(overlaps.map(s=>petById(s.pet).name+' · Box '+s.box))].join(', ')+'. Przypisania pozostają dozwolone.':'';
  }
  function openReservation(id,push=true){
    if(!reservations[id])return;
    returnFocus=document.activeElement;activeReservation=id;reservationDraft=null;saveError='';
    renderReservation();if(!$('#reservation-dialog').open)$('#reservation-dialog').showModal();
    if(push)history.pushState({reservation:id},'', '#rezerwacja/'+id);
    $('#close-reservation').focus();
  }
  function closeReservation(updateURL=true){
    $('#reservation-dialog').close();activeReservation=null;reservationDraft=null;saveError='';
    if(updateURL)history.replaceState(null,'',location.pathname+location.search);
    render();(returnFocus?.isConnected?returnFocus:$('#viewport')).focus();
  }
  function saveReservation(){
    const d=reservationDraft,id=activeReservation;
    if(!d||d.invalidDate||!Number.isFinite(d.start)||!Number.isFinite(d.end)||Math.round((Date.parse(localInput(d.end).slice(0,10))-Date.parse(localInput(d.start).slice(0,10)))/DAY)<2){saveError='Wybierz obie daty i godziny. Pobyt musi trwać co najmniej 2 dni (różnica dat).';renderReservation();return;}
    persist(id,()=>{
      if(d.version!==reservations[id].version)throw Error('Dane zmienił inny administrator. Wczytaj aktualną wersję.');
      const list=reservationPets(id),ids=list.map(p=>p.id),changed=list.flatMap(p=>resizePlan(p,d.start,d.end));
      stays=[...stays.filter(s=>!ids.includes(s.pet)),...changed];list.forEach(p=>{p.start=d.start;p.end=d.end;});
      mergeStays();const r=reservations[id];r.notes=d.notes;r.calculated=Math.round((Date.parse(localInput(d.end).slice(0,10))-Date.parse(localInput(d.start).slice(0,10)))/DAY)*r.rate;if(!r.manual)r.final=r.calculated;
    },()=>{reservationDraft=null;saveError='';renderCurrent();notify('Zapisano termin i rozmieszczenie. Kalendarz został zaktualizowany.');});
  }
  resetAll = function(){pets.splice(0,pets.length,...structuredClone(initialPets));initReservations();audit=[];selectedSegments=[];saveError='';base.resetAll();};
  $('#jump-date').addEventListener('change',e=>{const value=parseInput(e.target.value+'T00:00');if(Number.isFinite(value)){state.start=value;render();resetScroll();}});
  $('#save-scenario').addEventListener('change',()=>$('.demo-tools').open=false);
  $('#search').addEventListener('input',()=>{
    if(state.query.trim()&&stays.some(s=>s.box===null&&inWindow(s)&&matches(petById(s.pet))&&queryHits(petById(s.pet))))state.queue=true;
    renderQueue();
    const hit=$('#queue-body .search-hit');if(hit)hit.scrollIntoView({block:'nearest',inline:'nearest'});
  });
  document.addEventListener('change',e=>{
    if(!e.target.closest('#reservation-dialog')||!reservationDraft)return;
    if(e.target.id==='reservation-notes')reservationDraft.notes=e.target.value;
    else if(e.target.id.startsWith('reservation-start')||e.target.id.startsWith('reservation-end')){
      const key=e.target.id.startsWith('reservation-start')?'start':'end';
      const value=parseInput($('#reservation-'+key).value+'T'+String($('#reservation-'+key+'-hour').value).padStart(2,'0')+':00');
      if(!Number.isFinite(value)){reservationDraft.dirty=true;reservationDraft.invalidDate=true;saveError='Wprowadź datę '+(key==='start'?'przyjazdu.':'odbioru.');$('#reservation-save-status').textContent=saveError;$('#save-reservation').disabled=true;return;}
      reservationDraft[key]=value;
      reservationDraft.invalidDate=!$('#reservation-start').value||!$('#reservation-end').value;
    }
    reservationDraft.dirty=true;saveError='';$('#save-reservation').disabled=!!reservationDraft.invalidDate;$('#reservation-save-status').textContent=reservationDraft.invalidDate?'Wprowadź obie daty.':'Niezapisane zmiany';showDateConflicts();
  });
  // Capture only transitions which would otherwise silently discard an edit.
  document.addEventListener('click',e=>{
    const b=e.target.closest('button,a');if(!b)return;
    if(b.id==='keep-editing'){e.stopImmediatePropagation();$('#leave-dialog').close();dialogReturn?.focus();pendingLeave=null;return;}
    if(b.id==='discard-editing'){e.stopImmediatePropagation();$('#leave-dialog').close();discard();const next=pendingLeave;pendingLeave=null;next?.();return;}
    if(b.hasAttribute('data-recover')){e.stopImmediatePropagation();const recover=pendingRecovery;pendingRecovery=null;recover?.();return;}
    if(b.dataset.segment){
      e.stopImmediatePropagation();const id=b.dataset.segment;
      if(id===state.selected)return;
      if(state.draft){const d=state.draft;d.ids=d.ids.includes(id)?d.ids.filter(x=>x!==id):[...d.ids,id];d.scope='whole';}
      else selectedSegments=selectedSegments.includes(id)?selectedSegments.filter(x=>x!==id):[...selectedSegments,id];
      render();document.querySelector('[data-segment="'+id+'"]')?.focus();return;
    }
    if(b.dataset.openReservation){e.preventDefault();e.stopImmediatePropagation();leave(()=>openReservation(b.dataset.openReservation));return;}
    if(b.id==='save-reservation'){e.stopImmediatePropagation();saveReservation();return;}
    if(['cancel-reservation','cancel-move','cancel-assignment'].includes(b.id)){if(busy||pendingRecovery){e.stopImmediatePropagation();leave(()=>{});return;}discard();if(b.id==='cancel-reservation'){e.stopImmediatePropagation();closeReservation();return;}}
    if(b.id==='close-reservation'){e.stopImmediatePropagation();leave(()=>closeReservation());return;}
    if(b.dataset.statusChange){
      e.stopImmediatePropagation();leave(()=>{const id=activeReservation;persist(id,()=>{if(b.dataset.statusChange==='Aktywna'&&!completePlan(id))throw Error('Uzupełnij plan wszystkich kotów.');reservationPets(id).forEach(p=>p.status=b.dataset.statusChange);},()=>{reservationDraft=null;renderCurrent();notify('Zmieniono status rezerwacji.');});});return;
    }
    if(b.dataset.demo){e.stopImmediatePropagation();leave(()=>demo(b.dataset.demo));return;}
    const dropping=['close-panel','reset'].includes(b.id)||b.dataset.stay&&b.dataset.kind!=='proposal'||b.dataset.assign||b.matches('.nav-item');
    if(dropping&&(state.draft||busy||pendingRecovery)&&!approvedNavigation){
      e.preventDefault();e.stopImmediatePropagation();leave(()=>{approvedNavigation=true;b.click();approvedNavigation=false;});return;
    }
  },true);
  document.addEventListener('pointerdown',e=>{
    if(busy||pendingRecovery){if(e.target.closest('.stay,.home-card,#panel')){e.stopImmediatePropagation();e.preventDefault();}return;}
    if(state.draft&&e.target.closest('.stay.normal,.home-card')){
      const card=e.target.closest('.stay.normal');
      if(card?.dataset.stay===state.draft.id)return;
      e.stopImmediatePropagation(); // Clicking is handled by the leave guard; dragging cannot discard the draft.
    }
  },true);
  document.addEventListener('keydown',e=>{
    if(e.key!=='Escape')return;
    if($('#leave-dialog').open){e.preventDefault();e.stopImmediatePropagation();$('#leave-dialog').close();pendingLeave=null;dialogReturn?.focus();return;}
    if(activeReservation){e.preventDefault();e.stopImmediatePropagation();leave(()=>closeReservation());return;}
    if(state.draft&&!drag&&$('#target-options')?.hidden){e.preventDefault();e.stopImmediatePropagation();leave(()=>closePanel());}
  },true);
  $('#reservation-dialog').addEventListener('cancel',e=>{e.preventDefault();leave(()=>closeReservation());});
  window.addEventListener('beforeunload',e=>{if(state.draft||reservationDraft?.dirty||busy||pendingRecovery){e.preventDefault();e.returnValue='';}});
  window.addEventListener('popstate',()=>{
    const id=decodeURIComponent(location.hash.replace('#rezerwacja/',''));
    if(state.draft||reservationDraft?.dirty||busy||pendingRecovery){
      const old=activeReservation;history.pushState(null,'',old?'#rezerwacja/'+old:location.pathname+location.search);
      leave(()=>{if(reservations[id])openReservation(id);else closeReservation();});return;
    }
    if(reservations[id])openReservation(id,false);else if(activeReservation)closeReservation(false);
  });
  function demo(mode){
    $('.demo-tools').open=false;
    if(mode==='short'){resetAll();const p=petById('misza');p.end=dt(11,10);stays.find(s=>s.pet===p.id).end=p.end;initReservations();render();notify('Misza: krótki pobyt 9–11 września.');return;}
    if(mode==='split'){resetAll();const s=stays.find(s=>s.pet==='luna');stays=stays.filter(r=>r!==s);stays.push({...s,end:dt(11,9)},{...s,id:'luna-middle',start:dt(11,9),end:dt(13,9),box:2},{...s,id:'luna-last',start:dt(13,9),box:3});render();showPanel('luna');notify('Wybierz karty lokalizacji Luny, aby przenieść je wspólnie.');return;}
    const banner=$('#page-status');banner.hidden=false;
    if(mode==='loading'){banner.textContent='Wczytywanie kalendarza…';$('#workspace').inert=true;$('#workspace').setAttribute('aria-busy','true');setTimeout(()=>{banner.hidden=true;$('#workspace').inert=false;$('#workspace').removeAttribute('aria-busy');},900);}
    else{document.body.classList.add('is-stale');$('#workspace').inert=true;banner.innerHTML='Nie udało się odświeżyć danych. Widoczny plan może być nieaktualny. <button class="btn" id="retry-load">Odśwież</button>';$('#retry-load').onclick=()=>{banner.hidden=true;document.body.classList.remove('is-stale');$('#workspace').inert=false;render();};}
  }
  render();
  const direct=decodeURIComponent(location.hash.replace('#rezerwacja/',''));
  if(reservations[direct])openReservation(direct,false);
})();
