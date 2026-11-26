const toolLinks = [
  { href: '/pinterest-video-downloader', label: 'Pinterest Video Downloader' },
  { href: '/pinterest-image-downloader', label: 'Pinterest Image Downloader' },
  { href: '/pinterest-gif-downloader', label: 'Pinterest GIF Downloader' },
  { href: '/idea-pin-downloader', label: 'Idea Pin Downloader' },
  { href: '/extension', label: 'Browser Extension' },
];

export function ToolLinks() {
  return (
    <nav
      aria-label="KikPin tools"
      className="mt-16 border-t border-white/10 pt-8"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-white">Explore KikPin tools</h2>
          <p className="mt-1 text-xs text-zinc-500">Choose another Pinterest downloader.</p>
        </div>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {toolLinks.map((tool) => (
            <li key={tool.href}>
              <a
                href={tool.href}
                className="text-zinc-400 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E60023]"
              >
                {tool.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-white/10 py-8">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1fr_auto_1.4fr]">
        <div className="space-y-2 text-xs leading-relaxed text-zinc-500">
          <p className="font-medium text-zinc-300">KikPin — Free Pinterest video, image, and GIF downloader.</p>
          <p>KikPin is independent and not affiliated with Pinterest. Download only content you own or have permission to save.</p>
        </div>
        <nav aria-label="Footer tools">
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-300">Tools</h2>
          <ul className="mt-3 grid gap-2 text-xs text-zinc-500">
            {toolLinks.map((tool) => (
              <li key={tool.href}>
                <a
                  href={tool.href}
                  className="transition-colors hover:text-white hover:underline hover:underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E60023]"
                >
                  {tool.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-xs leading-relaxed text-zinc-500 sm:col-span-2 lg:col-span-1 lg:text-right">
          Save public Pins in the source quality Pinterest provides. No watermark or login credentials required.
        </p>
      </div>
      <div className="mx-auto mt-8 flex max-w-6xl justify-center px-4 sm:justify-start sm:px-6">
        <a href="https://launchbuff.com/products/kikpin-7vt64k" target="_blank" rel="noopener noreferrer" title="Featured on LaunchBuff">
          <img src="https://launchbuff.com/badge-featured-dark.svg" alt="Featured on LaunchBuff" width="256" height="80" />
        </a>
      </div>
    </footer>
  );
}
