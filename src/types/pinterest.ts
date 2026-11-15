export interface PinSlide {
  type: 'video' | 'image';
  mediaUrl: string;
  thumbnailUrl: string | null;
  resolution: string;
  width?: number | null;
  height?: number | null;
}

export interface PinMediaResult {
  type: 'video' | 'image';
  pinType: 'Video Pin' | 'Idea Pin' | 'Image Pin';
  title: string;
  author: string | null;
  mediaUrl: string;
  thumbnailUrl: string | null;
  resolution: string;
  sourceUrl: string;
  layer: string;
  slides: PinSlide[];
}

export interface HistoryItem extends PinMediaResult {
  id: string;
  extractedAt: number;
}

export type ExtractionStatus = 'idle' | 'loading' | 'success' | 'error';
