
/* ---------- ambient falling hearts & petals ---------- */
const HEART_PATH = 'M50 88C50 88 12 62 12 34C12 18 24 8 38 8C46 8 50 14 50 14C50 14 54 8 62 8C76 8 88 18 88 34C88 62 50 88 50 88Z';
const PETAL_PATH = 'M50 6C64 20 78 38 78 56C78 74 66 90 50 94C34 90 22 74 22 56C22 38 36 20 50 6Z';
 
const driftColors = ['var(--rust)', 'var(--blush)', 'var(--sage)'];
const fx = document.getElementById('falling-fx');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 
if (fx && !reduceMotion){
  const COUNT = 20;
  for (let i = 0; i < COUNT; i++){
    const isHeart = Math.random() > 0.5;
    const size = 12 + Math.random() * 16;
    const el = document.createElement('div');
    el.className = 'drift';
    el.style.setProperty('--x', Math.random() * 100 + '%');
    el.style.setProperty('--size', size + 'px');
    el.style.setProperty('--dur', (9 + Math.random() * 8) + 's');
    el.style.setProperty('--delay', (Math.random() * 14) + 's');
    el.style.setProperty('--drift', (Math.random() * 80 - 40) + 'px');
    el.style.setProperty('--rot', (Math.random() * 260 + 100) + 'deg');
    el.style.setProperty('--op', (0.35 + Math.random() * 0.4).toFixed(2));
    el.style.setProperty('--tint', driftColors[Math.floor(Math.random() * driftColors.length)]);
    el.innerHTML = '<svg viewBox="0 0 100 100"><path d="' + (isHeart ? HEART_PATH : PETAL_PATH) + '"/></svg>';
    fx.appendChild(el);
  }
}
 
/* ---------- reveal paw trail as it scrolls into view ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.3 });
 
document.querySelectorAll('.paw').forEach((el, i) => {
  setTimeout(() => io.observe(el), i * 80);
});
 
/* ---------- reveal the letter (as an overlay) when the puppy is tapped ---------- */
const pupButton = document.getElementById('pup-button');
const tapBadge = document.getElementById('tap-badge');
const letterSection = document.getElementById('letter-section');
const letterClose = document.getElementById('letter-close');
 
function openLetter(){
  letterSection.classList.add('open');
  tapBadge.classList.add('hidden');
}
function closeLetter(){
  letterSection.classList.remove('open');
}
 
pupButton.addEventListener('click', openLetter);
letterClose.addEventListener('click', closeLetter);
 
// click on the dim backdrop (outside the card) also closes it
letterSection.addEventListener('click', (e) => {
  if (e.target === letterSection) closeLetter();
});
 
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLetter();
});
 
/* ---------- fullscreen toggle ---------- */
const fsButton = document.getElementById('fullscreen-button');
 
function isFullscreen(){
  return !!(document.fullscreenElement || document.webkitFullscreenElement);
}
 
function enterFullscreen(){
  const el = document.documentElement;
  const request = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
  if (request) request.call(el).catch(() => {});
}
 
function exitFullscreen(){
  const exit = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
  if (exit) exit.call(document).catch(() => {});
}
 
const EXPAND_ICON = 'M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5';
const COLLAPSE_ICON = 'M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5';
 
function updateFsButton(){
  if (!fsButton) return;
  const active = isFullscreen();
  fsButton.classList.toggle('is-active', active);
  fsButton.setAttribute('aria-label', active ? 'Exit full screen' : 'Enter full screen');
  const path = fsButton.querySelector('path');
  if (path) path.setAttribute('d', active ? COLLAPSE_ICON : EXPAND_ICON);
}
 
if (fsButton){
  fsButton.addEventListener('click', () => {
    isFullscreen() ? exitFullscreen() : enterFullscreen();
  });
  ['fullscreenchange','webkitfullscreenchange'].forEach(evt => {
    document.addEventListener(evt, updateFsButton);
  });
}
 
/* ---------- music: autoplay, loop forever, never pause ---------- */
const music = document.getElementById('bg-music');
music.loop = true;
music.volume = 1;
 
function tryPlay(){
  const p = music.play();
  if (p !== undefined){ p.catch(() => {}); }
}
 
// attempt immediately on load
window.addEventListener('DOMContentLoaded', tryPlay);
tryPlay();
 
// some browsers still require one interaction before unmuted audio can play —
// this silently catches the very first interaction anywhere on the page
// (no visible prompt) so the music starts as soon as it's technically allowed
['click','touchstart','keydown','scroll'].forEach(evt => {
  document.addEventListener(evt, tryPlay, { once: true, passive: true });
});
 
// if anything ever pauses it (browser tab throttling, etc.) resume right away
music.addEventListener('pause', () => {
  tryPlay();
});
 
// if it somehow stalls or ends without looping, restart from the top
music.addEventListener('ended', () => {
  music.currentTime = 0;
  tryPlay();
});
 