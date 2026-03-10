/* ═══════════════════════════════════════════════
   SAEDA EL-MAGHAWRY · PORTFOLIO — script.js
   ═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────
     1. NAVBAR — shrink on scroll + active link
  ───────────────────────────────────── */
  const nav = document.getElementById('mainNav');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  function onScroll() {
    // shrink
    nav.classList.toggle('scrolled', window.scrollY > 50);

    // active link
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();


  /* ─────────────────────────────────────
     2. TYPED TEXT in hero
  ───────────────────────────────────── */
  const typedEl = document.querySelector('.typed-text');
  const phrases = [
    'Full Stack Web Developer',
    'Angular Enthusiast',
    'ASP.NET Core Builder',
    'API Architect',
  ];
  let phraseIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const phrase = phrases[phraseIdx];
    typedEl.textContent = deleting
      ? phrase.slice(0, charIdx--)
      : phrase.slice(0, charIdx++);

    let delay = deleting ? 45 : 90;

    if (!deleting && charIdx === phrase.length + 1) {
      delay = 2000;
      deleting = true;
    } else if (deleting && charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      delay = 400;
    }
    setTimeout(type, delay);
  }
  type();


  /* ─────────────────────────────────────
     3. SCROLL-REVEAL (lightweight AOS)
  ───────────────────────────────────── */
  const aosEls = document.querySelectorAll('[data-aos]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  aosEls.forEach(el => observer.observe(el));


  /* ─────────────────────────────────────
     4. SMOOTH SCROLL for anchor links
  ───────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      // close mobile nav if open
      const navCollapse = document.getElementById('navMenu');
      if (navCollapse.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
      }

      window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
    });
  });


  /* ─────────────────────────────────────
     5. SKILL BADGES — staggered hover ripple
  ───────────────────────────────────── */
  document.querySelectorAll('.skill-badge').forEach((badge, i) => {
    badge.style.transitionDelay = `${i * 18}ms`;
  });


  /* ─────────────────────────────────────
     6. PROJECT CARDS — tilt effect on mouse
  ───────────────────────────────────── */
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${(-y * 5).toFixed(1)}deg) rotateY(${(x * 5).toFixed(1)}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  /* ─────────────────────────────────────
     7. HERO GRID PARALLAX
  ───────────────────────────────────── */
  const gridOverlay = document.querySelector('.hero-grid-overlay');
  const heroGlow    = document.querySelector('.hero-glow');

  window.addEventListener('mousemove', e => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    if (gridOverlay) {
      gridOverlay.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
    }
    if (heroGlow) {
      heroGlow.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
    }
  }, { passive: true });


  /* ─────────────────────────────────────
     8. FOOTER — current year
  ───────────────────────────────────── */
  const copyEl = document.querySelector('.footer-copy');
  if (copyEl) {
    copyEl.innerHTML = copyEl.innerHTML.replace('2025', new Date().getFullYear());
  }

});
