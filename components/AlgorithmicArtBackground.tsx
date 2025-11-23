import React, { useEffect, useRef } from 'react';

interface AlgorithmicArtBackgroundProps {
  complexity?: number;
  scrollProgress?: number;
}

const AlgorithmicArtBackground: React.FC<AlgorithmicArtBackgroundProps> = ({
  complexity = 1,
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

    const gl = canvas.getContext('webgl', {
      alpha: true,
      depth: false,
      antialias: false,
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance'
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

    // Advanced Fragment shader with algorithmic art
    const fragmentShaderSource = `
      precision highp float;

      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform float u_complexity;
      uniform float u_scroll;

      // Noise functions for generative art
      float hash(float n) {
        return fract(sin(n) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);

        float a = hash(i.x + i.y * 57.0);
        float b = hash(i.x + 1.0 + i.y * 57.0);
        float c = hash(i.x + (i.y + 1.0) * 57.0);
        float d = hash(i.x + 1.0 + (i.y + 1.0) * 57.0);

        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 1.0;

        for(int i = 0; i < 6; i++) {
          value += amplitude * noise(p * frequency);
          frequency *= 2.0;
          amplitude *= 0.5;
        }

        return value;
      }

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

      // Signed distance functions for procedural geometry
      float sdTorus(vec3 p, vec2 t) {
        vec2 q = vec2(length(p.xz) - t.x, p.y);
        return length(q) - t.y;
      }

      float sdSphere(vec3 p, float r) {
        return length(p) - r;
      }

      float sdBox(vec3 p, vec3 b) {
        vec3 d = abs(p) - b;
        return min(max(d.x, max(d.y, d.z)), 0.0) + length(max(d, 0.0));
      }

      float sdOctahedron(vec3 p, float s) {
        p = abs(p);
        return (p.x + p.y + p.z - s) * 0.57735027;
      }

      // Smooth minimum for blending shapes
      float smin(float a, float b, float k) {
        float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
        return mix(b, a, h) - k * h * (1.0 - h);
      }

      // Complex algorithmic scene
      float scene(vec3 p) {
        float time = u_time * 0.0002;

        // Rotating 4D space
        vec4 p4 = vec4(p, sin(time * 2.0 + u_scroll * 0.5) * 2.0);
        p4 = rotateXW(time + u_mouse.x) * p4;
        p4 = rotateYW(time * 0.7 + u_mouse.y) * p4;
        p4 = rotateZW(time * 0.5 + u_scroll * 0.1) * p4;
        vec3 p3 = project4D(p4);

        // Organic noise-based distortion
        float noiseDisp = fbm(p3.xy * 2.0 + time) * 0.3;
        p3 += vec3(
          noiseDisp * sin(time * 3.0),
          noiseDisp * cos(time * 2.5),
          noiseDisp * sin(time * 1.8)
        );

        // Multiple geometric primitives blended together
        float d1 = sdTorus(p3, vec2(1.5, 0.4 + sin(time * 2.0) * 0.1));
        float d2 = sdSphere(p3 - vec3(sin(time * 1.5), cos(time * 2.0), 0.0), 0.8);
        float d3 = sdOctahedron(p3, 1.2 + sin(time) * 0.2);
        float d4 = sdBox(p3, vec3(0.7 + sin(time * 1.3) * 0.2));

        // Blend with smooth minimum
        float d = smin(d1, d2, 0.3);
        d = smin(d, d3, 0.4);
        d = smin(d, d4, 0.5);

        // Add procedural detail
        d += sin(p3.x * 10.0 + time * 5.0) * sin(p3.y * 10.0 + time * 4.0) * sin(p3.z * 10.0 + time * 3.0) * 0.02;

        return d;
      }

      // Chakra color palette
      vec3 getChakraColor(float t) {
        t = mod(t, 7.0);
        if (t < 1.0) return mix(vec3(0.78, 0.17, 0.21), vec3(0.91, 0.44, 0.20), fract(t));
        else if (t < 2.0) return mix(vec3(0.91, 0.44, 0.20), vec3(0.96, 0.78, 0.27), fract(t));
        else if (t < 3.0) return mix(vec3(0.96, 0.78, 0.27), vec3(0.40, 0.72, 0.57), fract(t));
        else if (t < 4.0) return mix(vec3(0.40, 0.72, 0.57), vec3(0.36, 0.64, 0.85), fract(t));
        else if (t < 5.0) return mix(vec3(0.36, 0.64, 0.85), vec3(0.55, 0.48, 0.72), fract(t));
        else if (t < 6.0) return mix(vec3(0.55, 0.48, 0.72), vec3(0.90, 0.78, 0.92), fract(t));
        else return mix(vec3(0.90, 0.78, 0.92), vec3(0.78, 0.17, 0.21), fract(t));
      }

      // Calculate normal for lighting
      vec3 calcNormal(vec3 p) {
        vec2 e = vec2(0.001, 0.0);
        return normalize(vec3(
          scene(p + e.xyy) - scene(p - e.xyy),
          scene(p + e.yxy) - scene(p - e.yxy),
          scene(p + e.yyx) - scene(p - e.yyx)
        ));
      }

      // Ray marching
      vec3 raymarch(vec3 ro, vec3 rd) {
        float t = 0.0;
        vec3 color = vec3(0.0);
        float glowAccum = 0.0;

        for (int i = 0; i < 80; i++) {
          vec3 p = ro + rd * t;
          float d = scene(p);

          // Hit detection
          if (d < 0.001) {
            // Calculate lighting
            vec3 normal = calcNormal(p);
            vec3 lightDir = normalize(vec3(sin(u_time * 0.0001), cos(u_time * 0.0001), 0.5));
            float diff = max(dot(normal, lightDir), 0.0);

            // Chakra color based on position and time
            float colorIndex = p.y * 2.0 + u_time * 0.001 + u_scroll * 2.0;
            vec3 chakraColor = getChakraColor(colorIndex);

            // Fresnel effect
            float fresnel = pow(1.0 - max(dot(normal, -rd), 0.0), 3.0);

            color = chakraColor * (diff * 0.7 + 0.3) + fresnel * chakraColor * 0.5;
            color += glowAccum * 0.3;
            break;
          }

          // Accumulate glow
          float chakraIndex = t * 0.3 + u_time * 0.001 + u_scroll;
          glowAccum += 0.005 / (1.0 + d * d) * (1.0 - float(i) / 80.0);
          color += getChakraColor(chakraIndex) * 0.003 / (1.0 + d * d);

          if (t > 30.0) break;
          t += d * 0.7;
        }

        // Add glow to color
        color += glowAccum * getChakraColor(u_time * 0.002 + u_scroll);

        return color;
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy - u_resolution * 0.5) / u_resolution.y;

        // Camera setup with circular motion
        float camAngle = u_time * 0.0001;
        vec3 ro = vec3(
          cos(camAngle) * 5.0 + (u_mouse.x - 0.5) * 3.0,
          sin(u_time * 0.00015) * 2.0 + (u_mouse.y - 0.5) * 3.0,
          sin(camAngle) * 5.0 + 5.0
        );

        vec3 target = vec3(0.0);
        vec3 forward = normalize(target - ro);
        vec3 right = normalize(cross(vec3(0, 1, 0), forward));
        vec3 up = cross(forward, right);

        vec3 rd = normalize(forward + uv.x * right + uv.y * up);

        // Ray march the scene
        vec3 color = raymarch(ro, rd);

        // Background gradient with noise
        float bgNoise = fbm(uv * 3.0 + u_time * 0.0001);
        vec3 bgColor = mix(
          vec3(0.02, 0.0, 0.05),
          vec3(0.0, 0.02, 0.08),
          uv.y * 0.5 + 0.5 + bgNoise * 0.2
        );

        color += bgColor * 0.4;

        // Vignette
        float vignette = 1.0 - length(uv) * 0.4;
        color *= vignette;

        // Tone mapping
        color = color / (color + vec3(1.0));
        color = pow(color, vec3(1.0 / 2.2)); // Gamma correction

        gl_FragColor = vec4(color, 0.9);
      }
    `;

    // Compile shaders
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    // Check for shader compilation errors
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      console.error('Fragment shader compilation error:', gl.getShaderInfoLog(fragmentShader));
      return;
    }

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
    const complexityLocation = gl.getUniformLocation(program, 'u_complexity');
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
      gl.uniform1f(complexityLocation, complexity);
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
  }, [complexity, scrollProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ mixBlendMode: 'screen', opacity: 0.8 }}
    />
  );
};

export default AlgorithmicArtBackground;
