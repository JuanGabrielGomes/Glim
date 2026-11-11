'use client';

import { useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import {
  GEM_FLOATS_PER_VERTEX,
  buildGemMesh,
  multiply,
  perspectiveFromDistance,
  rotationX,
  rotationY,
  rotationZ,
} from '@/lib/gem-geometry';

const VERTEX_SRC = `
  attribute vec3 aPosition;
  attribute vec3 aNormal;
  attribute vec3 aBary;
  attribute vec3 aMask;
  uniform mat4 uViewProjection;
  uniform mat4 uRotation;
  uniform vec3 uCenter;
  varying vec3 vWorld;
  varying vec3 vNormal;
  varying vec3 vBary;
  varying vec3 vMask;
  varying vec3 vJitter;
  void main() {
    vec4 world = uRotation * vec4(aPosition - uCenter, 1.0);
    vWorld = world.xyz;
    vNormal = mat3(uRotation) * aNormal;
    vBary = aBary;
    vMask = aMask;
    // perturbação estável por faceta, calculada aqui (entrada exata) para não virar ruído por pixel
    float seed = fract(sin(dot(aNormal, vec3(12.9898, 78.233, 37.719))) * 43758.5453);
    vJitter = vec3(seed, fract(seed * 7.31), fract(seed * 3.17)) - 0.5;
    gl_Position = uViewProjection * world;
  }
`;

const FRAGMENT_SRC = `
  precision highp float;
  varying vec3 vWorld;
  varying vec3 vNormal;
  varying vec3 vBary;
  varying vec3 vMask;
  varying vec3 vJitter;
  uniform vec3 uCamera;
  uniform float uPass;

  // Estúdio procedural: fundo quase preto com cartões de luz estreitos. Diamante de verdade
  // alterna facetas escuras e facetas muito brancas, então o contraste é o que "vende" a gema.
  vec3 studio(vec3 d) {
    vec3 color = vec3(0.012, 0.008, 0.005);
    color += vec3(0.30, 0.17, 0.07) * pow(max(d.y, 0.0), 2.0);
    color += vec3(1.00, 0.86, 0.66) * smoothstep(0.90, 0.985, dot(d, normalize(vec3( 0.60, 0.70,  0.40)))) * 2.6;
    color += vec3(1.00, 0.95, 0.88) * smoothstep(0.93, 0.990, dot(d, normalize(vec3(-0.70, 0.30,  0.60)))) * 2.2;
    color += vec3(1.00, 0.72, 0.38) * smoothstep(0.92, 0.985, dot(d, normalize(vec3( 0.20, -0.50, 0.85)))) * 1.9;
    color += vec3(0.80, 0.88, 1.00) * smoothstep(0.94, 0.992, dot(d, normalize(vec3(-0.30, -0.20, -0.90)))) * 1.3;
    color += vec3(1.00, 0.80, 0.50) * smoothstep(0.95, 0.995, dot(d, normalize(vec3( 0.90, -0.10, 0.20)))) * 1.6;
    color += vec3(1.00, 0.78, 0.46) * smoothstep(0.94, 1.0, sin(d.x * 7.0 + d.z * 4.0 + d.y * 2.0) * 0.5 + 0.5) * 0.5;
    return color;
  }

  void main() {
    vec3 n = normalize(vNormal);
    vec3 v = normalize(uCamera - vWorld);
    vec3 jitter = vJitter;
    vec3 color;

    if (uPass < 0.5) {
      // faces de trás: luz que atravessou, bateu no fundo e voltou
      vec3 inner = normalize(-n + jitter * 0.9);
      color = studio(reflect(-v, inner)) * 0.75;
    } else {
      float fresnel = pow(1.0 - max(dot(n, v), 0.0), 3.0);
      vec3 mirror = studio(reflect(-v, n));
      // refração por canal (dispersão) + uma segunda batida interna por faceta
      vec3 tr = refract(-v, n, 1.0 / 2.36);
      vec3 tg = refract(-v, n, 1.0 / 2.42);
      vec3 tb = refract(-v, n, 1.0 / 2.50);
      vec3 bounce = normalize(n + jitter * 1.1);
      vec3 inside = vec3(
        studio(reflect(tr, bounce)).r,
        studio(reflect(tg, bounce)).g,
        studio(reflect(tb, bounce)).b
      );
      color = mirror * (0.20 + 1.3 * fresnel) + inside * 0.95;
    }

    // linhas de aresta nítidas (só nas arestas reais; diagonais internas ficam de fora)
    float edge = min(
      min(vBary.x + (1.0 - vMask.x) * 4.0, vBary.y + (1.0 - vMask.y) * 4.0),
      vBary.z + (1.0 - vMask.z) * 4.0
    );
    float line = 1.0 - smoothstep(0.0, 0.028, edge);
    if (uPass > 0.5) color += vec3(1.0, 0.85, 0.62) * line * 0.55;

    color = 1.0 - exp(-color * 1.25);
    float alpha = max(color.r, max(color.g, color.b));
    gl_FragColor = vec4(color, alpha);
  }
`;

const DISTANCE = 4.6;
const FOV = (28 * Math.PI) / 180;
const SPIN_SPEED = 0.2; // rad/s: uma volta a cada ~31 s
const TILT = 0.16; // quase de lado: a mesa aparece só como uma elipse fina
const MAX_CANVAS = 1100;
/** Centro vertical da gema (vai de -1,0 na ponta a +0,34 na mesa). */
const CENTER_Y = -0.33;

function compile(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/**
 * Diamante do hero. Mostra a foto da gema (que é o LCP) e, quando o WebGL está pronto, troca
 * por um diamante 3D que gira devagar e acompanha o ponteiro de leve. Sem WebGL, ou com
 * "reduzir movimento" ligado, a foto continua no lugar.
 */
export function HeroGem() {
  const reduceMotion = useReducedMotion() ?? false;
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const posterRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (reduceMotion) return;
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      premultipliedAlpha: true,
      antialias: true,
      powerPreference: 'low-power',
    });
    if (!gl) return;

    const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SRC);
    const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC);
    const program = gl.createProgram();
    if (!vertex || !fragment || !program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const mesh = buildGemMesh();
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, mesh.data, gl.STATIC_DRAW);

    const stride = GEM_FLOATS_PER_VERTEX * 4;
    const bind = (name: string, offsetFloats: number) => {
      const location = gl.getAttribLocation(program, name);
      gl.enableVertexAttribArray(location);
      gl.vertexAttribPointer(location, 3, gl.FLOAT, false, stride, offsetFloats * 4);
    };
    bind('aPosition', 0);
    bind('aNormal', 3);
    bind('aBary', 6);
    bind('aMask', 9);

    const uRotation = gl.getUniformLocation(program, 'uRotation');
    const uPass = gl.getUniformLocation(program, 'uPass');
    gl.uniformMatrix4fv(
      gl.getUniformLocation(program, 'uViewProjection'),
      false,
      perspectiveFromDistance(FOV, DISTANCE)
    );
    gl.uniform3f(gl.getUniformLocation(program, 'uCamera'), 0, 0, DISTANCE);
    gl.uniform3f(gl.getUniformLocation(program, 'uCenter'), 0, CENTER_Y, 0);

    gl.enable(gl.CULL_FACE);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE);
    gl.clearColor(0, 0, 0, 0);

    const heroSection = document.getElementById('topo');
    const pointer = { x: 0, y: 0, easedX: 0, easedY: 0 };
    const handlePointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const resize = () => {
      const rect = wrapper.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const size = Math.max(2, Math.min(MAX_CANVAS, Math.round(rect.width * dpr)));
      if (canvas.width !== size) {
        canvas.width = size;
        canvas.height = size;
        gl.viewport(0, 0, size, size);
      }
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrapper);

    let visible = true;
    const intersection = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true;
      },
      { threshold: 0 }
    );
    intersection.observe(wrapper);

    let frame = 0;
    let revealed = false;
    let revealTimer = 0;
    const start = performance.now();

    const render = (now: number) => {
      frame = requestAnimationFrame(render);
      if (!visible || document.hidden) return;

      pointer.easedX += (pointer.x - pointer.easedX) * 0.04;
      pointer.easedY += (pointer.y - pointer.easedY) * 0.04;

      const advance = Number.parseFloat(heroSection?.style.getPropertyValue('--hero-p') || '0');
      const spin = ((now - start) / 1000) * SPIN_SPEED + advance * 1.2;
      const model = multiply(
        rotationZ(-0.1 + pointer.easedX * 0.04),
        multiply(rotationX(TILT + pointer.easedY * 0.08), rotationY(spin + pointer.easedX * 0.12))
      );
      gl.uniformMatrix4fv(uRotation, false, model);

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.cullFace(gl.FRONT);
      gl.uniform1f(uPass, 0);
      gl.drawArrays(gl.TRIANGLES, 0, mesh.vertexCount);
      gl.cullFace(gl.BACK);
      gl.uniform1f(uPass, 1);
      gl.drawArrays(gl.TRIANGLES, 0, mesh.vertexCount);

      if (!revealed) {
        revealed = true;
        wrapper.dataset.ready = 'true';
        // depois do fade, tira a foto da árvore para não gastar composição à toa
        revealTimer = window.setTimeout(() => {
          if (posterRef.current) posterRef.current.style.display = 'none';
        }, 900);
      }
    };
    frame = requestAnimationFrame(render);

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      cancelAnimationFrame(frame);
      delete wrapper.dataset.ready;
      if (posterRef.current) posterRef.current.style.display = '';
    };
    canvas.addEventListener('webglcontextlost', handleContextLost);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(revealTimer);
      window.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      resizeObserver.disconnect();
      intersection.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, [reduceMotion]);

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className="group pointer-events-none absolute top-[46%] left-1/2 z-[3] aspect-square w-[92vw] -translate-x-1/2 -translate-y-1/2 [scale:calc(1_+_var(--hero-p,0)_*_0.6)] will-change-transform md:top-[48%] md:w-[min(52vw,720px)] md:[scale:calc(1_+_var(--hero-p,0)_*_1.7)]"
    >
      <Image
        ref={posterRef}
        src="/brand/gema-ambar.jpg"
        alt=""
        width={1200}
        height={1200}
        priority
        fetchPriority="high"
        sizes="(max-width: 820px) 92vw, 52vw"
        className="absolute inset-0 h-full w-full -rotate-[8deg] mix-blend-screen transition-opacity duration-700 group-data-[ready=true]:opacity-0"
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-700 group-data-[ready=true]:opacity-100"
      />
    </div>
  );
}
