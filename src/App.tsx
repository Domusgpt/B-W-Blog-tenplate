import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Vib3DVisualizer from './components/Vib3DVisualizer';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const morphingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero section animation
    if (heroRef.current) {
      gsap.from(heroRef.current.querySelectorAll('.fade-in'), {
        opacity: 0,
        y: 50,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }

    // Service cards stagger animation
    if (servicesRef.current) {
      gsap.from(servicesRef.current.querySelectorAll('.service-card'), {
        scrollTrigger: {
          trigger: servicesRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 100,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out'
      });
    }

    // Parallax scrolling effects
    gsap.utils.toArray('.parallax').forEach((element: any) => {
      gsap.to(element, {
        y: -100,
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    // Morphing section scroll animations
    if (morphingRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: morphingRef.current,
          start: 'top top',
          end: '+=800vh',
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      });

      // Morphing transformations
      tl.to('.morph-logo', {
        scale: 3,
        rotation: 360,
        duration: 2
      })
      .to('.morph-logo', {
        scale: 0.5,
        y: -200,
        duration: 2
      })
      .to('.morph-text', {
        opacity: 1,
        scale: 1.5,
        duration: 2
      }, '<')
      .to('.morph-bg', {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        duration: 3
      })
      .to('.morph-particles', {
        opacity: 0.8,
        scale: 2,
        rotation: 180,
        duration: 3
      });
    }
  }, []);

  return (
    <div className="relative bg-black text-white min-h-screen overflow-x-hidden">
      <Vib3DVisualizer variant={3} reactivity={1.5} />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 p-4">
        <button className="float-right border border-white px-6 py-2 text-sm tracking-widest hover:bg-white hover:text-black transition-colors">
          MENU
        </button>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="fade-in mb-8">
          <div className="w-48 h-48 mx-auto mb-6 rounded-full border-4 border-cyan-400 flex items-center justify-center">
            <svg className="w-32 h-32" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" className="text-cyan-400"/>
              <path d="M50,10 L50,90 M10,50 L90,50 M25,25 L75,75 M75,25 L25,75" stroke="currentColor" strokeWidth="0.5" className="text-purple-400"/>
              {[...Array(8)].map((_, i) => {
                const angle = (i * 45 * Math.PI) / 180;
                const x1 = 50 + 20 * Math.cos(angle);
                const y1 = 50 + 20 * Math.sin(angle);
                const x2 = 50 + 35 * Math.cos(angle);
                const y2 = 50 + 35 * Math.sin(angle);
                return <circle key={i} cx={x2} cy={y2} r="8" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400"/>;
              })}
            </svg>
          </div>
          <div className="text-2xl font-light tracking-wider mb-2" style={{fontFamily: 'serif'}}>
            ANCESTRAL WISDOM HEALING
          </div>
        </div>
        <h1 className="fade-in text-5xl md:text-7xl font-light mb-4" style={{fontFamily: 'serif', fontStyle: 'italic'}}>
          Vis Medicatrix Naturae
        </h1>
        <p className="fade-in text-xl md:text-2xl font-light tracking-wide" style={{fontFamily: 'serif'}}>
          The Healing Power Of Nature
        </p>
      </section>

      {/* 800vh Morphing Experience */}
      <section ref={morphingRef} className="relative h-screen">
        <div className="morph-bg absolute inset-0 bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 transition-all duration-1000"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="morph-logo relative z-10">
            <svg className="w-64 h-64" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="80" fill="none" stroke="white" strokeWidth="2"/>
              {[...Array(12)].map((_, i) => {
                const angle = (i * 30 * Math.PI) / 180;
                const x = 100 + 60 * Math.cos(angle);
                const y = 100 + 60 * Math.sin(angle);
                return <circle key={i} cx={x} cy={y} r="10" fill="white" opacity="0.7"/>;
              })}
            </svg>
          </div>
          <div className="morph-text absolute opacity-0 text-6xl font-bold text-white">
            Journey Within
          </div>
          <div className="morph-particles absolute inset-0 opacity-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section ref={servicesRef} className="relative py-20 px-4">
        <h2 className="text-5xl text-center mb-16 font-light" style={{fontFamily: 'serif'}}>
          Our Services
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="service-card group">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <div className="h-64 bg-gradient-to-br from-gray-700 to-gray-900"></div>
              </div>
              <h3 className="text-3xl mb-4 text-cyan-400" style={{fontFamily: 'serif', fontStyle: 'italic'}}>
                {service.title}
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">{service.description}</p>
              <button className="text-sm tracking-wide hover:text-cyan-400 transition-colors">
                Read more
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Body Work & Sound Healing Mission */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-32 h-32 mx-auto mb-6">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="black" strokeWidth="1"/>
              {[...Array(12)].map((_, i) => {
                const angle = (i * 30 * Math.PI) / 180;
                const x = 50 + 30 * Math.cos(angle);
                const y = 50 + 30 * Math.sin(angle);
                return <circle key={i} cx={x} cy={y} r="8" fill="none" stroke="black" strokeWidth="0.5"/>;
              })}
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl mb-8 font-semibold text-black" style={{fontFamily: 'serif'}}>
            Body Work & Sound Healing
          </h2>
          <p className="text-lg md:text-xl text-black leading-relaxed">
            Ancestral Wisdom Healing LLC offers a holistic approach to everyday well-being through massage, energy work, and sound healing. Officially brought to life in 2020 by Beth Connelly, her mission is to create a safe and comfortable space where her clients can explore their own depths within to invoke the power of healing. She aims to provide an experience that integrates ancient wisdom with modern practices. She takes pride in her spiritual journey which has led her to travel around the world and embodies yogic values that make her stand out from the rest.
          </p>
        </div>
      </section>

      {/* About Beth */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl text-center mb-12 font-light text-black" style={{fontFamily: 'serif'}}>
            About
          </h2>
          <div className="space-y-6 text-black text-lg leading-relaxed">
            <p>
              Beth Connelly had her spiritual awakening in 2008 while she was in school for cosmetology. She began going to meditation groups, psychic development classes, healing circles, crystal bowl meditations, and whatever else she could find in relation to the healing arts.
            </p>
            <p>
              After receiving Reiki for many years, beth took her level 1 and level 2 training in 2012. During her Reiki 2 initiation, she received a clear message to go to massage school and learn the anatomy of the body to help individuals move stagnant energy.
            </p>
            <p>
              Within two months of the Reiki 2 initiation, she quit her part time job at her hairstyling job, packed her car, said goodbye to family and friends and drove across the country to Arizona. She enrolled at the Desert Schools School Of Massage and obtained a world class education. To this day she is extremely grateful to a massage therapist and has never looked back!
            </p>
            <p>
              In 2013 she bought her first quartz crystal bowl at the Tucson gem show. It wasn't until around 3 years later (after practicing and detaching) when she broke that bowl, which inspired her to get her first 7 and 12. For several years before the pandemic she regularly co-hosted new moon and full moon sound healing ceremonies.
            </p>
            <p>
              In 2014 she completed her Reiki Master Teacher training while living in Sedona. Over the years she has just kept all of the Reiki levels multiple times, with Reiki masters, Meg Sharpleigh of Sedona, AZ, Jeanne Kelleher of Toms River, NJ, and Malia Murphy of Long Beach Island, NJ.
            </p>
            <p>
              Thereafter, Beth has taught many Reiki classes and hosted various Reiki Shares.
            </p>
            <p>
              Beth has an extensive background in Yoga. She completed her first 200 hour Yoga Teacher Training in 2017 at Rishikul Yogshala in Rishikesh, India where she lived in an Ashram, and got to learn the tradition of Yoga. Her second Yoga Teacher Training was a 200 hour program in 2018, outside of Quito, Ecuador at Durga's Den School Of Yoga. Her third Yoga Teacher Training was a 300 hour program in Cali Colombia through Shiva Yoga Peeth.
            </p>
          </div>
        </div>
      </section>

      {/* Get In Touch */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-32 h-32 mx-auto mb-6">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="black" strokeWidth="1"/>
              {[...Array(8)].map((_, i) => {
                const angle = (i * 45 * Math.PI) / 180;
                const x = 50 + 30 * Math.cos(angle);
                const y = 50 + 30 * Math.sin(angle);
                return <line key={i} x1="50" y1="50" x2={x} y2={y} stroke="black" strokeWidth="0.5"/>;
              })}
            </svg>
          </div>
          <h2 className="text-2xl mb-4 text-black tracking-wider" style={{fontFamily: 'serif'}}>
            Vis Medicatrix Naturae
          </h2>
          <p className="text-lg mb-2 text-black">The Healing Power Of Nature</p>

          <h3 className="text-4xl md:text-5xl font-bold my-8 text-black tracking-wider">
            GET IN TOUCH
          </h3>

          <p className="text-xl mb-8 text-black leading-relaxed">
            Experience the healing power of massage, energy work, and sound healing with Ancestral Wisdom Healing LLC.
          </p>

          <p className="text-lg mb-12 text-black font-semibold">
            Licensed and Insured since 2013.
          </p>

          <div className="border-4 border-cyan-400 p-8 inline-block bg-black/90">
            <div className="flex items-center justify-center gap-4 mb-6 text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
              </svg>
              <span className="text-xl">Serving Ocean County, New Jersey</span>
            </div>
            <div className="flex items-center justify-center gap-4 mb-6 text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              <a href="tel:6096619773" className="text-xl underline hover:text-cyan-400 transition-colors">
                609-661-9773
              </a>
            </div>
            <div className="flex items-center justify-center gap-4 text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              <a href="mailto:ancestralwisdomhealing@gmail.com" className="text-lg hover:text-cyan-400 transition-colors">
                ancestralwisdomhealing@gmail.com
              </a>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-2xl mb-4 text-black font-bold">
              *CALL OR TEXT <a href="tel:6096619773" className="underline hover:text-cyan-600">6096619773</a> FOR IMMEDIATE BOOKINGS.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 bg-black text-white text-center">
        <div className="w-24 h-24 mx-auto mb-6">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" className="text-cyan-400"/>
            {[...Array(8)].map((_, i) => {
              const angle = (i * 45 * Math.PI) / 180;
              const x = 50 + 30 * Math.cos(angle);
              const y = 50 + 30 * Math.sin(angle);
              return <circle key={i} cx={x} cy={y} r="10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400"/>;
            })}
          </svg>
        </div>

        <div className="flex justify-center gap-8 mb-6">
          <a href="tel:6096619773" className="hover:text-cyan-400 transition-colors">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
            </svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
              <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
        </div>

        <p className="text-sm">
          <a href="mailto:AncestralWisdomHealing@gmail.com" className="hover:text-cyan-400 transition-colors">
            AncestralWisdomHealing@gmail.com
          </a>
        </p>
      </footer>
    </div>
  );
};

const services = [
  {
    title: 'Relaxation Massage',
    description: 'Experience deep relaxation and stress relief through gentle, flowing massage techniques designed to calm the mind and soothe the body.'
  },
  {
    title: 'Deep Tissue Massage',
    description: 'Step into a realm of profound healing and relaxation with Ancestral Wisdom Healing\'s deep tissue massage services. Beth will use firm to deep pressure, blending modern techniques with ancient knowledge to release tension, increase circulation, and promote overall well-being. Experience...'
  },
  {
    title: 'Reiki Healing',
    description: 'Reiki is a non-invasive energy healing modality that comes from Japan. It is based on the concept that there is a life force energy that runs through our bodies and animates all life forms. Reiki is administered by the "laying of hands" on different points of the body. Reiki promotes relaxation, well being, ...'
  },
  {
    title: 'Yoga Class',
    description: 'Join me every Sunday from 9:30-10:30 at Whole Body Wellness in Manahawkin I teach Beginner Yoga, we create a safe and open environment for brand new yoga students or those who want to brush up on their fundamentals. This class will move at a slower pace and focus on proper alignment and ...'
  },
  {
    title: 'Kirtan',
    description: 'Sacred chanting and devotional music ceremonies to connect with divine energy and community spirit.'
  },
  {
    title: 'Energy Clearing',
    description: 'Release stagnant energy and restore balance through specialized clearing techniques and practices.'
  },
  {
    title: 'Spiritual Coaching',
    description: 'Guided support on your spiritual journey, helping you discover your path and connect with your inner wisdom.'
  },
  {
    title: 'Meditation Instructor',
    description: 'Learn meditation techniques to cultivate mindfulness, inner peace, and spiritual growth.'
  },
  {
    title: 'Birth Doula',
    description: 'Compassionate support throughout pregnancy, labor, and postpartum to honor this sacred transition.'
  },
  {
    title: 'End of Life Doula',
    description: 'Tender care and spiritual support during life\'s final transition, creating a peaceful and meaningful passage.'
  },
  {
    title: 'Ordained Minister',
    description: 'Ceremonial services for weddings, celebrations, and sacred life events with spiritual authenticity.'
  }
];

export default App;
