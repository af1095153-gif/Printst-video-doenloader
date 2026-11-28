const proseClass = 'text-sm leading-7 text-zinc-300';
const sectionClass = 'space-y-3';

function Section({ title, children }) {
  return <section className={sectionClass}><h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">{title}</h2>{children}</section>;
}

function LegalComparisonDiagram() {
  return (
    <figure className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111114] p-5 sm:p-7">
      <figcaption className="mb-5 text-sm font-semibold text-zinc-100">Personal Use vs. Commercial Reposting</figcaption>
      <svg role="img" aria-labelledby="use-comparison-title use-comparison-desc" viewBox="0 0 760 232" className="h-auto w-full">
        <title id="use-comparison-title">Personal reference compared with commercial reposting</title>
        <desc id="use-comparison-desc">Keeping a public Pin for private offline reference is different from reposting it for commercial gain. Ask the rights holder before reuse.</desc>
        <rect x="1" y="1" width="758" height="230" rx="18" fill="#0B0B0E" stroke="rgba(255,255,255,.1)" />
        <rect x="20" y="20" width="348" height="192" rx="14" fill="#121216" stroke="rgba(255,255,255,.1)" />
        <rect x="392" y="20" width="348" height="192" rx="14" fill="#121216" stroke="rgba(255,255,255,.1)" />
        <circle cx="49" cy="54" r="6" fill="#E60023" />
        <text x="68" y="59" fill="#F4F4F6" fontFamily="Arial, sans-serif" fontSize="17" fontWeight="700">Private reference</text>
        <text x="40" y="96" fill="#A1A1AA" fontFamily="Arial, sans-serif" fontSize="14">Offline notes · mood boards · personal study</text>
        <text x="40" y="123" fill="#A1A1AA" fontFamily="Arial, sans-serif" fontSize="14">Keep the creator and source attached.</text>
        <rect x="40" y="155" width="130" height="30" rx="15" fill="#19191E" stroke="rgba(255,255,255,.12)" />
        <text x="105" y="175" textAnchor="middle" fill="#D4D4D8" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="600">Personal copy</text>
        <circle cx="421" cy="54" r="6" fill="#E60023" />
        <text x="440" y="59" fill="#F4F4F6" fontFamily="Arial, sans-serif" fontSize="17" fontWeight="700">Commercial repost</text>
        <text x="412" y="96" fill="#A1A1AA" fontFamily="Arial, sans-serif" fontSize="14">Re-uploading someone else’s work</text>
        <text x="412" y="123" fill="#A1A1AA" fontFamily="Arial, sans-serif" fontSize="14">for ads, sales, or audience growth.</text>
        <rect x="412" y="155" width="196" height="30" rx="15" fill="#19191E" stroke="rgba(230,0,35,.35)" />
        <text x="510" y="175" textAnchor="middle" fill="#F4F4F6" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="600">Get permission first</text>
      </svg>
      <p className="mt-3 text-xs leading-relaxed text-zinc-500">This is a practical distinction, not legal advice. Copyright and fair-use outcomes depend on the facts and local law.</p>
    </figure>
  );
}

function LegalSafetyContent() {
  return (
    <div className="space-y-9">
      <Section title="Does Pinterest notify the creator when you download a video?">
        <p className={proseClass}>No. Pinterest does not send a notification when someone copies a public Pin link or saves a file from it. Copying a link and saving a file are not the same as interacting with a creator’s profile or messaging them.</p>
        <p className={proseClass}>That answers the notification question; it does not grant permission to publish the video elsewhere.</p>
      </Section>
      <Section title="Personal use and reposting are not the same thing">
        <p className={proseClass}>Keeping a copy to study a recipe, collect references for a private mood board, or view something offline is different from re-uploading another person’s video to sell a product, run an ad, or grow a commercial account.</p>
        <p className={proseClass}>“Personal use” is not a magic copyright exception, and fair use is a fact-specific legal test—not a blanket permission. In the US, courts weigh the purpose, the nature of the work, how much was used, and the effect on its market; no one factor decides every case. Other countries have different rules. If you plan to publish, edit, monetize, or use someone else’s work to promote a business, ask the rights holder first. Credit is useful, but credit alone is not permission.</p>
      </Section>
      <LegalComparisonDiagram />
      <Section title="Why can’t you right-click and save a Pinterest video?"><p className={proseClass}>A normal image or direct MP4 is one file the browser can save. Many Pinterest videos are delivered as HLS: a playlist points the player to small video and audio segments that arrive over time. The browser plays that stream, but there may be no single MP4 behind the right-click menu. A downloader has to identify the available stream and assemble a playable file. Not every Pin exposes the same source or quality.</p></Section>
      <Section title="How to spot a safer downloader">
        <ul className="grid gap-3 sm:grid-cols-2">
          {[
            ['No login request', 'A public Pin link should not require your Pinterest password.'],
            ['No fake download ads', 'Skip pages that open pop-ups or disguise ads as download buttons.'],
            ['Official browser stores', 'Prefer extensions listed in the Edge Add-ons or Firefox Add-ons stores. Store review is a useful check, not a guarantee.'],
            ['No mystery installers', 'Avoid random .exe or .apk downloads, especially when the site hides who made the app.'],
          ].map(([heading, description]) => <li key={heading} className="rounded-xl border border-white/[0.08] bg-[#111114] p-4"><h3 className="text-sm font-semibold text-white">{heading}</h3><p className="mt-2 text-sm leading-relaxed text-zinc-400">{description}</p></li>)}
        </ul>
      </Section>
      <p className="border-l-2 border-[#E60023] pl-4 text-sm leading-7 text-zinc-400">KikPin does not need a Pinterest login. Use it only with public Pins, and save or share media only when you have the right to do so.</p>
    </div>
  );
}

function IdeaPinGuideContent() {
  return <div className="space-y-8"><Section title="Get the right Pin link"><p className={proseClass}>Open the public video or Idea Pin in Pinterest, choose Share, and copy its link. A pin.it link works too. Paste it into the <a className="text-white underline underline-offset-4" href="/pinterest-video-downloader">KikPin video downloader</a> and check the media Pinterest exposes.</p></Section><Section title="What happens to the audio?"><p className={proseClass}>KikPin can keep the original audio when it is included in the source video. It cannot restore music that Pinterest did not include in the file, and a multi-scene Idea Pin may be offered as several clips rather than one combined video.</p></Section><Section title="Choose the source, not a promise"><p className={proseClass}>Pick the highest source option shown in the result. If Pinterest only stored a Pin in 720p, no tool can magically turn it into true 4K—we just give you the highest original file Pinterest has. Avoid pages that promise a resolution the source never had.</p></Section><p className="border-l-2 border-[#E60023] pl-4 text-sm leading-7 text-zinc-400">Only save media you own or have permission to use. A public link makes a Pin accessible; it does not transfer the creator’s rights.</p></div>;
}

function MobileGuideContent() {
  return <div className="space-y-8"><Section title="On iPhone: Safari downloads to Files first"><p className={proseClass}>Copy the public Pin link in Pinterest, open KikPin in Safari, paste the link, and save the video. Safari puts downloads in Files → Downloads. To add a video to Photos, open the file, tap Share, then choose Save Video.</p><p className={proseClass}>If Save Video is missing, check that the file is a video and that it finished downloading. A looping animation may be an MP4, not a GIF.</p></Section><Section title="On Android: find it in Downloads"><p className={proseClass}>Copy the Pin link, open KikPin in Chrome, and download the file. Chrome saves it in Downloads. Your Gallery app may show it right away or after it scans the folder.</p><p className={proseClass}>A browser download does not need a separate Android downloader app. If the file is missing, check Chrome’s Downloads list before retrying.</p></Section><Section title="The source sets the ceiling"><p className={proseClass}>Pinterest decides which file and resolution exist for each Pin. If Pinterest only stored a Pin in 720p, no tool can magically turn it into true 4K—we just give you the highest original file Pinterest has.</p></Section><p className="border-l-2 border-[#E60023] pl-4 text-sm leading-7 text-zinc-400">Private Pins are not accessible. Save only media you own or have permission to use.</p></div>;
}

export function BlogEditorialContent({ type }) {
  if (type === 'legal-safety') return <LegalSafetyContent />;
  if (type === 'idea-pin-guide') return <IdeaPinGuideContent />;
  if (type === 'mobile-guide') return <MobileGuideContent />;
  return null;
}
