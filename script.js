// ==================== INITIALIZATION ====================
function initializeWebsite() {
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');

    // Hide loading screen after 3 seconds
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }, 3000);

    // Initialize Three.js scenes
    initHeroScene();
    initIntroScene();
    initDishScene();
    initScrollAnimations();
}

// Start initialization when DOM is ready
document.addEventListener('DOMContentLoaded', initializeWebsite);

// ==================== HERO SCENE ====================
function initHeroScene() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight - 60), 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight - 60);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.position.z = 5;

    // Create particles
    const particleCount = 100;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 20;
        positions[i + 1] = (Math.random() - 0.5) * 20;
        positions[i + 2] = (Math.random() - 0.5) * 10;

        velocities[i] = (Math.random() - 0.5) * 0.02;
        velocities[i + 1] = (Math.random() - 0.5) * 0.02;
        velocities[i + 2] = (Math.random() - 0.5) * 0.02;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        size: 0.1,
        color: 0xa855f7,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.6,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Create rotating cube
    const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
    const cubeMaterial = new THREE.MeshPhongMaterial({
        color: 0xa855f7,
        emissive: 0x7e22ce,
        wireframe: false,
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.z = 0;
    scene.add(cube);

    // Add lighting
    const light = new THREE.PointLight(0xa855f7, 2, 100);
    light.position.set(5, 5, 5);
    scene.add(light);

    const light2 = new THREE.PointLight(0x3b82f6, 1.5, 100);
    light2.position.set(-5, -5, 5);
    scene.add(light2);

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Rotate cube
        cube.rotation.x += 0.003;
        cube.rotation.y += 0.005;
        cube.rotation.z += 0.002;

        // Animate particles
        const positionAttribute = geometry.getAttribute('position');
        const posArray = positionAttribute.array;

        for (let i = 0; i < particleCount * 3; i += 3) {
            posArray[i] += velocities[i];
            posArray[i + 1] += velocities[i + 1];
            posArray[i + 2] += velocities[i + 2];

            // Wrap around
            if (Math.abs(posArray[i]) > 10) velocities[i] *= -1;
            if (Math.abs(posArray[i + 1]) > 10) velocities[i + 1] *= -1;
            if (Math.abs(posArray[i + 2]) > 10) velocities[i + 2] *= -1;
        }
        positionAttribute.needsUpdate = true;

        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / (window.innerHeight - 60);
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight - 60);
    });
}

// ==================== INTRO SCENE ====================
function initIntroScene() {
    const canvas = document.getElementById('introCanvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.position.z = 3;

    // Create floating sphere
    const sphereGeometry = new THREE.IcosahedronGeometry(1, 4);
    const sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x3b82f6,
        emissive: 0x1e3a8a,
        wireframe: false,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    // Add lighting
    const light = new THREE.PointLight(0xa855f7, 2, 100);
    light.position.set(3, 3, 3);
    scene.add(light);

    const light2 = new THREE.PointLight(0x3b82f6, 1.5, 100);
    light2.position.set(-3, -3, 3);
    scene.add(light2);

    let time = 0;

    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;

        sphere.rotation.x += 0.002;
        sphere.rotation.y += 0.003;
        sphere.position.y = Math.sin(time * 0.5) * 0.5;

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
}

// ==================== DISH SCENE ====================
function initDishScene() {
    const canvas = document.getElementById('dishCanvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.position.z = 4;

    // Create torus (representing tandoori chicken)
    const torusGeometry = new THREE.TorusGeometry(1.5, 0.6, 16, 100);
    const torusMaterial = new THREE.MeshPhongMaterial({
        color: 0xff6b35,
        emissive: 0xd84315,
        wireframe: false,
        shininess: 100,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torus);

    // Create secondary ring
    const ringGeometry = new THREE.TorusGeometry(2, 0.3, 16, 100);
    const ringMaterial = new THREE.MeshPhongMaterial({
        color: 0xa855f7,
        emissive: 0x7e22ce,
        transparent: true,
        opacity: 0.6,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI * 0.3;
    scene.add(ring);

    // Add lighting with glow effect
    const light = new THREE.PointLight(0xff6b35, 2.5, 100);
    light.position.set(4, 4, 4);
    scene.add(light);

    const light2 = new THREE.PointLight(0xa855f7, 2, 100);
    light2.position.set(-4, -4, 4);
    scene.add(light2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    let time = 0;

    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;

        torus.rotation.x += 0.002;
        torus.rotation.y += 0.004;
        torus.position.z = Math.sin(time * 0.3) * 0.3;

        ring.rotation.z += 0.003;
        ring.position.y = Math.cos(time * 0.4) * 0.4;

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
}

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.intro-section, .featured-section, .menu-section, .experience-section, .contact-section');
    sections.forEach((section) => {
        section.classList.add('scroll-fade');
        observer.observe(section);
    });

    // Observe menu cards
    const menuCards = document.querySelectorAll('.menu-card');
    menuCards.forEach((card) => {
        card.classList.add('scroll-fade');
        observer.observe(card);
    });

    // Observe experience cards
    const experienceCards = document.querySelectorAll('.experience-card');
    experienceCards.forEach((card) => {
        card.classList.add('scroll-fade');
        observer.observe(card);
    });

    // Observe info items
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach((item) => {
        item.classList.add('scroll-fade');
        observer.observe(item);
    });

    // Parallax effect on scroll
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroCanvas = document.getElementById('heroCanvas');
        
        if (heroCanvas) {
            heroCanvas.style.transform = `translateY(${scrollY * 0.5}px)`;
        }
    });
}
