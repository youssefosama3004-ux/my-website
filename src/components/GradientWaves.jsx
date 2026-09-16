import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";

const color = (hex) => {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return match ? new Float32Array([parseInt(match[1], 16) / 255, parseInt(match[2], 16) / 255, parseInt(match[3], 16) / 255]) : new Float32Array([1, 1, 1]);
};

const vertex = ["#version 300 es", "in vec2 position;", "void main() { gl_Position = vec4(position, 0.0, 1.0); }"].join("\n");

const fragment = [
  "#version 300 es",
  "precision highp float;",
  "uniform vec2 iResolution; uniform float iTime; uniform float uSpeed; uniform float uAmplitude; uniform float uWaveScale; uniform float uTilt; uniform float uBrightness; uniform float uOpacity; uniform float uGrain; uniform vec3 uHorizonColor; uniform vec3 uWaveColor; uniform vec3 uCrestColor;",
  "out vec4 fragColor;",
  "float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }",
  "float field(vec2 p) { float t = iTime * uSpeed; float a = sin(p.x * uWaveScale + t) + sin(p.y * uWaveScale * 1.3 - t * 0.7); float b = sin((p.x + p.y) * uWaveScale * 0.55 + t * 0.45); return (a + b) * uAmplitude; }",
  "void main() {",
  "  vec2 uv = gl_FragCoord.xy / iResolution.xy; vec2 p = uv - 0.5; p.x *= iResolution.x / iResolution.y;",
  "  p.y += uTilt * 0.17; float height = field(p * 8.0); float bands = smoothstep(-1.1, 1.3, height - p.y * 9.0);",
  "  float highlight = smoothstep(0.45, 1.2, sin((height - p.y * 9.0) * 2.2));",
  "  vec3 body = mix(uWaveColor, uCrestColor, highlight * 0.55); vec3 col = mix(uHorizonColor, body, bands);",
  "  float fade = smoothstep(0.06, 0.78, uv.y) * smoothstep(1.05, 0.36, uv.y); float grain = (hash(gl_FragCoord.xy + iTime) - 0.5) * uGrain;",
  "  float alpha = clamp(bands * fade * uOpacity + grain, 0.0, 1.0); fragColor = vec4(col * uBrightness * alpha, alpha);",
  "}",
].join("\n");

export default function GradientWaves({
  horizonColor = "#172554",
  waveColor = "#2563eb",
  crestColor = "#93c5fd",
  speed = 0.22,
  amplitude = 1.4,
  waveScale = 0.52,
  tilt = 1.11,
  brightness = 0.65,
  opacity = 0.38,
  grain = 0.025,
  className = "",
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const renderer = new Renderer({ webgl: 2, alpha: true, premultipliedAlpha: true, antialias: false, dpr: Math.min(window.devicePixelRatio || 1, 2) });
    const gl = renderer.gl;
    const canvas = gl.canvas;
    Object.assign(canvas.style, { width: "100%", height: "100%", display: "block" });
    container.appendChild(canvas);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iResolution: { value: new Float32Array([1, 1]) },
        iTime: { value: 0 },
        uSpeed: { value: speed },
        uAmplitude: { value: amplitude },
        uWaveScale: { value: waveScale },
        uTilt: { value: tilt },
        uBrightness: { value: brightness },
        uOpacity: { value: opacity },
        uGrain: { value: grain },
        uHorizonColor: { value: color(horizonColor) },
        uWaveColor: { value: color(waveColor) },
        uCrestColor: { value: color(crestColor) },
      },
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const resize = () => {
      const rect = container.getBoundingClientRect();
      renderer.setSize(Math.max(1, Math.floor(rect.width)), Math.max(1, Math.floor(rect.height)));
      program.uniforms.iResolution.value[0] = gl.drawingBufferWidth;
      program.uniforms.iResolution.value[1] = gl.drawingBufferHeight;
    };
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    let frame = 0;
    const startedAt = performance.now();
    const render = (now) => {
      program.uniforms.iTime.value = (now - startedAt) * 0.001;
      renderer.render({ scene: mesh });
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.remove();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <div ref={containerRef} aria-hidden="true" className={"h-full w-full overflow-hidden " + className} />;
}