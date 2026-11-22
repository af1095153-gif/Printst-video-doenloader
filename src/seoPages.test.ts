import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getSeoPage, seoPages } from './seoPages';

const routes = [
  '/pinterest-video-downloader',
  '/pinterest-image-downloader',
  '/pinterest-gif-downloader',
  '/how-to-download-pinterest-videos',
];

test('all four SEO routes have unique, route-specific metadata', () => {
  assert.deepEqual(Object.keys(seoPages), routes);

  const titles = new Set<string>();
  for (const route of routes) {
    const page = getSeoPage(route);
    assert.ok(page);
    assert.equal(page.pathname, route);
    assert.notEqual(page.title, '');
    assert.notEqual(page.description, '');
    assert.notEqual(page.h1, '');
    titles.add(page.title);
  }
  assert.equal(titles.size, 4);
});

test('the download guide includes all required platforms and troubleshooting topics', () => {
  const page = getSeoPage('/how-to-download-pinterest-videos');
  assert.ok(page);
  assert.match(page.lead, /iPhone \(iOS\)/);
  assert.match(page.lead, /Android/);
  assert.match(page.lead, /PC\/Desktop/);
  assert.match(page.topics.map((topic) => `${topic.title} ${topic.description}`).join(' '), /pin\.it/i);
});

test('public sitemap contains all four landing pages', () => {
  const sitemap = readFileSync(new URL('../public/sitemap.xml', import.meta.url), 'utf8');
  for (const route of routes) {
    assert.ok(sitemap.includes(`https://kikpin.me${route}`));
  }
});

test('App uses lazy loading and a stable Suspense fallback for SEO routes', () => {
  const app = readFileSync(new URL('./App.tsx', import.meta.url), 'utf8');
  assert.match(app, /React\.lazy|lazy\s*\(/);
  assert.match(app, /<Suspense/);
  assert.match(app, /Loading page content/);
  assert.match(app, /min-h-\[360px\]/);
});

test('Vercel static assets have immutable caching without changing protected files or routes', () => {
  const vercel = readFileSync(new URL('../vercel.json', import.meta.url), 'utf8');
  assert.match(vercel, /\/assets\/\(.*\)/);
  assert.match(vercel, /max-age=31536000, immutable/);
  assert.ok(vercel.includes('robots'));
  assert.ok(vercel.includes('sitemap'));
});
