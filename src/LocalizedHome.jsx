'use client';

import { useState } from 'react';
import { ArrowRight, Check, ChevronDown, Clipboard, Download, ExternalLink, Globe2, ShieldCheck, Star } from 'lucide-react';
import { languages, getLocaleCopy } from '../lib/i18n';

const edgeUrl = 'https://microsoftedge.microsoft.com/addons/detail/kikpin-pinterest-video-/kpgnbgodaeeapgnahngpaoijkonoboae';
const trustpilotUrl = 'https://www.trustpilot.com/review/kikpin.me';
const guideCards = [
  ['how-to-download-pinterest-videos-idea-pins-with-audio', 'How to download Pinterest videos and Idea Pins with audio', 'Video guides', '6 min read'],
  ['save-pinterest-content-offline-without-account', 'Save Pinterest content offline without an account', 'Privacy & tools', '5 min read'],
  ['troubleshooting-pinterest-downloads', 'Troubleshooting Pinterest downloads', 'Troubleshooting', '4 min read'],
];

export default function LocalizedHome({ locale = 'en' }) {
  const copy = getLocaleCopy(locale) || getLocaleCopy('en');
  const [url, setUrl] = useState('');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [result, setResult] = useState(null);

  async function extract(value = url) {
    const target = value.trim();
    if (!target) {
      setNotice(copy.error);
      return;
    }
    setUrl(target);
    setBusy(true);
    setNotice('');
    setResult(null);
    try {
      const response = await fetch(`/api/extract?url=${encodeURIComponent(target)}`);
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || copy.error);
      setResult(payload);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : copy.error);
    } finally {
      setBusy(false);
    }
  }

  async function paste() {
    try {
      const text = await navigator.clipboard.readText();
      if (text.trim()) {
        setUrl(text.trim());
        void extract(text);
      } else {
        setNotice(copy.error);
      }
    } catch {
      setNotice(copy.error);
      document.getElementById('localized-pin-url')?.focus();
    }
  }

  function changeLanguage(event) {
    const code = event.target.value;
    window.location.href = code === 'en' ? '/' : `/${code}`;
  }

  const media = result?.slides?.length ? result.slides : result ? [result] : [];

  return (
    <div className="min-h-screen bg-[#0B0B0E] text-[#F4F4F6]">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0B0B0E]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <a href="/" className="flex shrink-0 items-center gap-2.5 rounded-md text-lg font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E60023]">
            <span aria-hidden="true" className="flex size-8 items-center justify-center rounded-lg bg-[#E60023] text-sm font-extrabold">KP</span>KikPin
          </a>
          <nav aria-label="Primary navigation" className="hidden items-center gap-6 text-sm font-medium text-zinc-400 md:flex">
            <a className="hover:text-white" href="/pinterest-video-downloader">Video</a>
            <a className="hover:text-white" href="/pinterest-image-downloader">Images</a>
            <a className="hover:text-white" href="/pinterest-gif-downloader">GIFs</a>
            <a className="hover:text-white" href="/pinterest-idea-pin-downloader">Idea Pins</a>
            <a className="hover:text-white" href="/blog">Blog</a>
            <a className="hover:text-white" href="/compare">Compare</a>
          </nav>
          <label className="flex min-h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-sm text-zinc-200 focus-within:ring-2 focus-within:ring-[#E60023]">
            <Globe2 aria-hidden="true" className="size-4 text-[#FF7182]" />
            <span className="sr-only">Choose language</span>
            <select aria-label="Choose language" value={locale} onChange={changeLanguage} className="max-w-[112px] cursor-pointer bg-transparent text-sm text-white outline-none">
              {languages.map((language) => <option key={language.code} value={language.code} className="bg-[#141418]">{language.native}</option>)}
            </select>
            <ChevronDown aria-hidden="true" className="size-3.5 text-zinc-500" />
          </label>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16">
        <section id="downloader" aria-labelledby="localized-hero-heading" className="max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#FF7182]">{copy.eyebrow}</p>
          <h1 id="localized-hero-heading" className="mt-3 text-3xl font-extrabold tracking-tight text-white text-balance sm:text-5xl">{copy.h1}</h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-400 sm:text-lg">{copy.subtitle}</p>
          <form className="mt-8 rounded-2xl border border-white/10 bg-[#141418] p-2.5 sm:flex sm:items-center sm:gap-2" onSubmit={(event) => { event.preventDefault(); void extract(); }}>
            <label htmlFor="localized-pin-url" className="sr-only">{copy.placeholder}</label>
            <input id="localized-pin-url" type="url" inputMode="url" autoComplete="off" value={url} onChange={(event) => setUrl(event.target.value)} placeholder={copy.placeholder} className="min-h-12 w-full rounded-xl bg-transparent px-4 font-mono text-sm text-white placeholder:text-zinc-500 focus:outline-none sm:flex-1" />
            <div className="flex gap-2">
              <button type="button" onClick={paste} disabled={busy} className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm font-semibold text-zinc-200 hover:bg-white/10 disabled:opacity-50 sm:flex-none"><Clipboard aria-hidden="true" className="size-4" />{copy.paste}</button>
              <button type="submit" disabled={busy} className="inline-flex min-h-12 flex-[1.4] items-center justify-center gap-2 rounded-xl bg-[#E60023] px-5 text-sm font-bold text-white hover:bg-[#c9001f] disabled:opacity-60 sm:flex-none">{busy ? copy.loading : copy.extract}<ArrowRight aria-hidden="true" className="size-4" /></button>
            </div>
          </form>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-zinc-500"><span>{copy.sample}</span><button type="button" disabled={busy} onClick={() => void extract('https://www.pinterest.com/pin/368450813289448972/')} className="rounded-full border border-white/10 px-3 py-1.5 text-zinc-300 hover:border-white/25 hover:text-white">{copy.sampleVideo}</button><button type="button" disabled={busy} onClick={() => void extract('https://www.pinterest.com/pin/368450813289143069/')} className="rounded-full border border-white/10 px-3 py-1.5 text-zinc-300 hover:border-white/25 hover:text-white">{copy.sampleImage}</button></div>
          {notice && <p role="alert" className="mt-3 text-sm text-amber-300">{notice}</p>}
          {busy && <p role="status" className="mt-5 rounded-xl border border-white/10 bg-[#141418] p-4 text-sm text-zinc-300">{copy.loading}</p>}
          {result && <section aria-label="Extracted media" className="mt-6 rounded-2xl border border-white/10 bg-[#141418] p-4 sm:p-6"><p className="text-xs font-semibold uppercase tracking-wide text-[#FF7182]">{result.pinType || 'Pinterest media'} · {result.resolution || 'Original quality'}</p><h2 className="mt-2 text-xl font-bold text-white">{result.title || 'Available media'}</h2><div className="mt-4 grid gap-3 sm:grid-cols-2">{media.map((item, index) => <article key={item.mediaUrl || index} className="overflow-hidden rounded-xl border border-white/10 bg-black/20"><div className="flex aspect-video items-center justify-center bg-black">{item.type === 'video' ? <video controls playsInline preload="metadata" poster={item.thumbnailUrl || undefined} src={item.mediaUrl} className="max-h-[420px] w-full" /> : <img src={item.thumbnailUrl || item.mediaUrl} alt={result.title || `Pinterest media ${index + 1}`} className="max-h-[420px] w-full object-contain" />}</div><div className="flex items-center justify-between gap-3 p-3"><span className="text-xs text-zinc-400">{media.length > 1 ? `Slide ${index + 1}` : (item.resolution || result.resolution || 'Original quality')}</span><a href={`/api/download?url=${encodeURIComponent(item.mediaUrl)}&type=${encodeURIComponent(item.type || result.type || '')}`} className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-[#E60023] px-3 text-sm font-semibold text-white hover:bg-[#c9001f]"><Download aria-hidden="true" className="size-4" />{copy.download}</a></div></article>)}</div></section>}
        </section>

        <section aria-label="KikPin listings and reviews" className="mt-10 flex flex-col items-center justify-center gap-3 border-y border-white/10 py-5 sm:flex-row sm:gap-5">
          <a href="/" aria-label="KikPin homepage" className="flex items-center gap-2 text-sm font-bold text-white"><span aria-hidden="true" className="flex size-8 items-center justify-center rounded-lg bg-[#E60023] text-xs">KP</span>KikPin</a>
          <a href={trustpilotUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-zinc-300 transition hover:border-[#00B67A]/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B67A]"><Star aria-hidden="true" className="size-4 text-zinc-500 transition-colors group-hover:fill-[#00B67A] group-hover:text-[#00B67A]" />Review KikPin on Trustpilot<span className="sr-only"> (opens in a new tab)</span></a>
          <a href={edgeUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-zinc-300 transition hover:border-[#E60023]/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E60023]"><span className="text-zinc-500 transition-colors group-hover:text-[#FF7182]">Edge</span>Live on Microsoft Edge Add-ons<span className="sr-only"> (opens in a new tab)</span></a>
        </section>

        <section className="mt-12 rounded-2xl border border-[#E60023]/20 bg-gradient-to-br from-[#211216] to-[#141418] p-5 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-7">
          <div><p className="text-xs font-semibold uppercase tracking-wide text-[#FF7182]">{copy.extensionTitle}</p><p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-300">{copy.extensionText}</p></div>
          <a href="/extension" className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/15 px-4 text-sm font-semibold text-white hover:bg-white/5 sm:mt-0">{copy.extensionLink}<ExternalLink aria-hidden="true" className="size-4" /></a>
        </section>

        <section className="mt-14"><div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-wide text-[#FF7182]">KikPin</p><h2 className="mt-2 text-2xl font-bold text-white">{copy.whyTitle}</h2><p className="mt-2 text-sm leading-relaxed text-zinc-400">{copy.whyText}</p></div><ul className="mt-5 grid gap-3 md:grid-cols-3">{[copy.formats[0], copy.formats[1], copy.formats[4]].map((feature) => <li key={feature} className="rounded-xl border border-white/10 bg-[#141418] p-5"><Check aria-hidden="true" className="size-5 text-[#00B67A]" /><h3 className="mt-3 text-sm font-semibold text-white">{feature}</h3><p className="mt-2 text-sm leading-relaxed text-zinc-400">{copy.subtitle}</p></li>)}</ul><div className="mt-6 overflow-x-auto rounded-2xl border border-white/10"><table className="w-full min-w-[560px] text-left text-sm"><caption className="sr-only">KikPin compared with typical ad-heavy downloaders</caption><thead className="bg-[#141418] text-xs uppercase tracking-wide text-zinc-400"><tr><th scope="col" className="px-4 py-3">What matters</th><th scope="col" className="px-4 py-3 text-white">KikPin</th><th scope="col" className="px-4 py-3">Typical downloader</th></tr></thead><tbody className="divide-y divide-white/10"><tr><th scope="row" className="px-4 py-3 font-medium text-white">Pop-ups and login</th><td className="px-4 py-3 text-zinc-300">No pop-ups · no login</td><td className="px-4 py-3 text-zinc-500">Ads and signup vary</td></tr><tr><th scope="row" className="px-4 py-3 font-medium text-white">Source quality and audio</th><td className="px-4 py-3 text-zinc-300">Original source; Idea Pin audio when available</td><td className="px-4 py-3 text-zinc-500">Quality and audio handling vary</td></tr><tr><th scope="row" className="px-4 py-3 font-medium text-white">Edge extension permissions</th><td className="px-4 py-3 text-zinc-300">Manifest V3 · activeTab-only</td><td className="px-4 py-3 text-zinc-500">Permissions vary</td></tr></tbody></table></div></section>

        <section className="mt-14"><h2 className="text-2xl font-bold text-white">{copy.devicesTitle}</h2><div className="mt-5 grid gap-3 md:grid-cols-3">{[['android', copy.android, copy.deviceAndroid], ['ios', copy.ios, copy.deviceIos], ['desktop', copy.desktop, copy.deviceDesktop]].map(([id, title, body]) => <article key={id} className="rounded-xl border border-white/10 bg-[#141418] p-5"><h3 className="font-semibold text-white">{title}</h3><p className="mt-2 text-sm leading-relaxed text-zinc-400">{body}</p></article>)}</div></section>

        <section className="mt-14 rounded-2xl border border-white/10 bg-[#141418] p-5 sm:p-7"><h2 className="text-2xl font-bold text-white">{copy.formatsTitle}</h2><ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{copy.formats.map((format) => <li key={format} className="flex items-center gap-3 rounded-xl border border-white/5 bg-black/20 p-4 text-sm text-zinc-300"><Check aria-hidden="true" className="size-4 shrink-0 text-[#FF7182]" />{format}</li>)}</ul><a href="/supported-urls" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#FF7182]">Supported links and formats <ArrowRight aria-hidden="true" className="size-4" /></a></section>

        <section className="mt-14"><div className="flex items-end justify-between gap-4"><h2 className="text-2xl font-bold text-white">{copy.blogTitle}</h2><a href="/blog" className="text-sm font-semibold text-zinc-300 hover:text-white">{copy.blogLink} <ArrowRight aria-hidden="true" className="ml-1 inline size-4" /></a></div><div className="mt-5 grid gap-3 md:grid-cols-3">{guideCards.map(([slug, title, category, time]) => <a key={slug} href={`/blog/${slug}`} className="rounded-xl border border-white/10 bg-[#141418] p-5 hover:border-[#E60023]/40"><p className="text-xs font-semibold text-[#FF7182]">{category} · {time}</p><h3 className="mt-3 text-base font-bold leading-snug text-white">{title}</h3><p className="mt-3 text-xs text-zinc-500">Nov 26, 2026</p></a>)}</div></section>

        <section id="faq" className="mt-14"><h2 className="text-2xl font-bold text-white">{copy.faqTitle}</h2><div className="mt-5 divide-y divide-white/10 border-y border-white/10">{copy.faqs.map(([question, answer]) => <details key={question} className="group py-4"><summary className="cursor-pointer list-none text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E60023]">{question}<span className="float-right text-[#FF7182] group-open:rotate-45">+</span></summary><p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400">{answer}</p></details>)}</div></section>
      </main>

      <footer className="border-t border-white/10 bg-[#0A0A0C]"><div className="mx-auto max-w-6xl px-4 py-10 sm:px-6"><div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1fr_2fr]">
        <div><a href="/" className="flex items-center gap-2 text-lg font-bold text-white"><span className="flex size-7 items-center justify-center rounded-lg bg-[#E60023] text-xs">KP</span>KikPin</a><p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-500">{copy.subtitle}</p><a href={trustpilotUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-zinc-200 hover:border-[#00B67A]/50"><span aria-hidden="true" className="text-[#00B67A]">★</span>Review us on Trustpilot</a></div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">{[[copy.footerTools, [['Video Downloader', '/pinterest-video-downloader'], ['Image Downloader', '/pinterest-image-downloader'], ['GIF Downloader', '/pinterest-gif-downloader'], ['Story Downloader', '/pinterest-story-downloader'], ['Carousel Downloader', '/pinterest-carousel-downloader'], ['Idea Pin Downloader', '/pinterest-idea-pin-downloader'], ['Browser Extension', '/extension']]], [copy.footerResources, [['Blog', '/blog'], ['Guides', '/how-to-download-pinterest-videos'], ['Supported URLs', '/supported-urls'], ['Compare', '/compare'], ['Glossary', '/glossary'], ['Pricing', '/pricing'], ['FAQ', '/#faq']]], [copy.footerCompany, [['Why Us', '/why-kikpin'], ['Contact', '/contact'], ['Terms', '/terms'], ['Privacy', '/privacy']]]].map(([heading, links]) => <nav key={heading} aria-label={heading}><h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-300">{heading}</h2><ul className="mt-4 grid gap-3">{links.map(([label, href]) => <li key={href}><a href={href} className="text-xs text-zinc-500 hover:text-white">{label}</a></li>)}</ul></nav>)}</div>
      </div><div className="mt-9 border-t border-white/10 pt-5"><p className="text-xs text-zinc-500">© 2026 KikPin. All rights reserved. KikPin is independent and not affiliated with Pinterest.</p><nav aria-label={copy.footerLanguage} className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs">{languages.map((language) => <a key={language.code} lang={language.code} href={language.href} className={`underline-offset-4 hover:text-white ${language.code === locale ? 'text-white' : 'text-zinc-500'}`}>{language.native}</a>)}</nav><nav aria-label="Site hubs" className="mt-3 flex flex-wrap gap-x-3 gap-y-2 text-xs text-zinc-500"><a href="/compare">Compare Hub</a><span>·</span><a href="/#faq">FAQ</a><span>·</span><a href="/glossary">Glossary Hub</a><span>·</span><a href="/how-to-download-pinterest-videos">Guides Hub</a><span>·</span><a href="/pinterest-video-downloader">Tools</a></nav><p className="mt-3 flex items-center gap-2 text-xs text-zinc-600"><ShieldCheck aria-hidden="true" className="size-3.5" />Save only content you own or have permission to use.</p></div></div></footer>
      <a href="/contact" aria-label="Contact KikPin support" className="fixed bottom-5 right-5 z-40 flex size-12 items-center justify-center rounded-full border border-[#E60023]/50 bg-[#E60023] text-white shadow-lg shadow-black/40 transition hover:scale-105 hover:bg-[#c9001f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"><span aria-hidden="true" className="text-lg">↗</span></a>
    </div>
  );
}
