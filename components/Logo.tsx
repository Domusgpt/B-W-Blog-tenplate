import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  animate?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 200, animate = true }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={`${className} ${animate ? 'logo-animate' : ''}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradient definitions for chakra colors */}
        <linearGradient id="chakraGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#C72C35', stopOpacity: 1 }} />
          <stop offset="16%" style={{ stopColor: '#E97132', stopOpacity: 1 }} />
          <stop offset="33%" style={{ stopColor: '#F5C645', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#65B891', stopOpacity: 1 }} />
          <stop offset="66%" style={{ stopColor: '#5BA3DA', stopOpacity: 1 }} />
          <stop offset="83%" style={{ stopColor: '#8B7AB8', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#E6C7EB', stopOpacity: 1 }} />
        </linearGradient>

        <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{ stopColor: '#FFFFFF', stopOpacity: 0.8 }} />
          <stop offset="50%" style={{ stopColor: '#E6C7EB', stopOpacity: 0.4 }} />
          <stop offset="100%" style={{ stopColor: '#8B7AB8', stopOpacity: 0 }} />
        </radialGradient>

        {/* Drop shadow filter */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Background glow */}
      <circle cx="100" cy="100" r="90" fill="url(#glowGradient)" opacity="0.3" className="logo-glow" />

      {/* Outer circle - Crown chakra */}
      <circle
        cx="100"
        cy="100"
        r="85"
        fill="none"
        stroke="#E6C7EB"
        strokeWidth="1.5"
        opacity="0.6"
        className="logo-ring logo-ring-1"
      />

      {/* Second circle - Third eye */}
      <circle
        cx="100"
        cy="100"
        r="72"
        fill="none"
        stroke="#8B7AB8"
        strokeWidth="1.5"
        opacity="0.7"
        className="logo-ring logo-ring-2"
      />

      {/* Third circle - Throat */}
      <circle
        cx="100"
        cy="100"
        r="59"
        fill="none"
        stroke="#5BA3DA"
        strokeWidth="1.5"
        opacity="0.8"
        className="logo-ring logo-ring-3"
      />

      {/* Flower of Life pattern - Sacred geometry */}
      <g className="logo-flower" opacity="0.4">
        {/* Center circle */}
        <circle cx="100" cy="100" r="20" fill="none" stroke="url(#chakraGradient)" strokeWidth="1" />

        {/* Six surrounding circles */}
        {[0, 60, 120, 180, 240, 300].map((angle, index) => {
          const x = 100 + 20 * Math.cos((angle * Math.PI) / 180);
          const y = 100 + 20 * Math.sin((angle * Math.PI) / 180);
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="20"
              fill="none"
              stroke="url(#chakraGradient)"
              strokeWidth="1"
              className={`logo-petal logo-petal-${index}`}
            />
          );
        })}
      </g>

      {/* Merkaba (Star Tetrahedron) - 3D sacred geometry */}
      <g className="logo-merkaba" opacity="0.6" filter="url(#glow)">
        {/* Upward triangle */}
        <path
          d="M 100 50 L 130 110 L 70 110 Z"
          fill="none"
          stroke="#F5C645"
          strokeWidth="2"
          className="logo-triangle-up"
        />
        {/* Downward triangle */}
        <path
          d="M 100 150 L 70 90 L 130 90 Z"
          fill="none"
          stroke="#5BA3DA"
          strokeWidth="2"
          className="logo-triangle-down"
        />
      </g>

      {/* Center point - Energy source */}
      <circle cx="100" cy="100" r="4" fill="#FFFFFF" className="logo-center" opacity="0.9">
        <animate
          attributeName="r"
          values="4;6;4"
          dur="3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.9;1;0.9"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Text - Ancestral Wisdom */}
      <text
        x="100"
        y="180"
        textAnchor="middle"
        fill="url(#chakraGradient)"
        fontSize="14"
        fontWeight="bold"
        letterSpacing="2"
        className="logo-text"
        style={{ fontFamily: 'Kelly Slab, serif' }}
      >
        ANCESTRAL
      </text>
      <text
        x="100"
        y="195"
        textAnchor="middle"
        fill="url(#chakraGradient)"
        fontSize="12"
        fontWeight="300"
        letterSpacing="3"
        className="logo-text-sub"
        style={{ fontFamily: 'Fahkwang, sans-serif' }}
      >
        WISDOM
      </text>

      <style>{`
        @keyframes logoRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes logoRotateReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        @keyframes logoPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        .logo-animate .logo-ring-1 {
          animation: logoRotate 30s linear infinite;
          transform-origin: 100px 100px;
        }

        .logo-animate .logo-ring-2 {
          animation: logoRotateReverse 25s linear infinite;
          transform-origin: 100px 100px;
        }

        .logo-animate .logo-ring-3 {
          animation: logoRotate 20s linear infinite;
          transform-origin: 100px 100px;
        }

        .logo-animate .logo-flower {
          animation: logoRotateReverse 40s linear infinite;
          transform-origin: 100px 100px;
        }

        .logo-animate .logo-merkaba {
          animation: logoRotate 15s linear infinite;
          transform-origin: 100px 100px;
        }

        .logo-animate .logo-glow {
          animation: logoPulse 4s ease-in-out infinite;
        }

        .logo-petal {
          animation: logoPulse 3s ease-in-out infinite;
        }

        .logo-petal-0 { animation-delay: 0s; }
        .logo-petal-1 { animation-delay: 0.5s; }
        .logo-petal-2 { animation-delay: 1s; }
        .logo-petal-3 { animation-delay: 1.5s; }
        .logo-petal-4 { animation-delay: 2s; }
        .logo-petal-5 { animation-delay: 2.5s; }
      `}</style>
    </svg>
  );
};

export default Logo;
