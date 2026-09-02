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
      className="group relative block w-full max-w-[420px] overflow-hidden rounded-md border border-white/8 transition-colors duration-300 hover:border-[rgb(57_255_20_/_0.4)]"
    >
      <img
        src={src}
        alt=""
        className="aspect-video w-full object-cover opacity-70 transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
      />

      <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#08090a]/35 transition-colors duration-300 group-hover:bg-[#08090a]/10">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-[#08090a]/70 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:border-[var(--phosphor)] group-hover:bg-[#08090a]/85">
          <svg
            viewBox="0 0 24 24"
            className="ml-0.5 h-4 w-4 text-white/90 transition-colors duration-300 group-hover:text-[var(--phosphor)]"
            aria-hidden="true"
          >
            <path fill="currentColor" d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>

      {duration && (
        <span className="tabular pointer-events-none absolute bottom-2 right-2 rounded bg-[#08090a]/85 px-1.5 py-0.5 text-[10px] text-white/70">
          {duration}
        </span>
      )}
    </a>
  );
}
