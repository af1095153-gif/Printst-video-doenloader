import type { Metadata } from 'next';
import App from '../../src/App';

export const metadata: Metadata = {
  title: 'How to Download Pinterest Videos – iPhone, Android & PC',
  description:
    'Step-by-step guide to downloading public Pinterest videos on iPhone, Android, and PC. Includes pin.it troubleshooting and private Pin limitations.',
  alternates: { canonical: 'https://kikpin.me/how-to-download-pinterest-videos' },
};

export default function PinterestVideoGuidePage() {
  return <App pathname="/how-to-download-pinterest-videos" />;
}
