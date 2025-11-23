/**
 * ANCESTRAL WISDOM HEALING - GSAP ANIMATIONS
 * 14 ScrollTrigger integration points + entrance animations
 */

// Wait for GSAP to load
const initGSAPAnimations = () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('GSAP or ScrollTrigger not loaded');
    return;
  }

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // ============================================
  // GSAP INTEGRATION #1: HERO SECTION
  // Logo + headline animation
  // ============================================
  const animateHero = () => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Animate hero title lines
    tl.from('.hero-title-line', {
      opacity: 0,
      y: 80,
      rotateX: -90,
      duration: 1.2,
      stagger: 0.2
    })
    // Animate subtitle
    .from('.hero-subtitle', {
      opacity: 0,
      y: 30,
      duration: 0.8
    }, '-=0.6')
    // Animate CTA buttons
    .from('.hero-cta', {
      opacity: 0,
      y: 30,
      duration: 0.8
    }, '-=0.4')
    // Animate scroll indicator
    .from('.hero-scroll-indicator', {
      opacity: 0,
      y: 20,
      duration: 0.6
    }, '-=0.4');

    // Parallax effect on hero shapes
    gsap.to('.hero-shape-1', {
      y: -100,
      rotation: 45,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });

    gsap.to('.hero-shape-2', {
      y: -80,
      rotation: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });
  };

  // ============================================
  // GSAP INTEGRATION #2: NAVIGATION
  // Menu items stagger reveal (on first scroll)
  // ============================================
  const animateNav = () => {
    // Subtle entrance for nav items
    gsap.from('.nav-link', {
      opacity: 0,
      y: -10,
      duration: 0.5,
      stagger: 0.1,
      delay: 0.8
    });
  };

  // ============================================
  // GSAP INTEGRATION #3: SERVICES GRID
  // Card entrance choreography
  // ============================================
  const animateServices = () => {
    gsap.from('.service-card', {
      opacity: 0,
      y: 80,
      scale: 0.95,
      duration: 0.8,
      stagger: {
        amount: 0.6,
        from: 'start'
      },
      scrollTrigger: {
        trigger: '.services-grid',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    // Icon rotation on scroll
    gsap.utils.toArray('.service-icon').forEach(icon => {
      gsap.from(icon, {
        rotation: -180,
        scale: 0.8,
        duration: 1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: icon,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });
  };

  // ============================================
  // GSAP INTEGRATIONS #4-7: MORPHING EXPERIENCE
  // Handled by morphing-controller.js
  // State 1 (0-200vh), State 2 (200-400vh)
  // State 3 (400-600vh), State 4 (600-800vh)
  // ============================================

  // ============================================
  // GSAP INTEGRATION #8: PHILOSOPHY SECTION
  // Parallax image reveal
  // ============================================
  const animatePhilosophy = () => {
    // Animate principles
    gsap.from('.principle', {
      opacity: 0,
      x: -60,
      duration: 0.8,
      stagger: 0.3,
      scrollTrigger: {
        trigger: '.philosophy-principles',
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });

    // Animate mandala
    gsap.from('.mandala-container', {
      opacity: 0,
      scale: 0.8,
      rotation: -45,
      duration: 1.2,
      ease: 'back.out(1.5)',
      scrollTrigger: {
        trigger: '.mandala-container',
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });

    // Parallax on mandala
    gsap.to('.mandala', {
      y: -50,
      rotation: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.philosophy',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });
  };

  // ============================================
  // GSAP INTEGRATION #9: PHILOSOPHY TEXT CASCADE
  // ============================================
  const animatePhilosophyText = () => {
    // Split text animation for principle titles
    gsap.utils.toArray('.principle-title').forEach(title => {
      gsap.from(title, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        scrollTrigger: {
          trigger: title,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });

    // Description fade-in
    gsap.from('.principle-description', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.philosophy-principles',
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });
  };

  // ============================================
  // GSAP INTEGRATION #10: TESTIMONIALS
  // Horizontal scroll + fade
  // ============================================
  const animateTestimonials = () => {
    const testimonialCards = gsap.utils.toArray('.testimonial-card');
    
    // Entrance animation
    gsap.from(testimonialCards, {
      opacity: 0,
      x: 100,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.testimonials-slider',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    // Parallax scroll effect
    gsap.to('.testimonial-track', {
      x: -200,
      ease: 'none',
      scrollTrigger: {
        trigger: '.testimonials',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });
  };

  // ============================================
  // GSAP INTEGRATION #11: CREDENTIALS
  // Timeline animation
  // ============================================
  const animateCredentials = () => {
    gsap.from('.timeline-item', {
      opacity: 0,
      x: -60,
      duration: 0.8,
      stagger: 0.3,
      scrollTrigger: {
        trigger: '.credentials-timeline',
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });

    // Animate timeline markers
    gsap.from('.timeline-marker', {
      scale: 0,
      duration: 0.4,
      stagger: 0.3,
      ease: 'back.out(2)',
      scrollTrigger: {
        trigger: '.credentials-timeline',
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });

    // Draw timeline line
    gsap.from('.credentials-timeline::before', {
      height: 0,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.credentials-timeline',
        start: 'top 70%',
        toggleActions: 'play none none none'
      }
    });
  };

  // ============================================
  // GSAP INTEGRATION #12: CALL-TO-ACTION
  // Pulse + scale
  // ============================================
  const animateCTA = () => {
    gsap.from('.cta-content', {
      opacity: 0,
      scale: 0.95,
      y: 40,
      duration: 0.8,
      ease: 'back.out(1.3)',
      scrollTrigger: {
        trigger: '.cta',
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });

    // Pulse animation on CTA button
    gsap.to('.cta .btn-primary', {
      scale: 1.05,
      duration: 1,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
      repeatDelay: 2,
      scrollTrigger: {
        trigger: '.cta',
        start: 'top 70%',
        toggleActions: 'play pause resume pause'
      }
    });
  };

  // ============================================
  // GSAP INTEGRATION #13: CONTACT FORM
  // Field reveal stagger
  // ============================================
  const animateContact = () => {
    // Animate contact info
    gsap.from('.contact-info', {
      opacity: 0,
      x: -60,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.contact-wrapper',
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });

    // Animate contact form
    gsap.from('.contact-form', {
      opacity: 0,
      x: 60,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.contact-wrapper',
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });

    // Stagger form groups
    gsap.from('.form-group', {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.contact-form',
        start: 'top 70%',
        toggleActions: 'play none none none'
      }
    });
  };

  // ============================================
  // GSAP INTEGRATION #14: FOOTER
  // Element cascade
  // ============================================
  const animateFooter = () => {
    gsap.from('.footer-brand', {
      opacity: 0,
      y: 40,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.footer',
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });

    gsap.from('.footer-column', {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.15,
      scrollTrigger: {
        trigger: '.footer-links',
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  };

  // ============================================
  // ADDITIONAL SCROLL EFFECTS
  // ============================================
  const addScrollEffects = () => {
    // Section fade-in
    gsap.utils.toArray('section').forEach(section => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      });
    });

    // Section title reveals
    gsap.utils.toArray('.section-title').forEach(title => {
      gsap.from(title, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: title,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });
  };

  // ============================================
  // HOVER ANIMATIONS
  // ============================================
  const addHoverAnimations = () => {
    // Service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.02,
          y: -12,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    // Buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: 'back.out(1.7)'
        });
      });
      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });
  };

  // ============================================
  // INITIALIZE ALL ANIMATIONS
  // ============================================
  const init = () => {
    console.log('[GSAP] Initializing 14 ScrollTrigger integrations...');

    // Run all animation functions
    animateHero();              // #1
    animateNav();               // #2
    animateServices();          // #3
    // #4-7 handled by morphing-controller.js
    animatePhilosophy();        // #8
    animatePhilosophyText();    // #9
    animateTestimonials();      // #10
    animateCredentials();       // #11
    animateCTA();               // #12
    animateContact();           // #13
    animateFooter();            // #14
    
    // Additional effects
    addScrollEffects();
    addHoverAnimations();

    console.log('[GSAP] All animations initialized successfully');

    // Refresh ScrollTrigger after all animations are set up
    ScrollTrigger.refresh();
  };

  // Run initialization
  init();
};

// Initialize when DOM and GSAP are ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGSAPAnimations);
} else {
  initGSAPAnimations();
}

// Export for debugging
window.AWH_GSAP = {
  init: initGSAPAnimations,
  ScrollTrigger
};
