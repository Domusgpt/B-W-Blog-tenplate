/**
 * ANCESTRAL WISDOM HEALING - MAIN JAVASCRIPT
 * Core functionality, utilities, and initialization
 */

// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
  debug: false,
  smoothScrollDuration: 1000,
  navScrollThreshold: 100,
  lazyLoadMargin: '50px'
};

// ============================================
// UTILITY FUNCTIONS
// ============================================
const Utils = {
  /**
   * Debounce function to limit execution rate
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * Throttle function to limit execution rate
   */
  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  /**
   * Check if element is in viewport
   */
  isInViewport(element, offset = 0) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= -offset &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  /**
   * Smooth scroll to element
   */
  smoothScroll(target, duration = CONFIG.smoothScrollDuration) {
    const targetElement = typeof target === 'string' ? document.querySelector(target) : target;
    if (!targetElement) return;

    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition - 80; // Account for fixed nav
    const startTime = performance.now();

    function animation(currentTime) {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Easing function
      const ease = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startPosition + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  },

  /**
   * Log debug messages
   */
  log(...args) {
    if (CONFIG.debug) {
      console.log('[AWH]', ...args);
    }
  },

  /**
   * Get scroll position
   */
  getScrollPosition() {
    return window.pageYOffset || document.documentElement.scrollTop;
  },

  /**
   * Clamp value between min and max
   */
  clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  },

  /**
   * Linear interpolation
   */
  lerp(start, end, factor) {
    return start + (end - start) * factor;
  }
};

// ============================================
// NAVIGATION
// ============================================
const Navigation = {
  nav: null,
  toggle: null,
  menu: null,
  links: [],
  isOpen: false,
  lastScroll: 0,

  init() {
    this.nav = document.querySelector('.nav');
    this.toggle = document.querySelector('.nav-toggle');
    this.menu = document.querySelector('.nav-menu');
    this.links = [...document.querySelectorAll('.nav-link')];

    if (!this.nav || !this.toggle || !this.menu) {
      Utils.log('Navigation elements not found');
      return;
    }

    this.bindEvents();
    this.handleScroll();
    Utils.log('Navigation initialized');
  },

  bindEvents() {
    // Mobile menu toggle
    this.toggle.addEventListener('click', () => this.toggleMenu());

    // Close menu on link click
    this.links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        this.closeMenu();
        setTimeout(() => Utils.smoothScroll(target), 300);
      });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (this.isOpen && !this.nav.contains(e.target)) {
        this.closeMenu();
      }
    });

    // Handle scroll
    window.addEventListener('scroll', Utils.throttle(() => this.handleScroll(), 100));
  },

  toggleMenu() {
    this.isOpen = !this.isOpen;
    this.menu.classList.toggle('active');
    this.toggle.classList.toggle('active');
    document.body.style.overflow = this.isOpen ? 'hidden' : '';
    Utils.log('Menu toggled:', this.isOpen);
  },

  closeMenu() {
    this.isOpen = false;
    this.menu.classList.remove('active');
    this.toggle.classList.remove('active');
    document.body.style.overflow = '';
  },

  handleScroll() {
    const currentScroll = Utils.getScrollPosition();

    // Add shadow on scroll
    if (currentScroll > CONFIG.navScrollThreshold) {
      this.nav.style.boxShadow = '0 2px 20px rgba(74, 55, 40, 0.15)';
    } else {
      this.nav.style.boxShadow = '0 2px 20px rgba(74, 55, 40, 0.1)';
    }

    // Highlight active section
    this.updateActiveLink();

    this.lastScroll = currentScroll;
  },

  updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = Utils.getScrollPosition() + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        this.links.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
};

// ============================================
// FORMS
// ============================================
const Forms = {
  init() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) {
      Utils.log('Contact form not found');
      return;
    }

    contactForm.addEventListener('submit', (e) => this.handleSubmit(e, contactForm));
    Utils.log('Forms initialized');
  },

  handleSubmit(e, form) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    Utils.log('Form submitted:', data);

    // Show success message
    this.showMessage(form, 'success', 'Thank you for your message! We\'ll be in touch soon.');

    // Reset form
    form.reset();

    // In production, you would send this to a backend:
    // fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // })
    // .then(response => response.json())
    // .then(result => this.showMessage(form, 'success', result.message))
    // .catch(error => this.showMessage(form, 'error', 'Something went wrong. Please try again.'));
  },

  showMessage(form, type, message) {
    // Remove existing message
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
      margin-top: var(--space-md);
      padding: var(--space-md);
      border-radius: 0.5rem;
      text-align: center;
      font-weight: 500;
      background: ${type === 'success' ? 'var(--sage-light)' : 'var(--terra-light)'};
      color: var(--earth-deep);
    `;

    form.appendChild(messageDiv);

    // Remove message after 5 seconds
    setTimeout(() => {
      messageDiv.style.opacity = '0';
      setTimeout(() => messageDiv.remove(), 300);
    }, 5000);
  }
};

// ============================================
// LAZY LOADING
// ============================================
const LazyLoad = {
  observer: null,

  init() {
    if (!('IntersectionObserver' in window)) {
      Utils.log('IntersectionObserver not supported');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        rootMargin: CONFIG.lazyLoadMargin,
        threshold: 0.01
      }
    );

    // Observe all images with data-src
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => this.observer.observe(img));

    Utils.log('Lazy loading initialized');
  },

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        this.observer.unobserve(img);
        Utils.log('Image loaded:', img.src);
      }
    });
  }
};

// ============================================
// PERFORMANCE MONITORING
// ============================================
const Performance = {
  init() {
    if (!('performance' in window)) return;

    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const connectTime = perfData.responseEnd - perfData.requestStart;
        const renderTime = perfData.domComplete - perfData.domLoading;

        Utils.log('Performance metrics:', {
          pageLoadTime: `${pageLoadTime}ms`,
          connectTime: `${connectTime}ms`,
          renderTime: `${renderTime}ms`
        });
      }, 0);
    });
  }
};

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  Utils.log('Initializing Ancestral Wisdom Healing...');

  // Initialize modules
  Navigation.init();
  Forms.init();
  LazyLoad.init();
  Performance.init();

  // Set up logo animation
  const logo = document.querySelector('.logo-circle');
  if (logo) {
    logo.addEventListener('mouseenter', () => {
      logo.style.fill = 'var(--gold-dark)';
    });
    logo.addEventListener('mouseleave', () => {
      logo.style.fill = 'var(--color-accent)';
    });
  }

  Utils.log('Initialization complete');
});

// ============================================
// EXPORT FOR OTHER MODULES
// ============================================
window.AWH = {
  Utils,
  Navigation,
  Forms,
  LazyLoad,
  Performance,
  CONFIG
};
