class App {
  constructor() {
    this.cursorDot = document.querySelector('.cursor-dot');
    this.cursorOutline = document.querySelector('.cursor-outline');
    this.magneticBtns = document.querySelectorAll('.btn-magnetic');
    this.interactiveElements = document.querySelectorAll('a, button, .project-card');
    this.parallaxImages = document.querySelectorAll('.parallax-img');
    
    this.init();
  }

  init() {
    this.removePreloader();
    if(window.matchMedia("(pointer: fine)").matches) {
      this.initCursor();
      this.initMagneticButtons();
    }
    this.initIntersectionObserver();
    this.initParallax();
  }

  removePreloader() {
    const preloader = document.querySelector('.preloader');
    if(preloader) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          preloader.classList.add('hidden');
          // Trigger first animations in hero
          const heroElements = document.querySelectorAll('.hero .reveal-up, .hero .reveal-text, .hero .reveal-line');
          heroElements.forEach(el => el.classList.add('is-inview'));
        }, 1000);
      });
    }
  }

  initCursor() {
    if(!this.cursorDot || !this.cursorOutline) return;
    
    window.addEventListener('mousemove', (e) => {
      const posX = e.clientX;
      const posY = e.clientY;
      
      this.cursorDot.style.left = `${posX}px`;
      this.cursorDot.style.top = `${posY}px`;
      
      // Add slight delay for outline (spring effect)
      this.cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
      }, { duration: 500, fill: "forwards" });
    });

    this.interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.cursorOutline.classList.add('hovered');
      });
      el.addEventListener('mouseleave', () => {
        this.cursorOutline.classList.remove('hovered');
      });
    });
  }

  initMagneticButtons() {
    this.magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const h = rect.width / 2;
        
        const x = e.clientX - rect.left - h;
        const y = e.clientY - rect.top - (rect.height / 2);
        
        // Intensity of the pull
        const pull = 0.3;
        
        btn.style.transform = `translate(${x * pull}px, ${y * pull}px)`;
      });
      
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = `translate(0px, 0px)`;
      });
    });
  }

  initIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-inview');
          observer.unobserve(entry.target); // Run once
        }
      });
    }, options);

    const revealElements = document.querySelectorAll('.reveal-up, .reveal-text, .reveal-line');
    revealElements.forEach(el => {
      // Don't observe hero elements, they are triggered by preloader
      if(!el.closest('.hero')) {
        observer.observe(el);
      }
    });
  }

  initParallax() {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      
      this.parallaxImages.forEach(img => {
        const speed = img.dataset.speed || 0.15;
        const yPos = -(scrolled * speed);
        img.style.transform = `translate3d(0, ${yPos}px, 0) scale(1.1)`;
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});
