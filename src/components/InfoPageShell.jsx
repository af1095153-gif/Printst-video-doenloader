'use client';

import { ChevronDown, Globe2 } from 'lucide-react';
import { languages } from '../../lib/i18n.js';
import { SiteFooter } from './ToolLinks';

export function InfoPageShell({ eyebrow, title, description, children, showIntro = true }) {
  function changeLanguage(event) {
    const code = event.target.value;
    window.location.href = code === 'en' ? '/' : `/${code}`;
  }

  return (
    <div className="min-h-screen bg-[#0B0B0E] text-[#F4F4F6]">
      <header className="sticky top-0 z-30 h-14 border-b border-white/10 bg-[#0B0B0E]/90 backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <a href="/" className="flex shrink-0 items-center gap-2.5 rounded-md text-lg font-bold tracking-tight text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E60023]"><span aria-hidden="true" className="flex size-7 items-center justify-center rounded-lg bg-[#E60023] text-sm font-extrabold text-white">K</span><span>KikPin</span></a>
          <nav aria-label="Primary navigation" className="hidden items-center gap-5 text-sm text-zinc-400 md:flex"><a href="/pinterest-video-downloader" className="hover:text-white">Video</a><a href="/pinterest-image-downloader" className="hover:text-white">Images</a><a href="/blog" className="hover:text-white">Blog</a><a href="/compare" className="hover:text-white">Compare</a><a href="/extension" className="hover:text-white">Extension</a></nav>
          <div className="flex items-center gap-2"><label className="flex h-10 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 text-xs text-zinc-200 focus-within:ring-2 focus-within:ring-[#E60023]"><Globe2 aria-hidden="true" className="size-4 text-[#FF7182]" /><span className="sr-only">Choose language</span><select aria-label="Choose language" defaultValue="en" onChange={changeLanguage} className="max-w-[72px] cursor-pointer bg-transparent text-white outline-none">{languages.map((language) => <option key={language.code} value={language.code} className="bg-[#141418]">{language.code.toUpperCase()}</option>)}</select><ChevronDown aria-hidden="true" className="size-3 text-zinc-500" /></label><a href="/#downloader" className="inline-flex min-h-10 items-center rounded-lg bg-[#E60023] px-3 sm:px-4 py-2 text-xs font-semibold text-white hover:bg-[#CC001F]">Open Downloader</a></div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 pb-12 pt-10 sm:px-6 sm:pt-14">{showIntro && <header className="max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#FF7182]">{eyebrow}</p><h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{title}</h1><p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-400">{description}</p></header>}<div className={`${showIntro ? 'mt-10' : ''} max-w-none space-y-8`}>{children}</div></main>
      <SiteFooter />
    </div>
  );
}
