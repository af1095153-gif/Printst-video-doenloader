import type { Metadata } from 'next';
import App from '../../src/App';

export const metadata: Metadata = {
  title: 'Pinterest Image Downloader — Save Full-Resolution HD Photos | KikPin',
  description:
    'Download original full-resolution Pinterest images and carousels in JPG/PNG without compression or login using KikPin.me.',
  alternates: { canonical: 'https://kikpin.me/pinterest-image-downloader' },
};

export default function PinterestImageDownloaderPage() {
  return <App pathname="/pinterest-image-downloader" />;
}
