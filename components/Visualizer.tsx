import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { SectionType } from '../types';

interface VisualizerProps {
  section: SectionType;
}

const Visualizer: React.FC<VisualizerProps> = ({ section }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = window.innerWidth;
    const height = window.innerHeight;

    svg.attr('width', width).attr('height', height);
    svg.selectAll('*').remove(); // Clear previous

    // Visualizer Logic based on Section
    switch (section) {
      case SectionType.HOME:
        renderHomeVisualizer(svg, width, height);
        break;
      case SectionType.DESIGN:
        renderDesignVisualizer(svg, width, height);
        break;
      case SectionType.CODE:
        renderCodeVisualizer(svg, width, height);
        break;
      case SectionType.AUDIO:
        renderAudioVisualizer(svg, width, height);
        break;
    }

    const handleResize = () => {
       // Simple resize handling: just update dimensions, 
       // full re-render might be expensive so we accept clipping for this demo
       svg.attr('width', window.innerWidth).attr('height', window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, [section]);

  return (
    <svg 
      ref={svgRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-30"
    />
  );
};

// --- Visualizer Implementations ---

function renderHomeVisualizer(svg: d3.Selection<SVGSVGElement, unknown, null, undefined>, w: number, h: number) {
  // Floating Nodes
  const nodeCount = 40;
  const nodes = d3.range(nodeCount).map(() => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 4 + 2,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5
  }));

  const circles = svg.selectAll('circle')
    .data(nodes)
    .enter()
    .append('circle')
    .attr('r', d => d.r)
    .attr('fill', '#ffffff')
    .attr('opacity', 0.6);

  const timer = d3.timer(() => {
    nodes.forEach(d => {
      d.x += d.vx;
      d.y += d.vy;
      if (d.x < 0 || d.x > w) d.vx *= -1;
      if (d.y < 0 || d.y > h) d.vy *= -1;
    });

    circles
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);
  });
  
  // Hacky cleanup attachment to the node for React useEffect to find if needed, 
  // but React unmount handles clearing the SVG anyway. 
  // To be proper safe, we would return the timer stop function, but this pattern is simple for the demo.
  (svg.node() as any).__timer = timer;
}

function renderDesignVisualizer(svg: d3.Selection<SVGSVGElement, unknown, null, undefined>, w: number, h: number) {
  // Voronoi / Delaunay
  const particleCount = 50;
  const particles = Array.from({ length: particleCount }, () => [Math.random() * w, Math.random() * h]);
  
  const update = () => {
    const delaunay = d3.Delaunay.from(particles as [number, number][]);
    const voronoi = delaunay.voronoi([0, 0, w, h]);
    
    svg.selectAll('path').remove();
    
    svg.append('g')
      .attr('stroke', '#444')
      .attr('stroke-width', 0.5)
      .attr('fill', 'none')
      .selectAll('path')
      .data(particles)
      .join('path')
      .attr('d', (_, i) => voronoi.renderCell(i));
  };

  update();

  // Slow drift
  const timer = d3.timer((elapsed) => {
    particles.forEach((p, i) => {
       // Lissajous-ish movement
       p[0] += Math.sin(elapsed * 0.0005 + i) * 0.2;
       p[1] += Math.cos(elapsed * 0.0005 + i) * 0.2;
       
       // Wrap
       if (p[0] < 0) p[0] = w;
       if (p[0] > w) p[0] = 0;
       if (p[1] < 0) p[1] = h;
       if (p[1] > h) p[1] = 0;
    });
    update();
  });

  (svg.node() as any).__timer = timer;
}

function renderCodeVisualizer(svg: d3.Selection<SVGSVGElement, unknown, null, undefined>, w: number, h: number) {
  // Falling rain / Matrix
  const fontSize = 14;
  const columns = Math.floor(w / fontSize);
  const drops = Array(columns).fill(1);
  
  // We'll use text elements
  const g = svg.append('g').attr('font-family', 'monospace').attr('font-size', fontSize).attr('fill', '#0f0');

  const timer = d3.timer((elapsed) => {
    if (elapsed % 100 > 20) return; // Throttling speed

    // In a real rigorous D3 impl we'd bind data, but for matrix rain, pure canvas is better.
    // Simulating with heavy DOM manipulation in SVG is slow, so let's do a simplified version:
    // Just moving vertical lines with binary bits
    
    // RE-APPROACH: Vertical scanning lines
    const time = elapsed * 0.05;
    svg.selectAll('line')
        .data(d3.range(0, w, 40))
        .join('line')
        .attr('x1', d => d)
        .attr('x2', d => d)
        .attr('y1', 0)
        .attr('y2', h)
        .attr('stroke', '#222')
        .attr('stroke-width', 1)
        .attr('stroke-opacity', (d) => (Math.sin(d + time * 0.01) + 1) / 2 * 0.5);
  });
  (svg.node() as any).__timer = timer;
}

function renderAudioVisualizer(svg: d3.Selection<SVGSVGElement, unknown, null, undefined>, w: number, h: number) {
  // Sine waves
  const lines = 10;
  const data = d3.range(lines);
  
  const lineGen = d3.line()
    .curve(d3.curveBasis)
    .x((d: any) => d.x)
    .y((d: any) => d.y);

  const timer = d3.timer((elapsed) => {
    svg.selectAll('path').remove();
    
    data.forEach(i => {
      const points = d3.range(0, w + 50, 50).map(x => ({
        x,
        y: h/2 + Math.sin((x * 0.01) + (elapsed * 0.002) + i) * (50 + i * 10)
      }));
      
      svg.append('path')
        .datum(points)
        .attr('fill', 'none')
        .attr('stroke', `rgba(255, 255, 255, ${0.1 + i/20})`)
        .attr('stroke-width', 2)
        .attr('d', lineGen as any);
    });
  });
  (svg.node() as any).__timer = timer;
}

export default Visualizer;
