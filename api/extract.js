import { extractPinMedia, PinExtractionError } from '../server/pinterestCore.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed. Use GET.' });
  }

  const rawUrl = Array.isArray(req.query?.url) ? req.query.url[0] : req.query?.url;
  if (!rawUrl) {
    return res.status(400).json({ error: 'Missing required "url" query parameter.' });
  }

  try {
    const media = await extractPinMedia(rawUrl);
    return res.status(200).json(media);
  } catch (err) {
    const statusCode = err instanceof PinExtractionError ? err.statusCode : 500;
    const payload = {
      error: err?.message || 'Unexpected error extracting Pinterest media.',
      code: err?.code || 'EXTRACTION_FAILED',
    };
    if (err instanceof PinExtractionError && err.debugFoundUrls) {
      payload.debugFoundUrls = err.debugFoundUrls;
    }
    return res.status(statusCode).json(payload);
  }
}
