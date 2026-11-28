import { ArrowLeft } from 'lucide-react';
import { InfoPageShell } from '../InfoPageShell';

export function ToolPageFrame({ eyebrow, title, description, howTo, faqs, children }) {
  return (
    <InfoPageShell eyebrow={eyebrow} title={title} description={description}>
      <a href="/tools" className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E60023]">
        <ArrowLeft aria-hidden="true" className="size-4" /> All creator tools
      </a>
      {children}
      <section aria-labelledby="how-to-use" className="rounded-2xl border border-white/10 bg-[#141418] p-5 sm:p-7">
        <h2 id="how-to-use" className="text-xl font-bold text-white">How to Use</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400">{howTo}</p>
      </section>
      <section aria-labelledby="tool-faqs">
        <h2 id="tool-faqs" className="text-xl font-bold text-white">Frequently Asked Questions</h2>
        <div className="mt-4 divide-y divide-white/10 border-y border-white/10">
          {faqs.map(([question, answer]) => (
            <details key={question} className="group py-4">
              <summary className="cursor-pointer list-none pr-8 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E60023]">{question}<span aria-hidden="true" className="float-right text-zinc-500 transition-transform group-open:rotate-45">+</span></summary>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400">{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </InfoPageShell>
  );
}
