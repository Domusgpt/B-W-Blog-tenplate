import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ChakraMandalaNav from './components/ChakraMandalaNav';
import AlgorithmicArtBackground from './components/AlgorithmicArtBackground';
import FluidDynamics from './components/FluidDynamics';
import MorphingStory from './components/MorphingStory';
import Logo from './components/Logo';
import ParticleField from './components/ParticleField';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('root');
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero parallax effect
    if (heroRef.current) {
      gsap.to('.hero-title', {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        },
        y: 200,
        opacity: 0,
        scale: 1.5,
        ease: 'none'
      });

      gsap.to('.hero-subtitle', {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5
        },
        y: 150,
        opacity: 0,
        ease: 'none'
      });
    }

    // Services card stagger animation
    if (servicesRef.current) {
      gsap.fromTo('.service-card',
        { opacity: 0, y: 100, rotateX: -15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.2,
          scrollTrigger: {
            trigger: servicesRef.current,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 1
          }
        }
      );
    }

    // Global scroll progress
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => setScrollProgress(self.progress)
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const handleNavigation = (sectionId: string) => {
    setActiveSection(sectionId);

    // Scroll to section
    const sectionMap: { [key: string]: string } = {
      'root': 'hero',
      'sacral': 'services',
      'solar': 'story',
      'heart': 'testimonials',
      'throat': 'resources',
      'third-eye': 'blog',
      'crown': 'contact'
    };

    const targetId = sectionMap[sectionId];
    const element = document.getElementById(targetId);

    if (element) {
      gsap.to(window, {
        scrollTo: { y: element, offsetY: 0 },
        duration: 1.5,
        ease: 'power3.inOut'
      });
    }
  };

  const getVariantForSection = () => {
    const variants: { [key: string]: number } = {
      'root': 0,
      'sacral': 2,
      'solar': 3,
      'heart': 4,
      'throat': 5,
      'third-eye': 6,
      'crown': 7
    };
    return variants[activeSection] || 0;
  };

  return (
    <div className="relative bg-black text-white overflow-x-hidden">
      {/* Algorithmic Art Background with Advanced Ray Marching */}
      <AlgorithmicArtBackground
        complexity={1}
        scrollProgress={scrollProgress}
      />

      {/* Fluid Dynamics Layer */}
      <FluidDynamics intensity={0.8} />

      {/* Particle Field */}
      <ParticleField density={80} />

      {/* Navigation */}
      <ChakraMandalaNav
        activeSection={activeSection}
        onNavigate={handleNavigation}
      />

      {/* Hero Section */}
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-8 overflow-hidden"
      >
        <div className="text-center z-10">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <Logo size={180} animate={true} />
          </div>

          <h1
            className="hero-title text-6xl md:text-8xl font-bold mb-6"
            style={{
              background: 'linear-gradient(135deg, #E6C7EB 0%, #8B7AB8 50%, #5BA3DA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 80px rgba(230, 199, 235, 0.5)',
              fontFamily: 'Kelly Slab, serif'
            }}
          >
            Ancestral Wisdom Healing
          </h1>
          <h2 className="hero-subtitle text-3xl md:text-5xl font-light mb-12 text-purple-200">
            Healing Beyond Time & Space
          </h2>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-gray-300 mb-12">
            Journey into the sacred practices of our ancestors. Reconnect with ancient healing
            modalities that awaken your divine essence and restore harmony to body, mind, and spirit.
          </p>
          <button
            className="px-12 py-4 text-lg font-medium rounded-full transition-all duration-300 hover:scale-110"
            style={{
              background: 'linear-gradient(135deg, #E97132, #F5C645)',
              boxShadow: '0 0 40px rgba(233, 113, 50, 0.6)'
            }}
            onClick={() => handleNavigation('sacral')}
          >
            Begin Your Journey
          </button>
        </div>

        {/* Decorative sacred geometry elements */}
        <div className="absolute top-20 left-20 w-32 h-32 opacity-20">
          <svg viewBox="0 0 100 100" className="animate-spin-slow">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#E6C7EB" strokeWidth="1" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="#8B7AB8" strokeWidth="1" />
            <circle cx="50" cy="50" r="20" fill="none" stroke="#5BA3DA" strokeWidth="1" />
          </svg>
        </div>
        <div className="absolute bottom-20 right-20 w-40 h-40 opacity-20">
          <svg viewBox="0 0 100 100" className="animate-spin-reverse">
            <path d="M 50 10 L 90 90 L 10 90 Z" fill="none" stroke="#F5C645" strokeWidth="1" />
            <path d="M 50 30 L 70 70 L 30 70 Z" fill="none" stroke="#E97132" strokeWidth="1" />
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        ref={servicesRef}
        className="relative min-h-screen py-32 px-8"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-6xl md:text-7xl font-bold mb-16 text-center gradient-text">
            Sacred Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Energy Healing',
                description: 'Ancient techniques to balance and restore your energetic body, clearing blockages and activating your natural healing abilities.',
                color: '#C72C35',
                icon: '🔥'
              },
              {
                title: 'Shamanic Journeying',
                description: 'Guided spiritual exploration through altered states of consciousness to connect with spirit guides and ancestral wisdom.',
                color: '#E97132',
                icon: '🦅'
              },
              {
                title: 'Crystal Therapy',
                description: 'Harness the vibrational frequencies of sacred stones and crystals for healing, protection, and spiritual awakening.',
                color: '#F5C645',
                icon: '💎'
              },
              {
                title: 'Sound Healing',
                description: 'Experience the transformative power of sacred sounds, singing bowls, and vibrational medicine for deep cellular healing.',
                color: '#65B891',
                icon: '🎵'
              },
              {
                title: 'Ancestral Clearing',
                description: 'Release inherited trauma and limiting patterns passed down through your ancestral lineage for generational healing.',
                color: '#5BA3DA',
                icon: '🌳'
              },
              {
                title: 'Intuitive Readings',
                description: 'Receive guidance and clarity through intuitive insights, oracle wisdom, and connection to higher consciousness.',
                color: '#8B7AB8',
                icon: '✨'
              },
              {
                title: 'Reiki Healing',
                description: 'Japanese energy healing technique that promotes relaxation, reduces stress, and supports the body\'s natural healing processes.',
                color: '#E6C7EB',
                icon: '🙏'
              },
              {
                title: 'Plant Medicine Ceremonies',
                description: 'Sacred rituals with traditional plant medicines guided by ancestral wisdom for deep spiritual transformation and healing.',
                color: '#65B891',
                icon: '🌿'
              },
              {
                title: 'Breathwork Sessions',
                description: 'Conscious connected breathing techniques to release emotional blockages, reduce stress, and access expanded states of awareness.',
                color: '#5BA3DA',
                icon: '🌬️'
              }
            ].map((service, index) => (
              <div
                key={index}
                className="service-card p-8 rounded-2xl backdrop-blur-sm transition-all duration-500 hover:scale-105 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${service.color}20, ${service.color}10)`,
                  border: `2px solid ${service.color}40`,
                  boxShadow: `0 8px 32px ${service.color}20`
                }}
              >
                <div className="text-6xl mb-4">{service.icon}</div>
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ color: service.color }}
                >
                  {service.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section - 800vh Morphing Experience */}
      <section id="story">
        <MorphingStory />
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="relative min-h-screen py-32 px-8"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-6xl md:text-7xl font-bold mb-16 text-center gradient-text">
            Healing Journeys
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: "The ancestral healing work transformed my life. I finally released generational trauma I didn't even know I was carrying.",
                author: "Sarah M.",
                chakra: '#65B891'
              },
              {
                quote: "Through shamanic journeying, I connected with my spirit guides and found the answers I had been seeking for years.",
                author: "Michael R.",
                chakra: '#5BA3DA'
              },
              {
                quote: "The energy healing sessions opened my heart in ways I never thought possible. I feel whole for the first time.",
                author: "Jessica L.",
                chakra: '#E97132'
              },
              {
                quote: "Crystal therapy and sound healing have become essential practices in my spiritual journey. Truly life-changing.",
                author: "David K.",
                chakra: '#8B7AB8'
              },
              {
                quote: "The Reiki sessions brought me profound peace and balance. I now feel connected to a deeper part of myself.",
                author: "Amanda T.",
                chakra: '#E6C7EB'
              },
              {
                quote: "Breathwork opened doors I didn't know existed. Each session reveals new layers of healing and understanding.",
                author: "Carlos M.",
                chakra: '#F5C645'
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl backdrop-blur-sm"
                style={{
                  background: `linear-gradient(135deg, ${testimonial.chakra}15, ${testimonial.chakra}05)`,
                  border: `2px solid ${testimonial.chakra}30`
                }}
              >
                <p className="text-xl italic mb-6 text-gray-200">
                  "{testimonial.quote}"
                </p>
                <p
                  className="font-bold text-lg"
                  style={{ color: testimonial.chakra }}
                >
                  — {testimonial.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section
        id="resources"
        className="relative min-h-screen py-32 px-8"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-6xl md:text-7xl font-bold mb-16 text-center gradient-text">
            Sacred Resources
          </h2>

          <div className="space-y-8">
            {[
              {
                title: 'Meditation Library',
                description: 'Guided meditations for chakra alignment, energy clearing, and spiritual connection.',
                color: '#8B7AB8'
              },
              {
                title: 'Healing Tools',
                description: 'Curated collection of crystals, sacred objects, and spiritual tools for your practice.',
                color: '#5BA3DA'
              },
              {
                title: 'Educational Content',
                description: 'Articles, videos, and teachings on ancestral wisdom and healing modalities.',
                color: '#F5C645'
              }
            ].map((resource, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl backdrop-blur-sm transition-all hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${resource.color}20, ${resource.color}10)`,
                  border: `2px solid ${resource.color}40`
                }}
              >
                <h3
                  className="text-3xl font-bold mb-4"
                  style={{ color: resource.color }}
                >
                  {resource.title}
                </h3>
                <p className="text-xl text-gray-300">
                  {resource.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="relative min-h-screen py-32 px-8 flex items-center justify-center"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl md:text-7xl font-bold mb-8 gradient-text">
            Begin Your Healing Journey
          </h2>
          <p className="text-2xl mb-12 text-gray-300">
            Connect with ancient wisdom and modern healing modalities tailored to your unique path.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <button
              className="px-10 py-4 text-lg font-medium rounded-full transition-all hover:scale-110"
              style={{
                background: 'linear-gradient(135deg, #E6C7EB, #8B7AB8)',
                boxShadow: '0 0 40px rgba(230, 199, 235, 0.6)'
              }}
            >
              Book a Session
            </button>
            <button
              className="px-10 py-4 text-lg font-medium rounded-full border-2 transition-all hover:scale-110"
              style={{
                borderColor: '#E6C7EB',
                color: '#E6C7EB'
              }}
            >
              Free Consultation
            </button>
          </div>

          <div className="mt-16 text-gray-400">
            <p>Follow the journey</p>
            <div className="flex gap-6 justify-center mt-4 text-2xl">
              <span className="cursor-pointer hover:text-purple-300 transition">📧</span>
              <span className="cursor-pointer hover:text-purple-300 transition">📱</span>
              <span className="cursor-pointer hover:text-purple-300 transition">🌐</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p className="mb-4">
            © {new Date().getFullYear()} Ancestral Wisdom Healing. All Rights Reserved.
          </p>
          <p className="text-sm">
            Honoring the ancient practices that guide us home to ourselves.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
