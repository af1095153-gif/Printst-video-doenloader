import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Header } from './components/Header';
import { UrlExtractorBar } from './components/UrlExtractorBar';
import { MediaResultCard } from './components/MediaResultCard';
import {
  FaqSection,
  HowToSection,
  RecentHistorySection,
  SupportedFormatsSection,
} from './components/InfoSections';
import type { ExtractionStatus, HistoryItem, PinMediaResult } from './types/pinterest';
import {
  clearStoredHistory,
  loadHistory,
  mergeHistoryItem,
  saveHistory,
  validatePinUrlInput,
} from './utils/pinterestClient';
import { getSeoPage, updateDocumentMetadata } from './seoPages';

const VideoSeoPage = lazy(() => import('./components/seoPages/VideoSeoPage'));
const ImageSeoPage = lazy(() => import('./components/seoPages/ImageSeoPage'));
const GifSeoPage = lazy(() => import('./components/seoPages/GifSeoPage'));
const DownloadGuideSeoPage = lazy(() => import('./components/seoPages/DownloadGuideSeoPage'));

export default function App() {
  const seoPage = getSeoPage(window.location.pathname);
  const [urlInput, setUrlInput] = useState('');
  const [status, setStatus] = useState<ExtractionStatus>('idle');
  const [result, setResult] = useState<PinMediaResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [clipboardNotice, setClipboardNotice] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const activeRequestIdRef = useRef(0);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  useEffect(() => {
    if (seoPage) updateDocumentMetadata(seoPage);
  }, [seoPage?.pathname]);

  const runExtraction = useCallback(async (urlOverride?: string) => {
    const rawTarget = typeof urlOverride === 'string' ? urlOverride : urlInput;
    if (typeof urlOverride === 'string') {
      setUrlInput(urlOverride);
    }
    setClipboardNotice(null);

    const validation = validatePinUrlInput(rawTarget);
    if (!validation.valid || !validation.normalized) {
      setStatus('error');
      setResult(null);
      setErrorMessage(validation.error || 'Please enter a valid Pinterest URL.');
      return;
    }

    const requestId = ++activeRequestIdRef.current;
    setStatus('loading');
    setErrorMessage(null);

    try {
      const response = await fetch(
        `/api/extract?url=${encodeURIComponent(validation.normalized)}`,
      );
      const payload = await response.json().catch(() => ({}));

      if (requestId !== activeRequestIdRef.current) return;

      if (!response.ok) {
        setStatus('error');
        setResult(null);
        setErrorMessage(
          payload?.error || `Failed to extract Pin media (HTTP ${response.status}).`,
        );
        return;
      }

      const extracted = payload as PinMediaResult;
      setResult(extracted);
      setStatus('success');

      setHistory((prev) => {
        const next = mergeHistoryItem(prev, extracted);
        saveHistory(next);
        return next;
      });
    } catch {
      if (requestId !== activeRequestIdRef.current) return;
      setStatus('error');
      setResult(null);
      setErrorMessage('Network error while contacting the extractor. Please try again.');
    }
  }, [urlInput]);

  const handlePasteFromClipboard = useCallback(async () => {
    setClipboardNotice(null);
    const inputEl = document.getElementById('pin-url-input') as HTMLInputElement | null;

    if (!navigator.clipboard || typeof navigator.clipboard.readText !== 'function') {
      setClipboardNotice('Clipboard access is restricted here. Focus the input and press Ctrl+V or Cmd+V.');
      inputEl?.focus();
      return;
    }

    try {
      const text = await navigator.clipboard.readText();
      const trimmed = (text || '').trim();
      if (!trimmed) {
        setClipboardNotice('Your clipboard is empty. Copy a Pinterest link first, then click Paste.');
        inputEl?.focus();
        return;
      }

      setUrlInput(trimmed);
      const check = validatePinUrlInput(trimmed);
      if (check.valid) {
        await runExtraction(trimmed);
      } else {
        setClipboardNotice('Pasted clipboard text. Make sure it is a pinterest.com or pin.it link.');
        inputEl?.focus();
      }
    } catch {
      setClipboardNotice('Browser blocked clipboard read. Click inside the box and press Ctrl+V or Cmd+V.');
      inputEl?.focus();
    }
  }, [runExtraction]);

  const handleClear = useCallback(() => {
    activeRequestIdRef.current += 1;
    setUrlInput('');
    setClipboardNotice(null);
    setStatus('idle');
    setResult(null);
    setErrorMessage(null);
  }, []);

  const handleSelectHistoryItem = useCallback((item: HistoryItem) => {
    setUrlInput(item.sourceUrl);
    setResult(item);
    setErrorMessage(null);
    setStatus('success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleClearHistory = useCallback(() => {
    clearStoredHistory();
    setHistory([]);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0B0E] text-[#F4F4F6]">
      <Header onPasteAction={handlePasteFromClipboard} />

      <main className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
        {/* Hero Extractor Workspace */}
        <section id="downloader" className="max-w-4xl">
          <p className="text-xs font-semibold tracking-wide text-[#FF3B53]">
            {seoPage?.eyebrow || 'Video Pins · Idea Pins · Original Images'}
          </p>
          <h1 className="mt-2.5 text-3xl font-extrabold tracking-[-0.015em] text-white sm:text-5xl text-balance">
            {seoPage?.h1 || 'KikPin – Pinterest Video, Image & GIF Downloader'}
          </h1>
          <p className="mt-3.5 max-w-2xl text-base leading-relaxed text-zinc-400">
            {seoPage?.lead || (
              <>
                Save public Pinterest videos, reels, images, GIFs, and carousels—including{' '}
                <span className="font-mono text-sm text-zinc-200">pin.it</span> links—in the source quality Pinterest provides (HD, 2K, or 4K when available). No watermark or login credentials required.
              </>
            )}
          </p>

          <div className="mt-7">
            <UrlExtractorBar
              urlInput={urlInput}
              status={status}
              clipboardNotice={clipboardNotice}
              onUrlChange={(val) => {
                setUrlInput(val);
                if (clipboardNotice) setClipboardNotice(null);
              }}
              onSubmit={runExtraction}
              onPasteClick={handlePasteFromClipboard}
              onClear={handleClear}
            />
          </div>
        </section>

        {/* Loading, Error, or Extracted Media Workbench */}
        <MediaResultCard
          key={result ? `${result.sourceUrl}-${result.mediaUrl}` : status}
          status={status}
          result={result}
          errorMessage={errorMessage}
          onRetry={() => runExtraction()}
          onReset={handleClear}
        />

        {seoPage && (
          <Suspense
            fallback={
              <section aria-label="Loading page content" className="mt-16 min-h-[360px] border-t border-white/10 pt-12">
                <div className="h-7 w-64 animate-pulse rounded bg-white/8" />
                <div className="mt-4 h-4 w-full max-w-2xl animate-pulse rounded bg-white/6" />
                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                  {[0, 1, 2].map((item) => (
                    <div key={item} className="h-40 animate-pulse rounded-2xl border border-white/10 bg-[#141418]" />
                  ))}
                </div>
              </section>
            }
          >
            {seoPage.pathname === '/pinterest-video-downloader' && <VideoSeoPage />}
            {seoPage.pathname === '/pinterest-image-downloader' && <ImageSeoPage />}
            {seoPage.pathname === '/pinterest-gif-downloader' && <GifSeoPage />}
            {seoPage.pathname === '/how-to-download-pinterest-videos' && <DownloadGuideSeoPage />}
          </Suspense>
        )}

        <HowToSection />
        <SupportedFormatsSection />

        <RecentHistorySection
          items={history}
          onSelectHistoryItem={handleSelectHistoryItem}
          onClearHistory={handleClearHistory}
        />

        <FaqSection />
      </main>

      <footer className="border-t border-white/10 py-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>KikPin — Free Pinterest video, image, and GIF downloader.</p>
          <p>KikPin is independent and not affiliated with Pinterest. Download only content you own or have permission to save.</p>
        </div>
      </footer>
    </div>
  );
}
