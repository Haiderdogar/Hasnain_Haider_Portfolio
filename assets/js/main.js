/*
 * Portfolio behaviour.
 *
 * Works in layers so the page always stays usable:
 *   1. Core (always): navigation, typing text, project cards + dialog, contact form.
 *   2. Motion (needs GSAP + ScrollTrigger, skipped for "reduce motion"):
 *      loader, hero intro, scroll-linked phone, split headings, counters,
 *      tilt cards, magnetic buttons, cursor ring, scroll-driven marquee.
 */
(() => {
    'use strict';

    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
    const root = document.documentElement;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const hasGsap = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
    const animate = hasGsap && !reduce;

    const scene = () => window.PortfolioScene;
    const esc = (s) =>
        String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

    /* ======================================================================
       1. CORE
       ====================================================================== */

    /* ---- Footer year ---- */
    const year = $('#year');
    if (year) year.textContent = new Date().getFullYear();

    /* ---- Mobile menu ---- */
    const menuBtn = $('#menuBtn');
    const mobileNav = $('#mobileNav');
    function setMenu(open) {
        menuBtn.setAttribute('aria-expanded', String(open));
        menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        mobileNav.hidden = !open;
    }
    if (menuBtn && mobileNav) {
        menuBtn.addEventListener('click', () => setMenu(mobileNav.hidden));
        $$('a', mobileNav).forEach((a) => a.addEventListener('click', () => setMenu(false)));
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !mobileNav.hidden) {
                setMenu(false);
                menuBtn.focus();
            }
        });
    }

    /* ---- Header state + scroll progress ---- */
    const header = $('#header');
    const progressBar = $('#progressBar');
    let ticking = false;
    function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            ticking = false;
            const y = window.scrollY;
            header.classList.toggle('is-scrolled', y > 10);
            const max = root.scrollHeight - window.innerHeight;
            progressBar.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
        });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    /* ---- Active nav link ---- */
    const navLinks = $$('[data-nav]');
    if ('IntersectionObserver' in window) {
        const sections = $$('main section[id]');
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    navLinks.forEach((a) =>
                        a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id)
                    );
                });
            },
            { rootMargin: '-45% 0px -50% 0px' }
        );
        sections.forEach((s) => io.observe(s));
    }

    /* ---- Typing text ---- */
    function typewriter(el, phrases, { type = 95, erase = 40, hold = 1500 } = {}) {
        if (!el) return;
        if (reduce) {
            el.textContent = phrases[0];
            return;
        }
        let p = 0;
        let c = 0;
        let erasing = false;
        el.textContent = '';
        (function tick() {
            const full = phrases[p];
            if (!erasing) {
                c++;
                el.textContent = full.slice(0, c);
                if (c === full.length) {
                    erasing = true;
                    return setTimeout(tick, hold);
                }
                return setTimeout(tick, type * (0.6 + Math.random() * 0.8));
            }
            c--;
            el.textContent = full.slice(0, c);
            if (c === 0) {
                erasing = false;
                p = (p + 1) % phrases.length;
                return setTimeout(tick, 300);
            }
            return setTimeout(tick, erase);
        })();
    }

    const startHeroTyping = () =>
        typewriter($('#typedHero'), [
            "And I'm an Expert Flutter Developer",
            "And I'm a UI/UX Design to Code Expert",
            "And I'm a Clean Architecture Specialist",
            'And I Turn Ideas Into Apps',
            'And I Build Fast, Beautiful UI',
        ]);

    typewriter(
        $('#typedAbout'),
        [
            'UI/UX Design to Code Specialist',
            'Expert Flutter Developer',
            'Mobile App Performance Expert',
            'Clean Architecture Advocate',
            'State Management Pro',
        ],
        { type: 100, erase: 40, hold: 1500 }
    );

    /* ---- Hero screens crossfade ---- */
    const heroShots = $$('#screen img');
    if (heroShots.length > 1 && !reduce) {
        let shot = 0;
        setInterval(() => {
            if (document.hidden) return;
            heroShots[shot].classList.remove('is-on');
            shot = (shot + 1) % heroShots.length;
            heroShots[shot].classList.add('is-on');
        }, 3400);
    }

    /* ---- Project cards ---- */
    const projects = window.PROJECTS || [];
    const byId = new Map(projects.map((p) => [p.id, p]));
    const grid = $('#projectGrid');

    function renderProjects() {
        if (!grid) return;
        grid.innerHTML = '';
        projects.forEach((p) => {
            const card = document.createElement('article');
            card.className = 'project-card';
            card.dataset.tilt = '';
            card.dataset.id = p.id;
            card.innerHTML = `
                <div class="project-card__media">
                    <img src="${esc(p.head)}" alt="${esc(p.cardTitle)} app preview" width="1590" height="1190" loading="lazy" decoding="async">
                    ${p.badge ? `<span class="badge">${esc(p.badge)}</span>` : ''}
                </div>
                <div class="project-card__body">
                    <h3>${esc(p.cardTitle)}</h3>
                    <p>${esc(p.subtitle)}</p>
                    <ul class="tags">${p.cardTags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
                    <button type="button" class="project-card__open">View details<span class="sr-only"> for ${esc(p.cardTitle)}</span></button>
                </div>`;
            grid.appendChild(card);
        });
    }

    /* ---- Project dialog ---- */
    const modal = $('#projectModal');
    const modalPanel = $('#modalPanel');
    const modalText = $('.modal__text', modal);
    const galleryImg = $('#galleryImg');
    const galleryCount = $('#galleryCount');
    const galleryThumbs = $('#galleryThumbs');
    const galleryBox = $('.modal__gallery', modal);
    const state = { project: null, index: 0, opener: null };

    // "intro line" + "🔷 Label: text" rows + "– sub point" lines
    function parseDescription(desc) {
        const lines = desc.split('\n').map((s) => s.trim()).filter(Boolean);
        const lead = lines.shift() || '';
        const points = [];
        lines.forEach((line) => {
            if (/^[–-]\s*/.test(line) && points.length) {
                points[points.length - 1].subs.push(line.replace(/^[–-]\s*/, ''));
                return;
            }
            const m = line.match(/^(\S+)\s+([^:]+):\s*(.*)$/);
            if (m) points.push({ icon: m[1], label: m[2].trim(), text: m[3].trim(), subs: [] });
            else if (points.length) points[points.length - 1].subs.push(line);
        });
        return { lead, points };
    }

    function setSlide(i, instant) {
        const imgs = state.project.images;
        const n = imgs.length;
        state.index = (i + n) % n;
        const src = imgs[state.index];

        const show = () => {
            galleryImg.src = src;
            galleryImg.alt = `${state.project.cardTitle} screenshot ${state.index + 1} of ${n}`;
            galleryCount.textContent = `${state.index + 1} / ${n}`;
            $$('button', galleryThumbs).forEach((b, k) => {
                const on = k === state.index;
                b.setAttribute('aria-current', String(on));
                if (on) b.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reduce ? 'auto' : 'smooth' });
            });
            if (n > 1) new Image().src = imgs[(state.index + 1) % n];
        };

        if (instant || reduce) {
            galleryImg.classList.remove('is-swap');
            show();
            return;
        }
        galleryImg.classList.add('is-swap');
        galleryImg.onload = galleryImg.onerror = () => galleryImg.classList.remove('is-swap');
        setTimeout(show, 150);
    }

    function openProject(id, opener) {
        const p = byId.get(id);
        if (!p) return;
        state.project = p;
        state.opener = opener;

        $('#modalTitle').textContent = p.title;
        $('#modalTags').innerHTML = p.tags.map((t) => `<li>${esc(t)}</li>`).join('');

        const { lead, points } = parseDescription(p.description);
        $('#modalLead').textContent = lead;
        $('#modalPoints').innerHTML = points
            .map(
                (pt) => `<li class="point">
                    <span class="point__icon" aria-hidden="true">${esc(pt.icon)}</span>
                    <div>
                        <p><strong>${esc(pt.label)}</strong>${pt.text ? ' ' + esc(pt.text) : ''}</p>
                        ${pt.subs.length ? `<ul>${pt.subs.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>` : ''}
                    </div>
                </li>`
            )
            .join('');

        $('#modalFeatures').innerHTML = p.features.map((f) => `<li>${esc(f)}</li>`).join('');
        $('#modalFeaturesTitle').hidden = !p.features.length;

        galleryBox.classList.toggle('is-single', p.images.length < 2);
        galleryThumbs.innerHTML = '';
        if (p.images.length > 1) {
            p.images.forEach((src, k) => {
                const b = document.createElement('button');
                b.type = 'button';
                b.setAttribute('aria-label', `Show screenshot ${k + 1}`);
                b.innerHTML = `<img src="${esc(src)}" alt="" loading="lazy" decoding="async">`;
                b.addEventListener('click', () => setSlide(k));
                galleryThumbs.appendChild(b);
            });
        }
        setSlide(0, true);

        if (typeof modal.showModal === 'function') modal.showModal();
        else modal.setAttribute('open', '');
        root.classList.add('modal-open');
        modalText.scrollTop = 0;
        modalPanel.scrollTop = 0;
        if (scene()) scene().pause();
    }

    function finishClose() {
        if (typeof modal.close === 'function') modal.close();
        else modal.removeAttribute('open');
    }

    function closeProject() {
        if (!modal.open) return;
        if (reduce) return finishClose();
        modal.classList.add('is-closing');
        setTimeout(() => {
            modal.classList.remove('is-closing');
            finishClose();
        }, 230);
    }

    if (modal) {
        modal.addEventListener('close', () => {
            root.classList.remove('modal-open');
            if (scene()) scene().resume();
            if (state.opener) state.opener.focus({ preventScroll: true });
        });
        modal.addEventListener('cancel', (e) => {
            e.preventDefault();
            closeProject();
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeProject(); // click on the backdrop
        });
        $('#modalClose').addEventListener('click', closeProject);
        $('#prevSlide').addEventListener('click', () => setSlide(state.index - 1));
        $('#nextSlide').addEventListener('click', () => setSlide(state.index + 1));

        modal.addEventListener('keydown', (e) => {
            if (!state.project || state.project.images.length < 2) return;
            if (e.key === 'ArrowLeft') setSlide(state.index - 1);
            if (e.key === 'ArrowRight') setSlide(state.index + 1);
        });

        // swipe through screenshots
        const stage = $('#galleryStage');
        let startX = null;
        stage.addEventListener('pointerdown', (e) => {
            startX = e.clientX;
        });
        stage.addEventListener('pointerup', (e) => {
            if (startX === null || !state.project) return;
            const dx = e.clientX - startX;
            startX = null;
            if (Math.abs(dx) > 45) setSlide(state.index + (dx < 0 ? 1 : -1));
        });
        stage.addEventListener('pointercancel', () => {
            startX = null;
        });
    }

    if (grid) {
        grid.addEventListener('click', (e) => {
            const card = e.target.closest('.project-card');
            if (!card) return;
            openProject(card.dataset.id, $('.project-card__open', card));
        });
    }

    renderProjects();

    /* ---- Contact form ---- */
    const form = $('#contactForm');
    if (form) {
        const btn = $('#formBtn');
        const status = $('#formStatus');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            btn.disabled = true;
            btn.textContent = 'Sending…';
            status.className = 'form__status';
            status.textContent = '';
            try {
                const res = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { Accept: 'application/json' },
                });
                if (!res.ok) throw new Error('bad response');
                form.reset();
                status.textContent = 'Thank you for your message! I will get back to you soon.';
                status.classList.add('is-ok');
            } catch (err) {
                status.textContent =
                    'The message was not sent. Check your connection and try again, or email hasnainhaiderflutterdev@gmail.com.';
                status.classList.add('is-error');
            } finally {
                btn.disabled = false;
                btn.textContent = 'Send message';
            }
        });
    }

    /* ======================================================================
       2. MOTION
       ====================================================================== */

    // Without motion: show the page straight away.
    if (!animate) {
        $('#loader').classList.add('is-done');
        root.classList.remove('is-loading');
        startHeroTyping();
        return;
    }

    gsap.registerPlugin(ScrollTrigger);
    root.classList.add('anim', 'is-loading');
    const unlock = setTimeout(() => root.classList.remove('is-loading'), 6500); // never leave the page locked

    const rig = $('#rig');
    const tilt = $('#tilt');
    const heroSection = $('#home');

    /* ---- Starting states (hidden behind the loader) ---- */
    gsap.set('.hero__name .line__in', { yPercent: 112 });
    gsap.set('[data-intro]', { opacity: 0, y: 24 });
    gsap.set(rig, { opacity: 0, rotationY: -72, rotationX: 20, '--explode': 3.4 });

    /* ---- Split headings: words rise out of a mask ---- */
    $$('[data-split]').forEach((el) => {
        const text = el.textContent.trim();
        el.setAttribute('aria-label', text);
        el.textContent = '';
        text.split(/\s+/).forEach((word, i, all) => {
            const mask = document.createElement('span');
            mask.className = 'w';
            mask.setAttribute('aria-hidden', 'true');
            const inner = document.createElement('span');
            inner.className = 'wi';
            inner.textContent = word;
            mask.appendChild(inner);
            el.appendChild(mask);
            if (i < all.length - 1) el.appendChild(document.createTextNode(' '));
        });
        gsap.set($$('.wi', el), { yPercent: 118 });
        ScrollTrigger.create({
            trigger: el,
            start: 'top 88%',
            once: true,
            onEnter: () =>
                gsap.to($$('.wi', el), { yPercent: 0, duration: 1, ease: 'power4.out', stagger: 0.08 }),
        });
    });

    /* ---- Hero intro ---- */
    function playIntro() {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
        tl.to('.hero__name .line__in', { yPercent: 0, duration: 1.15, stagger: 0.12 }, 0)
            .to('[data-intro]', { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, 0.3)
            .to(rig, { opacity: 1, duration: 0.6, ease: 'none' }, 0)
            .to(rig, { rotationY: -24, rotationX: 8, duration: 2.1, ease: 'expo.out' }, 0)
            .to(rig, { '--explode': 1, duration: 2.1, ease: 'expo.out' }, 0)
            .add(() => {
                startHeroTyping();
                heroIdle();
            }, 1.2);
        return tl;
    }

    /* ---- Hero idle motion + scroll assembly ---- */
    function heroIdle() {
        gsap.to(tilt, { y: -14, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 });
        gsap.to(tilt, { rotationZ: 1.4, duration: 5.2, ease: 'sine.inOut', yoyo: true, repeat: -1 });

        // As you scroll away, the exploded layers collapse back into the phone
        gsap.to(rig, {
            '--explode': 0.1,
            rotationY: -6,
            rotationX: 2,
            y: -30,
            scale: 0.94,
            ease: 'none',
            scrollTrigger: { trigger: heroSection, start: 'top top', end: 'bottom 25%', scrub: 0.7 },
        });

        if (finePointer) {
            const qY = gsap.quickTo(tilt, 'rotationY', { duration: 0.9, ease: 'power3' });
            const qX = gsap.quickTo(tilt, 'rotationX', { duration: 0.9, ease: 'power3' });
            heroSection.addEventListener('pointermove', (e) => {
                const r = heroSection.getBoundingClientRect();
                qY(((e.clientX - r.left) / r.width - 0.5) * 24);
                qX(-((e.clientY - r.top) / r.height - 0.5) * 16);
            });
            heroSection.addEventListener('pointerleave', () => {
                qY(0);
                qX(0);
            });
        }
    }

    /* ---- Loader ---- */
    function runLoader() {
        const loader = $('#loader');
        const countEl = $('#loaderCount');
        const bar = $('#loaderBar');
        const n = { v: 0 };
        const paint = () => {
            countEl.textContent = Math.round(n.v);
            bar.style.transform = `scaleX(${n.v / 100})`;
        };
        gsap.to(n, { v: 90, duration: 1.1, ease: 'power2.out', onUpdate: paint });

        const minWait = new Promise((r) => setTimeout(r, 1100));
        const loaded = new Promise((r) =>
            document.readyState === 'complete' ? r() : window.addEventListener('load', r, { once: true })
        );
        const cap = new Promise((r) => setTimeout(r, 3000));

        Promise.all([minWait, Promise.race([loaded, cap])]).then(() => {
            gsap.to(n, {
                v: 100,
                duration: 0.35,
                ease: 'power1.out',
                onUpdate: paint,
                onComplete: () => {
                    gsap.to(loader, {
                        yPercent: -100,
                        duration: 0.85,
                        ease: 'power4.inOut',
                        onComplete: () => {
                            loader.classList.add('is-done');
                            clearTimeout(unlock);
                            root.classList.remove('is-loading');
                            ScrollTrigger.refresh();
                        },
                    });
                    playIntro();
                },
            });
        });
    }
    runLoader();

    /* ---- Stats count up ---- */
    $$('.stat__num').forEach((el) => {
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        el.textContent = '0' + suffix;
        ScrollTrigger.create({
            trigger: el,
            start: 'top 92%',
            once: true,
            onEnter: () => {
                const o = { v: 0 };
                gsap.to(o, {
                    v: target,
                    duration: 1.6,
                    ease: 'power2.out',
                    onUpdate: () => (el.textContent = Math.round(o.v) + suffix),
                });
            },
        });
    });

    /* ---- About photo: unmask + parallax ---- */
    const frame = $('.about__frame');
    if (frame) {
        gsap.fromTo(
            frame,
            { clipPath: 'inset(0 0 100% 0 round 30px)' },
            {
                clipPath: 'inset(0 0 0% 0 round 30px)',
                duration: 1.3,
                ease: 'power4.out',
                scrollTrigger: { trigger: frame, start: 'top 82%', once: true },
            }
        );
        gsap.fromTo(
            $('img', frame),
            { yPercent: -7 },
            {
                yPercent: 7,
                ease: 'none',
                scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true },
            }
        );
    }

    /* ---- Skills + project cards: tilt up into place ---- */
    function rise(selector, y) {
        const items = $$(selector);
        if (!items.length) return;
        gsap.set(items, { opacity: 0, y, rotationX: -16, transformPerspective: 900 });
        ScrollTrigger.batch(items, {
            start: 'top 92%',
            once: true,
            onEnter: (batch) =>
                gsap.to(batch, {
                    opacity: 1,
                    y: 0,
                    rotationX: 0,
                    duration: 0.95,
                    ease: 'power3.out',
                    stagger: 0.07,
                }),
        });
    }
    rise('.skill', 44);
    rise('.project-card', 70);

    /* ---- Timeline: the line draws as you scroll ---- */
    const line = $('#timelineLine');
    if (line) {
        line.style.setProperty('--p', 0);
        ScrollTrigger.create({
            trigger: '#timeline',
            start: 'top 72%',
            end: 'bottom 72%',
            scrub: true,
            onUpdate: (self) => line.style.setProperty('--p', self.progress.toFixed(3)),
        });
        $$('.timeline__item').forEach((item) => {
            const body = $('.timeline__body', item);
            gsap.from(body, {
                x: 36,
                opacity: 0,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: { trigger: item, start: 'top 80%', once: true },
            });
            ScrollTrigger.create({
                trigger: item,
                start: 'top 72%',
                onEnter: () => item.classList.add('is-active'),
                onLeaveBack: () => item.classList.remove('is-active'),
            });
        });
    }

    /* ---- Marquee: speed and lean follow the scroll ---- */
    const track = $('#marqueeTrack');
    if (track) {
        root.classList.add('js-marquee');
        const group = track.firstElementChild;
        let x = 0;
        let groupW = group.offsetWidth;
        let boost = 0;
        let lastY = window.scrollY;
        let inView = true;
        new IntersectionObserver((e) => (inView = e[0].isIntersecting)).observe(track.parentElement);
        window.addEventListener('resize', () => (groupW = group.offsetWidth));
        gsap.ticker.add(() => {
            const y = window.scrollY;
            boost += ((y - lastY) * 0.35 - boost) * 0.1;
            lastY = y;
            if (!inView) return;
            x -= 1.1 + boost;
            if (x <= -groupW) x += groupW;
            if (x > 0) x -= groupW;
            track.style.transform = `translate3d(${x}px,0,0) skewX(${gsap.utils.clamp(-9, 9, -boost * 0.6)}deg)`;
        });
    }

    /* ---- Pointer-only extras ---- */
    if (finePointer) {
        // 3D tilt + glare
        $$('[data-tilt]').forEach((el) => {
            const glare = document.createElement('span');
            glare.className = 'glare';
            glare.setAttribute('aria-hidden', 'true');
            el.appendChild(glare);
            const max = el.classList.contains('project-card') ? 7 : 9;
            el.addEventListener('pointermove', (e) => {
                if (e.pointerType !== 'mouse') return;
                const r = el.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width;
                const py = (e.clientY - r.top) / r.height;
                el.style.setProperty('--gx', px * 100 + '%');
                el.style.setProperty('--gy', py * 100 + '%');
                gsap.to(el, {
                    rotationY: (px - 0.5) * 2 * max,
                    rotationX: -(py - 0.5) * 2 * max,
                    transformPerspective: 900,
                    duration: 0.45,
                    ease: 'power2.out',
                    overwrite: 'auto',
                });
            });
            el.addEventListener('pointerleave', () =>
                gsap.to(el, { rotationX: 0, rotationY: 0, duration: 0.7, ease: 'power3.out', overwrite: 'auto' })
            );
        });

        // Magnetic buttons
        $$('[data-magnet]').forEach((el) => {
            el.addEventListener('pointermove', (e) => {
                const r = el.getBoundingClientRect();
                gsap.to(el, {
                    x: (e.clientX - r.left - r.width / 2) * 0.25,
                    y: (e.clientY - r.top - r.height / 2) * 0.35,
                    duration: 0.35,
                    ease: 'power3.out',
                });
            });
            el.addEventListener('pointerleave', () =>
                gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' })
            );
        });

        // Cursor ring
        const cursor = $('#cursor');
        if (cursor) {
            const qx = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3' });
            const qy = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3' });
            window.addEventListener(
                'pointermove',
                (e) => {
                    cursor.classList.add('is-on');
                    qx(e.clientX);
                    qy(e.clientY);
                    cursor.classList.toggle('is-link', !!e.target.closest('a, button, .project-card'));
                },
                { passive: true }
            );
            document.addEventListener('pointerleave', () => cursor.classList.remove('is-on'));
        }
    }

    window.addEventListener('load', () => ScrollTrigger.refresh());
})();
