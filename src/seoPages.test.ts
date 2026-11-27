import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getSeoPage, seoPages } from './seoPages';
import { GET as getSitemap } from '../app/sitemap.xml/route.js';

const expectedPages = [
  {
    route: '/pinterest-video-downloader',
    title: 'Pinterest Video Downloader — Download 1080p HD MP4 (No Watermark) | KikPin',
    description:
      'Download public Pinterest videos in 1080p HD MP4 free with KikPin. Works with pin.it short links on Android, iPhone, Windows, and Mac—no app or watermark.',
    h1: 'Pinterest Video Downloader (1080p HD)',
  },
  {
    route: '/pinterest-image-downloader',
    title: 'Pinterest Image Downloader — Save Full-Resolution HD Photos | KikPin',
    description:
      'Download original full-resolution Pinterest images and carousels in JPG/PNG without compression or login using KikPin.me.',
    h1: 'Pinterest Image Downloader',
  },
  {
    route: '/pinterest-gif-downloader',
    title: 'Pinterest GIF Downloader — Save Animated Pinterest GIFs Free | KikPin',
    description:
      'Save animated GIFs from Pinterest in original quality with KikPin. Free, fast, watermark-free, and works in any browser.',
    h1: 'Pinterest GIF Downloader',
  },
  {
    route: '/idea-pin-downloader',
    title: 'Pinterest Idea Pin Downloader — Save Idea Pins & Reels With Audio | KikPin',
    description:
      'Download Pinterest Idea Pins and Reels in HD with original audio intact. Free, no watermark, and no login required on KikPin.me.',
    h1: 'Pinterest Idea Pin Downloader (With Audio)',
  },
];

const requiredSitemap = [
  ['https://kikpin.me', '1.0'],
  ['https://kikpin.me/pinterest-video-downloader', '0.9'],
  ['https://kikpin.me/pinterest-image-downloader', '0.8'],
  ['https://kikpin.me/pinterest-gif-downloader', '0.8'],
  ['https://kikpin.me/pinterest-idea-pin-downloader', '0.8'],
  ['https://kikpin.me/extension', '0.8'],
  ['https://kikpin.me/about', '0.4'],
  ['https://kikpin.me/privacy', '0.4'],
  ['https://kikpin.me/terms', '0.3'], 
  ['https://kikpin.me/pricing', '0.5'],
] as const;

test('all media SEO pages expose the requested metadata and three FAQs/steps', () => {
  for (const expected of expectedPages) {
    const page = getSeoPage(expected.route);
    assert.ok(page);
    assert.equal(page.title, expected.title);
    assert.equal(page.description, expected.description);
    assert.equal(page.h1, expected.h1);
    assert.equal(page.steps.length, 3);
    assert.equal(page.faqs.length, 3);
  }

  const guide = getSeoPage('/how-to-download-pinterest-videos');
  assert.ok(guide);
  assert.match(guide.lead, /iPhone \(iOS\)/);
  assert.match(guide.lead, /Android/);
  assert.match(guide.lead, /PC\/Desktop/);
});

test('Next route metadata includes exact titles, descriptions, and canonical URLs', () => {
  const staticRoutes = ['/about', '/privacy-policy', '/terms', '/pricing'];
  const routeFiles = [
    ...expectedPages.map(({ route }) => `../app${route}/page.tsx`),
    '../app/extension/page.tsx',
    ...staticRoutes.map((route) => `../app${route}/page.tsx`),
  ];
  const extensionMetadata = {
    title: 'KikPin Browser Extension — 1-Click Pinterest Video Downloader | KikPin',
    description:
      'Install the free, privacy-first KikPin Manifest V3 browser extension for Microsoft Edge and Firefox to download Pinterest videos in 1 click.',
  };

  for (const routeFile of routeFiles) {
    const source = readFileSync(new URL(routeFile, import.meta.url), 'utf8');
    assert.match(source, /export const metadata/);
    assert.match(source, /alternates:\s*\{\s*canonical:/);
  }
  const extension = readFileSync(new URL('../app/extension/page.tsx', import.meta.url), 'utf8');
  assert.ok(extension.includes(extensionMetadata.title));
  assert.ok(extension.includes(extensionMetadata.description));

  for (const expected of expectedPages) {
    const source = readFileSync(new URL(`../app${expected.route}/page.tsx`, import.meta.url), 'utf8');
    assert.ok(source.includes(expected.title));
    assert.ok(source.includes(expected.description));
    assert.ok(source.includes(`https://kikpin.me${expected.route}`));
  }
});

test('sitemap responds with valid XML, canonical URLs, and language alternates', async () => {
  const response = getSitemap();
  const xml = await response.text();
  assert.equal(response.headers.get('content-type'), 'application/xml; charset=utf-8');
  assert.ok(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>'));
  assert.ok(xml.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'));
  assert.ok(xml.includes('<xhtml:link rel="alternate" hreflang="ru" href="https://kikpin.me/ru" />'));
  assert.ok(!xml.includes('<loc>https://kikpin.me/idea-pin-downloader</loc>'));
  assert.ok(!xml.includes('<loc>https://kikpin.me/privacy-policy</loc>'));
  assert.ok(xml.includes('<loc>https://kikpin.me/privacy</loc>'));
  for (const [url, priority] of requiredSitemap) {
    assert.ok(xml.includes(`<loc>${url}</loc>`));
    assert.ok(xml.includes(`<priority>${priority}</priority>`));
  }
});

test('all four media routes reuse the downloader and SEO tool links', () => {
  const app = readFileSync(new URL('./App.tsx', import.meta.url), 'utf8');
  const links = readFileSync(new URL('./components/ToolLinks.jsx', import.meta.url), 'utf8');
  assert.match(app, /UrlExtractorBar/);
  assert.match(app, /MediaResultCard/);
  assert.match(app, /SeoLandingSection page=\{seoPage\}/);
  for (const label of [
    'Pinterest Video Downloader',
    'Pinterest Image Downloader',
    'Pinterest GIF Downloader',
    'Idea Pin Downloader',
    'Browser Extension',
  ]) {
    assert.ok(links.includes(label));
  }
});

test('extension page highlights the Edge install and the verified privacy model', () => {
  const extensionSection = readFileSync(new URL('./components/BrowserExtensionSection.jsx', import.meta.url), 'utf8');
  const app = readFileSync(new URL('./App.tsx', import.meta.url), 'utf8');
  const manifest = readFileSync(new URL('../browser-extension/manifest.json', import.meta.url), 'utf8');
  assert.match(extensionSection, /Add to Microsoft Edge/);
  assert.match(extensionSection, /target="_blank"/);
  assert.match(extensionSection, /rel="noopener noreferrer"/);
  assert.match(app, /Manifest V3/);
  assert.match(app, /activeTab only/);
  assert.match(app, /Zero remote code/);
  assert.match(app, /Zero background data collection/);
  assert.match(app, /only the selected Pin URL is passed to KikPin/);
  assert.match(manifest, /"permissions":\s*\["activeTab"\]/);
});

test('llms.txt links to the homepage, all five tools, and the preserved guide', () => {
  const llms = readFileSync(new URL('../public/llms.txt', import.meta.url), 'utf8');
  assert.match(llms, /^# KikPin/m);
  for (const [url] of requiredSitemap) assert.ok(llms.includes(url));
  assert.ok(llms.includes('https://kikpin.me/how-to-download-pinterest-videos'));
});

test('homepage trust strip uses the supplied Trustpilot URL and a verified Edge listing', () => {
  const homepage = readFileSync(new URL('./LocalizedHome.jsx', import.meta.url), 'utf8');
  assert.ok(homepage.includes('https://www.trustpilot.com/review/kikpin.me'));
  assert.ok(homepage.includes('href={trustpilotUrl}'));
  assert.ok(homepage.includes('href={edgeUrl}'));
  assert.ok(!homepage.includes('saashubUrl'));
  assert.ok(!homepage.includes('[PASTE YOUR PRODUCT HUNT URL]'));
});

test('Next layout preserves the KikPin typography and theme metadata', () => {
  const layout = readFileSync(new URL('../app/layout.js', import.meta.url), 'utf8');
  assert.match(layout, /fonts\.googleapis\.com/);
  assert.match(layout, /DM\+Sans/);
  assert.match(layout, /DM\+Sans/);
  assert.doesNotMatch(layout, /Plus\+Jakarta\+Sans|JetBrains\+Mono/);
  assert.match(layout, /themeColor:\s*'#0B0B0E'/);
  assert.match(layout, /metadataBase:\s*new URL\('https:\/\/kikpin\.me'\)/);
});
