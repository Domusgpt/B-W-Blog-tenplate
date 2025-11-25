import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface SacredGeometryParallaxProps {
  isActive?: boolean;
  chakraColor?: string;
}

const SacredGeometryParallax: React.FC<SacredGeometryParallaxProps> = ({
  isActive = false,
  chakraColor = '#5BA3DA'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePos({ x, y });
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const layers = containerRef.current.querySelectorAll('.parallax-layer');

    layers.forEach((layer, index) => {
      const depth = (index + 1) * 0.15;
      const xOffset = (mousePos.x - 0.5) * 100 * depth;
      const yOffset = (mousePos.y - 0.5) * 100 * depth;
      const rotation = scrollProgress * 360 + (mousePos.x - 0.5) * 45;

      gsap.to(layer, {
        x: xOffset,
        y: yOffset,
        rotation: rotation,
        duration: 1.5,
        ease: 'power2.out'
      });
    });
  }, [mousePos, scrollProgress]);

  useEffect(() => {
    if (!containerRef.current || !isActive) return;

    gsap.to(containerRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'power3.out'
    });

    return () => {
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          ease: 'power2.in'
        });
      }
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-20 opacity-0"
      style={{ mixBlendMode: 'screen' }}
    >
      {/* Outer Mandala Ring */}
      <svg
        className="parallax-layer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        width="800"
        height="800"
        viewBox="0 0 800 800"
        style={{ filter: `drop-shadow(0 0 30px ${chakraColor}80)` }}
      >
        <circle
          cx="400"
          cy="400"
          r="350"
          fill="none"
          stroke={chakraColor}
          strokeWidth="1"
          opacity="0.3"
        />
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = 400 + 280 * Math.cos(angle);
          const y1 = 400 + 280 * Math.sin(angle);
          const x2 = 400 + 350 * Math.cos(angle);
          const y2 = 400 + 350 * Math.sin(angle);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={chakraColor}
              strokeWidth="1.5"
              opacity="0.4"
            />
          );
        })}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x = 400 + 315 * Math.cos(angle);
          const y = 400 + 315 * Math.sin(angle);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="20"
              fill="none"
              stroke={chakraColor}
              strokeWidth="1"
              opacity="0.5"
            />
          );
        })}
      </svg>

      {/* Middle Mandala Ring */}
      <svg
        className="parallax-layer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        width="600"
        height="600"
        viewBox="0 0 600 600"
        style={{ filter: `drop-shadow(0 0 25px ${chakraColor}60)` }}
      >
        <circle
          cx="300"
          cy="300"
          r="240"
          fill="none"
          stroke={chakraColor}
          strokeWidth="1.5"
          opacity="0.4"
        />
        {[...Array(8)].map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          const x1 = 300 + 180 * Math.cos(angle);
          const y1 = 300 + 180 * Math.sin(angle);
          const x2 = 300 + 240 * Math.cos(angle);
          const y2 = 300 + 240 * Math.sin(angle);
          return (
            <g key={i}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={chakraColor}
                strokeWidth="2"
                opacity="0.5"
              />
              <circle
                cx={x2}
                cy={y2}
                r="15"
                fill="none"
                stroke={chakraColor}
                strokeWidth="1.5"
                opacity="0.6"
              />
            </g>
          );
        })}
        {/* Flower of Life Pattern */}
        {[...Array(6)].map((_, i) => {
          const angle = (i * 60 * Math.PI) / 180;
          const x = 300 + 80 * Math.cos(angle);
          const y = 300 + 80 * Math.sin(angle);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="80"
              fill="none"
              stroke={chakraColor}
              strokeWidth="0.8"
              opacity="0.3"
            />
          );
        })}
      </svg>

      {/* Inner Mandala Core */}
      <svg
        className="parallax-layer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        width="400"
        height="400"
        viewBox="0 0 400 400"
        style={{ filter: `drop-shadow(0 0 20px ${chakraColor}90)` }}
      >
        <circle
          cx="200"
          cy="200"
          r="150"
          fill="none"
          stroke={chakraColor}
          strokeWidth="2"
          opacity="0.6"
        />
        <circle
          cx="200"
          cy="200"
          r="120"
          fill="none"
          stroke={chakraColor}
          strokeWidth="1.5"
          opacity="0.5"
        />
        {/* Sri Yantra inspired pattern */}
        {[...Array(9)].map((_, i) => {
          const points = 9;
          const angle1 = (i * (360 / points) * Math.PI) / 180;
          const angle2 = ((i + 4) * (360 / points) * Math.PI) / 180;
          const x1 = 200 + 120 * Math.cos(angle1);
          const y1 = 200 + 120 * Math.sin(angle1);
          const x2 = 200 + 120 * Math.cos(angle2);
          const y2 = 200 + 120 * Math.sin(angle2);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={chakraColor}
              strokeWidth="1"
              opacity="0.4"
            />
          );
        })}
        {/* Central star */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x = 200 + 60 * Math.cos(angle);
          const y = 200 + 60 * Math.sin(angle);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="5"
              fill={chakraColor}
              opacity="0.7"
            />
          );
        })}
        {/* Metatron's Cube elements */}
        <circle
          cx="200"
          cy="200"
          r="40"
          fill="none"
          stroke={chakraColor}
          strokeWidth="2"
          opacity="0.8"
        />
        <circle
          cx="200"
          cy="200"
          r="10"
          fill={chakraColor}
          opacity="0.9"
        />
      </svg>

      {/* Rotating Sacred Symbols Layer */}
      <svg
        className="parallax-layer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        width="300"
        height="300"
        viewBox="0 0 300 300"
        style={{
          filter: `drop-shadow(0 0 15px ${chakraColor})`,
          animation: 'spin-slow 40s linear infinite reverse'
        }}
      >
        {/* Merkaba star tetrahedron */}
        <path
          d="M 150 50 L 200 150 L 150 120 L 100 150 Z"
          fill="none"
          stroke={chakraColor}
          strokeWidth="1.5"
          opacity="0.5"
        />
        <path
          d="M 150 250 L 200 150 L 150 180 L 100 150 Z"
          fill="none"
          stroke={chakraColor}
          strokeWidth="1.5"
          opacity="0.5"
        />
      </svg>
    </div>
  );
};

export default SacredGeometryParallax;
