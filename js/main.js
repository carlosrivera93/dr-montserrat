document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Animate hamburger to X (optional, requiring CSS class)
        });
    }

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // --- Navbar Scroll Effect (Glassmorphism on scroll) ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
        } else {
            navbar.style.boxShadow = "none";
        }
    });

    // --- Video Carousel Logic ---
    const videoTrack = document.getElementById('video-track');
    const bntPrev = document.getElementById('video-prev');
    const btnNext = document.getElementById('video-next');

    if (videoTrack && bntPrev && btnNext) {
        bntPrev.addEventListener('click', () => {
            videoTrack.scrollBy({ left: -232, behavior: 'smooth' });
        });

        btnNext.addEventListener('click', () => {
            videoTrack.scrollBy({ left: 232, behavior: 'smooth' });
        });
    }

    console.log("Dra. Montserrat Betanzos Landing Page Loaded");
});
