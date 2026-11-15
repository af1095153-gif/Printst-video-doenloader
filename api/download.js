import { streamPinMedia } from '../server/pinterestCore.js';

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

  const mediaUrl = Array.isArray(req.query?.url) ? req.query.url[0] : req.query?.url;
  const type = Array.isArray(req.query?.type) ? req.query.type[0] : req.query?.type;

  if (!mediaUrl) {
    return res.status(400).json({ error: 'Missing required "url" query parameter.' });
  }

  const isVideo = type === 'video' || mediaUrl.toLowerCase().split('?')[0].endsWith('.mp4');
  let ext = isVideo ? 'mp4' : 'jpg';
  if (!isVideo) {
    const cleanPath = mediaUrl.toLowerCase().split('?')[0];
    if (cleanPath.endsWith('.png')) ext = 'png';
    else if (cleanPath.endsWith('.webp')) ext = 'webp';
  }

  const filename = `pinterest-media-${Date.now()}.${ext}`;

  try {
    await streamPinMedia(mediaUrl, filename, res);
  } catch (err) {
    if (!res.headersSent) {
      return res.status(502).json({ error: err?.message || 'Failed to stream media.' });
    }
  }
}
