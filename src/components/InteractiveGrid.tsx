"use client";

import { useEffect, useRef } from "react";

interface ShootingStar {
  x: number;
  y: number;
  angle: number;
  speed: number;
  length: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export default function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({ x: 0, y: 0, active: false });
  const animationRef = useRef<number | null>(null);
  const starsRef = useRef<ShootingStar[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pointer = pointerRef.current;
    const stars = starsRef.current;

    const spawnStar = (width: number, height: number) => {
      const angle = Math.PI * 0.15 + Math.random() * Math.PI * 0.2; // mostly diagonal
      const side = Math.random();
      let x: number, y: number;
      if (side < 0.5) {
        x = Math.random() * width;
        y = -10;
      } else {
        x = -10;
        y = Math.random() * height * 0.6;
      }
      stars.push({
        x,
        y,
        angle,
        speed: 3 + Math.random() * 5,
        length: 40 + Math.random() * 80,
        opacity: 0.15 + Math.random() * 0.25,
        life: 0,
        maxLife: 60 + Math.random() * 90,
      });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(document.documentElement.scrollHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${document.documentElement.scrollHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const setPointer = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY + window.scrollY;
      pointer.active = true;
    };

    const clearPointer = () => {
      pointer.active = false;
    };

    const draw = () => {
      const width = window.innerWidth;
      const height = document.documentElement.scrollHeight;
      ctx.clearRect(0, 0, width, height);

      const spacing = 28;
      const maxInfluence = 300;
      const maxOffset = 28;
      const baseRadius = 1.2;
      const maxRadiusBoost = 2.5;

      const fallbackX = width * 0.55 + Math.sin(Date.now() * 0.0006) * 60;
      const fallbackY = height * 0.3 + Math.cos(Date.now() * 0.0004) * 60;
      const mx = pointer.active ? pointer.x : fallbackX;
      const my = pointer.active ? pointer.y : fallbackY;

      // Draw dot grid with warp
      for (let gx = 0; gx <= width; gx += spacing) {
        for (let gy = 0; gy <= height; gy += spacing) {
          const dx = gx - mx;
          const dy = gy - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - dist / maxInfluence);
          const eased = influence * influence; // quadratic easing for snappier warp

          // Push dots away from cursor
          const offsetX = eased * maxOffset * (dx / (dist || 1));
          const offsetY = eased * maxOffset * (dy / (dist || 1));

          const dotX = gx + offsetX;
          const dotY = gy + offsetY;

          // Dots closer to cursor get bigger and brighter
          const radius = baseRadius + eased * maxRadiusBoost;
          const alpha = 0.05 + eased * 0.2;

          ctx.beginPath();
          ctx.arc(dotX, dotY, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(57, 255, 20, ${alpha})`;
          ctx.fill();
        }
      }

      // Glow at pointer
      const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, 200);
      gradient.addColorStop(0, "rgba(57, 255, 20, 0.03)");
      gradient.addColorStop(0.4, "rgba(57, 255, 20, 0.01)");
      gradient.addColorStop(1, "rgba(57, 255, 20, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Shooting stars
      if (Math.random() < 0.02) spawnStar(width, height);

      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i];
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.life++;

        const fadeIn = Math.min(s.life / 10, 1);
        const fadeOut = Math.max(0, 1 - (s.life - s.maxLife + 20) / 20);
        const fade = Math.min(fadeIn, fadeOut);

        const tailX = s.x - Math.cos(s.angle) * s.length;
        const tailY = s.y - Math.sin(s.angle) * s.length;

        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0, `rgba(57, 255, 20, 0)`);
        grad.addColorStop(1, `rgba(57, 255, 20, ${s.opacity * fade})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.stroke();

        if (s.life > s.maxLife || s.x > width + 100 || s.y > height + 100) {
          stars.splice(i, 1);
        }
      }

      animationRef.current = window.requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", setPointer);
    window.addEventListener("pointerleave", clearPointer);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", setPointer);
      window.removeEventListener("pointerleave", clearPointer);
      if (animationRef.current) window.cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-50"
      style={{ transform: "translate3d(0,0,0)", backfaceVisibility: "hidden" }}
      aria-label="Interactive background grid"
    />
  );
}
