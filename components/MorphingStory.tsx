import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STORY_STATES = [
  {
    title: 'Ancient Wisdom',
    subtitle: 'The Journey Begins',
    content: 'Every healing journey starts with a single step into the ancient wisdom that has guided humanity for millennia.',
    chakra: 0,
    color: '#C72C35'
  },
  {
    title: 'Awakening',
    subtitle: 'Creative Energy Flows',
    content: 'Discover the creative life force within, awakening dormant energies through sacred practices and intentional healing.',
    chakra: 1,
    color: '#E97132'
  },
  {
    title: 'Personal Power',
    subtitle: 'Transformation Through Fire',
    content: 'Embrace your inner strength and personal power, transforming challenges into opportunities for profound growth.',
    chakra: 2,
    color: '#F5C645'
  },
  {
    title: 'Heart Opening',
    subtitle: 'Love & Compassion',
    content: 'Open your heart to unconditional love, compassion, and the healing power of authentic connection.',
    chakra: 3,
    color: '#65B891'
  },
  {
    title: 'Truth Speaking',
    subtitle: 'Authentic Expression',
    content: 'Find your voice and speak your truth with clarity, honoring your authentic self and unique expression.',
    chakra: 4,
    color: '#5BA3DA'
  },
  {
    title: 'Inner Vision',
    subtitle: 'Intuitive Awakening',
    content: 'Develop deep intuitive awareness and inner vision, perceiving beyond the physical into realms of spiritual insight.',
    chakra: 5,
    color: '#8B7AB8'
  },
  {
    title: 'Divine Connection',
    subtitle: 'Unity Consciousness',
    content: 'Experience the profound connection to all that is, merging individual consciousness with universal divine energy.',
    chakra: 6,
    color: '#E6C7EB'
  },
  {
    title: 'Integration',
    subtitle: 'Wholeness & Harmony',
    content: 'All chakras aligned, all energies balanced—you embody the complete integration of mind, body, and spirit.',
    chakra: 7,
    color: '#FFFFFF'
  }
];

const MorphingStory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentState, setCurrentState] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // GSAP ScrollTrigger #1: Main scroll container
    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=8000', // 800vh
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
        const stateIndex = Math.floor(self.progress * STORY_STATES.length);
        setCurrentState(Math.min(stateIndex, STORY_STATES.length - 1));
      }
    });

    // GSAP ScrollTrigger #2-8: Individual state transitions
    STORY_STATES.forEach((state, index) => {
      const progress = index / STORY_STATES.length;
      const nextProgress = (index + 1) / STORY_STATES.length;

      // Title animation
      ScrollTrigger.create({
        trigger: container,
        start: `top+=${progress * 8000} top`,
        end: `top+=${nextProgress * 8000} top`,
        scrub: 1,
        onEnter: () => {
          gsap.to(`.story-title-${index}`, {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out'
          });
        },
        onLeave: () => {
          gsap.to(`.story-title-${index}`, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3
          });
        },
        onEnterBack: () => {
          gsap.to(`.story-title-${index}`, {
            scale: 1,
            opacity: 1,
            duration: 0.5
          });
        }
      });

      // Content card morph animation
      ScrollTrigger.create({
        trigger: container,
        start: `top+=${progress * 8000} top`,
        end: `top+=${nextProgress * 8000} top`,
        scrub: 1,
        onUpdate: (self) => {
          const localProgress = (self.progress - progress) / (nextProgress - progress);
          gsap.to(`.story-card-${index}`, {
            y: localProgress * -100,
            rotateX: localProgress * 15,
            opacity: 1 - localProgress,
            duration: 0.1
          });
        }
      });
    });

    // GSAP ScrollTrigger #9: Background color transition
    ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=8000',
      scrub: 1,
      onUpdate: (self) => {
        const stateIndex = Math.floor(self.progress * (STORY_STATES.length - 1));
        const nextIndex = Math.min(stateIndex + 1, STORY_STATES.length - 1);
        const localProgress = (self.progress * (STORY_STATES.length - 1)) - stateIndex;

        const currentColor = STORY_STATES[stateIndex].color;
        const nextColor = STORY_STATES[nextIndex].color;

        // Interpolate colors
        gsap.to(container, {
          backgroundColor: currentColor,
          duration: 0.1
        });
      }
    });

    // GSAP ScrollTrigger #10: Morphing shapes animation
    const animateShapes = () => {
      const time = Date.now() * 0.001;
      const state = STORY_STATES[currentState];

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw morphing sacred geometry shapes
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const baseRadius = 200;

      // Outer ring
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(time * 0.1 + scrollProgress * Math.PI * 2);

      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 / 8) * i;
        const radius = baseRadius + Math.sin(time + i) * 20;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        ctx.beginPath();
        ctx.arc(x, y, 10 + scrollProgress * 20, 0, Math.PI * 2);
        ctx.fillStyle = state.color + '80';
        ctx.fill();
        ctx.strokeStyle = state.color;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      ctx.restore();

      // Inner morphing shape
      const sides = 3 + currentState;
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(-time * 0.15 + scrollProgress * Math.PI);
      ctx.beginPath();

      for (let i = 0; i <= sides; i++) {
        const angle = (Math.PI * 2 / sides) * i;
        const radius = 100 + Math.sin(time * 2 + i) * 30;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.closePath();
      ctx.strokeStyle = state.color;
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.fillStyle = state.color + '20';
      ctx.fill();

      ctx.restore();

      requestAnimationFrame(animateShapes);
    };

    animateShapes();

    // GSAP ScrollTrigger #11: Parallax layers
    gsap.to('.parallax-layer-1', {
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=8000',
        scrub: 1
      },
      y: -400,
      ease: 'none'
    });

    gsap.to('.parallax-layer-2', {
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=8000',
        scrub: 1
      },
      y: -800,
      ease: 'none'
    });

    // GSAP ScrollTrigger #12: Progress indicator
    gsap.to('.progress-indicator', {
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=8000',
        scrub: 0.5
      },
      scaleY: 1,
      ease: 'none'
    });

    // GSAP ScrollTrigger #13: Floating particles
    for (let i = 0; i < 20; i++) {
      gsap.to(`.particle-${i}`, {
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=8000',
          scrub: 2 + i * 0.1
        },
        y: -2000 - i * 50,
        x: Math.sin(i) * 300,
        rotation: 360 * (i % 2 === 0 ? 1 : -1),
        opacity: 0,
        ease: 'none'
      });
    }

    // GSAP ScrollTrigger #14: Text reveal animations
    gsap.utils.toArray('.reveal-text').forEach((elem: any, index) => {
      gsap.fromTo(elem,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: container,
            start: `top+=${index * 1000} center`,
            end: `top+=${index * 1000 + 500} center`,
            scrub: 1
          }
        }
      );
    });

    return () => {
      scrollTrigger.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [currentState, scrollProgress]);

  const state = STORY_STATES[currentState];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden transition-colors duration-1000"
      style={{ backgroundColor: state.color + '20' }}
    >
      {/* Background canvas for morphing shapes */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none mix-blend-screen opacity-30"
      />

      {/* Parallax layers */}
      <div className="parallax-layer-1 absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: state.color }}
        />
      </div>
      <div className="parallax-layer-2 absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ backgroundColor: STORY_STATES[(currentState + 3) % STORY_STATES.length].color }}
        />
      </div>

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className={`particle-${i} absolute w-2 h-2 rounded-full`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: state.color,
            opacity: 0.6
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 h-full flex items-center justify-center px-8">
        <div className="max-w-4xl text-center">
          {/* State titles with individual animations */}
          {STORY_STATES.map((s, index) => (
            <div
              key={index}
              className={`story-title-${index} ${index === currentState ? 'block' : 'hidden'}`}
            >
              <h1
                className="text-8xl md:text-9xl font-bold mb-6 reveal-text"
                style={{
                  color: s.color,
                  textShadow: `0 0 40px ${s.color}80`,
                  transform: 'scale(0.8)',
                  opacity: 0
                }}
              >
                {s.title}
              </h1>
              <h2
                className="text-3xl md:text-4xl font-light mb-8 reveal-text"
                style={{ color: s.color }}
              >
                {s.subtitle}
              </h2>
              <p
                className={`story-card-${index} text-xl md:text-2xl leading-relaxed reveal-text`}
                style={{
                  color: '#FFFFFF',
                  maxWidth: '800px',
                  margin: '0 auto',
                  padding: '2rem',
                  background: `linear-gradient(135deg, ${s.color}20, ${s.color}10)`,
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  border: `2px solid ${s.color}40`
                }}
              >
                {s.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Progress indicator */}
      <div className="fixed right-8 top-0 h-screen w-1 bg-white/20">
        <div
          className="progress-indicator w-full bg-gradient-to-b from-transparent via-white to-transparent origin-top"
          style={{
            height: '100%',
            scaleY: 0,
            boxShadow: `0 0 20px ${state.color}`
          }}
        />
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-sm font-mono animate-pulse">
        Scroll to explore • {currentState + 1} / {STORY_STATES.length}
      </div>
    </div>
  );
};

export default MorphingStory;
