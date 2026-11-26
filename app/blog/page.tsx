import type { Metadata } from 'next';
import { BlogIndex } from '../../src/components/BlogContent';
import { InfoPageShell } from '../../src/components/InfoPageShell';

export const metadata: Metadata = {
  title: 'KikPin Blog — Pinterest Download Guides',
  description: 'Practical guides to Pinterest video, Idea Pin, audio, image, carousel, GIF, and privacy-first downloads.',
  alternates: { canonical: 'https://kikpin.me/blog' },
};

export default function BlogPage() {
  return <InfoPageShell eyebrow="KikPin Journal" title="The practical guide to saving Pins" description="Clear, privacy-minded advice for Pinterest videos, Idea Pins, images, and browser tools."><BlogIndex /></InfoPageShell>;
}
