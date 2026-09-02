'use client';

import { useEffect, useState } from 'react';

/**
 * The status line devs already know how to read — tmux/vim, pinned to the
 * bottom of the viewport. Every segment is derived from the log itself.
 */
export default function StatusLine({ entries, live }: { entries: number; live: number }) {
  // Rendered null on the server so SSG output never disagrees with the clock.
  const [clock, setClock] = useState<string | null>(null);

  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      role="status"
      aria-label="Site status"
      className="status-boot fixed inset-x-0 bottom-0 z-50 flex h-[var(--status-h)] items-stretch border-t border-white/8 bg-[#0a0c0d]/92 text-[11px] backdrop-blur-md"
    >
      <span className="flex items-center gap-2 bg-phosphor px-3 font-medium text-[#08090a]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#08090a]/70" />
        nic@findlay
      </span>

      <span className="hidden items-center px-3 text-white/40 sm:flex">~/side-quests</span>

      <span className="ml-auto flex items-center divide-x divide-white/8">
        <span className="hidden items-center gap-1.5 px-3 text-white/35 tabular sm:flex">
          {entries} entries
        </span>
        <span className="flex items-center gap-1.5 px-3 text-white/35 tabular">
          <span className="h-1.5 w-1.5 rounded-full bg-phosphor animate-pulse-dot" />
          {live} live
        </span>
        <span className="flex min-w-[86px] items-center justify-center px-3 text-white/50 tabular">
          {clock ?? '--:--:--'}
        </span>
      </span>
    </div>
  );
}
