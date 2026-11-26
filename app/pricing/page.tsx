import type { Metadata } from 'next';
import { InfoPageShell } from '../../src/components/InfoPageShell';

export const metadata: Metadata = {
  title: 'KikPin Pricing — Free Pinterest Downloads, No Paywalls',
  description: 'KikPin core Pinterest video, Idea Pin, GIF, carousel, and image downloads are free with no account, hidden paywalls, or added watermarks.',
  alternates: { canonical: 'https://kikpin.me/pricing' },
};

export default function PricingPage() {
  return (
    <InfoPageShell
      eyebrow="Simple, transparent pricing"
      title="100% free forever for core downloads"
      description="Download public Pinterest videos, Idea Pins, GIFs, carousels, and images without an account, hidden paywall, or added watermark."
    >
      <section aria-labelledby="core-free-heading" className="rounded-2xl border border-white/10 bg-[#141418] p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#FF7182]">Core downloader · $0</p>
        <h2 id="core-free-heading" className="mt-2 text-xl font-bold text-white">Free, with no sign-up</h2>
        <ul className="mt-4 grid gap-3 text-sm text-zinc-300 sm:grid-cols-2">
          <li>Video, Idea Pin, GIF, carousel, and image downloads</li>
          <li>Available source quality, including HD, 2K, and 4K when provided</li>
          <li>No added watermarks</li>
          <li>No account, subscription, or hidden core paywall</li>
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-zinc-500">Pinterest controls which formats, audio tracks, and resolutions are available for each Pin.</p>
      </section>

      <section aria-labelledby="how-kikpin-runs-heading">
        <h2 id="how-kikpin-runs-heading" className="text-lg font-bold text-white">How KikPin stays running</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">KikPin is independently maintained on lean, low-cost serverless Next.js infrastructure. Keeping the product focused helps keep operating costs modest and the core downloader free.</p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">Optional creator workflow tools or clearly labeled, non-intrusive sponsorship may support future development. They will not be required to use the core downloader.</p>
      </section>

      <section aria-labelledby="pricing-questions-heading" className="border-t border-white/10 pt-6">
        <h2 id="pricing-questions-heading" className="text-lg font-bold text-white">Questions about pricing?</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">Email <a href="mailto:support@kikpin.me" className="text-zinc-200 underline underline-offset-4 hover:text-white">support@kikpin.me</a>.</p>
      </section>
    </InfoPageShell>
  );
}
