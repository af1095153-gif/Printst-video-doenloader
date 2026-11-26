import { Download, ExternalLink, Film } from 'lucide-react';
import { buildDownloadProxyUrl } from '../utils/pinterestClient';

const sampleResult = {
  sourceUrl: 'https://www.pinterest.com/pin/368450813289448972/',
  mediaUrl: 'https://v1.pinimg.com/videos/iht/expMp4/75/99/91/759991cd2233b8f50678fa5bee7d49a6_720w.mp4',
  thumbnailUrl: 'https://i.pinimg.com/videos/thumbnails/originals/75/99/91/759991cd2233b8f50678fa5bee7d49a6.0000000.jpg',
  title: 'Pendleton® Whisky Chicken Fajitas',
  author: 'Tastemade',
  resolution: '720p HD',
};

export function SampleResultPreview() {
  const downloadUrl = buildDownloadProxyUrl(sampleResult.mediaUrl, 'video');

  return (
    <section aria-labelledby="sample-result-heading" className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[#141418]">
      <div className="flex flex-col gap-5 p-4 sm:flex-row sm:items-center sm:p-5">
        <a
          href={sampleResult.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open the original Tastemade Pinterest Pin"
          className="group relative block aspect-video w-full shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#0B0B0E] sm:w-52"
        >
          <img
            src={sampleResult.thumbnailUrl}
            alt="Video preview from Tastemade's Pendleton Whisky Chicken Fajitas Pin"
            width="480"
            height="270"
            loading="eager"
            decoding="async"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
          <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-md bg-black/80 px-2 py-1 text-[11px] font-medium text-white">
            <Film className="size-3" aria-hidden="true" />
            Real sample Pin
          </span>
        </a>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#FF7182]">A real extraction result</p>
            <span className="rounded-full border border-[#E60023]/30 bg-[#E60023]/10 px-2.5 py-1 text-xs font-semibold text-white">{sampleResult.resolution}</span>
          </div>
          <h2 id="sample-result-heading" className="mt-2 text-lg font-bold leading-snug text-white sm:text-xl">{sampleResult.title}</h2>
          <p className="mt-1 text-sm text-zinc-400">Pinterest video · {sampleResult.author} · MP4 (H.264)</p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
            <a
              href={downloadUrl}
              download
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#E60023] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#CC001F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Download className="size-4" aria-hidden="true" />
              Download 720p MP4
            </a>
            <a href={sampleResult.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E60023]">
              View source Pin <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
      <p className="border-t border-white/8 px-4 py-3 text-xs leading-relaxed text-zinc-500 sm:px-5">Live sample result: the quality shown is what Pinterest provided for this Pin. Other Pins may have different source formats and resolutions.</p>
    </section>
  );
}
