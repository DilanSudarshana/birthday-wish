const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
const ENV={storm:{storm:1,rain:1,light:1,cloud:1,sun:0,sunset:0,boost:0}};ENV.great={...ENV.storm,boost:1};ENV.calm={storm:0,rain:0,light:0,cloud:.3,sun:1,sunset:0,boost:0};ENV.sunset={...ENV.calm,cloud:.5,sunset:1};
const say=(l,my,k)=>Trans.say(l,my,k),show=s=>$(s).classList.add('show'),sc=$$('.sc'),E=(a,b,p)=>{const k=Math.min(1,Math.max(0,(p-a)/(b-a)));return k*k*(3-2*k)};
let cur=-1,max=0,wi=0;
function camLoop(my,l){let i=0;(async()=>{while(Trans.tok===my){Ocean.cam(Ocean.V[l[i++%l.length]]);await sleep(6500)}})()}
function dots(){$('#skip').style.display=cur>=sc.length-1?'none':'';$$('#dots i').forEach((d,i)=>{d.className=i==cur?'c':i<=max?'v':''})}
sc.forEach((_,i)=>{const d=document.createElement('i');d.onclick=()=>i<=max&&i!==cur&&go(i);$('#dots').append(d)});
const fwLoop=(my,ms)=>{(async()=>{while(Trans.tok===my){Fx.fw(innerWidth*(.15+Math.random()*.7),innerHeight*(.1+Math.random()*.3));await sleep(ms)}})()};
const scenes=[
{tr:'fade',enter(my){Ocean.set(ENV.storm);S.dark=1;Ocean.snap({s:1.9,x:0,y:0});$('#go0').classList.add('show')}},
{tr:'fog',async enter(my){Ocean.to(ENV.storm,1);camLoop(my,['behind','side','wide']);if(await say(['LOST IN THE MIDDLE OF THE OCEAN...'],my,1))show('#s1 .nx')}},
{tr:'splash',async enter(my){Ocean.to(ENV.storm,1);Ocean.cam(Ocean.V.deck);$('#bot').className='bottle';$('#letter').className='letter';$('#bot').style.display='';$('#disc').classList.remove('show');
 if(await say(['EVEN THE STRONGEST STORMS CANNOT STOP A BEAUTIFUL JOURNEY.'],my,1))show('#disc')}},
{tr:'wave',async enter(my){Ocean.to(ENV.great,4);camLoop(my,['side','behind']);sleep(7000).then(()=>Trans.tok===my&&Ocean.cam(Ocean.V.horizon));if(await say(['NO STORM LASTS FOREVER...','THE MOST BEAUTIFUL MOMENTS ARE STILL AHEAD.'],my,1))show('#s3 .nx')}},
{tr:'fade',async enter(my){Ocean.set(ENV.great);Ocean.cam(Ocean.V.horizon);sleep(RM?3000:14000).then(()=>Trans.tok===my&&Ocean.cam(Ocean.V.wide));
 await Ocean.line(RM?9000:30000,p=>{if(Trans.tok!==my)return;S.light=1-E(0,.18,p);S.boost=1-E(0,.12,p);S.storm=1-E(.05,.8,p);S.rain=1-E(.1,.6,p)*.9-E(.6,.68,p)*.1;S.cloud=1-E(.3,.8,p)*.7;S.sun=E(.55,.9,p)});
 if(Trans.tok!==my)return;Ocean.set(ENV.calm);if(await say(['AND JUST LIKE THAT, THE STORM PASSED...','A BEAUTIFUL NEW DAY BEGINS.','AND TODAY IS YOUR DAY, NATASHA! ☀️'],my,1))show('#s4 .nx')}},
{tr:'sun',async enter(my){Ocean.to(ENV.calm,2);Ocean.cam(Ocean.V.wide);Fx.em.petals=1;if(await say(['THE OCEAN IS CALM. THE SKY IS CLEAR.'],my,1))show('#s5 .nx')}},
{tr:'magic',async enter(my){Ocean.to(ENV.calm,2);Ocean.cam(Ocean.V.wide);Fx.em.petals=1;await sleep(1200);if(Trans.tok===my)show('#s6 .nx')}},
{tr:'wave',enter(my){Ocean.to(ENV.calm,2);wi=0;$$('.bk').forEach((b,i)=>{b.className='bk'+(i?'':' on');b.disabled=!!i});$('#wish').classList.remove('on')}},
{tr:'magic',async enter(my){Ocean.to(ENV.calm,2);Ocean.cam({s:1.3,x:0,y:-.1});$('#chest').className='';$('#tmsg').className='';await say(['THERE IS ONE MORE TREASURE WAITING FOR YOU...'],my,1)}},
{tr:'sun',async enter(my){Ocean.to(ENV.calm,2);Ocean.cam({s:1.25,x:0,y:-.08});$('#cake').className='';$('#blow').classList.remove('show');$('#light').classList.remove('show');
 if(await say(['MAKE A WISH, NATASHA! 🎂'],my,1))show('#light')}},
{tr:'fog',async enter(my){Ocean.to(ENV.sunset,5);Ocean.snap({s:1.7,x:0,y:-.05});Ocean.cam(Ocean.V.wide);$('#fin').className='';$('#rs').classList.remove('show');
 await sleep(5000);if(Trans.tok!==my)return;$('#fin').classList.add('on');Fx.em.petals=1;Fx.em.gold=1;Fx.em.hearts=1;fwLoop(my,900);Fx.confetti(120);await sleep(6000);if(Trans.tok===my)show('#rs')}}
];
async function go(i){const my=++Trans.tok;Ocean.clear();Trans.hide();Fx.em.petals=Fx.em.gold=Fx.em.hearts=0;Aud.bday=false;
 const apply=()=>{sc.forEach(e=>e.classList.remove('on'));$$('.b').forEach(b=>b.id=='go0'||b.classList.remove('show'));$('#lb').classList.remove('on');sc[i].classList.add('on');cur=i;max=Math.max(max,i);dots()};
 if(cur<0)apply();else await Trans.wipe(scenes[i].tr,apply);if(Trans.tok===my)scenes[i].enter(my)}
document.addEventListener('click',e=>{if(e.target.closest('.nx'))go(cur+1)});
$('#go0').onclick=async e=>{const my=Trans.tok;e.target.classList.remove('show');Aud.start();Ocean.to({dark:0},RM?1:7);Ocean.cam(Ocean.V.wide);if(await say(['BEYOND THE HORIZON...','AN EXTRAORDINARY JOURNEY BEGINS...','A SPECIAL JOURNEY FOR NATASHA'],my,1))show('#s0 .nx')};
$('#disc').onclick=async()=>{const my=Trans.tok;$('#disc').classList.remove('show');Trans.hide();$('#bot').classList.add('open');Fx.burst(innerWidth/2,innerHeight*.6,60);await sleep(1600);if(Trans.tok!==my)return;$('#bot').style.display='none';$('#letter').classList.add('on');Fx.burst(innerWidth/2,innerHeight*.5,40);await sleep(RM?1500:5000);if(Trans.tok===my)show('#s2 .nx')};
const gal=$('#gal');let gi=0;for(let i=1;i<=6;i++){const f=document.createElement('figure');f.className='ph';f.style.transform=`rotateY(${(i%3-1)*10}deg)`;f.style.animation=`bob ${4+i%3}s ease-in-out infinite`;const im=new Image();im.src=`assets/images/gallery/photo${i}.jpg`;im.alt='Photo '+i;im.onerror=()=>{im.remove();f.textContent='Photo '+i};f.append(im);f.onclick=()=>lb(i-1);gal.append(f)}
function lb(i){gi=(i+6)%6;const b=$('#lbi');b.style.animation='none';void b.offsetWidth;b.style.animation='';b.textContent='';const im=new Image();im.src=`assets/images/gallery/photo${gi+1}.jpg`;im.onerror=()=>{im.remove();b.textContent='Photo '+(gi+1)};b.append(im);$('#lb').classList.add('on')}
$('#lp').onclick=()=>lb(gi-1);$('#ln').onclick=()=>lb(gi+1);$('#lx').onclick=()=>$('#lb').classList.remove('on');addEventListener('keydown',e=>{if(!$('#lb').classList.contains('on'))return;if(e.key=='ArrowLeft')lb(gi-1);if(e.key=='ArrowRight')lb(gi+1);if(e.key=='Escape')$('#lb').classList.remove('on')});
const WS=['May your life always be filled with sunshine and happiness.','May every new wave bring you exciting opportunities and beautiful adventures.','May your dreams sail toward wonderful destinations.','May you always find peace, love, and happiness in everything you do.','May your smile shine brighter than the morning sun.','May this new chapter of your life be your most beautiful journey yet.','Never stop shining, Natasha. The world is more beautiful with your smile.'];
WS.forEach((w,i)=>{const b=document.createElement('button');b.className='bk';b.textContent='🐚';b.setAttribute('aria-label','Shell '+(i+1));b.style.animationDelay=-i*.4+'s';b.onclick=async()=>{const my=Trans.tok;b.classList.add('fly');await sleep(900);if(Trans.tok!==my)return;const t=$('#wt');t.textContent=w;t.style.setProperty('--a','r'+i);t.style.animation='none';void t.offsetWidth;t.style.animation='';$('#wish').classList.add('on');$('#wok').textContent=i==6?'CONTINUE':'NEXT SHELL';Fx.burst(innerWidth/2,innerHeight/2,70);Fx.em.gold=1};$('#bots').append(b)});
$('#wok').onclick=()=>{$('#wish').classList.remove('on');Fx.em.gold=0;const bs=$$('.bk');bs[wi].className='bk done';bs[wi].disabled=true;wi++;if(wi<7){bs[wi].disabled=false;bs[wi].classList.add('on')}else show('#s7 .nx')};
$('#chest').onclick=async()=>{const c=$('#chest');if(c.classList.contains('open'))return;const my=Trans.tok;Trans.hide();c.classList.add('open');await sleep(900);Fx.burst(innerWidth/2,innerHeight*.6,150);Fx.em.gold=1;Fx.em.hearts=1;Fx.em.petals=1;$('#tmsg').classList.add('on');await sleep(RM?1500:4500);if(Trans.tok===my)show('#s8 .nx')};
$('#light').onclick=()=>{$('#cake').classList.add('lit');$('#light').classList.remove('show');Trans.hide();Fx.em.hearts=1;show('#blow')};
$('#blow').onclick=async()=>{const my=Trans.tok;$('#cake').className='out';$('#blow').classList.remove('show');Aud.bday=true;Fx.confetti(160);fwLoop(my,700);await say(['MAY ALL YOUR WISHES COME TRUE!'],my,1);await sleep(2500);if(Trans.tok===my)show('#s9 .nx')};
$('#rs').onclick=()=>{max=0;go(0)};
go(0);
$('#skip').onclick=()=>{if(cur<sc.length-1){if(cur===0)Aud.start();go(cur+1)}};
