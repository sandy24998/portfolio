// ═══════════════════════════════════════════════════════════════════════════
// PREMIUM PORTFOLIO — High-Impact Animations + Optimized Performance
// Best of both worlds: jaw-dropping visuals with efficient rendering
// ═══════════════════════════════════════════════════════════════════════════

document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    initPageLoader();
    initMobileNav();
    initCursorGlow();
    initHeroAnimations();
    initScrollAnimations();
    initThreeJS();
    initSmoothScroll();
    initMagneticButtons();
    initParallaxEffects();
    initTextReveal();
    initCardTilt();
});

// ═══════════════════════════════════════════════════════════════════════════
// Mobile Navigation Toggle
// ═══════════════════════════════════════════════════════════════════════════
function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', () => {
        const isOpen = toggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        toggle.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            navLinks.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// Page Loader — cinematic reveal
// ═══════════════════════════════════════════════════════════════════════════
function initPageLoader() {
    const loader = document.querySelector('.page-loader');
    if (!loader) return;

    if (document.readyState === 'complete') {
        loader.style.display = 'none';
        return;
    }

    window.addEventListener('load', () => {
        const tl = gsap.timeline();
        tl.to('.loader-spinner', { scale: 0.8, opacity: 0, duration: 0.3, ease: "power2.in" })
          .to(loader, {
              opacity: 0,
              duration: 0.5,
              ease: "power2.out",
              onComplete: () => { loader.style.display = 'none'; }
          }, "-=0.1");
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// Cursor Glow — GPU-accelerated, interactive sizing
// ═══════════════════════════════════════════════════════════════════════════
function initCursorGlow() {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    let mx = 0, my = 0, cx = 0, cy = 0;

    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
    }, { passive: true });

    document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { glow.style.opacity = '1'; });

    // Enlarge glow on interactive elements
    document.querySelectorAll('a, button, .btn, .bento-card, .project-card, .tag').forEach(el => {
        el.addEventListener('mouseenter', () => {
            glow.style.width = '500px';
            glow.style.height = '500px';
        });
        el.addEventListener('mouseleave', () => {
            glow.style.width = '350px';
            glow.style.height = '350px';
        });
    });

    function tick() {
        cx += (mx - cx) * 0.1;
        cy += (my - cy) * 0.1;
        glow.style.transform = `translate3d(${cx - 175}px, ${cy - 175}px, 0)`;
        requestAnimationFrame(tick);
    }
    tick();
}

// ═══════════════════════════════════════════════════════════════════════════
// Hero Animations — cinematic staggered entrance
// ═══════════════════════════════════════════════════════════════════════════
function initHeroAnimations() {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Cinematic staggered reveal
    tl.to(".reveal-text", {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out"
    })
    .to(".hero-cta-group .btn", {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.7)"
    }, "-=0.4");

    // Floating title
    gsap.to(".hero-title", {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        force3D: true
    });

    // Gradient pulse on hero background
    gsap.to(".hero-section::before", {
        scale: 1.2,
        opacity: 0.6,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// Scroll Animations — staggered reveals with depth effects
// ═══════════════════════════════════════════════════════════════════════════
function initScrollAnimations() {
    // Generic reveal elements — staggered within each batch
    ScrollTrigger.batch('.gs-reveal', {
        start: "top 88%",
        onEnter: batch => {
            gsap.fromTo(batch,
                { y: 50, opacity: 0, scale: 0.96 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    force3D: true,
                    overwrite: true
                }
            );
        },
        once: true
    });

    // Bento cards — pop in with depth
    gsap.utils.toArray('.bento-card').forEach((card, i) => {
        gsap.fromTo(card,
            { y: 60, opacity: 0, rotateX: -8, scale: 0.95 },
            {
                y: 0,
                opacity: 1,
                rotateX: 0,
                scale: 1,
                duration: 0.7,
                ease: "back.out(1.4)",
                force3D: true,
                scrollTrigger: { trigger: card, start: "top 90%", once: true },
                delay: i * 0.08
            }
        );
    });

    // Project cards — dramatic slide-in from sides
    gsap.utils.toArray('.project-card').forEach((card, i) => {
        const dir = i % 2 === 0 ? -80 : 80;
        gsap.fromTo(card,
            { x: dir, opacity: 0, scale: 0.92, rotateY: dir > 0 ? 5 : -5 },
            {
                x: 0,
                opacity: 1,
                scale: 1,
                rotateY: 0,
                duration: 1,
                ease: "power3.out",
                force3D: true,
                scrollTrigger: { trigger: card, start: "top 85%", once: true }
            }
        );
    });

    // Job items — slide in with left accent
    gsap.utils.toArray('.job-item').forEach((item, i) => {
        gsap.fromTo(item,
            { y: 50, opacity: 0, x: -30 },
            {
                y: 0,
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power2.out",
                force3D: true,
                scrollTrigger: { trigger: item, start: "top 88%", once: true },
                delay: i * 0.12
            }
        );
    });

    // Section titles — dramatic clip-path reveal
    gsap.utils.toArray('.section-title, .sticky-title').forEach(title => {
        gsap.fromTo(title,
            { y: 60, opacity: 0, clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
            {
                y: 0,
                opacity: 1,
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                duration: 1,
                ease: "power4.out",
                force3D: true,
                scrollTrigger: { trigger: title, start: "top 88%", once: true }
            }
        );
    });

    // Navbar scroll behavior — throttled with rAF
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const y = window.pageYOffset;
            if (y > 80) {
                navbar.classList.add('navbar--scrolled');
            } else {
                navbar.classList.remove('navbar--scrolled');
            }
            if (y > lastScroll && y > 400) {
                navbar.classList.add('navbar--hidden');
            } else {
                navbar.classList.remove('navbar--hidden');
            }
            lastScroll = y;
            ticking = false;
        });
    }, { passive: true });
}

// ═══════════════════════════════════════════════════════════════════════════
// Three.js — Efficient Particle Network (merged geometry)
// ═══════════════════════════════════════════════════════════════════════════
function initThreeJS() {
    const canvas = document.getElementById('canvas-container');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // Particles — fewer but more impactful
    const N = 100;
    const pos = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);

    const palette = [
        [0.39, 0.40, 0.95],  // Indigo
        [0.55, 0.36, 0.97],  // Violet
        [0.02, 0.71, 0.83],  // Cyan
        [0.23, 0.51, 0.96],  // Blue
        [0.49, 0.24, 0.90],  // Purple
        [0.96, 0.45, 0.09]   // Orange accent
    ];

    for (let i = 0; i < N; i++) {
        const i3 = i * 3;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const r = 3 + Math.random() * 9;
        pos[i3]     = r * Math.sin(phi) * Math.cos(theta);
        pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pos[i3 + 2] = r * Math.cos(phi);
        const c = palette[Math.floor(Math.random() * palette.length)];
        col[i3] = c[0]; col[i3 + 1] = c[1]; col[i3 + 2] = c[2];
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(col, 3));

    const pMat = new THREE.PointsMaterial({
        size: 0.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Lines — single merged BufferGeometry (huge perf win)
    const lineVerts = [];
    for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
            const i3 = i * 3, j3 = j * 3;
            const dx = pos[i3]-pos[j3], dy = pos[i3+1]-pos[j3+1], dz = pos[i3+2]-pos[j3+2];
            if (dx*dx + dy*dy + dz*dz < 9) {
                lineVerts.push(pos[i3], pos[i3+1], pos[i3+2], pos[j3], pos[j3+1], pos[j3+2]);
            }
        }
    }
    const lGeo = new THREE.BufferGeometry();
    lGeo.setAttribute('position', new THREE.Float32BufferAttribute(lineVerts, 3));
    const lMat = new THREE.LineBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.12 });
    const lines = new THREE.LineSegments(lGeo, lMat);
    scene.add(lines);

    camera.position.z = 12;

    // Mouse interaction
    let mx = 0, my = 0, tx = 0, ty = 0;
    window.addEventListener('mousemove', e => {
        mx = (e.clientX / window.innerWidth) * 2 - 1;
        my = -(e.clientY / window.innerHeight) * 2 + 1;
    }, { passive: true });

    // Pause when not visible
    let isVisible = true;
    const obs = new IntersectionObserver(entries => {
        isVisible = entries[0].isIntersecting;
    }, { threshold: 0 });
    obs.observe(document.querySelector('.hero-section'));

    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        if (!isVisible) return;

        const t = clock.getElapsedTime();
        tx += (mx - tx) * 0.025;
        ty += (my - ty) * 0.025;

        const ry = t * 0.04 + tx * 0.3;
        const rx = t * 0.025 + ty * 0.3;

        particles.rotation.set(rx, ry, 0);
        lines.rotation.set(rx * 0.85, ry * 0.85, 0);

        // Breathing animation
        const s = 1 + Math.sin(t * 0.4) * 0.08;
        particles.scale.setScalar(s);

        renderer.render(scene, camera);
    }
    animate();

    // Debounced resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }, 150);
    }, { passive: true });
}

// ═══════════════════════════════════════════════════════════════════════════
// Smooth Scroll
// ═══════════════════════════════════════════════════════════════════════════
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const el = document.querySelector(this.getAttribute('href'));
            if (el) {
                const y = el.getBoundingClientRect().top + window.pageYOffset - 100;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// Magnetic Buttons — snappy with elastic return
// ═══════════════════════════════════════════════════════════════════════════
function initMagneticButtons() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const r = btn.getBoundingClientRect();
            const x = e.clientX - r.left - r.width / 2;
            const y = e.clientY - r.top - r.height / 2;
            gsap.to(btn, {
                x: x * 0.2,
                y: y * 0.2,
                duration: 0.3,
                ease: "power2.out",
                force3D: true
            });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// Parallax Effects
// ═══════════════════════════════════════════════════════════════════════════
function initParallaxEffects() {
    gsap.to('.hero-content', {
        yPercent: -25,
        ease: "none",
        force3D: true,
        scrollTrigger: {
            trigger: '.hero-section',
            start: "top top",
            end: "bottom top",
            scrub: 0.8
        }
    });

    gsap.utils.toArray('.project-img img').forEach(img => {
        gsap.to(img, {
            yPercent: -12,
            ease: "none",
            force3D: true,
            scrollTrigger: {
                trigger: img.closest('.project-card'),
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8
            }
        });
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// Text Reveal — shimmer effects on interactive elements
// ═══════════════════════════════════════════════════════════════════════════
function initTextReveal() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.addEventListener('mouseenter', () => {
            gsap.fromTo(heroTitle,
                { backgroundPosition: "0% 50%" },
                { backgroundPosition: "100% 50%", duration: 1, ease: "power2.inOut" }
            );
        });
    }

    // Shimmer on tags
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            gsap.fromTo(tag,
                { boxShadow: "inset 0 0 0 rgba(99,102,241,0)" },
                { boxShadow: "inset 0 0 20px rgba(99,102,241,0.3)", duration: 0.3 }
            );
        });
        tag.addEventListener('mouseleave', () => {
            gsap.to(tag, {
                boxShadow: "inset 0 0 0 rgba(99,102,241,0)",
                duration: 0.3
            });
        });
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// Card Tilt — 3D perspective tilt on hover (bento + project cards)
// ═══════════════════════════════════════════════════════════════════════════
function initCardTilt() {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    document.querySelectorAll('.bento-card, .project-card').forEach(card => {
        card.style.transformStyle = 'preserve-3d';

        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            gsap.to(card, {
                rotateY: x * 8,
                rotateX: -y * 8,
                duration: 0.4,
                ease: "power2.out",
                force3D: true
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateY: 0,
                rotateX: 0,
                duration: 0.6,
                ease: "elastic.out(1, 0.5)"
            });
        });
    });
}
