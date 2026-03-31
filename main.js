/* ══════════════════════════════════════════════
   PORTFOLIO GALAXY — main.js
══════════════════════════════════════════════ */

/* ── STARFIELD ────────────────────────────────
   Canvas de estrellas titilantes en el fondo.
   No necesitas editar esto.
────────────────────────────────────────────── */
(function () {
  const canvas = document.getElementById('starfield');
  const ctx    = canvas.getContext('2d');
  let W, H, stars = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  /* Generar 380 estrellas con propiedades aleatorias */
  for (let i = 0; i < 380; i++) {
    stars.push({
      x:    Math.random(),
      y:    Math.random(),
      r:    Math.random() * 1.4 + 0.2,
      a:    Math.random(),
      s:    Math.random() * 0.4 + 0.08,
      t:    Math.random() * Math.PI * 2,
      type: Math.random() > 0.93 ? 'cross' : 'dot' // ~7% son cruces de 4 puntas
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    stars.forEach(s => {
      s.t += s.s * 0.016;
      s.a  = 0.15 + Math.abs(Math.sin(s.t)) * 0.7;

      ctx.save();
      ctx.globalAlpha = s.a;

      if (s.type === 'cross') {
        /* Estrella de 4 puntas */
        const rl = s.r * 3.5;
        ctx.strokeStyle = 'rgba(200,180,255,.8)';
        ctx.lineWidth   = 0.8;
        ctx.beginPath(); ctx.moveTo(s.x * W - rl, s.y * H); ctx.lineTo(s.x * W + rl, s.y * H); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(s.x * W, s.y * H - rl); ctx.lineTo(s.x * W, s.y * H + rl); ctx.stroke();
      }

      /* Punto central */
      ctx.fillStyle = 'rgba(220,210,255,.9)';
      ctx.beginPath();
      ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    requestAnimationFrame(draw);
  }

  draw();
})();


/* ── CURSOR PERSONALIZADO ─────────────────────
   Cursor blob violeta con anillo que lo sigue.
────────────────────────────────────────────── */
(function () {
  const cur  = document.getElementById('cur');
  const ring = document.getElementById('cur-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  /* Posición instantánea del cursor */
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cur.style.left = mx + 'px';
    cur.style.top  = my + 'px';
  });

  /* Anillo sigue con lag suave */
  (function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  /* Cursor se agranda al pasar sobre elementos interactivos */
  document.querySelectorAll('a, button, .project-card, .service-card').forEach(el => {
    el.addEventListener('mouseenter', () => cur.classList.add('big'));
    el.addEventListener('mouseleave', () => cur.classList.remove('big'));
  });
})();


/* ── REVEAL ON SCROLL ─────────────────────────
   Elementos con clase .reveal aparecen al
   entrar en el viewport. Las barras de skills
   (.sk-fill) también se animan al revelarse.
────────────────────────────────────────────── */
(function () {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('on');
        /* Animar barras de habilidades */
        entry.target.querySelectorAll('.sk-fill').forEach(bar => bar.classList.add('on'));
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();


/* ── NAV LINK ACTIVO ──────────────────────────
   Resalta el link del nav correspondiente a la
   sección visible mientras el usuario hace scroll.
────────────────────────────────────────────── */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }, { passive: true });
})();

