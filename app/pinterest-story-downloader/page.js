import App from '../../src/App';

export const metadata = {
  title: 'Pinterest Story Downloader — Save Story Pins in HD Without Watermarks | KikPin',
  description: 'Download public Pinterest Story Pins in the quality Pinterest provides. Free, no added watermark, no pop-ups, and no login.',
  alternates: { canonical: 'https://kikpin.me/pinterest-story-downloader' },
};

export default function PinterestStoryDownloaderPage() {
  return <App pathname="/pinterest-story-downloader" />;
}
