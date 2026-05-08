/* ═══════════════════════════════════════════
   SAEDA EL-MAGHAWRY · PORTFOLIO — script.js
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. NAVBAR scroll + active link ── */
  const nav      = document.getElementById('mainNav');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 50);
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 130) current = s.id;
    });
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${current}`));
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();


  /* ── 2. TYPED TEXT ── */
  const typedEl = document.querySelector('.typed-text');
  if (typedEl) {
    const phrases = [
      'Full Stack .NET Developer',
      'Angular Frontend Developer',
      'ASP.NET Core Builder',
      'Clean Architecture Advocate',
    ];
    let pi = 0, ci = 0, del = false;
    function type() {
      const p = phrases[pi];
      typedEl.textContent = del ? p.slice(0, ci--) : p.slice(0, ci++);
      let t = del ? 42 : 85;
      if (!del && ci === p.length + 1) { t = 2200; del = true; }
      else if (del && ci === 0)        { del = false; pi = (pi + 1) % phrases.length; t = 380; }
      setTimeout(type, t);
    }
    type();
  }


  /* ── 3. AOS SCROLL REVEALS ── */
  const aosEls = document.querySelectorAll('[data-aos]');
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('aos-animate'); revealObs.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  aosEls.forEach(el => revealObs.observe(el));


  /* ── 4. SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const tgt = document.querySelector(a.getAttribute('href'));
      if (!tgt) return;
      e.preventDefault();
      const bsCollapse = document.getElementById('navMenu');
      if (bsCollapse && bsCollapse.classList.contains('show')) {
        const bsInst = bootstrap.Collapse.getOrCreateInstance(bsCollapse);
        bsInst.hide();
      }
      window.scrollTo({ top: tgt.offsetTop - 68, behavior: 'smooth' });
    });
  });


  /* ── 5. PROJECT CARDS — subtle tilt ── */
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `translateY(-4px) rotateX(${(-y * 4).toFixed(1)}deg) rotateY(${(x * 4).toFixed(1)}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });


  /* ── 6. HERO PARALLAX (subtle) ── */
  const grid = document.querySelector('.hero-grid-overlay');
  const glow = document.querySelector('.hero-glow');
  window.addEventListener('mousemove', e => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    if (grid) grid.style.transform = `translate(${x * 8}px, ${y * 8}px)`;
    if (glow) glow.style.transform = `translate(${x * 22}px, ${y * 22}px)`;
  }, { passive: true });


  /* ── 7. COUNTER ANIMATION ── */
  const counters = document.querySelectorAll('.stat-num[data-count]');
  const cntObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el  = e.target;
      const end = +el.dataset.count;
      const dur = 1200;
      const step = dur / end;
      let cur = 0;
      const t = setInterval(() => {
        cur++;
        el.textContent = cur;
        if (cur >= end) clearInterval(t);
      }, step);
      cntObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => cntObs.observe(c));


  /* ── 8. FOOTER YEAR ── */
  const yr = document.querySelector('.footer-copy');
  if (yr) yr.innerHTML = yr.innerHTML.replace(/\d{4}/, new Date().getFullYear());

});
