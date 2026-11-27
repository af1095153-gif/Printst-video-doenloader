'use client';

import { useState } from 'react';
import { ArrowRight, Clipboard, Download } from 'lucide-react';

export function DownloaderPanel({ copy }) {
  const [url, setUrl] = useState('');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [result, setResult] = useState(null);
  const media = result?.slides?.length ? result.slides : result ? [result] : [];

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

  return (
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
      {result && <section aria-label="Extracted media" className="mt-6 rounded-2xl border border-white/10 bg-[#141418] p-4 sm:p-6"><p className="text-xs font-semibold uppercase tracking-wide text-[#FF7182]">{result.pinType || 'Pinterest media'} · {result.resolution || 'Original quality'}</p><h2 className="mt-2 text-xl font-bold text-white">{result.title || 'Available media'}</h2><div className="mt-4 grid gap-3 sm:grid-cols-2">{media.map((item, index) => <article key={item.mediaUrl || index} className="overflow-hidden rounded-xl border border-white/10 bg-black/20"><div className="flex aspect-video items-center justify-center bg-black">{item.type === 'video' ? <video controls playsInline preload="metadata" poster={item.thumbnailUrl || undefined} src={item.mediaUrl} className="max-h-[420px] w-full" /> : <img src={item.thumbnailUrl || item.mediaUrl} alt={result.title || `Pinterest media ${index + 1}`} width="736" height="736" loading="lazy" decoding="async" className="max-h-[420px] w-full object-contain" />}</div><div className="flex items-center justify-between gap-3 p-3"><span className="text-xs text-zinc-400">{media.length > 1 ? `Slide ${index + 1}` : (item.resolution || result.resolution || 'Original quality')}</span><a href={`/api/download?url=${encodeURIComponent(item.mediaUrl)}&type=${encodeURIComponent(item.type || result.type || '')}`} className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-[#E60023] px-3 text-sm font-semibold text-white hover:bg-[#c9001f]"><Download aria-hidden="true" className="size-4" />{copy.download}</a></div></article>)}</div></section>}
    </section>
  );
}
