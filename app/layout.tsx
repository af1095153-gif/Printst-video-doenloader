import type { Metadata, Viewport } from 'next';
import '../src/index.css';

const siteDescription =
  'Download Pinterest videos, images, GIFs, reels, and carousels online for free in HD without watermark using KikPin. Works on mobile and desktop with no login.';

export const metadata: Metadata = {
  metadataBase: new URL('https://kikpin.me'),
  title: 'KikPin – Free Pinterest Video, Image & GIF Downloader Online',
  description: siteDescription,
  alternates: { canonical: '/' },
  icons: { icon: '/icon.png' },
  openGraph: {
    title: 'KikPin – Free Pinterest Video, Image & GIF Downloader Online',
    description: siteDescription,
    type: 'website',
    url: 'https://kikpin.me/',
    siteName: 'KikPin',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KikPin – Free Pinterest Video, Image & GIF Downloader Online',
    description: siteDescription,
  },
};

export const viewport: Viewport = {
  themeColor: '#0B0B0E',
  colorScheme: 'dark',
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://kikpin.me/#organization',
      name: 'KikPin',
      alternateName: 'KikPin.me',
      url: 'https://kikpin.me',
      logo: 'https://kikpin.me/icon.png',
      email: 'contact@kikpin.me',
      description:
        'KikPin is a free online tool and browser extension for downloading public Pinterest videos, Idea Pins, GIFs, and HD images without watermarks.',
      sameAs: [
        'https://microsoftedge.microsoft.com/addons/detail/kikpin-pinterest-video-/kpgnbgodaeeapgnahngpaoijkonoboae',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://kikpin.me/#website',
      name: 'KikPin',
      url: 'https://kikpin.me',
      publisher: { '@id': 'https://kikpin.me/#organization' },
    },
    {
      '@type': 'WebApplication',
      '@id': 'https://kikpin.me/#webapp',
      name: 'KikPin - Pinterest Video, Image & GIF Downloader',
      url: 'https://kikpin.me',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript. Works in all modern browsers.',
      description: siteDescription,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      publisher: { '@id': 'https://kikpin.me/#organization' },
      isPartOf: { '@id': 'https://kikpin.me/#website' },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap"
        />
      </head>
      <body className="bg-[#0B0B0E] text-[#F4F4F6] antialiased selection:bg-[#E60023]/30 selection:text-white">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
