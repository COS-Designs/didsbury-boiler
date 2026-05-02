/* gsap-global.js — shared GSAP animations for all pages */
(function () {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  /* ─── SCROLL REVEAL ─── */
  // Use ScrollTrigger to toggle the CSS `.in` class on `.reveal` elements.
  // CSS handles the actual fade/slide-up transition — GSAP just triggers it.
  gsap.utils.toArray('.reveal').forEach(el => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => el.classList.add('in'),
    });
  });

  /* ─── PAGE HERO ENTRANCE (inner pages only) ─── */
  const pageHeroInner = document.querySelector('.page-hero-inner');
  if (pageHeroInner) {
    gsap.set(pageHeroInner, { opacity: 0, y: 28 });
    gsap.to(pageHeroInner, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.15 });
  }

  /* ─── STEP CARD HOVER — 3D TILT + OLIVE OVERLAY ─── */
  gsap.utils.toArray('.step-card').forEach(card => {
    const h3     = card.querySelector('h3');
    const p      = card.querySelector('p');
    const badge  = card.querySelector('.step-badge');
    const numBg  = card.querySelector('.step-num-bg');
    const bg     = card.querySelector('.step-card-bg');

    card.addEventListener('mouseenter', () => {
      gsap.to(card, { y: -9, scale: 1.025, boxShadow: '0 24px 56px rgba(46,59,30,0.28)', duration: 0.38, ease: 'power2.out' });
      if (bg)    gsap.to(bg,    { opacity: 0.92, duration: 0.35 });
      if (badge) gsap.to(badge, { y: -5, scale: 1.06, backgroundColor: 'rgba(255,255,255,0.2)', color: '#FDFAF6', duration: 0.35, ease: 'back.out(2)' });
      if (h3)    gsap.to(h3,    { color: '#FDFAF6', duration: 0.28 });
      if (p)     gsap.to(p,     { color: 'rgba(253,250,246,0.75)', duration: 0.28 });
      if (numBg) gsap.to(numBg, { scale: 1.12, color: 'rgba(255,255,255,0.1)', duration: 0.38 });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, { y: 0, scale: 1, rotateX: 0, rotateY: 0, boxShadow: 'none', duration: 0.5, ease: 'power2.out' });
      if (bg)    gsap.to(bg,    { opacity: 0, duration: 0.45 });
      if (badge) gsap.to(badge, { y: 0, scale: 1, backgroundColor: '#2E3B1E', color: '#FDFAF6', duration: 0.38 });
      if (h3)    gsap.to(h3,    { color: '#1A1A14', duration: 0.38 });
      if (p)     gsap.to(p,     { color: '#4A4840', duration: 0.38 });
      if (numBg) gsap.to(numBg, { scale: 1, color: 'rgba(0,0,0,0.06)', duration: 0.38 });
    });

    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const dx = ((e.clientX - r.left) / r.width  - 0.5) * 2;
      const dy = ((e.clientY - r.top)  / r.height - 0.5) * 2;
      gsap.to(card, {
        rotateY: dx * 9,
        rotateX: -dy * 6,
        transformPerspective: 800,
        duration: 0.22,
        ease: 'power1.out',
        overwrite: 'auto',
      });
    });
  });

  /* ─── SERVICE CARD HOVER (subtle glow on desktop) ─── */
  gsap.utils.toArray('.svc-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { scale: 1.01, duration: 0.3, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { scale: 1, duration: 0.4, ease: 'power2.out' });
    });
  });

  /* ─── REVIEW CARD HOVER ─── */
  gsap.utils.toArray('.review-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { y: -6, boxShadow: '0 16px 40px rgba(46,59,30,0.12)', duration: 0.35, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { y: 0, boxShadow: 'none', duration: 0.45, ease: 'power2.out' });
    });
  });

  /* ─── CTA BAND REVEAL ─── */
  const ctaBand = document.querySelector('.cta-band');
  if (ctaBand) {
    const ctaH2    = ctaBand.querySelector('h2');
    const ctaRight = ctaBand.querySelector('.cta-band-right');
    if (ctaH2)    gsap.from(ctaH2,    { scrollTrigger: { trigger: ctaBand, start: 'top 80%', once: true }, opacity: 0, x: -40, duration: 0.9, ease: 'power3.out' });
    if (ctaRight) gsap.from(ctaRight, { scrollTrigger: { trigger: ctaBand, start: 'top 80%', once: true }, opacity: 0, x:  40, duration: 0.9, delay: 0.15, ease: 'power3.out' });
  }

  /* ─── NAV LINK MAGNETIC HOVER ─── */
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('mouseenter', () => gsap.to(link, { scale: 1.05, duration: 0.2, ease: 'power1.out' }));
    link.addEventListener('mouseleave', () => gsap.to(link, { scale: 1, duration: 0.25, ease: 'power1.out' }));
  });

})();
