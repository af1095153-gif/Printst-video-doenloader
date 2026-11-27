import LocalizedHome from '../src/LocalizedHome';

const site = 'https://kikpin.me';
const languages = { en: `${site}/`, ru: `${site}/ru`, hi: `${site}/hi`, es: `${site}/es`, pt: `${site}/pt`, fr: `${site}/fr`, de: `${site}/de`, 'x-default': `${site}/` };

export const metadata = {
  title: 'KikPin – Free Pinterest Video, Image & GIF Downloader Online',
  description: 'Download public Pinterest videos, Idea Pins with audio, GIFs, carousels, and original images in the quality available. Free, no watermark, pop-ups, or login.',
  alternates: { canonical: `${site}/`, languages },
};

export default function HomePage() {
  return <LocalizedHome locale="en" />;
}
