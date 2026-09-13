'use strict';
(() => {
 // Addresses checked against each official website on 2026-09-13.
 // Coordinates: PDOK address centroids; Scheepskameel's building position:
 // https://mapcarta.com/N4470032578 (the street entrance is farther south).
 const home = {name:'Somin’s home', address:'Van Boetzelaerstraat 68-2, Amsterdam', lat:52.38238603, lon:4.87211356};
 const places = [
  {id:'scheepskameel',name:'Scheepskameel',category:'restaurant',area:'Marineterrein',description:'Marineterrein 안에서 저녁 식사.',address:'Kattenburgerstraat 7, gebouw 24, Amsterdam',lat:52.3755,lon:4.91427,website:'https://scheepskameel.nl/en/',note:'Kattenburgerstraat 입구에서 건물 24로 이동. 입구는 공식 방문 안내도 함께 확인하세요.',arrival:'https://scheepskameel.nl/en/directions/',label:[-7,-29]},
  {id:'rijsel',name:'Rijsel',category:'restaurant',area:'Amsterdam-Oost',description:'프랑스 요리와 플랑드르 스타일의 저녁 식사.',address:'Marcusstraat 52B, Amsterdam',lat:52.35160283,lon:4.91292195,website:'https://rijsel.com/',label:[-2,36]},
  {id:'stern',name:'Weinlokal Stern',category:'restaurant',area:'Singel',description:'독일 비스트로 요리와 와인.',address:'Singel 210, Amsterdam',lat:52.37383073,lon:4.88857808,website:'https://www.weinlokalstern.nl/',label:[0,36]},
  {id:'entrepot',name:'Restaurant Entrepot',category:'restaurant',area:'Entrepotdok',description:'네덜란드 제철 식재료를 사용하는 레스토랑.',address:'Entrepotdok 7-8, Amsterdam',lat:52.36965508,lon:4.91190669,website:'https://restaurantentrepot.nl/',label:[36,36]}
 ];
 const $ = s => document.querySelector(s);
 const esc = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const normalize = value => value.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
 const searchURL = p => 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(p.name+' '+p.address);
 const routeURL = p => 'https://www.google.com/maps/dir/?api=1&origin='+encodeURIComponent(home.address)+'&destination='+encodeURIComponent(p.name+' '+p.address);
 const link = (url,label) => '<a href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+label+' ↗</a>';
 const links = p => link(searchURL(p),'Google Maps')+link(routeURL(p),'숙소에서 길찾기')+link(p.website,'공식 사이트');
 // Local equirectangular projection: north up, 88 SVG units per kilometre.
 const project = p => ({x:66+(p.lon-home.lon)*111.32*Math.cos(home.lat*Math.PI/180)*88,y:70+(home.lat-p.lat)*111.32*88});
 const distance = p => {const point=project(p);return (Math.hypot(point.x-66,point.y-70)/88).toFixed(1);};
 const categoryNames={restaurant:'RESTAURANT',sight:'TO EXPLORE'};
 $('.places-total').textContent=places.length+' places';
 document.querySelectorAll('[data-place-category]').forEach(button=>{button.querySelector('span').textContent=places.filter(p=>button.dataset.placeCategory==='all'||p.category===button.dataset.placeCategory).length;});
 const svg = $('#placesMap');
 const search = $('#placesSearch');
 let category='all', selected=null;
 function visiblePlaces(){const q=normalize(search.value);return places.filter(p=>(category==='all'||p.category===category)&&normalize(p.name+' '+p.area+' '+p.address+' '+p.description).includes(q));}
 function renderMap(visible){
  let content='<g aria-hidden="true"><circle class="places-ring" cx="66" cy="70" r="88"/><circle class="places-ring" cx="66" cy="70" r="176"/><circle class="places-ring" cx="66" cy="70" r="264"/><text class="places-ring-label" x="17" y="164">1 km</text><text class="places-ring-label" x="17" y="252">2 km</text><text class="places-ring-label" x="17" y="340">3 km</text><text class="places-ring-label" x="380" y="30">N ↑</text></g>';
  visible.forEach(p=>{const point=project(p);content+='<path aria-hidden="true" class="places-connection'+(selected===p.id?' selected':'')+'" d="M66 70 L'+point.x+' '+point.y+'"/>';});
  content+='<g><image href="./assets/somin-cat.svg" x="46" y="50" width="40" height="40" aria-hidden="true"/><text x="94" y="68" class="places-label places-home-label">Somin’s home</text><text x="94" y="87" class="places-ring-label">숙소 · 출발점</text></g>';
  visible.forEach(p=>{
   const point=project(p),n=places.indexOf(p)+1;
   content+='<g class="places-pin" role="button" tabindex="0" data-places-pin="'+p.id+'" aria-label="'+esc(p.name)+' 위치 보기" aria-pressed="'+(selected===p.id)+'"><circle class="places-hit" cx="'+point.x+'" cy="'+point.y+'" r="28"/><circle class="places-focus" cx="'+point.x+'" cy="'+point.y+'" r="24"/><circle class="places-marker" cx="'+point.x+'" cy="'+point.y+'" r="18"/><text class="places-number" x="'+point.x+'" y="'+point.y+'">0'+n+'</text><text class="places-label" text-anchor="'+(p.id==='stern'?'middle':'end')+'" x="'+(point.x+p.label[0])+'" y="'+(point.y+p.label[1])+'">'+esc(p.name)+'</text></g>';
  });
  svg.innerHTML=content;
 }
 function select(id){
  selected=id;
  document.querySelectorAll('[data-places-pin],[data-place-select]').forEach(el=>el.setAttribute('aria-pressed',String((el.dataset.placesPin||el.dataset.placeSelect)===id)));
  const paths=svg.querySelectorAll('.places-connection');visiblePlaces().forEach((p,i)=>paths[i].classList.toggle('selected',p.id===id));
  const place=places.find(p=>p.id===id);
  $('#placesSelection').innerHTML=place?'<small>0'+(places.indexOf(place)+1)+' / '+esc(place.area)+'</small><strong>'+esc(place.name)+'</strong><p>숙소에서 직선 약 '+distance(place)+' km · 남동쪽</p><div class="places-links">'+link(searchURL(place),'Google Maps')+link(routeURL(place),'숙소에서 길찾기')+'</div>':'<small>HOME BASE</small><strong>Somin’s home</strong><p>'+esc(home.address)+'</p><div class="places-links">'+link('https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(home.address),'숙소 Google Maps')+'</div>';
 }
 function render(){
  const visible=visiblePlaces();
  if(!visible.some(p=>p.id===selected))selected=null;
  renderMap(visible);
  $('#placesList').innerHTML=visible.map(p=>'<article class="places-card" id="place-'+p.id+'"><div class="places-card-heading"><div><small>'+esc(categoryNames[p.category]||p.category)+' / '+esc(p.area)+'</small><h3>'+esc(p.name)+'</h3></div><button type="button" data-place-select="'+p.id+'" aria-label="'+esc(p.name)+' 지도에서 보기" aria-pressed="'+(selected===p.id)+'">0'+(places.indexOf(p)+1)+'</button></div><p>'+esc(p.description)+'</p><p>'+esc(p.address)+'</p><p class="places-distance">숙소에서 직선 약 '+distance(p)+' km · 남동쪽</p>'+(p.note?'<p class="places-arrival">'+esc(p.note)+'</p>':'')+'<div class="places-links">'+links(p)+(p.arrival?link(p.arrival,'입구 안내'):'')+'</div></article>').join('');
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
