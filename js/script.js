// Apple-Style Animations
document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);
    
    // 1. Hero Entrance (Staggered & Smooth)
    const tl = gsap.timeline();
    tl.to(".reveal-text", {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out"
    });

    // 2. Scroll Reveals (Parallax-like Fade)
    gsap.utils.toArray('.gs-reveal').forEach(elem => {
        gsap.fromTo(elem, 
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: elem,
                    start: "top 85%"
                }
            }
        );
    });

    // 3. Three.js Background (Subtle Particles)
    initThreeJS();

    // 4. Smooth Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
});

function initThreeJS() {
    const container = document.getElementById('canvas-container');
    if(!container) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: container, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Apple-like Abstract Nodes
    const geometry = new THREE.SphereGeometry(0.2, 16, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.1 });
    const group = new THREE.Group();
    
    for(let i=0; i<50; i++) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 10
        );
        group.add(mesh);
    }
    
    // Add Lines
    const lineGeo = new THREE.BufferGeometry();
    const lineMat = new THREE.LineBasicMaterial({ color: 0x000000, transparent:true, opacity: 0.05 });
    
    scene.add(group);
    camera.position.z = 5;

    let mouseX = 0;
    let mouseY = 0;
    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    function animate() {
        requestAnimationFrame(animate);
        group.rotation.x += 0.001;
        group.rotation.y += 0.001;
        
        // Parallax
        group.rotation.x += mouseY * 0.05;
        group.rotation.y += mouseX * 0.05;

        renderer.render(scene, camera);
    }
    animate();
    
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
