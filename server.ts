import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer as createViteServer } from 'vite';
import { extractPinMedia, PinExtractionError, streamPinMedia } from './server/pinterestCore.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Mount API routes BEFORE Vite middleware
  app.get('/api/extract', async (req, res) => {
    const rawUrl = typeof req.query.url === 'string' ? req.query.url : '';
    if (!rawUrl) {
      return res.status(400).json({ error: 'Missing required "url" query parameter.' });
    }

    try {
      const media = await extractPinMedia(rawUrl);
      return res.status(200).json(media);
    } catch (err) {
      const statusCode = err instanceof PinExtractionError ? err.statusCode : 500;
      const message =
        err instanceof Error ? err.message : 'Unexpected error extracting Pinterest media.';
      const payload: Record<string, unknown> = {
        error: message,
        code: err instanceof PinExtractionError ? err.code : 'EXTRACTION_FAILED',
      };
      if (err instanceof PinExtractionError && err.debugFoundUrls) {
        payload.debugFoundUrls = err.debugFoundUrls;
      }
      return res.status(statusCode).json(payload);
    }
  });

  app.get('/api/download', async (req, res) => {
    const mediaUrl = typeof req.query.url === 'string' ? req.query.url : '';
    const type = typeof req.query.type === 'string' ? req.query.type : '';

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
        const message = err instanceof Error ? err.message : 'Failed to stream media.';
        return res.status(502).json({ error: message });
      }
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.join(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`KikPin server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start KikPin server:', err);
  process.exit(1);
});
