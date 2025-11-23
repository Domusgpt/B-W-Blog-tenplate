import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface ChakraMandalaNavProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const CHAKRA_SECTIONS = [
  { id: 'root', name: 'Home', color: '#C72C35', angle: 0 },
  { id: 'sacral', name: 'Services', color: '#E97132', angle: 51.43 },
  { id: 'solar', name: 'About', color: '#F5C645', angle: 102.86 },
  { id: 'heart', name: 'Testimonials', color: '#65B891', angle: 154.29 },
  { id: 'throat', name: 'Resources', color: '#5BA3DA', angle: 205.71 },
  { id: 'third-eye', name: 'Blog', color: '#8B7AB8', angle: 257.14 },
  { id: 'crown', name: 'Contact', color: '#E6C7EB', angle: 308.57 }
];

const ChakraMandalaNav: React.FC<ChakraMandalaNavProps> = ({ activeSection, onNavigate }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const time = { value: 0 };

    const drawMandala = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw sacred geometry patterns
      const layers = 7;
      const maxRadius = isOpen ? 140 : 80;

      for (let layer = 0; layer < layers; layer++) {
        const radius = (maxRadius / layers) * (layer + 1);
        const chakra = CHAKRA_SECTIONS[layer];
        const isActive = activeSection === chakra.id;
        const isHovered = hoveredSection === chakra.id;

        // Outer circle with chakra color
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = chakra.color;
        ctx.lineWidth = isActive ? 3 : (isHovered ? 2.5 : 1.5);
        ctx.globalAlpha = isActive ? 0.9 : (isHovered ? 0.7 : 0.4);
        ctx.stroke();

        // Animated rotating petals
        const petals = 6 + layer;
        for (let i = 0; i < petals; i++) {
          const angle = (Math.PI * 2 / petals) * i + time.value * 0.001 * (layer + 1);
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;

          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fillStyle = chakra.color;
          ctx.globalAlpha = isActive ? 0.8 : 0.3;
          ctx.fill();
        }

        // Draw sacred geometry connections
        if (isOpen) {
          for (let i = 0; i < petals; i++) {
            const angle1 = (Math.PI * 2 / petals) * i;
            const angle2 = (Math.PI * 2 / petals) * ((i + 2) % petals);

            const x1 = centerX + Math.cos(angle1) * radius;
            const y1 = centerY + Math.sin(angle1) * radius;
            const x2 = centerX + Math.cos(angle2) * radius;
            const y2 = centerY + Math.sin(angle2) * radius;

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = chakra.color;
            ctx.lineWidth = 0.5;
            ctx.globalAlpha = 0.2;
            ctx.stroke();
          }
        }
      }

      // Center point - energy source
      ctx.beginPath();
      ctx.arc(centerX, centerY, 5 + Math.sin(time.value * 0.003) * 2, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 10);
      gradient.addColorStop(0, '#FFFFFF');
      gradient.addColorStop(1, CHAKRA_SECTIONS.find(s => s.id === activeSection)?.color || '#FFFFFF');
      ctx.fillStyle = gradient;
      ctx.globalAlpha = 0.9;
      ctx.fill();

      time.value += 16;
      animationFrameRef.current = requestAnimationFrame(drawMandala);
    };

    drawMandala();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isOpen, activeSection, hoveredSection]);

  const toggleNav = () => {
    setIsOpen(!isOpen);

    if (containerRef.current) {
      gsap.to(containerRef.current, {
        scale: !isOpen ? 1.2 : 1,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)'
      });
    }
  };

  const handleSectionClick = (sectionId: string) => {
    onNavigate(sectionId);

    // Pulse animation on selection
    if (canvasRef.current) {
      gsap.fromTo(canvasRef.current,
        { scale: 1 },
        { scale: 1.1, duration: 0.3, yoyo: true, repeat: 1, ease: 'power2.inOut' }
      );
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed bottom-8 right-8 z-50"
      style={{ transformOrigin: 'center' }}
    >
      {/* Canvas for mandala visualization */}
      <canvas
        ref={canvasRef}
        width={320}
        height={320}
        className="cursor-pointer transition-all"
        onClick={toggleNav}
        style={{
          filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))',
          mixBlendMode: 'screen'
        }}
      />

      {/* Navigation buttons */}
      {isOpen && (
        <div className="absolute inset-0">
          {CHAKRA_SECTIONS.map((section, index) => {
            const radius = 120;
            const x = 160 + Math.cos((section.angle * Math.PI) / 180) * radius;
            const y = 160 + Math.sin((section.angle * Math.PI) / 180) * radius;

            return (
              <button
                key={section.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-full text-sm font-medium transition-all"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  backgroundColor: section.color,
                  color: '#000',
                  opacity: activeSection === section.id ? 1 : 0.7,
                  scale: activeSection === section.id ? 1.1 : 1,
                  boxShadow: `0 0 20px ${section.color}`
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSectionClick(section.id);
                }}
                onMouseEnter={() => setHoveredSection(section.id)}
                onMouseLeave={() => setHoveredSection(null)}
              >
                {section.name}
              </button>
            );
          })}
        </div>
      )}

      {/* Center toggle button */}
      <button
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center font-bold text-xs"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.8) 100%)',
          border: '2px solid rgba(255,255,255,0.3)',
          backdropFilter: 'blur(10px)'
        }}
        onClick={toggleNav}
      >
        {isOpen ? '✕' : '☰'}
      </button>
    </div>
  );
};

export default ChakraMandalaNav;
