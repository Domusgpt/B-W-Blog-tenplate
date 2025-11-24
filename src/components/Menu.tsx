import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';

interface MenuProps {
  sections: { id: string; label: string }[];
}

const Menu: React.FC<MenuProps> = ({ sections }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Animate menu items in
      gsap.fromTo(
        '.menu-item',
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.05, ease: 'power3.out' }
      );
    }
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-[100] border border-white px-6 py-2.5 text-sm tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-300 bg-black/30 backdrop-blur-sm"
      >
        {isOpen ? 'CLOSE' : 'MENU'}
      </button>

      {/* Menu Overlay */}
      <div
        className={`fixed inset-0 z-[90] bg-black/95 backdrop-blur-xl transition-all duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-end justify-center h-full pr-12 md:pr-24">
          <nav className="space-y-6">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="menu-item block text-right text-3xl md:text-5xl font-light hover:text-cyan-400 transition-colors duration-300 tracking-wide"
                style={{ fontFamily: 'serif', fontStyle: 'italic' }}
              >
                {section.label}
              </button>
            ))}
          </nav>

          {/* Contact in Menu */}
          <div className="mt-16 menu-item text-right">
            <a
              href="tel:6096619773"
              className="text-lg text-gray-400 hover:text-cyan-400 transition-colors block mb-2"
            >
              609-661-9773
            </a>
            <a
              href="mailto:ancestralwisdomhealing@gmail.com"
              className="text-sm text-gray-500 hover:text-cyan-400 transition-colors block"
            >
              ancestralwisdomhealing@gmail.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
