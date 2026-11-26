import type { Metadata } from 'next';
import { InfoPageShell } from '../../src/components/InfoPageShell';

export const metadata: Metadata = {
  title: 'KikPin Privacy Policy — No Account or Stored Downloads',
  description: 'How KikPin handles Pinterest URLs, local extraction history, browser extension permissions, and downloaded media.',
  alternates: { canonical: 'https://kikpin.me/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <InfoPageShell
      eyebrow="Privacy policy"
      title="Your privacy, plainly explained"
      description="KikPin does not require an account. This page explains what happens when you use the web downloader or browser extension."
    >
      <section aria-labelledby="privacy-url-heading">
        <h2 id="privacy-url-heading" className="text-lg font-bold text-white">Pinterest links and extraction</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">When you submit a Pin, the URL is sent to KikPin to resolve publicly available Pin metadata and media links. The selected media is retrieved from Pinterest&apos;s media CDN through a validated download proxy. Do not submit private or sensitive URLs.</p>
      </section>

      <section aria-labelledby="privacy-storage-heading">
        <h2 id="privacy-storage-heading" className="text-lg font-bold text-white">Files and browser history</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">KikPin does not save downloaded media files to a persistent KikPin file library. Downloads are delivered through the proxy. Recent extraction history is stored locally in your browser for convenience; use “Clear History” on the homepage to remove it.</p>
      </section>

      <section aria-labelledby="privacy-extension-heading">
        <h2 id="privacy-extension-heading" className="text-lg font-bold text-white">Browser extension</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">The official Microsoft Edge extension uses Manifest V3 and the activeTab permission. It acts on the current tab when you choose to use it; it does not request broad access to unrelated sites or collect browsing history or analytics.</p>
      </section>

      <section aria-labelledby="privacy-service-heading">
        <h2 id="privacy-service-heading" className="text-lg font-bold text-white">Service providers and contact</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">KikPin relies on hosting and network providers to serve the site and process requests. Pinterest and its media CDN provide the source content. The site also loads fonts from Google Fonts. These providers may process connection data under their own policies; KikPin does not use third-party advertising or analytics scripts.</p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">For privacy questions, email <a href="mailto:support@kikpin.me" className="text-zinc-200 underline underline-offset-4 hover:text-white">support@kikpin.me</a>.</p>
      </section>
    </InfoPageShell>
  );
}
