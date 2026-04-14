/**
 * loader.js — Burakish Abaya
 * Premium page loading screen with progress animation
 */
export function initLoader() {
  const loader  = document.getElementById('loader');
  const bar     = document.getElementById('loader-bar');
  const pctEl   = document.getElementById('loader-pct');
  if (!loader || !bar) return;

  let progress = 0;
  const duration = 1800; // ms
  const start = performance.now();

  // Eased progress function
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function tick(now) {
    const elapsed = now - start;
    const raw = Math.min(elapsed / duration, 1);
    progress = easeOutCubic(raw) * 100;

    bar.style.width = progress + '%';
    if (pctEl) pctEl.textContent = Math.round(progress) + '%';

    if (raw < 1) {
      requestAnimationFrame(tick);
    } else {
      // Small pause at 100% before hiding
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
      }, 350);
    }
  }

  document.body.style.overflow = 'hidden';
  requestAnimationFrame(tick);
}
