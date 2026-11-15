import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildDownloadProxyUrl,
  formatShortHost,
  mergeHistoryItem,
  validatePinUrlInput,
} from './pinterestClient';
import type { HistoryItem, PinMediaResult } from '../types/pinterest';

test('validatePinUrlInput validates pinterest.com, regional domains, pin.it, and share text', () => {
  assert.deepEqual(validatePinUrlInput('pin.it/abc123'), {
    valid: true,
    normalized: 'https://pin.it/abc123',
  });

  const shareText = validatePinUrlInput('Look at this: https://www.pinterest.com/pin/123456/sent/?invite_code=xyz');
  assert.equal(shareText.valid, true);
  assert.equal(shareText.normalized, 'https://www.pinterest.com/pin/123456/sent/?invite_code=xyz');

  assert.equal(validatePinUrlInput('https://fr.pinterest.com/pin/555/').valid, true);
  assert.equal(validatePinUrlInput('').valid, false);
  assert.equal(validatePinUrlInput('https://youtube.com/watch?v=123').valid, false);
});

test('buildDownloadProxyUrl encodes mediaUrl and type parameter cleanly', () => {
  const proxy = buildDownloadProxyUrl('https://v1.pinimg.com/videos/mc/720p/test.mp4?foo=1', 'video');
  assert.equal(
    proxy,
    '/api/download?url=https%3A%2F%2Fv1.pinimg.com%2Fvideos%2Fmc%2F720p%2Ftest.mp4%3Ffoo%3D1&type=video',
  );
});

test('formatShortHost extracts clean hostname without www', () => {
  assert.equal(formatShortHost('https://www.pinterest.com/pin/123/'), 'pinterest.com');
  assert.equal(formatShortHost('https://pin.it/xyz'), 'pin.it');
});

test('mergeHistoryItem deduplicates by sourceUrl/mediaUrl and caps at 8 items', () => {
  const base: PinMediaResult = {
    type: 'video',
    pinType: 'Video Pin',
    title: 'Sample Pin',
    author: 'Creator',
    mediaUrl: 'https://v1.pinimg.com/videos/mc/720p/1.mp4',
    thumbnailUrl: 'https://i.pinimg.com/originals/1.jpg',
    resolution: '720p HD',
    sourceUrl: 'https://www.pinterest.com/pin/1/',
    layer: 'json-ld',
    slides: [],
  };

  let list: HistoryItem[] = [];
  for (let i = 1; i <= 10; i++) {
    list = mergeHistoryItem(
      list,
      {
        ...base,
        mediaUrl: `https://v1.pinimg.com/videos/mc/720p/${i}.mp4`,
        sourceUrl: `https://www.pinterest.com/pin/${i}/`,
      },
      1000 + i,
    );
  }

  assert.equal(list.length, 8);
  assert.equal(list[0].sourceUrl, 'https://www.pinterest.com/pin/10/');

  // Re-inserting existing item moves it to front without increasing count
  list = mergeHistoryItem(
    list,
    {
      ...base,
      mediaUrl: 'https://v1.pinimg.com/videos/mc/720p/5.mp4',
      sourceUrl: 'https://www.pinterest.com/pin/5/',
    },
    2000,
  );
  assert.equal(list.length, 8);
  assert.equal(list[0].sourceUrl, 'https://www.pinterest.com/pin/5/');
});
