const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('nav-links');
const buttonsWithScroll = document.querySelectorAll('[data-scroll-target]');
const machineTabs = document.querySelectorAll('.machine-step');
const machinePanels = document.querySelectorAll('.machine-step__content');
const lensButtons = document.querySelectorAll('.impact-lens');
const impactPanels = document.querySelectorAll('.impact-panel');
const batchSlider = document.getElementById('batch-slider');
const batchOutput = document.getElementById('batch-output');
const feedValue = document.getElementById('feed-value');
const energyValue = document.getElementById('energy-value');
const yieldValue = document.getElementById('yield-value');
const backToTop = document.querySelector('.back-to-top');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!expanded));
        navLinks.classList.toggle('is-open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.setAttribute('aria-expanded', 'false');
            navLinks.classList.remove('is-open');
        });
    });
}

buttonsWithScroll.forEach(button => {
    button.addEventListener('click', () => {
        const target = document.querySelector(button.dataset.scrollTarget);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

if (backToTop) {
    backToTop.addEventListener('click', () => {
        document.querySelector('#top').scrollIntoView({ behavior: 'smooth' });
    });
}

machineTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        machineTabs.forEach(btn => btn.classList.remove('is-active'));
        machinePanels.forEach(panel => {
            panel.hidden = panel.id !== tab.getAttribute('aria-controls');
        });
        tab.classList.add('is-active');
    });
});

lensButtons.forEach(button => {
    button.addEventListener('click', () => {
        lensButtons.forEach(btn => {
            btn.classList.remove('is-active');
            btn.setAttribute('aria-selected', 'false');
        });
        button.classList.add('is-active');
        button.setAttribute('aria-selected', 'true');

        const selectedImpact = button.dataset.impact;
        impactPanels.forEach(panel => {
            const isActive = panel.dataset.impact === selectedImpact;
            panel.hidden = !isActive;
        });
    });
});

if (batchSlider) {
    const updateSimulator = value => {
        batchOutput.textContent = `${value} ${value === '1' ? 'batch' : 'batches'}`;
        const batches = Number(value);
        const feed = (batches * 0.3).toFixed(1);
        const energy = (batches * 0.7).toFixed(1);
        const protein = (batches * 0.4).toFixed(1);
        feedValue.textContent = feed;
        energyValue.textContent = energy;
        yieldValue.textContent = protein;
    };

    updateSimulator(batchSlider.value);
    batchSlider.addEventListener('input', event => updateSimulator(event.target.value));
}

const canvas = document.getElementById('background-orb');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    const orbs = Array.from({ length: 18 }, () => ({
        x: Math.random(),
        y: Math.random(),
        radius: 80 + Math.random() * 140,
        speedX: (Math.random() - 0.5) * 0.0008,
        speedY: (Math.random() - 0.5) * 0.0008,
        hue: 180 + Math.random() * 160,
        alpha: 0.06 + Math.random() * 0.08
    }));

    const resize = () => {
        width = canvas.width = window.innerWidth * window.devicePixelRatio;
        height = canvas.height = window.innerHeight * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const render = () => {
        ctx.clearRect(0, 0, width, height);
        orbs.forEach(orb => {
            orb.x += orb.speedX;
            orb.y += orb.speedY;
            if (orb.x < -0.2 || orb.x > 1.2) orb.speedX *= -1;
            if (orb.y < -0.2 || orb.y > 1.2) orb.speedY *= -1;

            const gradient = ctx.createRadialGradient(
                orb.x * window.innerWidth,
                orb.y * window.innerHeight,
                0,
                orb.x * window.innerWidth,
                orb.y * window.innerHeight,
                orb.radius
            );
            gradient.addColorStop(0, `hsla(${orb.hue}, 95%, 65%, ${orb.alpha})`);
            gradient.addColorStop(1, 'transparent');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(orb.x * window.innerWidth, orb.y * window.innerHeight, orb.radius, 0, Math.PI * 2);
            ctx.fill();
        });
        requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener('resize', resize, { passive: true });
}
