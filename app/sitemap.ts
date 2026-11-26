import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-11-26');

  return [
    { url: 'https://kikpin.me', lastModified, changeFrequency: 'daily', priority: 1.0 },
    { url: 'https://kikpin.me/pinterest-video-downloader', lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: 'https://kikpin.me/pinterest-image-downloader', lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://kikpin.me/pinterest-gif-downloader', lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://kikpin.me/idea-pin-downloader', lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://kikpin.me/extension', lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://kikpin.me/about', lastModified, changeFrequency: 'monthly', priority: 0.4 },
    { url: 'https://kikpin.me/privacy-policy', lastModified, changeFrequency: 'monthly', priority: 0.4 },
    { url: 'https://kikpin.me/terms', lastModified, changeFrequency: 'monthly', priority: 0.4 },
    { url: 'https://kikpin.me/pricing', lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: 'https://kikpin.me/blog', lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://kikpin.me/blog/how-to-download-pinterest-videos-idea-pins-with-audio', lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://kikpin.me/blog/save-pinterest-carousels-stories-gifs-hd', lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://kikpin.me/blog/privacy-first-pinterest-downloader-extension', lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://kikpin.me/compare', lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://kikpin.me/why-kikpin', lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://kikpin.me/glossary', lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://kikpin.me/terms', lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: 'https://kikpin.me/privacy', lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: 'https://kikpin.me/contact', lastModified, changeFrequency: 'monthly', priority: 0.4 },
  ];
}
