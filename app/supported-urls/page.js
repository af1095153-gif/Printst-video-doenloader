import { InfoPageShell } from '../../src/components/InfoPageShell';

const links = [
  ['Pinterest Pin URLs', 'pinterest.com/pin/...', 'Paste the address of an individual public Pin.'],
  ['Short share links', 'pin.it/...', 'KikPin follows a public Pinterest short link to its Pin.'],
  ['Regional Pinterest hosts', 'in.pinterest.com/pin/... · uk.pinterest.com/pin/...', 'Supported regional Pinterest domains use the same Pin URL structure.'],
];
const formats = [
  ['Video Pins', 'Available source video, usually MP4.'],
  ['Idea Pins', 'Individual public clips or image slides; source audio stays with video when Pinterest includes it.'],
  ['Story Pins', 'Public story media that Pinterest still makes available.'],
  ['Carousels', 'Images and clips Pinterest exposes as separate slides.'],
  ['GIFs', 'Animated source media in the format Pinterest provides.'],
  ['HD images', 'Original image dimensions available from the Pin.'],
];

export const metadata = {
  title: 'Supported Pinterest URLs and media formats | KikPin',
  description: 'Reference for Pinterest URLs and public media formats supported by KikPin, including pin.it, regional links, videos, carousels, and images.',
  alternates: { canonical: 'https://kikpin.me/supported-urls' },
};

export default function SupportedUrlsPage() {
  return (
    <InfoPageShell eyebrow="Reference" title="Supported Pinterest URLs and formats" description="Use a direct public Pin link. KikPin resolves supported short URLs, then displays only the public source media Pinterest makes available.">
      <section><h2 className="text-xl font-bold text-white">URL formats</h2><ul className="mt-4 grid gap-3">{links.map(([title, pattern, description]) => <li key={title} className="rounded-2xl border border-white/10 bg-[#141418] p-5"><h3 className="font-semibold text-white">{title}</h3><code className="mt-2 block break-all font-mono text-sm text-[#FF7182]">{pattern}</code><p className="mt-2 text-sm text-zinc-400">{description}</p></li>)}</ul></section>
      <section><h2 className="text-xl font-bold text-white">Supported public media</h2><div className="mt-4 overflow-x-auto rounded-2xl border border-white/10"><table className="w-full min-w-[520px] text-left text-sm"><thead className="bg-white/[0.04] text-xs uppercase tracking-wide text-zinc-400"><tr><th className="px-4 py-3">Format</th><th className="px-4 py-3">What you can save</th></tr></thead><tbody className="divide-y divide-white/10">{formats.map(([title, description]) => <tr key={title}><th scope="row" className="px-4 py-3 font-medium text-white">{title}</th><td className="px-4 py-3 text-zinc-400">{description}</td></tr>)}</tbody></table></div><p className="mt-4 rounded-xl border border-[#E60023]/30 bg-[#E60023]/[0.08] p-4 text-sm leading-relaxed text-zinc-300"><strong className="text-white">Not supported:</strong> Private, deleted, expired, or otherwise restricted Pins cannot be downloaded. KikPin cannot access content unavailable to the public.</p><a href="/#downloader" className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-[#E60023] px-5 text-sm font-bold text-white hover:bg-[#c9001f]">Open downloader</a></section>
    </InfoPageShell>
  );
}
