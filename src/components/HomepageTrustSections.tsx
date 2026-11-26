import { ExternalLink, ShieldCheck } from 'lucide-react';

const edgeListingUrl =
  'https://microsoftedge.microsoft.com/addons/detail/kikpin-pinterest-video-/kpgnbgodaeeapgnahngpaoijkonoboae';
const saasHubListingUrl = 'https://www.saashub.com/kikpin-alternatives';

const comparisonRows = [
  ['Privacy / permissions', 'activeTab-only extension; no tracking', 'Permissions and data practices vary'],
  ['Pop-up ads', 'No ad pop-ups or redirects', 'Can interrupt the download flow'],
  ['Idea Pin audio', 'Preserved when the source includes audio', 'Availability varies by tool'],
  ['Watermarks', 'No watermark added', 'Policies vary by service'],
  ['Account required', 'No account or login', 'Some services may ask you to sign up'],
];

export function WhyKikPinSection() {
  const advantages = [
    {
      title: 'Privacy-first browser extension',
      description:
        'The official Microsoft Edge add-on is Manifest V3, requests only activeTab permission, and collects no browsing history or analytics.',
      href: edgeListingUrl,
      linkLabel: 'View the Edge listing',
    },
    {
      title: 'Clean, uncluttered downloads',
      description:
        'No ad pop-ups, fake download buttons, or login walls between a public Pin and its available media.',
    },
    {
      title: 'Format fidelity, from the source',
      description:
        'Resolve pin.it short links, keep Idea Pin audio when Pinterest provides it, and download the original source quality up to 1080p, 2K, or 4K when available.',
    },
  ];

  return (
    <section aria-labelledby="why-kikpin-heading" className="mt-12 border-t border-white/10 pt-10">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#FF7182]">Made for a cleaner workflow</p>
        <h2 id="why-kikpin-heading" className="mt-2 text-2xl font-bold tracking-tight text-white">Why KikPin?</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">A focused downloader built around clear permissions, real source files, and fewer interruptions.</p>
      </div>

      <ul className="mt-6 grid gap-3 md:grid-cols-3">
        {advantages.map((advantage) => (
          <li key={advantage.title} className="rounded-2xl border border-white/10 bg-[#141418] p-5">
            <h3 className="text-sm font-semibold text-white">{advantage.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">{advantage.description}</p>
            {advantage.href && (
              <a href={advantage.href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-200 underline-offset-4 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E60023]">
                {advantage.linkLabel} <ExternalLink className="size-3" aria-hidden="true" />
              </a>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[620px] border-collapse text-left text-sm">
          <caption className="sr-only">KikPin compared with typical ad-heavy downloaders</caption>
          <thead className="bg-[#141418] text-xs uppercase tracking-wide text-zinc-400">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">What matters</th>
              <th scope="col" className="px-4 py-3 font-semibold text-white">KikPin</th>
              <th scope="col" className="px-4 py-3 font-semibold">Typical Ad-Heavy Downloaders</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/8 bg-[#101013]">
            {comparisonRows.map(([feature, kikpin, typical]) => (
              <tr key={feature}>
                <th scope="row" className="px-4 py-3 font-medium text-zinc-200">{feature}</th>
                <td className="px-4 py-3 text-zinc-300">{kikpin}</td>
                <td className="px-4 py-3 text-zinc-500">{typical}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-zinc-500">Other services differ; review their individual permissions and policies.</p>
    </section>
  );
}

export function TrustSignalsSection() {
  const signals = [
    {
      title: 'Live on Microsoft Edge Add-ons',
      detail: 'Manifest V3 verified · activeTab-only permission',
      href: edgeListingUrl,
    },
    {
      title: 'Verified listing on SaaSHub',
      detail: 'Independent product directory',
      href: saasHubListingUrl,
    },
    {
      title: 'No account · no stored downloads',
      detail: 'Recent history stays in your browser',
    },
    {
      title: 'HTTPS · direct source extraction',
      detail: 'Source files delivered through a validated proxy',
    },
  ];

  return (
    <section aria-labelledby="verified-trusted-heading" className="mt-10">
      <div className="flex items-center gap-2">
        <ShieldCheck className="size-4 text-[#FF7182]" aria-hidden="true" />
        <h2 id="verified-trusted-heading" className="text-sm font-semibold text-white">Verified &amp; Trusted</h2>
      </div>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {signals.map((signal) => (
          <li key={signal.title} className="rounded-xl border border-white/10 bg-[#141418] p-4">
            {signal.href ? (
              <a href={signal.href} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-zinc-100 underline-offset-4 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E60023]">{signal.title}</a>
            ) : (
              <h3 className="text-sm font-semibold text-zinc-100">{signal.title}</h3>
            )}
            <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">{signal.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function SustainabilitySection() {
  return (
    <section aria-labelledby="free-sustainable-heading" className="mt-10 rounded-2xl border border-[#E60023]/20 bg-gradient-to-br from-[#1a1014] to-[#141418] p-5 sm:p-7">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#FF7182]">Free, by design</p>
          <h2 id="free-sustainable-heading" className="mt-2 text-xl font-bold text-white sm:text-2xl">100% Free forever for core downloads</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-300">Pinterest video, Idea Pin, GIF, carousel, and image downloads stay free—with no hidden paywalls or added watermarks.</p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">KikPin is independently maintained on lean, low-cost serverless Next.js infrastructure. Optional future creator workflow tools or clearly labeled, non-intrusive sponsorship may support ongoing development without gating core downloads.</p>
        </div>
        <a href="/pricing" className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E60023]">See pricing details</a>
      </div>
    </section>
  );
}
