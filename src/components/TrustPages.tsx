import { Check, ShieldCheck, Zap } from 'lucide-react';
import { InfoPageShell } from './InfoPageShell';

const comparisons = [
  ['Pop-up ads', 'No pop-ups or fake download buttons', 'Interruptions may vary'],
  ['Browser extension permissions', 'Manifest V3 · activeTab-only for Edge add-on', 'Permissions vary by extension'],
  ['Idea Pin audio', 'Source audio retained when Pinterest provides it', 'Audio availability varies'],
  ['Source quality', 'Original available quality: 1080p, 2K, or 4K when supplied', 'Quality handling varies'],
  ['Account or login', 'No account or login required', 'Sign-up requirements vary'],
  ['Added watermark', 'No watermark added to source media', 'Policies vary'],
];

export function ComparePage() {
  return <InfoPageShell eyebrow="Compare" title="A cleaner way to save public Pinterest media" description="See how KikPin approaches the everyday download workflow, privacy, and source quality compared with typical ad-heavy downloaders."><div className="max-w-none"><div className="overflow-x-auto rounded-2xl border border-white/10"><table className="w-full min-w-[650px] text-left text-sm"><caption className="sr-only">Comparison of KikPin and typical ad-heavy downloaders</caption><thead className="bg-white/[0.04] text-xs uppercase tracking-wide text-zinc-400"><tr><th className="px-5 py-4">What matters</th><th className="px-5 py-4 text-white">KikPin</th><th className="px-5 py-4">Typical ad-heavy downloaders</th></tr></thead><tbody className="divide-y divide-white/10">{comparisons.map(([item, ours, others]) => <tr key={item}><th scope="row" className="px-5 py-4 font-semibold text-white">{item}</th><td className="px-5 py-4 text-zinc-300"><Check className="mr-2 inline size-4 text-[#00B67A]"/>{ours}</td><td className="px-5 py-4 text-zinc-500">{others}</td></tr>)}</tbody></table></div><p className="mt-3 text-xs text-zinc-500">Other services differ; review their individual permissions, features, and privacy policies.</p><div className="mt-8 rounded-2xl border border-[#E60023]/20 bg-[#E60023]/[0.06] p-6"><h2 className="text-lg font-bold text-white">Try a focused workflow</h2><p className="mt-2 text-sm text-zinc-400">Paste a public Pin URL and review the media Pinterest makes available.</p><a href="/#downloader" className="mt-4 inline-flex min-h-10 items-center rounded-lg bg-[#E60023] px-4 text-sm font-semibold text-white hover:bg-[#c9001f]">Open KikPin</a></div></div></InfoPageShell>;
}

export function WhyPage() {
  const points = [
    ['Privacy-first by design', 'The Edge extension uses Manifest V3 and activeTab-only access. No browsing history, account, or download library is collected.'],
    ['Fast, focused extraction', 'A simple paste-and-save flow resolves supported Pinterest links without ad redirects, fake buttons, or unnecessary steps.'],
    ['Creator-focused source files', 'Save the original media Pinterest exposes, including Idea Pin audio when present. KikPin does not add a watermark or claim ownership of creators’ work.'],
  ];
  return <InfoPageShell eyebrow="Why KikPin" title="A small tool with clear priorities" description="KikPin is built around three things: respect for your privacy, a direct path to source media, and a workflow that stays out of the way."><ul className="grid gap-4">{points.map(([title, text], index) => <li key={title} className="flex gap-4 rounded-2xl border border-white/10 bg-[#141418] p-5"><span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#E60023]/10 text-[#FF7182]">{index === 0 ? <ShieldCheck className="size-5"/> : index === 1 ? <Zap className="size-5"/> : <Check className="size-5"/>}</span><div><h2 className="font-bold text-white">{title}</h2><p className="mt-2 text-sm leading-relaxed text-zinc-400">{text}</p></div></li>)}</ul><p className="text-xs leading-relaxed text-zinc-500">Pinterest controls the formats and resolutions available for each Pin. Save only media you own or have permission to use.</p></InfoPageShell>;
}

export function PricingPage() {
  return <InfoPageShell eyebrow="Pricing · always simple" title="Core downloads are 100% free forever" description="No account, trial, subscription, or hidden paywall. KikPin’s core Pinterest downloads remain free to use."><section className="rounded-2xl border border-[#E60023]/25 bg-gradient-to-br from-[#211216] to-[#141418] p-6"><p className="text-xs font-semibold uppercase tracking-wide text-[#FF7182]">Core downloader</p><div className="mt-2 flex items-baseline gap-2"><span className="text-4xl font-extrabold text-white">$0</span><span className="text-sm text-zinc-400">forever</span></div><p className="mt-3 text-sm leading-relaxed text-zinc-300">Video, Idea Pin, GIF, carousel, and image downloads. No account, login, or file storage required.</p></section><section><h2 className="text-lg font-bold text-white">How KikPin stays sustainable</h2><p className="mt-2 text-sm leading-relaxed text-zinc-400">KikPin is independently maintained using lean serverless hosting and indie maintenance. Keeping the product focused helps keep operating costs modest. If the product adds optional creator workflow tools or sponsorships in the future, core downloads will remain free.</p></section></InfoPageShell>;
}

const terms = [
  ['Use responsibly', 'Use KikPin only for public content you own or are authorized to save. You are responsible for respecting copyright, creator rights, and Pinterest’s terms.'],
  ['Service availability', 'KikPin is provided as-is. Source links, media formats, and availability are controlled by Pinterest and may change without notice.'],
  ['No account or file storage', 'No account, login, or file storage is required. Media is processed to fulfill the requested download and is not retained as a user library.'],
  ['Independent service', 'KikPin is independent and not affiliated with, endorsed by, or sponsored by Pinterest.'],
];

export function LegalPage({ kind }: { kind: 'terms' | 'privacy' }) {
  const isTerms = kind === 'terms';
  const title = isTerms ? 'Terms of use' : 'Privacy policy';
  const privacy = [
    ['No account or login', 'You can use the downloader without creating an account or providing login credentials.'],
    ['Link processing', 'When you submit a Pin URL, KikPin processes that URL to identify the media Pinterest makes available and return a download. Do not submit private or sensitive links.'],
    ['No file library', 'KikPin does not provide user file storage or a saved download library. Recent history, if enabled in your browser, stays in your local browser storage.'],
    ['Extension permissions', 'The Microsoft Edge extension is built on Manifest V3 and uses activeTab access to act on the tab you choose. It does not collect browsing history or analytics.'],
    ['Contact', 'Questions about privacy? Email support@kikpin.me.'],
  ];
  const sections = isTerms ? terms : privacy;
  return <InfoPageShell eyebrow="KikPin policies · Updated Nov 26, 2026" title={title} description={isTerms ? 'Please use KikPin lawfully and respect the creators and platforms that publish the media.' : 'A plain-language overview of how KikPin handles the information needed to provide downloads.'}><div className="max-w-none space-y-6">{sections.map(([heading, text]) => <section key={heading}><h2 className="text-lg font-bold text-white">{heading}</h2><p className="mt-2 text-sm leading-relaxed text-zinc-400">{text}</p></section>)}<p className="border-t border-white/10 pt-5 text-xs leading-relaxed text-zinc-500">Last updated: November 26, 2026. This summary is informational and is not legal advice.</p></div></InfoPageShell>;
}

const termsGlossary = [
  ['Idea Pins', 'Pinterest’s multi-scene video format, which may include music or original audio. Available downloads depend on the Pin source.'],
  ['HLS-to-MP4', 'HLS is a streaming format delivered in small media segments. A downloader may combine an accessible stream into an MP4 file when the source and service allow it.'],
  ['pin.it short links', 'Pinterest share links that redirect to a full Pin URL. KikPin can resolve supported short links before extracting media.'],
  ['Manifest V3', 'The current Chrome and Microsoft Edge extension platform, with a service-worker model and updated permission controls.'],
  ['Watermark-free source extraction', 'Saving the original media file without overlaying a new KikPin watermark. It does not remove watermarks already present in a source.'],
];

export function GlossaryPage() {
  return <InfoPageShell eyebrow="Glossary hub" title="Pinterest media terms, explained" description="Short, useful definitions for the formats and tools you may encounter while saving Pinterest media."><dl className="max-w-none divide-y divide-white/10 rounded-2xl border border-white/10 bg-[#141418] px-5">{termsGlossary.map(([term, description]) => <div key={term} className="py-5"><dt className="font-bold text-white">{term}</dt><dd className="mt-2 text-sm leading-relaxed text-zinc-400">{description}</dd></div>)}</dl><a href="/blog" className="inline-flex min-h-10 items-center rounded-lg border border-white/10 px-4 text-sm font-semibold text-zinc-200 hover:bg-white/5">Browse download guides</a></InfoPageShell>;
}
