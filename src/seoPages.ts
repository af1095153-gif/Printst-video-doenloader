export interface SeoPage {
  pathname: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  lead: string;
  sectionTitle: string;
  sectionIntro: string;
  topics: Array<{ title: string; description: string }>;
}

export const seoPages: Record<string, SeoPage> = {
  '/pinterest-video-downloader': {
    pathname: '/pinterest-video-downloader',
    title: 'Pinterest Video Downloader – Download Videos & Reels in HD',
    description:
      'Download public Pinterest videos and reels in MP4 / HD quality with KikPin. Paste a pin or pin.it link for fast, free, no-login downloads.',
    h1: 'Pinterest Video Downloader',
    eyebrow: 'MP4 · HD · Public Reels',
    lead:
      'Download public Pinterest videos and reels as MP4 files in the HD quality Pinterest provides. Paste a standard Pinterest link or pin.it shortcut and save the available video on mobile or desktop.',
    sectionTitle: 'Fast Pinterest video and reel downloads',
    sectionIntro:
      'Use KikPin for public video Pins, short-form reels, and video clips shared on Pinterest.',
    topics: [
      { title: 'MP4 and HD quality', description: 'Get the original-quality MP4 stream available on the Pin, including 720p or 1080p when supplied.' },
      { title: 'Reels and video Pins', description: 'Paste a reel or video Pin URL to preview the media and choose the download action.' },
      { title: 'No login or watermark', description: 'No KikPin account or Pinterest credentials are required for public, accessible Pins.' },
    ],
  },
  '/pinterest-image-downloader': {
    pathname: '/pinterest-image-downloader',
    title: 'Pinterest Image Downloader – Save Original Photos',
    description:
      'Save original-resolution Pinterest images and photos with KikPin. Download public image Pins from pinterest.com or pin.it links.',
    h1: 'Pinterest Image Downloader',
    eyebrow: 'Original Resolution · Photos · Carousels',
    lead:
      'Save public Pinterest images and photos at the original resolution available from Pinterest. KikPin supports direct Pin links, mobile share links, and pin.it shortcuts.',
    sectionTitle: 'Download Pinterest photos in original quality',
    sectionIntro:
      'Find a sharp, full-size image from the Pin and save it as the source file provided.',
    topics: [
      { title: 'Original-resolution images', description: 'KikPin resolves the largest available photo size instead of relying only on a small preview.' },
      { title: 'Photo and carousel Pins', description: 'Extract image media from individual photo Pins and multi-image Idea Pins.' },
      { title: 'Pin and pin.it links', description: 'Both pinterest.com URLs and shortened pin.it links can be pasted directly into the downloader.' },
    ],
  },
  '/pinterest-gif-downloader': {
    pathname: '/pinterest-gif-downloader',
    title: 'Pinterest GIF Downloader – GIFs, Story Pins & Idea Pins',
    description:
      'Download Pinterest GIFs, Story Pins, and multi-slide Idea Pins with KikPin. Paste a public Pin or pin.it link to save available media.',
    h1: 'Pinterest GIF Downloader',
    eyebrow: 'GIF · Story Pins · Idea Pins',
    lead:
      'Download animated Pinterest GIFs and save video or image slides from public Story Pins and multi-slide Idea Pins. Paste a public Pinterest URL to inspect all available media.',
    sectionTitle: 'GIFs, Story Pins, and Idea Pins',
    sectionIntro:
      'Pinterest mixed-media Pins can contain several clips or slides; KikPin presents the available media individually.',
    topics: [
      { title: 'Animated GIF downloads', description: 'Use the media download link to save an animated Pin when Pinterest provides a GIF or compatible image file.' },
      { title: 'Story Pin videos', description: 'Public Story Pins with video slides can expose individual clips for preview and download.' },
      { title: 'Multi-slide Idea Pins', description: 'Each available video or image slide is separated so you can choose exactly what to save.' },
    ],
  },
  '/how-to-download-pinterest-videos': {
    pathname: '/how-to-download-pinterest-videos',
    title: 'How to Download Pinterest Videos – iPhone, Android & PC',
    description:
      'Step-by-step guide to downloading public Pinterest videos on iPhone, Android, and PC. Includes pin.it troubleshooting and private Pin limitations.',
    h1: 'How to Download Pinterest Videos',
    eyebrow: 'iPhone · Android · PC/Desktop',
    lead:
      'Follow this guide to copy a public Pinterest Pin or pin.it link and save its video on iPhone (iOS), Android, or a PC/Desktop browser. Troubleshooting covers private and unavailable Pins too.',
    sectionTitle: 'Step-by-step by device',
    sectionIntro:
      'Copy the link first, then paste it into the KikPin box above and select Download.',
    topics: [
      { title: 'iPhone (iOS)', description: 'Open the Pin in the Pinterest app, tap the share or ••• menu, choose Copy Link, and paste the pinterest.com or pin.it link into KikPin in Safari.' },
      { title: 'Android', description: 'Open the Pin, use Share or Copy Link, then paste the URL into KikPin in Chrome or another mobile browser.' },
      { title: 'PC/Desktop browsers', description: 'Open the Pin in Chrome, Edge, Firefox, or Safari, copy the address bar or share URL, and paste it into KikPin.' },
    ],
  },
};

export function getSeoPage(pathname: string): SeoPage | null {
  return seoPages[pathname] || null;
}

export function updateDocumentMetadata(page: SeoPage): void {
  if (typeof document === 'undefined') return;

  const origin = 'https://kikpin.me';
  document.title = page.title;

  const description = page.description;
  const descriptionMeta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (descriptionMeta) descriptionMeta.content = description;

  const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (canonical) canonical.href = `${origin}${page.pathname}`;

  const setNamedMeta = (name: string, content: string) => {
    let element = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute('name', name);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };
  const setPropertyMeta = (property: string, content: string) => {
    let element = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute('property', property);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  setPropertyMeta('og:title', page.title);
  setPropertyMeta('og:description', description);
  setPropertyMeta('og:url', `${origin}${page.pathname}`);
  setNamedMeta('twitter:title', page.title);
  setNamedMeta('twitter:description', description);
}
