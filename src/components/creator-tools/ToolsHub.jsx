import { ArrowRight, ArrowUpRight, Image, Palette, Type, TextCursorInput } from 'lucide-react';
import { ToolPageFrame } from './ToolPageFrame';

const tools = [
  { title: 'Pinterest Font Generator', description: 'Turn a name, bio, or board title into copy-ready Unicode text styles.', href: '/tools/pinterest-font-generator', icon: Type, label: '15+ text styles' },
  { title: 'Pinterest Image Resizer', description: 'Resize and crop a photo to a Pinterest Pin, square, long Pin, or Story size.', href: '/tools/pinterest-image-resizer', icon: Image, label: 'Four Pin presets' },
  { title: 'Pinterest Color Palette Generator', description: 'Find five prominent colors in a Pin or photo and copy their color codes.', href: '/tools/pinterest-color-palette-generator', icon: Palette, label: 'HEX + RGB' },
  { title: 'Pinterest Character Counter', description: 'Draft titles, descriptions, bios, and board names within Pinterest limits.', href: '/tools/pinterest-character-counter', icon: TextCursorInput, label: 'Four field limits' },
];

const faqs = [
  ['Are these Pinterest creator tools free?', 'Yes. Each tool runs in your browser at no cost. There is no account, subscription, or paid API.'],
  ['Do my text and images get uploaded?', 'No. The tools process text and image files locally in your browser. They are not sent to KikPin.'],
  ['Can I also download a Pinterest video?', 'Yes. Use the main Pinterest Video Downloader. It is a separate tool linked below.'],
];

export function ToolsHub() {
  return (
    <ToolPageFrame
      eyebrow="Free creator toolkit"
      title="Free Pinterest Creator Tools"
      description="A small set of practical tools for Pinterest creators. Format text, resize a Pin image, find a color palette, or check your character count—all free and processed in your browser."
      howTo="Choose a tool below, add text or an image if it asks for one, then copy or download the result. Images and text stay in your browser; nothing needs an account or a paid API."
      faqs={faqs}
    >
      <section aria-label="Pinterest creator tools" className="grid gap-4 sm:grid-cols-2">
        {tools.map(({ title, description, href, icon: Icon, label }) => (
          <a key={href} href={href} className="group rounded-2xl border border-white/[0.08] bg-[#141418] p-5 transition-colors hover:border-white/20 hover:bg-[#18181D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E60023] sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <span className="flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[#FF7182]"><Icon aria-hidden="true" className="size-5" /></span>
              <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] font-medium text-zinc-500">{label}</span>
            </div>
            <h2 className="mt-5 text-lg font-bold text-white">{title}</h2>
            <p className="mt-2 min-h-12 text-sm leading-relaxed text-zinc-400">{description}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-zinc-200 transition-colors group-hover:text-white">Open tool <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" /></span>
          </a>
        ))}
      </section>
      <a href="/pinterest-video-downloader" className="flex items-center justify-between gap-4 rounded-2xl border border-[#E60023]/30 bg-[#E60023]/[0.06] p-5 transition-colors hover:border-[#E60023]/60 hover:bg-[#E60023]/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E60023] sm:p-6">
        <span><span className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#FF7182]">KikPin downloader</span><span className="mt-2 block text-base font-bold text-white">Pinterest Video Downloader</span><span className="mt-1 block text-sm text-zinc-400">Save public Pin videos in the source quality available.</span></span>
        <ArrowUpRight aria-hidden="true" className="size-5 shrink-0 text-zinc-300" />
      </a>
    </ToolPageFrame>
  );
}
