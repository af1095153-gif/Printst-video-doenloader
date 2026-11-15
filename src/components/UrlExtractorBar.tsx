import type { FormEvent } from 'react';
import { ArrowRight, ClipboardPaste, Link2, Loader2, X } from 'lucide-react';
import type { ExtractionStatus } from '../types/pinterest';

export interface SamplePinOption {
  label: string;
  url: string;
}

export const SAMPLE_PIN_OPTIONS: SamplePinOption[] = [
  {
    label: 'Sample Video Pin',
    url: 'https://www.pinterest.com/pin/368450813289448972/',
  },
  {
    label: 'Sample HD Image',
    url: 'https://www.pinterest.com/pin/368450813289143069/',
  },
  {
    label: 'Sample Recipe Pin',
    url: 'https://www.pinterest.com/pin/368450813289142680/',
  },
  {
    label: 'Test Invalid Link',
    url: 'https://example.com/not-a-pinterest-pin',
  },
];

interface UrlExtractorBarProps {
  urlInput: string;
  status: ExtractionStatus;
  clipboardNotice: string | null;
  onUrlChange: (value: string) => void;
  onSubmit: (urlOverride?: string) => void;
  onPasteClick: () => void;
  onClear: () => void;
}

export function UrlExtractorBar({
  urlInput,
  status,
  clipboardNotice,
  onUrlChange,
  onSubmit,
  onPasteClick,
  onClear,
}: UrlExtractorBarProps) {
  const isLoading = status === 'loading';

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-3 sm:flex-row sm:items-center rounded-2xl border border-white/12 bg-[#141418] p-2.5 transition-colors focus-within:border-[#E60023]/70"
      >
        <div className="relative flex flex-1 items-center">
          <Link2
            className="pointer-events-none absolute left-3.5 h-4 w-4 text-zinc-500"
            aria-hidden="true"
          />
          <label htmlFor="pin-url-input" className="sr-only">
            Pinterest or pin.it URL
          </label>
          <input
            id="pin-url-input"
            type="text"
            inputMode="url"
            autoComplete="off"
            spellCheck={false}
            value={urlInput}
            onChange={(e) => onUrlChange(e.target.value)}
            placeholder="https://www.pinterest.com/pin/... or https://pin.it/..."
            className="min-h-[46px] w-full rounded-xl bg-transparent py-2.5 pl-10 pr-10 font-mono text-sm text-white placeholder:text-zinc-500 focus:outline-none"
          />
          {urlInput && (
            <button
              type="button"
              onClick={onClear}
              aria-label="Clear URL input"
              className="absolute right-1.5 flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E60023] cursor-pointer"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onPasteClick}
            disabled={isLoading}
            className="inline-flex min-h-[46px] flex-1 sm:flex-initial items-center justify-center gap-2 rounded-xl border border-white/12 bg-[#1B1B21] px-4 py-2.5 text-sm font-medium text-zinc-200 whitespace-nowrap shrink-0 transition-colors hover:bg-[#23232B] hover:text-white disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E60023] cursor-pointer"
          >
            <ClipboardPaste className="h-4 w-4" aria-hidden="true" />
            <span>Paste</span>
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex min-h-[46px] flex-[1.5] sm:flex-initial items-center justify-center gap-2 rounded-xl bg-[#E60023] px-5 py-2.5 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#CC001F] active:scale-[0.98] disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                <span>Extracting</span>
              </>
            ) : (
              <>
                <span>Extract Media</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </>
            )}
          </button>
        </div>
      </form>

      {clipboardNotice && (
        <p role="status" className="mt-2.5 text-xs text-amber-300">
          {clipboardNotice}
        </p>
      )}

      {/* Sample clickable test triggers */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="w-full sm:w-auto text-xs font-medium text-zinc-500 sm:mr-1">Try a sample:</span>
        {SAMPLE_PIN_OPTIONS.map((sample) => (
          <button
            key={sample.label}
            type="button"
            disabled={isLoading}
            onClick={() => onSubmit(sample.url)}
            className="min-h-[36px] rounded-lg border border-white/10 bg-[#141418] px-3 py-1.5 text-xs font-medium text-zinc-300 whitespace-nowrap transition-colors hover:border-white/25 hover:bg-[#1C1C22] hover:text-white disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E60023] cursor-pointer"
          >
            {sample.label}
          </button>
        ))}
      </div>
    </div>
  );
}
