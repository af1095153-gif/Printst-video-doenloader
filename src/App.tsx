import { useEffect, useRef, useState } from 'react';
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
          <section className="mt-16 border-t border-white/10 pt-12">
            <h2 className="text-xl font-bold tracking-[-0.01em] text-white sm:text-2xl">
              {seoPage.sectionTitle}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
              {seoPage.sectionIntro}
            </p>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              {seoPage.topics.map((topic) => (
                <article key={topic.title} className="rounded-2xl border border-white/10 bg-[#141418] p-6">
                  <h3 className="text-base font-semibold text-white">{topic.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{topic.description}</p>
                </article>
              ))}
            </div>
            {seoPage.pathname === '/how-to-download-pinterest-videos' && (
              <div className="mt-8 rounded-2xl border border-white/10 bg-[#141418] p-6">
                <h3 className="text-base font-semibold text-white">Troubleshooting pin.it links and private Pins</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  If a pin.it link does not open, copy it again from the Pinterest share menu or paste the full destination URL. KikPin cannot save private Pins, deleted Pins, or content whose owner has restricted access. Only public Pins and content you own or are permitted to use can be downloaded.
                </p>
              </div>
            )}
          </section>
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
