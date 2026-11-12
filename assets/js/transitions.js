window.sleep=ms=>new Promise(r=>setTimeout(r,ms));
window.Trans={tok:0,
async wipe(type,cb){const w=document.getElementById('wipe');w.className='';void w.offsetWidth;w.className='on '+type;await sleep(780);cb();await sleep(60);w.className='off '+type;await sleep(800);w.className=''},
async say(lines,my,keep){const el=document.getElementById('cap');for(let i=0;i<lines.length;i++){el.textContent=lines[i];el.classList.add('v');await sleep(2900);if(Trans.tok!==my)return false;if(keep&&i==lines.length-1)return true;el.classList.remove('v');await sleep(1100);if(Trans.tok!==my)return false}return true},
hide(){document.getElementById('cap').classList.remove('v')}};
window.Aud=(()=>{const N={storm:'storm',rain:'rain',wind:'wind',calm:'ocean-calm',gulls:'seagulls',bday:'birthday'},A={};let on=false,mute=false;const cl=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
document.getElementById('snd').onclick=e=>{mute=!mute;e.target.textContent=mute?'🔇':'🔊'};
return{bday:false,start(){if(on)return;on=true;for(const k in N){const a=new Audio('assets/audio/'+N[k]+'.mp3');a.loop=true;a.volume=0;A[k]=a}},
thunder(){if(!on||mute||S.storm<.2)return;const a=new Audio('assets/audio/thunder.mp3');a.volume=cl(.3+S.storm*.5);a.play().catch(()=>{})},
update(){if(!on)return;const T={storm:S.storm<.02?0:S.storm*.8,rain:cl(S.rain*.7),wind:S.storm*.6+.1,calm:(1-S.storm)*.6,gulls:S.storm<.05&&S.sun>.5?.25:0,bday:this.bday?.5:0};
for(const k in A){const a=A[k],v=mute?0:T[k];a.volume=cl(a.volume+(v-a.volume)*.05);if(v<.003&&a.volume<.005){if(!a.paused)a.pause()}else if(a.paused)a.play().catch(()=>{})}}}})();
