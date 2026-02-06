type Status = "live" | "building" | "idea" | "archived";

const statusConfig: Record<
  Status,
  { label: string; dotClass: string; bgClass: string; textClass: string }
> = {
  live: {
    label: "live",
    dotClass: "bg-primary animate-pulse-dot",
    bgClass: "bg-emerald-400/10 border-emerald-400/30",
    textClass: "text-primary",
  },
  building: {
    label: "building",
    dotClass: "bg-amber-500",
    bgClass: "bg-amber-500/10 border-amber-600/30",
    textClass: "text-amber-500",
  },
  idea: {
    label: "idea",
    dotClass: "bg-slate-400",
    bgClass: "bg-slate-400/10 border-slate-400/30",
    textClass: "text-slate-400",
  },
  archived: {
    label: "abandoned",
    dotClass: "bg-zinc-600",
    bgClass: "bg-zinc-600/10 border-zinc-600/30",
    textClass: "text-zinc-500",
  },
};

export default function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[(status as Status)] ?? statusConfig.idea;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider ${config.bgClass}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dotClass}`} />
      <span className={config.textClass}>{config.label}</span>
    </span>
  );
}
