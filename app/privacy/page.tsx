import type { Metadata } from 'next';
import { LegalPage } from '../../src/components/TrustPages';
export const metadata: Metadata = { title: 'Privacy Policy | KikPin', description: 'KikPin privacy policy: no account, login, or file storage required.', alternates: { canonical: 'https://kikpin.me/privacy' } };
export default function Page() { return <LegalPage kind="privacy" />; }
