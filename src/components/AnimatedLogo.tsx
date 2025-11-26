import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface AnimatedLogoProps {
  size?: number;
  chakraColors?: string[];
  className?: string;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  size = 200,
  chakraColors = [
    '#C72C35', // Root
    '#E97132', // Sacral
    '#F5C645', // Solar
    '#65B891', // Heart
    '#5BA3DA', // Throat
    '#8B7AB8', // Third Eye
    '#E6C7EB'  // Crown
  ],
  className = ''
}) => {
  const logoRef = useRef<SVGSVGElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  useEffect(() => {
    if (!logoRef.current) return;

    // Continuous rotation of outer rings
    gsap.to('.outer-ring', {
      rotation: 360,
      duration: 30,
      repeat: -1,
      ease: 'none',
      transformOrigin: 'center center'
    });

    gsap.to('.middle-ring', {
      rotation: -360,
      duration: 45,
      repeat: -1,
      ease: 'none',
      transformOrigin: 'center center'
    });

    gsap.to('.inner-ring', {
      rotation: 360,
      duration: 60,
      repeat: -1,
      ease: 'none',
      transformOrigin: 'center center'
    });

    // Pulsing glow effect
    gsap.to('.glow-circle', {
      scale: 1.1,
      opacity: 0.3,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      transformOrigin: 'center center'
    });

    // Metatron's cube lines breathing effect
    gsap.to('.metatron-line', {
      strokeWidth: 1.5,
      opacity: 0.8,
      duration: 3,
      repeat: -1,
      yoyo: true,
      stagger: 0.1,
      ease: 'sine.inOut'
    });

    // Color cycle animation
    const colorInterval = setInterval(() => {
      setCurrentColorIndex((prev) => (prev + 1) % chakraColors.length);
    }, 3000);

    return () => {
      clearInterval(colorInterval);
      gsap.killTweensOf('.outer-ring');
      gsap.killTweensOf('.middle-ring');
      gsap.killTweensOf('.inner-ring');
      gsap.killTweensOf('.glow-circle');
      gsap.killTweensOf('.metatron-line');
    };
  }, [chakraColors]);

  useEffect(() => {
    if (!logoRef.current) return;

    if (isHovered) {
      gsap.to('.vertex-point', {
        scale: 1.5,
        duration: 0.3,
        stagger: 0.05,
        ease: 'back.out(2)',
        transformOrigin: 'center center'
      });

      gsap.to('.sacred-symbol', {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.5)',
        transformOrigin: 'center center'
      });
    } else {
      gsap.to('.vertex-point', {
        scale: 1,
        duration: 0.3,
        ease: 'power2.inOut',
        transformOrigin: 'center center'
      });

      gsap.to('.sacred-symbol', {
        opacity: 0.5,
        scale: 0.8,
        duration: 0.3,
        ease: 'power2.inOut',
        transformOrigin: 'center center'
      });
    }
  }, [isHovered]);

  const currentColor = chakraColors[currentColorIndex];
  const center = size / 2;

  // Metatron's Cube vertices (13 circles in sacred geometry pattern)
  const metatronVertices = [
    { x: center, y: center }, // Center
    { x: center, y: center - 60 }, // Top
    { x: center + 52, y: center - 30 }, // Top-right
    { x: center + 52, y: center + 30 }, // Bottom-right
    { x: center, y: center + 60 }, // Bottom
    { x: center - 52, y: center + 30 }, // Bottom-left
    { x: center - 52, y: center - 30 }, // Top-left
    // Outer hexagon
    { x: center, y: center - 90 },
    { x: center + 78, y: center - 45 },
    { x: center + 78, y: center + 45 },
    { x: center, y: center + 90 },
    { x: center - 78, y: center + 45 },
    { x: center - 78, y: center - 45 }
  ];

  // Generate Metatron's Cube connecting lines
  const metatronLines = [];
  for (let i = 0; i < metatronVertices.length; i++) {
    for (let j = i + 1; j < metatronVertices.length; j++) {
      // Connect specific pairs to form Metatron's Cube
      if (
        (i === 0 && j < 7) || // Center to inner hexagon
        (i < 7 && j >= 7 && j < 13) || // Inner to outer
        (i >= 1 && i < 7 && j === ((i % 6) + 1) && j < 7) || // Inner hexagon
        (i >= 7 && i < 13 && j === ((i - 7 + 1) % 6 + 7)) // Outer hexagon
      ) {
        metatronLines.push({
          x1: metatronVertices[i].x,
          y1: metatronVertices[i].y,
          x2: metatronVertices[j].x,
          y2: metatronVertices[j].y,
          key: `${i}-${j}`
        });
      }
    }
  }

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        ref={logoRef}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="relative z-10"
        style={{ filter: `drop-shadow(0 0 20px ${currentColor}40)` }}
      >
        {/* Glow circles */}
        <circle
          className="glow-circle"
          cx={center}
          cy={center}
          r="95"
          fill="none"
          stroke={currentColor}
          strokeWidth="0.5"
          opacity="0.2"
        />

        {/* Outer rotating ring - Flower of Life pattern */}
        <g className="outer-ring">
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x = center + 80 * Math.cos(angle);
            const y = center + 80 * Math.sin(angle);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="15"
                fill="none"
                stroke={chakraColors[i % chakraColors.length]}
                strokeWidth="0.8"
                opacity="0.4"
              />
            );
          })}
        </g>

        {/* Middle rotating ring - Seed of Life */}
        <g className="middle-ring">
          <circle
            cx={center}
            cy={center}
            r="50"
            fill="none"
            stroke={currentColor}
            strokeWidth="1.5"
            opacity="0.5"
          />
          {[...Array(6)].map((_, i) => {
            const angle = (i * 60 * Math.PI) / 180;
            const x = center + 35 * Math.cos(angle);
            const y = center + 35 * Math.sin(angle);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="35"
                fill="none"
                stroke={chakraColors[(i + currentColorIndex) % chakraColors.length]}
                strokeWidth="1"
                opacity="0.4"
              />
            );
          })}
        </g>

        {/* Metatron's Cube lines */}
        {metatronLines.map((line, i) => (
          <line
            key={line.key}
            className="metatron-line"
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={chakraColors[i % chakraColors.length]}
            strokeWidth="0.8"
            opacity="0.5"
          />
        ))}

        {/* Metatron's Cube vertices */}
        {metatronVertices.map((vertex, i) => (
          <circle
            key={i}
            className="vertex-point"
            cx={vertex.x}
            cy={vertex.y}
            r={i === 0 ? "8" : "5"}
            fill={chakraColors[i % chakraColors.length]}
            opacity="0.7"
            style={{ transformOrigin: `${vertex.x}px ${vertex.y}px` }}
          />
        ))}

        {/* Inner rotating ring - Sacred symbols */}
        <g className="inner-ring">
          {/* Vesica Piscis in center */}
          <ellipse
            className="sacred-symbol"
            cx={center - 10}
            cy={center}
            rx="20"
            ry="30"
            fill="none"
            stroke={currentColor}
            strokeWidth="1"
            opacity="0.5"
          />
          <ellipse
            className="sacred-symbol"
            cx={center + 10}
            cy={center}
            rx="20"
            ry="30"
            fill="none"
            stroke={currentColor}
            strokeWidth="1"
            opacity="0.5"
          />

          {/* Center point */}
          <circle
            cx={center}
            cy={center}
            r="4"
            fill={currentColor}
            opacity="0.9"
          />
        </g>

        {/* Outer protective circle */}
        <circle
          cx={center}
          cy={center}
          r="95"
          fill="none"
          stroke={currentColor}
          strokeWidth="1"
          opacity="0.6"
        />
      </svg>

      {/* Additional glow effect */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${currentColor}20, transparent 70%)`,
          filter: 'blur(15px)',
          transition: 'background 1s ease'
        }}
      />
    </div>
  );
};

export default AnimatedLogo;
