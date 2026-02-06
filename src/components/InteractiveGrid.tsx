"use client";

import { useEffect, useRef } from "react";

export default function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({ x: 0, y: 0, active: false });
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pointer = pointerRef.current;

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

      const gridSize = 26;
      const maxInfluence = 180;
      const maxOffset = 8;

      const fallbackX = width * 0.55 + Math.sin(Date.now() * 0.0006) * 40;
      const fallbackY = height * 0.3 + Math.cos(Date.now() * 0.0004) * 40;
      const mx = pointer.active ? pointer.x : fallbackX;
      const my = pointer.active ? pointer.y : fallbackY;

      ctx.strokeStyle = "rgba(57, 255, 20, 0.05)";
      ctx.lineWidth = 1;

      for (let x = 0; x <= width; x += gridSize) {
        const dx = x - mx;
        const dist = Math.abs(dx);
        const influence = Math.max(0, 1 - dist / maxInfluence);
        const offset = influence * maxOffset * Math.sign(dx || 1);

        ctx.beginPath();
        ctx.moveTo(x + offset, 0);
        ctx.lineTo(x - offset, height);
        ctx.stroke();
      }

      for (let y = 0; y <= height; y += gridSize) {
        const dy = y - my;
        const dist = Math.abs(dy);
        const influence = Math.max(0, 1 - dist / maxInfluence);
        const offset = influence * maxOffset * Math.sign(dy || 1);

        ctx.beginPath();
        ctx.moveTo(0, y + offset);
        ctx.lineTo(width, y - offset);
        ctx.stroke();
      }

      // Glow at pointer
      const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, 150);
      gradient.addColorStop(0, "rgba(57, 255, 20, 0.03)");
      gradient.addColorStop(0.5, "rgba(57, 255, 20, 0.01)");
      gradient.addColorStop(1, "rgba(57, 255, 20, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

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
      className="pointer-events-none fixed inset-0 z-0 opacity-40"
      style={{ transform: "translate3d(0,0,0)", backfaceVisibility: "hidden" }}
      aria-label="Interactive background grid"
    />
  );
}
