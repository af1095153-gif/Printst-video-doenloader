import LocalizedHome from '../src/LocalizedHome';

const site = 'https://kikpin.me';
const languages = { en: `${site}/`, ru: `${site}/ru`, hi: `${site}/hi`, es: `${site}/es`, pt: `${site}/pt`, fr: `${site}/fr`, de: `${site}/de`, 'x-default': `${site}/` };

export const metadata = {
  title: 'KikPin — Pinterest Video, Image & GIF Downloader',
  description: 'Save public Pinterest videos, Idea Pins, GIFs, carousels, and images. No login or pop-up ads. Get the best source file Pinterest provides.',
  alternates: { canonical: `${site}/`, languages },
};

export default function HomePage() {
  return <LocalizedHome locale="en" />;
}
