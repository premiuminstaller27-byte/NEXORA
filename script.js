document.getElementById("year").textContent = new Date().getFullYear();
const canvas = document.getElementById("particles");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let particles = [], width = 0, height = 0;
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth; height = window.innerHeight;
    canvas.width = width*dpr; canvas.height = height*dpr;
    canvas.style.width = width+"px"; canvas.style.height = height+"px";
    ctx.setTransform(dpr,0,0,dpr,0,0);
    particles = Array.from({length:Math.min(85,Math.floor(width/13))},()=>({
      x:Math.random()*width,y:Math.random()*height,r:Math.random()*1.7+.3,
      speed:Math.random()*.35+.08,alpha:Math.random()*.6+.15
    }));
  }
  function animate() {
    ctx.clearRect(0,0,width,height);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    particles.forEach(p=>{
      if(!reduce){p.y-=p.speed;if(p.y < -5){p.y=height+5;p.x=Math.random()*width;}}
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(56,232,255,${p.alpha})`;ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  window.addEventListener("resize",resize);resize();animate();
}
const scene=document.getElementById("scene"), core=document.querySelector(".core");
if(scene && core){
  scene.addEventListener("pointermove",e=>{
    if(e.pointerType==="touch")return;
    const r=scene.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    core.style.animation="none";core.style.transform=`translateY(-8px) rotateX(${-y*25}deg) rotateY(${x*30}deg)`;
  });
  scene.addEventListener("pointerleave",()=>{core.style.transform="";core.style.animation="";});
}
