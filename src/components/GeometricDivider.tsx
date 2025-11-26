import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GeometricDividerProps {
  variant?: 'seed-of-life' | 'vesica-piscis' | 'triangle-grid' | 'hexagon-flower';
  color?: string;
  className?: string;
}

const GeometricDivider: React.FC<GeometricDividerProps> = ({
  variant = 'seed-of-life',
  color = '#5BA3DA',
  className = ''
}) => {
  const dividerRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!dividerRef.current) return;

    // Animate on scroll
    gsap.fromTo(
      dividerRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: dividerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Continuous pulse animation
    gsap.to(dividerRef.current.querySelectorAll('.pulse-element'), {
      opacity: 0.3,
      scale: 1.05,
      duration: 2,
      repeat: -1,
      yoyo: true,
      stagger: 0.15,
      ease: 'sine.inOut',
      transformOrigin: 'center center'
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const renderSeedOfLife = () => {
    const center = 50;
    const radius = 15;
    return (
      <>
        {/* Center circle */}
        <circle
          className="pulse-element"
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          opacity="0.6"
        />
        {/* 6 surrounding circles forming Seed of Life */}
        {[...Array(6)].map((_, i) => {
          const angle = (i * 60 * Math.PI) / 180;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          return (
            <circle
              key={i}
              className="pulse-element"
              cx={x}
              cy={y}
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth="0.5"
              opacity="0.5"
            />
          );
        })}
        {/* Outer protective circle */}
        <circle
          cx={center}
          cy={center}
          r={radius * 2}
          fill="none"
          stroke={color}
          strokeWidth="0.3"
          opacity="0.4"
        />
      </>
    );
  };

  const renderVesicaPiscis = () => {
    return (
      <>
        {/* Left circle */}
        <circle
          className="pulse-element"
          cx="35"
          cy="50"
          r="25"
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          opacity="0.6"
        />
        {/* Right circle */}
        <circle
          className="pulse-element"
          cx="65"
          cy="50"
          r="25"
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          opacity="0.6"
        />
        {/* Center vertical line through vesica piscis */}
        <line
          x1="50"
          y1="25"
          x2="50"
          y2="75"
          stroke={color}
          strokeWidth="0.3"
          opacity="0.4"
        />
        {/* Sacred geometry points */}
        <circle cx="50" cy="50" r="2" fill={color} opacity="0.8" />
        <circle cx="50" cy="34" r="1.5" fill={color} opacity="0.6" />
        <circle cx="50" cy="66" r="1.5" fill={color} opacity="0.6" />
      </>
    );
  };

  const renderTriangleGrid = () => {
    const points = [];
    const size = 100;
    const step = 15;

    for (let y = 10; y < size - 10; y += step) {
      for (let x = 10; x < size - 10; x += step) {
        points.push({ x, y });
      }
    }

    return (
      <>
        {points.map((point, i) => (
          <g key={i}>
            {/* Upward triangle */}
            <path
              className="pulse-element"
              d={`M ${point.x} ${point.y} L ${point.x + step} ${point.y} L ${point.x + step/2} ${point.y - step * 0.866} Z`}
              fill="none"
              stroke={color}
              strokeWidth="0.3"
              opacity="0.4"
            />
            {/* Downward triangle */}
            {i % 2 === 0 && (
              <path
                className="pulse-element"
                d={`M ${point.x} ${point.y} L ${point.x + step} ${point.y} L ${point.x + step/2} ${point.y + step * 0.866} Z`}
                fill="none"
                stroke={color}
                strokeWidth="0.3"
                opacity="0.3"
              />
            )}
          </g>
        ))}
      </>
    );
  };

  const renderHexagonFlower = () => {
    const center = 50;
    const radius = 12;
    const hexPoints = (cx: number, cy: number, r: number) => {
      const points = [];
      for (let i = 0; i < 6; i++) {
        const angle = (i * 60 * Math.PI) / 180;
        points.push({
          x: cx + r * Math.cos(angle),
          y: cy + r * Math.sin(angle)
        });
      }
      return points.map(p => `${p.x},${p.y}`).join(' ');
    };

    return (
      <>
        {/* Center hexagon */}
        <polygon
          className="pulse-element"
          points={hexPoints(center, center, radius)}
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          opacity="0.6"
        />
        {/* Surrounding hexagons */}
        {[...Array(6)].map((_, i) => {
          const angle = (i * 60 * Math.PI) / 180;
          const x = center + radius * 1.73 * Math.cos(angle);
          const y = center + radius * 1.73 * Math.sin(angle);
          return (
            <polygon
              key={i}
              className="pulse-element"
              points={hexPoints(x, y, radius)}
              fill="none"
              stroke={color}
              strokeWidth="0.4"
              opacity="0.5"
            />
          );
        })}
        {/* Connecting lines */}
        {[...Array(6)].map((_, i) => {
          const angle = (i * 60 * Math.PI) / 180;
          const x = center + radius * 1.73 * Math.cos(angle);
          const y = center + radius * 1.73 * Math.sin(angle);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke={color}
              strokeWidth="0.2"
              opacity="0.3"
            />
          );
        })}
      </>
    );
  };

  const renderVariant = () => {
    switch (variant) {
      case 'seed-of-life':
        return renderSeedOfLife();
      case 'vesica-piscis':
        return renderVesicaPiscis();
      case 'triangle-grid':
        return renderTriangleGrid();
      case 'hexagon-flower':
        return renderHexagonFlower();
      default:
        return renderSeedOfLife();
    }
  };

  return (
    <div className={`flex justify-center items-center py-8 ${className}`}>
      <svg
        ref={dividerRef}
        width="200"
        height="100"
        viewBox="0 0 100 100"
        style={{ filter: `drop-shadow(0 0 10px ${color}40)` }}
      >
        {renderVariant()}
      </svg>
    </div>
  );
};

export default GeometricDivider;
