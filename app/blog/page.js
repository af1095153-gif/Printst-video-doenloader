import { BlogIndex } from '../../src/components/BlogContent';
import { InfoPageShell } from '../../src/components/InfoPageShell';

export const metadata = {
  title: 'Pinterest download guides and troubleshooting | KikPin Blog',
  description: 'Practical guides for downloading Pinterest videos, Idea Pins, images, and GIFs, understanding quality, and fixing common issues.',
  alternates: { canonical: 'https://kikpin.me/blog' },
};

export default function BlogPage() {
  return <InfoPageShell eyebrow="KikPin blog · Guides and answers" title="Pinterest download guides" description="Clear, practical answers for saving public Pinterest media, understanding formats, and troubleshooting downloads."><BlogIndex /></InfoPageShell>;
}
