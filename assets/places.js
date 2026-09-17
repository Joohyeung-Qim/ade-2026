'use strict';
(() => {
 // Original four addresses checked 2026-09-13; 11 additions checked 2026-09-15.
 // Address sources and conversation provenance: docs/amsterdam-restaurants.md.
 // Coordinates: PDOK address centroids; Scheepskameel's building position:
 // https://mapcarta.com/N4470032578 (the street entrance is farther south).
 const home = {name:'Somin’s home', address:'Van Boetzelaerstraat 68-2, Amsterdam', lat:52.38238603, lon:4.87211356};
 const places = [
  {id:'scheepskameel',name:'Scheepskameel',category:'restaurant',area:'Marineterrein',description:'Marineterrein 안에서 저녁 식사.',address:'Kattenburgerstraat 7, gebouw 24, Amsterdam',lat:52.3755,lon:4.91427,website:'https://scheepskameel.nl/en/',note:'Kattenburgerstraat 입구에서 건물 24로 이동. 입구는 공식 방문 안내도 함께 확인하세요.',arrival:'https://scheepskameel.nl/en/directions/',label:[-7,-29]},
  {id:'rijsel',name:'Rijsel',category:'restaurant',area:'Amsterdam-Oost',description:'프랑스 요리와 플랑드르 스타일의 저녁 식사.',address:'Marcusstraat 52B, Amsterdam',lat:52.35160283,lon:4.91292195,website:'https://rijsel.com/',label:[-2,36]},
  {reservationDetails:[{"label":"신청 내역","text":"Stern 저녁 식사"},{"label":"날짜 및 시간","text":"2026년 10월 23일 금요일 오후 7:00 · 암스테르담 현지 시간"},{"label":"인원","text":"4명"},{"label":"예약자명","text":"JC Yoo"},{"label":"전화번호","text":"+44 7470 818019"},{"label":"이메일","text":"jyjc5128@naver.com"},{"label":"대기 안내","text":"대기 등록 완료. 테이블에 자리가 생기는 즉시 연락드립니다. 예약 확정 전입니다."},{"label":"확인 이메일","text":"jyjc5128@naver.com으로 확인 이메일이 발송됩니다. 보이지 않으면 스팸함 또는 정크 메일함을 확인해 주세요."}],reservationSummary:'10/23 (금) 19:00 · 4명 · 대기 등록 완료',id:'stern',name:'Weinlokal Stern',category:'restaurant',area:'Singel',description:'독일 비스트로 요리와 와인.',address:'Singel 210, Amsterdam',lat:52.37383073,lon:4.88857808,website:'https://www.weinlokalstern.nl/',label:[0,36]},
  {id:'entrepot',name:'Restaurant Entrepot',category:'restaurant',area:'Entrepotdok',description:'네덜란드 제철 식재료를 사용하는 레스토랑.',address:'Entrepotdok 7-8, Amsterdam',lat:52.36965508,lon:4.91190669,website:'https://restaurantentrepot.nl/',label:[36,36]},
  {"id": "kamer", "name": "Kamer", "category": "restaurant", "area": "Jordaan", "address": "Westerstraat 266, Amsterdam", "website": "https://www.instagram.com/kamer.bar/", "description": "저녁 식사와 와인.", "meal": "저녁", "note": "대화 속 추천: 여행 중 가장 마음에 들었던 식사.", "lat": 52.37788891, "lon": 4.87968512, "label": [0, 36]},
  {"id": "kikkie", "name": "Kikkie", "category": "restaurant", "area": "Jordaan", "address": "Prinsenstraat 30, Amsterdam", "website": "https://kikkie.amsterdam/", "description": "버거·스낵·와인, 운하 옆 식사.", "meal": "저녁", "note": "대화 속 추천: 버거와 운하 옆 야외 좌석.", "lat": 52.37802596, "lon": 4.88654202, "label": [0, 36]},
  {"id": "sjefietshe", "name": "Sjefietshé", "category": "restaurant", "area": "De Pijp", "address": "Van Ostadestraat 1, Amsterdam", "website": "https://sjefietshe.nl/", "description": "세비체와 해산물 요리.", "meal": "저녁", "note": "대화 속 추천: Hotdoctopus. 메뉴는 방문 전 확인.", "lat": 52.35164929, "lon": 4.8870891, "label": [0, 36]},
  {"id": "montys", "name": "Monty’s", "category": "restaurant", "area": "Jordaan", "address": "Eerste Anjeliersdwarsstraat 16, Amsterdam", "website": "https://www.montysamsterdam.com/", "description": "토스티·그릴드 샌드위치로 가벼운 점심.", "meal": "점심", "note": "대화 속 추천: 김치 토스티·처트니 메뉴.", "lat": 52.37801256, "lon": 4.88338463, "label": [0, 36]},
  {"id": "predetarier", "name": "De Predetariër", "category": "restaurant", "area": "De Pijp", "address": "Gerard Doustraat 180H, Amsterdam", "website": "https://depredetarier.com/en", "description": "샌드위치와 델리.", "meal": "점심", "note": "De Pijp 지점 기준. Oud-West 지점은 De Clercqstraat 23–25.", "lat": 52.35634852, "lon": 4.89534448, "label": [0, 36]},
  {"id": "bottleshop", "name": "Bottle Shop", "category": "bar", "area": "Amsterdam-Oost", "address": "Wibautstraat 130, Amsterdam", "website": "https://www.bottleshopams.nl/", "description": "와인과 함께 들르기 좋은 바.", "meal": "술 / 와인", "note": "대화 속 추천: 취향을 말하고 와인을 추천받기.", "lat": 52.35460231, "lon": 4.91153484, "label": [0, 36]},
  {"id": "dilettante", "name": "La Dilettante", "category": "bar", "area": "De Pijp", "address": "Saenredamstraat 37, Amsterdam", "website": "https://ladilettante.amsterdam/", "description": "내추럴 와인과 가벼운 안주.", "meal": "술 / 와인", "note": "워크인 방문.", "lat": 52.35584333, "lon": 4.88845101, "label": [0, 36]},
  {"id": "brecht", "name": "Café Brecht", "category": "bar", "area": "Weteringschans", "address": "Weteringschans 157, Amsterdam", "website": "https://www.cafebrecht.nl/contact", "description": "카페·바에서 한잔하며 쉬기.", "meal": "술 / 와인", "note": "대화에서 추천한 술집.", "lat": 52.3598227, "lon": 4.89006514, "label": [0, 36]},
  {"id": "winkel43", "name": "Winkel 43", "category": "cafe", "area": "Jordaan", "address": "Noordermarkt 43, Amsterdam", "website": "https://www.winkel43.nl/", "description": "더치 애플파이와 커피.", "meal": "디저트", "note": "대화 속 추천: 애플파이.", "lat": 52.37908515, "lon": 4.88622164, "label": [0, 36]},
  {"id": "bunbun", "name": "BunBun", "category": "cafe", "area": "Jordaan", "address": "Prinsengracht 16, Amsterdam", "website": "https://www.bunbun.amsterdam/", "description": "번과 함께 가볍게 먹는 디저트.", "meal": "디저트", "note": "대화 속 추천: 시나몬번.", "lat": 52.37882564, "lon": 4.88648893, "label": [0, 36]},
  {"id": "dejaren", "name": "Café de Jaren", "category": "cafe", "area": "Centrum", "address": "Nieuwe Doelenstraat 20, Amsterdam", "website": "https://cafedejaren.nl/", "description": "물가 테라스가 있는 카페.", "meal": "아침", "note": "아침이나 낮에 쉬어가기.", "lat": 52.36805954, "lon": 4.89534679, "label": [0, 36]}
 ];
 const $ = s => document.querySelector(s);
 const esc = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const normalize = value => value.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
 const searchURL = p => 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(p.name+' '+p.address);
 const routeURL = p => 'https://www.google.com/maps/dir/?api=1&origin='+encodeURIComponent(home.address)+'&destination='+encodeURIComponent(p.name+' '+p.address);
 const link = (url,label) => '<a href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+label+' ↗</a>';
 const reservation = p => p.reservationDetails ? '<p class="places-reservation">'+esc(p.reservationSummary)+'</p><details class="event-details"><summary>상세보기 <span aria-hidden="true">+</span></summary><div class="details-body">'+p.reservationDetails.map(row=>'<div class="detail-line"><span>'+esc(row.label)+'</span><p>'+esc(row.text)+'</p></div>').join('')+'</div></details>' : '';
 const links = p => link(searchURL(p),'Google Maps')+link(routeURL(p),'숙소에서 길찾기')+link(p.website,'공식 사이트');
 // Local equirectangular projection: north up, 88 SVG units per kilometre.
 const project = p => ({x:66+(p.lon-home.lon)*111.32*Math.cos(home.lat*Math.PI/180)*88,y:70+(home.lat-p.lat)*111.32*88});
 const distance = p => {const point=project(p);return (Math.hypot(point.x-66,point.y-70)/88).toFixed(1);};
 const categoryNames={restaurant:'RESTAURANT',cafe:'CAFÉ / DESSERT',bar:'BAR / WINE',sight:'TO EXPLORE'};
 const number = p => String(places.indexOf(p)+1).padStart(2,'0');
 const direction = p => {const angle=Math.atan2((p.lon-home.lon)*Math.cos(home.lat*Math.PI/180),p.lat-home.lat)*180/Math.PI;return ['북쪽','북동쪽','동쪽','남동쪽','남쪽','남서쪽','서쪽','북서쪽'][(Math.round(angle/45)+8)%8];};
 // Spread nearby numbered markers, keeping a small dot at each address position.
 const markerPoints=new Map(), occupied=[{x:66,y:70}];
 places.forEach(p=>{
  const origin=project(p);let marker=origin;
  search: for(let radius=0;radius<=160;radius+=8){
   for(let step=0;step<24;step++){
    const angle=step*Math.PI/12,point={x:origin.x+Math.cos(angle)*radius,y:origin.y+Math.sin(angle)*radius};
    if(point.x<25||point.x>395||point.y<108||point.y>415)continue;
    if(occupied.every(other=>Math.hypot(other.x-point.x,other.y-point.y)>=42)){marker=point;break search;}
   }
  }
  markerPoints.set(p.id,marker);occupied.push(marker);
 });
 $('.places-total').textContent=places.length+' places';
 document.querySelectorAll('[data-place-category]').forEach(button=>{button.querySelector('span').textContent=places.filter(p=>button.dataset.placeCategory==='all'||p.category===button.dataset.placeCategory).length;});
 const svg = $('#placesMap');
 const search = $('#placesSearch');
 let category='all', selected=null;
 function visiblePlaces(){const q=normalize(search.value);return places.filter(p=>(category==='all'||p.category===category)&&normalize(p.name+' '+p.area+' '+p.address+' '+p.description+' '+(p.meal||'')+' '+(p.note||'')).includes(q));}
 function renderMap(visible){
  let content='<g aria-hidden="true"><circle class="places-ring" cx="66" cy="70" r="88"/><circle class="places-ring" cx="66" cy="70" r="176"/><circle class="places-ring" cx="66" cy="70" r="264"/><text class="places-ring-label" x="17" y="164">1 km</text><text class="places-ring-label" x="17" y="252">2 km</text><text class="places-ring-label" x="17" y="340">3 km</text><text class="places-ring-label" x="380" y="30">N ↑</text></g>';
  visible.forEach(p=>{const point=project(p);content+='<path aria-hidden="true" class="places-connection'+(selected===p.id?' selected':'')+'" d="M66 70 L'+point.x+' '+point.y+'"/>';});
  content+='<g><image href="./assets/somin-cat.svg" x="46" y="50" width="40" height="40" aria-hidden="true"/><text x="94" y="68" class="places-label places-home-label">Somin’s home</text><text x="94" y="87" class="places-ring-label">숙소 · 출발점</text></g>';
  visible.forEach(p=>{
   const origin=project(p),point=markerPoints.get(p.id);
   content+='<g class="places-pin" role="button" tabindex="0" data-places-pin="'+p.id+'" aria-label="'+esc(p.name)+' 위치 보기" aria-pressed="'+(selected===p.id)+'"><title>'+esc(p.name)+'</title><path class="places-pin-leader" d="M'+origin.x+' '+origin.y+' L'+point.x+' '+point.y+'"/><circle class="places-address-dot" cx="'+origin.x+'" cy="'+origin.y+'" r="2.5"/><circle class="places-hit" cx="'+point.x+'" cy="'+point.y+'" r="21"/><circle class="places-focus" cx="'+point.x+'" cy="'+point.y+'" r="20"/><circle class="places-marker" cx="'+point.x+'" cy="'+point.y+'" r="18"/><text class="places-number" x="'+point.x+'" y="'+point.y+'">'+number(p)+'</text></g>';

  });
  svg.innerHTML=content;
 }
 function select(id){
  selected=id;
  document.querySelectorAll('[data-places-pin],[data-place-select]').forEach(el=>el.setAttribute('aria-pressed',String((el.dataset.placesPin||el.dataset.placeSelect)===id)));
  const paths=svg.querySelectorAll('.places-connection');visiblePlaces().forEach((p,i)=>paths[i].classList.toggle('selected',p.id===id));
  const place=places.find(p=>p.id===id);
  $('#placesSelection').innerHTML=place?'<small>'+number(place)+' / '+esc(place.area)+'</small><strong>'+esc(place.name)+'</strong><p>숙소에서 직선 약 '+distance(place)+' km · '+direction(place)+'</p><div class="places-links">'+link(searchURL(place),'Google Maps')+link(routeURL(place),'숙소에서 길찾기')+'</div>':'<small>HOME BASE</small><strong>Somin’s home</strong><p>'+esc(home.address)+'</p><div class="places-links">'+link('https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(home.address),'숙소 Google Maps')+'</div>';
 }
 function render(){
  const visible=visiblePlaces();
  if(!visible.some(p=>p.id===selected))selected=null;
  renderMap(visible);
  $('#placesList').innerHTML=visible.map(p=>'<article class="places-card" id="place-'+p.id+'"><div class="places-card-heading"><div><small>'+esc(categoryNames[p.category]||p.category)+' / '+esc(p.area)+'</small><h3>'+esc(p.name)+'</h3></div><button type="button" data-place-select="'+p.id+'" aria-label="'+esc(p.name)+' 지도에서 보기" aria-pressed="'+(selected===p.id)+'">'+number(p)+'</button></div><p>'+esc(p.description)+'</p><p>'+esc(p.address)+'</p><p class="places-distance">숙소에서 직선 약 '+distance(p)+' km · '+direction(p)+'</p>'+(p.note?'<p class="places-arrival">'+esc(p.note)+'</p>':'')+'<div class="places-links">'+links(p)+(p.arrival?link(p.arrival,'입구 안내'):'')+'</div>'+reservation(p)+'</article>').join('');
  $('#placesResult').textContent=visible.length+'개 장소'+(selected?' · 지도에서 선택됨':' · 번호를 누르면 지도에 표시');
  $('#placesEmpty').hidden=visible.length>0;
  const emptyCategory=category==='sight'&&!search.value.trim();
  $('#placesEmptyTitle').textContent=emptyCategory?'가볼 곳을 모아둘 자리.':'일치하는 장소가 없어요.';
  $('#placesEmptyText').textContent=emptyCategory?'가고 싶은 명소가 생기면 이곳에 하나씩 추가할 예정이에요.':'다른 이름이나 지역으로 검색해 보세요.';
  select(selected);
 }
 svg.addEventListener('click',e=>{const pin=e.target.closest('[data-places-pin]');if(pin)select(pin.dataset.placesPin);});
 svg.addEventListener('keydown',e=>{const pin=e.target.closest('[data-places-pin]');if(pin&&(e.key==='Enter'||e.key===' ')){e.preventDefault();select(pin.dataset.placesPin);}});
 $('#placesList').addEventListener('click',e=>{const button=e.target.closest('[data-place-select]');if(!button)return;select(button.dataset.placeSelect);$('.places-map-column').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});});
 document.querySelectorAll('[data-place-category]').forEach(button=>button.addEventListener('click',()=>{category=button.dataset.placeCategory;document.querySelectorAll('[data-place-category]').forEach(el=>el.setAttribute('aria-pressed',String(el===button)));render();}));
 search.addEventListener('input',render);
 function reset(){category='all';selected=null;search.value='';document.querySelectorAll('[data-place-category]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.placeCategory==='all')));render();}
 $('#placesReset').addEventListener('click',reset);
 $('#placesMapReset').addEventListener('click',reset);
 function syncNav(){document.querySelectorAll('.mobile-section-nav a').forEach(a=>{if(a.hash===(location.hash||'#program'))a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}
 window.addEventListener('hashchange',syncNav);syncNav();
 if('IntersectionObserver' in window)new IntersectionObserver(entries=>document.body.classList.toggle('places-in-view',entries[0].isIntersecting),{rootMargin:'-140px 0px 0px 0px'}).observe($('#places'));
 render();
})();
