import { type CSSProperties, type ReactNode } from 'react';

/**
 * Window chrome carries information instead of costume: the macOS traffic
 * lights are gone so the only coloured dots on the page are the ones that
 * mean something (project status).
 */
export default function TerminalWindow({
  path = 'terminal',
  meta,
  children,
  className = '',
  style,
}: {
  path?: string;
  meta?: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`panel relative overflow-hidden ${className}`} style={style}>
      <div className="flex items-center justify-between gap-4 border-b border-white/6 bg-white/[0.015] px-5 py-3">
        <span className="flex items-baseline gap-2 whitespace-nowrap text-[11px]">
          <span className="text-white/25">$</span>
          <span className="text-white/45">{path}</span>
        </span>
        {meta && <span className="label tabular hidden whitespace-nowrap sm:block">{meta}</span>}
      </div>

      <div className="relative px-5 py-2 sm:px-7">{children}</div>
    </div>
  );
}
