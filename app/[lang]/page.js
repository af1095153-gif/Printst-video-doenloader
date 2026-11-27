import { notFound } from 'next/navigation';
import LocalizedHome from '../../src/LocalizedHome';
import { languages, locales, getLocaleCopy } from '../../lib/i18n.js';

const siteUrl = 'https://kikpin.me';
const hreflangs = Object.fromEntries([
  ...languages.map(({ code, href }) => [code, `${siteUrl}${href}`]),
  ['x-default', `${siteUrl}/`],
]);

export function generateStaticParams() {
  return locales.filter((locale) => locale !== 'en').map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const copy = getLocaleCopy(lang);
  if (!copy || lang === 'en') return {};
  return {
    title: copy.title,
    description: copy.description,
    alternates: { canonical: `${siteUrl}/${lang}`, languages: hreflangs },
    openGraph: { title: copy.title, description: copy.description, url: `${siteUrl}/${lang}`, siteName: 'KikPin', type: 'website' },
  };
}

export default async function LocalizedHomePage({ params }) {
  const { lang } = await params;
  if (!locales.includes(lang) || lang === 'en') notFound();
  return <LocalizedHome locale={lang} />;
}
