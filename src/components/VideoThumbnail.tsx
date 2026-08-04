export default function VideoThumbnail({
  src,
  href,
  title,
  duration,
}: {
  src: string;
  href: string;
  title: string;
  duration?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch ${title}`}
      className="group relative mt-4 block w-full max-w-md overflow-hidden rounded-lg border border-white/10 transition-all hover:border-primary hover:shadow-[0_0_20px_rgba(57,255,20,0.15)]"
    >
      <img
        src={src}
        alt={title}
        className="aspect-video w-full object-cover opacity-75 transition-all duration-300 group-hover:scale-[1.03] group-hover:opacity-100"
      />

      <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/10">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-black/60 backdrop-blur-sm transition-all group-hover:border-primary group-hover:bg-black/75">
          <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5 text-white transition-colors group-hover:text-primary" aria-hidden="true">
            <path fill="currentColor" d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>

      {duration && (
        <span className="pointer-events-none absolute bottom-2 right-2 rounded bg-black/75 px-1.5 py-0.5 font-mono text-[10px] text-white/80">
          {duration}
        </span>
      )}
    </a>
  );
}
