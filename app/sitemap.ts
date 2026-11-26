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
  ];
}
