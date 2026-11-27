import { extractPinMedia, PinExtractionError } from '../../../server/pinterestCore.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function GET(request) {
  const rawUrl = new URL(request.url).searchParams.get('url');
  if (!rawUrl || rawUrl.length > 2048) {
    return Response.json(
      { error: rawUrl ? 'Pinterest URL is too long.' : 'Missing required "url" query parameter.' },
      { status: 400, headers: corsHeaders },
    );
  }

  try {
    const media = await extractPinMedia(rawUrl);
    return Response.json(media, { status: 200, headers: corsHeaders });
  } catch (error) {
    const isPinError = error instanceof PinExtractionError;
    const payload = {
      error: isPinError || error instanceof Error ? error.message : 'Unexpected error extracting Pinterest media.',
      code: isPinError ? error.code : 'EXTRACTION_FAILED',
    };

    return Response.json(payload, { status: isPinError ? error.statusCode : 500, headers: corsHeaders });
  }
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}
