'use client';

import { useState } from 'react';
import { Check, Copy, TextCursorInput } from 'lucide-react';
import { copyToClipboard } from './clipboard';

const fields = [
  { id: 'title', label: 'Pin Title', limit: 100, rows: 2, note: 'The first 40 characters are most likely to appear in feeds and search.' },
  { id: 'description', label: 'Pin Description', limit: 500, rows: 4, note: 'Write a clear description that adds context to your Pin.' },
  { id: 'bio', label: 'Profile Bio', limit: 160, rows: 3, note: 'Introduce your account in a concise, easy-to-scan way.' },
  { id: 'board', label: 'Board Name', limit: 50, rows: 2, note: 'Keep your board title specific and easy to understand.' },
];

export function CharacterCounter() {
  const [values, setValues] = useState({ title: '', description: '', bio: '', board: '' });
  const [copied, setCopied] = useState('');
  const [error, setError] = useState('');

  async function copyField(field) {
    if (!values[field.id]) return;
    try { await copyToClipboard(values[field.id]); setCopied(field.id); setError(''); window.setTimeout(() => setCopied(''), 1600); }
    catch { setError('Clipboard access is unavailable. Select the text and copy it manually.'); }
  }

  return (
    <section aria-label="Pinterest character counter" className="grid gap-4 lg:grid-cols-2">
      {fields.map((field) => {
        const value = values[field.id];
        const count = Array.from(value).length;
        const words = value.trim() ? value.trim().split(/\s+/).length : 0;
        const overLimit = count > field.limit;
        const progress = Math.min(100, (count / field.limit) * 100);
        return (
          <article key={field.id} className="rounded-2xl border border-white/10 bg-[#111114] p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3"><label htmlFor={`counter-${field.id}`} className="flex items-center gap-2 text-base font-bold text-white"><TextCursorInput aria-hidden="true" className="size-4 text-[#FF7182]" />{field.label}</label><button type="button" onClick={() => copyField(field)} disabled={!value} className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-white/10 px-3 text-xs font-semibold text-zinc-300 hover:border-white/25 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E60023]">{copied === field.id ? <Check aria-hidden="true" className="size-3.5" /> : <Copy aria-hidden="true" className="size-3.5" />}{copied === field.id ? 'Copied' : 'Copy'}</button></div>
            <textarea id={`counter-${field.id}`} value={value} onChange={(event) => setValues((previous) => ({ ...previous, [field.id]: event.target.value }))} rows={field.rows} placeholder={`Write your ${field.label.toLowerCase()}…`} className="mt-4 w-full resize-y rounded-xl border border-white/10 bg-[#0B0B0E] px-4 py-3 text-sm leading-relaxed text-white placeholder:text-zinc-600 focus:border-[#E60023] focus:outline-none focus:ring-2 focus:ring-[#E60023]/30" />
            <div className="mt-4 flex items-baseline justify-between gap-3"><p className={`text-sm font-semibold ${overLimit ? 'text-rose-300' : 'text-zinc-200'}`} aria-live="polite">{count} / {field.limit} characters</p><p className="text-xs text-zinc-500">{words} {words === 1 ? 'word' : 'words'}</p></div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10" role="progressbar" aria-label={`${field.label} character limit`} aria-valuemin={0} aria-valuemax={field.limit} aria-valuenow={Math.min(count, field.limit)}><div className={`h-full rounded-full transition-[width] ${overLimit ? 'bg-rose-500' : 'bg-[#E60023]'}`} style={{ width: `${progress}%` }} /></div>
            <p className="mt-3 text-xs leading-relaxed text-zinc-500">{field.id === 'title' && <><span className="font-semibold text-zinc-300">First 40 preview:</span> {Array.from(value).slice(0, 40).join('') || 'Your title preview will appear here.'}<br /></>}{field.note}</p>
          </article>
        );
      })}
      {error && <p role="alert" className="text-sm text-rose-300 lg:col-span-2">{error}</p>}
    </section>
  );
}
