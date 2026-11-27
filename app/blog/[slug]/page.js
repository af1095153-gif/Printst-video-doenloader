import { notFound } from 'next/navigation';
import { BlogArticle, guides } from '../../../src/components/BlogContent';
import { InfoPageShell } from '../../../src/components/InfoPageShell';

export function generateStaticParams() {
  return guides.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);
  return guide ? { title: `${guide.title} | KikPin Blog`, description: guide.metaDescription || guide.excerpt, alternates: { canonical: `https://kikpin.me/blog/${slug}` }, openGraph: { title: guide.title, description: guide.metaDescription || guide.excerpt, type: 'article', url: `https://kikpin.me/blog/${slug}`, images: [{ url: `https://kikpin.me/images/blog/${slug}.svg`, width: 1200, height: 675, alt: guide.coverAlt }], publishedTime: guide.datePublished, modifiedTime: guide.datePublished }, twitter: { card: 'summary_large_image', title: guide.title, description: guide.metaDescription || guide.excerpt, images: [`https://kikpin.me/images/blog/${slug}.svg`] } } : {};
}

export default async function BlogArticlePage({ params }) {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) notFound();
  return <InfoPageShell eyebrow={guide.category} title={guide.title} description={guide.intro} showIntro={false}><BlogArticle slug={slug} /></InfoPageShell>;
}
