document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer para animaciones de revelado
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-inview');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-text-mask, .fade-in-up, .parallax-container').forEach(el => {
        observer.observe(el);
    });

    // 2. Parallax muy sutil en imágenes
    const parallaxImages = document.querySelectorAll('.img-parallax');
    window.addEventListener('scroll', () => {
        let scroll = window.pageYOffset;
        parallaxImages.forEach(img => {
            let speed = 0.05;
            img.style.transform = `scale(1.1) translateY(${scroll * speed}px)`;
        });
    });

    // Añadir clase is-inview al cargar la página para elementos del hero
    setTimeout(() => {
        document.querySelectorAll('.hero .reveal-text-mask, .hero .fade-in-up').forEach(el => {
            el.classList.add('is-inview');
        });
    }, 100);
});
