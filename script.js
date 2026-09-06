/* ============ Real Zinger burger photo (used in menu card + scroll reveal) ============ */
const ZINGER_IMG = "zinger-burger.jpg";

/* ============ Menu data (real photos via keyworded stock images) ============ */
const juices = [
  {name:"Mango Rus", price:"Rs 250", img:"mango.jpg"},
  {name:"Anaar Rus", price:"Rs 300", img:"Anaar Rus.jpg"},
  {name:"Santra Zing", price:"Rs 220", img:"Santra Zing.jpg"},
  {name:"Tarbooz Thanda", price:"Rs 200", img:"Tarbooz Thanda.jpg"},
];
const shakes = [
  {name:"Chocolate Dhamaka", price:"Rs 350", img:"Chocolate Dhamaka.jpg"},
  {name:"Strawberry Malai", price:"Rs 320", img:"Strawberry Malai.jpg"},
  {name:"Oreo Toofan", price:"Rs 380", img:"Oreo Toofan.jpg"},
  {name:"Banana Rus", price:"Rs 300", img:"Banana Rus.jpg"},
];
const food = [
  {name:"Zinger Chatpata Burger", price:"Rs 450",img:"Zinger Chatpata Burger.jpg" },
  {name:"Cheesy Fries Tokri", price:"Rs 280", img:"cheesy Fries Tokri.jpg"},
  {name:"Chicken Roll", price:"Rs 320", img:"Chicken Roll.jpg"},
  {name:"Loaded Nachos", price:"Rs 400", img:"Loaded Nachos.jpg"},
];

function buildCards(list, elId, tintClass){
  const grid = document.getElementById(elId);
  grid.innerHTML = list.map(item => `
    <div class="card ${tintClass}">
      <div class="frame"><img src="${item.img}" alt="${item.name}" loading="lazy"></div>
      <h3>${item.name}</h3>
      <div class="row">
        <span class="price">${item.price}</span>
        <button class="order-btn">Order</button>
      </div>
    </div>
  `).join('');
}
buildCards(juices, 'juiceGrid', 'tint-juice');
buildCards(shakes, 'shakeGrid', 'tint-shake');
buildCards(food, 'foodGrid', 'tint-food');

/* ============ 3D tilt + cursor-glow spotlight on every menu card ============ */
document.querySelectorAll('.card').forEach(card=>{
  card.addEventListener('mousemove', (e)=>{
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const rx = ((y - rect.height/2) / rect.height) * -9;
    const ry = ((x - rect.width/2) / rect.width) * 9;
    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px) scale(1.02)`;
    card.style.setProperty('--mx', x+'px');
    card.style.setProperty('--my', y+'px');
  });
  card.addEventListener('mouseleave', ()=>{
    card.style.transform = '';
  });
});

/* ============ Click animation: splash (juices) ============ */
document.getElementById('juiceGrid').addEventListener('click', e=>{
  const btn = e.target.closest('.order-btn');
  if(!btn) return;
  btn.classList.remove('pulse-juice'); void btn.offsetWidth; btn.classList.add('pulse-juice');
  const rect = btn.getBoundingClientRect();
  for(let i=0;i<10;i++){
    const d = document.createElement('span');
    d.className = 'droplet';
    const angle = Math.random()*Math.PI*2;
    const dist = 30 + Math.random()*40;
    d.style.setProperty('--dx', (Math.cos(angle)*dist)+'px');
    d.style.setProperty('--dy', (Math.sin(angle)*dist - 20)+'px');
    d.style.left = (rect.left + rect.width/2)+'px';
    d.style.top = (rect.top + rect.height/2)+'px';
    d.style.background = ['#FFB627','#FF5D73','#8BC63E'][i%3];
    document.body.appendChild(d);
    setTimeout(()=>d.remove(), 720);
  }
  btn.textContent = "Order Ho Gaya!";
  setTimeout(()=>btn.textContent = "Order", 1400);
});

/* ============ Click animation: swirl (shakes) ============ */
document.getElementById('shakeGrid').addEventListener('click', e=>{
  const btn = e.target.closest('.order-btn');
  if(!btn) return;
  btn.classList.remove('swirl-shake'); void btn.offsetWidth; btn.classList.add('swirl-shake');
  btn.textContent = "Ban Raha Hai...";
  setTimeout(()=>btn.textContent = "Order", 1200);
});

/* ============ Click animation: sizzle (fast food) ============ */
document.getElementById('foodGrid').addEventListener('click', e=>{
  const btn = e.target.closest('.order-btn');
  if(!btn) return;
  btn.classList.remove('sizzle'); void btn.offsetWidth; btn.classList.add('sizzle');
  const rect = btn.getBoundingClientRect();
  for(let i=0;i<5;i++){
    const s = document.createElement('span');
    s.className = 'steam';
    s.style.left = (rect.left + rect.width/2 + (Math.random()*20-10))+'px';
    s.style.top = (rect.top - 6)+'px';
    s.style.animationDelay = (i*0.08)+'s';
    document.body.appendChild(s);
    setTimeout(()=>s.remove(), 1000);
  }
  btn.textContent = "Tawe Par!";
  setTimeout(()=>btn.textContent = "Order", 1400);
});

/* ============ Hero ripple ============ */
document.getElementById('heroCta').addEventListener('click', function(e){
  const rect = this.getBoundingClientRect();
  const r = document.createElement('span');
  r.className = 'ripple';
  const size = Math.max(rect.width, rect.height)*1.4;
  r.style.width = r.style.height = size+'px';
  r.style.left = (e.clientX - rect.left - size/2)+'px';
  r.style.top = (e.clientY - rect.top - size/2)+'px';
  this.appendChild(r);
  setTimeout(()=>r.remove(), 650);
  this.textContent = "Shukriya!";
  setTimeout(()=>this.textContent = "Order Karain", 1300);
});

/* ============ Fade-in on scroll (headings, story, cards) + images fall into place ============ */
const io = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    if(en.isIntersecting){
      en.target.classList.add('in-view');
      /* every picture inside the section that just came into view
         falls from above and lands into its spot, one after another */
      const imgs = en.target.matches('img') ? [en.target] : en.target.querySelectorAll('img');
      imgs.forEach((img, i)=>{
        img.style.animationDelay = (i*0.12)+'s';
        img.classList.add('img-fall');
      });
      io.unobserve(en.target);
    }
  });
}, { threshold:0.15 });
document.querySelectorAll('.reveal, .card').forEach(el=>io.observe(el));

/* once each fall-in finishes, drop the class so normal hover transitions
   can take over the transform property again */
document.addEventListener('animationend', (e)=>{
  if(e.animationName === 'fall-in'){ e.target.classList.remove('img-fall'); }
});

/* hero photo is visible immediately, above the fold -- falls in on load.
   (this script runs at the end of <body>, so the DOM is already ready) */
const heroImg = document.querySelector('.hero-illustration img');
if(heroImg) heroImg.classList.add('img-fall');

/* ============ Scroll-triggered colour change ============ */
const stops = [
  ['#FFF8EC', '#FFE8C4'],
  ['#FFE3CB', '#FFC9D3'],
  ['#FFD7DD', '#F7B8C6'],
  ['#E7F1D6', '#CFE6B8'],
  ['#E4D6EE', '#C9B3DD'],
];
const accentStops = ['#FF5D73','#FFB627','#FF5D73','#8BC63E','#7B4FA0'];

function hexToRgb(h){ h=h.replace('#',''); return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)]; }
function rgbToHex(r,g,b){ return '#'+[r,g,b].map(v=>Math.round(v).toString(16).padStart(2,'0')).join(''); }
function lerp(a,b,t){ return a+(b-a)*t; }
function mixHex(h1,h2,t){
  const c1=hexToRgb(h1), c2=hexToRgb(h2);
  return rgbToHex(lerp(c1[0],c2[0],t), lerp(c1[1],c2[1],t), lerp(c1[2],c2[2],t));
}
function smoothstep(t){ return t*t*(3-2*t); }

/* ============ Scroll-driven ZINGER BURGER reveal (pieces fall from above) ============ *
 * A neat, glowing circular badge sits fixed in the corner. The real
 * burger photo is sliced into clean horizontal layers (top bun, salad,
 * cheese+tomato, patty, bottom bun...). As the user scrolls through the
 * whole page, each layer drops straight down from above and lands with
 * a soft bounce -- bottom bun first, then the next layer falls on top
 * of it, and so on -- until, by the bottom of the page, the whole real
 * photo has completely landed, piece by piece, inside the badge.      */
const bbBadge = document.getElementById('bbBadge');
const bbPhotoMask = document.getElementById('bbPhotoMask');
const bbLabel = document.getElementById('bbLabel');
const bbRingProgress = document.getElementById('bbRingProgress');
const RING_CIRCUMFERENCE = 2 * Math.PI * 54;

const BB_STRIP_COUNT = 6;
const bbStrips = [];
function easeOutBounce(t){
  const n1 = 7.5625, d1 = 2.75;
  if (t < 1/d1) return n1*t*t;
  if (t < 2/d1) return n1*(t -= 1.5/d1)*t + 0.75;
  if (t < 2.5/d1) return n1*(t -= 2.25/d1)*t + 0.9375;
  return n1*(t -= 2.625/d1)*t + 0.984375;
}
for(let i=0;i<BB_STRIP_COUNT;i++){
  const strip = document.createElement('div');
  strip.className = 'bb-strip';
  strip.style.top = (i * (100/BB_STRIP_COUNT)) + '%';
  strip.style.height = (100/BB_STRIP_COUNT) + '%';
  strip.style.backgroundImage = `url(${ZINGER_IMG})`;
  strip.style.backgroundSize = `100% ${BB_STRIP_COUNT * 100}%`;
  strip.style.backgroundPosition = `0% ${ (i / (BB_STRIP_COUNT - 1)) * 100 }%`;
  strip.style.opacity = 0;
  bbPhotoMask.appendChild(strip);
  bbStrips.push({
    el: strip,
    /* bottom-most slice (the bun base) falls & lands first; each slice
       above it falls afterwards, finishing with the top bun last.   */
    order: BB_STRIP_COUNT - 1 - i
  });
}

/* ============ Mouse position drives a bit of the page colour too ============ *
 * mouseYFrac (0 = cursor at top of screen, 1 = cursor at bottom) is
 * blended in with scroll progress, so moving the cursor DOWN the page
 * nudges the background/accent colour forward, on top of the normal
 * scroll-driven shift.                                                */
let mouseYFrac = 0.5;

let wasReady = false;

let ticking = false;
function updateScroll(){
  const doc = document.documentElement;
  const max = doc.scrollHeight - doc.clientHeight;
  const scrollProgress = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
  const colorT = Math.min(Math.max(scrollProgress*0.75 + mouseYFrac*0.25, 0), 1);

  /* -- background colour (scroll + cursor blended) -- */
  const segments = stops.length - 1;
  const scaled = colorT * segments;
  const idx = Math.min(Math.floor(scaled), segments - 1);
  const t = scaled - idx;
  const fromA = stops[idx][0], toA = stops[idx+1] ? stops[idx+1][0] : stops[idx][0];
  const fromB = stops[idx][1], toB = stops[idx+1] ? stops[idx+1][1] : stops[idx][1];
  const fromAcc = accentStops[idx], toAcc = accentStops[idx+1] || accentStops[idx];
  document.documentElement.style.setProperty('--bgA', mixHex(fromA, toA, t));
  document.documentElement.style.setProperty('--bgB', mixHex(fromB, toB, t));
  document.documentElement.style.setProperty('--accent', mixHex(fromAcc, toAcc, t));

  /* -- burger pieces fall from above and land one after another -- */
  bbStrips.forEach((strip)=>{
    const local = Math.min(Math.max(scrollProgress * BB_STRIP_COUNT - strip.order, 0), 1);
    const bounced = easeOutBounce(local);
    const dy = -170 * (1 - bounced);
    strip.el.style.transform = `translateY(${dy}px)`;
    strip.el.style.opacity = local > 0 ? 1 : 0;
  });
  bbRingProgress.style.strokeDashoffset = RING_CIRCUMFERENCE * (1 - scrollProgress);

  const isReady = scrollProgress > 0.985;
  bbLabel.textContent = isReady ? "Zinger Ready! 🍔" : `${Math.round(scrollProgress*100)}% Taaza Ban Raha Hai...`;
  bbBadge.classList.toggle('ready', isReady);

  if(isReady && !wasReady){
    bbLabel.classList.remove('label-pop'); void bbLabel.offsetWidth; bbLabel.classList.add('label-pop');
    fireBurgerSparkles();
  }
  wasReady = isReady;

  ticking = false;
}
window.addEventListener('scroll', ()=>{
  if(!ticking){ requestAnimationFrame(updateScroll); ticking = true; }
}, { passive:true });
window.addEventListener('mousemove', (e)=>{
  mouseYFrac = Math.min(Math.max(e.clientY / window.innerHeight, 0), 1);
  if(!ticking){ requestAnimationFrame(updateScroll); ticking = true; }
}, { passive:true });
updateScroll();

/* ============ Sparkle burst when the burger finishes revealing ============ */
function fireBurgerSparkles(){
  const rect = bbBadge.getBoundingClientRect();
  const cx = rect.left + rect.width/2, cy = rect.top + rect.height/2;
  const glyphs = ['✨','⭐','🧀','🍅','🥬'];
  for(let i=0;i<22;i++){
    const s = document.createElement('span');
    s.className = 'sparkle';
    s.textContent = glyphs[i % glyphs.length];
    const angle = Math.random()*Math.PI*2;
    const dist = 50 + Math.random()*100;
    s.style.setProperty('--sx', (Math.cos(angle)*dist)+'px');
    s.style.setProperty('--sy', (Math.sin(angle)*dist)+'px');
    s.style.left = cx+'px';
    s.style.top = cy+'px';
    s.style.fontSize = (14 + Math.random()*10)+'px';
    document.body.appendChild(s);
    setTimeout(()=>s.remove(), 920);
  }
}

/* ============ Gentle continuous steam rising off the badge while it reveals ============ */
setInterval(()=>{
  const rect = bbBadge.getBoundingClientRect();
  if(rect.width === 0) return;
  const s = document.createElement('span');
  s.className = 'steam';
  s.style.left = (rect.left + rect.width*0.3 + Math.random()*rect.width*0.4) + 'px';
  s.style.top = (rect.top - 4) + 'px';
  document.body.appendChild(s);
  setTimeout(()=>s.remove(), 1000);
}, 850);

/* ============ Custom animated cursor: colourful trailing comet ============ */
if(window.matchMedia('(hover:hover) and (pointer:fine)').matches){
  const palette = ['#FF5D73','#FFB627','#8BC63E','#7B4FA0','#FF5D73','#FFB627','#8BC63E','#7B4FA0'];
  const TRAIL_COUNT = 8;
  const trail = [];
  for(let i=0;i<TRAIL_COUNT;i++){
    const d = document.createElement('div');
    d.className = 'cursor-trail' + (i===0 ? ' lead' : '');
    const size = 16 - i*1.5;
    d.style.width = size+'px';
    d.style.height = size+'px';
    d.style.background = palette[i];
    d.style.opacity = (1 - i*0.11).toFixed(2);
    document.body.appendChild(d);
    trail.push({ el:d, x:window.innerWidth/2, y:window.innerHeight/2 });
  }

  let mx = window.innerWidth/2, my = window.innerHeight/2;
  window.addEventListener('mousemove', (e)=>{ mx = e.clientX; my = e.clientY; });

  function trailLoop(){
    let targetX = mx, targetY = my;
    trail.forEach((dot)=>{
      dot.x += (targetX - dot.x) * 0.32;
      dot.y += (targetY - dot.y) * 0.32;
      dot.el.style.left = dot.x + 'px';
      dot.el.style.top = dot.y + 'px';
      targetX = dot.x; targetY = dot.y;
    });
    requestAnimationFrame(trailLoop);
  }
  trailLoop();

  document.querySelectorAll('a, button, .card').forEach(el=>{
    el.addEventListener('mouseenter', ()=>{ trail[0].el.classList.add('grow'); });
    el.addEventListener('mouseleave', ()=>{ trail[0].el.classList.remove('grow'); });
  });
}
