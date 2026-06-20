/* ========== SEARCH ========== */
function doSearch(e){
  e.preventDefault();
  var q=(document.getElementById('nav-search-input')||{}).value||'';
  q=q.trim().toLowerCase();
  if(!q)return false;
  var searchable=[
    {sel:'.news-card',textSel:'.news-card-title,.news-card-tag'},
    {sel:'.ath',textSel:'.ath-name,.ath-sport'},
    {sel:'.car',textSel:'.car-name,.car-desc'},
    {sel:'.vid-card',textSel:'h4,.vmeta-tag'},
    {sel:'.sc',textSel:'.sc-name,.sc-sport'},
    {sel:'.ni',textSel:'.ni-title,.ni-tag'},
    {sel:'.news-item',textSel:'h3,.nm-tag'}
  ];
  var found=0;
  searchable.forEach(function(s){
    document.querySelectorAll(s.sel).forEach(function(el){
      var text='';
      el.querySelectorAll(s.textSel.split(',').join(',')).forEach(function(t){text+=t.textContent+' ';});
      text=text.toLowerCase();
      var show=text.includes(q);
      el.style.display=show?'':'none';
      if(show)found++;
    });
  });
  return false;
}
/* Clear search filter when input is empty */
(function(){
  document.addEventListener('input',function(e){
    if(e.target&&e.target.id==='nav-search-input'&&!e.target.value){
      ['.news-card','.ath','.car','.vid-card','.sc','.ni'].forEach(function(sel){
        document.querySelectorAll(sel).forEach(function(el){el.style.display='';});
      });
    }
  });
})();

function filterSc(sp,btn){
  document.querySelectorAll('.stab').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  document.querySelectorAll('.sc').forEach(c=>{c.style.display=(sp==='all'||c.dataset.sp===sp)?'':'none'});
}
function loadVid(id,title){
  document.getElementById('main-iframe').src='https://www.youtube.com/embed/'+id+'?autoplay=1&rel=0&modestbranding=1';
  document.getElementById('main-title').textContent=title;
}
const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.style.animationPlayState='running';io.unobserve(e.target)}})},{threshold:.1});
document.querySelectorAll('.anim').forEach(el=>{el.style.animationPlayState='paused';io.observe(el)});
setInterval(()=>document.querySelectorAll('.s-live').forEach(el=>{el.style.opacity=el.style.opacity==='0.5'?'1':'0.5'}),1500);
function toggleMenu(){const h=document.getElementById('hamburger'),m=document.getElementById('mobile-menu');h.classList.toggle('open');m.classList.toggle('open')}

function filterNews(cat,btn){
  document.querySelectorAll('.news-filter-btn').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  document.querySelectorAll('.news-card').forEach(c=>{c.style.display=(cat==='all'||c.dataset.cat===cat)?'':'none'});
}
/* Auto-filter news page from ?cat= URL param */
(function(){
  var p=new URLSearchParams(window.location.search).get('cat');
  if(p){
    var btn=document.querySelector('.news-filter-btn');
    document.querySelectorAll('.news-filter-btn').forEach(function(b){
      if(b.textContent.trim().toLowerCase()===p){btn=b;}
    });
    if(btn)filterNews(p,btn);
  }
})();
function filterVids(cat,btn){
  document.querySelectorAll('.vid-filter-btn').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  document.querySelectorAll('.vid-card').forEach(c=>{c.style.display=(cat==='all'||c.dataset.cat===cat)?'':'none'});
}
function filterCars(type,btn){
  document.querySelectorAll('.car-filter-btn').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  document.querySelectorAll('.car').forEach(c=>{c.style.display=(type==='all'||c.dataset.type===type)?'':'none'});
}
function filterAth(sport,btn){
  document.querySelectorAll('.ath-filter-btn').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  document.querySelectorAll('.ath').forEach(c=>{c.style.display=(sport==='all'||c.dataset.sport===sport)?'':'none'});
}
function toggleF1Tab(tab,btn){
  document.querySelectorAll('.f1-tab-btn').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  document.querySelectorAll('.f1-tab-content').forEach(c=>c.classList.remove('active'));
  document.getElementById(tab).classList.add('active');
}

/* ========== CONTACT FORM ========== */
// To activate: sign up free at formspree.io, create a form, and replace YOUR_FORM_ID below.
var FORMSPREE_ID='xykbyywb';
function handleContact(e){
  e.preventDefault();
  var btn=document.querySelector('.form-submit');
  var form=document.getElementById('contact-form');
  btn.classList.add('loading');
  btn.textContent='Sending...';
  var data={
    name:document.getElementById('name').value,
    email:document.getElementById('email').value,
    subject:document.getElementById('subject').value,
    message:document.getElementById('message').value
  };
  fetch('https://formspree.io/f/'+FORMSPREE_ID,{
    method:'POST',
    headers:{'Content-Type':'application/json','Accept':'application/json'},
    body:JSON.stringify(data)
  }).then(function(r){
    if(r.ok){
      form.style.display='none';
      document.getElementById('contact-confirm').style.display='block';
    } else {
      btn.classList.remove('loading');
      btn.textContent='Send Message';
      alert('Something went wrong. Please email us at hello@sportvariety.org');
    }
  }).catch(function(){
    btn.classList.remove('loading');
    btn.textContent='Send Message';
    alert('Network error. Please email us at hello@sportvariety.org');
  });
}

/* ========== ESCAPE KEY — CLOSE MOBILE MENU ========== */
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){
    var h=document.getElementById('hamburger');
    var m=document.getElementById('mobile-menu');
    if(h&&m&&m.classList.contains('open')){
      h.classList.remove('open');
      m.classList.remove('open');
    }
  }
});

/* ========== COOKIE CONSENT BANNER ========== */
(function(){
  if(localStorage.getItem('cookie-consent'))return;
  var banner=document.createElement('div');
  banner.className='cookie-banner';
  banner.innerHTML='<p>We use cookies to improve your experience and for analytics. By continuing to browse, you agree to our use of cookies. <a href="privacy.html">Privacy Policy</a></p><div class="cookie-btns"><button class="cookie-accept">Accept</button><button class="cookie-decline">Decline</button></div>';
  document.body.appendChild(banner);
  setTimeout(function(){banner.classList.add('show')},500);
  banner.querySelector('.cookie-accept').addEventListener('click',function(){
    localStorage.setItem('cookie-consent','accepted');
    banner.classList.remove('show');
    setTimeout(function(){banner.remove()},300);
  });
  banner.querySelector('.cookie-decline').addEventListener('click',function(){
    localStorage.setItem('cookie-consent','declined');
    banner.classList.remove('show');
    setTimeout(function(){banner.remove()},300);
  });
})();

/* ========== BACK TO TOP BUTTON ========== */
(function(){
  var btn=document.createElement('button');
  btn.className='back-to-top';
  btn.setAttribute('aria-label','Back to top');
  btn.innerHTML='&#8593;';
  document.body.appendChild(btn);
  window.addEventListener('scroll',function(){
    btn.classList.toggle('visible',window.scrollY>600);
  });
  btn.addEventListener('click',function(){
    window.scrollTo({top:0,behavior:'smooth'});
  });
})();

/* ========== TRENDING FEED (ESPN) ========== */
(function(){
  var el=document.getElementById('trending-feed');
  if(!el)return;
  var cached=sessionStorage.getItem('sv-trending');
  if(cached){try{renderTrending(JSON.parse(cached),el);return}catch(e){}}
  fetch('https://site.api.espn.com/apis/site/v2/sports/football/eng.1/news?limit=6')
    .then(function(r){return r.json()})
    .then(function(data){
      if(data.articles){sessionStorage.setItem('sv-trending',JSON.stringify(data.articles));renderTrending(data.articles,el)}
    })
    .catch(function(){el.closest('.section').style.display='none'});
  function renderTrending(articles,container){
    container.innerHTML=articles.map(function(a){
      var url=(a.links&&a.links.web&&a.links.web.href)||'#';
      var time=a.published?new Date(a.published).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}):'';
      return '<a class="trending-card" href="'+url+'" target="_blank" rel="noopener">'
        +'<div class="trending-source">ESPN</div>'
        +'<div class="trending-headline">'+a.headline+'</div>'
        +(a.description?'<div class="trending-desc">'+a.description+'</div>':'')
        +'<div class="trending-time">'+time+'</div>'
        +'</a>';
    }).join('');
  }
})();

/* ========== CHANGELOG WIDGET ========== */
(function(){
  var el=document.getElementById('changelog-list');
  if(!el)return;
  fetch('content-report.json')
    .then(function(r){return r.json()})
    .then(function(data){
      if(!data.articles||!data.articles.length){el.closest('.section').style.display='none';return}
      var sorted=data.articles.filter(function(a){return a.datePublished}).sort(function(a,b){return b.datePublished.localeCompare(a.datePublished)}).slice(0,5);
      el.innerHTML=sorted.map(function(a){
        var badge=a.status==='new'?'badge-new':a.status==='modified'?'badge-updated':'badge-unchanged';
        var label=a.status==='new'?'NEW':a.status==='modified'?'UPDATED':'';
        return '<div class="changelog-item">'
          +(label?'<span class="changelog-badge '+badge+'">'+label+'</span>':'')
          +'<div class="changelog-item-body">'
          +'<div class="changelog-item-title"><a href="'+a.file+'">'+a.title+'</a></div>'
          +'<div class="changelog-item-meta">'
          +(a.author?'<span>By '+a.author+'</span>':'')
          +(a.datePublished?'<span>'+a.datePublished+'</span>':'')
          +(a.wordCount?'<span>'+a.wordCount+' words</span>':'')
          +'</div></div></div>';
      }).join('');
    })
    .catch(function(){el.closest('.section').style.display='none'});
})();

/* ========== NEWSLETTER SIGNUP ========== */
function handleNewsletter(e){
  e.preventDefault();
  var input=e.target.querySelector('input');
  var btn=e.target.querySelector('button');
  var msg=document.querySelector('.newsletter-msg');
  if(!input||!input.value)return;
  var email=input.value;
  btn.textContent='Subscribing...';
  btn.style.opacity='0.6';
  btn.style.pointerEvents='none';
  fetch('https://formspree.io/f/'+FORMSPREE_ID,{
    method:'POST',
    headers:{'Content-Type':'application/json','Accept':'application/json'},
    body:JSON.stringify({email:email,_subject:'Newsletter Signup — Sport Variety'})
  }).then(function(r){
    btn.textContent='Get Free Weekly Digest';
    btn.style.opacity='';
    btn.style.pointerEvents='';
    if(r.ok){
      input.value='';
      if(msg){msg.style.color='var(--green)';msg.style.display='block';msg.textContent="You're in! Check your inbox every Friday.";}
    } else {
      if(msg){msg.style.color='var(--red)';msg.style.display='block';msg.textContent='Something went wrong — please try again.';}
    }
  }).catch(function(){
    btn.textContent='Get Free Weekly Digest';
    btn.style.opacity='';
    btn.style.pointerEvents='';
    if(msg){msg.style.color='var(--red)';msg.style.display='block';msg.textContent='Network error — please try again.';}
  });
}

/* ========== LIVE SCORES WIDGET ========== */
(function(){
  var grid=document.getElementById('sc-grid');
  if(!grid)return;
  var SPORTS=[
    {url:'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard',sp:'football',league:'World Cup 2026'},
    {url:'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard',sp:'basketball',league:'NBA'},
    {url:'https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard',sp:'football',league:'Premier League'},
    {url:'https://site.api.espn.com/apis/site/v2/sports/soccer/esp.1/scoreboard',sp:'football',league:'La Liga'},
    {url:'https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.champions/scoreboard',sp:'football',league:'UCL'},
    {url:'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard',sp:'nfl',league:'NFL'},
    {url:'https://site.api.espn.com/apis/site/v2/sports/tennis/scoreboard',sp:'tennis',league:'Tennis'},
    {url:'https://site.api.espn.com/apis/site/v2/sports/racing/f1/scoreboard',sp:'f1',league:'Formula 1'},
  ];
  var ORDER={STATUS_IN_PROGRESS:0,STATUS_FINAL:1,STATUS_SCHEDULED:2};
  function getStatus(ev){
    var comp=ev.competitions&&ev.competitions[0];
    return comp&&comp.status&&comp.status.type&&comp.status.type.name||'STATUS_SCHEDULED';
  }
  function render(allItems){
    var cards=[];
    allItems.forEach(function(item){
      var comp=item.ev.competitions&&item.ev.competitions[0];
      if(!comp||!comp.competitors||comp.competitors.length<2)return;
      var home=comp.competitors.find(function(c){return c.homeAway==='home';})||comp.competitors[0];
      var away=comp.competitors.find(function(c){return c.homeAway==='away';})||comp.competitors[1];
      var sName=getStatus(item.ev);
      var detail=item.ev.status&&item.ev.status.type&&item.ev.status.type.shortDetail||'';
      var sCls=sName==='STATUS_IN_PROGRESS'?'s-live':sName==='STATUS_FINAL'?'s-ft':'s-up';
      var sLbl=sName==='STATUS_IN_PROGRESS'?'LIVE':sName==='STATUS_FINAL'?'FT':'UPCOMING';
      var sportLbl=item.league+(sName==='STATUS_IN_PROGRESS'&&detail?' — '+detail:'');
      var isUp=sName==='STATUS_SCHEDULED';
      var isLive=sName==='STATUS_IN_PROGRESS';
      cards.push('<div class="sc" data-sp="'+item.sp+'">'
        +'<div class="sc-top"><span class="sc-sport">'+sportLbl+'</span>'
        +'<span class="sc-status '+sCls+'">'+sLbl+'</span></div>'
        +'<div class="sc-teams">'
        +'<div class="sc-row"><span class="sc-name">'+home.team.displayName+'</span>'
        +(isUp?'<span class="sc-score" style="color:var(--muted);font-size:20px">VS</span>'
             :'<span class="sc-score'+(isLive?'':' sc-score-2')+'">'+(home.score||'0')+'</span>')
        +'</div><div class="sc-div"></div>'
        +'<div class="sc-row"><span class="sc-name">'+away.team.displayName+'</span>'
        +(isUp?'<span class="sc-score" style="opacity:0">x</span>'
             :'<span class="sc-score sc-score-2">'+(away.score||'0')+'</span>')
        +'</div></div></div>');
    });
    if(cards.length){
      grid.innerHTML=cards.slice(0,6).join('');
    } else {
      grid.innerHTML='<div style="color:var(--muted);font-family:\'Barlow Condensed\',sans-serif;'
        +'letter-spacing:2px;text-transform:uppercase;font-size:12px;padding:30px;'
        +'grid-column:1/-1;text-align:center">No live games right now — check back soon</div>';
    }
  }
  function fetchAll(){
    Promise.all(SPORTS.map(function(s){
      return fetch(s.url)
        .then(function(r){return r.json();})
        .then(function(d){return(d.events||[]).map(function(ev){return{ev:ev,sp:s.sp,league:s.league};});})
        .catch(function(){return[];});
    })).then(function(all){
      var flat=[];
      all.forEach(function(a){flat=flat.concat(a);});
      flat.sort(function(a,b){return(ORDER[getStatus(a.ev)]||99)-(ORDER[getStatus(b.ev)]||99);});
      render(flat);
    });
  }
  fetchAll();
  setInterval(fetchAll,60000);
})();

/* ========== LIVE TICKER ========== */
(function(){
  var wrap=document.querySelector('.ticker-items');
  if(!wrap)return;
  var FEEDS=[
    'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/news?limit=5',
    'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/news?limit=5',
    'https://site.api.espn.com/apis/site/v2/sports/football/eng.1/news?limit=4',
    'https://site.api.espn.com/apis/site/v2/sports/football/nfl/news?limit=3',
  ];
  Promise.all(FEEDS.map(function(url){
    return fetch(url)
      .then(function(r){return r.json();})
      .then(function(d){return d.articles||[];})
      .catch(function(){return[];});
  })).then(function(all){
    var headlines=[];
    all.forEach(function(articles){
      articles.forEach(function(a){if(a.headline)headlines.push(a.headline);});
    });
    if(headlines.length<4)return;
    var items=headlines.slice(0,14);
    var html=[].concat(items,items).map(function(h){
      return'<span class="tick">'+h+'</span><span class="tick-sep">|</span>';
    }).join('');
    wrap.style.animation='none';
    wrap.offsetHeight;
    wrap.innerHTML=html;
    wrap.style.animation='';
  }).catch(function(){});
})();

/* ========== F1 STANDINGS (Jolpi/Ergast API) ========== */
(function(){
  var stand=document.getElementById('f1-standings');
  if(!stand)return;
  var COLORS={
    'Mercedes':'#27F4D2','Red Bull':'#3671C6','McLaren':'#FF8000','Ferrari':'#E8002D',
    'Aston Martin':'#358C75','Alpine':'#FF87BC','Williams':'#64C4FF',
    'Haas F1 Team':'#B6BABD','Haas':'#B6BABD',
    'Sauber':'#00E48F','Kick Sauber':'#00E48F','Audi':'#C00000',
    'RB':'#6692FF','Racing Bulls':'#6692FF','Visa Cash App RB':'#6692FF','VCARB':'#6692FF',
  };
  var PC={1:'p1',2:'p2',3:'p3'};
  fetch('https://api.jolpi.ca/ergast/f1/current/driverStandings.json')
    .then(function(r){return r.json();})
    .then(function(data){
      var lists=data.MRData&&data.MRData.StandingsTable&&data.MRData.StandingsTable.StandingsLists;
      if(!lists||!lists.length)return;
      var list=lists[0];
      var hd='<div class="stand-hd">'+list.season+' Drivers Championship — Rnd '+list.round+'</div>';
      var rows=list.DriverStandings.slice(0,10).map(function(s){
        var pos=parseInt(s.position);
        var con=s.Constructors&&s.Constructors[0];
        var team=con?con.name:'';
        var col=COLORS[team]||'#888';
        return'<div class="srow">'
          +'<div class="spos'+(PC[pos]?' '+PC[pos]:'')+'">'+pos+'</div>'
          +'<div><div class="sdrv-n">'+s.Driver.givenName+' '+s.Driver.familyName+'</div>'
          +'<div class="sdrv-t"><span class="tdot" style="background:'+col+'"></span>'+team+'</div></div>'
          +'<div class="spts">'+s.points+'</div>'
          +'<div class="schg same">—</div></div>';
      }).join('');
      stand.innerHTML=hd+rows;
    }).catch(function(){});
})();
