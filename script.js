document.addEventListener('DOMContentLoaded', () => {
    // Current Year for Footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Setup scroll animations using Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll('.fade-up, .reveal-left, .reveal-right, .reveal-up');
    animateElements.forEach(el => observer.observe(el));

    // Initially trigger fade up elements in Hero section
    setTimeout(() => {
        document.querySelectorAll('.hero .fade-up').forEach(el => {
            el.classList.add('active');
        });
    }, 100);

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Custom Cursor tracking (desktop only)
    if (window.matchMedia("(pointer: fine)").matches) {
        const cursor = document.querySelector('.cursor-glow');

        document.addEventListener('mousemove', (e) => {
            // Update custom cursor
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';

            // Update CSS variables for cards hover effect
            document.querySelectorAll('.glass-card').forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });

        // Add interactive scaling when hover over links or buttons
        document.addEventListener('mouseover', (e) => {
            if (e.target.tagName.toLowerCase() === 'a' ||
                e.target.tagName.toLowerCase() === 'button' ||
                e.target.closest('.glass-card')) {
                cursor.style.width = '200px';
                cursor.style.height = '200px';
                cursor.style.background = 'radial-gradient(circle, rgba(0,102,255,0.2) 0%, rgba(0,0,0,0) 70%)';
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.tagName.toLowerCase() === 'a' ||
                e.target.tagName.toLowerCase() === 'button' ||
                e.target.closest('.glass-card')) {
                cursor.style.width = '400px';
                cursor.style.height = '400px';
                cursor.style.background = 'radial-gradient(circle, rgba(0,240,255,0.1) 0%, rgba(0,0,0,0) 70%)';
            }
        });
    } else {
        // Disable cursor on touch devices to completely remove it
        const cursor = document.querySelector('.cursor-glow');
        if (cursor) cursor.style.display = 'none';
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});
