import { NextResponse } from 'next/server';
import { locales } from './lib/i18n.js';

export function proxy(request) {
  const firstSegment = request.nextUrl.pathname.split('/').filter(Boolean)[0];
  const locale = locales.includes(firstSegment) ? firstSegment : 'en';
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-kikpin-locale', locale);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
