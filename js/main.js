/**
 * main.js — Burakish Abaya
 * Orchestrates all modules and handles nav, scroll, hours highlighting
 */
import { initLoader }  from './loader.js';
import { initCursor }  from './cursor.js';
import { initCanvas }  from './canvas.js';
import { initBooking } from './booking.js';

// ── Store hours (24h, day 0=Sun 1=Mon … 6=Sat) ──────────
const HOURS = {
  rowIds: {
    // maps day-of-week → table row ID
    0: 'h-fri',   // Friday in UAE = day 5 in JS but we label by name
    5: 'h-fri',
    4: 'h-thu',
    // default (Sat=6, Mon=1, Tue=2, Wed=3) → 'h-main'
  }
};

function highlightToday() {
  const d = new Date().getDay(); // 0=Sun … 6=Sat
  let rowId = 'h-main'; // default Sat–Wed

  // UAE Friday = JS day 5
  if (d === 5) rowId = 'h-fri';
  // UAE Thursday = JS day 4
  else if (d === 4) rowId = 'h-thu';
  // Sunday = JS 0 → maps to 'h-main' row in UAE (Sat=6, Sun=0 are regular days)

  const row = document.getElementById(rowId);
  if (row) row.classList.add('today');
}

// ── Nav scroll behaviour ──────────────────────────────────
function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 70);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ── Mobile nav drawer ─────────────────────────────────────
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const drawer = document.getElementById('nav-drawer');
  if (!toggle || !drawer) return;

  toggle.addEventListener('click', () => {
    const open = drawer.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close on link click
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggle.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ── Scroll reveal ─────────────────────────────────────────
function initReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!els.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => io.observe(el));
}

// ── Counter animation for stats ───────────────────────────
function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      const target = +e.target.dataset.count;
      const suffix = e.target.dataset.suffix || '';
      const duration = 1600;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const val = Math.round(eased * target);
        e.target.textContent = val + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => io.observe(el));
}

// ── Parallax on hero content ──────────────────────────────
function initParallax() {
  const heroContent = document.querySelector('.hero-content');
  if (!heroContent) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrolled * 0.18}px)`;
      heroContent.style.opacity   = 1 - (scrolled / window.innerHeight) * 1.4;
    }
  }, { passive: true });
}

// ── Active nav link on scroll ─────────────────────────────
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a[href^="#"]');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 120;
    sections.forEach(sec => {
      if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { passive: true });
}

// ── Magnetic buttons ──────────────────────────────────────
function initMagnetic() {
  document.querySelectorAll('.btn-primary, .btn-outline, .nav-cta').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width  / 2;
      const y = e.clientY - rect.top  - rect.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });
    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'transform 0.15s ease';
    });
  });
}

// ── Boot ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initCursor();
  initCanvas();
  initBooking();
  initNav();
  initMobileNav();
  initReveal();
  animateCounters();
  initParallax();
  initActiveNav();
  initMagnetic();
  highlightToday();
});
