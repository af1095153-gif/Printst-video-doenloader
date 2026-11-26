import type { Metadata } from 'next';
import { PricingPage } from '../../src/components/TrustPages';
export const metadata: Metadata = { title: 'KikPin Pricing — 100% Free Pinterest Downloads', description: 'KikPin core Pinterest downloads are 100% free forever, with no account, subscription, or hidden paywall.', alternates: { canonical: 'https://kikpin.me/pricing' } };
export default function Page() { return <PricingPage />; }
