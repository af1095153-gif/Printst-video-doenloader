import SeoLandingSection from '../SeoLandingSection';
import { getSeoPage } from '../../seoPages';

export default function GifSeoPage() {
  const page = getSeoPage('/pinterest-gif-downloader');
  return page ? <SeoLandingSection page={page} /> : null;
}
