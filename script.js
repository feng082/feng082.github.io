const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.main-nav');

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

const revealItems = document.querySelectorAll('.story-card, .service-card, .contact-info, .contact-card');
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
