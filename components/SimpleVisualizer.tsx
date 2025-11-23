import React, { useEffect, useRef } from 'react';

interface SimpleVisualizerProps {
  audioSrc?: string;
  variant?: number;
}

const SimpleVisualizer: React.FC<SimpleVisualizerProps> = ({ audioSrc, variant = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize audio context
    if (audioSrc) {
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;

      // Connect audio if provided
      const audio = new Audio(audioSrc);
      const source = audioContext.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      audio.play();
    }

    let time = 0;

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Get audio data
      let bass = 0, mid = 0, high = 0;
      if (analyserRef.current && dataArrayRef.current) {
        analyserRef.current.getByteFrequencyData(dataArrayRef.current);
        const data = dataArrayRef.current;
        const bassEnd = Math.floor(data.length * 0.1);
        const midEnd = Math.floor(data.length * 0.5);

        for (let i = 0; i < bassEnd; i++) bass += data[i];
        for (let i = bassEnd; i < midEnd; i++) mid += data[i];
        for (let i = midEnd; i < data.length; i++) high += data[i];

        bass = bass / bassEnd / 255;
        mid = mid / (midEnd - bassEnd) / 255;
        high = high / (data.length - midEnd) / 255;
      }

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw particles
      const particleCount = 100;
      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2 + time * 0.001;
        const radius = 100 + bass * 200 + Math.sin(time * 0.002 + i) * 50;

        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        const size = 2 + mid * 5;

        // Color based on audio
        const hue = (i / particleCount * 360 + time * 0.1) % 360;
        const saturation = 70 + high * 30;
        const lightness = 50 + bass * 30;

        ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();

        // Connect particles
        if (i > 0) {
          const prevAngle = ((i - 1) / particleCount) * Math.PI * 2 + time * 0.001;
          const prevRadius = 100 + bass * 200 + Math.sin(time * 0.002 + i - 1) * 50;
          const prevX = centerX + Math.cos(prevAngle) * prevRadius;
          const prevY = centerY + Math.sin(prevAngle) * prevRadius;

          ctx.strokeStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.2)`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(prevX, prevY);
          ctx.lineTo(x, y);
          ctx.stroke();
        }
      }

      time += 1;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [audioSrc, variant]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ background: '#000' }}
    />
  );
};

export default SimpleVisualizer;
