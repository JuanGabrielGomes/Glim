'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const VERTEX_SRC = `
  attribute vec2 aPosition;
  varying vec2 vUv;
  void main() {
    vUv = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const FRAGMENT_SRC = `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uPointer;
  uniform sampler2D uMask;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;

  void main() {
    vec2 uv = vUv;
    float maskAlpha = texture2D(uMask, uv).a;
    if (maskAlpha < 0.02) {
      discard;
    }

    vec2 p = uv - uPointer;
    float dist = length(p);
    float ripple = sin(dist * 24.0 - uTime * 2.1) * 0.5 + 0.5;
    float wave = sin(uv.x * 7.0 + uTime * 0.55) * cos(uv.y * 5.0 - uTime * 0.35);
    float pointerInfluence = smoothstep(0.7, 0.0, dist);
    float liquid = mix(wave, ripple, pointerInfluence);

    float sheen = smoothstep(-0.4, 0.9, liquid);
    vec3 base = mix(uColorC, uColorB, sheen);
    base = mix(base, uColorA, pow(sheen, 3.0) * 0.75);

    float edgeGlow = pow(1.0 - abs(uv.y - 0.5) * 2.0, 2.0);
    base += edgeGlow * 0.06;
    base += pointerInfluence * 0.05;

    gl_FragColor = vec4(base, maskAlpha);
  }
`;

const COLOR_A = [0.976, 0.972, 0.965]; // #F9F8F6
const COLOR_B = [0.949, 0.718, 0.482]; // #F2B77B
const COLOR_C = [0.29, 0.267, 0.255]; // #4A4643

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
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

type LiquidLogoProps = {
  text?: string;
  className?: string;
  ariaLabel?: string;
  showMark?: boolean;
};

export function LiquidLogo({
  text = 'glim.',
  className = '',
  ariaLabel = 'glim.',
  showMark = true,
}: LiquidLogoProps) {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({ x: 0.5, y: 0.4 });
  const reduceMotion = useReducedMotion() ?? false;
  const [supportsWebGL, setSupportsWebGL] = useState(true);

  useEffect(() => {
    if (reduceMotion) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const contextOptions = { alpha: true, premultipliedAlpha: false, preserveDrawingBuffer: true } as const;
    const gl = (canvas.getContext('webgl', contextOptions) ??
      canvas.getContext('experimental-webgl', contextOptions)) as WebGLRenderingContext | null;
    if (!gl) {
      setSupportsWebGL(false);
      return;
    }

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SRC);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC);
    const program = gl.createProgram();
    if (!vertexShader || !fragmentShader || !program) {
      setSupportsWebGL(false);
      return;
    }
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setSupportsWebGL(false);
      return;
    }
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const positionLocation = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    const maskTexture = gl.createTexture();
    const maskCanvas = document.createElement('canvas');
    const maskCtx = maskCanvas.getContext('2d');

    const uTime = gl.getUniformLocation(program, 'uTime');
    const uPointer = gl.getUniformLocation(program, 'uPointer');
    const uMask = gl.getUniformLocation(program, 'uMask');
    const uColorA = gl.getUniformLocation(program, 'uColorA');
    const uColorB = gl.getUniformLocation(program, 'uColorB');
    const uColorC = gl.getUniformLocation(program, 'uColorC');

    gl.uniform3f(uColorA, COLOR_A[0], COLOR_A[1], COLOR_A[2]);
    gl.uniform3f(uColorB, COLOR_B[0], COLOR_B[1], COLOR_B[2]);
    gl.uniform3f(uColorC, COLOR_C[0], COLOR_C[1], COLOR_C[2]);
    gl.uniform1i(uMask, 0);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let width = 0;
    let height = 0;

    const fontFamily =
      getComputedStyle(container).getPropertyValue('--font-google-sans').trim() || 'sans-serif';

    const word = showMark ? text.replace(/\.+$/, '') : text;

    const drawMask = () => {
      if (!maskCtx) return;
      maskCanvas.width = width;
      maskCanvas.height = height;
      maskCtx.clearRect(0, 0, width, height);
      const fontSize = height * 0.72;
      maskCtx.font = `400 ${fontSize}px ${fontFamily}`;
      maskCtx.fillStyle = '#fff';

      const diamondSize = showMark ? fontSize * 0.24 : 0;
      const gap = showMark ? fontSize * 0.1 : 0;
      const textWidth = maskCtx.measureText(word).width;
      const lockupWidth = textWidth + gap + diamondSize;
      const startX = (width - lockupWidth) / 2;
      const baselineY = height / 2 + fontSize * 0.36;

      maskCtx.textAlign = 'left';
      maskCtx.textBaseline = 'alphabetic';
      maskCtx.fillText(word, startX, baselineY);

      if (!showMark) return;

      const diamondCenterX = startX + textWidth + gap + diamondSize / 2;
      const diamondCenterY = baselineY - fontSize * 0.16;
      const side = diamondSize / Math.SQRT2;
      maskCtx.save();
      maskCtx.translate(diamondCenterX, diamondCenterY);
      maskCtx.rotate(Math.PI / 4);
      maskCtx.fillRect(-side / 2, -side / 2, side, side);
      maskCtx.restore();

      gl.bindTexture(gl.TEXTURE_2D, maskTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, maskCanvas);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.round(rect.width * dpr));
      height = Math.max(1, Math.round(rect.height * dpr));
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
      drawMask();
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointerRef.current = {
        x: (event.clientX - rect.left) / rect.width,
        y: 1 - (event.clientY - rect.top) / rect.height,
      };
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    let rafId = 0;
    const start = performance.now();
    const render = (now: number) => {
      const elapsed = (now - start) / 1000;
      gl.uniform1f(uTime, elapsed);
      gl.uniform2f(uPointer, pointerRef.current.x, pointerRef.current.y);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, maskTexture);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      gl.deleteTexture(maskTexture);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, [reduceMotion, text, showMark]);

  const useFallback = reduceMotion || !supportsWebGL;

  return (
    <span
      ref={containerRef}
      className={`relative inline-block ${className}`}
      role={showMark ? 'img' : undefined}
      aria-label={showMark ? ariaLabel : undefined}
    >
      <span
        className={`font-google inline-block leading-none tracking-[-0.07em] text-transparent ${
          useFallback ? '' : showMark ? 'invisible' : 'opacity-0'
        }`}
        style={{
          backgroundImage: 'linear-gradient(120deg, #4A4643 0%, #F2B77B 45%, #F9F8F6 60%, #F2B77B 78%, #4A4643 100%)',
          backgroundSize: '220% 100%',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          animation: useFallback && !reduceMotion ? 'glim-shimmer 6s ease-in-out infinite' : undefined,
        }}
        aria-hidden={showMark ? 'true' : undefined}
      >
        {text}
      </span>
      {useFallback ? null : (
        <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
      )}
    </span>
  );
}
