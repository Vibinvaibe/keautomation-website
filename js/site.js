// KEA — Foundry · shared site behaviour
(function(){
  const nav=document.getElementById('nav');
  if(nav){addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>20),{passive:true});}

  const burger=document.getElementById('burger'),links=document.getElementById('navLinks');
  if(burger&&links){burger.addEventListener('click',()=>links.classList.toggle('open'));}

  const io=new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}
  }),{threshold:.12});
  document.querySelectorAll('.rv').forEach(el=>io.observe(el));
})();
