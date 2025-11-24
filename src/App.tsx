import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Vib3DVisualizer from './components/Vib3DVisualizer';
import Menu from './components/Menu';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero fade-in animations
    if (heroRef.current) {
      gsap.from(heroRef.current.querySelectorAll('.fade-in'), {
        opacity: 0,
        y: 30,
        duration: 1.4,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }

    // Service card animations
    gsap.utils.toArray('.service-card').forEach((card: any) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 60,
        duration: 0.8,
        ease: 'power2.out'
      });
    });

    // Section headers
    gsap.utils.toArray('.section-header').forEach((header: any) => {
      gsap.from(header, {
        scrollTrigger: {
          trigger: header,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out'
      });
    });
  }, []);

  const menuSections = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About Beth' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="relative bg-black text-white min-h-screen overflow-x-hidden">
      <Vib3DVisualizer variant={3} reactivity={1.5} />
      <Menu sections={menuSections} />

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="fade-in mb-12">
          <div className="w-40 h-40 md:w-56 md:h-56 mx-auto mb-8 rounded-full border-2 border-cyan-400/60 flex items-center justify-center">
            <svg className="w-28 h-28 md:w-40 md:h-40" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400/80"/>
              <path d="M50,10 L50,90 M10,50 L90,50 M25,25 L75,75 M75,25 L25,75" stroke="currentColor" strokeWidth="0.3" className="text-purple-400/60"/>
              {[...Array(8)].map((_, i) => {
                const angle = (i * 45 * Math.PI) / 180;
                const x1 = 50 + 20 * Math.cos(angle);
                const y1 = 50 + 20 * Math.sin(angle);
                const x2 = 50 + 35 * Math.cos(angle);
                const y2 = 50 + 35 * Math.sin(angle);
                return <circle key={i} cx={x2} cy={y2} r="6" fill="none" stroke="currentColor" strokeWidth="0.4" className="text-cyan-400/70"/>;
              })}
            </svg>
          </div>
          <div className="text-xl md:text-2xl font-light tracking-[0.25em] mb-4 text-gray-300" style={{fontFamily: 'serif'}}>
            ANCESTRAL WISDOM HEALING
          </div>
        </div>
        <h1 className="fade-in text-4xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight" style={{fontFamily: 'serif', fontStyle: 'italic'}}>
          Vis Medicatrix Naturae
        </h1>
        <p className="fade-in text-lg md:text-xl lg:text-2xl font-light tracking-wide text-gray-400 mb-12" style={{fontFamily: 'serif'}}>
          The Healing Power Of Nature
        </p>
        <button
          onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          className="fade-in border border-white/50 px-8 py-3 text-sm tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-300"
        >
          EXPLORE
        </button>
      </section>

      {/* Mission Statement */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-24 h-24 mx-auto mb-6 opacity-60">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400"/>
                {[...Array(12)].map((_, i) => {
                  const angle = (i * 30 * Math.PI) / 180;
                  const x = 50 + 30 * Math.cos(angle);
                  const y = 50 + 30 * Math.sin(angle);
                  return <circle key={i} cx={x} cy={y} r="4" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-cyan-400"/>;
                })}
              </svg>
            </div>
          </div>
          <p className="text-xl md:text-2xl leading-relaxed text-center text-gray-300 font-light" style={{fontFamily: 'serif'}}>
            Ancestral Wisdom Healing LLC offers a <span className="text-cyan-400">holistic approach</span> to everyday well-being through massage, energy work, and sound healing. Founded in 2020 by Beth Connelly, our mission is to create a safe and comfortable space where clients can explore their own depths to invoke the power of healing—integrating <span className="text-cyan-400">ancient wisdom</span> with modern practices.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-header text-5xl md:text-6xl text-center mb-8 font-light" style={{fontFamily: 'serif', fontStyle: 'italic'}}>
            Services
          </h2>
          <p className="text-center text-gray-400 mb-20 text-lg max-w-2xl mx-auto">
            A curated collection of healing modalities to support your journey
          </p>

          {/* Bodywork */}
          <div className="mb-24">
            <h3 className="text-3xl md:text-4xl mb-12 text-cyan-400 font-light tracking-wide" style={{fontFamily: 'serif'}}>
              Bodywork & Massage
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {bodyworkServices.map((service, index) => (
                <div key={index} className="service-card group">
                  <div className="border border-gray-800 hover:border-cyan-400/50 transition-all duration-500 p-8 h-full bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm">
                    <h4 className="text-2xl mb-4 group-hover:text-cyan-400 transition-colors duration-300" style={{fontFamily: 'serif', fontStyle: 'italic'}}>
                      {service.title}
                    </h4>
                    <p className="text-gray-400 leading-relaxed text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Energy & Spiritual */}
          <div className="mb-24">
            <h3 className="text-3xl md:text-4xl mb-12 text-purple-400 font-light tracking-wide" style={{fontFamily: 'serif'}}>
              Energy Work & Healing
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {energyServices.map((service, index) => (
                <div key={index} className="service-card group">
                  <div className="border border-gray-800 hover:border-purple-400/50 transition-all duration-500 p-8 h-full bg-gradient-to-br from-purple-900/20 to-black/50 backdrop-blur-sm">
                    <h4 className="text-2xl mb-4 group-hover:text-purple-400 transition-colors duration-300" style={{fontFamily: 'serif', fontStyle: 'italic'}}>
                      {service.title}
                    </h4>
                    <p className="text-gray-400 leading-relaxed text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Classes & Ceremonies */}
          <div>
            <h3 className="text-3xl md:text-4xl mb-12 text-pink-400 font-light tracking-wide" style={{fontFamily: 'serif'}}>
              Classes & Sacred Ceremonies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {classServices.map((service, index) => (
                <div key={index} className="service-card group">
                  <div className="border border-gray-800 hover:border-pink-400/50 transition-all duration-500 p-8 h-full bg-gradient-to-br from-pink-900/20 to-black/50 backdrop-blur-sm">
                    <h4 className="text-2xl mb-4 group-hover:text-pink-400 transition-colors duration-300" style={{fontFamily: 'serif', fontStyle: 'italic'}}>
                      {service.title}
                    </h4>
                    <p className="text-gray-400 leading-relaxed text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Beth */}
      <section id="about" className="relative py-32 px-6 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-header text-5xl md:text-6xl text-center mb-20 font-light" style={{fontFamily: 'serif', fontStyle: 'italic'}}>
            About Beth
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
            <div className="space-y-6">
              <div className="border-l-2 border-cyan-400 pl-6">
                <h3 className="text-2xl mb-3 text-cyan-400 font-light">The Awakening</h3>
                <p className="text-gray-400 leading-relaxed">
                  Beth Connelly's spiritual awakening began in 2008 during cosmetology school. She immersed herself in meditation groups, psychic development classes, healing circles, and crystal bowl meditations—exploring every avenue of the healing arts she could find.
                </p>
              </div>

              <div className="border-l-2 border-purple-400 pl-6">
                <h3 className="text-2xl mb-3 text-purple-400 font-light">The Call</h3>
                <p className="text-gray-400 leading-relaxed">
                  After receiving Reiki for years, Beth completed her Level 1 and Level 2 training in 2012. During her Reiki 2 initiation, she received a clear message: <span className="text-white italic">go to massage school and learn the anatomy of the body to help individuals move stagnant energy</span>.
                </p>
              </div>

              <div className="border-l-2 border-pink-400 pl-6">
                <h3 className="text-2xl mb-3 text-pink-400 font-light">The Journey West</h3>
                <p className="text-gray-400 leading-relaxed">
                  Within two months, Beth quit her job, packed her car, said goodbye to family and friends, and drove across the country to Arizona. She enrolled at Desert Schools School of Massage, receiving a world-class education. To this day, she's grateful to be a massage therapist and has never looked back.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border-l-2 border-cyan-400 pl-6">
                <h3 className="text-2xl mb-3 text-cyan-400 font-light">Sound Healing</h3>
                <p className="text-gray-400 leading-relaxed">
                  In 2013, Beth bought her first quartz crystal bowl at the Tucson gem show. Years of practice followed. Before the pandemic, she regularly co-hosted new moon and full moon sound healing ceremonies, creating sacred spaces for community healing.
                </p>
              </div>

              <div className="border-l-2 border-purple-400 pl-6">
                <h3 className="text-2xl mb-3 text-purple-400 font-light">Reiki Mastery</h3>
                <p className="text-gray-400 leading-relaxed">
                  Beth completed her Reiki Master Teacher training in Sedona in 2014. Over the years, she has retaken all Reiki levels multiple times with masters Meg Sharpleigh (Sedona, AZ), Jeanne Kelleher (Toms River, NJ), and Malia Murphy (Long Beach Island, NJ). She has taught many Reiki classes and hosted various Reiki Shares.
                </p>
              </div>

              <div className="border-l-2 border-pink-400 pl-6">
                <h3 className="text-2xl mb-3 text-pink-400 font-light">Yoga Around the World</h3>
                <p className="text-gray-400 leading-relaxed">
                  Beth has extensive yoga training: 200-hour certification at Rishikul Yogshala in Rishikesh, India (2017), living in an Ashram to learn traditional yoga; 200-hour training at Durga's Den outside Quito, Ecuador (2018); and 300-hour training in Cali, Colombia through Shiva Yoga Peeth.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center border-t border-gray-800 pt-12">
            <p className="text-xl text-gray-300 italic max-w-3xl mx-auto">
              "Her spiritual journey has led her around the world, and she embodies yogic values that make her stand out from the rest."
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32 px-6 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-32 h-32 mx-auto mb-8">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400"/>
              {[...Array(8)].map((_, i) => {
                const angle = (i * 45 * Math.PI) / 180;
                const x = 50 + 30 * Math.cos(angle);
                const y = 50 + 30 * Math.sin(angle);
                return <line key={i} x1="50" y1="50" x2={x} y2={y} stroke="currentColor" strokeWidth="0.3" className="text-cyan-400"/>;
              })}
            </svg>
          </div>

          <h2 className="text-2xl mb-2 tracking-[0.2em] font-light text-gray-400" style={{fontFamily: 'serif'}}>
            Vis Medicatrix Naturae
          </h2>
          <p className="text-lg mb-12 text-gray-500">The Healing Power Of Nature</p>

          <h3 className="text-5xl md:text-6xl font-light mb-12 tracking-wide" style={{fontFamily: 'serif', fontStyle: 'italic'}}>
            Get In Touch
          </h3>

          <p className="text-xl mb-12 text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Experience the healing power of massage, energy work, and sound healing with Ancestral Wisdom Healing LLC.
          </p>

          <p className="text-lg mb-16 text-gray-400">
            Licensed and Insured since 2013
          </p>

          <div className="border-2 border-cyan-400/60 p-10 inline-block bg-black/60 backdrop-blur-sm mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
              </svg>
              <span className="text-xl">Serving Ocean County, New Jersey</span>
            </div>
            <div className="flex items-center justify-center gap-4 mb-6">
              <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              <a href="tel:6096619773" className="text-xl underline hover:text-cyan-400 transition-colors">
                609-661-9773
              </a>
            </div>
            <div className="flex items-center justify-center gap-4">
              <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              <a href="mailto:ancestralwisdomhealing@gmail.com" className="text-lg hover:text-cyan-400 transition-colors">
                ancestralwisdomhealing@gmail.com
              </a>
            </div>
          </div>

          <div className="text-2xl font-light text-gray-300">
            <span className="text-cyan-400">CALL OR TEXT</span> <a href="tel:6096619773" className="underline hover:text-cyan-400 transition-colors">609-661-9773</a> FOR IMMEDIATE BOOKINGS
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-6 bg-gray-900 text-center border-t border-gray-800">
        <div className="w-20 h-20 mx-auto mb-6 opacity-40">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400"/>
            {[...Array(8)].map((_, i) => {
              const angle = (i * 45 * Math.PI) / 180;
              const x = 50 + 30 * Math.cos(angle);
              const y = 50 + 30 * Math.sin(angle);
              return <circle key={i} cx={x} cy={y} r="8" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-cyan-400"/>;
            })}
          </svg>
        </div>

        <div className="flex justify-center gap-8 mb-6">
          <a href="tel:6096619773" className="hover:text-cyan-400 transition-colors" aria-label="Phone">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
            </svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors" aria-label="Instagram">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
              <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors" aria-label="Facebook">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
        </div>

        <p className="text-sm text-gray-500">
          © 2025 Ancestral Wisdom Healing LLC · <a href="mailto:AncestralWisdomHealing@gmail.com" className="hover:text-cyan-400 transition-colors">AncestralWisdomHealing@gmail.com</a>
        </p>
      </footer>
    </div>
  );
};

// Service data organized by category
const bodyworkServices = [
  {
    title: 'Relaxation Massage',
    description: 'Experience deep relaxation and stress relief through gentle, flowing massage techniques designed to calm the mind and soothe the body.'
  },
  {
    title: 'Deep Tissue Massage',
    description: 'Step into profound healing with firm to deep pressure, blending modern techniques with ancient knowledge to release tension, increase circulation, and promote overall well-being.'
  },
  {
    title: 'Birth Doula',
    description: 'Compassionate support throughout pregnancy, labor, and postpartum to honor this sacred transition into motherhood.'
  },
  {
    title: 'End of Life Doula',
    description: 'Tender care and spiritual support during life\'s final transition, creating a peaceful and meaningful passage.'
  }
];

const energyServices = [
  {
    title: 'Reiki Healing',
    description: 'A non-invasive Japanese energy healing modality using "laying of hands" on different points of the body. Promotes relaxation, well-being, and energetic balance through life force energy.'
  },
  {
    title: 'Energy Clearing',
    description: 'Release stagnant energy and restore balance through specialized clearing techniques and practices to revitalize your energetic field.'
  },
  {
    title: 'Spiritual Coaching',
    description: 'Guided support on your spiritual journey, helping you discover your path and connect with your inner wisdom and authenticity.'
  }
];

const classServices = [
  {
    title: 'Yoga Class',
    description: 'Every Sunday 9:30-10:30 at Whole Body Wellness in Manahawkin. Beginner-friendly classes in a safe, open environment focusing on proper alignment and fundamentals.'
  },
  {
    title: 'Kirtan',
    description: 'Sacred chanting and devotional music ceremonies to connect with divine energy, open the heart, and build community spirit.'
  },
  {
    title: 'Meditation Instructor',
    description: 'Learn meditation techniques to cultivate mindfulness, inner peace, and spiritual growth through guided practice and instruction.'
  },
  {
    title: 'Ordained Minister',
    description: 'Ceremonial services for weddings, celebrations, and sacred life events performed with spiritual authenticity and intention.'
  }
];

export default App;
