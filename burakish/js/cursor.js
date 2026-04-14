/**
 * cursor.js — Burakish Abaya
 * Luxury dual-ring custom cursor
 */
export function initCursor() {
  // Skip on touch/mobile
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = -100, my = -100;  // mouse pos
  let rx = -100, ry = -100;  // ring pos (lagged)

  // Direct mouse tracking for dot
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
  });

  // Laggy ring follows with RAF
  function animateRing() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover state on interactive elements
  const hoverables = 'a, button, .gi, .pillar, .ig-cell, .testi-card, .stat-item, input, select, textarea';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverables)) {
      ring.classList.add('hovering');
      dot.style.opacity = '0';
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverables)) {
      ring.classList.remove('hovering');
      dot.style.opacity = '1';
    }
  });

  // Click effect
  document.addEventListener('mousedown', () => {
    ring.classList.add('clicking');
    dot.style.transform = 'translate(-50%, -50%) scale(2)';
  });
  document.addEventListener('mouseup', () => {
    ring.classList.remove('clicking');
    dot.style.transform = 'translate(-50%, -50%) scale(1)';
  });

  // Hide when leaving window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });
}
