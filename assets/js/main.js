// Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
const mobileClose = document.getElementById('mobile-close');
hamburger?.addEventListener('click', () => mobileNav.classList.add('open'));
mobileClose?.addEventListener('click', () => mobileNav.classList.remove('open'));
mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// Animated counters
function animateCounter(el, target, suffix='') {
  let start = 0;
  const duration = 2200;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 4);
    el.textContent = Math.floor(ease * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      animateCounter(el, parseInt(el.dataset.target), el.dataset.suffix || '');
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.count-num').forEach(el => counterObserver.observe(el));

// Video modal
const playBtn = document.getElementById('play-btn');
const videoModal = document.getElementById('video-modal');
const modalClose = document.getElementById('modal-close');
const videoFrame = document.getElementById('video-frame');
const WA = 'https://api.whatsapp.com/send?phone=5521973184161&text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20a%20Dra.%20Fernanda%20Costa.';
playBtn?.addEventListener('click', () => {
  videoModal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
});
modalClose?.addEventListener('click', closeModal);
videoModal?.addEventListener('click', e => { if(e.target === videoModal) closeModal(); });
function closeModal() {
  videoModal.style.display = 'none';
  document.body.style.overflow = '';
  if(videoFrame) videoFrame.src = videoFrame.src;
}

// WhatsApp links
document.querySelectorAll('.wa-link').forEach(el => {
  el.href = WA;
  el.target = '_blank';
  el.rel = 'noopener noreferrer';
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// Parallax hero
const heroRight = document.querySelector('.hero-right');
window.addEventListener('scroll', () => {
  if (heroRight && window.innerWidth > 1024) {
    heroRight.style.transform = `translateY(${window.scrollY * 0.12}px)`;
  }
});
