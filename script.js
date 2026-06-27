/* ============================================================
   TYPED.JS ROLE ROTATOR
   ============================================================ */
if (window.Typed) {
    new Typed('#element', {
        strings: ['MERN Stack Engineering.', 'Full-Stack Deployment.', 'Intelligent AI Architectures.'],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1500,
        loop: true,
        smartBackspace: true
    });
}

/* ============================================================
   SCROLL PROGRESS BAR
   ============================================================ */
const progressBar = document.getElementById('progressBar');
function updateProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    if (progressBar) progressBar.style.width = scrolled + '%';
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

/* ============================================================
   MOBILE MENU
   ============================================================ */
const menuBtn = document.getElementById('mobileMenuBtn');
const navLinksList = document.getElementById('navLinksContainer');

function closeMenu() {
    menuBtn?.classList.remove('active');
    navLinksList?.classList.remove('active');
    menuBtn?.setAttribute('aria-expanded', 'false');
}

menuBtn?.addEventListener('click', () => {
    const isActive = menuBtn.classList.toggle('active');
    navLinksList.classList.toggle('active');
    menuBtn.setAttribute('aria-expanded', String(isActive));
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
});

/* ============================================================
   ACTIVE NAV LINK ON SCROLL
   ============================================================ */
const sections = document.querySelectorAll('main section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinkEls.forEach(link => {
                link.classList.toggle('active-link', link.getAttribute('href') === `#${entry.target.id}`);
            });
        }
    });
}, { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' });

sections.forEach(s => navObserver.observe(s));

/* ============================================================
   SCROLLREVEAL (entry animations)
   ============================================================ */
if (window.ScrollReveal) {
    ScrollReveal().reveal('.scroll-reveal', {
        delay: 100,
        duration: 800,
        distance: '30px',
        origin: 'bottom',
        opacity: 0,
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
        mobile: true
    });
}

/* ============================================================
   SKILL BAR FILL ANIMATION
   ============================================================ */
const techPills = document.querySelectorAll('.tech-pill');
const pillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            pillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

techPills.forEach(pill => pillObserver.observe(pill));

/* ============================================================
   ANIMATED COUNTERS
   ============================================================ */
const counters = document.querySelectorAll('.counter');

function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const decimal = el.dataset.decimal;
    const duration = 1400;
    const startTime = performance.now();

    function update(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;

        if (decimal) {
            el.textContent = current.toFixed(0) + '.' + decimal;
        } else {
            el.textContent = Math.round(current);
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = decimal ? target + '.' + decimal : target;
        }
    }
    requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

/* ============================================================
   BACK TO TOP BUTTON
   ============================================================ */
const backToTop = document.getElementById('backToTop');
function toggleBackToTop() {
    if (!backToTop) return;
    backToTop.classList.toggle('visible', window.scrollY > 500);
}
window.addEventListener('scroll', toggleBackToTop, { passive: true });
toggleBackToTop();

backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============================================================
   SMOOTH ANCHOR SCROLL
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.length <= 1) return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* ============================================================
   CONTACT FORM (Formspree AJAX)
   ============================================================ */
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const label = submitBtn.querySelector('.btn-label');
    const originalLabel = label.textContent;

    submitBtn.disabled = true;
    label.textContent = 'Sending…';

    try {
        const res = await fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
            label.textContent = '✓ Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #14b8a6, #22c55e)';
            contactForm.reset();
        } else {
            throw new Error('Submission failed');
        }
    } catch {
        label.textContent = '✗ Failed — email directly';
        submitBtn.style.background = 'linear-gradient(135deg, #ef4444, #f87171)';
    } finally {
        setTimeout(() => {
            label.textContent = originalLabel;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 4000);
    }
});