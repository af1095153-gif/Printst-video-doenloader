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
  guideTitle: string;
  steps: Array<{ title: string; description: string }>;
  faqTitle: string;
  faqs: Array<{ question: string; answer: string }>;
}

export const seoPages: Record<string, SeoPage> = {
  '/pinterest-video-downloader': {
    pathname: '/pinterest-video-downloader',
    title: 'Pinterest Video Downloader — Download 1080p HD MP4 (No Watermark) | KikPin',
    description:
      'Download public Pinterest videos in 1080p HD MP4 free with KikPin. Works with pin.it short links on Android, iPhone, Windows, and Mac—no app or watermark.',
    h1: 'Pinterest Video Downloader (1080p HD)',
    eyebrow: 'MP4 · HD · Public Reels',
    lead:
      'Download public Pinterest videos and reels as MP4 files in the highest source quality Pinterest provides. Paste a standard Pin URL or pin.it shortcut and save it on Android, iPhone, Windows, or Mac.',
    sectionTitle: 'Download Pinterest videos in original HD',
    sectionIntro:
      'Use KikPin for public video Pins, short-form reels, and clips shared on Pinterest.',
    topics: [
      { title: 'MP4 and HD quality', description: 'Save the source MP4 Pinterest provides, including 1080p when it is available for the Pin.' },
      { title: 'Reels and video Pins', description: 'Paste a public reel or video Pin URL to preview the media and choose the download action.' },
      { title: 'No app or watermark', description: 'Download in your browser without installing an app, signing in, or adding a watermark.' },
    ],
    guideTitle: 'How to download Pinterest videos on any device',
    steps: [
      { title: 'Android', description: 'Copy the Pin link in Pinterest, open KikPin in Chrome, paste the link, then download the MP4 to your device.' },
      { title: 'iPhone', description: 'Copy the Pin link, open KikPin in Safari, paste it, and download. Find the file in Safari Downloads or save it to Photos from Files.' },
      { title: 'PC or Mac', description: 'Copy the Pin URL from your browser, paste it into KikPin, and choose Download HD to save the MP4.' },
    ],
    faqTitle: 'Pinterest video downloader FAQs',
    faqs: [
      { question: 'How do I save a Pinterest video to iPhone Safari or Gallery?', answer: 'Open KikPin in Safari, extract the public Pin, and tap Download. Safari saves the file to Downloads in Files; use Share > Save Video to add a compatible video to Photos.' },
      { question: 'Do Pinterest pin.it short links work?', answer: 'Yes. Paste a public pin.it link directly. KikPin follows the short link to its Pinterest Pin before extracting available media.' },
      { question: 'Can I download Pinterest videos in 1080p HD?', answer: 'KikPin downloads the best source quality Pinterest makes available for that Pin. If Pinterest only provides a lower-resolution version, KikPin cannot upscale it to 1080p.' },
    ],
  },
  '/pinterest-image-downloader': {
    pathname: '/pinterest-image-downloader',
    title: 'Pinterest Image Downloader — Save Full-Resolution HD Photos | KikPin',
    description:
      'Download original full-resolution Pinterest images and carousels in JPG/PNG without compression or login using KikPin.me.',
    h1: 'Pinterest Image Downloader',
    eyebrow: 'Original Resolution · Photos · Carousels',
    lead:
      'Save public Pinterest images and carousel slides in the highest resolution Pinterest provides. Paste a Pin link or pin.it shortcut to preview and download JPG or PNG files.',
    sectionTitle: 'Save Pinterest photos at source resolution',
    sectionIntro:
      'KikPin resolves the largest image available for public Pins instead of saving only a small preview.',
    topics: [
      { title: 'Full-resolution photos', description: 'Download the source image Pinterest serves, without re-encoding or adding compression.' },
      { title: 'Image carousels', description: 'Review the images available in a multi-image Pin and save the slide you need.' },
      { title: 'JPG and PNG', description: 'Keep the source format when Pinterest provides a JPG or PNG image.' },
    ],
    guideTitle: 'How to save Pinterest images',
    steps: [
      { title: 'Copy the Pin link', description: 'Open the public Pinterest image or carousel and copy its link using Share or the browser address bar.' },
      { title: 'Paste into KikPin', description: 'Paste the Pinterest or pin.it URL into the downloader above and select Extract Media.' },
      { title: 'Choose and save', description: 'Preview the available image, select a carousel slide when shown, and download the original file.' },
    ],
    faqTitle: 'Pinterest image downloader FAQs',
    faqs: [
      { question: 'Are images saved in their original resolution?', answer: 'KikPin selects the largest source image available from Pinterest for that public Pin. Resolution depends on the file Pinterest provides.' },
      { question: 'Can I download images from a Pinterest carousel?', answer: 'Yes. When Pinterest exposes multiple images, KikPin lists the available slides so you can preview and save each one.' },
      { question: 'How do I save Pinterest images on mobile?', answer: 'Open KikPin in Safari or Chrome, paste the Pin link, and download the image. On iPhone, use Files or Share > Save Image; on Android, find it in Downloads or Gallery.' },
    ],
  },
  '/pinterest-gif-downloader': {
    pathname: '/pinterest-gif-downloader',
    title: 'Pinterest GIF Downloader — Save Animated Pinterest GIFs Free | KikPin',
    description:
      'Save animated GIFs from Pinterest in original quality with KikPin. Free, fast, watermark-free, and works in any browser.',
    h1: 'Pinterest GIF Downloader',
    eyebrow: 'Animated GIFs · Original Quality',
    lead:
      'Save public animated Pinterest GIFs in the original quality available. Paste a Pinterest or pin.it link and use KikPin in any modern browser—no login or watermark.',
    sectionTitle: 'Save animated Pinterest GIFs',
    sectionIntro:
      'KikPin finds the media Pinterest makes available for a public Pin and provides a direct download.',
    topics: [
      { title: 'Animated media', description: 'Save the animated source when Pinterest exposes a GIF or a compatible video file.' },
      { title: 'Original quality', description: 'Download the available source file without adding a watermark or re-encoding it.' },
      { title: 'Browser based', description: 'Use the downloader from a phone, tablet, or desktop without installing an app.' },
    ],
    guideTitle: 'How to download a Pinterest GIF',
    steps: [
      { title: 'Copy the Pin URL', description: 'Open the public Pin that contains the animation and copy its link from Pinterest or your browser.' },
      { title: 'Extract the media', description: 'Paste the Pinterest or pin.it URL into KikPin and select Extract Media to preview the result.' },
      { title: 'Download and play', description: 'Choose Download to save the available GIF or video file, then open it in a compatible player or gallery app.' },
    ],
    faqTitle: 'Pinterest GIF downloader FAQs',
    faqs: [
      { question: 'Will an animated Pinterest GIF play on Android and iPhone?', answer: 'KikPin downloads the source format Pinterest provides. Most modern browsers can play GIFs; if the file is a video, open it in Photos, Gallery, or a compatible media player.' },
      { question: 'Do pin.it links work for GIF Pins?', answer: 'Yes. Paste the public pin.it short link into KikPin. The link is resolved to the Pinterest Pin before its available media is extracted.' },
      { question: 'Will the downloaded GIF keep its animation and quality?', answer: 'KikPin saves the available original media without adding a watermark. The file format and quality depend on what Pinterest serves for that Pin.' },
    ],
  },
  '/idea-pin-downloader': {
    pathname: '/idea-pin-downloader',
    title: 'Pinterest Idea Pin Downloader — Save Idea Pins & Reels With Audio | KikPin',
    description:
      'Download Pinterest Idea Pins and Reels in HD with original audio intact. Free, no watermark, and no login required on KikPin.me.',
    h1: 'Pinterest Idea Pin Downloader (With Audio)',
    eyebrow: 'Idea Pins · Reels · Original Audio',
    lead:
      'Download media from public Pinterest Idea Pins and Reels. KikPin keeps the original audio when it is included in the source video and lets you choose from available slides or clips.',
    sectionTitle: 'Save Pinterest Idea Pins and Reels',
    sectionIntro:
      'Paste a public Pin link to preview the video clips and images Pinterest makes available for download.',
    topics: [
      { title: 'Audio preserved', description: 'Video downloads retain the source audio track when Pinterest provides it with the media.' },
      { title: 'Multi-page Pins', description: 'Preview and choose individual video or image slides from multi-page Idea Pins.' },
      { title: 'Mobile and desktop', description: 'Use the same browser-based downloader on iPhone, Android, Windows, or Mac.' },
    ],
    guideTitle: 'How to download a Pinterest Idea Pin',
    steps: [
      { title: 'Copy the Idea Pin link', description: 'Open the public Idea Pin or Reel in Pinterest and copy its link using the Share menu.' },
      { title: 'Paste and extract', description: 'Open KikPin, paste the URL, and select Extract Media to see available video clips and slides.' },
      { title: 'Select a slide and save', description: 'Choose the clip or image you want, then download it. Video audio is retained when present in the source.' },
    ],
    faqTitle: 'Pinterest Idea Pin downloader FAQs',
    faqs: [
      { question: 'Will downloaded Idea Pin videos keep their audio?', answer: 'KikPin preserves the source audio when Pinterest includes it in the available video stream. Muted or missing source audio cannot be added back.' },
      { question: 'Can I download every page of a multi-page Idea Pin?', answer: 'If Pinterest exposes the Pin slides, KikPin lists them in the result so you can select and download each available video or image.' },
      { question: 'Can I download Idea Pins on a phone?', answer: 'Yes. Use Safari on iPhone or Chrome on Android, paste the public Pin link, and download the available media to your device.' },
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
    guideTitle: 'Download a Pinterest video in three steps',
    steps: [
      { title: 'Copy a public Pin link', description: 'Use Share > Copy Link in Pinterest or copy the URL from your desktop browser.' },
      { title: 'Paste into KikPin', description: 'Open KikPin on your device, paste the link, and select Extract Media.' },
      { title: 'Download the file', description: 'Preview the available video and select Download to save it to your device.' },
    ],
    faqTitle: 'Pinterest video download guide FAQs',
    faqs: [
      { question: 'Can I download private Pins?', answer: 'No. KikPin only works with public Pins you can access. Deleted, private, or restricted content cannot be extracted.' },
      { question: 'Do short pin.it links work?', answer: 'Yes. Paste a public pin.it link directly into the downloader. KikPin follows the short link to the Pin.' },
      { question: 'Why is a Pin unavailable?', answer: 'The Pin may be private, deleted, region-restricted, or no longer served by Pinterest. Try copying a fresh link to a public Pin.' },
    ],
  },
};

export function getSeoPage(pathname: string): SeoPage | null {
  return seoPages[pathname] || null;
}
