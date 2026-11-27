import { notFound } from 'next/navigation';
import { BlogArticle, guides } from '../../../src/components/BlogContent';
import { InfoPageShell } from '../../../src/components/InfoPageShell';

export function generateStaticParams() {
  return guides.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);
  return guide ? { title: `${guide.title} | KikPin Blog`, description: guide.excerpt, alternates: { canonical: `https://kikpin.me/blog/${slug}` } } : {};
}

export default async function BlogArticlePage({ params }) {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) notFound();
  return <InfoPageShell eyebrow={guide.category} title={guide.title} description={guide.intro}><BlogArticle slug={slug} /></InfoPageShell>;
}
