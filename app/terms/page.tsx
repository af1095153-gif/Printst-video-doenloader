import type { Metadata } from 'next';
import { InfoPageShell } from '../../src/components/InfoPageShell';

export const metadata: Metadata = {
  title: 'KikPin Terms of Use — Responsible Pinterest Downloads',
  description: 'Terms for using KikPin to download publicly available Pinterest media you own or have permission to save.',
  alternates: { canonical: 'https://kikpin.me/terms' },
};

export default function TermsPage() {
  return (
    <InfoPageShell
      eyebrow="Terms of use"
      title="Use KikPin responsibly"
      description="By using KikPin, you agree to use it only for lawful purposes and in a way that respects the rights of creators and platform policies."
    >
      <section aria-labelledby="terms-rights-heading">
        <h2 id="terms-rights-heading" className="text-lg font-bold text-white">Your responsibility for content</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">Only download or reuse media you own or have permission to save. You are responsible for respecting copyright, licenses, privacy rights, and Pinterest&apos;s terms. KikPin does not grant rights to content hosted by Pinterest.</p>
      </section>

      <section aria-labelledby="terms-access-heading">
        <h2 id="terms-access-heading" className="text-lg font-bold text-white">Public Pins only</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">KikPin is intended for publicly available Pins. It does not bypass private content, sign-in requirements, access controls, or deleted media. Availability, formats, audio, and resolution depend on Pinterest and the source Pin.</p>
      </section>

      <section aria-labelledby="terms-service-heading">
        <h2 id="terms-service-heading" className="text-lg font-bold text-white">Service and contact</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">KikPin is provided as-is and may change as source sites or infrastructure change. KikPin is independent and is not affiliated with, endorsed by, or sponsored by Pinterest. For questions, email <a href="mailto:support@kikpin.me" className="text-zinc-200 underline underline-offset-4 hover:text-white">support@kikpin.me</a>.</p>
      </section>
    </InfoPageShell>
  );
}
