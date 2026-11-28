const site = 'https://kikpin.me';
const lastModified = '2026-11-27';
const languages = {
  en: `${site}/`,
  ru: `${site}/ru`,
  hi: `${site}/hi`,
  es: `${site}/es`,
  pt: `${site}/pt`,
  fr: `${site}/fr`,
  de: `${site}/de`,
};
const paths = [
  ['', 'daily', 1],
  ['/ru', 'weekly', 0.9],
  ['/hi', 'weekly', 0.9],
  ['/es', 'weekly', 0.9],
  ['/pt', 'weekly', 0.9],
  ['/fr', 'weekly', 0.9],
  ['/de', 'weekly', 0.9],
  ['/pinterest-video-downloader', 'weekly', 0.9],
  ['/pinterest-image-downloader', 'weekly', 0.8],
  ['/pinterest-gif-downloader', 'weekly', 0.8],
  ['/pinterest-idea-pin-downloader', 'weekly', 0.8],
  ['/pinterest-story-downloader', 'weekly', 0.8],
  ['/pinterest-carousel-downloader', 'weekly', 0.8],
  ['/supported-urls', 'monthly', 0.7],
  ['/extension', 'weekly', 0.8],
  ['/about', 'monthly', 0.4],
  ['/privacy', 'monthly', 0.4],
  ['/terms', 'yearly', 0.3],
  ['/pricing', 'monthly', 0.5],
  ['/blog', 'weekly', 0.8],
  ['/compare', 'monthly', 0.7],
  ['/why-kikpin', 'monthly', 0.6],
  ['/glossary', 'monthly', 0.6],
  ['/contact', 'monthly', 0.4],
  ['/how-to-download-pinterest-videos', 'monthly', 0.6],
  ['/blog/how-to-download-pinterest-videos-idea-pins-with-audio', 'monthly', 0.7],
  ['/blog/save-pinterest-content-offline-without-account', 'monthly', 0.7],
  ['/blog/troubleshooting-pinterest-downloads', 'monthly', 0.7],
  ['/blog/pinterest-video-quality-720p-1080p-4k', 'monthly', 0.7],
  ['/blog/understanding-pinterest-file-formats', 'monthly', 0.7],
  ['/blog/save-pinterest-carousels-stories-gifs-hd', 'monthly', 0.7],
  ['/blog/privacy-first-pinterest-downloader-extension', 'monthly', 0.7],
  ['/blog/save-pinterest-videos-to-iphone-camera-roll-android-gallery', 'monthly', 0.7],
  ['/blog/is-it-legal-safe-to-download-pinterest-videos', 'monthly', 0.8, '2026-11-28'],
];

function xmlEscape(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
}

export function GET() {
  const entries = paths.map(([path, changeFrequency, priority, pageLastModified = lastModified]) => {
    const url = `${site}${path}`;
    const alternateLinks = path === '' || Object.values(languages).includes(url)
      ? Object.entries({ ...languages, 'x-default': `${site}/` })
          .map(([language, href]) => `    <xhtml:link rel="alternate" hreflang="${language}" href="${xmlEscape(href)}" />`)
          .join('\n')
      : '';

    return [
      '  <url>',
      `    <loc>${xmlEscape(url)}</loc>`,
      `    <lastmod>${pageLastModified}</lastmod>`,
      `    <changefreq>${changeFrequency}</changefreq>`,
      `    <priority>${Number(priority).toFixed(1)}</priority>`,
      alternateLinks,
      '  </url>',
    ].filter(Boolean).join('\n');
  }).join('\n');

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    entries,
    '</urlset>',
  ].join('\n');

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
