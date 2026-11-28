'use client';

import { useState } from 'react';
import { Copy, Type } from 'lucide-react';
import { copyToClipboard } from './clipboard';

const specialCharacters = {
  script: { B: 'ℬ', E: 'ℰ', F: 'ℱ', H: 'ℋ', I: 'ℐ', L: 'ℒ', M: 'ℳ', R: 'ℛ', e: 'ℯ', g: 'ℊ', o: 'ℴ' },
  fraktur: { C: 'ℭ', H: 'ℌ', I: 'ℑ', R: 'ℜ', Z: 'ℨ' },
  double: { C: 'ℂ', H: 'ℍ', N: 'ℕ', P: 'ℙ', Q: 'ℚ', R: 'ℝ', Z: 'ℤ' },
};

function alphabet(upperStart, lowerStart, digitStart, exceptions = {}) {
  return (value) => Array.from(value, (character) => {
    if (exceptions[character]) return exceptions[character];
    const code = character.codePointAt(0);
    if (code >= 65 && code <= 90 && upperStart) return String.fromCodePoint(upperStart + code - 65);
    if (code >= 97 && code <= 122 && lowerStart) return String.fromCodePoint(lowerStart + code - 97);
    if (code >= 48 && code <= 57 && digitStart) return String.fromCodePoint(digitStart + code - 48);
    return character;
  }).join('');
}

function combining(mark) {
  return (value) => Array.from(value, (character) => /[\p{L}\p{N}]/u.test(character) ? `${character}${mark}` : character).join('');
}

const smallCaps = { a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ꜰ', g: 'ɢ', h: 'ʜ', i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ', o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ', s: 'ꜱ', t: 'ᴛ', u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ' };
const fullwidth = (value) => Array.from(value, (character) => {
  const code = character.codePointAt(0);
  return code >= 33 && code <= 126 ? String.fromCodePoint(code + 0xFEE0) : character === ' ' ? '　' : character;
}).join('');
const circled = (value) => Array.from(value, (character) => {
  const code = character.codePointAt(0);
  if (code >= 65 && code <= 90) return String.fromCodePoint(0x24B6 + code - 65);
  if (code >= 97 && code <= 122) return String.fromCodePoint(0x24D0 + code - 97);
  if (character === '0') return '⓪';
  if (code >= 49 && code <= 57) return String.fromCodePoint(0x2460 + code - 49);
  return character;
}).join('');

const styles = [
  ['Bold', alphabet(0x1D400, 0x1D41A, 0x1D7CE)],
  ['Italic', alphabet(0x1D434, 0x1D44E)],
  ['Bold italic', alphabet(0x1D468, 0x1D482)],
  ['Cursive script', alphabet(0x1D49C, 0x1D4B6, null, specialCharacters.script)],
  ['Bold script', alphabet(0x1D4D0, 0x1D4EA)],
  ['Fraktur', alphabet(0x1D504, 0x1D51E, null, specialCharacters.fraktur)],
  ['Bold Fraktur', alphabet(0x1D56C, 0x1D586)],
  ['Double-struck', alphabet(0x1D538, 0x1D552, 0x1D7D8, specialCharacters.double)],
  ['Sans serif', alphabet(0x1D5A0, 0x1D5BA, 0x1D7E2)],
  ['Sans serif bold', alphabet(0x1D5D4, 0x1D5EE, 0x1D7EC)],
  ['Sans serif italic', alphabet(0x1D608, 0x1D622)],
  ['Sans serif bold italic', alphabet(0x1D63C, 0x1D656)],
  ['Monospace', alphabet(0x1D670, 0x1D68A, 0x1D7F6)],
  ['Small caps', (value) => Array.from(value, (character) => smallCaps[character.toLowerCase()] || character).join('')],
  ['Circled', circled],
  ['Aesthetic fullwidth', fullwidth],
  ['Underline', combining('\u0332')],
  ['Strikethrough', combining('\u0336')],
];

export function FontGenerator() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState('');
  const [error, setError] = useState('');

  async function copyStyle(label, value) {
    try {
      await copyToClipboard(value);
      setCopied(label);
      setError('');
      window.setTimeout(() => setCopied(''), 1800);
    } catch {
      setError('Clipboard access is unavailable. Select and copy the style manually.');
    }
  }

  return (
    <section aria-label="Font style generator" className="rounded-2xl border border-white/10 bg-[#111114] p-5 sm:p-7">
      <label htmlFor="font-input" className="flex items-center gap-2 text-sm font-semibold text-white"><Type aria-hidden="true" className="size-4 text-[#FF7182]" />Your text</label>
      <textarea id="font-input" value={text} onChange={(event) => setText(event.target.value)} placeholder="Try a name, bio, or board title" rows={3} className="mt-3 w-full resize-y rounded-xl border border-white/10 bg-[#0B0B0E] px-4 py-3 text-base text-white placeholder:text-zinc-600 focus:border-[#E60023] focus:outline-none focus:ring-2 focus:ring-[#E60023]/30" />
      <p className="mt-2 text-xs text-zinc-500">Unicode text styles. Appearance may vary by device and app.</p>
      {error && <p role="alert" className="mt-3 text-sm text-rose-300">{error}</p>}
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {styles.map(([label, transform]) => {
          const result = transform(text);
          return (
            <div key={label} className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-[#141418] p-3">
              <div className="min-w-0"><p className="text-[11px] font-medium text-zinc-500">{label}</p><p className="mt-1 break-all text-sm text-white">{result || 'Your styled text appears here'}</p></div>
              <button type="button" onClick={() => result && copyStyle(label, result)} disabled={!result} aria-label={`Copy ${label} style`} className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-lg border border-white/10 px-3 text-xs font-semibold text-zinc-300 hover:border-white/25 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E60023]"><Copy aria-hidden="true" className="size-3.5" />{copied === label ? 'Copied' : 'Copy'}</button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
