import { memo } from 'react';
import { ClipboardPaste } from 'lucide-react';

interface HeaderProps {
  onPasteAction: () => void;
  actionLabel?: string;
}

export const Header = memo(function Header({ onPasteAction, actionLabel = 'Paste Link' }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 h-14 border-b border-white/10 bg-[#0B0B0E]/90 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-8 px-4 sm:px-6">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="/"
          className="flex shrink-0 items-center gap-2.5 text-lg font-bold tracking-tight text-white whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E60023] rounded-md"
        >
          <span
            aria-hidden="true"
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E60023] text-sm font-extrabold text-white"
          >
            K
          </span>
          <span>KikPin</span>
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-400"
        >
          <a
            href="/pinterest-video-downloader"
            className="whitespace-nowrap shrink-0 transition-colors hover:text-white hover:underline underline-offset-4"
          >
            Video
          </a>
          <a
            href="/pinterest-image-downloader"
            className="whitespace-nowrap shrink-0 transition-colors hover:text-white hover:underline underline-offset-4"
          >
            Images
          </a>
          <a
            href="/pinterest-gif-downloader"
            className="whitespace-nowrap shrink-0 transition-colors hover:text-white hover:underline underline-offset-4"
          >
            GIF
          </a>
          <a
            href="/idea-pin-downloader"
            className="whitespace-nowrap shrink-0 transition-colors hover:text-white hover:underline underline-offset-4"
          >
            Idea Pins
          </a>
          <a href="/blog" className="whitespace-nowrap shrink-0 transition-colors hover:text-white hover:underline underline-offset-4">Blog</a>
          <a href="/compare" className="whitespace-nowrap shrink-0 transition-colors hover:text-white hover:underline underline-offset-4">Compare</a>
          <a
            href="/how-to-download-pinterest-videos"
            className="whitespace-nowrap shrink-0 transition-colors hover:text-white hover:underline underline-offset-4"
          >
            Guide
          </a>
          <a
            href="/extension"
            className="whitespace-nowrap shrink-0 transition-colors hover:text-white hover:underline underline-offset-4"
          >
            Browser Extension
          </a>
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex shrink-0 items-center">
          <button
            type="button"
            onClick={onPasteAction}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-[#E60023] px-4 py-2 text-xs font-semibold text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#CC001F] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
          >
            <ClipboardPaste className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{actionLabel}</span>
          </button>
        </div>
      </div>
    </header>
  );
});
