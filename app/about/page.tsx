import type { Metadata } from 'next';
import { InfoPageShell } from '../../src/components/InfoPageShell';

export const metadata: Metadata = {
  title: 'About KikPin — An Independent Pinterest Downloader',
  description: 'Meet KikPin: an independently built, privacy-conscious downloader for public Pinterest media. Contact the maker directly for support.',
  alternates: { canonical: 'https://kikpin.me/about' },
};

export default function AboutPage() {
  return (
    <InfoPageShell
      eyebrow="About KikPin"
      title="A small tool, made for creative work"
      description="KikPin is an independently built and maintained tool for saving public Pinterest media you have permission to use."
    >
      <section aria-labelledby="about-purpose-heading">
        <h2 id="about-purpose-heading" className="text-lg font-bold text-white">Why it exists</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">Creators, video editors, craft sellers, and board curators use Pinterest to collect visual references. KikPin keeps the download flow focused: paste a public Pin link, preview the available source file, and save it without an added watermark or login.</p>
      </section>

      <section aria-labelledby="about-accountability-heading" className="rounded-2xl border border-white/10 bg-[#141418] p-5 sm:p-6">
        <h2 id="about-accountability-heading" className="text-lg font-bold text-white">Built &amp; maintained independently</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">KikPin is maintained by an independent developer. For questions, accessibility feedback, or support, contact <a href="mailto:support@kikpin.me" className="text-zinc-200 underline underline-offset-4 hover:text-white">support@kikpin.me</a>.</p>
      </section>

      <section aria-labelledby="about-principles-heading">
        <h2 id="about-principles-heading" className="text-lg font-bold text-white">Product principles</h2>
        <ul className="mt-3 grid gap-2 text-sm leading-relaxed text-zinc-400">
          <li>Use the source media and resolution Pinterest makes available; do not add watermarks.</li>
          <li>Keep browser permissions narrow and downloads straightforward.</li>
          <li>Respect creators: save only content you own or have permission to use.</li>
        </ul>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <a href="/privacy-policy" className="text-zinc-200 underline underline-offset-4 hover:text-white">Privacy policy</a>
          <a href="/terms" className="text-zinc-200 underline underline-offset-4 hover:text-white">Terms of use</a>
        </div>
      </section>
    </InfoPageShell>
  );
}
