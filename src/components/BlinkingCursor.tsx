"use client";

export default function BlinkingCursor({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 font-mono text-primary ${className}`}>
      <span className="text-white/40">&gt;</span>
      <span className="animate-blink text-primary">|</span>
    </span>
  );
}
