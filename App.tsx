import React from 'react';
import SimpleVisualizer from './components/SimpleVisualizer';

const App: React.FC = () => {
  return (
    <div className="relative bg-black text-white min-h-screen">
      <SimpleVisualizer />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-light tracking-wide">Ancestral Wisdom Healing</h1>
            <nav className="hidden md:flex gap-8">
              <a href="#home" className="hover:text-purple-400 transition">Home</a>
              <a href="#services" className="hover:text-purple-400 transition">Services</a>
              <a href="#about" className="hover:text-purple-400 transition">About</a>
              <a href="#testimonials" className="hover:text-purple-400 transition">Testimonials</a>
              <a href="#contact" className="hover:text-purple-400 transition">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-4xl">
          <h2 className="text-6xl md:text-8xl font-light mb-6">
            Healing Through
            <br />
            <span className="text-purple-400">Ancient Wisdom</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-12">
            Transform through time-honored practices and modern understanding
          </p>
          <div className="flex gap-4 justify-center">
            <a href="#contact" className="px-8 py-3 bg-purple-600 hover:bg-purple-700 transition rounded">
              Book a Session
            </a>
            <a href="#services" className="px-8 py-3 border border-white/30 hover:border-white/60 transition rounded">
              Explore Services
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="min-h-screen py-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl font-light mb-16 text-center">Healing Modalities</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Body Work',
                description: 'Therapeutic massage techniques that release tension and restore balance through mindful touch.'
              },
              {
                title: 'Energy Healing',
                description: 'Gentle energy practices that clear blockages and awaken your natural healing capacity.'
              },
              {
                title: 'Sound Healing',
                description: 'Vibrational therapy using singing bowls and sacred sound to harmonize body and spirit.'
              },
              {
                title: 'Reiki',
                description: 'Japanese energy healing technique promoting relaxation and natural healing processes.'
              },
              {
                title: 'Ancestral Clearing',
                description: 'Release inherited trauma and limiting patterns from your ancestral lineage.'
              },
              {
                title: 'Holistic Integration',
                description: 'Personalized sessions combining multiple modalities tailored to your needs.'
              }
            ].map((service, i) => (
              <div key={i} className="p-8 border border-white/10 hover:border-purple-400/50 transition rounded-lg bg-black/40 backdrop-blur">
                <h3 className="text-2xl font-light mb-4">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="min-h-screen py-32 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-5xl font-light mb-12 text-center">Our Approach</h2>
          <div className="space-y-8 text-lg text-gray-300 leading-relaxed">
            <p>
              At Ancestral Wisdom Healing, we honor the sacred traditions passed down through generations
              while integrating modern healing practices. Our work is rooted in the understanding that true
              healing addresses body, mind, and spirit as interconnected aspects of the whole self.
            </p>
            <p>
              Through years of dedicated study and practice, we bring together time-honored wisdom from
              diverse healing traditions. Each session is a sanctuary where you can safely explore your
              depths and activate your innate healing power.
            </p>
            <p>
              We believe in creating a space of deep presence, where ancient practices meet contemporary
              understanding, and where your unique healing journey is honored and supported.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="min-h-screen py-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl font-light mb-16 text-center">Client Experiences</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                text: "The ancestral healing work transformed my life. I finally released generational trauma I didn't even know I was carrying.",
                author: "Sarah M."
              },
              {
                text: "Beth's healing touch and intuitive approach created a transformative experience. I left feeling lighter and deeply at peace.",
                author: "Michael R."
              },
              {
                text: "The energy healing sessions opened my heart in ways I never thought possible. I feel whole for the first time.",
                author: "Jessica L."
              },
              {
                text: "Sound healing was unlike anything I've experienced. The vibrations reached places within me I didn't know needed healing.",
                author: "David K."
              }
            ].map((testimonial, i) => (
              <div key={i} className="p-8 border border-white/10 rounded-lg bg-black/40 backdrop-blur">
                <p className="text-lg italic mb-4 text-gray-300">"{testimonial.text}"</p>
                <p className="text-purple-400">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="min-h-screen py-32 px-6 flex items-center">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-5xl font-light mb-12 text-center">Get In Touch</h2>

          <form className="space-y-6">
            <div>
              <label className="block mb-2 text-sm">Name</label>
              <input type="text" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded focus:border-purple-400 focus:outline-none" />
            </div>

            <div>
              <label className="block mb-2 text-sm">Email</label>
              <input type="email" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded focus:border-purple-400 focus:outline-none" />
            </div>

            <div>
              <label className="block mb-2 text-sm">Service Interest</label>
              <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded focus:border-purple-400 focus:outline-none">
                <option>Body Work</option>
                <option>Energy Healing</option>
                <option>Sound Healing</option>
                <option>Reiki</option>
                <option>Ancestral Clearing</option>
                <option>Holistic Integration</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm">Message</label>
              <textarea rows={5} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded focus:border-purple-400 focus:outline-none"></textarea>
            </div>

            <button type="submit" className="w-full px-8 py-3 bg-purple-600 hover:bg-purple-700 transition rounded">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="container mx-auto text-center text-gray-500">
          <p>&copy; 2025 Ancestral Wisdom Healing. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
