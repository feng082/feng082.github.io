const overlay = document.querySelector('.search-overlay');
const input = document.querySelector('#search-input');
const results = document.querySelector('#search-results');
const posts = [...document.querySelectorAll('.post-card')];
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

function openSearch() {
  overlay.hidden = false;
  input.focus();
}

function closeSearch() {
  overlay.hidden = true;
  input.value = '';
  results.innerHTML = '<p>输入关键词开始搜索</p>';
}

document.querySelectorAll('.search-open').forEach((button) => button.addEventListener('click', openSearch));
document.querySelector('.search-close').addEventListener('click', closeSearch);
overlay.addEventListener('click', (event) => { if (event.target === overlay) closeSearch(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !overlay.hidden) closeSearch(); });

input.addEventListener('input', () => {
  const query = input.value.trim().toLowerCase();
  if (!query) { results.innerHTML = '<p>输入关键词开始搜索</p>'; return; }
  const matches = posts.filter((post) => post.dataset.search.toLowerCase().includes(query));
  results.innerHTML = matches.length
    ? matches.map((post) => `<a class="result-item" href="${post.querySelector('h2 a').getAttribute('href')}"><strong>${post.querySelector('h2').textContent}</strong><small>${post.querySelector('p').textContent.slice(0, 62)}…</small></a>`).join('')
    : '<p>没有找到匹配的文章。</p>';
});

menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.site-nav a, .nav-search').forEach((item) => item.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const backTop = document.querySelector('.back-top');
window.addEventListener('scroll', () => backTop.classList.toggle('visible', window.scrollY > 420));
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
