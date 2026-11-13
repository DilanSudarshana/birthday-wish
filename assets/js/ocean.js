(()=>{const c=document.getElementById('sea'),x=c.getContext('2d'),dk=document.getElementById('dark'),fg=document.getElementById('fog'),RM=matchMedia('(prefers-reduced-motion:reduce)').matches;let W,H,D,t=0,sunX=0;
const S=window.S={storm:1,rain:1,light:1,cloud:1,sun:0,sunset:0,boost:0,dark:1,flash:0},cam={s:1.08,x:0,y:0},ct={s:1.08,x:0,y:0},tw=[];
const cl=(v,a=0,b=1)=>Math.min(b,Math.max(a,v)),mx=(a,b,k)=>a+(b-a)*k,ma=(A,B,k)=>A.map((v,i)=>mx(v,B[i],k)),rgb=a=>`rgb(${a.map(Math.round)})`;
function size(){D=Math.min(devicePixelRatio||1,innerWidth<700?1.5:2);W=c.width=innerWidth*D;H=c.height=innerHeight*D}addEventListener('resize',size);size();
const clouds=Array.from({length:16},(_,i)=>({x:Math.random(),y:.03+Math.random()*.3,s:.7+Math.random()*.9,v:.004+Math.random()*.01,i}));
window.Ocean={V:{wide:{s:1.08,x:0,y:0},behind:{s:1.6,x:0,y:-.04},side:{s:1.35,x:-.12,y:-.02},deck:{s:1.9,x:0,y:-.14},horizon:{s:1.6,x:0,y:.1}},
cam:o=>Object.assign(ct,o),snap:o=>{Object.assign(ct,o);Object.assign(cam,o)},set:o=>Object.assign(S,o),clear:()=>{tw.length=0},
to(o,sec){const from={};for(const k in o)from[k]=S[k];tw.push({o,from,t:0,d:Math.max(1,sec*1000)})},
line:(ms,fn)=>new Promise(r=>tw.push({fn,t:0,d:ms,done:r}))};
function ship(hz,tot){const st=S.storm,ub=Math.min(W/520,H/460),k=Math.min(1,(W*.88/(440*ub))/tot),bob=Math.sin(t*1.1)*(3+20*st+10*S.boost)*D,rot=RM?0:Math.sin(t*.9)*(.012+.07*st+.05*S.boost)+Math.sin(t*2.3)*.01*st,dim=Math.min(1.3,.4+.6*(1-st)+S.flash*.8),sh=a=>rgb(a.map(v=>v*dim));
const ys=hz+(H-hz)*.42+bob;x.save();x.translate(W/2-(H>W?cam.x*W/tot:0),H/2+(ys-H/2)*k);x.rotate(rot);x.scale(ub*k,ub*k);
x.fillStyle=sh([96,60,36]);x.beginPath();x.moveTo(-190,-30);x.lineTo(-155,28);x.quadraticCurveTo(0,44,150,28);x.lineTo(205,-42);x.quadraticCurveTo(0,-18,-190,-30);x.fill();
x.strokeStyle=sh([244,197,66]);x.lineWidth=3;x.beginPath();x.moveTo(-190,-30);x.quadraticCurveTo(0,-18,205,-42);x.stroke();
x.fillStyle=sh([120,76,44]);x.fillRect(-190,-72,70,44);x.fillStyle='rgba(255,200,90,.9)';x.beginPath();x.arc(-185+Math.sin(t*2.5)*5,-80,5,0,7);x.fill();
x.strokeStyle=sh([58,40,26]);x.lineWidth=5;[[-90,230],[20,270],[125,200]].forEach(([m,h],i)=>{x.beginPath();x.moveTo(m,-30);x.lineTo(m,-h);x.stroke();
const yt=-h+18,yb=-h*.42,w=40+h/10,bg=(6+18*(.3+st+S.boost*.3))*(Math.sin(t*(2+st*3)+i)*.5+.7);x.fillStyle=sh([238,228,205]);x.beginPath();x.moveTo(m-w,yt);x.quadraticCurveTo(m+bg,yt-6,m+w,yt);x.quadraticCurveTo(m+w+bg*.8,(yt+yb)/2,m+w-4,yb);x.quadraticCurveTo(m+bg*.6,yb+14,m-w+4,yb);x.quadraticCurveTo(m-w+bg*.5,(yt+yb)/2,m-w,yt);x.fill()});
x.lineWidth=1.5;[[-90,-230,-190,-30],[20,-270,205,-42],[125,-200,205,-42],[20,-270,-190,-30]].forEach(([a,b,c2,d],i)=>{x.beginPath();x.moveTo(a,b);x.quadraticCurveTo((a+c2)/2,(b+d)/2+Math.sin(t*2+i)*(6+16*st),c2,d);x.stroke()});
const f=Math.sin(t*6)*(3+6*st);x.fillStyle=sh([210,50,60]);x.beginPath();x.moveTo(20,-270);x.lineTo(52+f,-262+f/2);x.lineTo(20,-254);x.fill();x.restore()}
function draw(dt){t+=dt;const st=S.storm,b=S.boost,sun=S.sun,ss=S.sunset;for(const k in cam)cam[k]+=(ct[k]-cam[k])*cl(dt*(RM?3:.7));
const hz=H*.5,gust=Math.max(0,Math.sin(t*.7)+Math.sin(t*1.9))*.5,shk=RM?0:(st*1.2+b*3)*(.3+gust)*D;
x.setTransform(1,0,0,1,0,0);x.fillStyle='#000';x.fillRect(0,0,W,H);x.save();x.translate(W/2+cam.x*W+(Math.random()-.5)*shk,H/2+cam.y*H+(Math.random()-.5)*shk);const pz=H>W?1.3:1;x.scale(cam.s*pz,cam.s*pz);x.translate(-W/2,-H/2);
const top=ma(ma([70,150,225],[70,55,125],ss),[14,18,28],st),bot=ma(ma([190,225,245],[255,165,85],ss),[62,72,90],st);let g=x.createLinearGradient(0,0,0,hz);g.addColorStop(0,rgb(top));g.addColorStop(1,rgb(bot));x.fillStyle=g;x.fillRect(-W,-H,3*W,H+hz);
if(sun>.01){const sx=sunX=W*(.62-.12*ss),sy=mx(hz+H*.12,hz-H*.3,sun)+ss*H*.22,r=H*.07;g=x.createRadialGradient(sx,sy,0,sx,sy,r*6);g.addColorStop(0,`rgba(255,${mx(235,170,ss)|0},120,${.9*sun})`);g.addColorStop(.15,`rgba(255,215,120,${.5*sun})`);g.addColorStop(1,'rgba(255,200,100,0)');x.fillStyle=g;x.fillRect(sx-r*6,sy-r*6,r*12,r*12);x.fillStyle=`rgba(255,250,225,${sun})`;x.beginPath();x.arc(sx,sy,r,0,7);x.fill()}
const cc=ma(ma([36,40,52],[255,255,255],1-st),[255,190,160],ss*.7);
for(const q of clouds){q.x+=q.v*dt*(.5+st*3+b*2);if(q.x>1.3)q.x=-.3;const a=cl((S.cloud+.25-(q.i%8)/10)*2)*(.55+.4*st);if(a<.02)continue;const cx=q.x*W,cy=q.y*hz*2.2,r=H*.07*q.s;x.fillStyle=`rgba(${cc.map(Math.round)},${a})`;for(let k=0;k<6;k++){x.beginPath();x.arc(cx+(k-2.5)*r*.9,cy+Math.sin(k*2+q.i)*r*.25,r*(1-Math.abs(k-2.5)*.12),0,7);x.fill()}}
if(st*S.cloud>.02){g=x.createLinearGradient(0,0,0,hz);g.addColorStop(0,`rgba(8,10,18,${.5*st*S.cloud})`);g.addColorStop(1,'rgba(8,10,18,0)');x.fillStyle=g;x.fillRect(-W,-H,3*W,H+hz)}
const wc=ma(ma([20,100,170],[40,70,120],ss),[22,34,46],st),x0=-W*.3,sp=14*D,n=Math.ceil(W*1.6/sp)+1,ys=[];
for(let k=0;k<9;k++){const f=k/8,y0=hz+(H-hz)*Math.pow(f,1.25),amp=(4+k*6)*D*(.22+.78*st+.45*b),wl=(340-k*20)*D,sv=.8+st*1.6+k*.1,col=ma(ma(wc,[70,170,215],f*.45*(1-st)),[8,12,18],f*.55*st);
for(let i=0;i<n;i++){const px=x0+i*sp;ys[i]=y0+amp*(Math.sin(px/wl+t*sv+k*1.7)+.5*Math.sin(px/(wl*.47)-t*sv*1.3+k))}
x.fillStyle=rgb(col);x.beginPath();x.moveTo(x0,H*2);for(let i=0;i<n;i++)x.lineTo(x0+i*sp,ys[i]);x.lineTo(x0+n*sp,H*2);x.fill();
if(k>=2&&st>.12){x.strokeStyle=`rgba(255,255,255,${(.12+.45*f)*st})`;x.lineWidth=(1+f*2)*D;x.beginPath();for(let i=0;i<n;i++)i?x.lineTo(x0+i*sp,ys[i]):x.moveTo(x0,ys[0]);x.stroke()}
if(k==3&&sun>.05){for(let i=0;i<30;i++){const gy=hz+Math.pow(i/30,1.6)*(H-hz)*.6,w=(6+i*3)*D*(.4+.6*Math.sin(t*3+i*7)),gx=sunX+Math.sin(t*.8+i)*(8+i*2)*D;x.fillStyle=`rgba(255,${mx(240,190,ss)|0},150,${.5*sun*(1-st)})`;x.fillRect(gx-w/2,gy,w,2*D)}}
if(k==4)ship(hz,cam.s*pz)}
x.restore();dk.style.opacity=S.dark;fg.style.opacity=(st*.55+b*.2).toFixed(2);
if(S.light>.04&&Math.random()<dt*(.35+b*.5)*S.light){S.flash=1;Fx.bolt();setTimeout(()=>{if(Math.random()<.6)S.flash=.8},110);setTimeout(()=>window.Aud&&Aud.thunder(),300+Math.random()*900)}
S.flash=Math.max(0,S.flash-dt*3)}
let last=performance.now();(function f(nw){const dt=Math.min(.05,(nw-last)/1000);last=nw;
for(let i=tw.length-1;i>=0;i--){const w=tw[i];w.t+=dt*1000;const p=cl(w.t/w.d),e=p*p*(3-2*p);if(w.o)for(const k in w.o)S[k]=mx(w.from[k],w.o[k],e);else w.fn(p);if(p>=1){tw.splice(i,1);w.done&&w.done()}}
draw(dt);Fx.draw(dt,H*.5);window.Aud&&Aud.update();requestAnimationFrame(f)})(last)})();
