import type { HistoryItem, PinMediaResult } from '../types/pinterest';

const HISTORY_STORAGE_KEY = 'pinvault_extraction_history_v1';
const MAX_HISTORY_ITEMS = 8;

export interface UrlValidationResult {
  valid: boolean;
  normalized?: string;
  error?: string;
}

/**
 * Validates and normalizes a user-pasted Pinterest or pin.it URL on the client
 * before hitting /api/extract.
 */
export function validatePinUrlInput(rawInput: string): UrlValidationResult {
  const trimmed = (rawInput || '').trim();
  if (!trimmed) {
    return { valid: false, error: 'Paste a Pinterest or pin.it link to extract media.' };
  }

  const embeddedMatch = trimmed.match(/https?:\/\/[^\s"'<>]+/i);
  const candidate = embeddedMatch
    ? embeddedMatch[0]
    : /^https?:\/\//i.test(trimmed)
      ? trimmed
      : `https://${trimmed}`;

  let parsed: URL;
  try {
    parsed = new URL(candidate);
  } catch {
    return { valid: false, error: 'Please enter a valid Pinterest URL (e.g. https://pin.it/... or pinterest.com/pin/...).' };
  }

  const host = parsed.hostname.toLowerCase();
  const isPinterest =
    host === 'pin.it' ||
    host.endsWith('.pin.it') ||
    /(^|\.)pinterest\.[a-z]{2,}(\.[a-z]{2,})?$/i.test(host);

  if (!isPinterest) {
    return {
      valid: false,
      error: 'Only Pinterest links (pinterest.com or pin.it) are supported.',
    };
  }

  return { valid: true, normalized: parsed.toString() };
}

export function buildDownloadProxyUrl(mediaUrl: string, type: 'video' | 'image'): string {
  const params = new URLSearchParams({
    url: mediaUrl,
    type,
  });
  return `/api/download?${params.toString()}`;
}

export function formatShortHost(sourceUrl: string): string {
  try {
    return new URL(sourceUrl).hostname.replace(/^www\./, '');
  } catch {
    return 'pinterest.com';
  }
}

export function mergeHistoryItem(
  existing: HistoryItem[],
  item: PinMediaResult,
  now: number = Date.now(),
): HistoryItem[] {
  const nextEntry: HistoryItem = {
    ...item,
    id: `${item.sourceUrl}::${item.mediaUrl}`,
    extractedAt: now,
  };
  const filtered = existing.filter(
    (entry) => entry.sourceUrl !== item.sourceUrl && entry.mediaUrl !== item.mediaUrl,
  );
  return [nextEntry, ...filtered].slice(0, MAX_HISTORY_ITEMS);
}

export function loadHistory(): HistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveHistory(items: HistoryItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Ignore storage quota errors
  }
}

export function clearStoredHistory(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(HISTORY_STORAGE_KEY);
  } catch {
    // Ignore storage errors
  }
}
