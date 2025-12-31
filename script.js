/* 
   ORBITAL NEXUS - CORE BEHAVIOR
   Handles scroll animations, parallax effects, and UI interactions.
*/

document.addEventListener('DOMContentLoaded', () => {

    // 1. SCROLL REVEAL ANIMATIONS
    // Uses IntersectionObserver to trigger animations when elements enter viewport
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: "0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // 2. PARALLAX EFFECT
    // Subtle background movement on scroll
    const parallaxBgs = document.querySelectorAll('.parallax-bg');

    window.addEventListener('scroll', () => {
        let scrollY = window.scrollY;

        parallaxBgs.forEach(bg => {
            // Move background slower than foreground using translation
            // Only apply if visible to save performance
            let speed = 0.3;
            // Depending on section offset, we might want different logic,
            // but a simple global translation works for sticky/fixed feels
            // Since .parallax-bg is absolute in relative container, we need to adjust logic:
            // Actually, simplest is to translate Y based on parent position relative to viewport

            let rect = bg.parentElement.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                bg.style.transform = `translateY(${scrollY * speed}px)`;
            }
        });
    });

    // 3. SMOOTH SCROLL FOR NAV
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 4. CODE SYNTAX HIGHLIGHTING (Simple manual logic if needed, or just cosmetic from CSS)
    // The CSS mainly handles the look.
});
