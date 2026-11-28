import { BlogIndex } from '../../src/components/BlogContent';
import { InfoPageShell } from '../../src/components/InfoPageShell';

export const metadata = {
  title: 'Pinterest download guides, copyright & troubleshooting | KikPin',
  description: 'Straight answers on saving Pinterest videos, audio, phone downloads, copyright, creator notifications, and common download problems.',
  alternates: { canonical: 'https://kikpin.me/blog' },
};

export default function BlogPage() {
  return <InfoPageShell eyebrow="KikPin blog · Guides and answers" title="Pinterest download guides" description="Clear, practical answers for saving public Pinterest media, understanding formats, and troubleshooting downloads."><BlogIndex /></InfoPageShell>;
}
