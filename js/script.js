// ═══════════════════════════════════════════════════════════════════════════
// PREMIUM PORTFOLIO — Advanced Animations & Effects
// Features: GSAP ScrollTrigger, Three.js Particle Network, Cursor Glow,
//           Magnetic Buttons, Smooth Page Transitions
// ═══════════════════════════════════════════════════════════════════════════

document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize all effects
    initPageLoader();
    initCursorGlow();
    initHeroAnimations();
    initScrollAnimations();
    initThreeJS();
    initSmoothScroll();
    initMagneticButtons();
    initParallaxEffects();
    initTextReveal();
});

// ═══════════════════════════════════════════════════════════════════════════
// Page Loader
// ═══════════════════════════════════════════════════════════════════════════
function initPageLoader() {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        window.addEventListener('load', () => {
            gsap.to(loader, {
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
                onComplete: () => {
                    loader.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        });
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// Cursor Glow Effect (Desktop Only)
// ═══════════════════════════════════════════════════════════════════════════
function initCursorGlow() {
    if (window.matchMedia("(pointer: fine)").matches) {
        const cursorGlow = document.createElement('div');
        cursorGlow.className = 'cursor-glow';
        document.body.appendChild(cursorGlow);
        
        let mouseX = 0, mouseY = 0;
        let currentX = 0, currentY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function animateCursor() {
            currentX += (mouseX - currentX) * 0.08;
            currentY += (mouseY - currentY) * 0.08;
            cursorGlow.style.left = currentX + 'px';
            cursorGlow.style.top = currentY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
        
        // Hide cursor glow when leaving window
        document.addEventListener('mouseleave', () => {
            cursorGlow.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            cursorGlow.style.opacity = '1';
        });
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// Hero Section Animations
// ═══════════════════════════════════════════════════════════════════════════
function initHeroAnimations() {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    
    // Staggered reveal animation
    tl.to(".reveal-text", {
        y: 0,
        opacity: 1,
        duration: 1.4,
        stagger: 0.2,
        ease: "power3.out"
    });
    
    // Add floating animation to hero title
    gsap.to(".hero-title", {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
    
    // Continuous gradient animation for hero background
    gsap.to(".hero-section::before, .hero-section::after", {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: "none"
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// Scroll-Triggered Animations
// ═══════════════════════════════════════════════════════════════════════════
function initScrollAnimations() {
    // Fade up animations for all reveal elements
    gsap.utils.toArray('.gs-reveal').forEach((elem, index) => {
        gsap.fromTo(elem, 
            { 
                y: 60, 
                opacity: 0,
                scale: 0.95
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: elem,
                    start: "top 88%",
                    toggleActions: "play none none none"
                },
                delay: index * 0.05
            }
        );
    });
    
    // Bento cards stagger animation
    gsap.utils.toArray('.bento-card').forEach((card, index) => {
        gsap.fromTo(card,
            { 
                y: 80, 
                opacity: 0, 
                rotateX: -15 
            },
            {
                y: 0,
                opacity: 1,
                rotateX: 0,
                duration: 0.8,
                ease: "back.out(1.2)",
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%"
                },
                delay: index * 0.1
            }
        );
    });
    
    // Project cards slide in
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        const direction = index % 2 === 0 ? -100 : 100;
        gsap.fromTo(card,
            { 
                x: direction, 
                opacity: 0,
                scale: 0.9
            },
            {
                x: 0,
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%"
                }
            }
        );
    });
    
    // Job items slide up with stagger
    gsap.utils.toArray('.job-item').forEach((item, index) => {
        gsap.fromTo(item,
            { 
                y: 60, 
                opacity: 0,
                x: -30
            },
            {
                y: 0,
                opacity: 1,
                x: 0,
                duration: 0.9,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%"
                },
                delay: index * 0.15
            }
        );
    });
    
    // Section titles animation
    gsap.utils.toArray('.section-title, .sticky-title').forEach(title => {
        gsap.fromTo(title,
            { 
                y: 100, 
                opacity: 0,
                clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)"
            },
            {
                y: 0,
                opacity: 1,
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                duration: 1.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: title,
                    start: "top 85%"
                }
            }
        );
    });
    
    // Navbar hide/show on scroll
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(10, 10, 15, 0.9)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.03)';
            navbar.style.boxShadow = 'none';
        }
        
        if (currentScroll > lastScroll && currentScroll > 500) {
            gsap.to(navbar, { y: -100, duration: 0.3 });
        } else {
            gsap.to(navbar, { y: 0, duration: 0.3 });
        }
        
        lastScroll = currentScroll;
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// Three.js Particle Network Background
// ═══════════════════════════════════════════════════════════════════════════
function initThreeJS() {
    const container = document.getElementById('canvas-container');
    if (!container) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        canvas: container, 
        alpha: true, 
        antialias: true 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create particle system
    const particleCount = 150;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    const colorPalette = [
        { r: 0.39, g: 0.4, b: 0.95 },   // Indigo
        { r: 0.55, g: 0.36, b: 0.97 },  // Violet
        { r: 0.02, g: 0.71, b: 0.83 },  // Cyan
        { r: 0.23, g: 0.51, b: 0.96 },  // Blue
        { r: 0.49, g: 0.24, b: 0.9 }    // Purple
    ];
    
    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Random position in sphere
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        const radius = 3 + Math.random() * 10;
        
        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi);
        
        // Random color from palette
        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
        
        sizes[i] = Math.random() * 3 + 1;
    }
    
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // Custom shader material for glow effect
    const particleMaterial = new THREE.PointsMaterial({
        size: 0.15,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    
    // Create connecting lines
    const lineGroup = new THREE.Group();
    const lineMaterial = new THREE.LineBasicMaterial({ 
        color: 0x6366f1, 
        transparent: true, 
        opacity: 0.12 
    });
    
    // Connect nearby particles with lines
    for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
            const i3 = i * 3;
            const j3 = j * 3;
            
            const dx = positions[i3] - positions[j3];
            const dy = positions[i3 + 1] - positions[j3 + 1];
            const dz = positions[i3 + 2] - positions[j3 + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            
            if (dist < 3) {
                const lineGeometry = new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3(positions[i3], positions[i3 + 1], positions[i3 + 2]),
                    new THREE.Vector3(positions[j3], positions[j3 + 1], positions[j3 + 2])
                ]);
                const line = new THREE.Line(lineGeometry, lineMaterial);
                lineGroup.add(line);
            }
        }
    }
    scene.add(lineGroup);
    
    camera.position.z = 12;
    
    // Mouse interaction
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;
    
    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Animation loop
    const clock = new THREE.Clock();
    
    function animate() {
        requestAnimationFrame(animate);
        
        const elapsedTime = clock.getElapsedTime();
        
        // Smooth mouse follow
        targetX += (mouseX - targetX) * 0.02;
        targetY += (mouseY - targetY) * 0.02;
        
        // Rotate particles
        particles.rotation.y = elapsedTime * 0.05;
        particles.rotation.x = elapsedTime * 0.03;
        
        // Mouse parallax
        particles.rotation.y += targetX * 0.3;
        particles.rotation.x += targetY * 0.3;
        
        lineGroup.rotation.y = elapsedTime * 0.03;
        lineGroup.rotation.x = elapsedTime * 0.02;
        lineGroup.rotation.y += targetX * 0.2;
        lineGroup.rotation.x += targetY * 0.2;
        
        // Breathing animation
        const scale = 1 + Math.sin(elapsedTime * 0.5) * 0.1;
        particles.scale.set(scale, scale, scale);
        
        renderer.render(scene, camera);
    }
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// Smooth Scroll for Anchor Links
// ═══════════════════════════════════════════════════════════════════════════
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    scrollTo: { y: target, offsetY: 100 },
                    duration: 1.2,
                    ease: "power3.inOut"
                });
            }
        });
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// Magnetic Button Effect
// ═══════════════════════════════════════════════════════════════════════════
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(button, {
                x: x * 0.2,
                y: y * 0.2,
                duration: 0.4,
                ease: "power2.out"
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// Parallax Effects
// ═══════════════════════════════════════════════════════════════════════════
function initParallaxEffects() {
    // Hero content parallax
    gsap.to('.hero-content', {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
            trigger: '.hero-section',
            start: "top top",
            end: "bottom top",
            scrub: 1
        }
    });
    
    // Project images parallax
    gsap.utils.toArray('.project-img img').forEach(img => {
        gsap.to(img, {
            yPercent: -15,
            ease: "none",
            scrollTrigger: {
                trigger: img.closest('.project-card'),
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// Text Reveal Animation (Split Text Effect)
// ═══════════════════════════════════════════════════════════════════════════
function initTextReveal() {
    // Add letter-by-letter animation to hero title on hover
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.addEventListener('mouseenter', () => {
            gsap.fromTo(heroTitle, 
                { backgroundPosition: "0% 50%" },
                { 
                    backgroundPosition: "100% 50%",
                    duration: 1,
                    ease: "power2.inOut"
                }
            );
        });
    }
    
    // Add shine effect on tags
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            gsap.fromTo(tag,
                { boxShadow: "inset 0 0 0 rgba(102, 126, 234, 0)" },
                { 
                    boxShadow: "inset 0 0 20px rgba(102, 126, 234, 0.3)",
                    duration: 0.3
                }
            );
        });
        
        tag.addEventListener('mouseleave', () => {
            gsap.to(tag, {
                boxShadow: "inset 0 0 0 rgba(102, 126, 234, 0)",
                duration: 0.3
            });
        });
    });
}
