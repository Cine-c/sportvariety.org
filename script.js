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

/* ========== ADSENSE — LOAD ONLY AFTER CONSENT ========== */
function loadAdSense(){
  if(document.querySelector('script[src*="adsbygoogle"]'))return;
  var s=document.createElement('script');
  s.async=true;
  s.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8747979755893623';
  s.crossOrigin='anonymous';
  document.head.appendChild(s);
}
if(localStorage.getItem('cookie-consent')==='accepted')loadAdSense();

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
    loadAdSense();
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

/* ========== NEWSLETTER SIGNUP ========== */
function handleNewsletter(e){
  e.preventDefault();
  var input=e.target.querySelector('input');
  var msg=document.querySelector('.newsletter-msg');
  if(input&&input.value){
    input.value='';
    if(msg){msg.style.display='block';msg.textContent='Thanks for subscribing! We\'ll keep you posted.';}
  }
}
