import App from '../../src/App';

export const metadata = {
  title: 'Pinterest Idea Pin Downloader — Download with Original Audio | KikPin',
  description: 'Download public Pinterest Idea Pins with original audio when included in the source video. Preview clips and slides; no account or watermark.',
  alternates: { canonical: 'https://kikpin.me/pinterest-idea-pin-downloader' },
};

export default function PinterestIdeaPinDownloaderPage() {
  return <App pathname="/pinterest-idea-pin-downloader" />;
}
