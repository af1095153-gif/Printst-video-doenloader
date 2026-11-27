const site = 'https://kikpin.me';
const lastModified = new Date('2026-11-26');
const languages = { en: `${site}/`, ru: `${site}/ru`, hi: `${site}/hi`, es: `${site}/es`, pt: `${site}/pt`, fr: `${site}/fr`, de: `${site}/de`, 'x-default': `${site}/` };
const alternates = { languages };
const paths = [
  ['', 'daily', 1],
  ['/ru', 'weekly', 0.9], ['/hi', 'weekly', 0.9], ['/es', 'weekly', 0.9], ['/pt', 'weekly', 0.9], ['/fr', 'weekly', 0.9], ['/de', 'weekly', 0.9],
  ['/pinterest-video-downloader', 'weekly', 0.9], ['/pinterest-image-downloader', 'weekly', 0.8], ['/pinterest-gif-downloader', 'weekly', 0.8], ['/idea-pin-downloader', 'weekly', 0.8], ['/pinterest-idea-pin-downloader', 'weekly', 0.8], ['/pinterest-story-downloader', 'weekly', 0.8], ['/pinterest-carousel-downloader', 'weekly', 0.8], ['/supported-urls', 'monthly', 0.7], ['/extension', 'weekly', 0.8],
  ['/about', 'monthly', 0.4], ['/privacy-policy', 'monthly', 0.4], ['/terms', 'yearly', 0.3], ['/pricing', 'monthly', 0.5], ['/blog', 'weekly', 0.8], ['/compare', 'monthly', 0.7], ['/why-kikpin', 'monthly', 0.6], ['/glossary', 'monthly', 0.6], ['/privacy', 'yearly', 0.3], ['/contact', 'monthly', 0.4], ['/how-to-download-pinterest-videos', 'monthly', 0.6],
  ['/blog/how-to-download-pinterest-videos-idea-pins-with-audio', 'monthly', 0.7], ['/blog/save-pinterest-content-offline-without-account', 'monthly', 0.7], ['/blog/troubleshooting-pinterest-downloads', 'monthly', 0.7], ['/blog/pinterest-video-quality-720p-1080p-4k', 'monthly', 0.7], ['/blog/understanding-pinterest-file-formats', 'monthly', 0.7],
  ['/blog/save-pinterest-carousels-stories-gifs-hd', 'monthly', 0.7], ['/blog/privacy-first-pinterest-downloader-extension', 'monthly', 0.7],
];

export default function sitemap() {
  return paths.map(([path, changeFrequency, priority]) => ({
    url: `${site}${path}`,
    lastModified,
    changeFrequency,
    priority,
    ...(path === '' || languages[path.slice(1)] ? { alternates } : {}),
  }));
}
