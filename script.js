const navToggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('primary-nav');
const scrollButtons = document.querySelectorAll('[data-scroll-target]');
const yearEl = document.getElementById('year');

if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!expanded));
        nav.classList.toggle('is-open');
    });

    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.setAttribute('aria-expanded', 'false');
            nav.classList.remove('is-open');
        });
    });
}

scrollButtons.forEach(button => {
    button.addEventListener('click', event => {
        event.preventDefault();
        const target = document.querySelector(button.dataset.scrollTarget);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}
