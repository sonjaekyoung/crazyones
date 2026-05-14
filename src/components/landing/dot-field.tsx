"use client";

import { useEffect, useRef } from "react";

type Props = {
  className?: string;
  density?: number;
  linkDistance?: number;
};

export function DotField({
  className,
  density = 90,
  linkDistance = 140,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobile = window.matchMedia("(max-width: 640px)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const N = isMobile ? Math.round(density * 0.45) : density;
    const linkDist = isMobile ? linkDistance * 0.7 : linkDistance;
    const linkDistSq = linkDist * linkDist;

    type Dot = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      o: number;
    };

    let width = 0;
    let height = 0;
    let dots: Dot[] = [];
    let rafId = 0;
    let running = true;

    const init = () => {
      dots = Array.from({ length: N }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        r: Math.random() * 1.2 + 0.5,
        o: Math.random() * 0.45 + 0.25,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init();
    };

    const tick = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);

      if (!reduceMotion) {
        for (const d of dots) {
          d.x += d.vx;
          d.y += d.vy;
          if (d.x < 0) d.x += width;
          else if (d.x > width) d.x -= width;
          if (d.y < 0) d.y += height;
          else if (d.y > height) d.y -= height;
        }
      }

      ctx.lineWidth = 0.5;
      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dsq = dx * dx + dy * dy;
          if (dsq < linkDistSq) {
            const alpha = (1 - Math.sqrt(dsq) / linkDist) * 0.18;
            ctx.strokeStyle = `rgba(237,237,237,${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const d of dots) {
        ctx.fillStyle = `rgba(237,237,237,${d.o})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(rafId);
      } else if (!running) {
        running = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    resize();
    rafId = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [density, linkDistance]);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
