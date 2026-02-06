import InteractiveGrid from '@/components/InteractiveGrid';
import TerminalWindow from '@/components/TerminalWindow';
import StatusBadge from '@/components/StatusBadge';
import TypewriterText from '@/components/TypewriterText';
import GenericAppIcon from '@/components/GenericAppIcon';

function SocialIcon({ label }: { label: string }) {
  switch (label) {
    case 'X':
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path
            fill="currentColor"
            d="M18.9 3H21l-6.6 7.6 7.7 10.4h-6.1l-4.8-6.4-5.5 6.4H3l7.1-8.2L2.6 3h6.2l4.3 5.7L18.9 3zm-2.1 16.1h1.7L7.3 4.7H5.5l11.3 14.4z"
          />
        </svg>
      );
    case 'GitHub':
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.9.6-3.5-1.2-3.5-1.2-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.9 1.8 1.8 2.2.8.2 1.2-.1 1.5-.4.1-.7.4-1.2.7-1.5-2.4-.3-4.9-1.2-4.9-5.3 0-1.2.4-2.1 1.1-2.8-.1-.3-.5-1.4.1-2.8 0 0 .9-.3 2.9 1.1a9.9 9.9 0 0 1 5.2 0c2-1.4 2.9-1.1 2.9-1.1.6 1.4.2 2.5.1 2.8.7.7 1.1 1.6 1.1 2.8 0 4.1-2.5 5-4.9 5.3.4.3.7 1 .7 2v3c0 .3.2.6.7.5A10 10 0 0 0 12 2z"
          />
        </svg>
      );
    case 'LinkedIn':
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path
            fill="currentColor"
            d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM3 9h4v12H3zM9 9h3.8v1.6h.1c.5-.9 1.8-1.9 3.6-1.9 3.9 0 4.5 2.4 4.5 5.5V21h-4v-5.6c0-1.3 0-2.9-1.8-2.9s-2.1 1.4-2.1 2.8V21H9z"
          />
        </svg>
      );
    default:
      return null;
  }
}

export default function Home() {
  const projects = [
    {
      title: 'One Trick Pony',
      tagline: 'Learning SwiftUI and ship something on the App Store. Will leapfrog after this.',
      status: 'building',
      revenue: '$0/mo',
    },
    {
      title: 'Clara',
      tagline: 'More info coming soon',
      status: 'idea',
      revenue: '$0/mo',
    },
    {
      title: 'Crypto in Bio',
      tagline: 'Random idea so I have 3.',
      status: 'idea',
      revenue: '$0/mo',
    },
  ];

  const socials = [
    { label: 'X', href: 'https://x.com/nicfindl' },
    { label: 'GitHub', href: 'https://github.com/NicFindlay' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nicfindlay/' },
    { label: 'Email', href: 'mailto:nicisme@gmail.com' },
  ];

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-zinc-100">
      <InteractiveGrid />

      <main className="relative z-10 mx-auto grid min-h-screen w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[320px_1fr] lg:gap-28 lg:py-24">
        {/* Left column — Profile */}
        <aside className="flex flex-col gap-8 lg:sticky lg:top-24 lg:self-start">
          <h1 className="text-4xl font-semibold tracking-tight text-white">
            <TypewriterText text="Nic Findlay"></TypewriterText>
          </h1>
          <p className="text-xs text-white/30 font-mono">
            Full stack dev building some side projects. A work in progress...
          </p>

          {/* Connect */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-white/70 transition hover:border-primary hover:text-primary hover:shadow-[0_0_12px_rgba(57,255,20,0.15)]">
                  <SocialIcon label={s.label} />
                  {`${s.label}`}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-auto hidden font-mono text-[11px] text-white/20 lg:block">
            <span className="text-white/10">{'/* '}</span>
            last_sync: 2026-02-06
            <span className="text-white/10">{' */'}</span>
          </div>
        </aside>

        {/* Right column — Projects */}
        <section className="flex flex-col gap-8">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-primary">
              Side Quests<span className="animate-blink text-primary"> _</span>
            </h2>

            <p className="font-mono text-[12px] text-white/30">
              <span className="text-primary/50">{'// '}</span>
              <span className="text-white/40">TODO: heaps...</span>
            </p>
          </div>

          <TerminalWindow key="projects" title={`random.txt`}>
            <div className="space-y-10">
              {projects.map((project, i) => (
                <div key={project.title} className="flex items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <span className="hidden font-mono text-[12px] text-white/25 sm:block">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="hidden lg:block">
                      <GenericAppIcon size={40} />
                    </span>
                    <div>
                      <h2 className="font-semibold text-lg text-gray-200 pb-1">{project.title}</h2>
                      <p className="font-mono text-xs text-white/40">{project.tagline}</p>
                    </div>
                  </div>
                  <div className="hidden flex-col items-end gap-2 sm:flex">
                    <StatusBadge status={project.status} />
                    <span className="font-mono text-xs text-white/30">{project.revenue}</span>
                  </div>
                </div>
              ))}
            </div>
          </TerminalWindow>
        </section>
      </main>
    </div>
  );
}
