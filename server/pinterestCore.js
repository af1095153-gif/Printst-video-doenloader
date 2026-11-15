import { Readable } from 'node:stream';

export const DESKTOP_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept-Language': 'en-US,en;q=0.9',
  Accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'Cache-Control': 'no-cache',
  Pragma: 'no-cache',
};

const FETCH_TIMEOUT_MS = 15000;
const HEAD_TIMEOUT_MS = 7000;

export class PinExtractionError extends Error {
  constructor(message, statusCode = 400, code = 'EXTRACTION_ERROR', details = {}) {
    super(message);
    this.name = 'PinExtractionError';
    this.statusCode = statusCode;
    this.code = code;
    if (details && Array.isArray(details.debugFoundUrls)) {
      this.debugFoundUrls = details.debugFoundUrls;
    }
  }
}

export function extractPinId(input) {
  if (!input || typeof input !== 'string') return null;
  const match = input.match(/\/pin\/(?:[\w-]+--)?(\d+)/i);
  return match ? match[1] : null;
}

/**
 * Extracts and validates a Pinterest or pin.it URL from user input.
 */
export function normalizeInputPinUrl(rawInput) {
  if (!rawInput || typeof rawInput !== 'string') {
    throw new PinExtractionError('Please enter a Pinterest URL.', 400, 'EMPTY_URL');
  }

  let trimmed = rawInput.trim();
  const embeddedUrlMatch = trimmed.match(/https?:\/\/[^\s"'<>]+/i);
  if (embeddedUrlMatch) {
    trimmed = embeddedUrlMatch[0];
  } else if (!/^https?:\/\//i.test(trimmed)) {
    trimmed = `https://${trimmed}`;
  }

  let parsed;
  try {
    parsed = new URL(trimmed);
  } catch {
    throw new PinExtractionError('That does not look like a valid URL.', 400, 'INVALID_URL');
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    throw new PinExtractionError('Only HTTP and HTTPS URLs are supported.', 400, 'INVALID_PROTOCOL');
  }

  if (!isAllowedPinterestHost(parsed.hostname)) {
    throw new PinExtractionError(
      'URL must be from Pinterest (pinterest.com, pin.it, or a regional Pinterest domain).',
      400,
      'UNSUPPORTED_HOST',
    );
  }

  return parsed.toString();
}

export function isAllowedPinterestHost(hostname) {
  if (!hostname || typeof hostname !== 'string') return false;
  const host = hostname.toLowerCase();
  if (host === 'pin.it' || host.endsWith('.pin.it')) return true;
  if (/(^|\.)pinterest\.[a-z]{2,}(\.[a-z]{2,})?$/i.test(host)) return true;
  return false;
}

/**
 * Strips query parameters (e.g. ?invite_code=...) and hash fragments after redirect,
 * and validates the destination hostname.
 */
export function cleanPinterestUrl(rawUrl) {
  let parsed;
  try {
    parsed = new URL(rawUrl);
  } catch {
    throw new PinExtractionError('Invalid redirected Pinterest URL.', 400, 'INVALID_REDIRECT_URL');
  }

  if (!isAllowedPinterestHost(parsed.hostname)) {
    throw new PinExtractionError(
      'Redirected URL left Pinterest domain and was blocked for safety.',
      403,
      'BLOCKED_REDIRECT',
    );
  }

  parsed.search = '';
  parsed.hash = '';
  return parsed.toString();
}

/**
 * Validates that a remote media URL belongs strictly to *.pinimg.com (SSRF guard).
 */
export function isAllowedPinimgUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') return false;
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return false;
    const host = parsed.hostname.toLowerCase();
    return host.endsWith('.pinimg.com');
  } catch {
    return false;
  }
}

/**
 * Unescapes Pinterest's encoded slashes and HTML ampersands before parsing.
 */
export function unescapePinterestHtml(rawHtml) {
  if (!rawHtml || typeof rawHtml !== 'string') return '';
  return rawHtml
    .replace(/\\\\u002[fF]/g, '/')
    .replace(/\\u002[fF]/g, '/')
    .replace(/\\\\\//g, '/')
    .replace(/\\\//g, '/')
    .replace(/&amp;/g, '&');
}

function decodeHtmlEntities(value) {
  if (!value || typeof value !== 'string') return '';
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}

function cleanMediaUrlString(url) {
  if (!url || typeof url !== 'string') return '';
  return decodeHtmlEntities(url).replace(/\\u0026/g, '&').trim();
}

/**
 * Generates ordered MP4 candidate URLs from a Pinterest HLS playlist (.m3u8).
 */
export function getHlsToMp4Candidates(hlsUrl) {
  if (!hlsUrl || typeof hlsUrl !== 'string') return [];
  const cleaned = cleanMediaUrlString(hlsUrl);
  if (!/\.m3u8(\?.*)?$/i.test(cleaned)) return [];
  const withoutQuery = cleaned.split('?')[0];
  const candidates = [];

  if (withoutQuery.includes('/hls/')) {
    candidates.push(withoutQuery.replace('/hls/', '/720p/').replace(/\.m3u8$/i, '.mp4'));
    candidates.push(withoutQuery.replace('/hls/', '/expMp4/').replace(/\.m3u8$/i, '.mp4'));
    candidates.push(withoutQuery.replace('/hls/', '/expMp4/').replace(/\.m3u8$/i, '_720w.mp4'));
  } else {
    candidates.push(withoutQuery.replace(/\.m3u8$/i, '.mp4'));
  }

  return Array.from(new Set(candidates));
}

/**
 * Converts a Pinterest HLS playlist (.m3u8) URL to a direct 720p MP4 URL.
 */
export function convertHlsToMp4Url(hlsUrl) {
  const candidates = getHlsToMp4Candidates(hlsUrl);
  return candidates.length > 0 ? candidates[0] : null;
}

function inferResolutionFromUrl(url) {
  if (!url) return null;
  if (/\/1080p\/|_1080w\./i.test(url)) return '1080p Full HD';
  if (/\/720p\/|_720w\./i.test(url)) return '720p HD';
  if (/\/540p\/|_540w\./i.test(url)) return '540p SD';
  if (/\/480p\/|_480w\./i.test(url)) return '480p SD';
  if (/\/360p\/|_360w\./i.test(url)) return '360p SD';
  if (/\/240p\/|_240w\./i.test(url)) return '240p SD';
  if (/\/originals\//i.test(url)) return 'Original HD';
  if (/\/736x\//i.test(url)) return '736px HD';
  if (/\/564x\//i.test(url)) return '564px';
  return null;
}

function formatResolutionLabel(width, height, url) {
  const urlInferred = inferResolutionFromUrl(url);
  if (width && height) {
    const minDim = Math.min(Number(width), Number(height));
    const maxDim = Math.max(Number(width), Number(height));
    if (urlInferred === '720p HD' && minDim > 720) {
      return '720p HD';
    }
    if (minDim >= 1080 || maxDim >= 1920) return `1080p (${width}x${height})`;
    if (minDim >= 720 || maxDim >= 1280) return `720p HD (${width}x${height})`;
    return `${width}x${height}`;
  }
  return urlInferred || 'HD';
}

function extractMetaContent(html, attrName, attrValue) {
  const regex = new RegExp(
    `<meta[^>]*${attrName}=["']${attrValue}["'][^>]*content=["']([^"']+)["'][^>]*>|<meta[^>]*content=["']([^"']+)["'][^>]*${attrName}=["']${attrValue}["'][^>]*>`,
    'i',
  );
  const match = html.match(regex);
  return match ? decodeHtmlEntities(match[1] || match[2] || '') : null;
}

function extractDocumentTitle(html) {
  const ogTitle = extractMetaContent(html, 'property', 'og:title');
  if (ogTitle && !/^pinterest$/i.test(ogTitle)) return ogTitle;
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (titleMatch && titleMatch[1]) {
    const cleaned = decodeHtmlEntities(titleMatch[1]).replace(/\s*\|\s*Pinterest.*$/i, '').trim();
    if (cleaned && !/^pinterest$/i.test(cleaned)) return cleaned;
  }
  return null;
}

function pickBestVideoFromVideoList(videoList) {
  if (!videoList || typeof videoList !== 'object') return null;

  const preferredKeys = ['V_1080P', 'V_720P', 'V_EXP7', 'V_EXP6', 'V_EXP5', 'V_480P', 'V_360P'];
  let bestMp4 = null;
  let bestHls = null;

  // Check explicit priority keys first for MP4
  for (const key of preferredKeys) {
    const entry = videoList[key];
    if (entry && typeof entry.url === 'string') {
      const url = cleanMediaUrlString(entry.url);
      if (/\.mp4(\?|$)/i.test(url)) {
        bestMp4 = {
          url,
          width: entry.width || null,
          height: entry.height || null,
          duration: entry.duration || null,
          thumbnail: entry.thumbnail ? cleanMediaUrlString(entry.thumbnail) : null,
          key,
        };
        break;
      }
    }
  }

  // Also scan any remaining keys in videoList by pixel area for MP4 or HLS
  let maxPixels = bestMp4 ? (bestMp4.width || 0) * (bestMp4.height || 0) : -1;
  for (const [key, entry] of Object.entries(videoList)) {
    if (!entry || typeof entry.url !== 'string') continue;
    const url = cleanMediaUrlString(entry.url);
    const pixels = (entry.width || 0) * (entry.height || 0);

    if (/\.mp4(\?|$)/i.test(url)) {
      if (!bestMp4 || (!preferredKeys.includes(bestMp4.key) && pixels > maxPixels)) {
        bestMp4 = {
          url,
          width: entry.width || null,
          height: entry.height || null,
          duration: entry.duration || null,
          thumbnail: entry.thumbnail ? cleanMediaUrlString(entry.thumbnail) : null,
          key,
        };
        maxPixels = pixels;
      }
    } else if (/\.m3u8(\?|$)/i.test(url)) {
      if (!bestHls || key === 'V_HLSV4') {
        bestHls = {
          url,
          width: entry.width || null,
          height: entry.height || null,
          duration: entry.duration || null,
          thumbnail: entry.thumbnail ? cleanMediaUrlString(entry.thumbnail) : null,
          key,
        };
      }
    }
  }

  return { mp4: bestMp4, hls: bestHls };
}

function pickBestImageFromImagesMap(imagesMap) {
  if (!imagesMap || typeof imagesMap !== 'object') return null;
  const order = ['orig', '1200x', '736x', '564x', '474x'];
  for (const key of order) {
    const entry = imagesMap[key];
    if (entry && typeof entry.url === 'string' && isAllowedPinimgUrl(cleanMediaUrlString(entry.url))) {
      return {
        url: cleanMediaUrlString(entry.url),
        width: entry.width || null,
        height: entry.height || null,
        key,
      };
    }
  }
  return null;
}

/**
 * Layer 1: Parse JSON-LD scripts (video-snippet or VideoObject).
 */
function parseLayer1JsonLd(html) {
  const scriptRegex = /<script\b([^>]*)type=["']application\/ld\+json["']([^>]*)>([\s\S]*?)<\/script>/gi;
  const blocks = [];
  let match;
  while ((match = scriptRegex.exec(html)) !== null) {
    const attrs = `${match[1]} ${match[2]}`;
    const isVideoSnippet = /data-test-id=["']video-snippet["']/i.test(attrs);
    blocks.push({ isVideoSnippet, raw: match[3] });
  }

  // Prioritize explicit data-test-id="video-snippet"
  blocks.sort((a, b) => Number(b.isVideoSnippet) - Number(a.isVideoSnippet));

  let videoHit = null;
  let hlsCandidate = null;
  let metaTitle = null;
  let metaThumbnail = null;
  let metaAuthor = null;

  function inspectNode(node) {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) {
      for (const item of node) inspectNode(item);
      return;
    }

    const rawType = node['@type'];
    const types = Array.isArray(rawType) ? rawType : [rawType];

    if (types.includes('VideoObject')) {
      const contentUrl = typeof node.contentUrl === 'string' ? cleanMediaUrlString(node.contentUrl) : null;
      const thumb =
        typeof node.thumbnailUrl === 'string'
          ? cleanMediaUrlString(node.thumbnailUrl)
          : Array.isArray(node.thumbnailUrl) && typeof node.thumbnailUrl[0] === 'string'
            ? cleanMediaUrlString(node.thumbnailUrl[0])
            : node.thumbnailUrl?.url
              ? cleanMediaUrlString(node.thumbnailUrl.url)
              : null;
      const name = typeof node.name === 'string' ? decodeHtmlEntities(node.name) : null;
      const author =
        typeof node.author?.name === 'string'
          ? decodeHtmlEntities(node.author.name)
          : typeof node.creator?.name === 'string'
            ? decodeHtmlEntities(node.creator.name)
            : null;

      if (name && !metaTitle) metaTitle = name;
      if (thumb && !metaThumbnail) metaThumbnail = thumb;
      if (author && !metaAuthor) metaAuthor = author;

      if (contentUrl) {
        if (/\.mp4(\?|$)/i.test(contentUrl) && !videoHit) {
          videoHit = {
            mediaUrl: contentUrl,
            thumbnailUrl: thumb,
            title: name,
            author,
            width: node.width || null,
            height: node.height || null,
            resolution: formatResolutionLabel(node.width, node.height, contentUrl),
            layer: 'json-ld',
          };
        } else if (/\.m3u8(\?|$)/i.test(contentUrl) && !hlsCandidate) {
          hlsCandidate = {
            hlsUrl: contentUrl,
            thumbnailUrl: thumb,
            title: name,
            author,
            width: node.width || null,
            height: node.height || null,
          };
        }
      }
    }

    if (node.name && !metaTitle && typeof node.name === 'string') {
      metaTitle = decodeHtmlEntities(node.name);
    }
    if (node['@graph']) inspectNode(node['@graph']);
  }

  for (const block of blocks) {
    try {
      const parsed = JSON.parse(block.raw);
      inspectNode(parsed);
    } catch {
      // Ignore malformed JSON-LD block
    }
  }

  return { videoHit, hlsCandidate, metaTitle, metaThumbnail, metaAuthor };
}

function extractRelayCompletedPayloads(html) {
  const payloads = [];
  const relayRegex =
    /window\.__PWS_RELAY_REGISTER_COMPLETED_REQUEST__\(\s*["'][^"']+["']\s*,\s*(\{[\s\S]*?\})\s*\)\s*;?/g;
  let match;
  while ((match = relayRegex.exec(html)) !== null) {
    try {
      payloads.push(JSON.parse(match[1]));
    } catch {
      // Ignore malformed relay chunk
    }
  }
  return payloads;
}

/**
 * Layer 2: Parse ALL <script type="application/json"> tags (including data-relay-response,
 * __PWS_DATA__, __PWS_INITIAL_PROPS__) and Relay SSR chunks for video_list and story_pin_data.
 */
function parseLayer2PwsData(html, sourceUrl) {
  const jsonRoots = [];

  const jsonScriptRegex = /<script\b[^>]*type=["']application\/json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let scriptMatch;
  while ((scriptMatch = jsonScriptRegex.exec(html)) !== null) {
    const rawJson = scriptMatch[1]?.trim();
    if (!rawJson) continue;
    try {
      jsonRoots.push(JSON.parse(rawJson));
    } catch {
      // Ignore non-JSON or malformed script payload
    }
  }

  const relayPayloads = extractRelayCompletedPayloads(html);
  for (const relay of relayPayloads) {
    jsonRoots.push(relay);
  }

  if (jsonRoots.length === 0) return null;

  // Detect explicit PinNotFound from Pinterest Relay SSR
  const isPinNotFound = relayPayloads.some(
    (payload) => payload?.data?.v3GetPinQueryv2?.__typename === 'PinNotFound',
  );

  const data = jsonRoots.length === 1 ? jsonRoots[0] : { roots: jsonRoots };
  const targetPinId = extractPinId(sourceUrl);

  function findTargetPinSubtree(node) {
    if (!node || typeof node !== 'object' || !targetPinId) return null;
    if (Array.isArray(node)) {
      for (const item of node) {
        const found = findTargetPinSubtree(item);
        if (found) return found;
      }
      return null;
    }

    if (
      (String(node.id || '') === targetPinId || String(node.entityId || '') === targetPinId) &&
      (node.videos ||
        node.video_list ||
        node.videoList ||
        node.story_pin_data ||
        node.storyPinData ||
        node.images ||
        node.imageSignature ||
        node.images_236x)
    ) {
      return node;
    }

    if (node.pins && typeof node.pins === 'object' && node.pins[targetPinId]) {
      return node.pins[targetPinId];
    }

    for (const value of Object.values(node)) {
      if (value && typeof value === 'object') {
        const found = findTargetPinSubtree(value);
        if (found) return found;
      }
    }
    return null;
  }

  function scanTree(rootNode) {
    let bestVideo = null;
    let bestHls = null;
    let storyPinSlides = [];
    let bestImage = null;
    let metaTitle = null;
    let metaAuthor = null;

    let imageSignature = null;

    function traverse(node) {
      if (!node || typeof node !== 'object') return;
      if (Array.isArray(node)) {
        for (const item of node) traverse(item);
        return;
      }

      // Metadata enrichment (supports snake_case and Relay camelCase)
      if (!metaTitle) {
        const candidate =
          node.pin_title ||
          node.pinTitle ||
          node.title ||
          node.grid_title ||
          node.gridTitle ||
          node.seo_title ||
          node.seoTitle ||
          node.closeup_unified_description;
        if (typeof candidate === 'string' && candidate.trim() && !/^pinterest$/i.test(candidate.trim())) {
          metaTitle = decodeHtmlEntities(candidate);
        }
      }
      if (!metaAuthor) {
        const creator =
          node.native_creator?.full_name ||
          node.nativeCreator?.fullName ||
          node.pinner?.full_name ||
          node.pinner?.fullName ||
          node.pinner?.username;
        if (typeof creator === 'string' && creator.trim()) {
          metaAuthor = decodeHtmlEntities(creator);
        }
      }
      if (!imageSignature && typeof node.imageSignature === 'string' && /^[a-f0-9]{16,}$/i.test(node.imageSignature)) {
        imageSignature = node.imageSignature;
      }

      // Idea Pin story_pin_data / storyPinData extraction
      const spd =
        (node.story_pin_data && typeof node.story_pin_data === 'object' && node.story_pin_data) ||
        (node.storyPinData && typeof node.storyPinData === 'object' && node.storyPinData) ||
        null;
      if (spd) {
        const spdTitle = spd.metadata?.pin_title || spd.metadata?.pinTitle;
        if (typeof spdTitle === 'string' && spdTitle.trim()) {
          metaTitle = decodeHtmlEntities(spdTitle);
        }
        if (Array.isArray(spd.pages) && storyPinSlides.length === 0) {
          const slides = [];
          for (const page of spd.pages) {
            let pageVideo = null;
            let pageHls = null;
            let pageImage = null;

            if (Array.isArray(page.blocks)) {
              for (const block of page.blocks) {
                const blockVideoList = block?.video?.video_list || block?.video?.videoList;
                if (blockVideoList) {
                  const picked = pickBestVideoFromVideoList(blockVideoList);
                  if (picked?.mp4 && !pageVideo) pageVideo = picked.mp4;
                  if (picked?.hls && !pageHls) pageHls = picked.hls;
                }
                if (block?.image?.images && !pageImage) {
                  pageImage = pickBestImageFromImagesMap(block.image.images);
                }
              }
            }

            if (!pageImage && page?.image?.images) {
              pageImage = pickBestImageFromImagesMap(page.image.images);
            }

            if (pageVideo) {
              slides.push({
                type: 'video',
                mediaUrl: pageVideo.url,
                thumbnailUrl: pageVideo.thumbnail || pageImage?.url || null,
                resolution: formatResolutionLabel(pageVideo.width, pageVideo.height, pageVideo.url),
                width: pageVideo.width,
                height: pageVideo.height,
              });
            } else if (pageHls) {
              slides.push({
                type: 'hls',
                hlsUrl: pageHls.url,
                thumbnailUrl: pageHls.thumbnail || pageImage?.url || null,
                resolution: formatResolutionLabel(pageHls.width, pageHls.height, pageHls.url),
                width: pageHls.width,
                height: pageHls.height,
              });
            } else if (pageImage) {
              slides.push({
                type: 'image',
                mediaUrl: pageImage.url,
                thumbnailUrl: pageImage.url,
                resolution: formatResolutionLabel(pageImage.width, pageImage.height, pageImage.url),
                width: pageImage.width,
                height: pageImage.height,
              });
            }
          }
          if (slides.length > 0) {
            storyPinSlides = slides;
          }
        }
      }

      // Standard video_list / videoList extraction
      const vList =
        (node.video_list && typeof node.video_list === 'object' && node.video_list) ||
        (node.videoList && typeof node.videoList === 'object' && node.videoList) ||
        null;
      if (vList) {
        const picked = pickBestVideoFromVideoList(vList);
        if (picked?.mp4) {
          const curPixels = (picked.mp4.width || 0) * (picked.mp4.height || 0);
          const bestPixels = bestVideo ? (bestVideo.width || 0) * (bestVideo.height || 0) : -1;
          if (!bestVideo || curPixels > bestPixels) {
            bestVideo = picked.mp4;
          }
        }
        if (picked?.hls && !bestHls) {
          bestHls = picked.hls;
        }
      }

      // Relay videos.videoUrls array extraction
      if (Array.isArray(node.videoUrls)) {
        const mp4s = node.videoUrls
          .filter((u) => typeof u === 'string' && /\.mp4(\?|$)/i.test(u))
          .map(cleanMediaUrlString);
        if (mp4s.length > 0 && !bestVideo) {
          mp4s.sort((a, b) => scoreMp4Url(b) - scoreMp4Url(a));
          bestVideo = {
            url: mp4s[0],
            width: null,
            height: null,
            duration: null,
            thumbnail: null,
            key: 'videoUrls',
          };
        }
        const hlsUrls = node.videoUrls
          .filter((u) => typeof u === 'string' && /\.m3u8(\?|$)/i.test(u))
          .map(cleanMediaUrlString);
        if (hlsUrls.length > 0 && !bestHls) {
          const standardHls = hlsUrls.find((u) => /\/hls\//i.test(u)) || hlsUrls[0];
          bestHls = { url: standardHls, width: null, height: null, thumbnail: null, key: 'videoUrls' };
        }
      }

      // Standard images map + Relay images_orig/images_736x/images_236x
      if (node.images && typeof node.images === 'object') {
        const img = pickBestImageFromImagesMap(node.images);
        if (img) {
          const curPixels = (img.width || 0) * (img.height || 0);
          const bestPixels = bestImage ? (bestImage.width || 0) * (bestImage.height || 0) : -1;
          if (!bestImage || img.key === 'orig' || curPixels > bestPixels) {
            bestImage = img;
          }
        }
      }
      if (!bestImage && (node.images_orig?.url || node.images_736x?.url || node.images_236x?.url)) {
        const directImg = node.images_orig || node.images_736x || node.images_236x;
        if (typeof directImg?.url === 'string' && isAllowedPinimgUrl(cleanMediaUrlString(directImg.url))) {
          bestImage = {
            url: cleanMediaUrlString(directImg.url),
            width: directImg.width || null,
            height: directImg.height || null,
            key: node.images_orig ? 'orig' : node.images_736x ? '736x' : '236x',
          };
        }
      }

      for (const value of Object.values(node)) {
        if (value && typeof value === 'object') {
          traverse(value);
        }
      }
    }

    traverse(rootNode);
    return { bestVideo, bestHls, storyPinSlides, bestImage, metaTitle, metaAuthor, imageSignature, isPinNotFound };
  }

  const targetNode = findTargetPinSubtree(data);
  if (targetNode) {
    const targetedResult = scanTree(targetNode);
    if (
      targetedResult.bestVideo ||
      targetedResult.bestHls ||
      targetedResult.storyPinSlides.length > 0 ||
      targetedResult.bestImage
    ) {
      return targetedResult;
    }
  }

  return scanTree(data);
}

function scoreMp4Url(url) {
  let score = 0;
  if (/\/v1\.pinimg\.com\//i.test(url)) score += 10;
  // Prefer widely compatible H.264/AVC over HEVC/H.265
  if (/\/expMp4\/|\/720p\/|\/1080p\//i.test(url)) score += 40;
  else if (/\/hevcMp4/i.test(url)) score -= 15;
  else if (/\/mc\//i.test(url)) score += 20;

  if (/\/1080p\/|_1080w\./i.test(url)) score += 100;
  else if (/\/720p\/|_720w\./i.test(url)) score += 80;
  else if (/\/540p\/|_540w\./i.test(url)) score += 20;
  else if (/\/480p\/|_480w\./i.test(url)) score -= 10;
  else if (/\/360p\/|_360w\./i.test(url)) score -= 30;
  else if (/\/240p\/|_240w\./i.test(url)) score -= 50;
  return score;
}

/**
 * Layer 3: Search unescaped HTML for direct MP4 URLs on v*.pinimg.com (v1.pinimg.com, v.pinimg.com, etc.).
 */
function parseLayer3DirectMp4(html) {
  const regex = /https?:\/\/v\d*\.pinimg\.com\/videos\/[^"'\s<>\\]+\.mp4/gi;
  const rawMatches = html.match(regex) || [];
  if (rawMatches.length === 0) return null;

  const unique = Array.from(new Set(rawMatches.map(cleanMediaUrlString)));
  unique.sort((a, b) => scoreMp4Url(b) - scoreMp4Url(a));
  return unique[0];
}

/**
 * Layer 4 helper: find .m3u8 URLs in unescaped HTML and extract debug video URLs.
 */
function findHlsUrlsInHtml(html) {
  const regex = /https?:\/\/v\d*\.pinimg\.com\/videos\/[^"'\s<>\\]+\.m3u8/gi;
  const matches = html.match(regex) || [];
  return Array.from(new Set(matches.map(cleanMediaUrlString)));
}

function collectDebugVideoUrls(html) {
  const regex = /https?:\/\/[^"'\s<>\\]*pinimg\.com\/videos\/[^"'\s<>\\]+/gi;
  const matches = html.match(regex) || [];
  return Array.from(new Set(matches.map(cleanMediaUrlString)));
}

function hasVideoIndicators(html) {
  if (!html) return false;
  return (
    /"VideoObject"/i.test(html) ||
    /"video_list"/i.test(html) ||
    /"videoList"/i.test(html) ||
    /pinimg\.com\/videos\//i.test(html)
  );
}

function findBestImageFallback(html, pwsImage, imageSignature) {
  // Strip <style>...</style> blocks so UI CSS sprites/assets aren't mistaken for Pin media
  const htmlWithoutStyles = html.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ');
  const isUiAsset = (u) => /d53b014d86a6b6761bf649a0ed813c2b|pinterest_logo|default_avatar/i.test(u);

  const origMatches = (
    htmlWithoutStyles.match(/https:\/\/i\.pinimg\.com\/originals\/[^"'\s\\<>]+\.(?:jpg|jpeg|png|webp)/gi) || []
  )
    .map(cleanMediaUrlString)
    .filter((u) => !isUiAsset(u));

  const hd736Matches = (
    htmlWithoutStyles.match(/https:\/\/i\.pinimg\.com\/736x\/[^"'\s\\<>]+\.(?:jpg|jpeg|png|webp)/gi) || []
  )
    .map(cleanMediaUrlString)
    .filter((u) => !isUiAsset(u));

  // If we have the pin's exact imageSignature from Relay, prioritize matching high-res URLs
  if (imageSignature) {
    const sigOrig = origMatches.find((u) => u.includes(imageSignature));
    if (sigOrig) return { url: sigOrig, resolution: 'Original HD', width: null, height: null };
    const sig736 = hd736Matches.find((u) => u.includes(imageSignature));
    if (sig736) return { url: sig736, resolution: '736px HD', width: null, height: null };
  }

  if (pwsImage?.url && !isUiAsset(pwsImage.url)) {
    // If Relay only included images_236x, upgrade to HTML-verified originals/736x or originals path
    if (pwsImage.key === '236x') {
      const upgradedOrig = pwsImage.url.replace('/236x/', '/originals/');
      if (origMatches.includes(upgradedOrig)) {
        return { url: upgradedOrig, resolution: 'Original HD', width: null, height: null };
      }
      const upgraded736 = pwsImage.url.replace('/236x/', '/736x/');
      if (hd736Matches.includes(upgraded736)) {
        return { url: upgraded736, resolution: '736px HD', width: null, height: null };
      }
      return { url: upgradedOrig, resolution: 'Original HD', width: null, height: null };
    }
    return {
      url: pwsImage.url,
      resolution: formatResolutionLabel(pwsImage.width, pwsImage.height, pwsImage.url),
      width: pwsImage.width,
      height: pwsImage.height,
    };
  }

  if (origMatches.length > 0) {
    return { url: origMatches[0], resolution: 'Original HD', width: null, height: null };
  }

  if (hd736Matches.length > 0) {
    return { url: hd736Matches[0], resolution: '736px HD', width: null, height: null };
  }

  const ogImage = extractMetaContent(html, 'property', 'og:image');
  if (ogImage && isAllowedPinimgUrl(ogImage) && !isUiAsset(ogImage)) {
    return {
      url: ogImage,
      resolution: inferResolutionFromUrl(ogImage) || 'HD Image',
      width: null,
      height: null,
    };
  }

  return null;
}

async function defaultVerifyUrlExists(url) {
  try {
    const res = await fetch(url, {
      method: 'HEAD',
      headers: {
        'User-Agent': DESKTOP_HEADERS['User-Agent'],
        Referer: 'https://www.pinterest.com/',
      },
      signal: AbortSignal.timeout(HEAD_TIMEOUT_MS),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Pure 4-Layer Waterfall Parser over one or more Pinterest HTML sources (canonical + embed + redirect).
 * Accepts an optional `verifyUrlExists` callback for deterministic unit testing of Layer 4 HEAD checks.
 */
export async function parsePinterestHtml(
  rawHtml,
  sourceUrl,
  verifyUrlExists = defaultVerifyUrlExists,
) {
  const rawSources = Array.isArray(rawHtml) ? rawHtml : [rawHtml];
  const normalizedSources = rawSources
    .filter((s) => typeof s === 'string' && s.length > 0)
    .map(unescapePinterestHtml);

  const combinedHtml = normalizedSources.join('\n');

  let bestTitle = null;
  let bestThumb = null;
  let bestAuthor = null;
  let allPinNotFound = normalizedSources.length > 0;

  const hlsCandidates = [];
  let imageCandidate = null;

  // Evaluate each source in priority order (canonical -> embed -> initial) for video/Idea Pin first
  for (const html of normalizedSources) {
    const l1 = parseLayer1JsonLd(html);
    const l2 = parseLayer2PwsData(html, sourceUrl);

    if (!l2?.isPinNotFound) {
      allPinNotFound = false;
    }

    bestTitle =
      bestTitle ||
      l2?.metaTitle ||
      l1.metaTitle ||
      extractDocumentTitle(html) ||
      null;

    bestThumb =
      bestThumb ||
      l1.metaThumbnail ||
      l2?.bestImage?.url ||
      extractMetaContent(html, 'property', 'og:image') ||
      null;

    bestAuthor = bestAuthor || l2?.metaAuthor || l1.metaAuthor || null;

    // Idea Pin story_pin_data slides
    if (l2?.storyPinSlides?.length > 0) {
      const resolvedSlides = [];
      for (const slide of l2.storyPinSlides) {
        if (slide.type === 'hls' && slide.hlsUrl) {
          let resolvedMp4 = null;
          for (const candidate of getHlsToMp4Candidates(slide.hlsUrl)) {
            if (await verifyUrlExists(candidate)) {
              resolvedMp4 = candidate;
              break;
            }
          }
          if (resolvedMp4) {
            resolvedSlides.push({
              type: 'video',
              mediaUrl: resolvedMp4,
              thumbnailUrl: slide.thumbnailUrl,
              resolution: slide.resolution || '720p HD',
              width: slide.width,
              height: slide.height,
            });
            continue;
          }
          if (slide.thumbnailUrl && isAllowedPinimgUrl(slide.thumbnailUrl)) {
            resolvedSlides.push({
              type: 'image',
              mediaUrl: slide.thumbnailUrl,
              thumbnailUrl: slide.thumbnailUrl,
              resolution: slide.resolution || 'HD',
              width: slide.width,
              height: slide.height,
            });
          }
        } else {
          resolvedSlides.push(slide);
        }
      }

      if (resolvedSlides.length > 0) {
        const primary = resolvedSlides.find((s) => s.type === 'video') || resolvedSlides[0];
        if (primary.type === 'video' || !hasVideoIndicators(combinedHtml)) {
          return {
            type: primary.type,
            pinType: 'Idea Pin',
            title: bestTitle || 'Pinterest Media',
            author: bestAuthor,
            mediaUrl: primary.mediaUrl,
            thumbnailUrl: primary.thumbnailUrl || bestThumb,
            resolution: primary.resolution || 'HD',
            sourceUrl,
            layer: 'pws-story-pin',
            slides: resolvedSlides,
          };
        }
      }
    }

    // Layer 1: JSON-LD VideoObject direct MP4
    if (l1.videoHit) {
      return {
        type: 'video',
        pinType: 'Video Pin',
        title: l1.videoHit.title || bestTitle || 'Pinterest Media',
        author: l1.videoHit.author || bestAuthor,
        mediaUrl: l1.videoHit.mediaUrl,
        thumbnailUrl: l1.videoHit.thumbnailUrl || bestThumb,
        resolution: l1.videoHit.resolution,
        sourceUrl,
        layer: 'json-ld',
        slides: [],
      };
    }

    // Layer 2: JSON script video_list / videoUrls direct MP4
    if (l2?.bestVideo) {
      return {
        type: 'video',
        pinType: 'Video Pin',
        title: bestTitle || 'Pinterest Media',
        author: bestAuthor,
        mediaUrl: l2.bestVideo.url,
        thumbnailUrl: l2.bestVideo.thumbnail || bestThumb,
        resolution: formatResolutionLabel(l2.bestVideo.width, l2.bestVideo.height, l2.bestVideo.url),
        sourceUrl,
        layer: 'pws-data',
        slides: [],
      };
    }

    // Layer 3: Direct MP4 regex on unescaped HTML
    const l3Mp4 = parseLayer3DirectMp4(html);
    if (l3Mp4) {
      return {
        type: 'video',
        pinType: 'Video Pin',
        title: bestTitle || 'Pinterest Media',
        author: bestAuthor,
        mediaUrl: l3Mp4,
        thumbnailUrl: bestThumb,
        resolution: inferResolutionFromUrl(l3Mp4) || '720p HD',
        sourceUrl,
        layer: 'regex-mp4',
        slides: [],
      };
    }

    // Collect HLS candidates for Layer 4
    if (l1.hlsCandidate?.hlsUrl && !hlsCandidates.includes(l1.hlsCandidate.hlsUrl)) {
      hlsCandidates.push(l1.hlsCandidate.hlsUrl);
    }
    if (l2?.bestHls?.url && !hlsCandidates.includes(l2.bestHls.url)) {
      hlsCandidates.push(l2.bestHls.url);
    }
    for (const h of findHlsUrlsInHtml(html)) {
      if (!hlsCandidates.includes(h)) hlsCandidates.push(h);
    }

    // Save highest-priority image candidate only in case no video indicators exist
    if (!imageCandidate) {
      imageCandidate = findBestImageFallback(html, l2?.bestImage, l2?.imageSignature);
    }
  }

  // Layer 4A: Automatic HLS .m3u8 -> .mp4 conversion (tests /720p/ then /expMp4/ via HEAD)
  for (const hlsUrl of hlsCandidates) {
    for (const mp4Candidate of getHlsToMp4Candidates(hlsUrl)) {
      if (await verifyUrlExists(mp4Candidate)) {
        return {
          type: 'video',
          pinType: 'Video Pin',
          title: bestTitle || 'Pinterest Media',
          author: bestAuthor,
          mediaUrl: mp4Candidate,
          thumbnailUrl: bestThumb,
          resolution: inferResolutionFromUrl(mp4Candidate) || '720p HD',
          sourceUrl,
          layer: 'hls-to-mp4',
          slides: [],
        };
      }
    }
  }

  // Step 5: NEVER fall back to image thumbnail if video indicators exist on the page
  if (hasVideoIndicators(combinedHtml)) {
    const debugFoundUrls = collectDebugVideoUrls(combinedHtml);
    throw new PinExtractionError(
      'Video indicators were found on this Pin, but no playable MP4 stream could be resolved.',
      422,
      'VIDEO_MP4_NOT_RESOLVED',
      { debugFoundUrls },
    );
  }

  if (allPinNotFound) {
    throw new PinExtractionError(
      'This Pin could not be found (404). It may have been deleted or made private.',
      404,
      'PIN_NOT_FOUND',
    );
  }

  // Layer 4B: High-resolution Image Pin fallback (only when no video indicators exist)
  if (imageCandidate) {
    return {
      type: 'image',
      pinType: 'Image Pin',
      title: bestTitle || 'Pinterest Media',
      author: bestAuthor,
      mediaUrl: imageCandidate.url,
      thumbnailUrl: imageCandidate.url,
      resolution: imageCandidate.resolution,
      sourceUrl,
      layer: 'image-fallback',
      slides: [],
    };
  }

  throw new PinExtractionError(
    'No downloadable video or image was found on this Pin. It may be private, deleted, or temporarily restricted.',
    404,
    'MEDIA_NOT_FOUND',
  );
}

async function fetchHtmlSafe(url) {
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: DESKTOP_HEADERS,
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) return null;
    const text = await res.text();
    return text && text.length > 50 ? text : null;
  } catch {
    return null;
  }
}

/**
 * Fetches a Pinterest or pin.it URL, canonicalizes the Pin ID, fetches canonical + embed HTML,
 * and runs the 4-layer waterfall parser.
 */
export async function extractPinMedia(pinUrl) {
  const normalizedUrl = normalizeInputPinUrl(pinUrl);
  const preExtractedPinId = extractPinId(normalizedUrl);

  let response = null;
  let initialHtml = null;
  let finalUrl = normalizedUrl;

  try {
    response = await fetch(normalizedUrl, {
      method: 'GET',
      redirect: 'follow',
      headers: DESKTOP_HEADERS,
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    finalUrl = cleanPinterestUrl(response.url || normalizedUrl);
    if (response.ok) {
      initialHtml = await response.text();
    }
  } catch (err) {
    if (!preExtractedPinId) {
      throw new PinExtractionError(
        `Failed to connect to Pinterest: ${err?.message || 'Network timeout'}`,
        502,
        'UPSTREAM_FETCH_ERROR',
      );
    }
  }

  // Step 1: Canonicalize Pin ID & fetch canonical + lightweight embed fallback
  let pinId = extractPinId(finalUrl) || preExtractedPinId;
  if (!pinId && initialHtml) {
    pinId = extractPinId(unescapePinterestHtml(initialHtml));
  }

  if (pinId) {
    const canonicalUrl = `https://www.pinterest.com/pin/${pinId}/`;
    const embedUrl = `https://assets.pinterest.com/ext/embed.html?id=${pinId}`;

    const needsCanonicalFetch = !initialHtml || finalUrl !== canonicalUrl;
    const [canonicalHtml, embedHtml] = await Promise.all([
      needsCanonicalFetch ? fetchHtmlSafe(canonicalUrl) : Promise.resolve(null),
      fetchHtmlSafe(embedUrl),
    ]);

    const sources = [];
    if (canonicalHtml) sources.push(canonicalHtml);
    else if (initialHtml) sources.push(initialHtml);
    if (embedHtml) sources.push(embedHtml);
    if (canonicalHtml && initialHtml && initialHtml !== canonicalHtml) sources.push(initialHtml);

    if (sources.length > 0) {
      return parsePinterestHtml(sources, canonicalUrl);
    }
  }

  if (response && !response.ok) {
    if (response.status === 404) {
      throw new PinExtractionError('That Pin could not be found (404).', 404, 'PIN_NOT_FOUND');
    }
    throw new PinExtractionError(
      `Pinterest returned HTTP ${response.status}. The Pin may be private or rate-limited.`,
      502,
      'UPSTREAM_HTTP_ERROR',
    );
  }

  if (!initialHtml || initialHtml.length < 100) {
    throw new PinExtractionError('Pinterest returned an empty response.', 502, 'EMPTY_HTML');
  }

  return parsePinterestHtml(initialHtml, finalUrl);
}

/**
 * Securely proxies and streams media from *.pinimg.com with download headers.
 */
export async function streamPinMedia(mediaUrl, filename, res) {
  if (!isAllowedPinimgUrl(mediaUrl)) {
    const message = 'Blocked: Only *.pinimg.com media URLs can be proxied.';
    if (typeof res.status === 'function') {
      return res.status(403).json({ error: message });
    }
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: message }));
  }

  let upstream;
  try {
    upstream = await fetch(mediaUrl, {
      method: 'GET',
      headers: {
        'User-Agent': DESKTOP_HEADERS['User-Agent'],
        Referer: 'https://www.pinterest.com/',
      },
      signal: AbortSignal.timeout(30000),
    });
  } catch (err) {
    const message = `Failed to download upstream media: ${err?.message || 'Network error'}`;
    if (typeof res.status === 'function') {
      return res.status(502).json({ error: message });
    }
    res.statusCode = 502;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: message }));
  }

  if (!upstream.ok) {
    const message = `Upstream media server responded with HTTP ${upstream.status}.`;
    if (typeof res.status === 'function') {
      return res.status(502).json({ error: message });
    }
    res.statusCode = 502;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: message }));
  }

  const lowerUrl = mediaUrl.toLowerCase().split('?')[0];
  const isVideo = lowerUrl.endsWith('.mp4') || (filename && filename.toLowerCase().endsWith('.mp4'));
  let contentType = isVideo ? 'video/mp4' : 'image/jpeg';
  if (!isVideo) {
    if (lowerUrl.endsWith('.png')) contentType = 'image/png';
    else if (lowerUrl.endsWith('.webp')) contentType = 'image/webp';
  }

  const safeFilename = (filename || `pinterest-media-${Date.now()}.${isVideo ? 'mp4' : 'jpg'}`).replace(
    /[^a-zA-Z0-9._-]/g,
    '_',
  );

  res.setHeader('Content-Disposition', `attachment; filename="${safeFilename}"`);
  res.setHeader('Content-Type', contentType);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=3600');

  const contentLength = upstream.headers.get('content-length');
  if (contentLength) {
    res.setHeader('Content-Length', contentLength);
  }

  if (upstream.body) {
    const nodeStream = Readable.fromWeb(upstream.body);
    return new Promise((resolve, reject) => {
      nodeStream.on('error', (err) => {
        if (!res.headersSent) {
          res.statusCode = 502;
        }
        res.end();
        reject(err);
      });
      res.on('finish', resolve);
      nodeStream.pipe(res);
    });
  }

  const buffer = Buffer.from(await upstream.arrayBuffer());
  res.end(buffer);
}
