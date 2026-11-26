'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Header } from './components/Header';
import { BrowserExtensionSection } from './components/BrowserExtensionSection';
import { UrlExtractorBar } from './components/UrlExtractorBar';
import { MediaResultCard } from './components/MediaResultCard';
import {
  DeviceGuidesSection,
  FaqSection,
  HowToSection,
  LatestUpdatesSection,
  RecentHistorySection,
  SupportedFormatsSection,
  WhoUsesKikPinSection,
} from './components/InfoSections';
import { SustainabilitySection, TrustSignalsSection, WhyKikPinSection } from './components/HomepageTrustSections';
import { SampleResultPreview } from './components/SampleResultPreview';
import type { ExtractionStatus, HistoryItem, PinMediaResult } from './types/pinterest';
import {
  clearStoredHistory,
  loadHistory,
  mergeHistoryItem,
  saveHistory,
  validatePinUrlInput,
} from './utils/pinterestClient';
import { getSeoPage } from './seoPages';
import SeoLandingSection from './components/SeoLandingSection';
import { SiteFooter, ToolLinks } from './components/ToolLinks';
import { LatestBlog, TrustpilotBadge } from './components/BlogContent';

export default function App({ pathname = '/' }: { pathname?: string }) {
  const seoPage = getSeoPage(pathname);
  const [urlInput, setUrlInput] = useState('');
  const [status, setStatus] = useState<ExtractionStatus>('idle');
  const [result, setResult] = useState<PinMediaResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [clipboardNotice, setClipboardNotice] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const activeRequestIdRef = useRef(0);
  const queryUrlHandledRef = useRef(false);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

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

  useEffect(() => {
    if (queryUrlHandledRef.current || pathname !== '/') return;
    queryUrlHandledRef.current = true;

    const queryUrl = new URLSearchParams(window.location.search).get('url');
    const initialUrl = queryUrl?.trim();
    if (initialUrl) void runExtraction(initialUrl);
  }, [pathname, runExtraction]);

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
      <Header
        onPasteAction={
          pathname === '/extension'
            ? () => {
                window.location.href = '/pinterest-video-downloader#downloader';
              }
            : handlePasteFromClipboard
        }
        actionLabel={pathname === '/extension' ? 'Open Downloader' : undefined}
      />

      <main className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
        {pathname === '/extension' ? (
          <>
            <section className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#FF7182]">KikPin for your browser</p>
              <h1 className="mt-2.5 text-3xl font-extrabold tracking-[-0.015em] text-white sm:text-5xl text-balance">KikPin Browser Extension</h1>
              <p className="mt-3.5 max-w-2xl text-base leading-relaxed text-zinc-400">
                Download public Pinterest videos in one click with the free KikPin extension. Install the Microsoft Edge version below; Firefox and Chrome listings are coming soon.
              </p>
            </section>

            <BrowserExtensionSection />

            <section aria-labelledby="extension-privacy-heading" className="mt-10 border-t border-white/10 pt-10">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#FF7182]">Privacy first</p>
                <h2 id="extension-privacy-heading" className="mt-2 text-xl font-bold text-white sm:text-2xl">A minimal-permission extension</h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">KikPin is designed to do its job without broad browser access or collecting personal data.</p>
              </div>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  ['Manifest V3', 'Built on the current extension platform for Microsoft Edge and Firefox.'],
                  ['activeTab only', 'Uses the activeTab permission to access the current tab after you choose to use the extension.'],
                  ['Zero remote code', 'The extension runs its packaged code and does not load executable code remotely.'],
                  ['Zero background data collection', 'No browsing history, personal data, or analytics are collected. When you start a download, only the selected Pin URL is passed to KikPin to process your request.'],
                ].map(([title, description]) => (
                  <li key={title} className="rounded-2xl border border-white/10 bg-[#141418] p-5">
                    <h3 className="text-sm font-semibold text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">{description}</p>
                  </li>
                ))}
              </ul>
            </section>
            <ToolLinks />
          </>
        ) : (
          <>
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
                Save public Pinterest videos, Idea Pins with source audio, GIFs, carousels, and HD images—in original 1080p, 2K, or 4K quality when available. Made for creators, video editors, craft sellers, and board curators: no added watermark, pop-up ads, or account required.
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

        {!seoPage && status === 'idle' && <SampleResultPreview />}
        {!seoPage && status === 'idle' && <div className="mt-4"><TrustpilotBadge /></div>}

        {/* Loading, Error, or Extracted Media Workbench */}
        <MediaResultCard
          key={result ? `${result.sourceUrl}-${result.mediaUrl}` : status}
          status={status}
          result={result}
          errorMessage={errorMessage}
          onRetry={() => runExtraction()}
          onReset={handleClear}
        />

        {!seoPage && <WhyKikPinSection />}
        {!seoPage && <TrustSignalsSection />}
        {!seoPage && <SustainabilitySection />}
        {!seoPage && <BrowserExtensionSection />}

        <LatestUpdatesSection />
        <DeviceGuidesSection />

        {seoPage && <SeoLandingSection page={seoPage} />}

        <HowToSection />
        <SupportedFormatsSection />

        <RecentHistorySection
          items={history}
          onSelectHistoryItem={handleSelectHistoryItem}
          onClearHistory={handleClearHistory}
        />

        {!seoPage && <WhoUsesKikPinSection />}
        {!seoPage && <LatestBlog />}
        {!seoPage && <FaqSection />}
        {seoPage && <ToolLinks />}
          </>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
