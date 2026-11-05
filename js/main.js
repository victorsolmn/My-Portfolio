// ==========================================================================
// victorsalomon.in — site behaviour (2026 redesign). Vanilla, no deps.
// ==========================================================================

(function () {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // ---------- Theme toggle ----------
    // The inline <head> script applies a saved choice before first paint;
    // here we only handle the button.

    const currentTheme = () =>
        root.getAttribute('data-theme') || (prefersDark.matches ? 'dark' : 'light');

    const syncThemeButtons = () => {
        const next = currentTheme() === 'dark' ? 'light' : 'dark';
        document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
            btn.setAttribute('aria-label', `Switch to ${next} theme`);
        });
    };

    document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
        btn.addEventListener('click', () => {
            const next = currentTheme() === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            try {
                localStorage.setItem('theme', next);
            } catch (e) {
                /* storage unavailable: choice lasts for this page view */
            }
            syncThemeButtons();
        });
    });

    prefersDark.addEventListener('change', syncThemeButtons);
    syncThemeButtons();

    // ---------- Header: solid background after 24px ----------
    const header = document.querySelector('.site-header');
    if (header) {
        let ticking = false;
        const update = () => {
            header.classList.toggle('is-scrolled', window.scrollY > 24);
            ticking = false;
        };
        window.addEventListener(
            'scroll',
            () => {
                if (!ticking) {
                    ticking = true;
                    requestAnimationFrame(update);
                }
            },
            { passive: true }
        );
        update();
    }

    // ---------- Mobile nav sheet ----------
    const toggle = document.querySelector('.nav-toggle');
    const sheet = document.getElementById('nav-sheet');
    const closeBtn = document.querySelector('.nav-close');
    const desktop = window.matchMedia('(min-width: 1024px)');

    const setOpen = (open) => {
        if (!toggle || !sheet) return;
        sheet.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        document.body.classList.toggle('nav-open', open);
        if (open) {
            const first = sheet.querySelector('.nav-links a');
            if (first) first.focus();
        } else if (sheet.contains(document.activeElement)) {
            toggle.focus();
        }
    };

    if (toggle && sheet) {
        toggle.addEventListener('click', () => setOpen(!sheet.classList.contains('is-open')));
        if (closeBtn) closeBtn.addEventListener('click', () => setOpen(false));
        sheet.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sheet.classList.contains('is-open')) setOpen(false);
        });
        desktop.addEventListener('change', (e) => {
            if (e.matches) setOpen(false);
        });
    }

    // ---------- Active section highlighting ----------
    // Nav links are written as "/#work" so they work from every page;
    // on the homepage we map them back to the section they point at.
    const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
    const sectionLinks = new Map();

    navLinks.forEach((a) => {
        const url = new URL(a.href, location.href);
        if (url.pathname !== location.pathname || !url.hash) return;
        const section = document.getElementById(url.hash.slice(1));
        if (section) sectionLinks.set(section, a);
    });

    if (sectionLinks.size && 'IntersectionObserver' in window) {
        const visible = new Set();
        const markActive = () => {
            // Topmost visible section wins
            let active = null;
            sectionLinks.forEach((_, section) => {
                if (visible.has(section) && !active) active = section;
            });
            navLinks.forEach((a) => a.removeAttribute('aria-current'));
            if (active) sectionLinks.get(active).setAttribute('aria-current', 'true');
        };

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) visible.add(entry.target);
                    else visible.delete(entry.target);
                });
                markActive();
            },
            { rootMargin: '-40% 0px -55% 0px' }
        );
        sectionLinks.forEach((_, section) => io.observe(section));
    }

    // ---------- Scroll reveal ----------
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length) {
        if (reduceMotion.matches || !('IntersectionObserver' in window)) {
            reveals.forEach((el) => el.classList.add('is-visible'));
        } else {
            const io = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) return;
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    });
                },
                { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
            );
            reveals.forEach((el) => io.observe(el));
        }
    }

    // ---------- Results count-up (once, on first view) ----------
    const counters = document.querySelectorAll('[data-count]');
    if (counters.length && !reduceMotion.matches && 'IntersectionObserver' in window) {
        const run = (el) => {
            const target = Number(el.dataset.count);
            const start = performance.now();
            const duration = 1200;
            const step = (now) => {
                const t = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - t, 3);
                el.textContent = String(Math.round(target * eased));
                if (t < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        };
        const io = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    run(entry.target);
                    observer.unobserve(entry.target);
                });
            },
            { threshold: 0.6 }
        );
        counters.forEach((el) => io.observe(el));
    }

    // ---------- "Where I work" intersection visual ----------
    const nodes = document.querySelectorAll('.where-node');
    const source = document.querySelectorAll('[data-where-source] li');
    if (nodes.length && source.length) {
        const title = document.querySelector('[data-where-title]');
        const what = document.querySelector('[data-where-what]');
        const proof = document.querySelector('[data-where-proof]');
        const spokes = document.querySelectorAll('.where-spoke');
        let current = 0;

        const select = (i) => {
            if (i === current) return;
            current = i;
            const item = source[i].dataset;
            title.textContent = item.title;
            what.textContent = item.what;
            proof.textContent = item.proof;
            nodes.forEach((n, j) => n.setAttribute('aria-pressed', String(j === i)));
            spokes.forEach((s, j) => s.classList.toggle('is-active', j === i));
        };

        const canHover = window.matchMedia('(hover: hover) and (pointer: fine)');
        nodes.forEach((node, i) => {
            node.addEventListener('click', () => select(i));
            node.addEventListener('focus', () => select(i));
            node.addEventListener('mouseenter', () => {
                if (canHover.matches) select(i);
            });
        });
    }

    // ---------- Footer year ----------
    const year = String(new Date().getFullYear());
    document.querySelectorAll('[data-year]').forEach((el) => {
        el.textContent = year;
    });

    // ---------- Analytics events ----------
    // Elements declare data-track="event_name" (+ optional data-track-*
    // props). Sent to the analytics provider once one is configured.
    window.vsTrack = function (name, props) {
        if (window.umami && typeof window.umami.track === 'function') {
            window.umami.track(name, props);
        }
    };

    document.addEventListener('click', (e) => {
        const el = e.target.closest('[data-track]');
        if (!el) return;
        const props = {};
        Object.keys(el.dataset).forEach((key) => {
            if (key.startsWith('track') && key !== 'track') {
                props[key.slice(5).toLowerCase()] = el.dataset[key];
            }
        });
        window.vsTrack(el.dataset.track, props);
    });
})();
