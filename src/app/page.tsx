export default function Home() {
  const projects = [
    {
      title: "Signal Drafts",
      tagline: "Capture ideas → ship experiments",
      status: "building",
      revenue: "$0/mo",
    },
    {
      title: "Quiet Hours",
      tagline: "Protect your deep work blocks",
      status: "building",
      revenue: "$0/mo",
    },
    {
      title: "Launch Ledger",
      tagline: "Track revenue across all your bets",
      status: "idea",
      revenue: "$0/mo",
    },
  ];

  const socials = [
    { label: "Twitter", href: "#" },
    { label: "GitHub", href: "#" },
    { label: "LinkedIn", href: "#" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100">
      <main className="mx-auto grid min-h-screen w-full max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[320px_1fr] lg:gap-16 lg:py-24">
        {/* Left column - Profile */}
        <aside className="flex flex-col gap-8 lg:sticky lg:top-24 lg:self-start">
          <div className="space-y-6">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600" />
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight text-white">
                Nic Findlay
              </h1>
              <p className="text-sm leading-relaxed text-white/60">
                Seasoned developer exploring the indie maker path. Building
                focused, useful products with clean UX and fast iteration.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">
              connect
            </p>
            <div className="flex flex-wrap gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70 transition hover:border-emerald-400/50 hover:text-white"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">
              stack
            </p>
            <div className="flex flex-wrap gap-2 text-xs text-white/50">
              {["Next.js", "React", "TypeScript", "Tailwind", "Postgres"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="mt-auto hidden text-[11px] text-white/30 lg:block">
            last_sync: 2026-02-05
          </div>
        </aside>

        {/* Right column - Projects */}
        <section className="flex flex-col gap-8">
          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.3em] text-emerald-300/70">
              in progress
            </p>
            <h2 className="text-2xl font-semibold text-white">Projects</h2>
            <p className="text-sm text-white/50">
              Small bets I am actively building or exploring.
            </p>
          </div>

          <div className="space-y-4">
            {projects.map((project) => (
              <article
                key={project.title}
                className="group flex items-center justify-between gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-emerald-400/40 hover:bg-white/[0.06]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-white/10 to-white/5 text-lg font-semibold text-white/80">
                    {project.title.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{project.title}</h3>
                    <p className="text-sm text-white/50">{project.tagline}</p>
                  </div>
                </div>
                <div className="hidden flex-col items-end gap-1 text-right sm:flex">
                  <span className="text-sm font-medium text-white/80">
                    {project.revenue}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-emerald-300/60">
                    {project.status}
                  </span>
                </div>
              </article>
            ))}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">
              note
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              Project names and details are placeholders. Update with your real
              projects, add links, and swap in actual revenue/status.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
