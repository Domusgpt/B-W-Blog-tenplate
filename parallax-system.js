/**
 * ANCESTRAL WISDOM HEALING - PARALLAX SYSTEM
 * Multi-layer parallax effects for depth and immersion
 */

const ParallaxSystem = (() => {
  // ============================================
  // CONFIGURATION
  // ============================================
  const CONFIG = {
    layers: {
      background: 0.3,   // Slowest
      midground: 0.6,
      foreground: 1.0    // Normal speed
    },
    smoothing: 0.1,
    enabled: true,
    debugMode: false
  };

  // ============================================
  // STATE
  // ============================================
  let parallaxElements = [];
  let rafId = null;
  let currentScroll = 0;
  let targetScroll = 0;
  let windowHeight = 0;
  let isInitialized = false;

  /**
   * Initialize parallax system
   */
  const init = () => {
    if (!CONFIG.enabled) {
      console.log('[Parallax] Disabled');
      return;
    }

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      console.log('[Parallax] Disabled due to reduced motion preference');
      return;
    }

    // Set up parallax elements
    setupElements();

    // Bind events
    bindEvents();

    // Start animation loop
    startLoop();

    isInitialized = true;
    console.log('[Parallax] Initialized with', parallaxElements.length, 'elements');
  };

  /**
   * Set up parallax elements
   */
  const setupElements = () => {
    // Auto-detect parallax elements
    const autoElements = document.querySelectorAll('[data-parallax]');
    autoElements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || CONFIG.layers.background;
      parallaxElements.push({
        element: el,
        speed: speed,
        initialY: el.getBoundingClientRect().top + window.pageYOffset
      });
    });

    // Manual configuration for specific sections
    addParallaxToSection('.philosophy-visual', CONFIG.layers.background);
    addParallaxToSection('.mandala', CONFIG.layers.midground);
    addParallaxToSection('.testimonial-card', CONFIG.layers.foreground);
    addParallaxToSection('.hero-shape', CONFIG.layers.background);
    addParallaxToSection('.service-icon', CONFIG.layers.midground);

    // Sort by speed for optimized rendering
    parallaxElements.sort((a, b) => a.speed - b.speed);
  };

  /**
   * Add parallax to a section
   */
  const addParallaxToSection = (selector, speed) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      // Skip if already added
      if (parallaxElements.some(item => item.element === el)) return;

      parallaxElements.push({
        element: el,
        speed: speed,
        initialY: el.getBoundingClientRect().top + window.pageYOffset
      });
    });
  };

  /**
   * Bind window events
   */
  const bindEvents = () => {
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    // Initial update
    onResize();
    onScroll();
  };

  /**
   * Handle scroll event
   */
  const onScroll = () => {
    targetScroll = window.pageYOffset;
  };

  /**
   * Handle resize event
   */
  const onResize = () => {
    windowHeight = window.innerHeight;
    
    // Update initial positions
    parallaxElements.forEach(item => {
      item.initialY = item.element.getBoundingClientRect().top + window.pageYOffset;
    });
  };

  /**
   * Start animation loop
   */
  const startLoop = () => {
    const update = () => {
      // Smooth scroll with lerp
      currentScroll += (targetScroll - currentScroll) * CONFIG.smoothing;

      // Update each parallax element
      parallaxElements.forEach(item => {
        updateElement(item);
      });

      // Continue loop
      rafId = requestAnimationFrame(update);
    };

    update();
  };

  /**
   * Update individual parallax element
   */
  const updateElement = (item) => {
    const { element, speed, initialY } = item;

    // Check if element is in viewport
    const rect = element.getBoundingClientRect();
    const isInViewport = rect.top < windowHeight && rect.bottom > 0;

    if (!isInViewport) return; // Skip elements out of view

    // Calculate parallax offset
    const scrollOffset = currentScroll - initialY;
    const parallaxOffset = scrollOffset * (1 - speed);

    // Apply transform
    element.style.transform = `translate3d(0, ${parallaxOffset}px, 0)`;

    // Debug mode
    if (CONFIG.debugMode) {
      element.style.outline = `2px solid hsl(${speed * 360}, 70%, 50%)`;
    }
  };

  /**
   * Stop parallax system
   */
  const stop = () => {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    console.log('[Parallax] Stopped');
  };

  /**
   * Enable parallax
   */
  const enable = () => {
    CONFIG.enabled = true;
    if (!isInitialized) init();
    else startLoop();
    console.log('[Parallax] Enabled');
  };

  /**
   * Disable parallax
   */
  const disable = () => {
    CONFIG.enabled = false;
    stop();
    
    // Reset all transforms
    parallaxElements.forEach(item => {
      item.element.style.transform = '';
    });
    
    console.log('[Parallax] Disabled');
  };

  /**
   * Add new parallax element dynamically
   */
  const addElement = (element, speed = CONFIG.layers.background) => {
    if (!element) return;

    parallaxElements.push({
      element: element,
      speed: speed,
      initialY: element.getBoundingClientRect().top + window.pageYOffset
    });

    console.log('[Parallax] Added element with speed', speed);
  };

  /**
   * Remove parallax from element
   */
  const removeElement = (element) => {
    const index = parallaxElements.findIndex(item => item.element === element);
    if (index !== -1) {
      parallaxElements.splice(index, 1);
      element.style.transform = '';
      console.log('[Parallax] Removed element');
    }
  };

  /**
   * Update configuration
   */
  const updateConfig = (newConfig) => {
    Object.assign(CONFIG, newConfig);
    console.log('[Parallax] Configuration updated:', CONFIG);
  };

  /**
   * Get debug info
   */
  const getDebugInfo = () => ({
    enabled: CONFIG.enabled,
    elementCount: parallaxElements.length,
    currentScroll: currentScroll,
    targetScroll: targetScroll,
    isInitialized: isInitialized,
    config: CONFIG
  });

  /**
   * Toggle debug mode
   */
  const toggleDebug = () => {
    CONFIG.debugMode = !CONFIG.debugMode;
    console.log('[Parallax] Debug mode:', CONFIG.debugMode ? 'ON' : 'OFF');
    
    if (!CONFIG.debugMode) {
      parallaxElements.forEach(item => {
        item.element.style.outline = '';
      });
    }
  };

  // ============================================
  // PUBLIC API
  // ============================================
  return {
    init,
    stop,
    enable,
    disable,
    addElement,
    removeElement,
    updateConfig,
    getDebugInfo,
    toggleDebug,
    CONFIG
  };
})();

// Initialize parallax system
const initParallax = () => {
  // Wait a bit for page to settle
  setTimeout(() => {
    ParallaxSystem.init();
  }, 500);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initParallax);
} else {
  initParallax();
}

// Export for debugging and external control
window.AWH_Parallax = ParallaxSystem;
