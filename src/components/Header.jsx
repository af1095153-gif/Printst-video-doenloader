import { memo } from 'react';
import { ChevronDown, ClipboardPaste, Globe2 } from 'lucide-react';
import { languages } from '../../lib/i18n.js';

export const Header = memo(function Header({ onPasteAction, actionLabel = 'Paste Link' }) {
  function changeLanguage(event) {
    const code = event.target.value;
    window.location.href = code === 'en' ? '/' : `/${code}`;
  }

  return (
    <header className="sticky top-0 z-30 h-14 border-b border-white/10 bg-[#0B0B0E]/90 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="/" className="flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-md text-lg font-bold tracking-tight text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E60023]">
          <span aria-hidden="true" className="flex size-7 items-center justify-center rounded-lg bg-[#E60023] text-sm font-extrabold">K</span>
          <span>KikPin</span>
        </a>
        <nav aria-label="Primary navigation" className="hidden items-center gap-5 text-sm font-medium text-zinc-400 lg:flex">
          <a href="/pinterest-video-downloader" className="whitespace-nowrap hover:text-white">Video</a>
          <a href="/pinterest-image-downloader" className="whitespace-nowrap hover:text-white">Images</a>
          <a href="/pinterest-gif-downloader" className="whitespace-nowrap hover:text-white">GIF</a>
          <a href="/pinterest-idea-pin-downloader" className="whitespace-nowrap hover:text-white">Idea Pins</a>
          <a href="/blog" className="whitespace-nowrap hover:text-white">Blog</a>
          <a href="/compare" className="whitespace-nowrap hover:text-white">Compare</a>
          <a href="/extension" className="whitespace-nowrap hover:text-white">Extension</a>
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <label className="flex h-10 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 text-xs text-zinc-200 focus-within:ring-2 focus-within:ring-[#E60023]">
            <Globe2 aria-hidden="true" className="size-4 text-[#FF7182]" />
            <span className="sr-only">Choose language</span>
            <select aria-label="Choose language" defaultValue="en" onChange={changeLanguage} className="max-w-[74px] cursor-pointer bg-transparent text-white outline-none">
              {languages.map((language) => <option key={language.code} value={language.code} className="bg-[#141418]">{language.code.toUpperCase()}</option>)}
            </select>
            <ChevronDown aria-hidden="true" className="size-3 text-zinc-500" />
          </label>
          <button type="button" onClick={onPasteAction} className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-[#E60023] px-3 sm:px-4 py-2 text-xs font-semibold text-white whitespace-nowrap transition-colors hover:bg-[#CC001F] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
            <ClipboardPaste aria-hidden="true" className="size-3.5" />
            <span>{actionLabel}</span>
          </button>
        </div>
      </div>
    </header>
  );
});
