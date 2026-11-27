import App from '../../src/App';

export const metadata = {
  title: 'Pinterest Carousel Downloader — Save Every Slide and Image | KikPin',
  description: 'Preview and download the available images and clips from a public multi-slide Pinterest carousel. No login or added watermark.',
  alternates: { canonical: 'https://kikpin.me/pinterest-carousel-downloader' },
};

export default function PinterestCarouselDownloaderPage() {
  return <App pathname="/pinterest-carousel-downloader" />;
}
