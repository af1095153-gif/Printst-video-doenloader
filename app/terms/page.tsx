import type { Metadata } from 'next';
import { LegalPage } from '../../src/components/TrustPages';
export const metadata: Metadata = { title: 'Terms of Use | KikPin', description: 'Terms for using KikPin. Save only content you own or have permission to use.', alternates: { canonical: 'https://kikpin.me/terms' } };
export default function Page() { return <LegalPage kind="terms" />; }
