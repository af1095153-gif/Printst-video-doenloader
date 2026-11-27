'use client';

import { ChevronDown, Globe2 } from 'lucide-react';
import { languages } from '../../lib/i18n.js';

export function LanguageSelector({ locale }) {
  function changeLanguage(event) {
    const code = event.target.value;
    window.location.href = code === 'en' ? '/' : `/${code}`;
  }

  return (
    <label className="flex min-h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-sm text-zinc-200 focus-within:ring-2 focus-within:ring-[#E60023]">
      <Globe2 aria-hidden="true" className="size-4 text-[#FF7182]" />
      <span className="sr-only">Choose language</span>
      <select aria-label="Choose language" value={locale} onChange={changeLanguage} className="max-w-[112px] cursor-pointer bg-transparent text-sm text-white outline-none">
        {languages.map((language) => <option key={language.code} value={language.code} className="bg-[#141418]">{language.native}</option>)}
      </select>
      <ChevronDown aria-hidden="true" className="size-3.5 text-zinc-500" />
    </label>
  );
}
