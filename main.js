document.addEventListener("DOMContentLoaded", function () {
    // 1. Portfolio Filter Logic
    const filterButtons = document.querySelectorAll(".filter-btn");
    const portfolioCards = document.querySelectorAll(".portfolio-card");
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

    // 2. Swiper Testimonials Initialization
    if (typeof Swiper !== "undefined") {
        new Swiper(".testimonial-swiper", {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            pagination: {
                el: ".testimonial-pagination",
                clickable: true,
            },
            navigation: {
                prevEl: ".testimonial-prev",
                nextEl: ".testimonial-next",
            },
            grabCursor: true,
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 24,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
        });
    }

    // 3. Scroll Reveal (if elements exist)
    const revealElements = document.querySelectorAll(".reveal");
    if (revealElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => observer.observe(el));
    }
});

// Toast notification function
function showToast() {
    const toast = document.getElementById("toast");
    if (toast) {
        toast.style.transform = "translateY(0)";
        setTimeout(() => {
            toast.style.transform = "translateY(150%)";
        }, 3000);
    }
}