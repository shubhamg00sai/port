// Compiled JS (from TS) - hand-transpiled for browser
var themeBtn = document.getElementById('themeBtn');
var menuBtn = document.getElementById('menuBtn');
var nav = document.getElementById('nav');
var yearEl = document.getElementById('year');
var contactForm = document.getElementById('contactForm');
var statusEl = document.getElementById('status');
function applyTheme(theme) {
    if (theme === 'dark')
        document.body.classList.add('dark'), document.body.classList.remove('light');
    else
        document.body.classList.add('light'), document.body.classList.remove('dark');
    localStorage.setItem('theme', theme);
}
function initTheme() {
    var stored = localStorage.getItem('theme');
    if (stored)
        applyTheme(stored);
    else {
        var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light');
    }
    if (yearEl)
        yearEl.textContent = String(new Date().getFullYear());
}
if (themeBtn)
    themeBtn.addEventListener('click', function () {
        var isDark = document.body.classList.contains('dark');
        applyTheme(isDark ? 'light' : 'dark');
    });
if (menuBtn && nav)
    menuBtn.addEventListener('click', function () {
        if (nav.style.display === 'flex')
            nav.style.display = 'none';
        else
            nav.style.display = 'flex';
    });
if (contactForm && statusEl) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        statusEl.textContent = 'Thanks! Message recorded (demo).';
        contactForm.reset();
    });
}
document.addEventListener('DOMContentLoaded', initTheme);
