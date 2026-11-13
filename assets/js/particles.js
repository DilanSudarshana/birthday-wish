window.Fx=(()=>{const c=document.getElementById('fx'),x=c.getContext('2d'),R=Math.random,RM=matchMedia('(prefers-reduced-motion:reduce)').matches;let W,H,D,t=0,ga=0,bolt=null;
function size(){D=Math.min(devicePixelRatio||1,innerWidth<700?1.5:2);W=c.width=innerWidth*D;H=c.height=innerHeight*D}addEventListener('resize',size);size();
const N=innerWidth<700?220:420,rain=Array.from({length:N},()=>({x:R()*1.3-.15,y:R(),z:R()})),P=[],drops=[],em={petals:0,gold:0,hearts:0},gulls=Array.from({length:5},(_,i)=>({x:R(),y:.1+R()*.2,v:.03+R()*.03,p:R()*9}));
const add=o=>{if(P.length<650)P.push({life:0,max:2,vx:0,vy:0,g:0,size:4,rot:0,vr:0,type:'dot',c:'255,215,120',...o})};
const PAL=['255,215,120','255,150,170','150,200,255','255,255,255'];
function mkBolt(far){const sx=W*(.15+R()*.7),st=H*(far?.05:.045),ey=far?H*.5:H*(.4+R()*.15),pts=[[sx,0]];let px=sx,py=0;while(py<ey){px+=(R()-.5)*st*1.4;py+=st*(.6+R()*.8);pts.push([px,py])}
const br=[];if(!far)for(let i=0;i<3;i++){const s=pts[1+((R()*(pts.length-2))|0)];let bx=s[0],by=s[1];const b=[[bx,by]];for(let k=0;k<4;k++){bx+=(R()-.3)*st*1.6*(R()<.5?-1:1);by+=st*.6;b.push([bx,by])}br.push(b)}bolt={pts,br,far}}
function line(p,w,col){x.beginPath();p.forEach((q,i)=>i?x.lineTo(q[0],q[1]):x.moveTo(q[0],q[1]));x.lineWidth=w;x.strokeStyle=col;x.stroke()}
function draw(dt,hz){t+=dt;x.clearRect(0,0,W,H);const S=window.S,lvl=S.rain*(1+S.boost*.5)*(RM?.4:1),n=Math.floor(N*Math.min(1,lvl)),wind=.25+S.storm*.35+S.boost*.2+Math.sin(t*.4)*.1*S.storm;
x.lineCap='round';for(let i=0;i<n;i++){const r=rain[i],sp=(.9+r.z*1.6)*(1+S.boost*.3),len=(14+r.z*40)*D*(1+S.storm*.6);r.y+=dt*sp*1.2;r.x+=dt*sp*1.2*wind*H/W;if(r.y>1.05){r.y=-.05;r.x=R()*1.3-.15}
const px=r.x*W,py=r.y*H;x.strokeStyle=`rgba(200,215,235,${.15+r.z*.35})`;x.lineWidth=(.6+r.z*1.8)*D;x.beginPath();x.moveTo(px,py);x.lineTo(px+wind*len,py+len);x.stroke()}
if(lvl>.15&&R()<lvl*.5)add({type:'splash',x:R()*W,y:H*(.55+R()*.4),max:.35,size:(2+R()*4)*D,c:'220,235,255'});
if(S.storm>.3&&R()<S.storm*.6)add({x:R()*W,y:H*(.5+R()*.3),vx:(200+R()*300)*D,vy:-(40+R()*80)*D,g:150*D,max:1,size:2*D,c:'235,245,255'});
if(lvl>.05&&drops.length<40&&R()<dt*lvl*5)drops.push({x:R()*W,y:R()*H*.8,r:(3+R()*9)*D,vy:0,s:R()*3});
for(let i=drops.length-1;i>=0;i--){const d=drops[i];if(lvl<.05)d.s=0;d.s-=dt;if(d.s<0){d.vy+=dt*60*D;d.y+=d.vy*dt}if(d.y>H){drops.splice(i,1);continue}
x.fillStyle='rgba(255,255,255,.08)';x.strokeStyle='rgba(255,255,255,.35)';x.lineWidth=D;x.beginPath();x.ellipse(d.x,d.y,d.r*.8,d.r,0,0,7);x.fill();x.stroke()}
if(em.petals&&R()<dt*8)add({type:'petal',x:R()*W,y:-10,vx:(30+R()*60)*D,vy:(40+R()*60)*D,vr:R()*3,max:9,size:(5+R()*6)*D,c:R()<.5?'255,170,190':'255,230,240'});
if(em.gold&&R()<dt*20)add({type:'spark',x:R()*W,y:H*(.5+R()*.5),vy:-(20+R()*40)*D,max:3,size:2*D});
if(em.hearts&&R()<dt*3)add({type:'heart',x:R()*W,y:H,vy:-(60+R()*60)*D,max:5,size:(14+R()*16)*D,c:'255,120,160'});
for(let i=P.length-1;i>=0;i--){const p=P[i];p.life+=dt;if(p.life>p.max){P.splice(i,1);continue}p.vy+=p.g*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.rot+=p.vr*dt;const a=1-p.life/p.max;x.fillStyle=`rgba(${p.c},${a})`;
if(p.type=='splash'){x.strokeStyle=x.fillStyle;x.lineWidth=D;x.beginPath();x.arc(p.x,p.y,p.size*(1+p.life/p.max*3),0,7);x.stroke()}
else if(p.type=='spark'){x.globalCompositeOperation='lighter';x.beginPath();x.arc(p.x,p.y,p.size,0,7);x.fill();x.globalCompositeOperation='source-over'}
else if(p.type=='conf'){x.save();x.translate(p.x,p.y);x.rotate(p.rot);x.fillRect(-p.size,-p.size/2,p.size*2,p.size);x.restore()}
else if(p.type=='heart'){x.font=p.size+'px serif';x.fillText('♥',p.x,p.y)}
else if(p.type=='petal'){x.save();x.translate(p.x,p.y);x.rotate(p.rot);x.beginPath();x.ellipse(0,0,p.size,p.size*.5,0,0,7);x.fill();x.restore()}
else{x.beginPath();x.arc(p.x,p.y,p.size,0,7);x.fill()}}
const gt=S.storm<.05&&S.sun>.5?1:0;ga+=(gt-ga)*dt;if(ga>.02){x.strokeStyle=`rgba(40,50,60,${ga})`;x.lineWidth=2*D;gulls.forEach(g=>{g.x+=g.v*dt;if(g.x>1.1)g.x=-.1;const px=g.x*W,py=g.y*H+Math.sin(t+g.p)*8*D,s=14*D,w=Math.sin(t*5+g.p)*.7;x.beginPath();x.moveTo(px-s,py-w*s*.5);x.quadraticCurveTo(px-s*.4,py-s*.5-w*s*.4,px,py);x.quadraticCurveTo(px+s*.4,py-s*.5-w*s*.4,px+s,py-w*s*.5);x.stroke()})}
if(S.flash>.02){if(bolt){const a=S.flash;line(bolt.pts,10*D,`rgba(180,200,255,${.35*a})`);line(bolt.pts,2*D,`rgba(255,255,255,${a})`);bolt.br.forEach(b=>line(b,1.5*D,`rgba(255,255,255,${a*.8})`))}
x.fillStyle=`rgba(210,225,255,${S.flash*(RM?.12:.45)*(bolt&&bolt.far?.4:1)})`;x.fillRect(0,0,W,H)}else bolt=null}
return{draw,em,bolt:()=>mkBolt(R()<.4),
burst(px,py,n,o={}){for(let i=0;i<n;i++){const a=R()*6.28,s=(40+R()*220)*D;add({type:'spark',x:px*D,y:py*D,vx:Math.cos(a)*s,vy:Math.sin(a)*s,g:60*D,max:1.5+R(),size:2.5*D,...o})}},
fw(px,py){const c=PAL[(R()*4)|0];for(let i=0;i<70;i++){const a=R()*6.28,s=(60+R()*220)*D;add({type:'spark',x:px*D,y:py*D,vx:Math.cos(a)*s,vy:Math.sin(a)*s,g:120*D,max:1.2+R(),size:2.2*D,c})}},
confetti(n){for(let i=0;i<n;i++)add({type:'conf',x:W/2+(R()-.5)*W*.3,y:H*.6,vx:(R()-.5)*700*D,vy:-(300+R()*600)*D,g:600*D,vr:(R()-.5)*12,max:3.5,size:(3+R()*4)*D,c:PAL[(R()*3)|0]})}}})();
