import type { Metadata } from 'next';
import App from '../../src/App';

export const metadata: Metadata = {
  title: 'Pinterest Video Downloader — Download 1080p HD MP4 (No Watermark) | KikPin',
  description:
    'Download public Pinterest videos in 1080p HD MP4 free with KikPin. Works with pin.it short links on Android, iPhone, Windows, and Mac—no app or watermark.',
  alternates: { canonical: 'https://kikpin.me/pinterest-video-downloader' },
};

export default function PinterestVideoDownloaderPage() {
  return <App pathname="/pinterest-video-downloader" />;
}
