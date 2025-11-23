# Ancestral Wisdom Healing - Enhanced Website

A professionally crafted website featuring advanced GSAP animations, 800vh morphing experiences, and immersive parallax effects for Ancestral Wisdom Healing LLC.

## 🌟 Features

### Core Capabilities
- **800vh Morphing Journey**: Continuous scroll transformation through Beth's healing story
- **14 GSAP ScrollTrigger Integrations**: Choreographed animations throughout
- **Multi-Layer Parallax System**: Depth and immersion across all sections
- **Mobile-First Responsive Design**: Optimized for all devices
- **Accessibility Compliant**: WCAG 2.1 AA standards
- **Performance Optimized**: 60fps animations, lazy loading, optimized assets

### Technical Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Animation**: GSAP 3.12 with ScrollTrigger
- **Design System**: Custom properties, modular architecture
- **Deployment**: GitHub Pages ready

## 🎨 Design Philosophy

The website embodies the "Sacred Transformation" aesthetic:
- Organic, flowing forms
- Earth-toned palette with vibrant accents
- Minimal yet warm typography
- Smooth, meditative transitions
- Breathing space and rhythm

### Color Palette
- **Earth**: `#4A3728` (deep) to `#8C7A6B` (light)
- **Sage**: `#7A8B7E` (deep) to `#C8D4C0` (light)
- **Terracotta**: `#B8897A` (deep) to `#E8C9C0` (light)
- **Gold**: `#B8924A` (deep) to `#E8C89A` (light)
- **Purple**: `#5B4B75` (deep) to `#8B7BB5` (light)
- **Neutral**: `#E8E1D4` (dark) to `#FDFBF7` (light)

## 📁 Project Structure

```
ancestral-wisdom-enhanced/
├── index.html                 # Main HTML structure
├── assets/
│   ├── css/
│   │   ├── main.css          # Core styles and design system
│   │   ├── morphing-experience.css  # 800vh journey styles
│   │   └── responsive.css     # Responsive breakpoints
│   ├── js/
│   │   ├── main.js           # Core functionality
│   │   ├── gsap-animations.js    # 14 ScrollTrigger integrations
│   │   ├── morphing-controller.js  # 800vh state management
│   │   └── parallax-system.js    # Multi-layer parallax
│   ├── images/               # Image assets (to be added)
│   └── fonts/                # Custom fonts (if needed)
├── docs/
│   ├── DEV_LOG.md           # Development session log
│   └── VISUAL_CODEX.md      # Reusable design system
└── README.md                # This file
```

## 🚀 Getting Started

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ancestral-wisdom-enhanced.git
   cd ancestral-wisdom-enhanced
   ```

2. **Open in browser**
   ```bash
   # Simple Python server
   python -m http.server 8000
   
   # Or Node.js
   npx serve
   ```

3. **Visit**
   ```
   http://localhost:8000
   ```

### Deployment to GitHub Pages

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to Pages section
   - Source: Deploy from branch `main`
   - Folder: `/` (root)
   - Save

3. **Access your site**
   ```
   https://yourusername.github.io/ancestral-wisdom-enhanced/
   ```

## 🎯 GSAP Integration Points (14 Total)

1. **Hero Section** - Logo + headline animation with parallax
2. **Navigation** - Menu items stagger reveal
3. **Services Grid** - Card entrance choreography
4. **Morphing State 1** (0-200vh) - Color layer transition
5. **Morphing State 2** (200-400vh) - Geometry transformation
6. **Morphing State 3** (400-600vh) - Text reveal system
7. **Morphing State 4** (600-800vh) - Final convergence
8. **Philosophy Section** - Parallax image reveal
9. **Philosophy Text** - Cascade animation
10. **Testimonials** - Horizontal scroll + fade
11. **Credentials** - Timeline animation
12. **Call-to-Action** - Pulse + scale
13. **Contact Form** - Field reveal stagger
14. **Footer** - Element cascade

## 🎨 Morphing Experience (800vh)

The centerpiece "Beth's Journey" section features four transformative states:

### State 1: Origin (0-200vh)
- Circular geometry
- Golden gradient
- "The Beginning" narrative

### State 2: Transformation (200-400vh)
- Pentagon geometry
- Sage/Terra gradient
- "Beth's Journey" narrative

### State 3: Integration (400-600vh)
- Square geometry (rounded)
- Purple gradient
- "Ancient Meets Modern" narrative

### State 4: Wholeness (600-800vh)
- Nested circles
- Multi-color gradient
- "Your Sacred Space" narrative

## 🔧 Configuration

### Enabling/Disabling Features

**Parallax System**:
```javascript
// In parallax-system.js
AWH_Parallax.disable();  // Turn off
AWH_Parallax.enable();   // Turn on
```

**Debug Mode**:
```javascript
// In main.js
AWH.CONFIG.debug = true;  // Enable console logging
AWH_Parallax.toggleDebug();  // Visual parallax debugging
```

### Customizing Animations

All animation timings are controlled via CSS custom properties:
```css
:root {
  --duration-micro: 150ms;
  --duration-short: 300ms;
  --duration-medium: 600ms;
  --duration-long: 1000ms;
  --duration-morphing: 2000ms;
}
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: 1024px - 1280px
- **Large Desktop**: 1280px+
- **Ultra Wide**: 1536px+

## ♿ Accessibility

- WCAG 2.1 AA compliant color contrasts
- Keyboard navigation support
- Focus indicators on all interactive elements
- Screen reader friendly markup
- Respects `prefers-reduced-motion`
- Semantic HTML structure

## 🎭 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile: iOS Safari 14+, Chrome Mobile 90+

## 📊 Performance Targets

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.0s
- **Lighthouse Score**: > 90
- **Animation FPS**: Consistent 60fps

## 🧪 Testing Checklist

- [ ] All 14 GSAP integrations working
- [ ] 800vh morphing experience smooth
- [ ] Parallax effects on all sections
- [ ] Mobile navigation functional
- [ ] Form submission handling
- [ ] Cross-browser compatibility
- [ ] Accessibility compliance
- [ ] Performance targets met
- [ ] Responsive on all devices
- [ ] No console errors

## 📝 Content Management

### Updating Services
Edit the service cards in `index.html`:
```html
<article class="service-card">
  <div class="service-icon">...</div>
  <h3 class="service-title">Service Name</h3>
  <p class="service-description">Description...</p>
</article>
```

### Updating Testimonials
Edit testimonial cards in `index.html`:
```html
<article class="testimonial-card">
  <p class="testimonial-text">"Quote..."</p>
  <div class="testimonial-author">
    <strong class="author-name">Name</strong>
    <span class="author-service">Service</span>
  </div>
</article>
```

## 🔐 License

- **Code**: MIT License (for template code)
- **Content**: © 2020-2025 Ancestral Wisdom Healing LLC
- **Assets**: Proprietary
- **GSAP**: Commercial license required for client production use

## 📞 Support

For questions or customization requests:
- **Developer**: Clear Seas Solutions LLC
- **Website**: https://clearseassolutions.com
- **Client**: Ancestral Wisdom Healing LLC

## 🚦 Development Status

- [x] Project setup and architecture
- [x] Design system and visual codex
- [x] HTML structure with semantic markup
- [x] CSS with custom properties
- [x] 800vh morphing experience
- [x] 14 GSAP ScrollTrigger integrations
- [x] Multi-layer parallax system
- [x] Responsive design (all breakpoints)
- [x] Accessibility features
- [x] Performance optimizations
- [ ] Image assets integration
- [ ] Content finalization
- [ ] User testing
- [ ] Client approval
- [ ] Production deployment

## 🎯 Next Steps

1. Add client-provided images to `/assets/images/`
2. Replace placeholder logo with actual branding
3. Integrate contact form with backend/service
4. Configure GSAP commercial license
5. Final content review with client
6. Cross-browser testing
7. Performance audit
8. Deploy to production

## 📚 Documentation

- **DEV_LOG.md**: Detailed development session notes
- **VISUAL_CODEX.md**: Reusable design system for future projects
- **This README**: Project overview and getting started guide

## 🙏 Acknowledgments

Built with intention and care by Clear Seas Solutions LLC for Ancestral Wisdom Healing LLC.

Leveraging:
- GSAP by GreenSock
- Google Fonts (Playfair Display, Montserrat, Dancing Script)
- Modern web standards (HTML5, CSS3, ES6+)

---

**Last Updated**: November 21, 2025  
**Version**: 1.0.0  
**Status**: Development Complete, Awaiting Content & Deployment
