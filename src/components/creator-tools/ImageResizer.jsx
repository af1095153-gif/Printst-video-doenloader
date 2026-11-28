'use client';

import { useEffect, useState } from 'react';
import { Download, Image as ImageIcon } from 'lucide-react';
import { ImageUploader } from './ImageUploader';

const presets = [
  { id: 'standard', name: 'Standard Pin', width: 1000, height: 1500, ratio: '2:3' },
  { id: 'square', name: 'Square Pin', width: 1000, height: 1000, ratio: '1:1' },
  { id: 'long', name: 'Long Pin', width: 1000, height: 2100, ratio: '10:21' },
  { id: 'story', name: 'Story / Idea Pin', width: 1080, height: 1920, ratio: '9:16' },
];
const formats = { jpg: { mime: 'image/jpeg', extension: 'jpg' }, webp: { mime: 'image/webp', extension: 'webp' }, png: { mime: 'image/png', extension: 'png' } };

function loadImage(source) {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('This image could not be opened in your browser.'));
    image.src = source;
  });
}

function canvasBlob(canvas, mime, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('Could not encode this image. Try a different format.')), mime, quality);
  });
}

export function ImageResizer() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [preset, setPreset] = useState(presets[0].id);
  const [format, setFormat] = useState('jpg');
  const [quality, setQuality] = useState(0.9);
  const [working, setWorking] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!file) { setPreviewUrl(''); return undefined; }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  async function resizeAndDownload() {
    if (!previewUrl || working) return;
    setWorking(true);
    setError('');
    setMessage('');
    try {
      const selected = presets.find((item) => item.id === preset);
      const image = await loadImage(previewUrl);
      const canvas = document.createElement('canvas');
      canvas.width = selected.width;
      canvas.height = selected.height;
      const context = canvas.getContext('2d');
      if (!context) throw new Error('Canvas is not available in this browser.');
      if (format === 'jpg') { context.fillStyle = '#ffffff'; context.fillRect(0, 0, canvas.width, canvas.height); }
      const scale = Math.max(selected.width / image.naturalWidth, selected.height / image.naturalHeight);
      const sourceWidth = selected.width / scale;
      const sourceHeight = selected.height / scale;
      const sourceX = (image.naturalWidth - sourceWidth) / 2;
      const sourceY = (image.naturalHeight - sourceHeight) / 2;
      context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, selected.width, selected.height);
      const output = formats[format];
      const blob = await canvasBlob(canvas, output.mime, format === 'png' ? undefined : quality);
      if (blob.type !== output.mime) throw new Error(`${format.toUpperCase()} export is not supported by this browser. Choose another format.`);
      const baseName = file.name.replace(/\.[^.]+$/, '').replace(/[^a-z0-9-_]+/gi, '-').replace(/^-+|-+$/g, '') || 'pinterest-image';
      const downloadUrl = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = downloadUrl;
      anchor.download = `KikPin.me-${baseName}-${selected.width}x${selected.height}.${output.extension}`;
      document.body.append(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
      setMessage(`Downloaded ${selected.name} at ${selected.width} × ${selected.height} as ${format.toUpperCase()}.`);
    } catch (caught) {
      setError(caught.message || 'The image could not be resized. Please try another file.');
    } finally {
      setWorking(false);
    }
  }

  return (
    <section aria-label="Pinterest image resizer" className="rounded-2xl border border-white/10 bg-[#111114] p-5 sm:p-7">
      <ImageUploader file={file} onFile={(nextFile) => { setFile(nextFile); setMessage(''); setError(''); }} id="resizer-image" />
      {previewUrl && <div className="mt-5 flex flex-wrap items-center gap-4 rounded-xl border border-white/[0.08] bg-[#0B0B0E] p-3"><img src={previewUrl} alt="Selected image preview" className="size-16 rounded-lg object-cover" /><div className="min-w-0"><p className="truncate text-sm font-medium text-white">{file.name}</p><p className="mt-1 text-xs text-zinc-500">{Math.max(1, Math.round(file.size / 1024))} KB · Center-cropped to fill the selected size</p></div><button type="button" onClick={() => { setFile(null); setMessage(''); setError(''); }} className="ml-auto min-h-10 rounded-lg px-3 text-xs font-semibold text-zinc-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E60023]">Remove</button></div>}
      <fieldset className="mt-6"><legend className="text-sm font-semibold text-white">Choose a Pinterest size</legend><div className="mt-3 grid gap-2 sm:grid-cols-2">{presets.map((item) => <label key={item.id} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-colors ${preset === item.id ? 'border-[#E60023]/70 bg-[#E60023]/[0.08]' : 'border-white/10 bg-[#141418] hover:border-white/20'}`}><input type="radio" name="pin-preset" value={item.id} checked={preset === item.id} onChange={() => setPreset(item.id)} className="accent-[#E60023]" /><span className="min-w-0 flex-1"><span className="block text-sm font-semibold text-white">{item.name}</span><span className="mt-0.5 block text-xs text-zinc-500">{item.width} × {item.height} · {item.ratio}</span></span></label>)}</div></fieldset>
      <div className={`mt-5 grid gap-4 ${format === 'png' ? 'grid-cols-1' : 'sm:grid-cols-[1fr_1.5fr]'}`}>
        <label className="grid gap-2 text-sm font-semibold text-white">File format<select value={format} onChange={(event) => setFormat(event.target.value)} className="min-h-11 rounded-lg border border-white/10 bg-[#0B0B0E] px-3 text-sm font-normal text-zinc-200 focus:border-[#E60023] focus:outline-none focus:ring-2 focus:ring-[#E60023]/30">{Object.keys(formats).map((type) => <option key={type} value={type}>{type.toUpperCase()}</option>)}</select></label>
        {format !== 'png' && <label className="grid gap-2 text-sm font-semibold text-white">Quality <span className="flex items-center gap-3"><input aria-label="Image quality" type="range" min="0.5" max="1" step="0.05" value={quality} onChange={(event) => setQuality(Number(event.target.value))} className="w-full accent-[#E60023]" /><span className="w-10 text-right text-xs text-zinc-400">{Math.round(quality * 100)}%</span></span></label>}
      </div>
      <button type="button" onClick={resizeAndDownload} disabled={!file || working} className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#E60023] px-5 text-sm font-bold text-white transition-colors hover:bg-[#CC001F] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#111114]"><Download aria-hidden="true" className="size-4" />{working ? 'Resizing…' : 'Resize & Download'}</button>
      {!file && <p className="mt-3 flex items-center gap-2 text-xs text-zinc-500"><ImageIcon aria-hidden="true" className="size-3.5" />Your image stays on this device and is processed in your browser.</p>}
      {message && <p role="status" className="mt-3 text-sm text-emerald-300">{message}</p>}{error && <p role="alert" className="mt-3 text-sm text-rose-300">{error}</p>}
    </section>
  );
}
