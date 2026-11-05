/*
 * 3D background (Three.js).
 * A field of thin "UI slabs" (phones, cards, app bars, FAB buttons) drifting in depth.
 * They shift with scroll (nearer slabs move faster), lean toward the mouse,
 * and spin faster while you scroll quickly.
 * Falls back to the plain moss background if WebGL or Three.js is unavailable.
 */
(() => {
    'use strict';

    const root = document.documentElement;
    const canvas = document.getElementById('scene');
    const THREE = window.THREE;

    if (!canvas || !THREE) {
        root.classList.add('no-webgl');
        return;
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const small = window.matchMedia('(max-width: 760px)').matches;

    let renderer;
    try {
        renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: !small,
            powerPreference: 'high-performance',
        });
    } catch (err) {
        root.classList.add('no-webgl');
        return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.5 : 1.75));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x293519, 13, 36);

    const FOV = 45;
    const CAM_Z = 14;
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 80);
    camera.position.set(0, 0, CAM_Z);

    // Kept low on purpose: the slabs are scenery and must stay quieter than the page text
    scene.add(new THREE.AmbientLight(0xdfe6c4, 0.5));
    const key = new THREE.DirectionalLight(0xfff3b0, 0.55);
    key.position.set(6, 9, 8);
    scene.add(key);
    const rim = new THREE.PointLight(0xefd003, 0.5, 42);
    rim.position.set(-8, -2, 6);
    scene.add(rim);

    /* ---------- geometry ---------- */
    function slabGeo(w, h, r, d) {
        const x = -w / 2;
        const y = -h / 2;
        const s = new THREE.Shape();
        s.moveTo(x + r, y);
        s.lineTo(x + w - r, y);
        s.quadraticCurveTo(x + w, y, x + w, y + r);
        s.lineTo(x + w, y + h - r);
        s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        s.lineTo(x + r, y + h);
        s.quadraticCurveTo(x, y + h, x, y + h - r);
        s.lineTo(x, y + r);
        s.quadraticCurveTo(x, y, x + r, y);
        const g = new THREE.ExtrudeGeometry(s, {
            depth: d,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.03,
            bevelSegments: 2,
            curveSegments: 6,
        });
        g.translate(0, 0, -d / 2);
        return g;
    }

    const fab = new THREE.CylinderGeometry(0.55, 0.55, 0.16, 32);
    fab.rotateX(Math.PI / 2);

    const shapes = [
        { geo: slabGeo(1.3, 2.6, 0.28, 0.14), weight: 3 }, // phone
        { geo: slabGeo(3.0, 1.8, 0.22, 0.12), weight: 3 }, // card
        { geo: slabGeo(3.8, 0.55, 0.27, 0.1), weight: 2 }, // app bar
        { geo: slabGeo(2.0, 2.0, 0.4, 0.12), weight: 1 }, // tile
        { geo: fab, weight: 2 }, // floating action button
    ];
    const shapePool = shapes.flatMap((s) => Array(s.weight).fill(s));
    const edgeCache = new Map();
    const edgesFor = (geo) => {
        if (!edgeCache.has(geo)) edgeCache.set(geo, new THREE.EdgesGeometry(geo, 35));
        return edgeCache.get(geo);
    };

    const mat = (hex) => new THREE.MeshStandardMaterial({ color: hex, roughness: 0.55, metalness: 0.05 });
    const palette = [
        { m: mat(0x34441e), w: 5 },
        { m: mat(0x3d5025), w: 3 },
        { m: mat(0x2a3a18), w: 3 },
        { m: mat(0x756905), w: 1 },
    ];
    const palettePool = palette.flatMap((p) => Array(p.w).fill(p.m));
    const lineYellow = new THREE.LineBasicMaterial({ color: 0xefd003, transparent: true, opacity: 0.45 });
    const lineLichen = new THREE.LineBasicMaterial({ color: 0xd5dabe, transparent: true, opacity: 0.22 });

    /* ---------- slabs (seeded so the layout is the same every visit) ---------- */
    function rng(seed) {
        return () => {
            seed |= 0;
            seed = (seed + 0x6d2b79f5) | 0;
            let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
            t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
    }
    const rand = rng(20261105);
    const pick = (arr) => arr[Math.floor(rand() * arr.length)];

    const H = 28; // world height of the wrapping band
    const COUNT = small ? 11 : 22;
    const slabs = [];

    // Half the visible width at depth z, so slabs stay on screen on any aspect ratio
    const halfWidthAt = (z) => Math.tan((FOV * Math.PI) / 360) * (CAM_Z - z) * camera.aspect;

    for (let i = 0; i < COUNT; i++) {
        const shape = pick(shapePool);
        const mesh = new THREE.Mesh(shape.geo, pick(palettePool));
        const z = -11 + rand() * 11; // never closer than z = 0, so nothing swallows the text
        const depth01 = (z + 11) / 11;
        const s = 0.75 + rand() * 0.8 + (1 - depth01) * 0.5;
        mesh.scale.setScalar(s);
        mesh.rotation.set(rand() * 6.28, rand() * 6.28, rand() * 6.28);

        if (rand() < 0.55) {
            mesh.add(new THREE.LineSegments(edgesFor(shape.geo), rand() < 0.5 ? lineYellow : lineLichen));
        }
        scene.add(mesh);

        slabs.push({
            mesh,
            nx: rand() * 2 - 1,
            y: (rand() - 0.5) * H,
            z,
            f: 0.0016 + depth01 * 0.0042, // world units per scrolled pixel
            px: 0.4 + depth01 * 1.6, // mouse parallax
            rx: (rand() - 0.5) * 0.3,
            ry: (rand() - 0.5) * 0.3,
            rz: (rand() - 0.5) * 0.1,
        });
    }

    const wrap = (v) => ((((v + H / 2) % H) + H) % H) - H / 2;

    /* ---------- loop ---------- */
    let w = 0;
    let h = 0;
    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;
    let vel = 0;
    let lastScroll = window.scrollY;
    let last = performance.now();
    let running = false;
    let paused = false;
    let raf = 0;

    window.addEventListener(
        'pointermove',
        (e) => {
            tx = e.clientX / window.innerWidth - 0.5;
            ty = e.clientY / window.innerHeight - 0.5;
        },
        { passive: true }
    );

    function place(boost, dt) {
        const scrollY = window.scrollY;
        camera.position.x = mx * 1.6;
        camera.position.y = -my * 1.0;
        camera.lookAt(0, 0, 0);

        for (const s of slabs) {
            s.mesh.position.set(
                s.nx * halfWidthAt(s.z) * 1.05 + mx * s.px,
                wrap(s.y + scrollY * s.f),
                s.z
            );
            if (dt) {
                s.mesh.rotation.x += s.rx * dt * boost;
                s.mesh.rotation.y += s.ry * dt * boost;
                s.mesh.rotation.z += s.rz * dt;
            }
        }
    }

    function frame(now) {
        if (!running) return;
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;

        const scrollY = window.scrollY;
        const rawV = (scrollY - lastScroll) / Math.max(dt * 1000, 1); // px per ms
        lastScroll = scrollY;
        vel += (rawV - vel) * 0.08;
        const boost = 1 + Math.min(Math.abs(vel) * 6, 7);

        mx += (tx - mx) * 0.04;
        my += (ty - my) * 0.04;

        place(boost, dt);
        renderer.render(scene, camera);
        raf = requestAnimationFrame(frame);
    }

    function start() {
        if (running || reduce) return;
        running = true;
        last = performance.now();
        lastScroll = window.scrollY;
        raf = requestAnimationFrame(frame);
    }

    function stop() {
        running = false;
        cancelAnimationFrame(raf);
    }

    function resize() {
        const nw = window.innerWidth;
        const nh = window.innerHeight;
        // ignore the small height changes caused by mobile browser bars
        if (nw === w && Math.abs(nh - h) < 120) return;
        w = nw;
        h = nh;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        if (!running) {
            place(1, 0);
            renderer.render(scene, camera);
        }
    }

    let resizeTimer = 0;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resize, 120);
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) stop();
        else if (!paused) start();
    });

    // Used by main.js to rest the GPU while the project dialog is open
    window.PortfolioScene = {
        pause() {
            paused = true;
            stop();
        },
        resume() {
            paused = false;
            start();
        },
    };

    resize();
    place(1, 0);
    renderer.render(scene, camera);
    canvas.classList.add('is-ready');
    start();
})();
