import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://kikpin.me', changeFrequency: 'daily', priority: 1.0 },
    { url: 'https://kikpin.me/pinterest-video-downloader', changeFrequency: 'weekly', priority: 0.9 },
    { url: 'https://kikpin.me/pinterest-image-downloader', changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://kikpin.me/pinterest-gif-downloader', changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://kikpin.me/idea-pin-downloader', changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://kikpin.me/extension', changeFrequency: 'weekly', priority: 0.8 },
  ];
}
