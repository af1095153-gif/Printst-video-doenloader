import type { Metadata } from 'next';
import App from '../../src/App';

export const metadata: Metadata = {
  title: 'KikPin Browser Extension — 1-Click Pinterest Video Downloader | KikPin',
  description:
    'Install the free, privacy-first KikPin Manifest V3 browser extension for Microsoft Edge and Firefox to download Pinterest videos in 1 click.',
  alternates: { canonical: 'https://kikpin.me/extension' },
};

export default function ExtensionPage() {
  return <App pathname="/extension" />;
}
