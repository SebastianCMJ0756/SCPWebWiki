'use client';

import { useRef, useEffect } from 'react';

const vertex = `
attribute vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const fragment = `
#ifdef GL_ES
precision highp float;
#endif

uniform vec2 uResolution;
uniform float uTime;

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec2 pos = uv * 2.0 - 1.0;
  pos.x *= uResolution.x / uResolution.y;

  float t = uTime * 0.25;
  vec3 base = mix(vec3(0.01, 0.01, 0.01), vec3(0.12, 0.12, 0.12), uv.y);
  vec3 accent = vec3(0.85, 0.85, 0.85) * 0.25 * sin(pos.x * 5.0 + t * 1.2);
  vec3 glow = vec3(0.6, 0.6, 0.6) * 0.18 * cos(pos.y * 6.0 - t);
  vec3 color = base + accent + glow;
  color = mix(color, vec3(0.95, 0.95, 0.95), smoothstep(0.0, 0.9, sin(pos.x * 2.8 + t)));

  float scan = sin(gl_FragCoord.y * 0.03 + t * 4.0) * 0.08;
  color += scan;

  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;

export default function DarkVeil({
  hueShift = 0,
  noiseIntensity = 0,
  scanlineIntensity = 0,
  speed = 0.5,
  scanlineFrequency = 0,
  warpAmount = 0
}) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { antialias: true, alpha: true }) || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.error('WebGL no disponible');
      return;
    }

    const compileShader = (type, source) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile failed:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const createProgram = (vsSource, fsSource) => {
      const vertexShader = compileShader(gl.VERTEX_SHADER, vsSource);
      const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fsSource);
      if (!vertexShader || !fragmentShader) return null;
      const program = gl.createProgram();
      if (!program) return null;
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program link failed:', gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
      }
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      return program;
    };

    const program = createProgram(vertex, fragment);
    if (!program) return;

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const resolutionLocation = gl.getUniformLocation(program, 'uResolution');
    const timeLocation = gl.getUniformLocation(program, 'uTime');

    const positionBuffer = gl.createBuffer();
    if (!positionBuffer) return;
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.floor(window.innerWidth * dpr));
      const height = Math.max(1, Math.floor(window.innerHeight * dpr));
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      gl.viewport(0, 0, width, height);
      gl.useProgram(program);
      if (resolutionLocation) gl.uniform2f(resolutionLocation, width, height);
    };

    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    let frameId = 0;
    const start = performance.now();

    const render = () => {
      const time = (performance.now() - start) / 1000;
      if (timeLocation) gl.uniform1f(timeLocation, time);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      frameId = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener('resize', resize);
    render();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 pointer-events-none"
      style={{ background: 'transparent', display: 'block', width: '100%', height: '100%' }}
    />
  );
}
