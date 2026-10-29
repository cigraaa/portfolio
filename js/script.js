/* ═══════════════════════════════════════════════════════════════
   CIGHRA CENDIKIA — Portfolio Script
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ── STATE ── */
let currentLang = 'en';

/* ════════════════════════════════════
   1. LANGUAGE TOGGLE
════════════════════════════════════ */
const langToggle  = document.getElementById('langToggle');
const langLabel   = document.getElementById('langLabel');

const translations = {
  en: { flag: '🇬🇧', label: 'EN' },
  id: { flag: '🇮🇩', label: 'ID' },
};

function applyLanguage(lang) {
  currentLang = lang;

  /* Update every element that has data-en / data-id */
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) el.textContent = text;
  });

  /* Update html lang attribute */
  document.documentElement.setAttribute('lang', lang === 'id' ? 'id' : 'en');

  /* Update toggle button */
  const t = translations[lang];
  langToggle.querySelector('.lang-flag').textContent = t.flag;
  langLabel.textContent = t.label;

  /* Save preference */
  localStorage.setItem('portfolio-lang', lang);
}

langToggle.addEventListener('click', () => {
  applyLanguage(currentLang === 'en' ? 'id' : 'en');
});

/* Load saved preference */
const savedLang = localStorage.getItem('portfolio-lang');
if (savedLang && (savedLang === 'en' || savedLang === 'id')) {
  applyLanguage(savedLang);
}

/* ════════════════════════════════════
   2. NAVBAR — scroll & hamburger
════════════════════════════════════ */
const navbar      = document.getElementById('navbar');
const hamburger   = document.getElementById('navHamburger');
const navLinks    = document.querySelector('.nav-links');
const allNavLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveLink();
}, { passive: true });

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const open = navLinks.classList.contains('open');
  hamburger.setAttribute('aria-expanded', open);
});

/* Close mobile menu on link click */
allNavLinks.forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* Active link highlight based on scroll */
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';

  sections.forEach(sec => {
    const top = sec.offsetTop - 80;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });

  allNavLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}

/* ════════════════════════════════════
   3. HERO TERMINAL TYPEWRITER
════════════════════════════════════ */
const terminalEl = document.getElementById('terminalText');
const commands   = [
  'whoami',
  'kubectl get pods --all-namespaces',
  'aws s3 ls s3://prod-bucket',
  'systemctl status jenkins',
  'docker ps -a',
  'gcloud compute instances list',
  'terraform plan -out=tfplan',
];

let cmdIdx   = 0;
let charIdx  = 0;
let isDeleting = false;
let typingTimeout;

function type() {
  const cmd   = commands[cmdIdx];
  const speed = isDeleting ? 40 : 80;

  if (!isDeleting && charIdx < cmd.length) {
    charIdx++;
  } else if (isDeleting && charIdx > 0) {
    charIdx--;
  } else if (!isDeleting && charIdx === cmd.length) {
    isDeleting = true;
    typingTimeout = setTimeout(type, 2000); // pause before deleting
    terminalEl.textContent = cmd.slice(0, charIdx);
    return;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    cmdIdx = (cmdIdx + 1) % commands.length;
  }

  terminalEl.textContent = cmd.slice(0, charIdx);
  typingTimeout = setTimeout(type, speed);
}

type();

/* ════════════════════════════════════
   4. HERO PARTICLES
════════════════════════════════════ */
const particlesContainer = document.getElementById('heroParticles');

function createParticle() {
  const p = document.createElement('span');
  p.classList.add('particle');

  const x        = Math.random() * 100;
  const duration = 8 + Math.random() * 12;
  const delay    = Math.random() * 10;
  const size     = Math.random() > 0.7 ? 3 : 2;

  p.style.cssText = `
    left: ${x}%;
    bottom: -10px;
    width: ${size}px;
    height: ${size}px;
    animation-duration: ${duration}s;
    animation-delay: ${delay}s;
    opacity: 0;
  `;

  particlesContainer.appendChild(p);

  /* Remove after a couple of cycles to avoid DOM bloat */
  setTimeout(() => p.remove(), (duration + delay + 2) * 1000);
}

/* Seed initial particles */
for (let i = 0; i < 20; i++) createParticle();
/* Continue generating */
setInterval(createParticle, 800);

/* ════════════════════════════════════
   5. PROFILE PHOTO FALLBACK
════════════════════════════════════ */
const heroPhoto       = document.getElementById('heroPhoto');
const heroPlaceholder = document.getElementById('heroPhotoPlaceholder');

if (heroPhoto) {
  heroPhoto.addEventListener('error', () => {
    heroPhoto.style.display = 'none';
    heroPlaceholder.classList.add('show');
  });
}

/* ════════════════════════════════════
   6. SCROLL REVEAL ANIMATIONS
════════════════════════════════════ */
function initReveal() {
  /* Add reveal classes to elements */
  const revealSelectors = [
    '.section-header',
    '.about-terminal',
    '.about-content',
    '.skill-category',
    '.timeline-item',
    '.edu-card',
    '.cert-card',
    '.contact-info',
    '.contact-terminal',
    '.stat-card',
  ];

  revealSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.08}s`;
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal, .reveal-left').forEach(el => {
    observer.observe(el);
  });
}

/* ════════════════════════════════════
   7. SMOOTH SCROLL FOR NAV LINKS
════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const offset = target.offsetTop - 72;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  });
});

/* ════════════════════════════════════
   8. CERT CARD — hover glow colour
      (AWS = orange, GCP = blue)
════════════════════════════════════ */
document.querySelectorAll('.cert-card').forEach(card => {
  const issuer = card.querySelector('.cert-issuer');
  if (!issuer) return;
  const text = issuer.textContent.toLowerCase();
  if (text.includes('amazon') || text.includes('aws')) {
    card.addEventListener('mouseenter', () => {
      card.style.borderColor = '#FF9900';
      card.style.boxShadow   = '0 8px 32px rgba(255,153,0,0.15)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.borderColor = '';
      card.style.boxShadow   = '';
    });
  } else if (text.includes('google')) {
    card.addEventListener('mouseenter', () => {
      card.style.borderColor = '#4285F4';
      card.style.boxShadow   = '0 8px 32px rgba(66,133,244,0.15)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.borderColor = '';
      card.style.boxShadow   = '';
    });
  }
});

/* ════════════════════════════════════
   9. DOWNLOAD CV — open in new tab,
      keep portfolio tab untouched
════════════════════════════════════ */
function initCvDownload() {
  const cvButtons = document.querySelectorAll('.js-cv-download');

  cvButtons.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();

      const url = btn.getAttribute('href');

      /* Open the PDF in a new tab that we control, so we can close it. */
      const pdfTab = window.open(url, '_blank', 'noopener');

      /* If the browser blocked the popup, fall back to a normal download. */
      if (!pdfTab) {
        const a = document.createElement('a');
        a.href = url;
        a.download = '';
        document.body.appendChild(a);
        a.click();
        a.remove();
        return;
      }

      /* Auto-close the PDF tab shortly after it starts the download.
         The portfolio tab stays exactly where it was. */
      setTimeout(() => {
        try { pdfTab.close(); } catch (_) { /* ignore */ }
      }, 1500);
    });
  });
}

/* ════════════════════════════════════
   10. INIT
════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  updateActiveLink();
  initThemeToggle();
  initCounterAnimation();
  initCvDownload();
});

/* ════════════════════════════════════
   11. THEME TOGGLE (Dark / Light)
════════════════════════════════════ */
function initThemeToggle() {
  /* Inject toggle button into navbar actions */
  const navActions = document.querySelector('.nav-actions');
  const themeBtn = document.createElement('button');
  themeBtn.id = 'themeToggle';
  themeBtn.className = 'theme-toggle';
  themeBtn.setAttribute('aria-label', 'Toggle light/dark theme');
  themeBtn.innerHTML = `
    <span class="theme-icon theme-icon-moon">🌙</span>
    <span class="theme-icon theme-icon-sun" style="display:none">☀️</span>
  `;

  /* Insert before lang toggle */
  navActions.insertBefore(themeBtn, navActions.firstChild);

  /* Apply saved theme */
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'light') applyTheme('light');

  themeBtn.addEventListener('click', () => {
    const isLight = document.documentElement.classList.contains('light-mode');
    applyTheme(isLight ? 'dark' : 'light');
  });
}

function applyTheme(theme) {
  const html     = document.documentElement;
  const moonIcon = document.querySelector('.theme-icon-moon');
  const sunIcon  = document.querySelector('.theme-icon-sun');

  if (theme === 'light') {
    html.classList.add('light-mode');
    if (moonIcon) moonIcon.style.display = 'none';
    if (sunIcon)  sunIcon.style.display  = 'inline';
  } else {
    html.classList.remove('light-mode');
    if (moonIcon) moonIcon.style.display = 'inline';
    if (sunIcon)  sunIcon.style.display  = 'none';
  }

  localStorage.setItem('portfolio-theme', theme);
}

/* ════════════════════════════════════
   12. COUNTER ANIMATION
════════════════════════════════════ */
function initCounterAnimation() {
  const statNums = document.querySelectorAll('.stat-num');

  /* Store original values, replace with 0 */
  statNums.forEach(el => {
    const raw    = el.textContent.trim();           // e.g. "6+" or "4"
    const num    = parseInt(raw, 10);               // numeric target
    const suffix = raw.replace(/[0-9]/g, '');       // e.g. "+" or ""
    el.dataset.target = num;
    el.dataset.suffix = suffix;
    el.textContent = '0' + suffix;
  });

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      animateCounter(el, 0, target, 1400, suffix);
      counterObserver.unobserve(el);               // run only once
    });
  }, { threshold: 0.6 });

  statNums.forEach(el => counterObserver.observe(el));
}

function animateCounter(el, from, to, duration, suffix) {
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed  = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    /* Ease-out cubic */
    const eased    = 1 - Math.pow(1 - progress, 3);
    const current  = Math.floor(from + (to - from) * eased);

    el.textContent = current + suffix;

    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = to + suffix;   /* guarantee exact final value */
  }

  requestAnimationFrame(update);
}
