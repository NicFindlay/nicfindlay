import InteractiveGrid from '@/components/InteractiveGrid';
import TerminalWindow from '@/components/TerminalWindow';
import StatusBadge from '@/components/StatusBadge';
import TypewriterText from '@/components/TypewriterText';
import GenericAppIcon from '@/components/GenericAppIcon';
import VideoThumbnail from '@/components/VideoThumbnail';
import StatusLine from '@/components/StatusLine';
import Reveal from '@/components/Reveal';

type Project = {
  title: string;
  /** Log timestamp. Entries read newest-first, with anything ongoing on top. */
  date: string;
  dateNote?: string;
  tagline?: string;
  notes?: string[];
  status: string;
  icon?: string;
  link?: string;
  linkLabel?: string;
  thumbnail?: string;
  duration?: string;
};

function SocialIcon({ label }: { label: string }) {
  switch (label) {
    case 'X':
      return (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
          <path
            fill="currentColor"
            d="M18.9 3H21l-6.6 7.6 7.7 10.4h-6.1l-4.8-6.4-5.5 6.4H3l7.1-8.2L2.6 3h6.2l4.3 5.7L18.9 3zm-2.1 16.1h1.7L7.3 4.7H5.5l11.3 14.4z"
          />
        </svg>
      );
    case 'GitHub':
      return (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.9.6-3.5-1.2-3.5-1.2-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.9 1.8 1.8 2.2.8.2 1.2-.1 1.5-.4.1-.7.4-1.2.7-1.5-2.4-.3-4.9-1.2-4.9-5.3 0-1.2.4-2.1 1.1-2.8-.1-.3-.5-1.4.1-2.8 0 0 .9-.3 2.9 1.1a9.9 9.9 0 0 1 5.2 0c2-1.4 2.9-1.1 2.9-1.1.6 1.4.2 2.5.1 2.8.7.7 1.1 1.6 1.1 2.8 0 4.1-2.5 5-4.9 5.3.4.3.7 1 .7 2v3c0 .3.2.6.7.5A10 10 0 0 0 12 2z"
          />
        </svg>
      );
    case 'LinkedIn':
      return (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
          <path
            fill="currentColor"
            d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM3 9h4v12H3zM9 9h3.8v1.6h.1c.5-.9 1.8-1.9 3.6-1.9 3.9 0 4.5 2.4 4.5 5.5V21h-4v-5.6c0-1.3 0-2.9-1.8-2.9s-2.1 1.4-2.1 2.8V21H9z"
          />
        </svg>
      );
    case 'Email':
      return (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
          <path
            fill="currentColor"
            d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.2L4.4 7H19.6L12 12.2zM4 17h16V8.9l-8 5.5-8-5.5V17z"
          />
        </svg>
      );
    default:
      return null;
  }
}

export default function Home() {
  const projects: Project[] = [
    {
      title: 'A Motorbike Trip With My Dad Through The Alps',
      date: '2026.07',
      tagline: 'Started a YouTube channel. Editing takes longer than the riding.',
      notes: [
        'Four days, two bikes: Milan → the Swiss Alps → the Italian Lakes.',
        'Amateur at both the riding and the filming.',
        'Mostly recorded it for the memories with my old man.',
      ],
      status: 'live',
      icon: '/youtube-channel.jpg',
      link: 'https://www.youtube.com/watch?v=1oEkuRjEjWk',
      thumbnail: '/alps-video.jpg',
      duration: '36:39',
      linkLabel: 'Watch on YouTube',
    },
    {
      title: 'Clara: Scan Processed Foods',
      date: '2026.02',
      tagline: 'Point your phone at a barcode, find out what is actually in it.',
      notes: ['Got a v.0 onto TestFlight.', 'Then got bored. Abandoned.'],
      status: 'archived',
      icon: '/Clara.svg',
      link: 'https://claranutri.com/',
    },
    {
      title: 'One Trick Pony',
      date: '2025',
      tagline: 'Learning SwiftUI and playing around. Should leapfrog after this.',
      status: 'archived',
      icon: '/OTP.svg',
    },
  ];

  const socials = [
    { label: 'X', href: 'https://x.com/nicfindl' },
    { label: 'GitHub', href: 'https://github.com/NicFindlay' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nicfindlay/' },
    { label: 'Email', href: 'mailto:nicisme@gmail.com' },
  ];

  const liveCount = projects.filter((p) => p.status === 'live').length;

  return (
    <div className="relative min-h-screen">
      <InteractiveGrid />

      <main className="relative z-10 mx-auto grid w-full max-w-6xl gap-16 px-6 py-20 lg:grid-cols-[300px_1fr] lg:gap-24 lg:py-28">
        {/* ── Identity rail ── */}
        <aside className="flex flex-col gap-7 lg:sticky lg:top-24 lg:self-start">
          <div className="intro">
            <p className="label mb-4">Personal log</p>
            <h1 className="display text-[42px] leading-[1.05] text-white sm:text-[52px]">
              <TypewriterText text="Nic Findlay" delay={260} />
            </h1>
          </div>

          <div
            className="intro max-w-[34ch] space-y-3 text-[13px] leading-[1.7]"
            style={{ animationDelay: '220ms' }}
          >
            <p className="text-[var(--text-2)]">
              Full stack developer &amp; designer building some side projects.
            </p>
            <p className="text-[var(--text-3)]">A work in progress&hellip;</p>
          </div>

          <div className="intro flex flex-wrap gap-2" style={{ animationDelay: '330ms' }}>
            {socials.map((s) => (
              <a key={s.label} href={s.href} className="chip">
                <SocialIcon label={s.label} />
                {s.label}
              </a>
            ))}
          </div>

          <p
            className="intro tabular hidden border-t border-white/6 pt-6 text-[11px] text-white/20 lg:block"
            style={{ animationDelay: '440ms' }}
          >
            last_sync 2026.08.04
          </p>
        </aside>

        {/* ── The log ── */}
        <section className="flex flex-col gap-8">
          <div className="intro" style={{ animationDelay: '160ms' }}>
            <h2 className="display text-[26px] text-white">
              Side Quests<span className="animate-blink text-primary"> _</span>
            </h2>
            <p className="mt-2 text-[12px] text-[var(--text-3)]">
              Three attempts, one shipped, two abandoned. TODO: heaps&hellip;
            </p>
          </div>

          <TerminalWindow
            path="~/side-quests"
            meta={`${projects.length} entries`}
            className="intro"
            style={{ animationDelay: '300ms' }}
          >
            {projects.map((project, i) => (
              <Reveal key={project.title} delay={420 + i * 110}>
                <article
                  className={`log-entry grid gap-x-8 gap-y-4 py-9 md:grid-cols-[92px_1fr] ${
                    i > 0 ? 'border-t border-white/6' : ''
                  }`}
                >
                  {/* Timestamps, not ordinals: this is a log, and the order is real */}
                  <div className="date-rail flex items-baseline gap-3 md:flex-col md:gap-1">
                    <time className="tabular text-[12px]">{project.date}</time>
                    {project.dateNote && (
                      <span className="label text-[9px]">{project.dateNote}</span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-5">
                      <div className="flex min-w-0 items-start gap-4">
                        <GenericAppIcon size={44} icon={project.icon} />
                        <div className="min-w-0">
                          <h3 className="entry-title display text-[19px] leading-snug text-white/90">
                            {project.link ? (
                              <a href={project.link} target="_blank" rel="noopener noreferrer">
                                {project.title}
                              </a>
                            ) : (
                              project.title
                            )}
                          </h3>
                          {project.tagline && (
                            <p className="mt-1.5 max-w-[52ch] text-[12px] leading-relaxed text-[var(--text-3)]">
                              {project.tagline}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="shrink-0">
                        <StatusBadge status={project.status} />
                      </div>
                    </header>

                    {project.notes && (
                      <ul className="note-list mt-5 space-y-1.5 text-[12px] leading-relaxed">
                        {project.notes.map((note) => (
                          <li key={note}>{note}</li>
                        ))}
                      </ul>
                    )}

                    {project.thumbnail && project.link && (
                      <div className="mt-6">
                        <VideoThumbnail
                          src={project.thumbnail}
                          href={project.link}
                          title={project.title}
                          duration={project.duration}
                        />
                      </div>
                    )}

                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group mt-6 inline-flex items-center gap-2 text-[12px] text-[var(--text-2)] transition-colors hover:text-[var(--phosphor)]"
                      >
                        {project.linkLabel ?? 'Open project'}
                        <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                          →
                        </span>
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </TerminalWindow>
        </section>
      </main>

      <footer className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 text-center">
        <p className="text-[11px] text-white/15">
          <span className="text-white/10">{'// '}</span>
          404 no cookies found
        </p>
      </footer>

      <StatusLine entries={projects.length} live={liveCount} />
    </div>
  );
}
