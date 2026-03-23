// ════════════════════════════════════════
//   app.js — Portfolio: Krishna A K
// ════════════════════════════════════════

// ── THEME TOGGLE ────────────────────────
const themeBtn  = document.getElementById('themeBtn');
const themeIcon = document.getElementById('themeIcon');
let theme = localStorage.getItem('portfolio-theme') || 'dark';

function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  themeIcon.className = t === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
  localStorage.setItem('portfolio-theme', t);
  theme = t;
}
applyTheme(theme);
themeBtn.addEventListener('click', () => applyTheme(theme === 'dark' ? 'light' : 'dark'));

// ── HAMBURGER MENU ──────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-link').forEach(l => {
  l.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── SCROLL PROGRESS BAR ─────────────────
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const total  = document.body.scrollHeight - window.innerHeight;
  const pct    = (window.scrollY / total) * 100;
  scrollProgress.style.width = pct + '%';
}, { passive: true });

// ── ACTIVE NAV LINK ON SCROLL ───────────
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinkEls.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });

// ── NAVBAR SOLID ON SCROLL ──────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 60
    ? 'rgba(7,8,15,0.97)' : '';
}, { passive: true });

// ── BACK TO TOP ─────────────────────────
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  backTop.classList.toggle('show', window.scrollY > 400);
}, { passive: true });
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── SCROLL REVEAL ───────────────────────
const revealElements = document.querySelectorAll('[data-reveal],[data-reveal-delay]');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
revealElements.forEach(el => io.observe(el));

// ── TYPED TEXT EFFECT ───────────────────
const roles = [
  'Cloud Security Engineer',
  'Full Stack Developer',
  'AI / ML Enthusiast',
  'AWS Cloud Practitioner',
  'Backend Engineer',
];
const typedEl = document.getElementById('typedText');
let rIdx = 0, cIdx = 0, deleting = false;

function typeLoop() {
  const current = roles[rIdx];
  if (!deleting) {
    cIdx++;
    typedEl.textContent = current.substring(0, cIdx);
    if (cIdx === current.length) {
      deleting = true;
      setTimeout(typeLoop, 2000);
      return;
    }
    setTimeout(typeLoop, 80);
  } else {
    cIdx--;
    typedEl.textContent = current.substring(0, cIdx);
    if (cIdx === 0) {
      deleting = false;
      rIdx = (rIdx + 1) % roles.length;
      setTimeout(typeLoop, 400);
      return;
    }
    setTimeout(typeLoop, 45);
  }
}
typeLoop();

// ── COUNTER ANIMATION ───────────────────
const counters = document.querySelectorAll('.stat-num[data-target]');
const counterIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el     = entry.target;
      const target = parseInt(el.dataset.target);
      let current  = 0;
      const step   = Math.max(1, Math.ceil(target / 40));
      const timer  = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current;
        if (current >= target) clearInterval(timer);
      }, 40);
      counterIO.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterIO.observe(c));

// ── CONTACT FORM ────────────────────────
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const name    = document.getElementById('cName').value.trim();
  const email   = document.getElementById('cEmail').value.trim();
  const subject = document.getElementById('cSubject').value.trim();
  const message = document.getElementById('cMessage').value.trim();
  const msgEl   = document.getElementById('formMsg');

  if (!name || !email || !message) {
    msgEl.className = 'form-msg err';
    msgEl.textContent = '⚠ Please fill in all required fields.';
    return;
  }

  // Open default mail client
  const mailBody = encodeURIComponent(`Hi Krishna,\n\n${message}\n\nFrom: ${name}`);
  const mailSub  = encodeURIComponent(subject || `Portfolio Contact from ${name}`);
  window.location.href = `mailto:krishnak1391@gmail.com?subject=${mailSub}&body=${mailBody}`;

  msgEl.className = 'form-msg ok';
  msgEl.textContent = '✅ Opening your email client...';
  e.target.reset();
  setTimeout(() => { msgEl.textContent = ''; }, 4000);
});

// ── SKILL TAG BURST ON CLICK ────────────
document.querySelectorAll('.stag').forEach(tag => {
  tag.addEventListener('click', () => {
    tag.style.transform = 'scale(1.15)';
    setTimeout(() => { tag.style.transform = ''; }, 200);
  });
});
