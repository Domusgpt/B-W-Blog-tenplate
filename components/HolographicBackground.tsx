import React, { useEffect, useRef } from 'react';

interface HolographicBackgroundProps {
  variant?: number;
  intensity?: number;
  scrollProgress?: number;
}

const HolographicBackground: React.FC<HolographicBackgroundProps> = ({
  variant = 0,
  intensity = 0.5,
  scrollProgress = 0
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const animationFrameRef = useRef<number>();
  const startTimeRef = useRef<number>(Date.now());
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize WebGL
    const gl = canvas.getContext('webgl', {
      alpha: true,
      depth: false,
      antialias: false,
      preserveDrawingBuffer: false
    });

    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    glRef.current = gl;

    // Vertex shader
    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment shader with 4D geometry and chakra colors
    const fragmentShaderSource = `
      precision highp float;

      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform float u_variant;
      uniform float u_intensity;
      uniform float u_scroll;

      // 4D rotation matrices
      mat4 rotateXW(float theta) {
        float c = cos(theta);
        float s = sin(theta);
        return mat4(c, 0, 0, -s, 0, 1, 0, 0, 0, 0, 1, 0, s, 0, 0, c);
      }

      mat4 rotateYW(float theta) {
        float c = cos(theta);
        float s = sin(theta);
        return mat4(1, 0, 0, 0, 0, c, 0, -s, 0, 0, 1, 0, 0, s, 0, c);
      }

      mat4 rotateZW(float theta) {
        float c = cos(theta);
        float s = sin(theta);
        return mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, c, -s, 0, 0, s, c);
      }

      // Project 4D to 3D
      vec3 project4D(vec4 p) {
        float w = 2.5 / (2.5 + p.w);
        return vec3(p.xyz * w);
      }

      // Chakra color palette
      vec3 getChakraColor(float index) {
        if (index < 1.0) return vec3(0.78, 0.17, 0.21); // Root - Red
        else if (index < 2.0) return vec3(0.91, 0.44, 0.20); // Sacral - Orange
        else if (index < 3.0) return vec3(0.96, 0.78, 0.27); // Solar - Yellow
        else if (index < 4.0) return vec3(0.40, 0.72, 0.57); // Heart - Green
        else if (index < 5.0) return vec3(0.36, 0.64, 0.85); // Throat - Blue
        else if (index < 6.0) return vec3(0.55, 0.48, 0.72); // Third Eye - Indigo
        else return vec3(0.90, 0.78, 0.92); // Crown - Violet
      }

      // Hypercube geometry
      float sdHypercube(vec3 p, float size) {
        vec4 p4 = vec4(p, sin(u_time * 0.0003 + u_scroll * 0.1) * 2.0);

        // Apply 4D rotations
        p4 = rotateXW(u_time * 0.0002 + u_mouse.x * 0.5) * p4;
        p4 = rotateYW(u_time * 0.00015 + u_mouse.y * 0.5) * p4;
        p4 = rotateZW(u_time * 0.00025 + u_scroll * 0.05) * p4;

        vec3 p3 = project4D(p4);
        vec3 d = abs(p3) - vec3(size);
        return min(max(d.x, max(d.y, d.z)), 0.0) + length(max(d, 0.0));
      }

      // Torus geometry
      float sdTorus(vec3 p, vec2 t) {
        vec2 q = vec2(length(p.xz) - t.x, p.y);
        return length(q) - t.y;
      }

      // Sphere geometry
      float sdSphere(vec3 p, float r) {
        return length(p) - r;
      }

      // Sacred geometry field
      float geometryField(vec3 p) {
        float variant = floor(u_variant);
        float time = u_time * 0.0001;

        // Rotate the entire field
        float angle = time + u_scroll * 0.1;
        mat3 rot = mat3(
          cos(angle), 0, sin(angle),
          0, 1, 0,
          -sin(angle), 0, cos(angle)
        );
        p = rot * p;

        float d = 1000.0;

        if (variant < 3.0) {
          // Hypercube and variants
          d = sdHypercube(p, 1.0 + sin(time * 3.0) * 0.2);
        } else if (variant < 5.0) {
          // Torus
          d = sdTorus(p, vec2(1.5, 0.5 + sin(time * 2.0) * 0.1));
        } else {
          // Sphere with ripples
          d = sdSphere(p, 1.2 + sin(time * 4.0) * 0.1);
          d += sin(p.x * 10.0 + time * 5.0) * 0.05;
          d += sin(p.y * 10.0 + time * 4.0) * 0.05;
          d += sin(p.z * 10.0 + time * 3.0) * 0.05;
        }

        return d;
      }

      // Ray marching
      vec3 raymarch(vec3 ro, vec3 rd) {
        float t = 0.0;
        vec3 color = vec3(0.0);

        for (int i = 0; i < 64; i++) {
          vec3 p = ro + rd * t;
          float d = geometryField(p);

          if (d < 0.01) {
            // Hit - calculate color based on position and chakra flow
            float chakraIndex = mod(p.y * 3.0 + u_time * 0.0005 + u_scroll, 7.0);
            vec3 chakraColor = getChakraColor(chakraIndex);

            // Add energy flow effect
            float flow = sin(p.y * 5.0 + u_time * 0.001 + u_scroll * 2.0) * 0.5 + 0.5;
            color = mix(chakraColor * 0.5, chakraColor, flow);
            color *= u_intensity;
            break;
          }

          if (t > 20.0) break;

          // Accumulate color along the ray
          float chakraIndex = mod(t * 0.5 + u_time * 0.0005 + u_scroll, 7.0);
          vec3 chakraColor = getChakraColor(chakraIndex);
          color += chakraColor * 0.002 * u_intensity / (1.0 + d * d);

          t += d * 0.5;
        }

        return color;
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy - u_resolution * 0.5) / u_resolution.y;

        // Camera setup
        vec3 ro = vec3(0.0, 0.0, 5.0);
        vec3 rd = normalize(vec3(uv, -1.5));

        // Add mouse influence to camera
        ro.x += (u_mouse.x - 0.5) * 2.0;
        ro.y += (u_mouse.y - 0.5) * 2.0;

        // Ray march the scene
        vec3 color = raymarch(ro, rd);

        // Add gradient background
        float gradient = uv.y * 0.5 + 0.5;
        vec3 bgColor = mix(
          vec3(0.05, 0.0, 0.1),
          vec3(0.0, 0.05, 0.15),
          gradient
        );

        color += bgColor * 0.3;

        // Vignette
        float vignette = 1.0 - length(uv) * 0.3;
        color *= vignette;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Compile shaders
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    // Create program
    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    programRef.current = program;

    // Create buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1, -1,
      1, -1,
      -1, 1,
      1, 1
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Get uniform locations
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const mouseLocation = gl.getUniformLocation(program, 'u_mouse');
    const variantLocation = gl.getUniformLocation(program, 'u_variant');
    const intensityLocation = gl.getUniformLocation(program, 'u_intensity');
    const scrollLocation = gl.getUniformLocation(program, 'u_scroll');

    // Resize handler
    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener('resize', resize);

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: 1.0 - e.clientY / window.innerHeight
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Render loop
    const render = () => {
      if (!gl || !program) return;

      const time = Date.now() - startTimeRef.current;

      gl.uniform2f(resolutionLocation, canvas!.width, canvas!.height);
      gl.uniform1f(timeLocation, time);
      gl.uniform2f(mouseLocation, mouseRef.current.x, mouseRef.current.y);
      gl.uniform1f(variantLocation, variant);
      gl.uniform1f(intensityLocation, intensity);
      gl.uniform1f(scrollLocation, scrollProgress);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [variant, intensity, scrollProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ mixBlendMode: 'screen', opacity: 0.6 }}
    />
  );
};

export default HolographicBackground;
