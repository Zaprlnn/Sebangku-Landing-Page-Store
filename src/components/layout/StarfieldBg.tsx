"use client";

import { useEffect, useRef, useCallback } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  alpha: number;
  speed: number;
  twinkleOffset: number;
}

const STAR_COUNT  = 120;
const BASE_SPEED  = 0.12; // px/frame drift downward

function createStar(w: number, h: number, randomY = true): Star {
  return {
    x:            Math.random() * w,
    y:            randomY ? Math.random() * h : -4,
    r:            0.4 + Math.random() * 1.4,
    alpha:        0.3 + Math.random() * 0.7,
    speed:        BASE_SPEED * (0.5 + Math.random()),
    twinkleOffset: Math.random() * Math.PI * 2,
  };
}

export function StarfieldBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef  = useRef<Star[]>([]);
  const rafRef    = useRef<number>(0);
  const tRef      = useRef(0);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { innerWidth: w, innerHeight: h } = window;
    canvas.width  = w;
    canvas.height = h;
    // Regenerate stars on resize to fill new dimensions
    starsRef.current = Array.from({ length: STAR_COUNT }, () => createStar(w, h, true));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      tRef.current += 0.016;

      ctx.clearRect(0, 0, w, h);

      for (const star of starsRef.current) {
        // Slow drift
        star.y += star.speed;
        if (star.y > h + 4) {
          // Recycle star at top
          Object.assign(star, createStar(w, h, false));
        }

        // Twinkle: sine wave modulates alpha
        const twinkle = Math.sin(tRef.current * 1.8 + star.twinkleOffset) * 0.25;
        const a = Math.max(0.05, Math.min(1, star.alpha + twinkle));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${a})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [resize]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
