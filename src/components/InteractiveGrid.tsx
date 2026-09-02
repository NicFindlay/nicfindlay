'use client';

import { useEffect, useRef } from 'react';

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

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pointer = pointerRef.current;
    const stars = starsRef.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const spawnStar = (width: number, height: number) => {
      const angle = Math.PI * 0.15 + Math.random() * Math.PI * 0.2;
      const fromTop = Math.random() < 0.5;
      stars.push({
        x: fromTop ? Math.random() * width : -10,
        y: fromTop ? -10 : Math.random() * height * 0.6,
        angle,
        speed: 3 + Math.random() * 5,
        length: 40 + Math.random() * 80,
        opacity: 0.12 + Math.random() * 0.2,
        life: 0,
        maxLife: 60 + Math.random() * 90,
      });
    };

    // Viewport-sized, not document-sized: the field is ambient, so it stays
    // put while the page scrolls rather than rendering acres of offscreen dots.
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const setPointer = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };

    const clearPointer = () => {
      pointer.active = false;
    };

    const draw = (animate: boolean) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      ctx.clearRect(0, 0, width, height);

      const spacing = 30;
      const maxInfluence = 300;
      const maxOffset = 26;
      const baseRadius = 1.1;
      const maxRadiusBoost = 2.4;

      const drift = animate ? Date.now() : 0;
      const fallbackX = width * 0.62 + Math.sin(drift * 0.0006) * 60;
      const fallbackY = height * 0.35 + Math.cos(drift * 0.0004) * 60;
      const mx = pointer.active ? pointer.x : fallbackX;
      const my = pointer.active ? pointer.y : fallbackY;

      for (let gx = 0; gx <= width; gx += spacing) {
        for (let gy = 0; gy <= height; gy += spacing) {
          const dx = gx - mx;
          const dy = gy - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - dist / maxInfluence);
          const eased = influence * influence;

          const dotX = gx + eased * maxOffset * (dx / (dist || 1));
          const dotY = gy + eased * maxOffset * (dy / (dist || 1));

          ctx.beginPath();
          ctx.arc(dotX, dotY, baseRadius + eased * maxRadiusBoost, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(57, 255, 20, ${0.075 + eased * 0.11})`;
          ctx.fill();
        }
      }

      if (!animate) return;

      if (Math.random() < 0.014) spawnStar(width, height);

      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i];
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.life++;

        const fade = Math.min(
          Math.min(s.life / 10, 1),
          Math.max(0, 1 - (s.life - s.maxLife + 20) / 20)
        );

        const tailX = s.x - Math.cos(s.angle) * s.length;
        const tailY = s.y - Math.sin(s.angle) * s.length;

        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0, 'rgba(57, 255, 20, 0)');
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

      animationRef.current = window.requestAnimationFrame(() => draw(true));
    };

    const stop = () => {
      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };

    const start = () => {
      if (reduceMotion || animationRef.current) return;
      animationRef.current = window.requestAnimationFrame(() => draw(true));
    };

    const onVisibility = () => (document.hidden ? stop() : start());
    const onResize = () => {
      resize();
      if (reduceMotion) draw(false);
    };

    resize();
    if (reduceMotion) {
      draw(false);
    } else {
      start();
    }

    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', setPointer);
    window.addEventListener('pointerleave', clearPointer);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', setPointer);
      window.removeEventListener('pointerleave', clearPointer);
      document.removeEventListener('visibilitychange', onVisibility);
      stop();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-75"
      style={{ transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden' }}
    />
  );
}
