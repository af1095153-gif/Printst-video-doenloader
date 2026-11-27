import { NextResponse } from 'next/server';
import { locales } from './lib/i18n.js';

export function proxy(request) {
  const redirects = {
    '/privacy': '/privacy-policy',
    '/idea-pin-downloader': '/pinterest-idea-pin-downloader',
  };
  const redirectPath = redirects[request.nextUrl.pathname];
  if (redirectPath) {
    return NextResponse.redirect(new URL(redirectPath, request.url), 301);
  }

  const firstSegment = request.nextUrl.pathname.split('/').filter(Boolean)[0];
  const locale = locales.includes(firstSegment) ? firstSegment : 'en';
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-kikpin-locale', locale);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
