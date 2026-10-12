// ===== Intro =====
const intro = document.getElementById('intro');
const skipIntro = () => {
  intro.classList.add('gone');
  document.body.classList.remove('locked');
};
document.getElementById('discover').addEventListener('click', skipIntro);
// Lien direct vers une section (ex: monsite.com/#contact) → pas d'écran d'intro
if (location.hash) skipIntro();

// ===== Menu =====
const nav = document.getElementById('nav');
const burger = document.getElementById('burger');
const links = document.getElementById('links');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  links.classList.toggle('open');
});
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  burger.classList.remove('open');
  links.classList.remove('open');
}));
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 60));

// Lien actif selon la section visible
const spy = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) links.querySelectorAll('a').forEach(a =>
    a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-50% 0px -50% 0px' });
document.querySelectorAll('section[id]').forEach(s => spy.observe(s));

// ===== Slider =====
const slides = document.querySelectorAll('.slide');
const dots = document.getElementById('dots');
let current = 0, timer;
slides.forEach((_, i) => {
  const b = document.createElement('button');
  b.setAttribute('aria-label', 'Image ' + (i + 1));
  b.addEventListener('click', () => go(i));
  dots.appendChild(b);
});
function go(i) {
  slides[current].classList.remove('active');
  dots.children[current].classList.remove('on');
  current = (i + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots.children[current].classList.add('on');
  clearInterval(timer);
  timer = setInterval(() => go(current + 1), 6000);
}
go(0);

// ===== Apparition au scroll + compteurs =====
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('in');
  io.unobserve(e.target);
}), { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

const counter = new IntersectionObserver(entries => entries.forEach(e => {
  if (!e.isIntersecting) return;
  const el = e.target, end = +el.dataset.count, t0 = performance.now();
  const dec = el.dataset.count.includes('.') ? 1 : 0, suffix = el.dataset.suffix || '';
  const step = t => {
    const p = Math.min((t - t0) / 1600, 1);
    const v = end * (1 - Math.pow(1 - p, 3));
    el.textContent = (dec ? v.toFixed(dec).replace('.', ',') : Math.round(v).toLocaleString('fr-FR')) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
  counter.unobserve(el);
}), { threshold: .5 });
document.querySelectorAll('[data-count]').forEach(el => counter.observe(el));

// ===== Filtres portfolio =====
document.getElementById('filters')?.addEventListener('click', e => {
  const btn = e.target.closest('button');
  if (!btn) return;
  document.querySelectorAll('#filters button').forEach(b => b.classList.toggle('active', b === btn));
  const f = btn.dataset.filter;
  document.querySelectorAll('#grid .item').forEach(it =>
    it.classList.toggle('hide', f !== 'all' && it.dataset.cat !== f));
});

// ===== Lightbox (image ou vidéo YouTube) =====
const lb = document.getElementById('lightbox');
const lbContent = lb.querySelector('.lb-content');
document.querySelectorAll('#grid .item').forEach(it => it.addEventListener('click', () => {
  const yt = it.dataset.youtube;
  lbContent.innerHTML = yt
    ? `<iframe src="https://www.youtube.com/embed/${yt}?autoplay=1" allow="autoplay; fullscreen" allowfullscreen></iframe>`
    : `<div class="media" style="${it.getAttribute('style')}"></div>`;
  lb.classList.add('open');
}));
const closeLb = () => { lb.classList.remove('open'); lbContent.innerHTML = ''; };
lb.addEventListener('click', e => { if (e.target === lb || e.target.tagName === 'BUTTON') closeLb(); });
addEventListener('keydown', e => e.key === 'Escape' && closeLb());

// ===== Formulaire → ouvre l'app mail (✏️ mets ton email) =====
document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  const d = new FormData(e.target);
  const body = `Nom : ${d.get('nom')}\nEmail : ${d.get('email')}\nService : ${d.get('service')}\n\n${d.get('message')}`;
  location.href = `mailto:primogbedo@gmail.com?subject=${encodeURIComponent('Demande : ' + d.get('service'))}&body=${encodeURIComponent(body)}`;
});

document.getElementById('year').textContent = new Date().getFullYear();
