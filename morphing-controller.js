/**
 * ANCESTRAL WISDOM HEALING - MORPHING CONTROLLER
 * 800vh scroll journey with 4 state transitions
 * GSAP Integrations #4-7
 */

const MorphingController = (() => {
  // ============================================
  // CONFIGURATION
  // ============================================
  const CONFIG = {
    totalHeight: 8, // 800vh
    states: [
      { name: 'origin', start: 0, end: 2 },         // 0-200vh
      { name: 'transformation', start: 2, end: 4 }, // 200-400vh
      { name: 'integration', start: 4, end: 6 },    // 400-600vh
      { name: 'wholeness', start: 6, end: 8 }       // 600-800vh
    ],
    transitionDuration: 1.5,
    easing: 'power2.inOut'
  };

  // ============================================
  // STATE MANAGEMENT
  // ============================================
  let currentState = null;
  let progress = 0;
  let elements = {};

  /**
   * Initialize morphing experience
   */
  const init = () => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.error('[Morphing] GSAP not loaded');
      return;
    }

    // Cache DOM elements
    cacheElements();

    // Set up ScrollTrigger
    setupScrollTrigger();

    // Initialize first state
    setState('origin');

    console.log('[Morphing] Initialized 800vh journey with 4 states');
  };

  /**
   * Cache DOM elements for performance
   */
  const cacheElements = () => {
    elements.journey = document.querySelector('.morphing-journey');
    elements.viewport = document.querySelector('.morphing-viewport');
    elements.states = document.querySelectorAll('.morphing-state');
    elements.progressFill = document.querySelector('.progress-fill');
    elements.progressLabel = document.querySelector('.progress-label');

    if (!elements.journey || !elements.viewport) {
      console.error('[Morphing] Required elements not found');
    }
  };

  /**
   * Set up GSAP ScrollTrigger for morphing experience
   */
  const setupScrollTrigger = () => {
    // ============================================
    // GSAP INTEGRATION #4: State 1 (0-200vh)
    // Color layer transition - Origin state
    // ============================================
    ScrollTrigger.create({
      trigger: elements.journey,
      start: 'top top',
      end: '25% top',
      scrub: 1,
      onUpdate: (self) => {
        const stateProgress = self.progress;
        if (stateProgress > 0 && stateProgress < 0.25) {
          setState('origin');
          updateProgress(stateProgress * 4); // Map to 0-1 within this state
        }
      }
    });

    // ============================================
    // GSAP INTEGRATION #5: State 2 (200-400vh)
    // Geometry transformation - Transformation state
    // ============================================
    ScrollTrigger.create({
      trigger: elements.journey,
      start: '25% top',
      end: '50% top',
      scrub: 1,
      onUpdate: (self) => {
        const stateProgress = (self.progress - 0.25) * 4;
        if (stateProgress >= 0 && stateProgress <= 1) {
          setState('transformation');
          updateProgress(stateProgress);
          animateGeometryTransform(stateProgress);
        }
      }
    });

    // ============================================
    // GSAP INTEGRATION #6: State 3 (400-600vh)
    // Text reveal system - Integration state
    // ============================================
    ScrollTrigger.create({
      trigger: elements.journey,
      start: '50% top',
      end: '75% top',
      scrub: 1,
      onUpdate: (self) => {
        const stateProgress = (self.progress - 0.5) * 4;
        if (stateProgress >= 0 && stateProgress <= 1) {
          setState('integration');
          updateProgress(stateProgress);
          animateTextReveal(stateProgress);
        }
      }
    });

    // ============================================
    // GSAP INTEGRATION #7: State 4 (600-800vh)
    // Final convergence - Wholeness state
    // ============================================
    ScrollTrigger.create({
      trigger: elements.journey,
      start: '75% top',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        const stateProgress = (self.progress - 0.75) * 4;
        if (stateProgress >= 0 && stateProgress <= 1) {
          setState('wholeness');
          updateProgress(stateProgress);
          animateFinalConvergence(stateProgress);
        }
      }
    });

    // Overall progress tracking
    ScrollTrigger.create({
      trigger: elements.journey,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        progress = self.progress;
        updateProgressBar(progress);
      }
    });

    console.log('[Morphing] ScrollTrigger configured for 4 states');
  };

  /**
   * Set active state
   */
  const setState = (stateName) => {
    if (currentState === stateName) return;

    currentState = stateName;

    // Update DOM
    elements.states.forEach(state => {
      if (state.dataset.state === stateName) {
        state.dataset.state = stateName;
        state.setAttribute('data-state', 'active');
        
        // Trigger enter animation
        gsap.to(state, {
          opacity: 1,
          duration: CONFIG.transitionDuration,
          ease: CONFIG.easing
        });
      } else {
        state.removeAttribute('data-state');
        gsap.to(state, {
          opacity: 0,
          duration: CONFIG.transitionDuration,
          ease: CONFIG.easing
        });
      }
    });

    // Update label
    if (elements.progressLabel) {
      const labels = {
        origin: 'The Beginning',
        transformation: 'Beth\'s Journey',
        integration: 'Ancient Meets Modern',
        wholeness: 'Your Sacred Space'
      };
      elements.progressLabel.textContent = labels[stateName] || 'Scroll to continue';
    }

    console.log(`[Morphing] State changed to: ${stateName}`);
  };

  /**
   * Update progress within current state
   */
  const updateProgress = (stateProgress) => {
    // Clamp progress between 0 and 1
    stateProgress = Math.max(0, Math.min(1, stateProgress));

    // Apply progress-based transformations based on current state
    const activeState = document.querySelector('.morphing-state[data-state="active"]');
    if (!activeState) return;

    const visual = activeState.querySelector('.morphing-visual');
    const text = activeState.querySelector('.morphing-text');

    if (visual) {
      // Subtle scale and rotation based on progress
      gsap.to(visual, {
        scale: 1 + (stateProgress * 0.1),
        rotation: stateProgress * 5,
        duration: 0.1,
        ease: 'none'
      });
    }

    if (text) {
      // Fade text in as state progresses
      gsap.to(text, {
        opacity: Math.max(0.7, stateProgress),
        y: -(stateProgress * 10),
        duration: 0.1,
        ease: 'none'
      });
    }
  };

  /**
   * Animate geometry transformation (State 2)
   */
  const animateGeometryTransform = (progress) => {
    const state = document.querySelector('[data-state="transformation"]');
    if (!state) return;

    const shape = state.querySelector('.morph-shape');
    if (!shape) return;

    // Morph from circle to pentagon
    gsap.to(shape, {
      scale: 1 + (progress * 0.2),
      rotation: progress * 90,
      duration: 0.1,
      ease: 'none'
    });

    // Color transition
    const colorProgress = `hsl(${120 + progress * 60}, 60%, 70%)`;
    gsap.to(shape, {
      fill: colorProgress,
      duration: 0.1,
      ease: 'none'
    });
  };

  /**
   * Animate text reveal (State 3)
   */
  const animateTextReveal = (progress) => {
    const state = document.querySelector('[data-state="integration"]');
    if (!state) return;

    const title = state.querySelector('.morphing-title');
    const description = state.querySelector('.morphing-description');

    if (title) {
      gsap.to(title, {
        opacity: progress,
        y: 30 - (progress * 30),
        duration: 0.1,
        ease: 'none'
      });
    }

    if (description) {
      gsap.to(description, {
        opacity: Math.max(0, progress - 0.3),
        y: 20 - (progress * 20),
        duration: 0.1,
        ease: 'none'
      });
    }
  };

  /**
   * Animate final convergence (State 4)
   */
  const animateFinalConvergence = (progress) => {
    const state = document.querySelector('[data-state="wholeness"]');
    if (!state) return;

    const shapes = state.querySelectorAll('.morph-shape, .morph-shape-inner');
    
    shapes.forEach((shape, index) => {
      gsap.to(shape, {
        scale: 1 - (progress * 0.05 * (index + 1)),
        opacity: 1 - (progress * 0.2 * index),
        rotation: progress * 360 * (index % 2 ? 1 : -1),
        duration: 0.1,
        ease: 'none'
      });
    });

    // Pulse effect at the end
    if (progress > 0.9) {
      const pulseStrength = (progress - 0.9) * 10;
      gsap.to(state.querySelector('.morphing-visual'), {
        scale: 1 + (Math.sin(pulseStrength * Math.PI * 2) * 0.05),
        duration: 0.1,
        ease: 'none'
      });
    }
  };

  /**
   * Update progress bar
   */
  const updateProgressBar = (progress) => {
    if (!elements.progressFill) return;

    gsap.to(elements.progressFill, {
      scaleX: progress,
      duration: 0.1,
      ease: 'none'
    });
  };

  /**
   * Get current state info
   */
  const getCurrentState = () => ({
    name: currentState,
    progress: progress,
    scrollPercentage: progress * 100
  });

  /**
   * Debug function
   */
  const debug = () => {
    console.log('[Morphing] Current state:', getCurrentState());
    console.log('[Morphing] Elements:', elements);
  };

  // ============================================
  // PUBLIC API
  // ============================================
  return {
    init,
    setState,
    getCurrentState,
    debug
  };
})();

// Initialize when DOM and GSAP are ready
const initMorphing = () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('[Morphing] Waiting for GSAP...');
    setTimeout(initMorphing, 100);
    return;
  }

  MorphingController.init();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMorphing);
} else {
  initMorphing();
}

// Export for debugging
window.AWH_Morphing = MorphingController;
