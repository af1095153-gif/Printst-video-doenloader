'use client';

import { useEffect, useState } from 'react';
import { Check, Copy, Palette } from 'lucide-react';
import { ImageUploader } from './ImageUploader';
import { copyToClipboard } from './clipboard';

function extractDominantColors(image) {
  const canvas = document.createElement('canvas');
  const scale = Math.min(1, 64 / Math.max(image.naturalWidth, image.naturalHeight));
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) throw new Error('Canvas is not available in this browser.');
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  const { data } = context.getImageData(0, 0, canvas.width, canvas.height);
  const buckets = new Map();
  for (let index = 0; index < data.length; index += 4) {
    const alpha = data[index + 3];
    if (alpha < 32) continue;
    const red = data[index]; const green = data[index + 1]; const blue = data[index + 2];
    const key = `${red >> 4}-${green >> 4}-${blue >> 4}`;
    const bucket = buckets.get(key) || { red: 0, green: 0, blue: 0, count: 0 };
    bucket.red += red; bucket.green += green; bucket.blue += blue; bucket.count += 1;
    buckets.set(key, bucket);
  }
  return [...buckets.values()].sort((first, second) => second.count - first.count).slice(0, 5).map((bucket) => {
    const red = Math.round(bucket.red / bucket.count); const green = Math.round(bucket.green / bucket.count); const blue = Math.round(bucket.blue / bucket.count);
    const hex = `#${[red, green, blue].map((channel) => channel.toString(16).padStart(2, '0')).join('')}`.toUpperCase();
    return { red, green, blue, hex, rgb: `rgb(${red}, ${green}, ${blue})` };
  });
}

export function ColorPaletteGenerator() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [colors, setColors] = useState([]);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');

  useEffect(() => {
    if (!file) { setPreviewUrl(''); setColors([]); return undefined; }
    const url = URL.createObjectURL(file);
    const image = new window.Image();
    image.onload = () => {
      try { setColors(extractDominantColors(image)); setError(''); }
      catch (caught) { setError(caught.message || 'Could not read image colors.'); }
    };
    image.onerror = () => setError('This image could not be opened in your browser.');
    image.src = url;
    setPreviewUrl(url);
    return () => { image.onload = null; image.onerror = null; URL.revokeObjectURL(url); };
  }, [file]);

  async function copyColor(color, format) {
    const value = format === 'hex' ? color.hex : color.rgb;
    try { await copyToClipboard(value); setCopied(`${color.hex}-${format}`); window.setTimeout(() => setCopied(''), 1600); }
    catch { setError('Clipboard access is unavailable. Select the color code and copy it manually.'); }
  }

  return (
    <section aria-label="Pinterest image color palette generator" className="rounded-2xl border border-white/10 bg-[#111114] p-5 sm:p-7">
      <ImageUploader file={file} onFile={(nextFile) => { setFile(nextFile); setError(''); setCopied(''); }} id="palette-image" />
      {previewUrl && <div className="mt-5 flex items-center gap-4 rounded-xl border border-white/[0.08] bg-[#0B0B0E] p-3"><img src={previewUrl} alt="Image used to extract a color palette" className="size-16 rounded-lg object-cover" /><div><p className="text-sm font-medium text-white">{file.name}</p><p className="mt-1 text-xs text-zinc-500">Five most common color groups, sampled in your browser.</p></div></div>}
      {colors.length > 0 && <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{colors.map((color, index) => <article key={color.hex} className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#141418]"><div className="h-24" style={{ backgroundColor: color.hex }} role="img" aria-label={`Color ${index + 1}: ${color.hex}`} /><div className="space-y-2 p-3"><p className="flex items-center gap-2 text-sm font-bold text-white"><Palette aria-hidden="true" className="size-3.5 text-[#FF7182]" />{color.hex}</p><button type="button" onClick={() => copyColor(color, 'hex')} className="flex min-h-9 w-full items-center justify-center gap-1.5 rounded-lg border border-white/10 px-2 text-xs font-semibold text-zinc-300 hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E60023]">{copied === `${color.hex}-hex` ? <Check aria-hidden="true" className="size-3.5" /> : <Copy aria-hidden="true" className="size-3.5" />}{copied === `${color.hex}-hex` ? 'Copied HEX' : 'Copy HEX'}</button><button type="button" onClick={() => copyColor(color, 'rgb')} className="flex min-h-9 w-full items-center justify-center gap-1.5 rounded-lg border border-white/10 px-2 text-xs font-semibold text-zinc-300 hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E60023]">{copied === `${color.hex}-rgb` ? <Check aria-hidden="true" className="size-3.5" /> : <Copy aria-hidden="true" className="size-3.5" />}{copied === `${color.hex}-rgb` ? 'Copied RGB' : color.rgb}</button></div></article>)}</div>}
      {error && <p role="alert" className="mt-4 text-sm text-rose-300">{error}</p>}
      {!file && <p className="mt-4 text-xs text-zinc-500">Your image is sampled locally and is never uploaded.</p>}
    </section>
  );
}
