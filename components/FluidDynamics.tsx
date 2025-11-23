import React, { useEffect, useRef } from 'react';

interface FluidDynamicsProps {
  intensity?: number;
}

const FluidDynamics: React.FC<FluidDynamicsProps> = ({ intensity = 1.0 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const velocityRef = useRef<{x: number[][], y: number[][]}>({ x: [], y: [] });
  const densityRef = useRef<number[][]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 128; // Lower resolution for performance
    const height = 72;
    const scale = Math.min(canvas.width / width, canvas.height / height);

    // Initialize arrays
    const initArrays = () => {
      velocityRef.current = { x: [], y: [] };
      densityRef.current = [];

      for (let i = 0; i < width; i++) {
        velocityRef.current.x[i] = [];
        velocityRef.current.y[i] = [];
        densityRef.current[i] = [];
        for (let j = 0; j < height; j++) {
          velocityRef.current.x[i][j] = 0;
          velocityRef.current.y[i][j] = 0;
          densityRef.current[i][j] = 0;
        }
      }
    };

    initArrays();

    // Diffusion step
    const diffuse = (b: number, x: number[][], x0: number[][], diff: number, dt: number) => {
      const a = dt * diff * (width - 2) * (height - 2);
      const iterations = 4;

      for (let k = 0; k < iterations; k++) {
        for (let i = 1; i < width - 1; i++) {
          for (let j = 1; j < height - 1; j++) {
            x[i][j] = (x0[i][j] + a * (
              x[i - 1][j] + x[i + 1][j] +
              x[i][j - 1] + x[i][j + 1]
            )) / (1 + 4 * a);
          }
        }
      }
    };

    // Advection step
    const advect = (b: number, d: number[][], d0: number[][], velX: number[][], velY: number[][], dt: number) => {
      const dtx = dt * (width - 2);
      const dty = dt * (height - 2);

      for (let i = 1; i < width - 1; i++) {
        for (let j = 1; j < height - 1; j++) {
          let x = i - dtx * velX[i][j];
          let y = j - dty * velY[i][j];

          if (x < 0.5) x = 0.5;
          if (x > width - 1.5) x = width - 1.5;
          const i0 = Math.floor(x);
          const i1 = i0 + 1;

          if (y < 0.5) y = 0.5;
          if (y > height - 1.5) y = height - 1.5;
          const j0 = Math.floor(y);
          const j1 = j0 + 1;

          const s1 = x - i0;
          const s0 = 1 - s1;
          const t1 = y - j0;
          const t0 = 1 - t1;

          d[i][j] = s0 * (t0 * d0[i0][j0] + t1 * d0[i0][j1]) +
                    s1 * (t0 * d0[i1][j0] + t1 * d0[i1][j1]);
        }
      }
    };

    // Project step (make divergence free)
    const project = (velX: number[][], velY: number[][], p: number[][], div: number[][]) => {
      for (let i = 1; i < width - 1; i++) {
        for (let j = 1; j < height - 1; j++) {
          div[i][j] = -0.5 * (
            velX[i + 1][j] - velX[i - 1][j] +
            velY[i][j + 1] - velY[i][j - 1]
          ) / ((width + height) / 2);
          p[i][j] = 0;
        }
      }

      for (let k = 0; k < 4; k++) {
        for (let i = 1; i < width - 1; i++) {
          for (let j = 1; j < height - 1; j++) {
            p[i][j] = (div[i][j] + p[i - 1][j] + p[i + 1][j] +
                       p[i][j - 1] + p[i][j + 1]) / 4;
          }
        }
      }

      for (let i = 1; i < width - 1; i++) {
        for (let j = 1; j < height - 1; j++) {
          velX[i][j] -= 0.5 * (p[i + 1][j] - p[i - 1][j]) * width;
          velY[i][j] -= 0.5 * (p[i][j + 1] - p[i][j - 1]) * height;
        }
      }
    };

    // Chakra colors
    const chakraColors = [
      [199, 44, 53],    // Root
      [233, 113, 50],   // Sacral
      [245, 198, 69],   // Solar
      [101, 184, 145],  // Heart
      [91, 163, 218],   // Throat
      [139, 122, 184],  // Third Eye
      [230, 199, 235]   // Crown
    ];

    // Add forces periodically
    let time = 0;
    const addForces = () => {
      time += 0.1;

      // Add chakra-colored forces at different points
      for (let c = 0; c < 7; c++) {
        const angle = (c / 7) * Math.PI * 2 + time * 0.1;
        const radius = 20 + Math.sin(time * 0.5 + c) * 10;
        const x = Math.floor(width / 2 + Math.cos(angle) * radius);
        const y = Math.floor(height / 2 + Math.sin(angle) * radius);

        if (x > 0 && x < width && y > 0 && y < height) {
          const force = intensity * 0.5;
          velocityRef.current.x[x][y] += Math.cos(angle + Math.PI / 2) * force;
          velocityRef.current.y[x][y] += Math.sin(angle + Math.PI / 2) * force;

          // Add density with chakra color
          densityRef.current[x][y] = Math.max(densityRef.current[x][y], c / 7);
        }
      }
    };

    // Step simulation
    const step = (dt: number) => {
      const visc = 0.00001;
      const diff = 0.0001;

      // Temporary arrays
      const velX0: number[][] = JSON.parse(JSON.stringify(velocityRef.current.x));
      const velY0: number[][] = JSON.parse(JSON.stringify(velocityRef.current.y));
      const s: number[][] = JSON.parse(JSON.stringify(densityRef.current));
      const p: number[][] = Array(width).fill(0).map(() => Array(height).fill(0));
      const div: number[][] = Array(width).fill(0).map(() => Array(height).fill(0));

      // Velocity diffusion
      diffuse(1, velX0, velocityRef.current.x, visc, dt);
      diffuse(2, velY0, velocityRef.current.y, visc, dt);

      // Velocity projection
      project(velX0, velY0, p, div);

      // Velocity advection
      advect(1, velocityRef.current.x, velX0, velX0, velY0, dt);
      advect(2, velocityRef.current.y, velY0, velX0, velY0, dt);

      // Velocity projection again
      project(velocityRef.current.x, velocityRef.current.y, p, div);

      // Density diffusion and advection
      diffuse(0, s, densityRef.current, diff, dt);
      advect(0, densityRef.current, s, velocityRef.current.x, velocityRef.current.y, dt);

      // Fade density
      for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
          densityRef.current[i][j] *= 0.99;
        }
      }
    };

    // Render
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cellWidth = canvas.width / width;
      const cellHeight = canvas.height / height;

      for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
          const d = Math.min(densityRef.current[i][j], 1);
          if (d > 0.01) {
            const colorIndex = Math.floor(d * 7) % 7;
            const color = chakraColors[colorIndex];
            const alpha = d * 0.8;

            ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
            ctx.fillRect(i * cellWidth, j * cellHeight, cellWidth, cellHeight);
          }
        }
      }
    };

    // Animation loop
    let lastTime = Date.now();
    const animate = () => {
      const now = Date.now();
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      addForces();
      step(dt);
      render();

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      className="fixed top-0 left-0 w-full h-full pointer-events-none -z-5"
      style={{ mixBlendMode: 'screen', opacity: 0.3 }}
    />
  );
};

export default FluidDynamics;
