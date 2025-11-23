# Ancestral Wisdom Healing - Visual Codex
## Reusable Design System for Wellness & Healing Brands

**Created**: 2025-11-21  
**Purpose**: Establish reusable visual language for wellness, healing, and spiritual practice websites  
**Philosophy**: Sacred Transformation - where ancient wisdom meets modern digital experiences

---

## Design Philosophy

### Core Principles
1. **Organic Flow**: Nothing rigid or forced; all elements breathe
2. **Sacred Geometry**: Subtle use of golden ratio and natural proportions
3. **Meditative Pace**: Animations that encourage presence, not rush
4. **Warm Minimalism**: Clean but never cold; spacious but inviting
5. **Cultural Respect**: Honor ancient traditions through thoughtful symbolism

---

## Typography System

### Hierarchy
```css
/* Display (Hero Headlines) */
font-family: 'Playfair Display', serif;
font-size: 3.5rem - 6rem;
font-weight: 400-600;
line-height: 1.1;
letter-spacing: -0.02em;

/* Heading 1 */
font-family: 'Playfair Display', serif;
font-size: 2.5rem - 3.5rem;
font-weight: 500;
line-height: 1.2;

/* Heading 2 */
font-family: 'Montserrat', sans-serif;
font-size: 2rem - 2.5rem;
font-weight: 600;
line-height: 1.3;
letter-spacing: 0.01em;

/* Heading 3 */
font-family: 'Montserrat', sans-serif;
font-size: 1.5rem - 2rem;
font-weight: 500;
line-height: 1.4;

/* Body Text */
font-family: 'Montserrat', sans-serif;
font-size: 1rem - 1.125rem;
font-weight: 400;
line-height: 1.7;
letter-spacing: 0.005em;

/* Small Text / Captions */
font-family: 'Montserrat', sans-serif;
font-size: 0.875rem;
font-weight: 400;
line-height: 1.6;
```

### Font Pairing Rules
- **Serif + Sans-serif**: Create contrast and hierarchy
- **Weight Variation**: Use 300, 400, 500, 600 weights strategically
- **Spacing**: More generous in headers, tighter in body
- **Alignment**: Centered for emotional content, left-aligned for information

---

## Color System

### Primary Palette
```css
/* Earth Foundation */
--earth-deep: #4A3728;         /* Deep earth brown */
--earth-medium: #6B5B4C;       /* Medium earth */
--earth-light: #8C7A6B;        /* Light earth */

/* Sacred Greens */
--sage-dark: #7A8B7E;          /* Deep sage */
--sage-medium: #A8B5A0;        /* Medium sage */
--sage-light: #C8D4C0;         /* Light sage */

/* Warm Terracotta */
--terra-dark: #B8897A;         /* Deep terracotta */
--terra-medium: #D4A59A;       /* Soft terracotta */
--terra-light: #E8C9C0;        /* Light terracotta */

/* Golden Accents */
--gold-dark: #B8924A;          /* Deep gold */
--gold-medium: #D4A574;        /* Golden amber */
--gold-light: #E8C89A;         /* Light gold */

/* Spiritual Purple */
--purple-dark: #5B4B75;        /* Deep purple */
--purple-medium: #6B5B95;      /* Medium purple */
--purple-light: #8B7BB5;       /* Light purple */

/* Neutral Base */
--cream-dark: #E8E1D4;         /* Warm gray */
--cream-medium: #F5F1E8;       /* Warm cream */
--cream-light: #FDFBF7;        /* Soft white */
```

### Color Usage Guidelines
- **Backgrounds**: Cream tones (light to medium)
- **Text**: Earth tones (deep) on cream backgrounds
- **Accents**: Gold for CTAs, Purple for spiritual elements
- **Hover States**: Shift 10% darker/lighter
- **Gradients**: Use adjacent colors only (e.g., sage-medium to sage-light)

### Semantic Colors
```css
--color-primary: var(--earth-deep);
--color-secondary: var(--sage-medium);
--color-accent: var(--gold-medium);
--color-spiritual: var(--purple-medium);
--color-success: var(--sage-dark);
--color-warning: var(--terra-medium);
--color-text-primary: var(--earth-deep);
--color-text-secondary: var(--earth-medium);
--color-background: var(--cream-light);
--color-surface: var(--cream-medium);
```

---

## Spacing System

### Scale (8px base)
```css
--space-xs: 0.5rem;    /* 8px */
--space-sm: 1rem;      /* 16px */
--space-md: 1.5rem;    /* 24px */
--space-lg: 2rem;      /* 32px */
--space-xl: 3rem;      /* 48px */
--space-2xl: 4rem;     /* 64px */
--space-3xl: 6rem;     /* 96px */
--space-4xl: 8rem;     /* 128px */
```

### Rhythm Guidelines
- **Sections**: Minimum 4xl vertical padding
- **Cards**: 2xl padding
- **Forms**: lg between fields, xl between groups
- **Grid Gaps**: md for tight groups, lg for distinct cards

---

## Component Patterns

### Button Styles
```css
.btn-primary {
  background: var(--gold-medium);
  color: var(--earth-deep);
  padding: var(--space-md) var(--space-xl);
  border-radius: 2rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(212, 165, 116, 0.3);
}

.btn-primary:hover {
  background: var(--gold-dark);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(212, 165, 116, 0.4);
}

.btn-secondary {
  background: transparent;
  color: var(--earth-deep);
  border: 2px solid var(--earth-medium);
  padding: var(--space-md) var(--space-xl);
  border-radius: 2rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: var(--earth-deep);
  color: var(--cream-light);
  border-color: var(--earth-deep);
}
```

### Card Styles
```css
.card {
  background: var(--cream-medium);
  border-radius: 1rem;
  padding: var(--space-2xl);
  box-shadow: 0 4px 20px rgba(74, 55, 40, 0.08);
  transition: all 0.4s ease;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(74, 55, 40, 0.15);
}

.card-elevated {
  background: var(--cream-light);
  box-shadow: 0 8px 30px rgba(74, 55, 40, 0.12);
}
```

---

## Animation Vocabulary

### Timing Functions
```css
--ease-in-out-smooth: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-meditation: cubic-bezier(0.25, 0.1, 0.25, 1);
```

### Duration Guidelines
- **Micro**: 150ms (hover states, small movements)
- **Short**: 300ms (button clicks, fades)
- **Medium**: 600ms (cards, sections)
- **Long**: 1000ms (hero entrances, major transitions)
- **Morphing**: 2000ms+ (state transformations)

### Standard Animations
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes floatGentle {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
```

---

## GSAP Animation Patterns

### Entry Animations
```javascript
// Fade + Scale In
gsap.from(element, {
  opacity: 0,
  scale: 0.95,
  duration: 0.8,
  ease: "power2.out"
});

// Cascade Reveal
gsap.from(elements, {
  opacity: 0,
  y: 50,
  stagger: 0.1,
  duration: 0.6,
  ease: "power3.out"
});

// Split Text Reveal
gsap.from(splitText.chars, {
  opacity: 0,
  x: -20,
  stagger: 0.02,
  duration: 0.4,
  ease: "power2.out"
});
```

### Scroll-Triggered Parallax
```javascript
gsap.to(element, {
  y: () => window.innerHeight * 0.3,
  ease: "none",
  scrollTrigger: {
    trigger: section,
    start: "top bottom",
    end: "bottom top",
    scrub: 1
  }
});
```

### Morphing Transitions
```javascript
gsap.to(element, {
  morphSVG: targetShape,
  duration: 2,
  ease: "power1.inOut"
});
```

---

## Responsive Breakpoints

```css
/* Mobile First Approach */
--breakpoint-sm: 640px;   /* Mobile landscape */
--breakpoint-md: 768px;   /* Tablet portrait */
--breakpoint-lg: 1024px;  /* Tablet landscape */
--breakpoint-xl: 1280px;  /* Desktop */
--breakpoint-2xl: 1536px; /* Large desktop */
```

### Typography Scaling
```css
/* Fluid typography using clamp() */
h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
}

h2 {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
}

body {
  font-size: clamp(1rem, 1.5vw, 1.125rem);
}
```

---

## Accessibility Standards

### Contrast Ratios
- **Large Text**: Minimum 3:1 (18pt+ or 14pt+ bold)
- **Normal Text**: Minimum 4.5:1
- **UI Components**: Minimum 3:1

### Focus States
```css
*:focus-visible {
  outline: 3px solid var(--gold-medium);
  outline-offset: 2px;
  border-radius: 0.25rem;
}
```

### Motion Preferences
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Sacred Geometry Elements

### Golden Ratio (φ = 1.618)
- Use for proportional relationships
- Section heights: 1:1.618
- Card dimensions: 1:1.618
- Grid layouts: Apply to columns

### Mandala Patterns
- Circular navigation elements
- Radial service displays
- Background ornamentations

### Organic Shapes
- Blob shapes with smooth bezier curves
- Flowing section dividers
- Natural background textures

---

## Implementation Notes

### CSS Custom Properties Structure
```css
:root {
  /* Colors */
  --color-*: ...;
  
  /* Spacing */
  --space-*: ...;
  
  /* Typography */
  --font-*: ...;
  --text-*: ...;
  
  /* Animations */
  --duration-*: ...;
  --ease-*: ...;
  
  /* Breakpoints */
  --breakpoint-*: ...;
}
```

### JavaScript Module Pattern
```javascript
// Organized by functionality
const Animation = { /* GSAP controllers */ };
const Parallax = { /* Parallax system */ };
const Morphing = { /* 800vh experience */ };
const Utils = { /* Helper functions */ };
```

---

## Future Enhancements

### Phase 2 Features
- [ ] WebGL shader backgrounds (VIB34D integration potential)
- [ ] Audio-reactive visualizations for sound healing section
- [ ] 3D model integration for energy work demonstrations
- [ ] AR visualization for space preparation

### Scalability
- Component library extraction
- Theme variation system (light/dark/seasonal)
- Multi-language support structure
- CMS integration patterns

---

## Usage in Future Projects

This codex provides:
1. **Color palette** for wellness brands
2. **Typography system** that balances elegance and readability
3. **Animation vocabulary** for meditative, intentional motion
4. **Component patterns** for common UI elements
5. **GSAP patterns** for advanced scroll experiences

Adapt as needed but maintain core principles:
- **Organic over mechanical**
- **Breath over rush**
- **Warmth over coldness**
- **Meaning over decoration**

---

**Last Updated**: 2025-11-21  
**Version**: 1.0.0  
**Maintainer**: Clear Seas Solutions LLC
