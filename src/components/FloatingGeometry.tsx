import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface FloatingGeometryProps {
  particleCount?: number;
  chakraColors?: string[];
  speed?: number;
}

const FloatingGeometry: React.FC<FloatingGeometryProps> = ({
  particleCount = 20,
  chakraColors = [
    '#C72C35', // Root
    '#E97132', // Sacral
    '#F5C645', // Solar
    '#65B891', // Heart
    '#5BA3DA', // Throat
    '#8B7AB8', // Third Eye
    '#E6C7EB'  // Crown
  ],
  speed = 1
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const particles = containerRef.current.querySelectorAll('.floating-particle');

    particles.forEach((particle, index) => {
      // Random initial position
      const randomX = Math.random() * window.innerWidth;
      const randomY = Math.random() * window.innerHeight;

      gsap.set(particle, {
        x: randomX,
        y: randomY,
        opacity: Math.random() * 0.5 + 0.3,
        scale: Math.random() * 0.8 + 0.2
      });

      // Create infinite floating animation
      const duration = (20 + Math.random() * 20) / speed;
      const delay = Math.random() * 5;

      gsap.to(particle, {
        x: `+=${(Math.random() - 0.5) * 600}`,
        y: `+=${(Math.random() - 0.5) * 600}`,
        rotation: Math.random() * 360,
        duration: duration,
        delay: delay,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Pulsing opacity
      gsap.to(particle, {
        opacity: Math.random() * 0.3 + 0.1,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Slight scale animation
      gsap.to(particle, {
        scale: Math.random() * 0.5 + 0.5,
        duration: 4 + Math.random() * 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });

    return () => {
      gsap.killTweensOf('.floating-particle');
    };
  }, [speed]);

  const geometryTypes = [
    'triangle',
    'square',
    'pentagon',
    'hexagon',
    'circle',
    'star',
    'vesica'
  ];

  const renderGeometry = (type: string, color: string, size: number) => {
    const halfSize = size / 2;

    switch (type) {
      case 'triangle':
        return (
          <polygon
            points={`${halfSize},0 ${size},${size} 0,${size}`}
            fill="none"
            stroke={color}
            strokeWidth="1"
          />
        );

      case 'square':
        return (
          <rect
            x="0"
            y="0"
            width={size}
            height={size}
            fill="none"
            stroke={color}
            strokeWidth="1"
            transform={`rotate(45 ${halfSize} ${halfSize})`}
          />
        );

      case 'pentagon':
        const pentagonPoints = Array.from({ length: 5 }, (_, i) => {
          const angle = (i * 72 - 90) * Math.PI / 180;
          return `${halfSize + halfSize * Math.cos(angle)},${halfSize + halfSize * Math.sin(angle)}`;
        }).join(' ');
        return (
          <polygon
            points={pentagonPoints}
            fill="none"
            stroke={color}
            strokeWidth="1"
          />
        );

      case 'hexagon':
        const hexagonPoints = Array.from({ length: 6 }, (_, i) => {
          const angle = (i * 60) * Math.PI / 180;
          return `${halfSize + halfSize * Math.cos(angle)},${halfSize + halfSize * Math.sin(angle)}`;
        }).join(' ');
        return (
          <polygon
            points={hexagonPoints}
            fill="none"
            stroke={color}
            strokeWidth="1"
          />
        );

      case 'circle':
        return (
          <circle
            cx={halfSize}
            cy={halfSize}
            r={halfSize * 0.8}
            fill="none"
            stroke={color}
            strokeWidth="1"
          />
        );

      case 'star':
        const starPoints = Array.from({ length: 10 }, (_, i) => {
          const angle = (i * 36 - 90) * Math.PI / 180;
          const radius = i % 2 === 0 ? halfSize : halfSize * 0.4;
          return `${halfSize + radius * Math.cos(angle)},${halfSize + radius * Math.sin(angle)}`;
        }).join(' ');
        return (
          <polygon
            points={starPoints}
            fill="none"
            stroke={color}
            strokeWidth="1"
          />
        );

      case 'vesica':
        return (
          <>
            <circle
              cx={halfSize * 0.7}
              cy={halfSize}
              r={halfSize * 0.6}
              fill="none"
              stroke={color}
              strokeWidth="0.8"
            />
            <circle
              cx={halfSize * 1.3}
              cy={halfSize}
              r={halfSize * 0.6}
              fill="none"
              stroke={color}
              strokeWidth="0.8"
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
      style={{ mixBlendMode: 'screen' }}
    >
      {Array.from({ length: particleCount }).map((_, index) => {
        const geometryType = geometryTypes[Math.floor(Math.random() * geometryTypes.length)];
        const color = chakraColors[index % chakraColors.length];
        const size = 20 + Math.random() * 40;

        return (
          <div
            key={index}
            className="floating-particle absolute"
            style={{
              filter: `drop-shadow(0 0 8px ${color}60)`
            }}
          >
            <svg
              width={size}
              height={size}
              viewBox={`0 0 ${size} ${size}`}
            >
              {renderGeometry(geometryType, color, size)}
            </svg>
          </div>
        );
      })}
    </div>
  );
};

export default FloatingGeometry;
