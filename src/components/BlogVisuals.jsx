export function BlogFigure({ src, alt, caption, className = '', loading = 'lazy' }) {
  return (
    <figure className={`overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-2 shadow-[0_18px_55px_rgba(0,0,0,0.2)] sm:p-3 ${className}`}>
      <img
        src={src}
        alt={alt}
        width="1200"
        height="675"
        loading={loading}
        decoding="async"
        fetchPriority={loading === 'eager' ? 'high' : undefined}
        className="aspect-video w-full rounded-xl object-cover"
      />
      <figcaption className="px-2 pb-1 pt-3 text-xs leading-relaxed text-zinc-400 sm:px-3">
        {caption}
      </figcaption>
    </figure>
  );
}
