/**
 * booking.js — Burakish Abaya
 * Styling Session form → WhatsApp redirect
 */

const WA_NUMBER = '971500000000'; // ← REPLACE with real WhatsApp number (no + or spaces)

export function initBooking() {
  const btn = document.getElementById('booking-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const name  = document.getElementById('f-name')?.value.trim()  || '';
    const phone = document.getElementById('f-phone')?.value.trim() || '';
    const date  = document.getElementById('f-date')?.value         || '';
    const time  = document.getElementById('f-time')?.value         || '';
    const occ   = document.getElementById('f-occ')?.value          || '';
    const notes = document.getElementById('f-notes')?.value.trim() || '';

    if (!name || !phone) {
      setButtonState(btn, 'error', '⚠  Please fill in your name and number');
      setTimeout(() => setButtonState(btn, 'default'), 2800);
      return;
    }

    const lines = [
      'Hello Burakish Abaya! I\'d like to book a Private Styling Session.',
      '',
      `Name: ${name}`,
      `Phone: ${phone}`,
      date  ? `Date: ${formatDate(date)}`      : null,
      time  ? `Time: ${time}`                  : null,
      occ   ? `Looking for: ${occ}`            : null,
      notes ? `Notes: ${notes}`                : null,
    ].filter(Boolean).join('\n');

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines)}`, '_blank');
    setButtonState(btn, 'success', '✦  Request Sent via WhatsApp');
    setTimeout(() => setButtonState(btn, 'default'), 4500);
  });
}

function setButtonState(btn, state, label) {
  const span = btn.querySelector('span');
  const states = {
    default: { text: '✦  Confirm My Session', bg: '',        color: '' },
    error:   { text: label,                   bg: '#6b4f20', color: '#fff' },
    success: { text: label,                   bg: '#25D366', color: '#000' },
  };
  const s = states[state];
  if (span) span.textContent = s.text;
  btn.style.background = s.bg;
  btn.style.color      = s.color;
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-AE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}
