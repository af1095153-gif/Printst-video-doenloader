'use client';

import { useState } from 'react';
import { ImagePlus } from 'lucide-react';

export function ImageUploader({ onFile, file, id = 'creator-image' }) {
  const [dragging, setDragging] = useState(false);
  function selectFile(nextFile) {
    if (nextFile && nextFile.type.startsWith('image/')) onFile(nextFile);
  }

  return (
    <div
      onDragEnter={(event) => { event.preventDefault(); setDragging(true); }}
      onDragOver={(event) => event.preventDefault()}
      onDragLeave={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setDragging(false); }}
      onDrop={(event) => { event.preventDefault(); setDragging(false); selectFile(event.dataTransfer.files?.[0]); }}
    >
      <input id={id} type="file" accept="image/*" className="sr-only" onChange={(event) => selectFile(event.target.files?.[0])} />
      <label htmlFor={id} className={`flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-8 text-center transition-colors focus-within:ring-2 focus-within:ring-[#E60023] ${dragging ? 'border-[#E60023] bg-[#E60023]/10' : 'border-white/20 bg-[#141418] hover:border-white/40'}`}>
        <ImagePlus aria-hidden="true" className="size-8 text-[#FF7182]" />
        <span className="mt-3 text-sm font-semibold text-white">{file ? file.name : 'Drop an image here or choose a file'}</span>
        <span className="mt-1 text-xs text-zinc-500">PNG, JPG, WebP, and other browser-readable image formats</span>
      </label>
    </div>
  );
}
