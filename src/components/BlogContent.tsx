import { ArrowRight, Check, Clock3, Download, ShieldCheck, Star } from 'lucide-react';

export const guides = [
  {
    slug: 'how-to-download-pinterest-videos-idea-pins-with-audio',
    category: 'Video guides',
    readTime: '6 min read',
    title: 'How to download Pinterest videos and Idea Pins with audio',
    excerpt: 'Save a public Pin as a clean MP4 while keeping the original sound and source quality available.',
    date: 'Nov 26, 2026',
    intro: 'A practical walkthrough for saving public Pinterest video Pins and Idea Pins with their original audio when it is present in the source.',
    tip: 'If an Idea Pin has multiple scenes, open the Pin itself and copy its direct share link. The source page gives KikPin the best chance to resolve the complete video and sound track.',
    points: ['Paste the public Pin URL into KikPin; pin.it short links are supported.', 'Preview the available source and check its audio and resolution details.', 'Save the MP4 to a device you control and use it only with permission.'],
  },
  {
    slug: 'save-pinterest-carousels-stories-gifs-hd',
    category: 'Media formats',
    readTime: '5 min read',
    title: 'Save Pinterest carousels, stories, and GIFs in HD',
    excerpt: 'Understand what is downloadable from image sets, animated Pins, and short-form Pinterest media.',
    date: 'Nov 26, 2026',
    intro: 'Pinterest Pins can contain a single image, a carousel of images, a looping GIF, or video-like story content. This guide explains how to identify each type and save the original media that is available.',
    tip: 'For a carousel, open the exact slide you need before copying the share URL. Some Pinterest pages expose the selected image as the highest-resolution source.',
    points: ['Copy the Pin share link from Pinterest rather than a board URL.', 'Let KikPin identify whether the source contains images, animation, or video.', 'Choose the original available file; resolution depends on the Pin source.'],
  },
  {
    slug: 'privacy-first-pinterest-downloader-extension',
    category: 'Privacy & tools',
    readTime: '4 min read',
    title: 'What to look for in a privacy-first Pinterest downloader extension',
    excerpt: 'A quick checklist for browser permissions, transparent processing, and safer download workflows.',
    date: 'Nov 26, 2026',
    intro: 'Browser extensions can be useful, but their permissions matter. Here is a simple checklist for assessing an extension before adding it to your browser.',
    tip: 'Review the permissions shown by your browser before installing any extension. A tool should explain why each permission is needed and avoid requesting access to unrelated browsing activity.',
    points: ['Check whether the extension uses the current Manifest V3 platform.', 'Prefer narrow activeTab access over broad access to every site.', 'Read the publisher privacy details and confirm what data is sent during a download.'],
  },
] as const;

const trustpilotUrl = 'https://www.trustpilot.com/review/kikpin.me';

export function TrustpilotBadge({ compact = false }: { compact?: boolean }) {
  return <a href={trustpilotUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] text-zinc-200 transition-colors hover:border-[#00B67A]/60 hover:bg-[#00B67A]/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B67A] ${compact ? 'px-3 py-2 text-xs' : 'px-4 py-2.5 text-sm'}`}><Star aria-hidden="true" className="size-4 fill-[#00B67A] text-[#00B67A]"/><span>{compact ? 'Trustpilot' : 'Review us on Trustpilot'}</span><span className="sr-only"> (opens in a new tab)</span></a>;
}

export function BlogIndex() {
  return <section className="mx-auto min-h-[65vh] max-w-6xl px-4 py-0 sm:px-6">
    <a href={`/blog/${guides[0].slug}`} className="group mt-0 grid overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#211216] via-[#151518] to-[#111114] p-6 transition-colors hover:border-[#E60023]/50 md:grid-cols-[1.2fr_.8fr] md:items-center sm:p-10"><div><span className="rounded-full border border-[#E60023]/30 bg-[#E60023]/10 px-3 py-1 text-xs font-semibold text-[#FF7182]">Featured guide</span><h2 className="mt-5 max-w-xl text-2xl font-bold leading-tight text-white sm:text-4xl">{guides[0].title}</h2><p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400">{guides[0].excerpt}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">Read the guide <ArrowRight className="size-4 transition-transform group-hover:translate-x-1"/></span></div><div className="mt-8 flex aspect-[1.5] items-center justify-center rounded-2xl border border-white/10 bg-black/20 md:mt-0"><div className="rounded-2xl border border-white/10 bg-[#1B1B20] p-5 shadow-2xl"><div className="flex size-14 items-center justify-center rounded-2xl bg-[#E60023] text-white"><Download className="size-7"/></div><p className="mt-4 text-sm font-semibold text-white">Pin to MP4</p><p className="mt-1 text-xs text-zinc-500">Original source · ready to save</p></div></div></a>
    <div className="mt-10 grid gap-4 md:grid-cols-3">{guides.map((guide) => <a key={guide.slug} href={`/blog/${guide.slug}`} className="group flex min-h-[290px] flex-col rounded-2xl border border-white/10 bg-[#141418] p-6 transition-colors hover:border-white/20 hover:bg-[#18181d]"><div className="flex items-center justify-between gap-3"><span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-medium text-zinc-300">{guide.category}</span><span className="flex items-center gap-1.5 text-xs text-zinc-500"><Clock3 className="size-3.5"/>{guide.readTime}</span></div><h2 className="mt-6 text-xl font-bold leading-snug text-white">{guide.title}</h2><p className="mt-3 line-clamp-2 text-sm leading-relaxed text-zinc-400">{guide.excerpt}</p><div className="mt-auto flex items-center justify-between pt-6"><span className="text-xs text-zinc-500">{guide.date}</span><span className="text-sm font-semibold text-zinc-200 group-hover:text-white">Read Guide →</span></div></a>)}    </div>
  </section>;
}

export function LatestBlog() {
  return <section aria-labelledby="latest-blog-title" className="mt-14 border-t border-white/10 pt-10"><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#FF7182]">Learn with KikPin</p><h2 id="latest-blog-title" className="mt-2 text-2xl font-bold text-white">Latest from the Blog</h2></div><a href="/blog" className="text-sm font-semibold text-zinc-300 hover:text-white">All guides <ArrowRight className="ml-1 inline size-4"/></a></div><div className="mt-5 grid gap-3 md:grid-cols-3">{guides.map((guide) => <a key={guide.slug} href={`/blog/${guide.slug}`} className="rounded-xl border border-white/10 bg-[#141418] p-4 transition-colors hover:border-[#E60023]/40"><p className="text-[11px] font-semibold uppercase tracking-wide text-[#FF7182]">{guide.category} · {guide.readTime}</p><h3 className="mt-2 text-sm font-semibold leading-snug text-white">{guide.title}</h3><p className="mt-2 text-xs text-zinc-500">{guide.date} <span className="text-zinc-400">· Read guide →</span></p></a>)}</div></section>;
}

export function BlogArticle({ slug }: { slug: string }) {
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) return null;
  const structuredData = { '@context': 'https://schema.org', '@type': 'Article', headline: guide.title, description: guide.excerpt, datePublished: '2026-11-26', dateModified: '2026-11-26', author: { '@type': 'Organization', name: 'KikPin', url: 'https://kikpin.me' }, publisher: { '@type': 'Organization', name: 'KikPin', url: 'https://kikpin.me' }, mainEntityOfPage: `https://kikpin.me/blog/${guide.slug}` };
  return <><article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16"><nav aria-label="Breadcrumb" className="text-xs text-zinc-500"><a href="/blog" className="hover:text-white">Blog</a><span className="mx-2">/</span><span>{guide.category}</span></nav><header className="mt-8"><div className="flex flex-wrap items-center gap-3 text-xs"><span className="rounded-full border border-[#E60023]/30 bg-[#E60023]/10 px-3 py-1 font-semibold text-[#FF7182]">{guide.category}</span><span className="text-zinc-500">{guide.readTime}</span><span className="text-zinc-500">Nov 26, 2026</span></div></header>
    <div className="mt-10 space-y-10"><section className="rounded-2xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur sm:p-8"><div className="flex items-center gap-2 text-sm font-bold text-white"><Check className="size-4 text-[#00B67A]"/>TL;DR / Key Takeaways</div><ul className="mt-4 grid gap-3 text-sm leading-relaxed text-zinc-300">{guide.points.map((point) => <li key={point} className="flex gap-3"><Check className="mt-0.5 size-4 shrink-0 text-[#00B67A]"/>{point}</li>)}</ul></section>
    <section><h2 className="text-2xl font-bold text-white">Step-by-step: download on any device</h2><p className="mt-2 text-sm leading-relaxed text-zinc-400">Start with a public Pinterest Pin URL. The flow is the same across devices; use the native share or copy-link option where available.</p><div className="mt-5 grid gap-3 md:grid-cols-3">{[['01','Android','Open the Pin in Pinterest or your browser, tap Share, then Copy link. Open KikPin in Chrome and paste the URL.'],['02','iOS','In Pinterest, tap Share and Copy link. Open KikPin in Safari, paste the link, and choose the available media to save.'],['03','Desktop','Copy the Pin URL from the address bar or Share menu, paste it into KikPin, then select the source file to download.']].map(([number,device,text])=><div key={device} className="rounded-2xl border border-white/10 bg-[#141418] p-5"><span className="font-mono text-xs text-[#FF7182]">STEP {number}</span><h3 className="mt-3 text-lg font-bold text-white">{device}</h3><p className="mt-2 text-sm leading-relaxed text-zinc-400">{text}</p></div>)}</div></section>
    <aside className="rounded-xl border-l-2 border-[#E60023] bg-[#E60023]/[0.07] p-5"><p className="text-xs font-bold uppercase tracking-[0.12em] text-[#FF7182]">Pro tip</p><p className="mt-2 text-sm leading-relaxed text-zinc-300">{guide.tip}</p></aside>
    <section><h2 className="text-xl font-bold text-white">Quick reference: formats and quality</h2><div className="mt-4 overflow-x-auto rounded-xl border border-white/10"><table className="w-full min-w-[520px] text-left text-sm"><thead className="bg-white/[0.04] text-xs uppercase tracking-wide text-zinc-400"><tr><th className="px-4 py-3">Source</th><th className="px-4 py-3">Common output</th><th className="px-4 py-3">Quality note</th></tr></thead><tbody className="divide-y divide-white/10 text-zinc-300"><tr><th className="px-4 py-3 font-medium text-white">Video / Idea Pin</th><td className="px-4 py-3">MP4</td><td className="px-4 py-3">Source audio retained when available</td></tr><tr><th className="px-4 py-3 font-medium text-white">Animated Pin</th><td className="px-4 py-3">GIF or MP4</td><td className="px-4 py-3">Depends on the media Pinterest exposes</td></tr><tr><th className="px-4 py-3 font-medium text-white">Image / carousel</th><td className="px-4 py-3">JPG, PNG, or WebP</td><td className="px-4 py-3">Original available dimensions</td></tr></tbody></table></div><p className="mt-3 text-xs text-zinc-500">KikPin does not upscale media. Actual formats and resolution vary by Pin.</p></section>
    <section className="flex flex-col gap-4 rounded-2xl border border-[#E60023]/25 bg-gradient-to-r from-[#231116] to-[#151518] p-6 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-semibold uppercase tracking-wide text-[#FF7182]">Ready when you are</p><h2 className="mt-2 text-xl font-bold text-white">Try the free Pinterest downloader</h2><p className="mt-1 text-sm text-zinc-400">No login, pop-ups, or added watermark.</p></div><a href="/#downloader" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#E60023] px-5 text-sm font-bold text-white hover:bg-[#c9001f]">Open KikPin <ArrowRight className="size-4"/></a></section>
    <section className="border-t border-white/10 pt-6"><div className="flex items-center gap-2 text-sm font-semibold text-white"><ShieldCheck className="size-4 text-[#FF7182]"/>Use media responsibly</div><p className="mt-2 text-sm leading-relaxed text-zinc-400">Only save content you own or have permission to use, and respect the creator&apos;s rights and Pinterest&apos;s terms.</p><a href="/blog" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 hover:text-white">More guides <ArrowRight className="size-4"/></a></section></div></article><script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}/></>;
}
