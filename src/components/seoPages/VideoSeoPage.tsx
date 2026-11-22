import SeoLandingSection from '../SeoLandingSection';
import { getSeoPage } from '../../seoPages';

export default function VideoSeoPage() {
  const page = getSeoPage('/pinterest-video-downloader');
  return page ? <SeoLandingSection page={page} /> : null;
}
