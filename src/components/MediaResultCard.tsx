import { useState } from 'react';
import {
  AlertCircle,
  Check,
  Download,
  ExternalLink,
  Film,
  Image as ImageIcon,
  Layers,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import type { ExtractionStatus, PinMediaResult } from '../types/pinterest';
import { buildDownloadProxyUrl, formatShortHost } from '../utils/pinterestClient';

interface MediaResultCardProps {
  status: ExtractionStatus;
  result: PinMediaResult | null;
  errorMessage: string | null;
  onRetry: () => void;
  onReset: () => void;
}

export function MediaResultCard({
  status,
  result,
  errorMessage,
  onRetry,
  onReset,
}: MediaResultCardProps) {
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [imageLoadFailed, setImageLoadFailed] = useState(false);

  if (status === 'idle') {
    return null;
  }

  if (status === 'loading') {
    return (
      <section
        aria-label="Extracting Pinterest media"
        aria-busy="true"
        data-testid="extraction-loading-skeleton"
        className="mt-8 rounded-2xl border border-white/10 bg-[#141418] p-5 sm:p-7"
      >
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] w-full animate-pulse rounded-xl bg-white/6" />
          </div>
          <div className="lg:col-span-7 flex flex-col gap-5 pt-1">
            <div className="h-4 w-48 animate-pulse rounded bg-white/8" />
            <div className="space-y-2.5">
              <div className="h-8 w-4/5 animate-pulse rounded bg-white/8" />
              <div className="h-8 w-2/3 animate-pulse rounded bg-white/8" />
            </div>
            <div className="h-4 w-32 animate-pulse rounded bg-white/6" />
            <div className="border-t border-white/8 pt-5 grid grid-cols-2 gap-4">
              <div className="h-12 animate-pulse rounded bg-white/6" />
              <div className="h-12 animate-pulse rounded bg-white/6" />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <div className="h-12 flex-1 animate-pulse rounded-xl bg-[#E60023]/30" />
              <div className="h-12 flex-1 animate-pulse rounded-xl bg-white/8" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (status === 'error' || !result) {
    return (
      <section
        role="alert"
        data-testid="extraction-error-card"
        className="mt-8 rounded-2xl border border-[#E60023]/40 bg-[#181214] p-6"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3.5">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#FF3B53]" aria-hidden="true" />
            <div>
              <h2 className="text-base font-semibold text-white">Could not extract media from this link</h2>
              <p className="mt-1 text-sm text-zinc-300">
                {errorMessage || 'Please check that the Pin is public and try again.'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex min-h-[42px] items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white whitespace-nowrap transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E60023] cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Retry</span>
            </button>
            <button
              type="button"
              onClick={onReset}
              className="inline-flex min-h-[42px] items-center rounded-xl px-3.5 py-2 text-xs font-medium text-zinc-300 whitespace-nowrap transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E60023] cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      </section>
    );
  }

  const slides = result.slides && result.slides.length > 0 ? result.slides : null;
  const safeIndex = slides ? Math.min(selectedSlideIndex, slides.length - 1) : 0;
  const activeSlide = slides ? slides[safeIndex] : null;

  const activeType = activeSlide ? activeSlide.type : result.type;
  const activeMediaUrl = activeSlide ? activeSlide.mediaUrl : result.mediaUrl;
  const activeThumbUrl = activeSlide ? activeSlide.thumbnailUrl : result.thumbnailUrl;
  const activeResolution = activeSlide ? activeSlide.resolution : result.resolution;

  const proxyUrl = buildDownloadProxyUrl(activeMediaUrl, activeType);

  const handleDownloadToDevice = async () => {
    setDownloading(true);
    setDownloadError(null);
    setDownloadSuccess(false);

    const ext =
      activeType === 'video'
        ? 'mp4'
        : activeMediaUrl.toLowerCase().includes('.png')
          ? 'png'
          : activeMediaUrl.toLowerCase().includes('.webp')
            ? 'webp'
            : 'jpg';
    const filename = `pinterest-media-${Date.now()}.${ext}`;

    try {
      const response = await fetch(proxyUrl);
      if (!response.ok) {
        throw new Error(`Proxy responded with ${response.status}`);
      }
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = objectUrl;
      anchor.download = filename;
      anchor.style.display = 'none';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      setTimeout(() => URL.revokeObjectURL(objectUrl), 4000);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3500);
    } catch {
      // Fallback for sandboxed iframe environments
      try {
        window.open(proxyUrl, '_blank', 'noopener,noreferrer');
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 3500);
      } catch {
        setDownloadError('Download could not start automatically. Use "Open Raw Media Link" instead.');
      }
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section
      aria-label="Extracted media preview"
      data-testid="extraction-result-card"
      className="mt-8 rounded-2xl border border-white/10 bg-[#141418] p-5 sm:p-7"
    >
      <div className="grid grid-cols-1 gap-7 lg:grid-cols-12 items-start">
        {/* Left: HTML5 Video or Image Preview */}
        <div className="lg:col-span-5">
          <div className="overflow-hidden rounded-xl border border-white/10 bg-[#08080A]">
            {activeType === 'video' ? (
              <video
                key={activeMediaUrl}
                src={activeMediaUrl}
                poster={activeThumbUrl || undefined}
                controls
                playsInline
                preload="metadata"
                className="max-h-[520px] w-full bg-black object-contain"
              />
            ) : !imageLoadFailed ? (
              <img
                key={activeMediaUrl}
                src={activeMediaUrl}
                alt={result.title}
                referrerPolicy="no-referrer"
                onError={() => setImageLoadFailed(true)}
                className="max-h-[520px] w-full object-contain bg-[#08080A]"
              />
            ) : (
              <div className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-3 bg-gradient-to-b from-[#1A1A20] to-[#0E0E12] p-6 text-center">
                <ImageIcon className="h-10 w-10 text-zinc-500" aria-hidden="true" />
                <p className="text-sm font-medium text-zinc-300">{result.title}</p>
                <p className="text-xs text-zinc-500">Preview blocked by browser; direct download still works.</p>
              </div>
            )}
          </div>

          {/* Multi-slide selector for Idea Pins */}
          {slides && slides.length > 1 && (
            <div className="mt-3">
              <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-zinc-400">
                <Layers className="h-3.5 w-3.5 text-[#E60023]" aria-hidden="true" />
                <span className="tabular-nums">Idea Pin Slides ({slides.length})</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {slides.map((slide, idx) => {
                  const isActive = idx === safeIndex;
                  return (
                    <button
                      key={`${slide.mediaUrl}-${idx}`}
                      type="button"
                      onClick={() => {
                        setSelectedSlideIndex(idx);
                        setImageLoadFailed(false);
                      }}
                      className={`inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E60023] ${
                        isActive
                          ? 'border-[#E60023] bg-[#E60023]/15 text-white'
                          : 'border-white/10 bg-[#1B1B21] text-zinc-300 hover:border-white/25 hover:text-white'
                      }`}
                    >
                      {slide.type === 'video' ? (
                        <Film className="h-3 w-3" aria-hidden="true" />
                      ) : (
                        <ImageIcon className="h-3 w-3" aria-hidden="true" />
                      )}
                      <span className="tabular-nums">Slide {idx + 1}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right: Metadata, Resolution Indicator, and Download Actions */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-6">
          <div>
            {/* Unboxed metadata row with typographic separators (Zero-Pill Discipline) */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-400">
              <span className="text-[#FF4D64] font-semibold">{result.pinType}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums text-zinc-200" data-testid="detected-resolution">
                {activeResolution}
              </span>
              <span aria-hidden="true">·</span>
              <span>{formatShortHost(result.sourceUrl)}</span>
              {result.author && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>By {result.author}</span>
                </>
              )}
            </div>

            <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-white text-balance">
              {result.title}
            </h2>

            {/* Clean hairline specs row */}
            <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-white/10 py-4 text-sm">
              <div>
                <dt className="text-xs text-zinc-500">Container Format</dt>
                <dd className="mt-1 font-mono text-sm font-medium text-zinc-200">
                  {activeType === 'video' ? 'MP4 (H.264)' : 'Original Image'}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-zinc-500">Detected Quality</dt>
                <dd className="mt-1 font-mono text-sm font-medium tabular-nums text-zinc-200">
                  {activeResolution}
                </dd>
              </div>
            </dl>
          </div>

          <div className="space-y-3">
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleDownloadToDevice}
                disabled={downloading}
                className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2.5 rounded-xl bg-[#E60023] px-5 py-3 text-sm font-semibold text-white whitespace-nowrap transition-colors hover:bg-[#CC001F] active:scale-[0.98] disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
              >
                {downloading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    <span>Preparing File</span>
                  </>
                ) : downloadSuccess ? (
                  <>
                    <Check className="h-4 w-4" aria-hidden="true" />
                    <span>Download Started</span>
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" aria-hidden="true" />
                    <span>Download HD to Device</span>
                  </>
                )}
              </button>

              <a
                href={activeMediaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-zinc-100 whitespace-nowrap transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E60023]"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                <span>Open Raw Media Link</span>
              </a>
            </div>

            {downloadError && (
              <p role="alert" className="text-xs text-amber-300">
                {downloadError}
              </p>
            )}

            <p className="text-xs text-zinc-500">
              Files stream directly from Pinterest CDN through our SSRF-protected proxy with attachment headers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
