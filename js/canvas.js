/**
 * canvas.js — Burakish Abaya
 * Hero background: floating arabesque geometry + drifting particles
 */
export function initCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const GOLD_RGB = '201,169,110';

  let W, H, cx, cy;

  // ── Resize ──────────────────────────────────────────
  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    cx = W / 2;
    cy = H / 2;
  }
  resize();
  window.addEventListener('resize', resize);

  // ── Particles ────────────────────────────────────────
  const PARTICLE_COUNT = 55;
  const particles = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * 1,
      y: Math.random() * 1,
      size: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.35 + 0.05,
      speed: Math.random() * 0.00012 + 0.00004,
      angle: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.018 + 0.008,
      twinklePhase: Math.random() * Math.PI * 2,
    });
  }

  // ── Geometric rings (arabesque) ──────────────────────
  const rings = [
    { r: 0.38, segments: 12, opacity: 0.04, rotSpeed: 0.00008 },
    { r: 0.28, segments: 8,  opacity: 0.05, rotSpeed: -0.00012 },
    { r: 0.18, segments: 6,  opacity: 0.06, rotSpeed: 0.00018 },
  ];
  let rot = 0;

  // ── Draw ─────────────────────────────────────────────
  function draw(ts) {
    ctx.clearRect(0, 0, W, H);

    // Background gradient
    const grad = ctx.createRadialGradient(cx, cy * 1.3, 0, cx, cy, Math.max(W, H) * 0.7);
    grad.addColorStop(0,   `rgba(${GOLD_RGB}, 0.055)`);
    grad.addColorStop(0.5, `rgba(${GOLD_RGB}, 0.01)`);
    grad.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    rot += 0.00008;

    // ── Draw rings ─────────────────────────────────────
    rings.forEach((ring, ri) => {
      const r = ring.r * Math.min(W, H);
      const a = ring.rotSpeed * ts * (ri % 2 === 0 ? 1 : -1);
      const segs = ring.segments;
      const angleStep = (Math.PI * 2) / segs;

      ctx.strokeStyle = `rgba(${GOLD_RGB}, ${ring.opacity})`;
      ctx.lineWidth = 0.5;

      // circle
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      // spokes
      for (let s = 0; s < segs; s++) {
        const angle = s * angleStep + a;
        const x1 = cx + Math.cos(angle) * r * 0.35;
        const y1 = cy + Math.sin(angle) * r * 0.35;
        const x2 = cx + Math.cos(angle) * r;
        const y2 = cy + Math.sin(angle) * r;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // polygon
      ctx.beginPath();
      for (let s = 0; s < segs; s++) {
        const angle = s * angleStep + a + (Math.PI / segs);
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        s === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    });

    // ── Draw particles ──────────────────────────────────
    particles.forEach(p => {
      p.angle += p.speed * Math.PI * 2;
      p.x += Math.cos(p.angle) * p.speed * 0.4;
      p.y -= p.speed * 0.6;

      if (p.y < -0.02) p.y = 1.02;
      if (p.x < -0.02) p.x = 1.02;
      if (p.x > 1.02)  p.x = -0.02;

      p.twinklePhase += p.twinkleSpeed;
      const tw = (Math.sin(p.twinklePhase) * 0.5 + 0.5);
      const op = p.opacity * tw;

      ctx.beginPath();
      ctx.arc(p.x * W, p.y * H, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${GOLD_RGB}, ${op})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
}
