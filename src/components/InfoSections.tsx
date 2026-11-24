import { useState, type KeyboardEvent } from 'react';
import { ChevronDown, Film, Image as ImageIcon, Layers, RotateCcw, Trash2 } from 'lucide-react';
import type { HistoryItem } from '../types/pinterest';
import { formatShortHost } from '../utils/pinterestClient';

export function HowToSection() {
  return (
    <section className="mt-16 border-t border-white/10 pt-12">
      <h2 className="text-xl sm:text-2xl font-bold tracking-[-0.01em] text-white">How to download from Pinterest</h2>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-white/10 bg-[#141418] p-6">
          <h3 className="text-base font-semibold text-white">Mobile app</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">Open the pin in the Pinterest app, tap •••, choose Copy Link, paste the link into KikPin, then select Download.</p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-[#141418] p-6">
          <h3 className="text-base font-semibold text-white">Desktop browser</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">Copy the pin URL from your browser, paste it into KikPin, select Download, and save the file to your Downloads folder.</p>
        </article>
      </div>
    </section>
  );
}

export function LatestUpdatesSection() {
  const updates = [
    { date: 'Nov 2026', dateTime: '2026-11', text: 'Added full 1080p HD & Idea Pin audio extraction.' },
    { date: 'Oct 2026', dateTime: '2026-10', text: 'Improved pin.it short-link speed and mobile Safari support.' },
    { date: 'Sep 2026', dateTime: '2026-09', text: 'Zero-watermark GIF & high-res cover image downloads live.' },
  ];

  return (
    <section aria-labelledby="latest-updates-heading" className="mt-10 rounded-2xl border border-white/10 bg-[#141418] p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xs">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#FF3B53]">What&apos;s new</p>
          <h2 id="latest-updates-heading" className="mt-1 text-lg font-bold text-white">Latest Updates</h2>
        </div>
        <ul className="grid flex-1 gap-3 text-sm text-zinc-300">
          {updates.map((update) => (
            <li key={update.date} className="flex items-start gap-2.5 text-sm sm:gap-3">
              <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#FF3B53]" />
              <time dateTime={update.dateTime} className="shrink-0 font-medium text-zinc-100">{update.date}</time>
              <span className="leading-relaxed text-zinc-400">{update.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function DeviceGuidesSection() {
  const deviceGuides = [
    {
      id: 'android',
      label: 'Android',
      steps: [
        'Copy the pin link in the Pinterest app.',
        'Open Chrome and go to kikpin.me.',
        'Paste the link, tap Extract Media, then save the file to your Gallery.',
      ],
    },
    {
      id: 'iphone',
      label: 'iPhone (iOS)',
      steps: [
        'Copy the pin link in Pinterest.',
        'Open Safari and go to kikpin.me.',
        'Paste the link and tap Extract Media. In Files, tap Share and choose Save Video or Save Image to add it to Photos.',
      ],
    },
    {
      id: 'desktop',
      label: 'PC / Mac',
      steps: [
        'Copy the Pin URL from your browser.',
        'Paste the link into kikpin.me.',
        'Choose Download HD MP4, or right-click the download link to save it.',
      ],
    },
  ];
  const [activeId, setActiveId] = useState(deviceGuides[0].id);
  const activeGuide = deviceGuides.find((guide) => guide.id === activeId) ?? deviceGuides[0];

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let nextIndex = currentIndex;
    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % deviceGuides.length;
    else if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + deviceGuides.length) % deviceGuides.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = deviceGuides.length - 1;
    else return;

    event.preventDefault();
    const nextGuide = deviceGuides[nextIndex];
    setActiveId(nextGuide.id);
    document.getElementById(`device-tab-${nextGuide.id}`)?.focus();
  };

  return (
    <section aria-labelledby="device-guides-heading" className="mt-12 border-t border-white/10 pt-10">
      <div className="max-w-2xl">
        <h2 id="device-guides-heading" className="text-xl font-bold tracking-[-0.01em] text-white sm:text-2xl">Device-specific download guides</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">Follow the steps for your device to save public Pinterest media with KikPin.</p>
      </div>
      <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-[#141418]">
        <div role="tablist" aria-label="Choose your device" className="flex flex-wrap gap-2 border-b border-white/10 p-3 sm:gap-3 sm:p-4">
          {deviceGuides.map((guide, index) => (
            <button
              key={guide.id}
              id={`device-tab-${guide.id}`}
              type="button"
              role="tab"
              aria-selected={activeId === guide.id}
              aria-controls="device-guide-panel"
              tabIndex={activeId === guide.id ? 0 : -1}
              onClick={() => setActiveId(guide.id)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              className={`min-h-10 rounded-lg px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B53] sm:px-4 ${activeId === guide.id ? 'bg-[#242429] text-white' : 'text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200'}`}
            >
              {guide.label}
            </button>
          ))}
        </div>
        <div id="device-guide-panel" role="tabpanel" aria-labelledby={`device-tab-${activeGuide.id}`} tabIndex={0} className="p-5 outline-none sm:p-6">
          <ol className="grid gap-4 sm:grid-cols-3">
            {activeGuide.steps.map((step, index) => (
              <li key={step} className="flex items-start gap-3 text-sm leading-relaxed text-zinc-300">
                <span aria-hidden="true" className="flex size-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#1C1C22] text-xs font-semibold text-[#FF3B53]">{index + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function SupportedFormatsSection() {
  const formats = [
    {
      icon: Film,
      title: '01. HD Video Pins',
      description:
        'Extracts direct 720p and 1080p MP4 streams via JSON-LD, __PWS_DATA__, and HLS-to-MP4 conversion with audio intact.',
    },
    {
      icon: Layers,
      title: '02. Multi-Slide Idea Pins',
      description:
        'Parses story_pin_data carousels so every individual video clip and high-resolution slide can be previewed and saved.',
    },
    {
      icon: ImageIcon,
      title: '03. Original HD Images',
      description:
        'Resolves full-size originals and 736px assets cleanly—including shortened pin.it and mobile share links with tracking stripped.',
    },
  ];

  return (
    <section id="formats" className="mt-16 border-t border-white/10 pt-12">
      <div className="max-w-2xl">
        <h2 className="text-xl sm:text-2xl font-bold tracking-[-0.01em] text-white">
          Supported media and devices
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          Download public Pinterest videos and reels, images, GIFs, Story and Idea pins, carousels, and shortened pin.it links. KikPin works in browsers on Android, iOS and iPhone, and desktop.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {formats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-[#141418] p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#1C1C22] text-[#FF3B53]">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

interface RecentHistorySectionProps {
  items: HistoryItem[];
  onSelectHistoryItem: (item: HistoryItem) => void;
  onClearHistory: () => void;
}

export function RecentHistorySection({
  items,
  onSelectHistoryItem,
  onClearHistory,
}: RecentHistorySectionProps) {
  return (
    <section id="recent" className="mt-16 border-t border-white/10 pt-12">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-[-0.01em] text-white">
            Recent Extractions
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            Stored locally in your browser for quick re-downloading.
          </p>
        </div>

        {items.length > 0 && (
          <button
            type="button"
            onClick={onClearHistory}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-white/10 bg-[#141418] px-3.5 py-2 text-xs font-medium text-zinc-300 whitespace-nowrap transition-colors hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E60023] cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-white/8 bg-[#121216] p-6 text-sm text-zinc-400">
          No pins extracted yet. Paste any Pinterest link or try one of the sample buttons above.
        </div>
      ) : (
        <ul className="mt-6 divide-y divide-white/8 rounded-2xl border border-white/10 bg-[#141418]">
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onSelectHistoryItem(item)}
                className="flex w-full items-center justify-between gap-4 p-4 text-left transition-colors hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#E60023] cursor-pointer"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">{item.title}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                    <span>{item.pinType}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">{item.resolution}</span>
                    <span aria-hidden="true">·</span>
                    <span>{formatShortHost(item.sourceUrl)}</span>
                  </div>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-zinc-300">
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Load</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export function FaqSection() {
  const faqs = [
    {
      q: 'How do I download Pinterest videos without a watermark?',
      a: 'Copy the link to a public Pinterest video, paste it into KikPin, and select Extract Media. KikPin downloads the available source file without adding a watermark; Pinterest source quality can vary by pin.',
    },
    {
      q: 'Can I save Pinterest Idea Pins with audio?',
      a: 'Yes, when Pinterest provides an audio-enabled video source for that public Idea Pin. Paste its link into KikPin and choose the available video download.',
    },
    {
      q: 'Does KikPin work on iPhone (iOS) without installing an app?',
      a: 'Yes. Open kikpin.me in Safari, paste a public Pinterest link, and download directly in your browser. No KikPin app installation is needed.',
    },
    {
      q: 'Why do some Pinterest GIFs download as MP4?',
      a: 'Pinterest may store animated GIF-style pins as video files. KikPin downloads the format provided by the source, so an animated pin can arrive as MP4 while keeping its motion.',
    },
    {
      q: 'Is KikPin free and safe to use?',
      a: 'KikPin is free to use and does not require a login. Use it only with public Pinterest links, and download content you own or have permission to save.',
    },
    {
      q: 'Where are downloaded Pinterest videos saved on my phone?',
      a: 'On Android, check Downloads or your browser’s download list. On iPhone, open Files > Downloads; use Share and Save Video to move a video to Photos.',
    },
    {
      q: 'How do I download Pinterest videos, images, and GIFs?',
      a: 'Copy a public pin link, paste it into KikPin, and select the available media download. Use Copy Link in the Pinterest app or copy the pin URL in a desktop browser.',
    },
    {
      q: 'Do I need a Pinterest account or login?',
      a: 'No. You do not need a KikPin account or Pinterest login to download public pins.',
    },
    {
      q: 'Can private or deleted Pinterest pins be downloaded?',
      a: 'No. Private, deleted, or otherwise unavailable pins cannot be accessed by KikPin.',
    },
    {
      q: 'Is KikPin affiliated with Pinterest?',
      a: 'KikPin is an independent tool and is not affiliated with Pinterest. Only download content you own or have permission to save.',
    },
  ];

  return (
    <section id="faq" className="mt-16 border-t border-white/10 pt-12 pb-16">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
        Frequently Asked Questions
      </h2>
      <div className="mt-6 grid gap-3">
        {faqs.map((faq) => (
          <details key={faq.q} className="group rounded-xl border border-white/10 bg-[#141418] transition-colors open:border-white/20">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#FF3B53] [&::-webkit-details-marker]:hidden">
              {faq.q}
              <ChevronDown aria-hidden="true" className="size-4 shrink-0 text-zinc-400 transition-transform group-open:rotate-180" />
            </summary>
            <p className="px-5 pb-5 text-sm leading-relaxed text-zinc-400">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
