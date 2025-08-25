// TypeScript: interactive features for the portfolio
const themeBtn = document.getElementById('themeBtn') as HTMLButtonElement | null;
const menuBtn = document.getElementById('menuBtn') as HTMLButtonElement | null;
const nav = document.getElementById('nav') as HTMLElement | null;
const yearEl = document.getElementById('year') as HTMLElement | null;
const contactForm = document.getElementById('contactForm') as HTMLFormElement | null;
const statusEl = document.getElementById('status') as HTMLElement | null;

function applyTheme(theme: 'light'|'dark') {
  if (theme === 'dark') document.body.classList.add('dark'), document.body.classList.remove('light');
  else document.body.classList.add('light'), document.body.classList.remove('dark');
  localStorage.setItem('theme', theme);
}

function initTheme() {
  const stored = localStorage.getItem('theme') as ('light'|'dark'|null);
  if (stored) applyTheme(stored);
  else {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

if (themeBtn) themeBtn.addEventListener('click', ()=>{
  const isDark = document.body.classList.contains('dark');
  applyTheme(isDark ? 'light' : 'dark');
});

if (menuBtn && nav) menuBtn.addEventListener('click', ()=>{
  if (nav.style.display === 'flex') nav.style.display = 'none';
  else nav.style.display = 'flex';
});

if (contactForm && statusEl) {
  contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    statusEl.textContent = 'Thanks! Message recorded (demo).';
    contactForm.reset();
  });
}

document.addEventListener('DOMContentLoaded', initTheme);
