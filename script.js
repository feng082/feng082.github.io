const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.main-nav');
const siteContent = window.MapleSiteConfig?.load?.();

const setButtonLabel = (button, label, arrow) => {
  if (!button) return;
  const arrowNode = document.createElement('span');
  arrowNode.textContent = arrow;
  button.replaceChildren(document.createTextNode(`${label} `), arrowNode);
};

const applySiteContent = (content) => {
  const wordmark = document.querySelector('.wordmark strong');
  const wordmarkSubtitle = document.querySelector('.wordmark-subtitle');
  const brandDot = document.querySelector('.brand-dot');
  const heroTitle = document.querySelector('.hero h1');
  const heroIntro = document.querySelector('.hero-intro');
  const portrait = document.querySelector('.portrait-frame img');
  const navCta = document.querySelector('.nav-cta');
  const heroCta = document.querySelector('.button-yellow');
  const contactCta = document.querySelector('.contact-hero-button');

  if (wordmark) wordmark.textContent = content.name;
  if (wordmarkSubtitle) wordmarkSubtitle.textContent = content.role;
  if (brandDot) brandDot.textContent = content.name.trim().charAt(0) || '周';
  if (heroTitle) {
    const role = document.createElement('span');
    role.textContent = `·${content.role}`;
    heroTitle.replaceChildren(document.createTextNode(content.name), document.createElement('br'), role);
  }
  if (heroIntro) heroIntro.textContent = content.intro;
  if (portrait) portrait.alt = `${content.name}个人头像`;
  if (navCta) {
    const dot = navCta.querySelector('i') || document.createElement('i');
    navCta.replaceChildren(dot, document.createTextNode(content.availability));
  }
  setButtonLabel(heroCta, content.heroCta, '↗');
  const contactCopy = contactCta?.querySelector('.button-copy');
  if (contactCopy) contactCopy.textContent = content.contactCta;

  document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
    link.href = `mailto:${content.email}`;
  });

  const cardValues = document.querySelectorAll('.contact-card strong');
  [content.skillText, content.projectText, content.wechatText, content.emailLabel].forEach((value, index) => {
    if (cardValues[index]) cardValues[index].textContent = value;
  });
};

if (siteContent) applySiteContent(siteContent);

// Keep third-party editing/sync overlays out of the exported local page.
const removeInjectedOverlays = () => {
  document.querySelectorAll('#wechatsync-floating-btn').forEach((node) => node.remove());
};
removeInjectedOverlays();
new MutationObserver(removeInjectedOverlays).observe(document.documentElement, { childList: true, subtree: true });

menuButton?.addEventListener('click', () => {
  const isOpen = document.body.classList.toggle('menu-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  if (isOpen) {
    nav.style.display = 'flex';
    nav.style.position = 'absolute';
    nav.style.top = '68px';
    nav.style.right = '0';
    nav.style.flexDirection = 'column';
    nav.style.gap = '16px';
    nav.style.padding = '18px';
    nav.style.background = '#fff9eb';
    nav.style.border = '3px solid #171717';
    nav.style.boxShadow = '5px 5px 0 #171717';
  } else {
    nav.removeAttribute('style');
  }
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    document.body.classList.remove('menu-open');
    nav.removeAttribute('style');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const revealItems = document.querySelectorAll('.service-card, .contact-card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => {
  item.classList.add('reveal');
  observer.observe(item);
});
