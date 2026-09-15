/* Shares the calendar's full reservation screen; no duplicate reservation editor. */
(() => {
  const style=document.createElement('style');
  style.textContent=`
    body{font-size:14px;line-height:1.4}.sidebar{width:208px;transform:none}.main{margin-left:208px}.brand{height:86px;padding:16px}.brand-name{font-size:18px}.brand-name small{font-size:9px}.nav-scroll{padding:0 12px 12px}.nav-group{margin-top:12px}.nav-label{font-size:10px;margin-bottom:4px}.nav-item{min-height:34px;padding:5px 10px;font-size:13px;gap:9px}.profile{padding:10px 0;font-size:12px}.profile-text small{font-size:11px}.avatar{width:30px;height:30px}.topbar{height:36px;padding:0 16px;font-size:12px}.content{padding:12px 16px;max-width:none}.mobile-menu{display:none}
    h1{font-size:24px}h2{font-size:18px}h3{font-size:15px}.page-heading{margin-bottom:10px;gap:12px}.page-heading p{font-size:13px}.heading-actions{gap:8px}.btn,.location{min-height:34px;padding:5px 10px;font-size:14px;border-radius:6px}.btn{font-weight:600}.icon-button{width:30px;height:30px}.btn .icon,button .icon,.row-action .icon{width:14px;height:14px}.small,.subline{font-size:12px}.text-link{font-size:13px;padding:4px 0}
    .stats{gap:10px;margin-bottom:12px}.stat{padding:10px 12px;border-radius:8px}.stat-top{font-size:13px}.stat-icon{width:24px;height:24px}.stat-number{font-size:28px;margin-top:3px}.stat-number span{font-size:13px}.stat-bottom{font-size:12px;margin-top:3px}.card{border-radius:8px}.section-head{padding:12px 14px 8px}.section-head p{font-size:12px}.count{min-width:20px;height:20px;font-size:11px;padding:0 5px}.schedule{margin-bottom:12px}.schedule-tools{padding:0 14px 8px;gap:8px}.tabs{padding:2px}.tab{min-height:28px;padding:4px 9px;font-size:13px}.tab small{font-size:11px}
    .table-wrap table{min-width:0;font-size:13px}th{font-size:11px;padding:6px 9px}td{padding:8px 9px}th:first-child,td:first-child{padding-left:14px}th:last-child,td:last-child{padding-right:14px}.time{font-size:15px}.event{font-size:12px}.cat-avatar{display:none}.guest-name{font-size:15px}.badge{font-size:11px;padding:2px 6px}.money{font-size:12px}.row-action{font-size:12px;min-height:30px;padding:4px 8px}.table-footer{padding:7px 14px;font-size:11px}
    .two-col{grid-template-columns:1.3fr 1fr;gap:12px;margin-bottom:12px}.request{padding:9px 14px;gap:8px}.request:before{top:10px;bottom:10px}.request-top{gap:6px;margin-bottom:2px}.request-top strong{font-size:15px}.request-bottom,.request-right small{font-size:12px}.request-right .text-link{font-size:12px;min-height:28px}.box-note{font-size:12px;margin-top:2px}.hotel-summary{margin:0 14px 8px;padding:10px;gap:10px}.hotel-summary>svg{width:28px;height:28px}.hotel-number{font-size:23px}.hotel-number span{font-size:14px}.hotel-summary p{font-size:12px}.hotel-list{padding:0 14px}.hotel-location{padding:7px 0;font-size:13px}.hotel-location span,.hotel-footer,.hotel-footer .text-link{font-size:12px}.hotel-footer{margin:5px 14px 0;padding:7px 0}
    .week{margin-bottom:12px}.week-grid{padding:0 14px 12px;gap:7px}.day{min-height:94px;padding:7px 9px}.day-label,.day-count{font-size:12px}.day-date{font-size:20px;margin:0 0 4px}.day-date span{font-size:11px}.legend{display:flex;font-size:11px}.bottom-col{gap:12px}.attention-item{margin:0 14px;padding:9px 0;gap:8px}.attention-item h3{font-size:13px}.attention-item p{font-size:12px;margin-top:2px}.attention-symbol{width:24px;height:24px}.settlement-row{margin:0 14px;padding:9px 0}.settlement-row .guest-name{font-size:14px}.settlement-row .subline,.settlement-value small{font-size:12px}.settlement-value{font-size:15px}.footer{font-size:11px;margin-top:12px}.drawer-heading,.drawer-content{padding:14px}.drawer-heading h2{font-size:18px}.list-record{padding:10px 0}.search-input{min-height:34px;padding:5px 9px;font-size:14px}
    #full-reservation{position:fixed;inset:0;width:100vw;height:100dvh;max-width:none;max-height:none;margin:0;padding:0;border:0;background:var(--page)}#full-reservation iframe{display:block;width:100%;height:100%;border:0}#full-reservation::backdrop{background:#30271f55}
    @media(max-width:900px){.sidebar{width:170px}.main{margin-left:170px}.content{padding:10px}.table-wrap table{min-width:760px}.two-col,.bottom-col{grid-template-columns:1fr}.week-grid{overflow:auto;grid-template-columns:repeat(7,minmax(100px,1fr))}}
  `;
  document.head.append(style);
  document.body.insertAdjacentHTML('beforeend','<dialog id="full-reservation" aria-label="Pełna karta rezerwacji"><iframe title="Pełna karta rezerwacji" id="reservation-frame"></iframe></dialog>');
  const modal=document.querySelector('#full-reservation'),frame=document.querySelector('#reservation-frame');
  const targetOrigin=location.protocol==='file:'?'*':location.origin;
  let ready=false,initialized=false,current=null,focusSource=null,sourceReservation=null;
  const send=message=>frame.contentWindow.postMessage(message,targetOrigin);
  function display(id,push=true){
    if(!byId(id))return;
    focusSource=document.activeElement;sourceReservation=focusSource?.dataset.detail;current=id;
    document.querySelector('#drawer').close();
    if(!modal.open)modal.showModal();
    if(push)history.pushState(null,'','#rezerwacja/'+encodeURIComponent(id));
    if(!frame.getAttribute('src'))frame.src='../kalendarz/mockup-kalendarz.html?surface=dashboard';
    else if(ready){send(initialized?{type:'kg-reservation-open',id}:{type:'kg-reservation-init',records,id});initialized=true;}
  }
  detail=display;
  window.addEventListener('message',e=>{
    if(e.source!==frame.contentWindow || (location.protocol!=='file:'&&e.origin!==location.origin))return;
    if(e.data?.type==='kg-reservation-ready'){ready=true;send({type:'kg-reservation-init',records,id:current});initialized=true;}
    if(e.data?.type==='kg-reservation-closed'){
      e.data.records.forEach(update=>{const r=byId(update.id);if(!r)return;Object.assign(r,update);r.type=r.start===8?'arrival':r.end===8?'departure':null;r.time=(r.type==='departure'?r.endDate:r.startDate).slice(11,16);r.done=r.type==='arrival'?['W hotelu','Zakończona'].includes(r.status):r.status==='Zakończona';});
      modal.close();current=null;history.replaceState(null,'',location.pathname+location.search);render();
      const restored=focusSource?.isConnected?focusSource:[...document.querySelectorAll('[data-detail]')].find(el=>el.dataset.detail===sourceReservation);
      (restored||document.querySelector('#main-content h1')).focus({preventScroll:true});
    }
  });
  modal.addEventListener('cancel',e=>{e.preventDefault();send({type:'kg-reservation-close'});});
  window.addEventListener('popstate',()=>{const id=decodeURIComponent(location.hash.replace('#rezerwacja/',''));if(modal.open){history.replaceState(null,'','#rezerwacja/'+encodeURIComponent(current));send({type:'kg-reservation-close'});}else if(byId(id))display(id,false);});
  document.querySelector('#main-content h1').tabIndex=-1;
  const direct=decodeURIComponent(location.hash.replace('#rezerwacja/',''));if(byId(direct))display(direct,false);
})();
