import SeoLandingSection from '../SeoLandingSection';
import { getSeoPage } from '../../seoPages';

export default function ImageSeoPage() {
  const page = getSeoPage('/pinterest-image-downloader');
  return page ? <SeoLandingSection page={page} /> : null;
}
