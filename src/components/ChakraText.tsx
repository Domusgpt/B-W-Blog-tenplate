import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ChakraTextProps {
  children: React.ReactNode;
  chakraColors?: string[];
  className?: string;
  animated?: boolean;
  glowOnHover?: boolean;
}

const ChakraText: React.FC<ChakraTextProps> = ({
  children,
  chakraColors = [
    '#C72C35', // Root
    '#E97132', // Sacral
    '#F5C645', // Solar
    '#65B891', // Heart
    '#5BA3DA', // Throat
    '#8B7AB8', // Third Eye
    '#E6C7EB'  // Crown
  ],
  className = '',
  animated = true,
  glowOnHover = true
}) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const currentColorIndex = useRef(0);

  useEffect(() => {
    if (!textRef.current || !animated) return;

    // Split text into characters for animation
    const text = textRef.current.textContent || '';
    const chars = text.split('');
    textRef.current.textContent = '';

    const charSpans = chars.map((char, index) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.display = 'inline-block';
      span.style.transition = 'all 0.3s ease';
      span.className = 'chakra-char';
      textRef.current?.appendChild(span);
      return span;
    });

    // Gradient flow animation on scroll
    ScrollTrigger.create({
      trigger: textRef.current,
      start: 'top 80%',
      end: 'bottom 20%',
      onEnter: () => {
        gsap.to(charSpans, {
          color: (i) => chakraColors[i % chakraColors.length],
          duration: 1.5,
          stagger: {
            each: 0.05,
            ease: 'power2.inOut'
          },
          ease: 'power2.inOut'
        });
      },
      onLeaveBack: () => {
        gsap.to(charSpans, {
          color: 'inherit',
          duration: 0.8,
          stagger: 0.02
        });
      }
    });

    // Hover effect on individual characters
    if (glowOnHover) {
      charSpans.forEach((span, index) => {
        span.addEventListener('mouseenter', () => {
          const color = chakraColors[index % chakraColors.length];
          gsap.to(span, {
            color: color,
            textShadow: `0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}`,
            scale: 1.2,
            duration: 0.3,
            ease: 'back.out(2)'
          });
        });

        span.addEventListener('mouseleave', () => {
          gsap.to(span, {
            textShadow: 'none',
            scale: 1,
            duration: 0.3,
            ease: 'power2.inOut'
          });
        });
      });
    }

    // Continuous color wave animation
    const colorWave = () => {
      const timeline = gsap.timeline({ repeat: -1 });

      charSpans.forEach((span, index) => {
        timeline.to(
          span,
          {
            color: () => {
              const colorIndex = (currentColorIndex.current + index) % chakraColors.length;
              return chakraColors[colorIndex];
            },
            duration: 2,
            ease: 'sine.inOut'
          },
          index * 0.05
        );
      });

      timeline.call(() => {
        currentColorIndex.current = (currentColorIndex.current + 1) % chakraColors.length;
      });
    };

    const waveAnimation = gsap.delayedCall(2, colorWave);

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      waveAnimation.kill();
    };
  }, [animated, chakraColors, glowOnHover]);

  return (
    <span ref={textRef} className={`chakra-text ${className}`}>
      {children}
    </span>
  );
};

export default ChakraText;
