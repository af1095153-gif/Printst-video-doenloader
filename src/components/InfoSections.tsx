import { Film, Image as ImageIcon, Layers, RotateCcw, Trash2 } from 'lucide-react';
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
      q: 'How do I download videos, images, and GIFs from Pinterest?',
      a: 'Copy the link to a public pin, paste it into KikPin, and choose the available download. On mobile, tap ••• in Pinterest and select Copy Link; on desktop, copy the pin URL from your browser.',
    },
    {
      q: 'Do I need a Pinterest account or login?',
      a: 'No. You do not need a KikPin account or Pinterest login to download public pins.',
    },
    {
      q: 'Where are downloaded files saved?',
      a: 'Files go to your device’s default Downloads folder, unless your browser asks you to choose a different location.',
    },
    {
      q: 'Can private or deleted pins be downloaded?',
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
      <dl className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        {faqs.map((faq) => (
          <div key={faq.q} className="rounded-2xl border border-white/10 bg-[#141418] p-6">
            <dt className="text-sm font-semibold text-white">{faq.q}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-zinc-400">{faq.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
