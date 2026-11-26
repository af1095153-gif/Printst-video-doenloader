import type { Metadata } from 'next';
import { WhyPage } from '../../src/components/TrustPages';
export const metadata: Metadata = { title: 'Why KikPin — Privacy-First Pinterest Downloader', description: 'Learn about KikPin’s privacy-first architecture, fast download workflow, and creator-focused source media.', alternates: { canonical: 'https://kikpin.me/why-kikpin' } };
export default function Page() { return <WhyPage />; }
