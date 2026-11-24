import { createPinMediaResponse } from '../../../server/pinterestCore.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams;
  const mediaUrl = query.get('url') || '';
  const type = query.get('type') || '';

  if (!mediaUrl) {
    return Response.json(
      { error: 'Missing required "url" query parameter.' },
      { status: 400, headers: corsHeaders },
    );
  }

  const isVideo = type === 'video' || mediaUrl.toLowerCase().split('?')[0].endsWith('.mp4');
  let extension = isVideo ? 'mp4' : 'jpg';
  if (!isVideo) {
    const cleanPath = mediaUrl.toLowerCase().split('?')[0];
    if (cleanPath.endsWith('.png')) extension = 'png';
    else if (cleanPath.endsWith('.webp')) extension = 'webp';
  }

  const filename = `pinterest-media-${Date.now()}.${extension}`;
  const response = await createPinMediaResponse(mediaUrl, filename);
  const headers = new Headers(response.headers);
  Object.entries(corsHeaders).forEach(([name, value]) => headers.set(name, value));

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}
