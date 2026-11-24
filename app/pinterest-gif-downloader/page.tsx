import type { Metadata } from 'next';
import App from '../../src/App';

export const metadata: Metadata = {
  title: 'Pinterest GIF Downloader — Save Animated Pinterest GIFs Free | KikPin',
  description:
    'Save animated GIFs from Pinterest in original quality with KikPin. Free, fast, watermark-free, and works in any browser.',
  alternates: { canonical: 'https://kikpin.me/pinterest-gif-downloader' },
};

export default function PinterestGifDownloaderPage() {
  return <App pathname="/pinterest-gif-downloader" />;
}
