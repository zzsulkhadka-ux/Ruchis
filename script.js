document.addEventListener('DOMContentLoaded', () => {
    const bgContainer = document.getElementById('background-3d');
    const foodEmojis = ['🍲', '🍗', '🍚', '🌶️', '🍛', '🥤', '🥘', '🦐', '🍖'];
    const particleCount = 25;

    // Create floating food particles for background
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'bg-particle';
        
        const emoji = foodEmojis[Math.floor(Math.random() * foodEmojis.length)];
        const size = Math.random() * 30 + 20;
        const left = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 10;

        particle.innerText = emoji;
        particle.style.fontSize = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `-${delay}s`;
        
        bgContainer.appendChild(particle);

        particle.addEventListener('animationiteration', () => {
            particle.style.left = `${Math.random() * 100}%`;
        });
    }

    // 3D Tilt effect for cards
    const cards = document.querySelectorAll('.card-3d');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(50px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // Scroll Reveal Animation using Intersection Observer
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => observer.observe(el));

    // Parallax effect on mouse move for hero section
    const heroContent = document.querySelector('.hero-content');
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) / 50;
        const moveY = (e.clientY - window.innerHeight / 2) / 50;
        
        if (heroContent) {
            heroContent.style.transform = `translate(${moveX}px, ${moveY}px) rotateX(${-moveY}deg) rotateY(${moveX}deg)`;
        }
    });

    // Smooth scroll for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
