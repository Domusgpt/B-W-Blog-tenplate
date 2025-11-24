import React, { useEffect, useRef } from 'react';
import { HolographicVisualizer } from '../vib3d/holograms/HolographicVisualizer.js';

interface Vib3DVisualizerProps {
  variant?: number;
  role?: string;
  reactivity?: number;
  className?: string;
}

export const Vib3DVisualizer: React.FC<Vib3DVisualizerProps> = ({
  variant = 0,
  role = 'content',
  reactivity = 1.0,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const visualizerRef = useRef<HolographicVisualizer | null>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvasId = `vib3d-canvas-${Math.random().toString(36).substr(2, 9)}`;
    canvasRef.current.id = canvasId;

    try {
      // Initialize the holographic visualizer
      visualizerRef.current = new HolographicVisualizer(canvasId, role, reactivity, variant);

      // Animation loop
      const animate = () => {
        if (visualizerRef.current) {
          visualizerRef.current.render();
          animationFrameRef.current = requestAnimationFrame(animate);
        }
      };
      animate();

      // Handle window resize
      const handleResize = () => {
        if (visualizerRef.current) {
          visualizerRef.current.resize();
        }
      };
      window.addEventListener('resize', handleResize);

      // Scroll reactivity
      const handleScroll = () => {
        if (visualizerRef.current) {
          const scrollY = window.scrollY;
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;

          visualizerRef.current.scrollPosition = scrollProgress;
          visualizerRef.current.scrollVelocity = Math.abs(scrollProgress - (visualizerRef.current.scrollPosition || 0));
        }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
      };
    } catch (error) {
      console.error('Failed to initialize Vib3D visualizer:', error);
    }
  }, [variant, role, reactivity]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full -z-10 ${className}`}
      style={{ background: '#000' }}
    />
  );
};

export default Vib3DVisualizer;
