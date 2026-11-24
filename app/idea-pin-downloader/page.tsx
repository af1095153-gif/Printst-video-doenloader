import type { Metadata } from 'next';
import App from '../../src/App';

export const metadata: Metadata = {
  title: 'Pinterest Idea Pin Downloader — Save Idea Pins & Reels With Audio | KikPin',
  description:
    'Download Pinterest Idea Pins and Reels in HD with original audio intact. Free, no watermark, and no login required on KikPin.me.',
  alternates: { canonical: 'https://kikpin.me/idea-pin-downloader' },
};

export default function IdeaPinDownloaderPage() {
  return <App pathname="/idea-pin-downloader" />;
}
