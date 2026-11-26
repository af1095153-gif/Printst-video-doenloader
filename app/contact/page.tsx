import type { Metadata } from 'next';
import { ContactPage } from '../../src/components/ContactPage';
export const metadata: Metadata = { title: 'Contact KikPin Support', description: 'Contact KikPin support to report a broken Pin, share feedback, or request a feature.', alternates: { canonical: 'https://kikpin.me/contact' } };
export default function Page() { return <ContactPage />; }
