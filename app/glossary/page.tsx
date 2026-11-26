import type { Metadata } from 'next';
import { GlossaryPage } from '../../src/components/TrustPages';
export const metadata: Metadata = { title: 'Pinterest Media Glossary | KikPin', description: 'Helpful definitions for Idea Pins, HLS-to-MP4, pin.it links, Manifest V3, and watermark-free source extraction.', alternates: { canonical: 'https://kikpin.me/glossary' } };
export default function Page() { return <GlossaryPage />; }
