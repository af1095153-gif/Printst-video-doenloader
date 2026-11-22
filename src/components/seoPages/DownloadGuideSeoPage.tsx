import SeoLandingSection from '../SeoLandingSection';
import { getSeoPage } from '../../seoPages';

export default function DownloadGuideSeoPage() {
  const page = getSeoPage('/how-to-download-pinterest-videos');
  return page ? <SeoLandingSection page={page} /> : null;
}
