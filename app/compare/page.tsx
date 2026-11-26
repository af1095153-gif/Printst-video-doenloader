import type { Metadata } from 'next';
import { ComparePage } from '../../src/components/TrustPages';
export const metadata: Metadata = { title: 'KikPin vs Typical Downloaders | Compare', description: 'Compare KikPin’s privacy-first extension, no pop-ups, Idea Pin audio, original quality, and no-login downloads.', alternates: { canonical: 'https://kikpin.me/compare' } };
export default function Page() { return <ComparePage />; }
