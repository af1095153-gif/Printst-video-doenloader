import { NextResponse } from 'next/server';
import { locales } from './lib/i18n.js';

export function proxy(request) {
  const redirects = {
    '/privacy-policy': '/privacy',
    '/idea-pin-downloader': '/pinterest-idea-pin-downloader',
  };
  const pathname = request.nextUrl.pathname;
  const redirectPath = redirects[pathname];
  if (redirectPath) {
    return NextResponse.redirect(new URL(redirectPath, request.url), 301);
  }

  const firstSegment = pathname.split('/').filter(Boolean)[0];
  const locale = locales.includes(firstSegment) ? firstSegment : 'en';
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-kikpin-locale', locale);
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  const isStaticAsset = /\.(?:avif|gif|ico|jpe?g|png|svg|webp|css|mjs|js|woff2?)$/i.test(pathname);
  const isHtmlPage = request.headers.get('accept')?.includes('text/html')
    && pathname !== '/sitemap.xml'
    && pathname !== '/robots.txt';

  if (isStaticAsset) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (isHtmlPage) {
    response.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image).*)'],
};
