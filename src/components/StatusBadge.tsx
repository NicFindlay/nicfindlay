type Status = 'live' | 'building' | 'idea' | 'archived';

const statusConfig: Record<Status, { label: string; dot: string; text: string; ring: string }> = {
  live: {
    label: 'live',
    dot: 'bg-[var(--phosphor)] animate-pulse-dot',
    text: 'text-[var(--phosphor)]',
    ring: 'border-[rgb(57_255_20_/_0.35)] bg-[rgb(57_255_20_/_0.06)]',
  },
  building: {
    label: 'building',
    dot: 'bg-[var(--amber)]',
    text: 'text-[var(--amber)]',
    ring: 'border-[rgb(255_176_32_/_0.3)] bg-[rgb(255_176_32_/_0.06)]',
  },
  idea: {
    label: 'idea',
    dot: 'bg-[var(--slate)]',
    text: 'text-[var(--slate)]',
    ring: 'border-white/12 bg-white/[0.03]',
  },
  archived: {
    label: 'abandoned',
    dot: 'bg-white/25',
    text: 'text-white/35',
    ring: 'border-white/10 bg-white/[0.02]',
  },
};

export default function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[status as Status] ?? statusConfig.idea;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] ${config.ring}`}
    >
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${config.dot}`} />
      <span className={config.text}>{config.label}</span>
    </span>
  );
}
