const EDGE_EXTENSION_URL =
  'https://microsoftedge.microsoft.com/addons/detail/kikpin-pinterest-video-/kpgnbgodaeeapgnahngpaoijkonoboae';
const FIREFOX_EXTENSION_URL = 'https://addons.mozilla.org/addon/kikpin-pinterest-downloader/';

const browserButtonClassName =
  'inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#141418] sm:gap-1 sm:px-1.5 sm:text-[11px]';

export function BrowserExtensionSection() {
  return (
    <section
      id="browser-extension"
      aria-labelledby="browser-extension-heading"
      className="mt-10 scroll-mt-24 rounded-2xl border border-white/10 bg-[#141418] p-5 sm:mt-12 sm:p-7"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#FF7182]">
          Get the KikPin Browser Extension
        </p>
        <h2
          id="browser-extension-heading"
          className="mt-2.5 text-2xl font-extrabold tracking-tight text-white sm:text-3xl"
        >
          Download Pinterest Videos in 1 Click
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
          Install the free KikPin extension for Edge or Firefox. No login or added watermark; video quality depends on the original Pin.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <a
          href={EDGE_EXTENSION_URL}
          aria-label="Add to Microsoft Edge"
          target="_blank"
          rel="noopener noreferrer"
          className={`${browserButtonClassName} border-[#E60023] bg-[#E60023] text-white hover:border-[#CC001F] hover:bg-[#CC001F]`}
        >
          <img src="https://thesvg.org/icons/microsoft-edge/default.svg" alt="" aria-hidden="true" width="24" height="24" loading="lazy" decoding="async" className="size-6 shrink-0 sm:size-5" />
          <span className="whitespace-nowrap">Get for Microsoft Edge</span>
        </a>
        <a
          href={FIREFOX_EXTENSION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`${browserButtonClassName} border-white/15 bg-white/[0.04] text-zinc-100 hover:border-white/30 hover:bg-white/[0.08]`}
        >
          <img src="https://thesvg.org/icons/firefox/default.svg" alt="" aria-hidden="true" width="24" height="24" loading="lazy" decoding="async" className="size-6 shrink-0 sm:size-5" />
          <span className="whitespace-nowrap">Get for Firefox</span>
        </a>
      </div>
    </section>
  );
}
