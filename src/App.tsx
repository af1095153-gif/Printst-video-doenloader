import { useEffect, useRef, useState } from 'react';
import { Star } from 'lucide-react';
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

export default function App() {
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

  const runExtraction = async (urlOverride?: string) => {
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
  };

  const handlePasteFromClipboard = async () => {
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
  };

  const handleClear = () => {
    activeRequestIdRef.current += 1;
    setUrlInput('');
    setClipboardNotice(null);
    setStatus('idle');
    setResult(null);
    setErrorMessage(null);
  };

  const handleSelectHistoryItem = (item: HistoryItem) => {
    setUrlInput(item.sourceUrl);
    setResult(item);
    setErrorMessage(null);
    setStatus('success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearHistory = () => {
    clearStoredHistory();
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0E] text-[#F4F4F6]">
      <Header onPasteAction={handlePasteFromClipboard} />

      <main className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
        {/* Hero Extractor Workspace */}
        <section id="downloader" className="max-w-4xl">
          <p className="text-xs font-semibold tracking-wide text-[#FF3B53]">
            Video Pins · Idea Pins · Original Images
          </p>
          <h1 className="mt-2.5 text-3xl font-extrabold tracking-[-0.015em] text-white sm:text-5xl text-balance">
            KikPin – Pinterest Video, Image &amp; GIF Downloader
          </h1>
          <p className="mt-3.5 max-w-2xl text-base leading-relaxed text-zinc-400">
            Save public Pinterest videos, reels, images, GIFs, and carousels—including{' '}
            <span className="font-mono text-sm text-zinc-200">pin.it</span> links—in the source quality Pinterest provides (HD, 2K, or 4K when available). No watermark or login credentials required.
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

        <div className="mt-5">
          <a
            href="https://www.trustpilot.com/review/kikpin.me"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-white/10 bg-[#141418] px-4 py-2.5 text-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#00b67a]/50 hover:bg-[#19191e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00b67a]"
          >
            <span aria-hidden="true" className="flex shrink-0 items-center gap-0.5 text-[#00b67a]">
              {Array.from({ length: 5 }, (_, index) => (
                <Star key={index} className="size-3.5 fill-current sm:size-4" strokeWidth={1.5} />
              ))}
            </span>
            <span className="font-medium text-zinc-200">Rated 5.0 / 5 on Trustpilot</span>
          </a>
        </div>

        {/* Loading, Error, or Extracted Media Workbench */}
        <MediaResultCard
          key={result ? `${result.sourceUrl}-${result.mediaUrl}` : status}
          status={status}
          result={result}
          errorMessage={errorMessage}
          onRetry={() => runExtraction()}
          onReset={handleClear}
        />

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
