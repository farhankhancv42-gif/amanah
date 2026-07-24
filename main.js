document.addEventListener("DOMContentLoaded", function () {

    const filterButtons = document.querySelectorAll(".filter-btn");
    const portfolioCards = document.querySelectorAll(".portfolio-card");

    // Default AI Solutions
    const defaultFilter = "AI-Solutions";

    filterButtons.forEach(btn => {
        btn.classList.remove("active");

        if (btn.dataset.filter === defaultFilter) {
            btn.classList.add("active");
        }
    });

    portfolioCards.forEach(card => {
        if (card.dataset.category === defaultFilter) {
            card.classList.remove("hidden");
        } else {
            card.classList.add("hidden");
        }
    });

    filterButtons.forEach(button => {

        button.addEventListener("click", function () {

            const filter = this.dataset.filter;

            filterButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            portfolioCards.forEach(card => {

                if (card.dataset.category === filter) {
                    card.classList.remove("hidden");
                } else {
                    card.classList.add("hidden");
                }

            });

        });

    });

});


  // --- 1. Canvas Animation (Constellation Effect) ---
    const canvas = document.getElementById('hero-canvas');
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];

        // Configuration
        const particleCount = 60; // Keep it minimal for luxury feel
        const connectionDistance = 150;
        const particleSpeed = 0.3;
        
        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        
        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * particleSpeed;
                this.vy = (Math.random() - 0.5) * particleSpeed;
                this.size = Math.random() * 2 + 1;
                this.opacity = Math.random() * 0.5 + 0.2;
            }
            
            update() {
                this.x += this.vx;
                this.y += this.vy;
                
                // Bounce off edges
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }
            
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`; // Gold color
                ctx.fill();
            }
        }
        
        function initParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }
        
        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                
                // Draw connections
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(212, 175, 55, ${0.15 * (1 - distance / connectionDistance)})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animate);
        }
        
        window.addEventListener('resize', () => {
            resize();
            initParticles();
        });
        
        resize();
        initParticles();
        animate();

        // --- 2. Scroll Reveal Animation ---
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => {
            observer.observe(el);
        });

        // --- 3. Navbar Scroll Effect ---
        const header = document.getElementById('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // --- 4. Mobile Menu Toggle ---
        const mobileToggle = document.getElementById('mobile-toggle');
        const navLinks = document.getElementById('nav-links');

        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        // --- 5. Simple Toast Interaction ---
        function showToast() {
            const toast = document.getElementById('toast');
            toast.style.transform = 'translateY(0)';
            setTimeout(() => {
                toast.style.transform = 'translateY(150%)';
            }, 3000);
        }
