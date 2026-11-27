import { ArrowRight, Check, Clock3, Download, ShieldCheck, Star } from 'lucide-react';
import { BlogFigure } from './BlogVisuals';

const articleDate = '2026-11-26';
const mobileArticleDate = '2026-11-27';
const blogImage = (slug) => `/images/blog/${slug}.svg`;
const inlineImage = (slug, number) => `/images/blog/inline-${slug}-${number}.svg`;

export const guides = [
  {
    slug: 'save-pinterest-videos-to-iphone-camera-roll-android-gallery',
    category: 'Mobile download guide',
    readTime: '6 min read',
    title: 'How to Save Pinterest Videos to iPhone Camera Roll & Android Gallery (No App Needed)',
    excerpt: 'Step-by-step guide to saving public Pinterest videos, Idea Pins, and pin.it links directly to iPhone Photos (iOS Safari) and Android Gallery in HD without watermarks or apps.',
    metaDescription: 'Step-by-step guide to saving public Pinterest videos, Idea Pins, and pin.it links directly to iPhone Photos (iOS Safari) and Android Gallery in HD without watermarks or apps.',
    date: 'Nov 27, 2026',
    datePublished: mobileArticleDate,
    intro: 'Save a public Pinterest video to your iPhone Photos or Android Gallery with the browser you already have. No extra downloader app is needed.',
    tip: 'Pinterest pin.it links are short share URLs. Paste one directly into KikPin on mobile and it resolves to the public Pin automatically. Some animated Pins that look like GIFs are served as MP4 video, so the saved extension may be .mp4 even when the Pinterest preview loops like a GIF.',
    points: ['Use a direct public Pin or pin.it share link; private Pins cannot be accessed.', 'On iPhone, Safari downloads to Files first; use Share → Save Video to move it into Photos.', 'On Android, Chrome saves the extracted video to Downloads, where Gallery may index it automatically.', 'Available formats and resolution depend on the source Pinterest provides.'],
    coverAlt: 'KikPin mobile Pinterest saving guide cover showing a Pin link moving through KikPin to iPhone Photos and Android Gallery.',
    visuals: [
      { src: inlineImage('save-pinterest-videos-to-iphone-camera-roll-android-gallery', 1), alt: 'Three-step mobile diagram: copy a public Pinterest link, paste and extract it on KikPin, then save it to Photos or Gallery.', caption: 'Copy the public Pin link, extract the available file in KikPin, and save it to your phone.' },
      { src: inlineImage('save-pinterest-videos-to-iphone-camera-roll-android-gallery', 2), alt: 'iPhone Safari Files-to-Photos diagram showing Downloads, the Share action sheet, and Save Video to Photos.', caption: 'On iPhone, move the Safari download from Files → Downloads to Photos with Share → Save Video.' },
    ],
    mobileSteps: {
      iphone: [
        ['Copy the Pinterest link', 'In the Pinterest app, open the public Pin, tap Share, then choose Copy Link.'],
        ['Paste in Safari', 'Open kikpin.me in Safari and paste the Pin or pin.it link into the downloader.'],
        ['Download to Files', 'Tap Extract Media, choose the video, and find the download in Files > Downloads.'],
        ['Save to Camera Roll', 'In Files, tap Share and choose Save Video to add it to Photos (Camera Roll).'],
      ],
      android: [
        ['Copy the Pinterest link', 'Open the public Pin in Pinterest, tap Share, and copy its link.'],
        ['Paste on kikpin.me', 'Open KikPin in Chrome and paste the public Pin or pin.it URL.'],
        ['Tap Extract Media', 'Choose the available video and start the download from the result.'],
        ['Save to Gallery / Downloads', 'Chrome saves the file in Downloads. Gallery apps may show it automatically after indexing.'],
      ],
    },
    quickReference: [
      ['iPhone', 'Safari', 'Files > Downloads, then Save Video to Photos', 'MP4 when Pinterest serves video'],
      ['Android', 'Chrome', 'Downloads; Gallery may index the saved file', 'MP4 when available'],
      ['Desktop', 'Edge Extension', 'Browser download folder', 'Original source format'],
    ],
  },
  {
    slug: 'how-to-download-pinterest-videos-idea-pins-with-audio', category: 'Video guides', readTime: '6 min read', title: 'How to download Pinterest videos and Idea Pins with audio', excerpt: 'Save a public Pin as a clean MP4 while keeping the original sound and source quality available.', date: 'Nov 26, 2026', datePublished: articleDate, intro: 'A practical walkthrough for saving public Pinterest video Pins and Idea Pins with their original audio when it is present in the source.', tip: 'For a multi-scene Idea Pin, copy the direct share link from the Pin itself so KikPin can resolve the available clips and source audio.', points: ['Paste a public Pinterest URL or pin.it short link.', 'Preview the source, available audio, and resolution.', 'Save only media you own or are permitted to use.'],
    coverAlt: 'KikPin cover illustration of a multi-slide Idea Pin with an extracted source audio track.',
    visuals: [
      { src: inlineImage('how-to-download-pinterest-videos-idea-pins-with-audio', 1), alt: 'Idea Pin audio diagram showing multiple video slides and a separate source audio track.', caption: 'A public Idea Pin can contain multiple scenes with a source audio track when one is available.' },
      { src: inlineImage('how-to-download-pinterest-videos-idea-pins-with-audio', 2), alt: 'Three-step Idea Pin extraction diagram from public share link to media resolution and MP4 with source audio.', caption: 'Use the direct share link so KikPin can resolve the source media and audio Pinterest exposes.' },
    ],
  },
  {
    slug: 'save-pinterest-content-offline-without-account', category: 'Privacy & tools', readTime: '5 min read', title: 'Save Pinterest content offline without an account', excerpt: 'A straightforward way to keep public Pinterest media on your device without creating an account with a downloader.', date: 'Nov 26, 2026', datePublished: articleDate, intro: 'You can use KikPin without a KikPin account. This guide explains the link-to-file flow, what stays on your device, and the limits of public Pin access.', tip: 'Use the Pin share link, not a board link. A direct public Pin URL is easier to resolve and avoids exposing unrelated browsing information.', points: ['Copy the share link for a public Pin in Pinterest.', 'Paste it into KikPin and preview the available media.', 'Download the file directly to your device; private Pins remain inaccessible.'],
    coverAlt: 'KikPin cover showing a public Pinterest URL, a no-login step, and a no-watermark media file.',
    visuals: [
      { src: inlineImage('save-pinterest-content-offline-without-account', 1), alt: 'Public Pinterest URL workflow diagram showing copy link, KikPin preview, and a locally saved file.', caption: 'A direct public Pin link is enough to preview the source and save the available media.' },
      { src: inlineImage('save-pinterest-content-offline-without-account', 2), alt: 'Privacy shield graphic highlighting no KikPin login, no added watermark, and public Pins only.', caption: 'No KikPin account or added watermark is required; private Pins stay private.' },
    ],
  },
  {
    slug: 'troubleshooting-pinterest-downloads', category: 'Troubleshooting', readTime: '4 min read', title: 'Troubleshooting Pinterest downloads', excerpt: 'Fix common link, preview, and download problems with a few practical checks.', date: 'Nov 26, 2026', datePublished: articleDate, intro: 'When a Pinterest download fails, the cause is often the link type, Pin visibility, or a browser download setting. Work through these checks before trying another source.', tip: 'If a short link does not open, open the Pin in Pinterest and copy its direct URL. Make sure it is public and still available.', points: ['Confirm the URL points to a single Pin, not a board or search page.', 'Try a fresh public link and allow the browser to save the file.', 'Private, removed, or restricted Pins cannot be extracted.'],
    coverAlt: 'KikPin troubleshooting cover with a public Pin, valid pin.it URL, and browser download checklist.',
    visuals: [
      { src: inlineImage('troubleshooting-pinterest-downloads', 1), alt: 'Pinterest download troubleshooting checklist for public Pin visibility, a valid pinterest.com or pin.it URL, and browser download permission.', caption: 'Check visibility, the share URL, and browser download settings before retrying.' },
      { src: inlineImage('troubleshooting-pinterest-downloads', 2), alt: 'Diagram contrasting a direct single-Pin URL with a board link and showing a refreshed browser preview.', caption: 'A direct Pin URL is usually more reliable than a board or search link.' },
    ],
  },
  {
    slug: 'pinterest-video-quality-720p-1080p-4k', category: 'Video quality', readTime: '5 min read', title: 'Pinterest video quality: 720p, 1080p, and 4K explained', excerpt: 'Understand source resolution, what KikPin can preserve, and why a downloader cannot create missing detail.', date: 'Nov 26, 2026', datePublished: articleDate, intro: 'Pinterest may provide different source resolutions for different Pins. KikPin selects the media Pinterest makes available rather than inventing pixels through upscaling.', tip: 'Check the detected resolution before saving. A label such as HD describes the source Pinterest serves; it is not a promise that every Pin has 1080p or 4K.', points: ['Resolution depends on each Pin’s available source files.', 'KikPin does not upscale 720p media to 1080p or 4K.', 'Choose the highest genuine source option shown in the result.'],
    coverAlt: 'KikPin video resolution cover comparing available 720p, 1080p HD, 2K, and 4K sources.',
    visuals: [
      { src: inlineImage('pinterest-video-quality-720p-1080p-4k', 1), alt: 'Resolution comparison graphic with separate 720p, 1080p HD, 2K, and 4K source labels.', caption: 'KikPin preserves the highest real source Pinterest exposes for that Pin.' },
      { src: inlineImage('pinterest-video-quality-720p-1080p-4k', 2), alt: 'Source-quality checklist showing detection, selection, and saving without artificial upscaling.', caption: 'Check the detected source before saving; upscaling cannot restore missing detail.' },
    ],
  },
  {
    slug: 'understanding-pinterest-file-formats', category: 'Media formats', readTime: '5 min read', title: 'Understanding Pinterest file formats', excerpt: 'Learn what MP4, GIF, JPG, PNG, and WebP mean for the media you save from Pinterest.', date: 'Nov 26, 2026', datePublished: articleDate, intro: 'Pinterest media can be delivered as a video stream, animation, or image. The file format you receive reflects what Pinterest exposes for that Pin.', tip: 'A Pin that looks like a GIF may be served as an MP4 video. Check the downloaded extension and open it with a compatible player.', points: ['MP4 is commonly used for video Pins and clips.', 'Images may be delivered as JPG, PNG, or WebP.', 'HLS is a segmented streaming format that may be assembled into a playable video when accessible.'],
    coverAlt: 'KikPin format guide cover comparing MP4 video, GIF animation, JPG photo, and WebP image cards.',
    visuals: [
      { src: inlineImage('understanding-pinterest-file-formats', 1), alt: 'Four format cards comparing MP4 video, GIF animation, JPG still photos, and WebP images.', caption: 'Different formats suit motion, animation, or still-image Pins.' },
      { src: inlineImage('understanding-pinterest-file-formats', 2), alt: 'Format diagram showing an animated-looking Pinterest Pin that may be delivered as an MP4 file.', caption: 'A looping preview can still be an MP4 at the source; check the saved extension.' },
    ],
  },
  {
    slug: 'save-pinterest-carousels-stories-gifs-hd', category: 'Media formats', readTime: '5 min read', title: 'Save Pinterest carousels, stories, and GIFs in HD', excerpt: 'Understand what is downloadable from image sets, animated Pins, and short-form Pinterest media.', date: 'Nov 26, 2026', datePublished: articleDate, intro: 'Pinterest Pins can contain a single image, carousel, GIF, or video-like story content. Available files depend on the public Pin source.', tip: 'For a carousel, copy the link from the Pin rather than the board and review each slide exposed in the result.', points: ['Use the direct public Pin link.', 'Let KikPin identify the image, animation, or video source.', 'Choose the original available file; quality depends on Pinterest.'],
    coverAlt: 'KikPin carousel and GIF guide with separate Pin slides and an animated source preview.',
    visuals: [
      { src: inlineImage('save-pinterest-carousels-stories-gifs-hd', 1), alt: 'Carousel diagram with three separate source slides to review and save from a public Pinterest Pin.', caption: 'A carousel Pin may expose several original images as separate slides.' },
      { src: inlineImage('save-pinterest-carousels-stories-gifs-hd', 2), alt: 'Animated Pinterest Pin format diagram showing that a GIF-like preview may be delivered as GIF or MP4.', caption: 'The same animated-looking Pin may be served as GIF or MP4 depending on Pinterest.' },
    ],
  },
  {
    slug: 'privacy-first-pinterest-downloader-extension', category: 'Privacy & tools', readTime: '4 min read', title: 'What to look for in a privacy-first Pinterest downloader extension', excerpt: 'A checklist for browser permissions, transparent processing, and safer download workflows.', date: 'Nov 26, 2026', datePublished: articleDate, intro: 'Browser extensions can be useful, but their permissions matter. Review the access an extension requests before adding it to your browser.', tip: 'Review browser permissions before installing any extension. A tool should explain why each permission is needed.', points: ['Check whether an extension uses Manifest V3.', 'Prefer narrow activeTab access over broad site access.', 'Read the publisher’s privacy details before use.'],
    coverAlt: 'KikPin extension privacy cover highlighting selected-tab access and clear permission review.',
    visuals: [
      { src: inlineImage('privacy-first-pinterest-downloader-extension', 1), alt: 'Browser extension permission diagram emphasizing active-tab access and an explicitly selected Pin URL.', caption: 'Prefer narrow permissions that align with a clear, user-initiated action.' },
      { src: inlineImage('privacy-first-pinterest-downloader-extension', 2), alt: 'Extension checklist for checking the publisher, reviewing permissions, and reading its privacy policy.', caption: 'Check who publishes an extension and understand each requested permission.' },
    ],
  },
];

const trustpilotUrl = 'https://www.trustpilot.com/review/kikpin.me';

export function TrustpilotBadge({ compact = false }) {
  return <a href={trustpilotUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] text-zinc-200 transition-colors hover:border-[#00B67A]/60 hover:bg-[#00B67A]/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B67A] ${compact ? 'px-3 py-2 text-xs' : 'px-4 py-2.5 text-sm'}`}><Star aria-hidden="true" className="size-4 fill-[#00B67A] text-[#00B67A]"/><span>{compact ? 'Trustpilot' : 'Review us on Trustpilot'}</span><span className="sr-only"> (opens in a new tab)</span></a>;
}

function CoverImage({ guide, className = '' }) {
  return <img src={blogImage(guide.slug)} alt={guide.coverAlt} width="1200" height="675" loading="lazy" decoding="async" className={`aspect-video w-full rounded-xl object-cover ${className}`} />;
}

function StepCards({ title, steps, columns = 4 }) {
  return <section><h3 className="text-xl font-bold text-white">{title}</h3><div className={`mt-4 grid gap-3 ${columns === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-4'}`}>{steps.map(([label, text], index) => <div key={label} className="rounded-2xl border border-white/10 bg-[#141418] p-5"><span className="font-mono text-xs text-[#FF7182]">STEP 0{index + 1}</span><h4 className="mt-3 text-base font-bold text-white">{label}</h4><p className="mt-2 text-sm leading-relaxed text-zinc-400">{text}</p></div>)}</div></section>;
}

function QuickReference({ guide }) {
  if (guide.quickReference) {
    return <section><h3 className="text-xl font-bold text-white">Quick reference: where your video saves</h3><div className="mt-4 overflow-x-auto rounded-xl border border-white/10"><table className="w-full min-w-[640px] text-left text-sm"><thead className="bg-white/[0.04] text-xs uppercase tracking-wide text-zinc-400"><tr><th className="px-4 py-3">Device</th><th className="px-4 py-3">Browser / tool</th><th className="px-4 py-3">Save location</th><th className="px-4 py-3">Common format</th></tr></thead><tbody className="divide-y divide-white/10 text-zinc-300">{guide.quickReference.map(([device, browser, location, format]) => <tr key={device}><th className="px-4 py-3 font-medium text-white">{device}</th><td className="px-4 py-3">{browser}</td><td className="px-4 py-3">{location}</td><td className="px-4 py-3">{format}</td></tr>)}</tbody></table></div><p className="mt-3 text-xs text-zinc-500">Pinterest controls which source files and formats are available for each Pin.</p></section>;
  }

  return <section><h3 className="text-xl font-bold text-white">Quick reference: formats and quality</h3><div className="mt-4 overflow-x-auto rounded-xl border border-white/10"><table className="w-full min-w-[520px] text-left text-sm"><thead className="bg-white/[0.04] text-xs uppercase tracking-wide text-zinc-400"><tr><th className="px-4 py-3">Source</th><th className="px-4 py-3">Common output</th><th className="px-4 py-3">Quality note</th></tr></thead><tbody className="divide-y divide-white/10 text-zinc-300"><tr><th className="px-4 py-3 font-medium text-white">Video / Idea Pin</th><td className="px-4 py-3">MP4</td><td className="px-4 py-3">Source audio when available</td></tr><tr><th className="px-4 py-3 font-medium text-white">Animated Pin</th><td className="px-4 py-3">GIF or MP4</td><td className="px-4 py-3">Depends on Pinterest source</td></tr><tr><th className="px-4 py-3 font-medium text-white">Image / carousel</th><td className="px-4 py-3">JPG, PNG, or WebP</td><td className="px-4 py-3">Original available dimensions</td></tr></tbody></table></div><p className="mt-3 text-xs text-zinc-500">KikPin does not upscale media. Formats and resolution vary by Pin.</p></section>;
}

export function BlogIndex() {
  const featured = guides[0];
  return <section className="mx-auto min-h-[65vh] max-w-6xl px-4 pb-12 sm:px-6"><a href={`/blog/${featured.slug}`} className="group grid overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#211216] via-[#151518] to-[#111114] p-4 transition-colors hover:border-[#E60023]/50 sm:p-6 md:grid-cols-[1.1fr_.9fr] md:items-center md:gap-8"><div><span className="rounded-full border border-[#E60023]/30 bg-[#E60023]/10 px-3 py-1 text-xs font-semibold text-[#FF7182]">Featured guide</span><h2 className="mt-5 max-w-xl text-2xl font-bold leading-tight text-white sm:text-4xl">{featured.title}</h2><p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400">{featured.excerpt}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">Read the guide <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1"/></span></div><div className="mt-6 min-w-0 md:mt-0"><CoverImage guide={featured} className="border border-white/10 shadow-xl"/></div></a><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{guides.map((guide) => <a key={guide.slug} href={`/blog/${guide.slug}`} className="group flex min-h-[340px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#141418] transition-colors hover:border-white/20 hover:bg-[#18181d]"><CoverImage guide={guide} className="rounded-none border-b border-white/10"/><div className="flex flex-1 flex-col p-5"><div className="flex items-center justify-between gap-3"><span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-medium text-zinc-300">{guide.category}</span><span className="flex items-center gap-1.5 text-xs text-zinc-500"><Clock3 aria-hidden="true" className="size-3.5"/>{guide.readTime}</span></div><h2 className="mt-5 text-lg font-bold leading-snug text-white">{guide.title}</h2><p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-400">{guide.excerpt}</p><div className="mt-auto flex items-center justify-between pt-5"><span className="text-xs text-zinc-500">{guide.date}</span><span className="text-sm font-semibold text-zinc-200 group-hover:text-white">Read guide →</span></div></div></a>)}</div></section>;
}

export function LatestBlog() {
  const latest = guides.slice(0, 3);
  return <section aria-labelledby="latest-blog-title" className="mt-14 border-t border-white/10 pt-10"><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#FF7182]">Learn with KikPin</p><h2 id="latest-blog-title" className="mt-2 text-2xl font-bold text-white">Latest from the Blog</h2></div><a href="/blog" className="text-sm font-semibold text-zinc-300 hover:text-white">All guides <ArrowRight aria-hidden="true" className="ml-1 inline size-4"/></a></div><div className="mt-5 grid gap-3 md:grid-cols-3">{latest.map((guide) => <a key={guide.slug} href={`/blog/${guide.slug}`} className="overflow-hidden rounded-xl border border-white/10 bg-[#141418] transition-colors hover:border-[#E60023]/40"><CoverImage guide={guide} className="rounded-none border-b border-white/10"/><div className="p-4"><p className="text-[11px] font-semibold uppercase tracking-wide text-[#FF7182]">{guide.category} · {guide.readTime}</p><h3 className="mt-2 text-sm font-semibold leading-snug text-white">{guide.title}</h3><p className="mt-2 text-xs text-zinc-500">{guide.date} <span className="text-zinc-400">· Read guide →</span></p></div></a>)}</div></section>;
}

export function BlogArticle({ slug }) {
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) return null;
  const coverUrl = `https://kikpin.me${blogImage(guide.slug)}`;
  const structuredData = { '@context': 'https://schema.org', '@type': 'Article', headline: guide.title, description: guide.metaDescription || guide.excerpt, image: coverUrl, datePublished: guide.datePublished, dateModified: guide.datePublished, author: { '@type': 'Organization', name: 'KikPin', url: 'https://kikpin.me' }, publisher: { '@type': 'Organization', name: 'KikPin', url: 'https://kikpin.me' }, mainEntityOfPage: `https://kikpin.me/blog/${guide.slug}` };
  const standardSteps = [
    ['Android', `Open the Pin in Pinterest or your browser, tap Share, and copy the link. Open KikPin in Chrome, paste the URL, and save the file from Downloads. ${guide.points[0]}`],
    ['iOS', `In Pinterest, choose Share and Copy Link. Open KikPin in Safari, paste the link, and save the available media from Safari Downloads or Files. ${guide.points[1]}`],
    ['Desktop', `Copy the Pin URL from the address bar or Share menu, paste it into KikPin, and choose the source file you need. ${guide.points[2]}`],
  ];
  return <><article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14"><nav aria-label="Breadcrumb" className="text-xs text-zinc-500"><a href="/blog" className="hover:text-white">Blog</a><span className="mx-2">/</span><span>{guide.category}</span></nav><header className="mt-6"><div className="flex flex-wrap items-center gap-3 text-xs"><span className="rounded-full border border-[#E60023]/30 bg-[#E60023]/10 px-3 py-1 font-semibold text-[#FF7182]">{guide.category}</span><span className="text-zinc-500">{guide.readTime}</span><time dateTime={guide.datePublished} className="text-zinc-500">{guide.date}</time></div><h1 className="mt-5 max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-4xl">{guide.title}</h1><p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-400">{guide.intro}</p></header><BlogFigure src={blogImage(guide.slug)} alt={guide.coverAlt} caption={`${guide.category} · KikPin guide`} className="mt-8"/><div className="mt-9 space-y-8"><section className="rounded-2xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur sm:p-8"><div className="flex items-center gap-2 text-sm font-bold text-white"><Check aria-hidden="true" className="size-4 text-[#00B67A]"/>TL;DR / Key Takeaways</div><ul className="mt-4 grid gap-3 text-sm leading-relaxed text-zinc-300">{guide.points.map((point) => <li key={point} className="flex gap-3"><Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[#00B67A]"/>{point}</li>)}</ul></section><BlogFigure {...guide.visuals[0]} className="my-8"/>{guide.mobileSteps ? <><StepCards title="iPhone (iOS Safari): save to Camera Roll" steps={guide.mobileSteps.iphone}/><BlogFigure {...guide.visuals[1]} className="my-8"/><StepCards title="Android (Chrome): save to Gallery" steps={guide.mobileSteps.android}/></> : <StepCards title="Step-by-step by device" steps={standardSteps} columns={2}/>}<aside className="rounded-xl border-l-2 border-[#E60023] bg-[#E60023]/[0.07] p-5"><p className="text-xs font-bold uppercase tracking-[0.12em] text-[#FF7182]">Pro tip</p><p className="mt-2 text-sm leading-relaxed text-zinc-300">{guide.tip}</p></aside>{guide.mobileSteps ? <QuickReference guide={guide}/> : <><BlogFigure {...guide.visuals[1]} className="my-8"/><QuickReference guide={guide}/></>}<section className="flex flex-col gap-4 rounded-2xl border border-[#E60023]/25 bg-gradient-to-r from-[#231116] to-[#151518] p-6 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-semibold uppercase tracking-wide text-[#FF7182]">Ready to save?</p><h3 className="mt-2 text-xl font-bold text-white">Try the free Pinterest downloader</h3><p className="mt-1 text-sm text-zinc-400">No login, pop-ups, or added watermark.</p></div><div className="flex flex-wrap gap-3"><a href="/pinterest-video-downloader" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#E60023] px-5 text-sm font-bold text-white hover:bg-[#c9001f]">Open video downloader <ArrowRight aria-hidden="true" className="size-4"/></a><a href="/supported-urls" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/15 px-5 text-sm font-semibold text-zinc-200 hover:bg-white/5">Check supported URLs</a></div></section><section className="border-t border-white/10 pt-6"><div className="flex items-center gap-2 text-sm font-semibold text-white"><ShieldCheck aria-hidden="true" className="size-4 text-[#FF7182]"/>Use media responsibly</div><p className="mt-2 text-sm leading-relaxed text-zinc-400">Only save content you own or have permission to use, and respect creators’ rights and Pinterest’s terms.</p><a href="/blog" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 hover:text-white">More guides <ArrowRight aria-hidden="true" className="size-4"/></a></section></div></article><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /></>;
}
